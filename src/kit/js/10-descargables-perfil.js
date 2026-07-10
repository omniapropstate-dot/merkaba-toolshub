function toolDescargable(id, icon, nombre, formato, desc, btnLabel, familia){
  const badgeClass = familia==='ordena'?'badge-ordena':'badge-hace';
  const badgeLabel = familia==='ordena'?'Ordena':'Hace';
  return `<div class="tool-section" id="tool-${id}">
    <div class="tool-header">
      <div class="tool-icon">${icon}</div>
      <div><div class="tool-title">${nombre} <span class="tool-badge ${badgeClass}">${badgeLabel}</span></div>
      <div class="tool-subtitle">${desc}</div></div>
    </div>
    <div class="download-card">
      <div class="download-icon">${icon}</div>
      <div class="download-info">
        <h4>${nombre}</h4>
        <p>${formato} — Descarga y llena en tu computadora. Tus datos nunca salen de tu equipo.</p>
      </div>
      <button class="btn btn-primary btn-sm" onclick="toast('Plantilla disponible próximamente')">📥 ${btnLabel}</button>
    </div>
    <div style="font-size:0.78rem;color:var(--text-muted);margin-top:8px;">Las plantillas descargables estarán disponibles al momento del lanzamiento.</div>
  </div>`;
}

// ══════════════════════════════════════════════
// PERFIL DEL AGENTE
const SB_URL = 'https://rdmqlclavqbhrhxbkiwo.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbXFsY2xhdnFiaHJoeGJraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTQyMTUsImV4cCI6MjA5NzAzMDIxNX0.y06LLkP2TuyffScZl-rGNsl1pMLtpqYSisBG8-t727Q';

function abrirPerfil(){
  $('perfil-nombre').value = AGENTE.nombre;
  $('perfil-ciudad').value = AGENTE.ciudad;
  $('perfil-whatsapp').value = AGENTE.whatsapp;
  $('perfil-email').value = AGENTE.email;
  $('perfil-email').value = AGENTE.email;
  const foto = localStorage.getItem('mk_foto');
  const ring = $('photo-ring-preview');
  if(foto){ ring.innerHTML = '<img src="'+foto+'" alt="foto"/>'; } else { ring.innerHTML = '&#128100;'; }
  $('perfil-msg').textContent = '';
  $('perfil-modal').classList.add('open');
}

function cerrarPerfil(){ $('perfil-modal').classList.remove('open'); }

function cargarFoto(input){
  const file = input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = async function(e){
    const base64 = e.target.result;
    localStorage.setItem('mk_foto', base64);
    $('photo-ring-preview').innerHTML = '<img src="'+base64+'" alt="foto"/>';
    const id = localStorage.getItem('mk_id'); if(!id) return;
    try{ await fetch(SB_URL+'/rest/v1/rpc/client_update_profile',{method:'POST',headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},body:JSON.stringify({p_id:id,p_nombre:localStorage.getItem('mk_nombre')||''  ,p_ciudad:localStorage.getItem('mk_ciudad')||''  ,p_whatsapp:localStorage.getItem('mk_whatsapp')||''  ,p_email:localStorage.getItem('mk_email')||''  ,p_foto:base64})}); }catch(e){}
  };
  reader.readAsDataURL(file);
}

async function guardarPerfil(){
  const nombre = $('perfil-nombre').value.trim();
  const ciudad = $('perfil-ciudad').value.trim();
  const whatsapp = $('perfil-whatsapp').value.trim();
  const email = $('perfil-email').value.trim();
  const msg = $('perfil-msg');
  if(!nombre){ msg.style.color='#c0392b'; msg.textContent='El nombre no puede estar vacio.'; return; }
  const id = localStorage.getItem('mk_id');
  try {
    await fetch(SB_URL+'/rest/v1/rpc/client_update_profile', {
      method:'POST',
      headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},
      body:JSON.stringify({p_id:id, p_nombre:nombre, p_ciudad:ciudad, p_whatsapp:whatsapp, p_email:email, p_foto:localStorage.getItem('mk_foto')||null})
    });
  } catch(e){ console.warn('Supabase update skipped'); }
  localStorage.setItem('mk_nombre', nombre);
  localStorage.setItem('mk_ciudad', ciudad);
  localStorage.setItem('mk_whatsapp', whatsapp);
  localStorage.setItem('mk_email', email);
  AGENTE.nombre = nombre;
  AGENTE.ciudad = ciudad;
  AGENTE.whatsapp = whatsapp;
  AGENTE.email = email;
  $('agent-badge').textContent = nombre;
  msg.style.color = '#2F9E6E';
  msg.textContent = 'Perfil actualizado.';
  setTimeout(cerrarPerfil, 1200);
}

function logoutKit(){
  localStorage.clear();
  window.location.href = '/login';
}

var _installPrompt = null;
window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault();
  _installPrompt = e;
});

function instalarApp(){
  if(_installPrompt){
    _installPrompt.prompt();
    _installPrompt.userChoice.then(function(){ _installPrompt = null; });
  } else {
    toast('Para instalar: menú del navegador → "Agregar a pantalla de inicio"');
  }
}

function toggleMobileMenu(){
  $('mobile-overlay').classList.toggle('open');
  $('mobile-sidebar').classList.toggle('open');
}

function buildMobileSidebar(){
  var container = $('mobile-sidebar-phases');
  if(!container) return;
  container.innerHTML = '';
  var tabsEl = document.createElement('div');
  tabsEl.style.cssText = 'display:flex;border-bottom:1px solid var(--border);';
  tabsEl.innerHTML = '<button id="mob-tab-etapas" style="flex:1;padding:10px 4px;background:none;border:none;border-bottom:2px solid var(--navy);cursor:pointer;font-size:0.75rem;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:0.04em;" onclick="buildMobileContent(\'etapas\',this)">Por etapa</button>'
    + '<button id="mob-tab-tipos" style="flex:1;padding:10px 4px;background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;" onclick="buildMobileContent(\'tipos\',this)">Por tipo</button>';
  container.appendChild(tabsEl);
  var listEl = document.createElement('div');
  listEl.id = 'mob-list';
  container.appendChild(listEl);
  buildMobileContent('etapas', $('mob-tab-etapas'));
}

function buildMobileContent(tab, btnEl){
  var listEl = $('mob-list'); if(!listEl) return;
  listEl.innerHTML = '';
  [$('mob-tab-etapas'),$('mob-tab-tipos')].forEach(function(b){
    if(b){ b.style.borderBottomColor='transparent'; b.style.color='var(--text-muted)'; }
  });
  if(btnEl){ btnEl.style.borderBottomColor='var(--navy)'; btnEl.style.color='var(--navy)'; }
  var items = tab==='etapas' ? FASES : TIPOS;
  items.forEach(function(item,i){
    var btn = document.createElement('button');
    btn.style.cssText = 'width:100%;text-align:left;padding:10px 20px;background:none;border:none;cursor:pointer;font-family:Inter,sans-serif;font-size:0.85rem;font-weight:600;color:var(--navy);border-bottom:1px solid var(--border);';
    btn.textContent = tab==='etapas' ? (item.num?'Etapa '+item.num+' — ':'') + item.nombre : item.icon+' '+item.nombre;
    btn.onclick = function(){ setSidebarTab(tab); if(tab==='etapas') showPhase(i); else showTipo(i); toggleMobileMenu(); };
    listEl.appendChild(btn);
  });
}



// ══════════════════════════════════════════════
// FOTOS DE PROPIEDAD
// ══════════════════════════════════════════════
var _fotosPropiedad = [];

function _normalizePhoto(dataUrl, callback){
  var img = new Image();
  img.onload = function(){
    var tw = 480, th = 320;
    var scale = Math.min(tw / img.width, th / img.height);
    var dw = Math.round(img.width * scale);
    var dh = Math.round(img.height * scale);
    var dx = Math.round((tw - dw) / 2);
    var dy = Math.round((th - dh) / 2);
    var cv = document.createElement('canvas');
    cv.width = tw; cv.height = th;
    var ctx = cv.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, tw, th);
    ctx.drawImage(img, dx, dy, dw, dh);
    callback(cv.toDataURL('image/jpeg', 0.88));
  };
  img.src = dataUrl;
}

function cargarFotosPropiedad(input){
  var files = Array.from(input.files).slice(0, 5);
  _fotosPropiedad = new Array(files.length);
  var preview = $('ficha-fotos-preview');
  if(preview) preview.innerHTML = '';
  files.forEach(function(file, i){
    var reader = new FileReader();
    reader.onload = function(e){
      _normalizePhoto(e.target.result, function(croppedUrl){
        _fotosPropiedad[i] = croppedUrl;
        if(preview){
          var img = document.createElement('img');
          img.src = croppedUrl;
          img.style.cssText = 'width:72px;height:54px;object-fit:fill;border-radius:6px;border:2px solid var(--gold);';
          preview.appendChild(img);
        }
      });
    };
    reader.readAsDataURL(file);
  });
}

// ═══════════════════════
