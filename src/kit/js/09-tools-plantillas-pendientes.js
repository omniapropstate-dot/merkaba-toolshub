function toolBancoScripts(){
  const scripts = [
    {cat:'Primera llamada a un propietario', txt:`Hola, buenos días, le habla ${AGENTE.nombre}, soy agente inmobiliario en ${AGENTE.ciudad}. Vi su propiedad publicada y me gustaría reunirme con usted para presentarle cómo puedo ayudarle a venderla al mejor precio. ¿Tendría 20 minutos esta semana?`},
    {cat:'Cuando el comprador pide descuento', txt:`Entiendo que quieres el mejor precio posible. Déjame ver qué puedo hacer — pero para conversarlo bien necesito saber: si el propietario acepta bajar el precio, ¿estás listo para avanzar esta semana?`},
    {cat:'Cuando el vendedor quiere subir el precio', txt:`Le entiendo perfectamente. Sin embargo, el mercado en esta zona está pagando entre X y Y. Si salimos más alto, el inmueble va a estar meses en portales sin consultas, y eso lo perjudica a usted. ¿Probamos al precio de mercado por 60 días y ajustamos si hace falta?`},
    {cat:'Respuesta a "ya tengo agente"', txt:`No hay problema, lo respeto. Solo le digo que si en algún momento la operación no avanza como espera, con gusto le muestro cómo trabajo. Aquí está mi número por si me necesita.`},
    {cat:'Cierre directo', txt:`Hemos visto todo, el precio está bien y el inmueble se ajusta a lo que buscas. ¿Qué necesitas para dar el siguiente paso hoy?`},
    {cat:'Cuando el cliente no contesta', txt:`Hola [nombre], soy ${AGENTE.nombre}. Te escribo brevemente — si ya tomaste una decisión sobre la propiedad, sin problema. Solo dime una palabra y no te molesto más. Si todavía estás evaluando, con gusto te ayudo a resolver dudas. ¡Saludos!`},
  ];

  let html = `<div class="tool-section" id="tool-banco-scripts">
    <div class="tool-header">
      <div class="tool-icon">💬</div>
      <div><div class="tool-title">Banco de scripts <span class="tool-badge badge-guia">Guía</span></div>
      <div class="tool-subtitle">Mensajes listos para las situaciones más comunes. Copia el que necesites, ajústate si hace falta y envía.</div></div>
    </div>
    <div class="scripts-grid">`;

  scripts.forEach((s,i)=>{
    html += `<div class="script-card">
      <div class="script-situation">${s.cat}</div>
      <div class="script-text">"${s.txt}"</div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn btn-outline btn-sm" onclick="copiar(\`${s.txt.replace(/`/g,'\\`')}\`)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(\`${s.txt.replace(/`/g,'\\`')}\`)">💬 WhatsApp</button>
      </div>
    </div>`;
  });

  html += `</div></div>`;
  return html;
}

// ══════════════════════════════════════════════

// ══════════════════════════════════════════════
// 18. MIS PLANTILLAS
// ══════════════════════════════════════════════
function toolMisPlantillas(){
  setTimeout(renderPlantillasLista, 0);
  return `<div class="tool-section" id="tool-mis-plantillas">
    <div class="tool-header">
      <div class="tool-icon">📋</div>
      <div>
        <div class="tool-title">Mis plantillas <span class="tool-badge badge-ordena">Ordena</span></div>
        <div class="tool-subtitle">Guarda los mensajes que más usas. Se sincronizan entre tu celular y tu computadora.</div>
      </div>
    </div>
    <div style="display:grid;gap:10px;margin-bottom:20px;">
      <div class="form-group"><label>Título de la plantilla</label><input id="plt-titulo" type="text" placeholder="Ej: Seguimiento día 3, Respuesta a precio alto..."/></div>
      <div class="form-group"><label>Mensaje</label><textarea id="plt-contenido" rows="3" placeholder="Escribí o pegá aquí el mensaje que querés guardar..."></textarea></div>
      <button class="btn btn-primary" style="align-self:flex-start;" onclick="guardarNuevaPlantilla()">💾 Guardar plantilla</button>
    </div>
    <div id="plt-lista-container">
      <div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:20px 0;">Aún no tenés plantillas guardadas.</div>
    </div>
  </div>`;
}

function getPlantillas(){ return JSON.parse(localStorage.getItem('mk_plantillas')||'[]'); }
function setPlantillas(arr){ localStorage.setItem('mk_plantillas', JSON.stringify(arr)); sbSavePlantillas(arr); }

function guardarNuevaPlantilla(){
  const titulo = ($('plt-titulo').value||'').trim();
  const contenido = ($('plt-contenido').value||'').trim();
  if(!titulo||!contenido){ toast('Completá el título y el mensaje'); return; }
  const arr = getPlantillas();
  arr.unshift({id: Date.now(), titulo, contenido});
  setPlantillas(arr);
  $('plt-titulo').value=''; $('plt-contenido').value='';
  renderPlantillasLista();
  toast('Plantilla guardada ✓');
}

function eliminarPlantilla(id){
  setPlantillas(getPlantillas().filter(p => p.id !== id));
  renderPlantillasLista();
  toast('Plantilla eliminada');
}

function renderPlantillasLista(){
  const cont = $('plt-lista-container');
  if(!cont) return;
  const arr = getPlantillas();
  if(!arr.length){
    cont.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:20px 0;">Aún no tenés plantillas guardadas.</div>';
    return;
  }
  cont.innerHTML = '<div style="display:grid;gap:10px;">' + arr.map(p => {
    const safe = p.contenido.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
    return `<div class="script-card">
      <div class="script-situation">${esc(p.titulo)}</div>
      <div style="font-size:0.87rem;color:var(--text);margin-top:6px;white-space:pre-wrap;">${esc(p.contenido)}</div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" onclick="copiar(this.dataset.t)" data-t="${p.contenido.replace(/"/g,'&quot;')}">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(this.dataset.t)" data-t="${p.contenido.replace(/"/g,'&quot;')}">💬 WhatsApp</button>
        <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="eliminarPlantilla(${p.id})">🗑 Eliminar</button>
      </div>
    </div>`;
  }).join('') + '</div>';
}

// ══════════════════════════════════════════════
// 19. TABLERO DE PENDIENTES
// ══════════════════════════════════════════════
function toolTableroPendientes(){
  setTimeout(renderPendientesLista, 0);
  const hoy = new Date().toLocaleDateString('es-BO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const hoyFmt = hoy.charAt(0).toUpperCase() + hoy.slice(1);
  return `<div class="tool-section" id="tool-tablero-pendientes">
    <div class="tool-header">
      <div class="tool-icon">📅</div>
      <div>
        <div class="tool-title">Pendientes del día <span class="tool-badge badge-ordena">Ordena</span></div>
        <div class="tool-subtitle">${hoyFmt} — Tus tareas de hoy. Se guardan y puedes verlas desde cualquier dispositivo.</div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:16px;">
      <input id="pend-nueva" type="text" style="flex:1;padding:9px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:0.9rem;background:var(--surface-2);color:var(--text);" placeholder="Ej: Llamar a María sobre el dpto. en Sopocachi..." onkeydown="if(event.key==='Enter')agregarPendiente()"/>
      <button class="btn btn-primary" onclick="agregarPendiente()">+ Agregar</button>
    </div>
    <div id="pend-lista-container">
      <div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:20px 0;">No hay tareas. ¡Agregá la primera!</div>
    </div>
    <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
      <div id="pend-contador" style="font-size:0.8rem;color:var(--text-muted);"></div>
      <button class="btn btn-outline btn-sm" onclick="limpiarPendientesHechos()">🗑 Limpiar completadas</button>
    </div>
  </div>`;
}

function getPendientes(){ return JSON.parse(localStorage.getItem('mk_pendientes')||'[]'); }
function setPendientes(arr){ localStorage.setItem('mk_pendientes', JSON.stringify(arr)); sbSavePendientes(arr); }

function agregarPendiente(){
  const input = $('pend-nueva');
  const texto = (input.value||'').trim();
  if(!texto){ toast('Escribí una tarea primero'); return; }
  const arr = getPendientes();
  arr.push({id: Date.now(), texto, hecho: false});
  setPendientes(arr);
  input.value='';
  renderPendientesLista();
}

function togglePendiente(id){
  const arr = getPendientes().map(p => p.id===id ? Object.assign({},p,{hecho:!p.hecho}) : p);
  setPendientes(arr);
  renderPendientesLista();
}

function eliminarPendiente(id){
  setPendientes(getPendientes().filter(p => p.id !== id));
  renderPendientesLista();
}

function limpiarPendientesHechos(){
  const antes = getPendientes().length;
  const arr = getPendientes().filter(p => !p.hecho);
  if(antes === arr.length){ toast('No hay completadas'); return; }
  setPendientes(arr);
  renderPendientesLista();
  toast('Completadas eliminadas');
}

function renderPendientesLista(){
  const cont = $('pend-lista-container');
  const counter = $('pend-contador');
  if(!cont) return;
  const arr = getPendientes();
  if(!arr.length){
    cont.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:20px 0;">No hay tareas. ¡Agregá la primera!</div>';
    if(counter) counter.textContent='';
    return;
  }
  const hechas = arr.filter(p=>p.hecho).length;
  cont.innerHTML = '<div style="display:grid;gap:8px;">' + arr.map(p =>
    `<div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;background:${p.hecho?'var(--surface-2)':'var(--surface)'};border:1px solid var(--border);border-radius:var(--radius-sm);${p.hecho?'opacity:0.65;':''}">
      <input type="checkbox" ${p.hecho?'checked':''} onchange="togglePendiente(${p.id})" style="margin-top:3px;width:16px;height:16px;accent-color:var(--navy);flex-shrink:0;cursor:pointer;">
      <span style="flex:1;font-size:0.9rem;${p.hecho?'text-decoration:line-through;color:var(--text-muted);':''}">${esc(p.texto)}</span>
      <button onclick="eliminarPendiente(${p.id})" style="background:none;border:none;cursor:pointer;color:var(--text-light);font-size:1rem;padding:0 2px;flex-shrink:0;" title="Eliminar">✕</button>
    </div>`
  ).join('') + '</div>';
  if(counter) counter.textContent = hechas + ' de ' + arr.length + ' completadas';
}

// ── HELPERS ────────────────────────────────────────────────────────────────────

async function sbSavePlantillas(arr){
  const id = localStorage.getItem('mk_id'); if(!id) return;
  try{ await fetch(SB_URL+'/rest/v1/rpc/save_plantillas',{method:'POST',headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},body:JSON.stringify({p_id:id,p_plantillas:arr})}); }catch(e){}
}
async function sbSavePendientes(arr){
  const id = localStorage.getItem('mk_id'); if(!id) return;
  try{ await fetch(SB_URL+'/rest/v1/rpc/save_pendientes',{method:'POST',headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},body:JSON.stringify({p_id:id,p_pendientes:arr})}); }catch(e){}
}

// 17. DESCARGABLES (placeholder hasta tener los archivos reales)
// ══════════════════════════════════════════════
