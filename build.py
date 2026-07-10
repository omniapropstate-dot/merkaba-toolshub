"""
build.py - Construye worker.js desde los archivos fuente.
El kit se ensambla desde los partials en src/kit/ (head, styles, body,
modulos JS en orden alfabetico, tail).
Uso: python build.py
"""
import base64, glob, os

ROOT = os.path.dirname(os.path.abspath(__file__))

def read_text(path):
    with open(os.path.join(ROOT, path), 'r', encoding='utf-8') as f:
        return f.read()

def encode_bin(path):
    with open(os.path.join(ROOT, path), 'rb') as f:
        return base64.b64encode(f.read()).decode('ascii')

def b64(text):
    return base64.b64encode(text.encode('utf-8')).decode('ascii')

def assemble_kit():
    js_files = sorted(glob.glob(os.path.join(ROOT, 'src', 'kit', 'js', '*.js')))
    parts = [read_text('src/kit/head.html'), '<style>\n', read_text('src/kit/styles.css'),
             '</style>\n', read_text('src/kit/body.html'), '<script>\n']
    for path in js_files:
        with open(path, 'r', encoding='utf-8') as f:
            parts.append(f.read())
    parts += ['</script>\n', read_text('src/kit/tail.html')]
    return ''.join(parts)

kit_html = assemble_kit()

# copia navegable del kit ensamblado (no se commitea)
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
with open(os.path.join(ROOT, 'dist', 'kit-inmobiliario.html'), 'w', encoding='utf-8') as f:
    f.write(kit_html)

login_b64   = b64(read_text('src/login.html'))
kit_b64     = b64(kit_html)
admin_b64   = b64(read_text('src/admin.html'))
icon192_b64 = encode_bin('icons/logo-192.png')
icon512_b64 = encode_bin('icons/logo-512.png')

manifest = '{"name":"Kit Inmobiliario Bolivia","short_name":"Merkaba Kit","start_url":"/kit-inmobiliario","display":"standalone","background_color":"#0a1628","theme_color":"#0a1628","icons":[{"src":"/icons/logo-192.png","sizes":"192x192","type":"image/png"},{"src":"/icons/logo-512.png","sizes":"512x512","type":"image/png"}]}'

# Service worker - usar backticks para evitar conflicto con comillas simples internas
sw = "self.addEventListener('install',function(e){e.waitUntil(self.skipWaiting());});self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));});"

worker = '\n'.join([
    'const LOGIN="'   + login_b64   + '";',
    'const KIT="'     + kit_b64     + '";',
    'const ADMIN="'   + admin_b64   + '";',
    'const ICON192="' + icon192_b64 + '";',
    'const ICON512="' + icon512_b64 + '";',
    'const MANIFEST="' + manifest.replace('"', '\\"') + '";',
    'const SW=`'      + sw          + '`;',
    '',
    'function serve(b64){const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));const html=new TextDecoder("utf-8").decode(bytes);return new Response(html,{headers:{"Content-Type":"text/html; charset=UTF-8"}});}',
    'function serveIcon(b64){const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));return new Response(bytes,{headers:{"Content-Type":"image/png","Cache-Control":"public, max-age=86400"}});}',
    '',
    'export default {',
    '  async fetch(request) {',
    '    const path=new URL(request.url).pathname.replace(/[/]$/,"")||"/";',
    '    if(path==="/"||path==="/login") return serve(LOGIN);',
    '    if(path==="/kit-inmobiliario") return serve(KIT);',
    '    if(path==="/admin") return serve(ADMIN);',
    '    if(path==="/manifest.json") return new Response(MANIFEST,{headers:{"Content-Type":"application/manifest+json"}});',
    '    if(path==="/sw.js") return new Response(SW,{headers:{"Content-Type":"application/javascript"}});',
    '    if(path==="/icons/logo-192.png") return serveIcon(ICON192);',
    '    if(path==="/icons/logo-512.png") return serveIcon(ICON512);',
    '    return new Response("Not found",{status:404});',
    '  }',
    '}',
])

out = os.path.join(ROOT, 'worker.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write(worker)

print(f'worker.js built ({len(worker)} chars)')
