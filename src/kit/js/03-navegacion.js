// ══════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════
function buildSidebar(){
  const container = $('sidebar-phases');
  FASES.forEach((f,fi)=>{
    const ph = document.createElement('div');
    ph.className = 'sidebar-phase';
    ph.innerHTML = `<button class="phase-btn" id="sidebar-phase-${fi}" onclick="showPhase(${fi})"><span class="phase-num">${f.num||'∞'}</span>${f.nombre}</button>`;
    container.appendChild(ph);
  });
}

// ══════════════════════════════════════════════
// NAVEGACIÓN
// ══════════════════════════════════════════════
// Historial del navegador: sin esto, la flecha "atrás" del celular sacaba
// del kit por completo (era la misma pagina de siempre, sin "paginas"
// internas a las que volver) y obligaba a poner la contraseña de nuevo.
// Con un solo nivel Inicio <-> contenido, alcanza con marcar el momento en
// que se sale del Inicio; "atrás" primero vuelve al Inicio del kit, recién
// si se presiona de nuevo estando en el Inicio sale del sitio.
var _enHome = true;
history.replaceState({mkKit:true, view:'home'}, '', location.pathname);
window.addEventListener('popstate', function(e){
  var st = e.state;
  if(!st || !st.mkKit || st.view==='home'){ showMapa(); }
});

function _entrarContenido(){
  if(_enHome){
    history.pushState({mkKit:true, view:'content'}, '', location.pathname);
    _enHome = false;
  } else {
    history.replaceState({mkKit:true, view:'content'}, '', location.pathname);
  }
}

function irAlInicio(){
  if(_enHome){ showMapa(); return; }
  history.back();
}

function showPhase(idx){
  _entrarContenido();
  $('phase-mapa').hidden = true;
  $('phase-content').hidden = false;
  $('phase-content').innerHTML = renderFase(FASES[idx], idx);
  initCollapsibles();
  // scroll top
  document.querySelector('.kit-main').scrollTop = 0;
  window.scrollTo(0,0);
}

function showMapa(){
  _enHome = true;
  $('phase-mapa').hidden = false;
  $('phase-content').hidden = true;
  initHome();
}

// ══════════════════════════════════════════════
// RENDER DE FASE
// ══════════════════════════════════════════════
function renderFase(fase, idx){
  let html = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
      <button onclick="goBack()" class="btn btn-outline btn-sm">← Volver</button>
      <div>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:700;color:var(--navy);">${fase.num ? 'Etapa '+fase.num+' — ' : ''}${fase.nombre}</h2>
        <p style="font-size:0.82rem;color:var(--text-muted);">${fase.desc}</p>
      </div>
    </div>
  `;
  fase.tools.forEach(tid => { html += renderTool(tid); });
  return html;
}

// ══════════════════════════════════════════════
// HERRAMIENTAS
// ══════════════════════════════════════════════
function toolBloqueada(id){
  var info = SEARCH_INDEX.find(function(t){ return t.id === id; });
  var nombre = info ? info.nombre : 'Esta herramienta';
  var icon = info ? info.icon : '🔒';
  var msg = 'Hola! Quiero actualizar mi plan a Completo en el Kit del Agente Inmobiliario.';
  var wa = SOPORTE_WHATSAPP ? 'https://wa.me/'+SOPORTE_WHATSAPP+'?text='+encodeURIComponent(msg) : '#';
  return `<div class="tool-section" id="tool-bloqueada-${id}">
    <div class="tool-header">
      <div class="tool-icon">🔒</div>
      <div>
        <div class="tool-title">${icon} ${esc(nombre)}</div>
        <div class="tool-subtitle">Esta herramienta es parte del plan Completo. Actualizá tu acceso para desbloquearla junto con el resto de las herramientas de ese plan.</div>
      </div>
    </div>
    <div class="btn-group">
      <a class="btn btn-gold" href="${wa}" target="_blank" rel="noopener">💬 Quiero actualizar mi plan</a>
    </div>
  </div>`;
}

function renderTool(id){
  if(HERRAMIENTAS_TIER2.indexOf(id) !== -1 && AGENTE.plan !== 'completo'){
    return toolBloqueada(id);
  }
  switch(id){
    case 'generador-seguimiento': return toolGeneradorSeguimiento();
    case 'calc-comision': return toolCalculadoraComision();
    case 'calc-tipo-cambio': return toolCalculadoraTipoCambio();
    case 'calc-antictretico': return toolCalculadoraAntictretico();
    case 'ficha-propiedad': return toolFichaPropiedad();
    case 'propuesta-propietario': return toolPropuestaPropietario();
    case 'respuesta-rapida': return toolRespuestaRapida();
    case 'filtro-comprador': return toolFiltroComprador();
    case 'manejador-objeciones': return toolManejadorObjeciones();
    case 'checklist-visita': return toolChecklistVisita();
    case 'checklist-antictretico': return toolChecklistAntictretico();
    case 'guia-captacion': return toolGuiaCaptacion();
    case 'guia-legal': return toolGuiaLegal();
    case 'comparador-inmuebles': return toolComparadorInmuebles();
    case 'mensaje-postventa': return toolMensajePostventa();
    case 'generador-anuncio': return toolGeneradorAnuncio();
    case 'guia-visita': return toolGuiaVisita();
    case 'diagnostico-comprador': return toolDiagnosticoComprador();
    case 'generador-referidos': return toolGeneradorReferidos();
    case 'reactivador-contactos': return toolReactivadorContactos();
    case 'banco-scripts': return toolBancoScripts();
    case 'mis-plantillas': return toolMisPlantillas();
    case 'tablero-pendientes': return toolTableroPendientes();
    case 'tablero-seguimientos': return toolTableroSeguimientos();
    case 'cartera-propiedades-excel': return toolSheetExterno('&#128202;','Control de cartera de propiedades','Ficha unificada por inmueble &mdash; zonas, precios, estado de cada propiedad.','https://docs.google.com/spreadsheets/d/1rJyieQfDYvjRKOHyPFdtHcCDZ9T-Bd7A/edit?usp=sharing');
    case 'control-seguimientos-excel': return toolSheetExterno('&#128203;','Control de seguimientos','Registro de todos tus clientes y en qu&#233; etapa est&#225; cada uno.','https://docs.google.com/spreadsheets/d/1BmsbDxB5S3cKt_5hCi7kr6Bga8fXcaBr/edit?usp=sharing');
    case 'registro-comisiones-excel': return toolSheetExterno('&#128176;','Registro de comisiones del mes','Cu&#225;nto ganaste, cu&#225;nto te deben &mdash; control mensual simple.','https://docs.google.com/spreadsheets/d/14K14F8ly5eft-XRGhZjlX8VH2-ah9J07/edit?usp=sharing');
    case 'comparador-inmuebles-excel': return toolSheetExterno('&#128200;','Comparador de inmuebles (plantilla)','Compara hasta 3 propiedades lado a lado &mdash; para mostrar al cliente y guiar la decisi&#243;n.','https://docs.google.com/spreadsheets/d/1M8aGTakJDSp9QIOTnDu5W07aDyLcN9kr/edit?usp=sharing');
    case 'calc-anticretico-excel': return toolSheetExterno('&#128203;','Calculadora de anticr&#233;tico (plantilla)','C&#225;lculo completo: monto, IT, comisi&#243;n, gastos notariales &mdash; en USD y Bs.','https://docs.google.com/spreadsheets/d/1YA_9QK12_LLFBuyG8hFT7TCd1KL3lWil/edit?usp=sharing');
    case 'acuerdo-trabajo': return toolAcuerdoTrabajo();
    case 'presentacion-personal-word': return toolPresentacionPersonal();
    case 'biblioteca': return toolBiblioteca();
    default: return `<div class="tool-section"><p style="color:var(--text-muted);">Herramienta "${id}" en construcción.</p></div>`;
  }
}

// ══════════════════════════════════════════════
// 1. GENERADOR DE SEGUIMIENTO ★ DEMO
// ══════════════════════════════════════════════
