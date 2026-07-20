// ══════════════════════════════════════════════
// REGALOS POR PRONTO PAGO — excepcion a la regla: no pertenecen a ninguna
// FASE, ni TIPO, ni SEARCH_INDEX. Solo se llega a ellos desde la seccion
// "Tus regalos por pronto pago" del Inicio (ver 15-home-init.js), visible
// solo si AGENTE.regalosProntoPago > 0 (cantidad que fija el admin por
// cliente). Cada una muestra primero una caratula explicativa; recien con
// el boton "Empezar" se revela la calculadora real.
// ══════════════════════════════════════════════
function showRegalo(n){
  _entrarContenido();
  $('phase-mapa').hidden = true;
  $('phase-content').hidden = false;
  var html = '<div style="margin-bottom:20px;"><button onclick="irAlInicio()" class="btn btn-outline btn-sm">← Inicio</button></div>';
  html += n===1 ? toolRegalo1() : toolRegalo2();
  $('phase-content').innerHTML = html;
  if(n===2) regalo2Etapas();
  document.querySelector('.kit-main').scrollTop = 0;
  window.scrollTo(0,0);
}

function regaloAbrir(n){
  $('regalo-caratula-'+n).hidden = true;
  $('regalo-tool-'+n).hidden = false;
}

// ══════════════════════════════════════════════
// REGALO 1 — DEFIENDE TU COMISIÓN
// ══════════════════════════════════════════════
function toolRegalo1(){
  return `<div class="tool-section" id="regalo-caratula-1">
    <div style="text-align:center;padding:10px;">
      <div style="font-size:2.6rem;margin-bottom:12px;">🛡️</div>
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;color:var(--navy);margin:0 0 14px;">Defiende tu comisión</h2>
      <p style="font-size:0.92rem;line-height:1.65;color:var(--text-muted);max-width:480px;margin:0 auto 10px;">
        Cada vez que negocias — tu propia comisión con un propietario, o el precio de venta con un comprador — ceder "solo un poquito" se siente inofensivo en el momento. Pero esa cesión sale de tu bolsillo, en plata real.<br/><br/>
        Esta herramienta te muestra exactamente cuánto pierdes: en dólares, en bolivianos y en horas de tu propio trabajo. Para que la próxima vez que te pidan "un poquito más", decidas con el número real delante, no a ciegas.
      </p>
      <p style="font-size:0.78rem;color:var(--gold);font-weight:700;margin:0 0 22px;">🎁 Regalo por pagar dentro de las primeras 48 horas</p>
      <button class="btn btn-gold" onclick="regaloAbrir(1)">Empezar →</button>
    </div>
  </div>
  <div class="tool-section" id="regalo-tool-1" hidden>
    <div class="tool-header">
      <div class="tool-icon gold">🛡️</div>
      <div><div class="tool-title">Defiende tu comisión</div>
      <div class="tool-subtitle">Calcula cuánto pierdes en plata y en horas de trabajo cada vez que cedes.</div></div>
    </div>
    <div class="sidebar-tabs" style="margin-bottom:18px;">
      <button class="sidebar-tab active" id="rg1-modo-comision" onclick="regalo1Modo('comision')">Me piden bajar mi comisión</button>
      <button class="sidebar-tab" id="rg1-modo-precio" onclick="regalo1Modo('precio')">Me piden bajar el precio</button>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Precio de venta (USD)</label><input id="rg1-precio" type="number" placeholder="85000" oninput="regalo1Calcular()"/></div>
      <div class="form-group"><label>Tu comisión actual (%)</label><input id="rg1-comision" type="number" placeholder="3" step="0.5" oninput="regalo1Calcular()"/></div>
    </div>
    <div class="form-group" id="rg1-grupo-comision" style="margin-bottom:16px;">
      <label>¿Cuántos puntos de tu comisión te piden ceder?</label>
      <div style="display:flex;gap:10px;align-items:center;">
        <input type="range" id="rg1-puntos-slider" min="0" max="5" step="0.1" value="1" style="flex:1;" oninput="$('rg1-puntos-numero').value=this.value;regalo1Calcular();"/>
        <input type="number" id="rg1-puntos-numero" min="0" max="5" step="0.1" value="1" style="width:64px;padding:8px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface-2);color:var(--text);" oninput="$('rg1-puntos-slider').value=this.value;regalo1Calcular();"/>
      </div>
      <div style="font-size:0.76rem;color:var(--text-muted);margin-top:4px;">Ej: si tu comisión es 3% y te piden bajarla a 2.5%, aquí pones 0.5.</div>
    </div>
    <div class="form-group" id="rg1-grupo-precio" style="margin-bottom:16px;" hidden>
      <label>¿Qué % de descuento le piden al precio de venta?</label>
      <div style="display:flex;gap:10px;align-items:center;">
        <input type="range" id="rg1-pct-slider" min="0" max="10" step="0.1" value="1" style="flex:1;" oninput="$('rg1-pct-numero').value=this.value;regalo1Calcular();"/>
        <input type="number" id="rg1-pct-numero" min="0" max="10" step="0.1" value="1" style="width:64px;padding:8px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface-2);color:var(--text);" oninput="$('rg1-pct-slider').value=this.value;regalo1Calcular();"/>
      </div>
      <div style="font-size:0.76rem;color:var(--text-muted);margin-top:4px;">Tu pérdida real es solo la parte de ese descuento que le tocaba a tu comisión.</div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Tu ingreso mensual típico (Bs.)</label><input id="rg1-ingreso" type="number" placeholder="6000" oninput="regalo1Calcular()"/></div>
      <div class="form-group"><label>Tipo de cambio hoy (Bs. por USD)</label><input id="rg1-tc" type="number" placeholder="9.73" step="0.01" oninput="regalo1Calcular()"/></div>
    </div>
    <div class="result-hero">
      <div class="result-hero-label">Lo que te cuesta ceder</div>
      <div class="result-hero-num" id="rg1-usd">$ 0</div>
      <div class="result-hero-sub" id="rg1-bs">Bs. 0</div>
      <div class="result-hero-sub">Eso equivale a <b id="rg1-horas">—</b> horas de tu trabajo, o al <b id="rg1-pct-ingreso">—</b> de tu ingreso de todo un mes.</div>
      <div style="margin-top:14px;height:8px;border-radius:99px;background:var(--surface);overflow:hidden;">
        <div id="rg1-barra" style="height:100%;width:0%;background:#2F9E6E;transition:width .3s,background .3s;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:var(--text-muted);margin-top:4px;"><span>Duele poco</span><span>Duele mucho</span></div>
    </div>
  </div>`;
}

var _rg1Modo = 'comision';
function regalo1Modo(modo){
  _rg1Modo = modo;
  $('rg1-modo-comision').classList.toggle('active', modo==='comision');
  $('rg1-modo-precio').classList.toggle('active', modo==='precio');
  $('rg1-grupo-comision').hidden = modo!=='comision';
  $('rg1-grupo-precio').hidden = modo!=='precio';
  regalo1Calcular();
}

var _RG_HORAS_MES = 160;
function regalo1Calcular(){
  var precioVenta = parseFloat($('rg1-precio').value) || 0;
  var comision = parseFloat($('rg1-comision').value) || 0;
  var ingresoMensual = parseFloat($('rg1-ingreso').value) || 0;
  var tipoCambio = parseFloat($('rg1-tc').value) || 0;

  var perdidaUSD = 0;
  if(_rg1Modo === 'comision'){
    var puntos = parseFloat($('rg1-puntos-numero').value) || 0;
    perdidaUSD = precioVenta * (puntos/100);
  } else {
    var pct = parseFloat($('rg1-pct-numero').value) || 0;
    var descuentoUSD = precioVenta * (pct/100);
    perdidaUSD = descuentoUSD * (comision/100);
  }

  var perdidaBs = perdidaUSD * tipoCambio;
  var horas = 0, pctIngreso = 0;
  if(ingresoMensual > 0){
    pctIngreso = (perdidaBs / ingresoMensual) * 100;
    horas = (perdidaBs / ingresoMensual) * _RG_HORAS_MES;
  }

  animarNumero('rg1-usd', perdidaUSD, function(v){ return '$ '+Math.round(v).toLocaleString('es-BO'); });
  $('rg1-bs').textContent = 'Bs. ' + perdidaBs.toLocaleString('es-BO',{maximumFractionDigits:0});
  $('rg1-horas').textContent = ingresoMensual>0 ? horas.toLocaleString('es-BO',{maximumFractionDigits:1}) : '—';
  $('rg1-pct-ingreso').textContent = ingresoMensual>0 ? pctIngreso.toLocaleString('es-BO',{maximumFractionDigits:1})+'%' : '—';

  var barra = $('rg1-barra');
  var ancho = Math.max(0, Math.min(100, pctIngreso*10));
  barra.style.width = ancho + '%';
  var color = '#2F9E6E';
  if(pctIngreso > 2) color = 'var(--gold)';
  if(pctIngreso > 5) color = '#e74c3c';
  barra.style.background = color;
}

// ══════════════════════════════════════════════
// REGALO 2 — ¿CUÁNTO VOY A GANAR ESTE MES?
// ══════════════════════════════════════════════
function toolRegalo2(){
  return `<div class="tool-section" id="regalo-caratula-2">
    <div style="text-align:center;padding:10px;">
      <div style="font-size:2.6rem;margin-bottom:12px;">📈</div>
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;color:var(--navy);margin:0 0 14px;">¿Cuánto voy a ganar este mes?</h2>
      <p style="font-size:0.92rem;line-height:1.65;color:var(--text-muted);max-width:480px;margin:0 auto 10px;">
        La mayoría de los agentes no sabe cuánto va a ganar este mes hasta que ya terminó.<br/><br/>
        Con los datos de tu cartera actual — cuántos interesados tienes en cada etapa, y qué tan probable es que cada uno cierre — esta herramienta te da una proyección real de tu ingreso, y te muestra en qué etapa te conviene enfocarte para mejorarla.
      </p>
      <p style="font-size:0.78rem;color:var(--gold);font-weight:700;margin:0 0 22px;">🎁 Regalo por pagar dentro de las primeras 48 horas</p>
      <button class="btn btn-gold" onclick="regaloAbrir(2)">Empezar →</button>
    </div>
  </div>
  <div class="tool-section" id="regalo-tool-2" hidden>
    <div class="tool-header">
      <div class="tool-icon gold">📈</div>
      <div><div class="tool-title">¿Cuánto voy a ganar este mes?</div>
      <div class="tool-subtitle">Proyecta tu ingreso según cuántos contactos tienes en cada etapa del proceso.</div></div>
    </div>
    <div id="rg2-etapas"></div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Comisión promedio que ganas por venta (USD)</label><input id="rg2-comision" type="number" placeholder="2500" oninput="regalo2Calcular()"/></div>
      <div class="form-group"><label>Tipo de cambio hoy (Bs. por USD)</label><input id="rg2-tc" type="number" placeholder="9.73" step="0.01" oninput="regalo2Calcular()"/></div>
    </div>
    <div class="result-hero">
      <div class="result-hero-label">Tu proyección de este mes</div>
      <div class="result-hero-num" id="rg2-total-usd">$ 0</div>
      <div class="result-hero-sub" id="rg2-total-bs">Bs. 0</div>
      <div class="result-hero-sub" id="rg2-consejo" style="margin-top:8px;">Completa los datos de tu cartera para ver la proyección.</div>
    </div>
  </div>`;
}

var _RG2_ETAPAS = [
  { id:'nuevos', nombre:'Interesados nuevos', probDefault:10 },
  { id:'visitas', nombre:'Visitas agendadas', probDefault:30 },
  { id:'negociacion', nombre:'En negociación', probDefault:60 }
];

function regalo2Etapas(){
  var cont = $('rg2-etapas');
  var html = '';
  _RG2_ETAPAS.forEach(function(e){
    html += '<div class="tool-section" style="padding:16px 18px;margin-bottom:12px;background:var(--surface-2);">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:0.9rem;margin-bottom:10px;">'
      +   '<span>'+e.nombre+'</span><span style="font-family:\'IBM Plex Mono\',monospace;color:var(--gold);" id="rg2-aporte-'+e.id+'">$ 0</span>'
      + '</div>'
      + '<div class="form-row cols-2" style="margin-bottom:0;">'
      +   '<div class="form-group"><label>¿Cuántos tienes en esta etapa?</label><input type="number" id="rg2-cant-'+e.id+'" placeholder="0" oninput="regalo2Calcular()"/></div>'
      +   '<div class="form-group"><label>% de probabilidad de cierre</label>'
      +     '<div style="display:flex;gap:10px;align-items:center;">'
      +       '<input type="range" id="rg2-prob-'+e.id+'-slider" min="0" max="100" step="1" value="'+e.probDefault+'" style="flex:1;" oninput="$(\'rg2-prob-'+e.id+'-numero\').value=this.value;regalo2Calcular();"/>'
      +       '<input type="number" id="rg2-prob-'+e.id+'-numero" min="0" max="100" step="1" value="'+e.probDefault+'" style="width:56px;padding:8px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);" oninput="$(\'rg2-prob-'+e.id+'-slider\').value=this.value;regalo2Calcular();"/>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '</div>';
  });
  cont.innerHTML = html;
}

function regalo2Calcular(){
  var comisionProm = parseFloat($('rg2-comision').value) || 0;
  var tipoCambio = parseFloat($('rg2-tc').value) || 0;

  var aportes = _RG2_ETAPAS.map(function(e){
    var cant = parseFloat($('rg2-cant-'+e.id).value) || 0;
    var prob = parseFloat($('rg2-prob-'+e.id+'-numero').value) || 0;
    return { id:e.id, nombre:e.nombre, aporte: cant*(prob/100)*comisionProm };
  });

  var total = aportes.reduce(function(acc,a){ return acc+a.aporte; }, 0);

  aportes.forEach(function(a){
    $('rg2-aporte-'+a.id).textContent = '$ '+a.aporte.toLocaleString('es-BO',{maximumFractionDigits:0});
  });

  animarNumero('rg2-total-usd', total, function(v){ return '$ '+Math.round(v).toLocaleString('es-BO'); });
  $('rg2-total-bs').textContent = 'Bs. '+(total*tipoCambio).toLocaleString('es-BO',{maximumFractionDigits:0});

  if(total > 0){
    var masDebil = aportes.reduce(function(a,b){ return a.aporte < b.aporte ? a : b; });
    $('rg2-consejo').textContent = 'La etapa que menos te está aportando ahora es "'+masDebil.nombre+'" ($'
      + masDebil.aporte.toLocaleString('es-BO',{maximumFractionDigits:0})
      + '). Reforzarla ahí es donde más rápido puedes subir tu proyección.';
  } else {
    $('rg2-consejo').textContent = 'Completa los datos de tu cartera para ver la proyección.';
  }
}
