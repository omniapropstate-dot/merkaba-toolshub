function toolGeneradorAnuncio(){
  return `<div class="tool-section" id="tool-generador-anuncio">
    <div class="tool-header">
      <div class="tool-icon gold">📣</div>
      <div>
        <div class="tool-title">Generador de anuncio de propiedad <span class="tool-badge badge-hace">Hace</span></div>
        <div class="tool-subtitle">Completá los datos y obtenés el texto listo para publicar en Facebook, UltraCasas o InfoCasas.</div>
      </div>
    </div>

    <div class="form-row cols-2">
      <div class="form-group"><label>Tipo de propiedad</label>
        <select id="an-tipo">
          <option>Departamento</option><option>Casa</option><option>Oficina</option>
          <option>Local comercial</option><option>Almacén</option><option>Terreno / lote</option>
        </select>
      </div>
      <div class="form-group"><label>Operación</label>
        <select id="an-op">
          <option>en venta</option><option>en alquiler</option><option>en anticrético</option>
        </select>
      </div>
    </div>

    <div class="form-row cols-2">
      <div class="form-group"><label>Zona / Barrio</label>
        <input id="an-zona" type="text" placeholder="Ej: Zona Norte, Centro, Zona Sur"/>
      </div>
      <div class="form-group"><label>Ciudad</label>
        <input id="an-ciudad" type="text" placeholder="Tu ciudad"/>
      </div>
    </div>

    <div class="form-row cols-3">
      <div class="form-group"><label>Precio</label>
        <input id="an-precio" type="text" placeholder="Ej: 85,000"/>
      </div>
      <div class="form-group"><label>Moneda</label>
        <select id="an-moneda"><option>USD</option><option>Bs.</option></select>
      </div>
      <div class="form-group"><label>Superficie (m²)</label>
        <input id="an-m2" type="text" placeholder="Ej: 120"/>
      </div>
    </div>

    <div class="form-row cols-3">
      <div class="form-group"><label>Dormitorios</label>
        <select id="an-dorm">
          <option value="">—</option><option>1</option><option>2</option>
          <option>3</option><option>4</option><option>5 o más</option>
        </select>
      </div>
      <div class="form-group"><label>Baños</label>
        <select id="an-banos">
          <option value="">—</option><option>1</option><option>2</option>
          <option>3</option><option>4 o más</option>
        </select>
      </div>
      <div class="form-group"><label>Garaje</label>
        <select id="an-garaje">
          <option value="">No</option><option>1 garaje</option>
          <option>2 garajes</option><option>Más de 2</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>Características destacadas</label>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
        ${['Amoblado','Ascensor','Seguridad / portería','Jardín','Piscina','Vista panorámica','Terraza','Depósito','Salón de eventos','Cuarto de servicio'].map(c=>`<label style="display:flex;align-items:center;gap:4px;font-size:0.83rem;cursor:pointer;"><input type="checkbox" class="an-feat" value="${c}"> ${c}</label>`).join('')}
      </div>
    </div>

    <div class="form-group"><label>Detalle adicional (opcional)</label>
      <textarea id="an-extra" rows="2" placeholder="Ej: Esquinero, vista al parque, recién refaccionado..."></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarAnuncio()">Generar anuncio</button>
    </div>

    <div id="an-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu anuncio</div>
        <div class="result-text" id="an-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('an-texto').textContent)">📋 Copiar</button>
      </div>
    </div>
  </div>`;
}

function generarAnuncio(){
  const tipo   = $('an-tipo').value;
  const op     = $('an-op').value;
  const zona   = $('an-zona').value.trim();
  const ciudad = $('an-ciudad').value.trim() || (AGENTE&&AGENTE.ciudad?AGENTE.ciudad:'');
  const precio = $('an-precio').value.trim();
  const moneda = $('an-moneda').value;
  const m2     = $('an-m2').value.trim();
  const dorm   = $('an-dorm').value;
  const banos  = $('an-banos').value;
  const garaje = $('an-garaje').value;
  const extra  = $('an-extra').value.trim();
  const feats  = Array.from(document.querySelectorAll('.an-feat:checked')).map(x=>x.value);

  if(!zona||!precio){ toast('Completá al menos la zona y el precio.'); return; }

  const emojis = {
    'Departamento':'🏢','Casa':'🏡','Oficina':'🏢','Local comercial':'🏪','Almacén':'🏭','Terreno / lote':'🌿'
  };
  const icono = emojis[tipo]||'🏠';

  let lineas = [];
  lineas.push(`${icono} ${tipo.toUpperCase()} ${op.toUpperCase()} — ${zona}${ciudad?', '+ciudad:''}`);
  lineas.push('');

  if(precio) lineas.push(`💰 Precio: ${moneda} ${precio}`);
  if(m2)     lineas.push(`📐 Superficie: ${m2} m²`);

  let detalles = [];
  if(dorm)   detalles.push(`${dorm} dormitorio${dorm==='1'?'':'s'}`);
  if(banos)  detalles.push(`${banos} baño${banos==='1'?'':'s'}`);
  if(garaje) detalles.push(garaje);
  if(detalles.length) lineas.push(`🛏️ ${detalles.join(' · ')}`);

  if(feats.length){
    lineas.push('');
    lineas.push('✅ Características:');
    feats.forEach(f => lineas.push(`   • ${f}`));
  }

  if(extra){
    lineas.push('');
    lineas.push(extra);
  }

  lineas.push('');
  lineas.push('📲 Más información al WhatsApp:');
  if(AGENTE&&AGENTE.whatsapp) lineas.push(AGENTE.whatsapp);
  if(AGENTE&&AGENTE.nombre)   lineas.push(AGENTE.nombre);

  const texto = lineas.join('\n');
  $('an-texto').textContent = texto;
  $('an-resultado').hidden = false;
}
// ──────────────────────────────────────────────────────────────────

function toolGuiaVisita(){
  const secciones = [
    {
      id:'gv-s1', titulo:'Antes de llegar', icono:'📋',
      items:[
        'Confirmá la visita por WhatsApp 2 horas antes.',
        'Revisá los datos de la propiedad y repasá el precio y m².',
        'Llevas la ficha de la propiedad (impresa o en el cel).',
        'Anotá el nombre del interesado y qué busca exactamente.',
        'Llegás 10 minutos antes para ver el estado real del inmueble.'
      ]
    },
    {
      id:'gv-s2', titulo:'Durante la visita', icono:'🚪',
      items:[
        '¿Qué es lo más importante para usted en una propiedad? (escuchá antes de mostrar)',
        'Mostrá primero el punto fuerte del inmueble, no el recorrido de siempre.',
        'No hables tú todo el tiempo — hacé preguntas y dejá que el cliente imagine.',
        'Si el cliente toca las paredes, abre armarios o mide con el celular → señal de interés real.',
        'Si pregunta por el vecindario, los servicios o las expensas → ya se está instalando mentalmente.',
        'Si dice "el precio está un poco alto" → no defendas el precio ahora, anotá y seguí mostrando.',
        'Si pregunta "¿cuándo podría entrar?" → está casi convencido. Respondé con fecha real.'
      ]
    },
    {
      id:'gv-s3', titulo:'Al final: cerrá el siguiente paso', icono:'🤝',
      items:[
        'Antes de salir, definí la siguiente acción concreta. No termines con "le aviso".',
        'Frases que funcionan:',
        '  • "¿Qué le faltó ver para decidir? Lo coordino para la semana."',
        '  • "¿Lo piensa con su familia? ¿Cuándo les queda bien volver?"',
        '  • "¿Le hago un resumen con los números para que lo analice tranquilo?"',
        'Si el cliente dice "lo pienso" → preguntá: "¿Qué necesita definir para tomar la decisión?"',
        'Si hay interés real, acordá fecha y hora del siguiente contacto ANTES de despedirte.'
      ]
    }
  ];

  const html = secciones.map(s=>`
    <div class="home-acc" style="margin-bottom:8px;">
      <button class="home-acc-hdr" onclick="homeAccToggle('${s.id}')">
        <span>${s.icono} ${s.titulo}</span><span id="${s.id}-arr" class="home-acc-arr">▼</span>
      </button>
      <div id="${s.id}" class="home-acc-body" style="display:none;">
        <ul style="margin:0;padding-left:18px;line-height:1.8;">
          ${s.items.map(i=>`<li style="font-size:0.87rem;">${i}</li>`).join('')}
        </ul>
      </div>
    </div>`).join('');

  return `<div class="tool-section" id="tool-guia-visita">
    <div class="tool-header">
      <div class="tool-icon gold">🚪</div>
      <div>
        <div class="tool-title">Guía de la visita <span class="tool-badge badge-guia">Guía</span></div>
        <div class="tool-subtitle">Cómo mostrar y vender en la visita. Antes, durante y al final.</div>
      </div>
    </div>
    ${html}
  </div>`;
}
// ──────────────────────────────────────────────────────────────────

function toolDiagnosticoComprador(){
  return `<div class="tool-section" id="tool-diagnostico-comprador">
    <div class="tool-header">
      <div class="tool-icon gold">🔍</div>
      <div>
        <div class="tool-title">Diagnóstico del comprador <span class="tool-badge badge-guia">Guía</span></div>
        <div class="tool-subtitle">Respondé 6 preguntas rápidas y te dice si el visitante es un comprador real o un mirón.</div>
      </div>
    </div>

    <div id="dc-form">
      ${[
        { id:'dc-q1', pregunta:'¿El cliente llegó a la hora acordada?',        si:'Sí', no:'No o avisó tarde' },
        { id:'dc-q2', pregunta:'¿Pudo decirte cuánto presupuesto tiene?',       si:'Sí, con cifra', no:'Evitó el tema' },
        { id:'dc-q3', pregunta:'¿Tiene fecha estimada para mudarse / comprar?', si:'Sí, la mencionó', no:'"Cuando encuentre algo"' },
        { id:'dc-q4', pregunta:'¿Tocó las paredes, midió o sacó fotos?',        si:'Sí', no:'Solo miró desde lejos' },
        { id:'dc-q5', pregunta:'¿Preguntó por expensas, vecinos o servicios?',  si:'Sí', no:'No preguntó nada así' },
        { id:'dc-q6', pregunta:'¿Tiene claro quién toma la decisión de compra?', si:'Él mismo o con pareja presente', no:'"Tengo que consultar" (indefinido)' },
      ].map(q=>`
        <div class="form-group">
          <label>${q.pregunta}</label>
          <div style="display:flex;gap:10px;margin-top:4px;">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="${q.id}" value="1"> ${q.si}</label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="${q.id}" value="0"> ${q.no}</label>
          </div>
        </div>`).join('')}

      <div class="btn-group">
        <button class="btn btn-gold" onclick="diagnosticarComprador()">Ver diagnóstico</button>
      </div>
    </div>

    <div id="dc-resultado" hidden>
      <div class="result-box">
        <div class="result-label" id="dc-titulo"></div>
        <div class="result-text" id="dc-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-outline btn-sm" onclick="resetDiagnostico()">Volver a evaluar</button>
      </div>
    </div>
  </div>`;
}

function diagnosticarComprador(){
  const preguntas = ['dc-q1','dc-q2','dc-q3','dc-q4','dc-q5','dc-q6'];
  let puntaje = 0;
  let respondidas = 0;
  preguntas.forEach(function(q){
    const sel = document.querySelector('input[name="'+q+'"]:checked');
    if(sel){ puntaje += parseInt(sel.value); respondidas++; }
  });
  if(respondidas < 6){ toast('Respondé todas las preguntas para ver el diagnóstico.'); return; }

  let titulo, texto;
  if(puntaje >= 5){
    titulo = '🟢 Comprador serio — actuá rápido';
    texto  = 'Todas las señales indican que tiene intención y capacidad real. No dejes pasar más de 24 horas sin contacto. Proponé una reunión concreta para avanzar con los números y la documentación.';
  } else if(puntaje >= 3){
    titulo = '🟡 Interesado con dudas — necesita empuje';
    texto  = 'Hay interés pero algo frenó la decisión. Puede ser el precio, la aprobación familiar o inseguridad financiera. Tu próximo paso: descubrí exactamente qué le falta y atacá ese punto. No esperes a que te llame.';
  } else {
    titulo = '🔴 Mirón — no inviertas más tiempo por ahora';
    texto  = 'Las señales apuntan a que no tiene capacidad real o urgencia. No lo persigás con seguimientos intensivos. Un mensaje en 30 días está bien. Enfocá tu energía en prospectos con más señales.';
  }

  $('dc-titulo').textContent = titulo;
  $('dc-texto').textContent  = texto;
  $('dc-form').hidden = true;
  $('dc-resultado').hidden = false;
}

function resetDiagnostico(){
  document.querySelectorAll('input[name^="dc-q"]').forEach(function(r){ r.checked = false; });
  $('dc-form').hidden = false;
  $('dc-resultado').hidden = true;
}
// ──────────────────────────────────────────────────────────────────

function toolGeneradorReferidos(){
  return `<div class="tool-section" id="tool-generador-referidos">
    <div class="tool-header">
      <div class="tool-icon gold">🌟</div>
      <div>
        <div class="tool-title">Generador de mensajes de referido <span class="tool-badge badge-hace">Hace</span></div>
        <div class="tool-subtitle">Los referidos convierten 50 veces mejor que un lead frío. Este generador te arma el mensaje exacto para pedirlos sin incomodar.</div>
      </div>
    </div>

    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del cliente</label>
        <input id="ref-nombre" type="text" placeholder="Ej: Don Jorge"/>
      </div>
      <div class="form-group"><label>¿Qué operación concretamos?</label>
        <select id="ref-tipo">
          <option>compra de su propiedad</option>
          <option>venta de su propiedad</option>
          <option>alquiler</option>
          <option>anticrético</option>
        </select>
      </div>
    </div>

    <div class="form-row cols-2">
      <div class="form-group"><label>¿Cuánto tiempo pasó desde el cierre?</label>
        <select id="ref-tiempo">
          <option>1 semana</option><option>1 mes</option>
          <option>3 meses</option><option>6 meses o más</option>
        </select>
      </div>
      <div class="form-group"><label>Tono del mensaje</label>
        <select id="ref-tono">
          <option value="formal">Formal</option>
          <option value="cercano">Cercano / amigable</option>
        </select>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarReferido()">Generar mensaje</button>
    </div>

    <div id="ref-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu mensaje</div>
        <div class="result-text" id="ref-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('ref-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(document.getElementById('ref-texto').textContent)">💬 WhatsApp</button>
      </div>
    </div>
  </div>`;
}

function generarReferido(){
  const nombre = $('ref-nombre').value.trim() || 'estimado cliente';
  const tipo   = $('ref-tipo').value;
  const tiempo = $('ref-tiempo').value;
  const tono   = $('ref-tono').value;
  const agente = AGENTE&&AGENTE.nombre ? AGENTE.nombre : 'su asesor';

  let saludo = tono==='cercano' ? `Hola, ${nombre}! 😊` : `Buenas tardes, ${nombre}.`;
  let intro;
  if(tiempo==='1 semana')       intro = `Espero que todo esté marchando bien después de la ${tipo}.`;
  else if(tiempo==='1 mes')     intro = `Ya pasó un mes desde que concretamos la ${tipo}. Espero que todo haya ido excelente.`;
  else if(tiempo==='3 meses')   intro = `Hace tres meses cerramos la ${tipo} juntos. Espero que estés muy contento con el resultado.`;
  else                           intro = `Han pasado varios meses desde que trabajamos juntos en la ${tipo}. Espero que todo marche de maravilla.`;

  let pedido;
  if(tono==='cercano'){
    pedido = `Si conocés a alguien que esté buscando o vendiendo una propiedad, me encantaría ayudarle. Un comentario tuyo vale más que cualquier publicidad, y te lo agradezco de corazón. 🙏`;
  } else {
    pedido = `Si tiene en su entorno a alguien que esté buscando o vendiendo una propiedad, le agradecería mucho que me recomiende. Una referencia suya es el mayor reconocimiento que puede darme.`;
  }

  const cierre = tono==='cercano'
    ? `Cualquier consulta, aquí estoy. Un abrazo!\n${agente}`
    : `Quedo a su disposición para cualquier consulta.\n${agente}`;

  $('ref-texto').textContent = [saludo, '', intro, '', pedido, '', cierre].join('\n');
  $('ref-resultado').hidden = false;
}
// ──────────────────────────────────────────────────────────────────

function toolReactivadorContactos(){
  return `<div class="tool-section" id="tool-reactivador-contactos">
    <div class="tool-header">
      <div class="tool-icon gold">🔄</div>
      <div>
        <div class="tool-title">Reactivador de contactos pasados <span class="tool-badge badge-hace">Hace</span></div>
        <div class="tool-subtitle">Para leads que no cerraron, clientes de hace tiempo o propietarios con los que perdiste el contacto.</div>
      </div>
    </div>

    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del contacto</label>
        <input id="rc-nombre" type="text" placeholder="Ej: Srta. Daniela"/>
      </div>
      <div class="form-group"><label>Tipo de contacto</label>
        <select id="rc-tipo">
          <option value="lead">Lead que no cerró (seguía buscando)</option>
          <option value="comprador">Cliente que compró hace tiempo</option>
          <option value="propietario">Propietario con el que trabajé antes</option>
          <option value="mirón">Visitó una propiedad pero nunca decidió</option>
        </select>
      </div>
    </div>

    <div class="form-row cols-2">
      <div class="form-group"><label>¿Cuánto tiempo sin hablar?</label>
        <select id="rc-tiempo">
          <option>1 mes</option><option>2-3 meses</option>
          <option>6 meses</option><option>más de 1 año</option>
        </select>
      </div>
      <div class="form-group"><label>¿Qué buscaba o hizo?</label>
        <input id="rc-detalle" type="text" placeholder="Ej: departamento en Queru Queru, 3 dorm."/>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarReactivacion()">Generar mensaje</button>
    </div>

    <div id="rc-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu mensaje de reactivación</div>
        <div class="result-text" id="rc-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('rc-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(document.getElementById('rc-texto').textContent)">💬 WhatsApp</button>
      </div>
    </div>
  </div>`;
}

function generarReactivacion(){
  const nombre  = $('rc-nombre').value.trim() || 'estimado';
  const tipo    = $('rc-tipo').value;
  const tiempo  = $('rc-tiempo').value;
  const detalle = $('rc-detalle').value.trim();
  const agente  = AGENTE&&AGENTE.nombre ? AGENTE.nombre : 'su asesor';

  let mensaje = '';

  if(tipo==='lead'){
    mensaje = `Hola, ${nombre}. Soy ${agente}, hace ${tiempo} estuvimos en contacto${detalle?' por '+detalle:''}.\n\nQuería consultarle: ¿sigue en la búsqueda o ya encontró algo? Si aún está buscando, tengo algunas opciones nuevas que pueden interesarle.\n\nQuedo a su disposición. 👋`;
  } else if(tipo==='comprador'){
    mensaje = `Hola, ${nombre}! Soy ${agente}. Han pasado ${tiempo} desde que trabajamos juntos${detalle?' en '+detalle:''}. Espero que todo esté yendo de maravilla.\n\nQuería contactarle por dos razones: saber cómo les va, y porque si conoce a alguien que esté buscando o vendiendo una propiedad, me encantaría ayudarle. Un saludo de su parte vale más que cualquier anuncio. 🙏\n\nCualquier consulta, aquí estoy.`;
  } else if(tipo==='propietario'){
    mensaje = `Buenas, ${nombre}. Le saluda ${agente}. Hace ${tiempo} tuvimos la oportunidad de trabajar juntos${detalle?' con '+detalle:''}.\n\nMe comunico porque actualmente tengo clientes buscando propiedades en la zona. Si en algún momento piensa en vender, alquilar o anticrético, con mucho gusto le asesoro.\n\nQuedo a su disposición.`;
  } else {
    mensaje = `Hola, ${nombre}! Soy ${agente}. Hace ${tiempo} visitamos una propiedad juntos${detalle?' ('+detalle+')':''}.\n\nQuería consultarle: ¿encontró lo que buscaba o sigue en la búsqueda? Si aún está en proceso, tengo novedades que pueden ajustarse mejor a lo que necesita.\n\nEstoy a sus órdenes. 😊`;
  }

  $('rc-texto').textContent = mensaje;
  $('rc-resultado').hidden = false;
}

buildSidebar();
buildMobileSidebar();
// ══════════════════════════════════════════════
// HOME PERSONALIZADO
// ══════════════════════════════════════════════
