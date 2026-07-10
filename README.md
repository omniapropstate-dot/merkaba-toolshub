# Merkaba ToolsHub

Portal de kits profesionales de Merkaba Consulting Group, servido como Cloudflare Worker.

## Estructura

- `src/login.html` — landing + acceso de clientes (ruta `/` y `/login`)
- `src/admin.html` — panel de administración de clientes (ruta `/admin`)
- `src/kit/` — Kit del Agente Inmobiliario Boliviano (ruta `/kit-inmobiliario`), dividido en partials: `head.html`, `styles.css`, `body.html`, módulos JS en `js/` (se concatenan en orden alfabético) y `tail.html`
- `icons/` — íconos PWA
- `build.py` — ensambla los partials y genera `worker.js` (también deja una copia navegable en `dist/`)

## Deploy

Push a `main` → GitHub Action ejecuta `build.py` y deploya el worker `merkaba-portal` a Cloudflare (~40s).

Base de datos: Supabase (proyecto `rdmqlclavqbhrhxbkiwo`), acceso vía RPCs.
