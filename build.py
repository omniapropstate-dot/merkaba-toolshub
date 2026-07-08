"""
build.py - Construye worker.js desde los archivos fuente.
Uso: python build.py
"""
import base64, os

ROOT = os.path.dirname(os.path.abspath(__file__))

def encode_text(path):
    with open(os.path.join(ROOT, path), 'r', encoding='utf-8') as f:
        return base64.b64encode(f.read().encode('utf-8')).decode('ascii')

def encode_bin(path):
    with open(os.path.join(ROOT, path), 'rb') as f:
        return base64.b64encode(f.read()).decode('ascii')

login_b64   = encode_text('src/login.html')
kit_b64     = encode_text('src/kit-inmobiliario.html')
admin_b64   = encode_text('src/admin.html')
icon192_b64 = encode_bin('icons/logo-192.png')
icon512_b64 = encode_bin('icons/logo-512.png')

manifest = '{"name":"Kit Inmobiliario Bolivia","short_name":"Merkaba Kit","start_url":"/kit-inmobiliario","display":"standalone","background_color":"#0a1628","theme_color":"#0a1628","icons":[{"src":"/icons/logo-192.png","sizes":"192x192","type":"image/png"},{"src":"/icons/logo-512.png","sizes":"512x512","type":"image/png"}]}'

worker = '\n'.join([
    'const LOGIN="'   + login_b64   + '";',
    'const KIT="'     + kit_b64     + '";',
    'const ADMIN="'   + admin_b64   + '";',
    'const ICON192="' + icon192_b64 + '";',
    'const ICON512="' + icon512_b64 + '";',
    "const MANIFEST='" + manifest + "';",
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
