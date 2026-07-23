"""
build.py - Construye worker.js para el Worker de recursos de venta (merkaba-recursos).
Pagina publica, sin login, con las 3 herramientas de muestra (?ver=filtro|seguimiento|ficha).
Uso: python build.py
"""
import base64, os

ROOT = os.path.dirname(os.path.abspath(__file__))

def read_text(path):
    with open(os.path.join(ROOT, path), 'r', encoding='utf-8') as f:
        return f.read()

def encode_bin(path):
    with open(os.path.join(ROOT, path), 'rb') as f:
        return base64.b64encode(f.read()).decode('ascii')

def b64(text):
    return base64.b64encode(text.encode('utf-8')).decode('ascii')

muestra_b64 = b64(read_text('src/muestra.html'))
qr_esencial_b64 = encode_bin('icons/qr-esencial.jpg')
qr_profesional_b64 = encode_bin('icons/qr-profesional.jpg')

worker = '\n'.join([
    'const MUESTRA="' + muestra_b64 + '";',
    'const QRESENCIAL="' + qr_esencial_b64 + '";',
    'const QRPROFESIONAL="' + qr_profesional_b64 + '";',
    '',
    'function b64ToBytes(b64){const bin=atob(b64);const len=bin.length;const bytes=new Uint8Array(len);for(let i=0;i<len;i++){bytes[i]=bin.charCodeAt(i);}return bytes;}',
    'function serve(b64){const html=new TextDecoder("utf-8").decode(b64ToBytes(b64));return new Response(html,{headers:{"Content-Type":"text/html; charset=UTF-8"}});}',
    'function serveJpeg(b64){return new Response(b64ToBytes(b64),{headers:{"Content-Type":"image/jpeg","Cache-Control":"public, max-age=86400"}});}',
    '',
    'export default {',
    '  async fetch(request) {',
    '    const path=new URL(request.url).pathname.replace(/[/]$/,"")||"/";',
    '    if(path==="/icons/qr-esencial.jpg") return serveJpeg(QRESENCIAL);',
    '    if(path==="/icons/qr-profesional.jpg") return serveJpeg(QRPROFESIONAL);',
    '    return serve(MUESTRA);',
    '  }',
    '}',
])

out = os.path.join(ROOT, 'worker.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write(worker)

print(f'worker.js (recursos-venta) built ({len(worker)} chars)')
