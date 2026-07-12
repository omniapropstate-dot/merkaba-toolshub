function _scriptsPorCategoria(){
  return {
    'Captación': [
      {cat:'Primera llamada a un propietario', txt:`Hola, buenos días, le habla ${AGENTE.nombre}, soy agente inmobiliario en ${AGENTE.ciudad}. Vi su propiedad publicada y me gustaría reunirme con usted para presentarle cómo puedo ayudarle a venderla al mejor precio. ¿Tendría 20 minutos esta semana?`},
      {cat:'El propietario no contesta, insistís por WhatsApp', txt:`Hola, buenas, le escribe ${AGENTE.nombre}, agente inmobiliario en ${AGENTE.ciudad}. Le llamé hace un rato sobre su propiedad — cuando tenga un momento, me encantaría conversar sobre cómo puedo ayudarle a venderla al mejor precio. Quedo atento por este medio.`},
      {cat:'Después de la reunión, pedís la exclusiva', txt:`Fue un gusto conversar hoy. Para trabajar su propiedad con toda mi dedicación — publicación, filtro de interesados y negociación activa — le propongo trabajar en exclusiva por 60-90 días. Así evitamos que la propiedad se publique duplicada con precios distintos y perdamos seriedad frente a los compradores. ¿Le parece bien que preparemos el acuerdo?`},
    ],
    'Primer contacto con un interesado': [
      {cat:'Alguien pregunta el precio antes de darte sus datos', txt:`Hola! Con gusto te paso toda la información. El precio es $[precio]. Para enviarte la ficha completa con fotos y coordinar una visita si te interesa, ¿me confirmás tu nombre y si preferís que te contacte por acá o por WhatsApp?`},
      {cat:'Consulta desde un portal (UltraCasas/InfoCasas) sin muchos datos', txt:`Hola, gracias por escribir. Soy ${AGENTE.nombre}. Te cuento que la propiedad sigue disponible — ¿querés que te comparta más fotos y detalles, o coordinamos directamente una visita?`},
      {cat:'Respuesta a "ya tengo agente"', txt:`No hay problema, lo respeto. Solo le digo que si en algún momento la operación no avanza como espera, con gusto le muestro cómo trabajo. Aquí está mi número por si me necesita.`},
    ],
    'Seguimiento': [
      {cat:'Cuando el cliente no contesta', txt:`Hola [nombre], soy ${AGENTE.nombre}. Te escribo brevemente — si ya tomaste una decisión sobre la propiedad, sin problema. Solo dime una palabra y no te molesto más. Si todavía estás evaluando, con gusto te ayudo a resolver dudas. ¡Saludos!`},
      {cat:'Seguimiento a los 3 días de la visita', txt:`Hola [nombre], soy ${AGENTE.nombre}. Quería saber cómo quedaste pensando la propiedad que visitamos. ¿Tenés alguna duda que pueda ayudarte a resolver antes de que decidas?`},
      {cat:'Reactivar a alguien que dijo "lo voy a pensar" hace semanas', txt:`Hola [nombre]! Sé que quedamos en que lo ibas a pensar hace un tiempo — no quería dejar de escribirte. ¿Seguís en la búsqueda? Si es así, tengo novedades que capaz te interesan.`},
    ],
    'Negociación y cierre': [
      {cat:'Cuando el comprador pide descuento', txt:`Entiendo que quieres el mejor precio posible. Déjame ver qué puedo hacer — pero para conversarlo bien necesito saber: si el propietario acepta bajar el precio, ¿estás listo para avanzar esta semana?`},
      {cat:'Cuando el vendedor quiere subir el precio', txt:`Le entiendo perfectamente. Sin embargo, el mercado en esta zona está pagando entre X y Y. Si salimos más alto, el inmueble va a estar meses en portales sin consultas, y eso lo perjudica a usted. ¿Probamos al precio de mercado por 60 días y ajustamos si hace falta?`},
      {cat:'Cierre directo', txt:`Hemos visto todo, el precio está bien y el inmueble se ajusta a lo que buscas. ¿Qué necesitas para dar el siguiente paso hoy?`},
      {cat:'Confirmar la cita de firma en notaría', txt:`Hola [nombre], le confirmo que la firma en notaría queda para el [fecha] a las [hora] en [dirección de la notaría]. Por favor lleve su cédula de identidad original. Cualquier duda antes, quedo a su disposición.`},
    ],
  };
}

function toolBancoScripts(){
  const categorias = _scriptsPorCategoria();
  let cuerpo = '';
  Object.keys(categorias).forEach(function(nombreCat, ci){
    cuerpo += `<div style="font-size:0.8rem;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:0.06em;margin:${ci===0?'0':'18px'} 0 8px;">${nombreCat}</div>`;
    categorias[nombreCat].forEach(function(s, si){
      const accId = 'scr-'+ci+'-'+si;
      const attr = esc(s.txt);
      cuerpo += `<div class="home-acc" style="margin-bottom:8px;">
        <button class="home-acc-hdr" onclick="homeAccToggle('${accId}')">
          <span>${esc(s.cat)}</span>
          <span id="${accId}-arr" class="home-acc-arr">▼</span>
        </button>
        <div id="${accId}" class="home-acc-body" style="display:none;">
          <div style="padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.84rem;color:var(--text);line-height:1.6;">
            "${esc(s.txt)}"
            <div style="margin-top:8px;display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" data-t="${attr}" onclick="copiar(this.dataset.t)">📋 Copiar</button>
              <button class="btn btn-outline btn-sm" data-t="${attr}" onclick="abrirWhatsApp(this.dataset.t)">💬 WhatsApp</button>
            </div>
          </div>
        </div>
      </div>`;
    });
  });

  return `<div class="tool-section" id="tool-banco-scripts">
    <div class="tool-header">
      <div class="tool-icon">💬</div>
      <div><div class="tool-title">Mensajes para cada momento <span class="tool-badge badge-guia">Guía</span></div>
      <div class="tool-subtitle">Mensajes listos organizados por momento del proceso — desde captar al propietario hasta confirmar la firma. Copia el que necesites, ajústalo si hace falta y envía.</div></div>
    </div>
    ${cuerpo}
  </div>`;
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

// ══════════════════════════════════════════════
// 20. TABLERO DE SEGUIMIENTOS
// ══════════════════════════════════════════════
function toolTableroSeguimientos(){
  setTimeout(renderSeguimientosLista, 0);
  return `<div class="tool-section" id="tool-tablero-seguimientos">
    <div class="tool-header">
      <div class="tool-icon gold">🎯</div>
      <div>
        <div class="tool-title">Seguimientos activos <span class="tool-badge badge-ordena">Ordena</span></div>
        <div class="tool-subtitle">La mayoría de leads se pierde por falta de seguimiento, no por mala calidad. Cargá a quién le debés seguir y el kit te avisa cuándo te toca. Tu plan permite hasta ${LIMITE_SEGUIMIENTOS} seguimientos activos.</div>
      </div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del cliente</label><input id="sg-nombre" type="text" placeholder="María Quispe"/></div>
      <div class="form-group"><label>Propiedad (opcional)</label><input id="sg-propiedad" type="text" placeholder="Dpto. 3 amb. Sopocachi"/></div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Último contacto</label><input id="sg-fecha" type="date" value="${_hoyISO()}"/></div>
      <div class="form-group"><label>Recordarme en</label>
        <select id="sg-dias">
          <option value="1">1 día</option>
          <option value="2">2 días</option>
          <option value="3" selected>3 días</option>
          <option value="5">5 días</option>
          <option value="7">7 días</option>
          <option value="15">15 días</option>
        </select>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:16px;">
      <label>Nota (opcional)</label>
      <input id="sg-nota" type="text" placeholder="Ej: quedó en consultar con su pareja"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="agregarSeguimiento()">+ Agregar seguimiento</button>
    </div>
    <div id="sg-lista-container" style="margin-top:20px;"></div>
    <div id="sg-contador" style="margin-top:10px;font-size:0.8rem;color:var(--text-muted);"></div>
  </div>`;
}

function getSeguimientos(){ return JSON.parse(localStorage.getItem('mk_seguimientos')||'[]'); }
function setSeguimientos(arr){ localStorage.setItem('mk_seguimientos', JSON.stringify(arr)); sbSaveSeguimientos(arr); }

function _hoyISO(){
  var d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function _sumarDias(fechaISO, dias){
  var d = new Date(fechaISO+'T00:00:00');
  d.setDate(d.getDate()+parseInt(dias,10));
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function _diasEntre(fechaISO){
  var hoy = new Date(_hoyISO()+'T00:00:00');
  var f = new Date(fechaISO+'T00:00:00');
  return Math.round((f-hoy)/86400000);
}

function agregarSeguimiento(){
  var nombre = ($('sg-nombre').value||'').trim();
  if(!nombre){ toast('Escribí el nombre del cliente'); return; }
  var arr = getSeguimientos();
  if(arr.length >= LIMITE_SEGUIMIENTOS){
    toast('Llegaste al máximo de tu plan ('+LIMITE_SEGUIMIENTOS+'). Eliminá uno para agregar otro.');
    return;
  }
  var propiedad = ($('sg-propiedad').value||'').trim();
  var fecha = $('sg-fecha').value || _hoyISO();
  var dias = $('sg-dias').value;
  var nota = ($('sg-nota').value||'').trim();
  arr.push({
    id: Date.now(),
    nombre: nombre,
    propiedad: propiedad,
    fechaContacto: fecha,
    dias: dias,
    proximoContacto: _sumarDias(fecha, dias),
    nota: nota
  });
  setSeguimientos(arr);
  $('sg-nombre').value=''; $('sg-propiedad').value=''; $('sg-nota').value='';
  $('sg-fecha').value = _hoyISO();
  renderSeguimientosLista();
  toast('Seguimiento agregado ✓');
}

function marcarContactadoHoy(id){
  var arr = getSeguimientos().map(function(s){
    if(s.id !== id) return s;
    var hoy = _hoyISO();
    return Object.assign({}, s, {fechaContacto: hoy, proximoContacto: _sumarDias(hoy, s.dias)});
  });
  setSeguimientos(arr);
  renderSeguimientosLista();
  toast('Marcado como contactado hoy');
}

function eliminarSeguimiento(id){
  setSeguimientos(getSeguimientos().filter(function(s){ return s.id !== id; }));
  renderSeguimientosLista();
  toast('Seguimiento eliminado');
}

function renderSeguimientosLista(){
  var cont = $('sg-lista-container');
  var contador = $('sg-contador');
  if(!cont) return;
  var arr = getSeguimientos().slice().sort(function(a,b){ return a.proximoContacto.localeCompare(b.proximoContacto); });
  if(contador) contador.textContent = arr.length + ' de ' + LIMITE_SEGUIMIENTOS + ' seguimientos usados';
  if(!arr.length){
    cont.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:20px 0;">Aún no cargaste ningún seguimiento.</div>';
    return;
  }
  cont.innerHTML = '<div style="display:grid;gap:10px;">' + arr.map(function(s){
    var diff = _diasEntre(s.proximoContacto);
    var badge = diff < 0 ? '<span style="color:#e74c3c;font-weight:700;">🔴 Atrasado hace '+Math.abs(diff)+' día'+(Math.abs(diff)>1?'s':'')+'</span>'
      : diff === 0 ? '<span style="color:var(--gold);font-weight:700;">🟡 Hoy</span>'
      : '<span style="color:var(--text-muted);">🟢 En '+diff+' día'+(diff>1?'s':'')+'</span>';
    return '<div class="script-card">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">'
      + '<div class="script-situation">'+esc(s.nombre)+(s.propiedad ? ' — '+esc(s.propiedad) : '')+'</div>'
      + badge
      + '</div>'
      + (s.nota ? '<div style="font-size:0.85rem;color:var(--text);margin-top:6px;">'+esc(s.nota)+'</div>' : '')
      + '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">'
      + '<button class="btn btn-outline btn-sm" onclick="marcarContactadoHoy('+s.id+')">✓ Contactado hoy</button>'
      + '<button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="eliminarSeguimiento('+s.id+')">🗑 Eliminar</button>'
      + '</div></div>';
  }).join('') + '</div>';
}

// ── HELPERS ────────────────────────────────────────────────────────────────────

async function sbSavePlantillas(arr){
  if(AGENTE.esDemo) return;
  const id = localStorage.getItem('mk_id'); if(!id) return;
  try{ await fetch(SB_URL+'/rest/v1/rpc/save_plantillas',{method:'POST',headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},body:JSON.stringify({p_id:id,p_plantillas:arr})}); }catch(e){}
}
async function sbSavePendientes(arr){
  if(AGENTE.esDemo) return;
  const id = localStorage.getItem('mk_id'); if(!id) return;
  try{ await fetch(SB_URL+'/rest/v1/rpc/save_pendientes',{method:'POST',headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},body:JSON.stringify({p_id:id,p_pendientes:arr})}); }catch(e){}
}
async function sbSaveSeguimientos(arr){
  if(AGENTE.esDemo) return;
  const id = localStorage.getItem('mk_id'); if(!id) return;
  try{ await fetch(SB_URL+'/rest/v1/rpc/save_seguimientos',{method:'POST',headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY},body:JSON.stringify({p_id:id,p_seguimientos:arr})}); }catch(e){}
}

// 17. DESCARGABLES (placeholder hasta tener los archivos reales)
// ══════════════════════════════════════════════
