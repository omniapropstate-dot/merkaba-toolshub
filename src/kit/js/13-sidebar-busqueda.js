function toolSheetExterno(icon, titulo, desc, url){
  return `<div class="tool-section">
    <div class="tool-header">
      <div class="tool-icon">${icon}</div>
      <div>
        <div class="tool-title">${titulo} <span class="tool-badge" style="background:rgba(66,133,244,0.1);color:#1a73e8;font-size:0.7rem;padding:2px 8px;border-radius:999px;font-weight:700;">Google Sheets</span></div>
        <div class="tool-subtitle">${desc}</div>
      </div>
    </div>
    <div style="background:#f8f9fc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div style="font-size:0.83rem;color:#4a5568;line-height:1.5;">Abre la planilla en Google Sheets. Puedes hacer una copia personal para editarla con tus datos.<br/><span style="font-size:0.78rem;color:#94a3b8;">Solo lectura &mdash; para guardar tus datos usa <strong>Archivo &rarr; Hacer una copia</strong></span></div>
      <a href="${url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#1a73e8;color:#fff;padding:10px 18px;border-radius:8px;font-size:0.85rem;font-weight:700;text-decoration:none;flex-shrink:0;font-family:Inter,sans-serif;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
        Abrir planilla
      </a>
    </div>
  </div>`;
}

// INICIALIZAR
// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// NAVEGACION POR TIPO
// ══════════════════════════════════════════════
var _sidebarTab = 'etapas';

function setSidebarTab(tab){
  _sidebarTab = tab;
  var te = $('tab-etapas'), tt = $('tab-tipos');
  if(te) te.classList.toggle('active', tab==='etapas');
  if(tt) tt.classList.toggle('active', tab==='tipos');
  $('sidebar-phases').innerHTML = '';
  if(tab==='etapas') buildSidebar();
  else buildSidebarTipos();
}

function buildSidebarTipos(){
  var container = $('sidebar-phases');
  TIPOS.forEach(function(t,ti){
    var ph = document.createElement('div');
    ph.className = 'sidebar-phase';
    ph.innerHTML = '<button class="phase-btn" id="sidebar-tipo-'+ti+'" onclick="showTipo('+ti+')"><span class="phase-num" style="font-size:0.9rem;">'+t.icon+'</span>'+t.nombre+'</button>';
    container.appendChild(ph);
  });
}

function showTipo(idx){
  $('phase-mapa').hidden = true;
  $('phase-content').hidden = false;
  var tipo = TIPOS[idx];
  var fakeFase = { id:tipo.id, num:'', nombre:tipo.icon+' '+tipo.nombre, desc:'', color:'navy', tools:tipo.tools };
  $('phase-content').innerHTML = renderFase(fakeFase, -1);
  initCollapsibles();
  document.querySelector('.kit-main').scrollTop = 0;
  window.scrollTo(0,0);
  TIPOS.forEach(function(_,i){
    var b = $('sidebar-tipo-'+i);
    if(b) b.classList.toggle('active', i===idx);
  });
}

// ══════════════════════════════════════════════
// GRIDS DE SELECCION + COLAPSIBLES
// ══════════════════════════════════════════════
function showEtapasGrid(){
  setSidebarTab('etapas');
  $('phase-mapa').hidden = true;
  $('phase-content').hidden = false;
  var html = '<div style="margin-bottom:20px;"><button onclick="showMapa()" class="btn btn-outline btn-sm">← Inicio</button></div>';
  html += '<div class="mapa-grid">';
  FASES.forEach(function(f,i){
    var num = f.id==='transversal' ? 'Siempre disponible' : 'Etapa '+f.num;
    var cnt = f.tools.length+' herramienta'+(f.tools.length>1?'s':'');
    html += '<div class="mapa-card'+(f.color==='gold'?' gold':'')+ '" onclick="showPhase('+i+')"><div class="mapa-num">'+num+'</div><div class="mapa-name">'+f.nombre+'</div><div class="mapa-desc">'+f.desc+'</div><div class="mapa-tools">'+cnt+' →</div></div>';
  });
  html += '</div>';
  $('phase-content').innerHTML = html;
  window.scrollTo(0,0);
}

function showTiposGrid(){
  setSidebarTab('tipos');
  $('phase-mapa').hidden = true;
  $('phase-content').hidden = false;
  var html = '<div style="margin-bottom:20px;"><button onclick="showMapa()" class="btn btn-outline btn-sm">← Inicio</button></div>';
  html += '<div class="mapa-grid">';
  TIPOS.forEach(function(t,i){
    var cnt = t.tools.length+' herramienta'+(t.tools.length>1?'s':'');
    html += '<div class="mapa-card" onclick="showTipo('+i+')"><div class="mapa-num">'+t.icon+'</div><div class="mapa-name">'+t.nombre+'</div><div class="mapa-tools">'+cnt+' →</div></div>';
  });
  html += '</div>';
  $('phase-content').innerHTML = html;
  window.scrollTo(0,0);
}

function showBiblioteca(){
  window.open('https://drive.google.com/drive/folders/1pAF74TtE_bpi2qybJ4az9k_gQaROsvt2', '_blank');
}

function goBack(){
  showMapa();
}

function initCollapsibles(){
  document.querySelectorAll('#phase-content .tool-section').forEach(function(section){
    var header = section.querySelector('.tool-header');
    if(!header || header.dataset.collapsible) return;
    header.dataset.collapsible = '1';
    header.classList.add('collapsible');
    var arrow = document.createElement('span');
    arrow.className = 'collapse-arrow';
    arrow.textContent = '▼';
    header.appendChild(arrow);
    var body = document.createElement('div');
    body.className = 'collapse-body';
    body.style.display = 'none';
    Array.from(section.children).filter(function(c){ return c !== header; }).forEach(function(c){ body.appendChild(c); });
    section.appendChild(body);
    header.onclick = function(){
      var open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      arrow.style.transform = open ? '' : 'rotate(180deg)';
    };
  });
}

// ══════════════════════════════════════════════
// BUSCADOR
// ══════════════════════════════════════════════
var SEARCH_INDEX = [
  {id:'calc-comision',             nombre:'Calculadora de comisión',          tipo:'Calculadoras', icon:'🧮'},
  {id:'calc-tipo-cambio',          nombre:'Calculadora tipo de cambio',       tipo:'Calculadoras', icon:'🧮'},
  {id:'calc-antictretico',         nombre:'Calculadora anticrético',          tipo:'Calculadoras', icon:'🧮'},
  {id:'propuesta-propietario',     nombre:'Propuesta al propietario',         tipo:'Generadores', icon:'✏️'},
  {id:'respuesta-rapida',          nombre:'Respuesta rápida al lead',         tipo:'Generadores', icon:'✏️'},
  {id:'generador-seguimiento',     nombre:'Generador de seguimiento',         tipo:'Generadores', icon:'✏️'},
  {id:'mensaje-postventa',         nombre:'Mensaje post-venta',               tipo:'Generadores', icon:'✏️'},
  {id:'checklist-visita',          nombre:'Checklist de visita',              tipo:'Checklists',  icon:'✅'},
  {id:'checklist-antictretico',    nombre:'Checklist anticrético',            tipo:'Checklists',  icon:'✅'},
  {id:'guia-captacion',            nombre:'Guía de captación',                tipo:'Guías',       icon:'📖'},
  {id:'guia-legal',                nombre:'Guía del proceso legal',            tipo:'Guías',       icon:'📖'},
  {id:'manejador-objeciones',      nombre:'Manejador de objeciones',          tipo:'Guías',       icon:'📖'},
  {id:'banco-scripts',             nombre:'Mensajes para cada momento',       tipo:'Guías',       icon:'📖'},
  {id:'ficha-propiedad',           nombre:'Ficha de propiedad',               tipo:'Formularios', icon:'📄'},
  {id:'filtro-comprador',          nombre:'Filtro de comprador',              tipo:'Formularios', icon:'📄'},
  {id:'comparador-inmuebles',      nombre:'Comparador de inmuebles',          tipo:'Formularios', icon:'📄'},
  {id:'acuerdo-trabajo',           nombre:'Acuerdo de trabajo',               tipo:'Formularios', icon:'📄'},
  {id:'presentacion-personal-word',nombre:'Presentación personal',            tipo:'Formularios', icon:'📄'},
  {id:'cartera-propiedades-excel', nombre:'Control de cartera de propiedades',tipo:'Excel',       icon:'📊'},
  {id:'control-seguimientos-excel',nombre:'Control de seguimientos',          tipo:'Excel',       icon:'📊'},
  {id:'comparador-inmuebles-excel',nombre:'Comparador de inmuebles (Excel)',  tipo:'Excel',       icon:'📊'},
  {id:'calc-anticretico-excel',    nombre:'Calculadora anticrético (Excel)',  tipo:'Excel',       icon:'📊'},
  {id:'registro-comisiones-excel', nombre:'Registro de comisiones',           tipo:'Excel',       icon:'📊'},
  {id:'mis-plantillas',            nombre:'Mis plantillas',                   tipo:'Organizadores',icon:'🗂️'},
  {id:'tablero-pendientes',        nombre:'Tablero de pendientes',            tipo:'Organizadores',icon:'🗂️'},
  {id:'tablero-seguimientos',      nombre:'Seguimientos activos',             tipo:'Organizadores',icon:'🗂️'},
  {id:'generador-anuncio',         nombre:'Generador de anuncio de propiedad',tipo:'Generadores',  icon:'✏️'},
  {id:'guia-visita',               nombre:'Guía de la visita',                tipo:'Guías',        icon:'📖'},
  {id:'diagnostico-comprador',     nombre:'Diagnóstico del comprador',        tipo:'Formularios',  icon:'📄'},
  {id:'generador-referidos',       nombre:'Generador de mensajes de referido',tipo:'Generadores',  icon:'✏️'},
  {id:'reactivador-contactos',     nombre:'Reactivador de contactos pasados', tipo:'Generadores',  icon:'✏️'},
];

function homeAccToggle(id){
  var body = $(id); var arr = $(id+'-arr');
  if(!body) return;
  var open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if(arr) arr.style.transform = open ? '' : 'rotate(180deg)';
}

function onSearchInput(q){
  var res = $('home-search-results');
  if(!res) return;
  q = (q||'').trim().toLowerCase();
  if(q.length < 2){ res.hidden = true; res.innerHTML = ''; return; }
  var hits = SEARCH_INDEX.filter(function(t){
    return t.nombre.toLowerCase().indexOf(q) >= 0 || t.tipo.toLowerCase().indexOf(q) >= 0;
  });
  if(hits.length === 0){
    res.innerHTML = '<div style="font-size:0.82rem;color:var(--text-muted);padding:8px 0;">Sin resultados.</div>';
  } else {
    res.innerHTML = hits.map(function(t){
      var bloqueada = HERRAMIENTAS_TIER2.indexOf(t.id) !== -1 && AGENTE.plan !== 'completo';
      return '<div class="search-result-item" onclick="showSingleTool(\''+t.id+'\')">'
        +'<span style="font-size:1.1rem;">'+t.icon+'</span>'
        +'<div><div class="search-result-name">'+t.nombre+(bloqueada?' 🔒':'')+'</div>'
        +'<div class="search-result-tipo">'+t.tipo+'</div></div>'
        +'</div>';
    }).join('');
  }
  res.hidden = false;
}

function showSingleTool(id){
  var inp = $('home-search-input'); if(inp) inp.value = '';
  var res = $('home-search-results'); if(res){ res.hidden=true; res.innerHTML=''; }
  setSidebarTab('etapas');
  $('phase-mapa').hidden = true;
  $('phase-content').hidden = false;
  var html = '<div style="margin-bottom:20px;"><button onclick="showMapa()" class="btn btn-outline btn-sm">← Inicio</button></div>';
  html += renderTool(id);
  $('phase-content').innerHTML = html;
  initCollapsibles();
  document.querySelector('.kit-main').scrollTop = 0;
}
// ══════════════════════════════════════════════════════════════════
// HERRAMIENTAS NUEVAS
// ══════════════════════════════════════════════════════════════════

