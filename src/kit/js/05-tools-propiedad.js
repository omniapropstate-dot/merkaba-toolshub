function toolFichaPropiedad(){
  return `<div class="tool-section" id="tool-ficha">
    <div class="tool-header">
      <div class="tool-icon">🏠</div>
      <div><div class="tool-title">Generador de ficha de propiedad</div>
      <div class="tool-subtitle">Completa los datos de la propiedad y genera una publicación lista para pegar en Facebook, UltraCasas o InfoCasas.</div></div>
    </div>
    ${badgesHerramienta('ficha-propiedad')}
    <div class="form-row cols-2">
      <div class="form-group"><label>Tipo de operación</label>
        <select id="ficha-op"><option>Venta</option><option>Alquiler</option><option>Anticrético</option></select>
      </div>
      <div class="form-group"><label>Tipo de inmueble</label>
        <select id="ficha-tipo"><option>Departamento</option><option>Casa</option><option>Terreno</option><option>Local comercial</option><option>Oficina</option></select>
      </div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Zona / barrio</label><input id="ficha-zona" type="text" placeholder="Sopocachi, La Paz"/></div>
      <div class="form-group"><label>Precio</label><input id="ficha-precio" type="text" placeholder="$ 85,000 o Bs. 50,000/mes"/></div>
    </div>
    <div class="form-row cols-3">
      <div class="form-group"><label>Dormitorios</label><input id="ficha-dorm" type="number" placeholder="3"/></div>
      <div class="form-group"><label>Baños</label><input id="ficha-baños" type="number" placeholder="2"/></div>
      <div class="form-group"><label>Superficie (m²)</label><input id="ficha-m2" type="number" placeholder="120"/></div>
    </div>
    <div class="form-row cols-3">
      <div class="form-group"><label>Garaje</label>
        <select id="ficha-garaje">
          <option value="">No</option><option>1 garaje</option><option>2 garajes</option><option>Más de 2</option>
        </select>
      </div>
      <div class="form-group"><label>Antigüedad (años)</label><input id="ficha-antiguedad" type="number" placeholder="Ej: 5"/></div>
      <div class="form-group"><label>Expensas (Bs/mes)</label><input id="ficha-expensas" type="number" placeholder="Si aplica"/></div>
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label>Características destacadas (una por línea)</label>
      <textarea id="ficha-features" placeholder="Vista a la cordillera&#10;Conjunto cerrado&#10;Ascensor"></textarea>
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label>Fotos de la propiedad (máx. 6, desde tu celular o computadora)</label>
      <div style="font-size:0.76rem;color:var(--text-muted);margin:2px 0 8px;line-height:1.4;">
        Recomendadas: fachada, living, dormitorios, cocina, baño y patio/jardín (si tiene). Evitá fotos con reflejos, sombras de personas o marcas de agua.
      </div>
      <input type="file" id="ficha-fotos-input" accept="image/*" multiple onchange="cargarFotosPropiedad(this)" style="font-size:0.85rem;padding:6px 0;width:100%;"/>
      <div id="ficha-fotos-preview" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;"></div>
    </div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarFicha()">Generar publicación</button>
    </div>
    <div id="ficha-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu publicación lista para copiar</div>
        <div class="result-text" id="ficha-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('ficha-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(document.getElementById('ficha-texto').textContent)">💬 Compartir</button>
        <button class="btn btn-gold btn-sm" onclick="generarPDFFicha()">&#128196; Descargar PDF</button>
      </div>
    </div>
  </div>`;
}

function generarFicha(){
  const op = $('ficha-op').value;
  const tipo = $('ficha-tipo').value;
  const zona = $('ficha-zona').value.trim()||'Zona a confirmar';
  const precio = $('ficha-precio').value.trim()||'Consultar precio';
  const dorm = $('ficha-dorm').value;
  const baños = $('ficha-baños').value;
  const m2 = $('ficha-m2').value;
  const garaje = $('ficha-garaje').value;
  const antiguedad = $('ficha-antiguedad').value;
  const expensas = $('ficha-expensas').value;
  const featuresRaw = $('ficha-features').value.trim();
  const features = featuresRaw ? featuresRaw.split('\n').filter(f=>f.trim()).map(f=>'✅ '+f.trim()).join('\n') : '';

  const emojis = {Venta:'🔑',Alquiler:'🏡',Anticrético:'🤝'};
  const emoji = emojis[op]||'🏠';

  let detalles = [];
  if(dorm) detalles.push(`🛏 ${dorm} dormitorio${dorm>1?'s':''}`);
  if(baños) detalles.push(`🚿 ${baños} baño${baños>1?'s':''}`);
  if(m2) detalles.push(`📐 ${m2} m²`);
  if(garaje) detalles.push(`🚗 ${garaje}`);
  if(antiguedad) detalles.push(`📅 ${antiguedad} año${antiguedad>1?'s':''}`);
  if(expensas) detalles.push(`💰 Expensas Bs. ${expensas}/mes`);

  const texto = `${emoji} EN ${op.toUpperCase()}: ${tipo} en ${zona}

💲 Precio: ${precio}

${detalles.join('   ')}

${features ? features+'\n' : ''}
📍 Ubicación: ${zona}

Interesados comunicarse al WhatsApp 👇
📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;

  $('ficha-texto').textContent = texto;
  $('ficha-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 6. PROPUESTA AL PROPIETARIO
// ══════════════════════════════════════════════
function toolPropuestaPropietario(){
  return `<div class="tool-section" id="tool-propuesta">
    <div class="tool-header">
      <div class="tool-icon">📑</div>
      <div><div class="tool-title">Propuesta al propietario</div>
      <div class="tool-subtitle">Genera un texto claro para presentarle al propietario: por qué ese precio de venta y por qué tu comisión vale la pena.</div></div>
    </div>
    ${badgesHerramienta('propuesta-propietario')}
    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del propietario</label><input id="prop-nombre" type="text" placeholder="Sr. Mamani"/></div>
      <div class="form-group"><label>Tipo de inmueble</label><input id="prop-inmueble" type="text" placeholder="Departamento en Miraflores"/></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Precio sugerido de salida (USD)</label><input id="prop-precio" type="number" placeholder="85000"/></div>
      <div class="form-group"><label>Tu comisión (%)</label><input id="prop-com" type="number" placeholder="3" step="0.5"/></div>
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label>¿Por qué ese precio? (argumentos de mercado)</label>
      <textarea id="prop-argumentos" placeholder="Propiedades similares en la zona se vendieron entre $80,000 y $90,000 en los últimos 3 meses&#10;La zona tiene alta demanda por cercanía al centro&#10;El inmueble está en excelentes condiciones"></textarea>
    </div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarPropuesta()">Generar propuesta</button>
    </div>
    <div id="prop-resultado" hidden>
      <div class="result-box navy-accent">
        <div class="result-label">Tu propuesta lista</div>
        <div class="result-text" id="prop-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('prop-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-gold btn-sm" onclick="generarPDFPropuesta()">📄 Descargar PDF</button>
      </div>
    </div>
  </div>`;
}

function generarPropuesta(){
  const propNombre = $('prop-nombre').value.trim()||'Estimado propietario';
  const inmueble = $('prop-inmueble').value.trim()||'su inmueble';
  const precio = parseFloat($('prop-precio').value)||0;
  const com = parseFloat($('prop-com').value)||3;
  const args = $('prop-argumentos').value.trim();
  if(!precio){ toast('Ingresa el precio sugerido'); return; }
  const comMonto = precio*(com/100);
  const neto = precio - comMonto;

  const texto = `PROPUESTA DE CAPTACIÓN
Preparada por: ${AGENTE.nombre} | ${AGENTE.whatsapp}

Estimado/a ${propNombre}:

Le presento mi propuesta para la comercialización de ${inmueble}.

PRECIO SUGERIDO DE SALIDA: USD ${precio.toLocaleString('es-BO')}

FUNDAMENTO DE MERCADO:
${args||'— (Completa los argumentos de mercado)'}

MI SERVICIO INCLUYE:
✓ Publicación en portales UltraCasas, InfoCasas y redes sociales
✓ Atención personalizada a cada interesado
✓ Filtro de compradores serios antes de cada visita
✓ Acompañamiento en todo el proceso legal y administrativo
✓ Asesoría en negociación y cierre

COMISIÓN: ${com}% sobre el precio de venta
— Su ingreso neto estimado: USD ${neto.toLocaleString('es-BO')}
— Mi comisión: USD ${comMonto.toLocaleString('es-BO')} (solo al concretarse la venta)

Quedo a su disposición para cualquier consulta.

📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;

  $('prop-texto').textContent = texto;
  $('prop-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 7. RESPUESTA RÁPIDA
// ══════════════════════════════════════════════
