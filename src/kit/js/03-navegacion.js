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
  container.appendChild(_sidebarBibliotecaRow());
}

// Biblioteca no pertenece a ninguna FASE ni TIPO — fila aparte, separada con un
// divisor, al final de ambas listas (Por etapa y Por tipo) del sidebar.
function _sidebarBibliotecaRow(){
  const ph = document.createElement('div');
  ph.className = 'sidebar-phase';
  ph.style.cssText = 'margin-top:6px;padding-top:6px;border-top:1px solid var(--border);';
  ph.innerHTML = `<button class="phase-btn" onclick="showBiblioteca()"><span class="phase-num">📚</span>Biblioteca</button>`;
  return ph;
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
  // resaltar la etapa activa en el sidebar (mismo patron que showTipo)
  FASES.forEach(function(_,i){
    var b = $('sidebar-phase-'+i);
    if(b) b.classList.toggle('active', i===idx);
  });
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
  // Esencial primero, Profesional despues — mismo orden dentro de cada grupo.
  var tools = fase.tools.slice().sort(function(a,b){
    var aT2 = HERRAMIENTAS_TIER2.indexOf(a) !== -1 ? 1 : 0;
    var bT2 = HERRAMIENTAS_TIER2.indexOf(b) !== -1 ? 1 : 0;
    return aT2 - bT2;
  });
  tools.forEach(tid => { html += renderTool(tid); });
  return html;
}

// ══════════════════════════════════════════════
// HERRAMIENTAS
// ══════════════════════════════════════════════
// Cartel de una herramienta del plan Profesional vista por alguien del
// Esencial: reusa el header REAL de la herramienta (icono/titulo/subtitulo,
// tal cual los vería un cliente Profesional) en vez de repetir ese texto a
// mano — asi si se edita la descripcion de la herramienta, el cartel de
// bloqueo se actualiza solo. El cuerpo (mensaje + boton) queda como
// hermano del header, asi initCollapsibles() ya lo hace desplegable con el
// mismo click de "abrir herramienta" que usa cualquier otra, sin logica
// nueva por boton.
function toolBloqueada(id){
  var div = document.createElement('div');
  div.innerHTML = _renderToolInner(id);
  var headerEl = div.querySelector('.tool-header');
  var headerHtml = headerEl ? headerEl.outerHTML : '';
  return `<div class="tool-section tool-locked" id="tool-bloqueada-${id}">
    ${headerHtml}
    <div class="tool-locked-msg">🔒 Esta herramienta es parte del <b>Plan Profesional</b>. Actualiza tu acceso para desbloquearla junto con el resto de las herramientas de ese plan.</div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="abrirPlanModal('Profesional')">📲 Ver el Plan Profesional y pagar</button>
    </div>
  </div>`;
}

function renderTool(id){
  if(HERRAMIENTAS_TIER2.indexOf(id) !== -1 && AGENTE.plan !== 'completo'){
    return toolBloqueada(id);
  }
  return _renderToolInner(id);
}

function _renderToolInner(id){
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
    case 'diagnostico-comprador': return toolDiagnosticoComprador();
    case 'banco-scripts': return toolBancoScripts();
    case 'mis-plantillas': return toolMisPlantillas();
    case 'tablero-pendientes': return toolTableroPendientes();
    case 'tablero-seguimientos': return toolTableroSeguimientos();
    case 'cartera-propiedades-excel': return toolSheetExterno('cartera-propiedades-excel','&#128202;','Control de cartera de propiedades','Ficha unificada por inmueble &mdash; zonas, precios, estado de cada propiedad.','https://docs.google.com/spreadsheets/d/1rJyieQfDYvjRKOHyPFdtHcCDZ9T-Bd7A/edit?usp=sharing');
    case 'control-seguimientos-excel': return toolSheetExterno('control-seguimientos-excel','&#128203;','Tu CRM completo, sin l&iacute;mite de registros','Guarda TODOS tus clientes y en qu&eacute; etapa est&aacute; cada uno &mdash; no solo los que necesit&aacute;s recordar esta semana (eso ya lo hace el tablero de Seguimientos activos).','https://docs.google.com/spreadsheets/d/1BmsbDxB5S3cKt_5hCi7kr6Bga8fXcaBr/edit?usp=sharing');
    case 'registro-comisiones-excel': return toolSheetExterno('registro-comisiones-excel','&#128176;','Registro de comisiones del mes','Cu&#225;nto ganaste, cu&#225;nto te deben &mdash; control mensual simple.','https://docs.google.com/spreadsheets/d/14K14F8ly5eft-XRGhZjlX8VH2-ah9J07/edit?usp=sharing');
    case 'acuerdo-trabajo': return toolAcuerdoTrabajo();
    case 'presentacion-personal-word': return toolPresentacionPersonal();
    default: return `<div class="tool-section"><p style="color:var(--text-muted);">Herramienta "${id}" en construcción.</p></div>`;
  }
}

// ══════════════════════════════════════════════
// 1. GENERADOR DE SEGUIMIENTO ★ DEMO
// ══════════════════════════════════════════════
