function toolRespuestaRapida(){
  return `<div class="tool-section" id="tool-respuesta">
    <div class="tool-header">
      <div class="tool-icon gold">⚡</div>
      <div><div class="tool-title">Respuesta rápida a consultas</div>
      <div class="tool-subtitle">El que responde rápido tiene más chances de cerrar. Genera tu primera respuesta en segundos y pégala directo en WhatsApp.</div></div>
    </div>
    ${badgesHerramienta('respuesta-rapida')}
    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del interesado (si lo sabes)</label><input id="rr-nombre" type="text" placeholder="Juan (o dejarlo vacío)"/></div>
      <div class="form-group"><label>¿Por qué canal llegó la consulta?</label>
        <select id="rr-canal"><option>Facebook</option><option>UltraCasas</option><option>InfoCasas</option><option>WhatsApp directo</option><option>Instagram</option></select>
      </div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>Propiedad por la que pregunta</label><input id="rr-propiedad" type="text" placeholder="Dpto. en Sopocachi de 3 ambientes"/></div>
      <div class="form-group"><label>¿Qué información tienes disponible ahora?</label>
        <select id="rr-info">
          <option value="completa">Toda la información disponible</option>
          <option value="precio">Solo el precio</option>
          <option value="sin-precio">Sin el precio definido aún</option>
        </select>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarRespuesta()">Generar respuesta</button>
    </div>
    <div id="rr-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu primera respuesta</div>
        <div class="result-text" id="rr-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('rr-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(document.getElementById('rr-texto').textContent)">💬 Abrir en WhatsApp</button>
      </div>
    </div>
  </div>`;
}

function generarRespuesta(){
  const nombre = $('rr-nombre').value.trim();
  const canal = $('rr-canal').value;
  const propiedad = $('rr-propiedad').value.trim()||'la propiedad';
  const info = $('rr-info').value;
  const saludo = nombre ? `Hola, ${nombre}` : 'Hola';
  let cuerpo = '';
  if(info==='completa') cuerpo = `Gracias por tu interés en ${propiedad}. Con gusto te comparto toda la información y coordinamos una visita a tu conveniencia.`;
  else if(info==='precio') cuerpo = `Gracias por tu interés en ${propiedad}. Tengo toda la información disponible y podemos coordinar una visita.`;
  else cuerpo = `Gracias por tu consulta sobre ${propiedad}. En breve te confirmo todos los detalles. ¿Cuál es tu disponibilidad para coordinar una visita?`;

  const texto = `${saludo}, soy ${AGENTE.nombre}, agente inmobiliario en ${AGENTE.ciudad}.\n\n${cuerpo}\n\n¿Tienes alguna pregunta específica? Quedo a tu disposición.\n\n📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;
  $('rr-texto').textContent = texto;
  $('rr-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 8. FILTRO COMPRADOR
// ══════════════════════════════════════════════
function toolFiltroComprador(){
  const preguntas = [
    {q:'¿Para cuándo necesitas mudarte o concretar la operación?', a:['En menos de 1 mes','En 1 a 3 meses','Sin urgencia, estoy explorando']},
    {q:'¿Ya definiste el presupuesto máximo?', a:['Sí, tengo el monto claro','Tengo un rango aproximado','No, todavía no sé cuánto gastar']},
    {q:'¿Cómo financiarás la compra?', a:['Efectivo disponible','Crédito hipotecario aprobado','Crédito hipotecario en trámite','Aún no lo he definido']},
    {q:'¿Has visto otras propiedades recientemente?', a:['Sí, he visitado varias','He visto algunas','No, esta es la primera']},
    {q:'¿Quién toma la decisión final de compra?', a:['Yo solo','Yo y mi pareja/familia','Depende de financiamiento o terceros']},
  ];
  let html = `<div class="tool-section" id="tool-filtro">
    <div class="tool-header">
      <div class="tool-icon">🔍</div>
      <div><div class="tool-title">Filtro: ¿comprador real o mirón?</div>
      <div class="tool-subtitle">Antes de mostrar la propiedad, usa estas preguntas para saber si el interesado realmente puede y quiere comprar. Así no pierdes tiempo.</div></div>
    </div>
    ${badgesHerramienta('filtro-comprador')}
    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">Marca las respuestas del interesado para ver su perfil de comprador.</p>
    <div id="filtro-preguntas">`;

  preguntas.forEach((p,i)=>{
    html += `<div style="margin-bottom:16px;padding:14px;background:var(--surface-2);border-radius:var(--radius-sm);">
      <div style="font-size:0.88rem;font-weight:600;color:var(--navy);margin-bottom:10px;">${i+1}. ${p.q}</div>`;
    p.a.forEach((a,j)=>{
      html += `<label style="display:flex;align-items:center;gap:8px;font-size:0.83rem;color:var(--text);margin-bottom:6px;cursor:pointer;">
        <input type="radio" name="filtro-${i}" value="${j}" style="accent-color:var(--navy);" onchange="evaluarFiltro()"> ${a}
      </label>`;
    });
    html += `</div>`;
  });

  html += `</div>
    <div id="filtro-resultado" hidden>
      <div class="result-box" id="filtro-resultado-box">
        <div class="result-label">Perfil del comprador</div>
        <div class="result-text" id="filtro-texto"></div>
      </div>
    </div>
  </div>`;
  return html;
}

function evaluarFiltro(){
  const vals = [];
  for(let i=0;i<5;i++){
    const sel = document.querySelector(`input[name="filtro-${i}"]:checked`);
    if(sel) vals.push(parseInt(sel.value));
  }
  if(vals.length<3) return;
  const score = vals.reduce((s,v)=>s+(v===0?2:v===1?1:0),0);
  let perfil='', consejo='';
  if(score>=7){ perfil='🟢 Comprador serio'; consejo='Coordina la visita cuanto antes. Tiene urgencia, presupuesto definido y capacidad de decisión. No lo hagas esperar.'; }
  else if(score>=4){ perfil='🟡 Interesado potencial'; consejo='Vale la pena seguir conversando. Confirma el presupuesto y el financiamiento antes de agendar la visita para asegurarte de que es viable.'; }
  else{ perfil='🔴 Mirón o explorador temprano'; consejo='No coordines una visita aún. Mantén el contacto, compártele información general y vuelve a calificarlo en 2-3 semanas cuando su situación haya avanzado.'; }
  $('filtro-texto').textContent = perfil+'\n\n'+consejo;
  $('filtro-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 9. CHECKLIST DE VISITA
// ══════════════════════════════════════════════
