function toolGeneradorSeguimiento(){
  return `<div class="tool-section" id="tool-seguimiento">
    <div class="tool-header">
      <div class="tool-icon gold">💬</div>
      <div><div class="tool-title">Generador de seguimiento <span class="tool-badge badge-hace">Hace</span></div>
      <div class="tool-subtitle">La mayoría de ventas requiere varios contactos antes de cerrarse. Genera aquí el mensaje exacto según en qué momento estás con el cliente.</div></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del cliente</label><input id="seg-nombre" type="text" placeholder="María Quispe"/></div>
      <div class="form-group"><label>Propiedad que visitó</label><input id="seg-propiedad" type="text" placeholder="Dpto. 3 amb. en Sopocachi"/></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>¿Cuánto tiempo pasó desde la visita?</label>
        <select id="seg-tiempo">
          <option value="1dia">1 día</option>
          <option value="3dias">3 días</option>
          <option value="1semana">1 semana</option>
          <option value="2semanas">2 semanas</option>
          <option value="1mes">1 mes o más</option>
        </select>
      </div>
      <div class="form-group"><label>¿Qué dijo al finalizar la visita?</label>
        <select id="seg-reaccion">
          <option value="positivo">Le gustó, quedó en pensar</option>
          <option value="precio">Le interesó pero el precio le pareció alto</option>
          <option value="otro">Dijo que tiene otro inmueble en vista</option>
          <option value="frio">No dio señales claras</option>
          <option value="esposo">Quiere consultar con su pareja/familia</option>
        </select>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:16px;">
      <label>¿Hay algo nuevo que puedas compartirle? (opcional)</label>
      <input id="seg-novedad" type="text" placeholder="Ej: el propietario aceptaría negociar el precio, hay otra propiedad similar…"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarSeguimiento()">Generar mensaje</button>
    </div>
    <div id="seg-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu mensaje de seguimiento</div>
        <div class="result-text" id="seg-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('seg-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(document.getElementById('seg-texto').textContent)">💬 Abrir en WhatsApp</button>
      </div>
    </div>
  </div>`;
}

function generarSeguimiento(){
  const nombre = $('seg-nombre').value.trim() || 'el cliente';
  const propiedad = $('seg-propiedad').value.trim() || 'la propiedad';
  const tiempo = $('seg-tiempo').value;
  const reaccion = $('seg-reaccion').value;
  const novedad = $('seg-novedad').value.trim();
  const agente = AGENTE.nombre;

  const saludos = {'1dia':'Hola', '3dias':'Hola', '1semana':'Hola, espero que estés bien', '2semanas':'Hola, espero que estés bien', '1mes':'Hola, ¿cómo estás?'};
  const saludo = saludos[tiempo];

  let cuerpo = '';
  if(reaccion==='positivo') cuerpo = `Quería saber si pudiste reflexionar sobre ${propiedad} que visitamos. Si tienes alguna pregunta o te gustaría visitarla de nuevo, estoy disponible para coordinar.`;
  else if(reaccion==='precio') cuerpo = `Quería comentarte que he podido conversar con el propietario de ${propiedad} y hay posibilidad de negociar. Si te interesa retomarlo, con gusto coordinamos.`;
  else if(reaccion==='otro') cuerpo = `Quería saber cómo avanzó tu búsqueda. Si el otro inmueble no terminó de convencerte, ${propiedad} sigue disponible y el propietario está abierto a conversar.`;
  else if(reaccion==='frio') cuerpo = `Pasaron unos días desde que visitamos ${propiedad} y quería saber si surgió alguna duda o necesitas más información para tomar una decisión.`;
  else cuerpo = `¿Pudiste conversar con tu familia sobre ${propiedad}? Quería saber si llegaron a una conclusión o si necesitan ver la propiedad nuevamente.`;

  let novedadTexto = '';
  if(novedad) novedadTexto = `\n\nAdemás, quería contarte que ${novedad}.`;

  const mensaje = `${saludo}, ${nombre}. Soy ${agente}.\n\n${cuerpo}${novedadTexto}\n\nQuedo a tu disposición.\n\n📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;

  $('seg-texto').textContent = mensaje;
  $('seg-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 2. CALCULADORA DE COMISIÓN
// ══════════════════════════════════════════════
function toolCalculadoraComision(){
  return `<div class="tool-section" id="tool-comision">
    <div class="tool-header">
      <div class="tool-icon">💰</div>
      <div><div class="tool-title">Calculadora de comisión <span class="tool-badge badge-hace">Hace</span></div>
      <div class="tool-subtitle">Calcula tu comisión en USD y Bs. para mostrarle al propietario cuánto te corresponde.</div></div>
    </div>
    <div class="form-row cols-3">
      <div class="form-group"><label>Precio de venta (USD)</label><input id="com-precio" type="number" placeholder="80000"/></div>
      <div class="form-group"><label>Tu comisión (%)</label><input id="com-pct" type="number" placeholder="3" step="0.5"/></div>
      <div class="form-group"><label>Tipo de cambio (Bs. por USD)</label><input id="com-tc" type="number" placeholder="10.5" step="0.5"/></div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="calcComision()">Calcular</button>
    </div>
    <div id="com-resultado" hidden>
      <div class="result-hero" style="margin-top:16px;">
        <div class="result-hero-label">Tu comisión</div>
        <div class="result-hero-num" id="com-usd">—</div>
        <div class="result-hero-sub">Equivale a <span id="com-bs">—</span> al tipo de cambio ingresado</div>
        <div class="result-hero-grid">
          <div class="result-hero-item"><div class="result-hero-item-label">Precio de venta</div><div class="result-hero-item-value" id="com-total">—</div></div>
          <div class="result-hero-item"><div class="result-hero-item-label">Al propietario</div><div class="result-hero-item-value" id="com-neto">—</div></div>
        </div>
      </div>
      <div class="btn-group" style="margin-top:10px;">
        <button class="btn btn-gold btn-sm" onclick="generarPDFComision()">&#128196; Propuesta de honorarios PDF</button>
      </div>
    </div>
  </div>`;
}

function calcComision(){
  const precio = parseFloat($('com-precio').value)||0;
  const pct = parseFloat($('com-pct').value)||0;
  const tc = parseFloat($('com-tc').value)||10.5;
  if(!precio||!pct){ toast('Completa el precio y el porcentaje'); return; }
  const comUSD = precio * (pct/100);
  const comBs = comUSD * tc;
  const neto = precio - comUSD;
  animarNumero('com-usd', comUSD, function(v){ return '$ '+Math.round(v).toLocaleString('es-BO'); });
  $('com-bs').textContent = 'Bs. '+comBs.toLocaleString('es-BO',{minimumFractionDigits:0,maximumFractionDigits:0});
  $('com-total').textContent = '$ '+precio.toLocaleString('es-BO',{minimumFractionDigits:0,maximumFractionDigits:0});
  $('com-neto').textContent = '$ '+neto.toLocaleString('es-BO',{minimumFractionDigits:0,maximumFractionDigits:0});
  $('com-resultado').hidden = false;
  flashResultado(document.querySelector('#com-resultado .result-hero'));
}

// ══════════════════════════════════════════════
// 3. CALCULADORA DOBLE TIPO DE CAMBIO
// ══════════════════════════════════════════════
function toolCalculadoraTipoCambio(){
  return `<div class="tool-section" id="tool-tc">
    <div class="tool-header">
      <div class="tool-icon">💱</div>
      <div><div class="tool-title">Doble tipo de cambio <span class="tool-badge badge-hace">Hace</span></div>
      <div class="tool-subtitle">Calcula cuánto recibe cada parte según el tipo de cambio oficial o el paralelo. Así evitas mal entendidos y sorpresas en el cierre.</div></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Precio pactado (USD)</label><input id="tc-precio" type="number" placeholder="80000"/></div>
      <div class="form-group"><label>Tipo de cambio oficial (Bs.)</label><input id="tc-oficial" type="number" placeholder="6.96" step="0.01"/></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Tipo de cambio paralelo (Bs.)</label><input id="tc-paralelo" type="number" placeholder="10.5" step="0.1"/></div>
      <div class="form-group"><label>¿Quién paga en Bs.?</label>
        <select id="tc-quien">
          <option value="comprador">El comprador paga en Bs.</option>
          <option value="vendedor">El vendedor recibe en Bs.</option>
        </select>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="calcTC()">Calcular</button>
    </div>
    <div id="tc-resultado" hidden>
      <div class="result-hero" style="margin-top:16px;">
        <div class="result-hero-label">Brecha entre tipos de cambio</div>
        <div class="result-hero-num" id="tc-brecha">—</div>
        <div class="result-hero-sub" id="tc-consejo"></div>
        <div class="result-hero-grid">
          <div class="result-hero-item"><div class="result-hero-item-label">Al tipo oficial</div><div class="result-hero-item-value" id="tc-en-oficial">—</div></div>
          <div class="result-hero-item"><div class="result-hero-item-label">Al tipo paralelo</div><div class="result-hero-item-value" id="tc-en-paralelo">—</div></div>
        </div>
      </div>
    </div>
  </div>`;
}

function calcTC(){
  const precio = parseFloat($('tc-precio').value)||0;
  const oficial = parseFloat($('tc-oficial').value)||6.96;
  const paralelo = parseFloat($('tc-paralelo').value)||0;
  if(!precio||!paralelo){ toast('Completa todos los campos'); return; }
  const enOficial = precio * oficial;
  const enParalelo = precio * paralelo;
  const brecha = enParalelo - enOficial;
  $('tc-en-oficial').textContent = 'Bs. '+enOficial.toLocaleString('es-BO',{maximumFractionDigits:0});
  $('tc-en-paralelo').textContent = 'Bs. '+enParalelo.toLocaleString('es-BO',{maximumFractionDigits:0});
  animarNumero('tc-brecha', brecha, function(v){ return 'Bs. '+Math.round(v).toLocaleString('es-BO'); });
  const quien = $('tc-quien').value;
  $('tc-consejo').textContent = quien==='comprador'
    ? `Si el comprador paga en Bs. al tipo paralelo (Bs. ${paralelo}), está pagando Bs. ${brecha.toLocaleString('es-BO',{maximumFractionDigits:0})} más de lo que correspondería al tipo oficial. Conviene pactar en USD con acuerdo explícito del tipo de cambio.`
    : `Si el vendedor recibe en Bs. al tipo oficial (Bs. ${oficial}), recibe Bs. ${brecha.toLocaleString('es-BO',{maximumFractionDigits:0})} menos de lo que valdría al tipo paralelo. Conviene negociar a qué tasa se hace la conversión.`;
  $('tc-resultado').hidden = false;
  flashResultado(document.querySelector('#tc-resultado .result-hero'));
}

// ══════════════════════════════════════════════
// 4. CALCULADORA DE ANTICRÉTICO
// ══════════════════════════════════════════════
function toolCalculadoraAntictretico(){
  return `<div class="tool-section" id="tool-antictretico">
    <div class="tool-header">
      <div class="tool-icon">🏛️</div>
      <div><div class="tool-title">Calculadora de anticrético <span class="tool-badge badge-hace">Hace</span></div>
      <div class="tool-subtitle">Calcula la comisión del anticrético, su equivalente en alquiler mensual y el monto en bolivianos. También te recuerda que hay que registrarlo en Derechos Reales.</div></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Capital del anticrético (USD)</label><input id="anti-capital" type="number" placeholder="30000"/></div>
      <div class="form-group"><label>Duración del contrato (años)</label><input id="anti-años" type="number" placeholder="2"/></div>
    </div>
    <div class="form-row cols-3">
      <div class="form-group"><label>Tu comisión (%)</label><input id="anti-com" type="number" placeholder="3" step="0.5"/></div>
      <div class="form-group"><label>Tipo de cambio paralelo</label><input id="anti-tc" type="number" placeholder="10.5" step="0.1"/></div>
      <div class="form-group"><label>Alquiler mensual equivalente (USD)</label><input id="anti-alquiler" type="number" placeholder="300"/></div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="calcAntictretico()">Calcular</button>
    </div>
    <div id="anti-resultado" hidden>
      <div class="result-hero" style="margin-top:16px;">
        <div class="result-hero-label">Tu comisión</div>
        <div class="result-hero-num" id="anti-com-usd">—</div>
        <div class="result-hero-sub">Sobre un capital de <span id="anti-cap-bs">—</span></div>
        <div class="result-hero-grid">
          <div class="result-hero-item"><div class="result-hero-item-label">Ahorro vs. alquiler</div><div class="result-hero-item-value" id="anti-ahorro">—</div></div>
          <div class="result-hero-item"><div class="result-hero-item-label">Rendimiento implícito</div><div class="result-hero-item-value" id="anti-rendimiento">—</div></div>
        </div>
      </div>
      <div class="btn-group" style="margin-top:10px;">
        <button class="btn btn-gold btn-sm" onclick="generarPDFAntictretico()">&#128196; Resumen del antictretico PDF</button>
      </div>
      <div class="guide-alert" style="margin-top:12px;">
        <strong>&#9888;&#65039; Obligatorio por ley</strong>
        El contrato de antictretico debe elevarse a escritura publica e inscribirse en Derechos Reales. Sin registro, el capital del anticretista queda desprotegido. No firmar solo con documento privado.
      </div>
    </div>
  </div>`;
}

function calcAntictretico(){
  const capital = parseFloat($('anti-capital').value)||0;
  const años = parseFloat($('anti-años').value)||2;
  const com = parseFloat($('anti-com').value)||3;
  const tc = parseFloat($('anti-tc').value)||10.5;
  const alquiler = parseFloat($('anti-alquiler').value)||0;
  if(!capital){ toast('Ingresa el capital del anticrético'); return; }
  const capBs = capital * tc;
  const comUSD = capital * (com/100);
  const totalAlquiler = alquiler * 12 * años;
  const rendimiento = alquiler>0 ? ((alquiler*12)/capital*100).toFixed(1) : '—';
  $('anti-cap-bs').textContent = 'Bs. '+capBs.toLocaleString('es-BO',{maximumFractionDigits:0});
  animarNumero('anti-com-usd', comUSD, function(v){ return '$ '+Math.round(v).toLocaleString('es-BO'); });
  $('anti-ahorro').textContent = alquiler>0 ? '$ '+totalAlquiler.toLocaleString('es-BO',{maximumFractionDigits:0})+' equiv.' : 'N/A';
  $('anti-rendimiento').textContent = rendimiento !== '—' ? rendimiento+'% anual' : '—';
  $('anti-resultado').hidden = false;
  flashResultado(document.querySelector('#anti-resultado .result-hero'));
}

// ══════════════════════════════════════════════
// 5. FICHA DE PROPIEDAD
// ══════════════════════════════════════════════
