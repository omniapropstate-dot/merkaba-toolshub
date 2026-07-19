const OBJECIONES_COMPRADOR = [
  { situacion:'El cliente dice "está caro"', respuestas:[
    'Entiendo tu punto. ¿Puedes contarme con qué propiedad lo estás comparando? Así puedo explicarte mejor qué incluye este precio.',
    'El precio refleja [características específicas]. Si ajustamos alguna condición — forma de pago, plazo de entrega — podemos conversar con el propietario.',
    'Las propiedades similares en esta zona están entre X y Y. Esta está en ese rango porque [razón concreta]. ¿Qué precio tenías en mente?'
  ]},
  { situacion:'El cliente dice "lo voy a pensar"', respuestas:[
    '¿Hay algo específico que te genera duda? A veces pensar con información incompleta lleva a más preguntas. ¿Qué es lo que más te preocupa?',
    'Está muy bien tomarse el tiempo. ¿Puedo preguntarte qué sería lo que te convencería de avanzar?',
    'Entendido. ¿Para cuándo crees que tendrás una respuesta? Así coordino y te mantengo informado de cualquier novedad.'
  ]},
  { situacion:'El cliente dice "tengo otro inmueble en vista"', respuestas:[
    '¿Me podrías contar qué le gustó de ese otro? Así puedo ayudarte a comparar y ver cuál se ajusta mejor a lo que buscas.',
    'Está perfecto comparar opciones. ¿Cuál es la diferencia principal entre los dos? A veces ayuda verlo en papel.',
    'Si el otro inmueble no termina de convencerte, este sigue disponible. ¿Cuándo crees que tomarás la decisión?'
  ]},
  { situacion:'El cliente dice "no tengo apuro"', respuestas:[
    'No hay problema. Solo quiero que sepas que esta propiedad está generando interés — no para presionarte, sino para que tengas esa información.',
    '¿Hay alguna condición que, si se diera, te haría decidir más rápido? Por ejemplo, si el propietario acepta una forma de pago diferente.'
  ]},
  { situacion:'"Ya tengo otro agente / ya vi con otra inmobiliaria"', respuestas:[
    'No hay problema, valoro que ya estés viendo opciones. ¿Puedo preguntarte qué es lo que más te gustó de lo que viste? Así te muestro si esta propiedad cubre eso también.',
    'Perfecto, comparar es lo más sano. Te dejo mi número — si en algún momento esa opción no avanza o querés otra alternativa, seguimos en contacto.',
    'Entiendo. Solo te cuento que esta propiedad tiene [diferencial]. Si eso te interesa, avísame y coordinamos otra visita.'
  ]},
  { situacion:'"Prefiero esperar a que baje el precio / el dólar"', respuestas:[
    'Entiendo la lógica, pero en este mercado las propiedades bien ubicadas no bajan de precio — con la inflación tienden más bien a subir. Esperar puede salirte más caro que decidir ahora.',
    '¿Qué señal esperás para decidir que bajó lo suficiente? A veces esperar el momento perfecto hace que se pierda la propiedad que sí te convenía.',
    'Si el tema es el tipo de cambio, podemos conversar con el propietario alguna alternativa de pago que te dé más margen.'
  ]},
  { situacion:'"Quiero consultarlo con mi pareja/familia primero"', respuestas:[
    'Totalmente entendible, es una decisión importante. ¿Querés que coordinemos una segunda visita con ellos para que la vean juntos?',
    'Te armo un resumen con fotos, precio y detalles para que se lo compartas y lo conversen con toda la información a mano.',
    '¿Hay algo puntual que creés que a ellos les puede generar dudas? Así te ayudo a tener la respuesta lista.'
  ]},
  { situacion:'"Me gusta todo menos la zona"', respuestas:[
    'Entiendo, la zona es clave. ¿Qué es específicamente lo que te preocupa — seguridad, distancia, servicios? Así te muestro alternativas similares en otra zona o te doy más info de esta.',
    'Te cuento que [dato positivo de la zona: crecimiento, nuevos accesos, seguridad]. A veces con más información la percepción cambia.',
    'Si la zona es un tema cerrado para vos, avisame y te busco opciones parecidas en otro sector.'
  ]},
  { situacion:'"Quiero descuento por pago al contado"', respuestas:[
    'Buena pregunta. Le consulto al propietario si tiene margen por pago al contado y te confirmo en breve.',
    'El pago al contado sí le da tranquilidad al propietario, así que puede haber algo de flexibilidad. Dejame planteárselo y vuelvo con una respuesta concreta.',
    'Antes de hablar de descuento, ¿cuál sería el monto o porcentaje que tenías en mente? Así negocio algo realista con el propietario.'
  ]},
  { situacion:'"Me preocupa la parte legal / los papeles"', respuestas:[
    'Es una preocupación válida y muy común. Yo te acompaño en todo el proceso — verificación de folio real, minuta, notaría — para que no estés solo en eso.',
    'Antes de avanzar revisamos juntos que la propiedad no tenga gravámenes ni problemas registrados. Esa verificación es parte de mi trabajo.',
    'Si querés, podemos sumar a un abogado de confianza para que revise la documentación antes de firmar nada. La idea es que avances con tranquilidad.'
  ]},
];

const OBJECIONES_PROPIETARIO = [
  { situacion:'El propietario pide bajar tu comisión', respuestas:[
    'Mi comisión incluye publicación en portales, filtro de compradores, acompañamiento legal y negociación activa. Si quieres reducirla, podemos sacar alguno de esos servicios — ¿cuál?',
    'Entiendo la preocupación por los costos. Considera que mi comisión solo se paga cuando la venta se concreta — no hay costo si no hay resultado.',
    'Un agente que acepta bajar su comisión fácilmente también va a ceder fácilmente en la negociación con el comprador. Yo defiendo el precio de tu propiedad igual que defiendo el mío.'
  ]},
  { situacion:'"No quiero dar exclusiva, prefiero repartir con varias inmobiliarias"', respuestas:[
    'Entiendo la lógica de "más agencias, más posibilidades" — pero en la práctica pasa lo contrario: la propiedad aparece publicada varias veces con precios distintos, genera desconfianza en el comprador y se "quema". Con exclusiva, controlo el mensaje y el precio, y te dedico más esfuerzo real.',
    'Te propongo probar la exclusiva por 60-90 días. Si en ese plazo no tenés resultados, revisamos juntos la estrategia.',
    'Cuando reparto una propiedad con otras agencias, no le doy prioridad porque no sé si voy a cerrarla yo. Con exclusiva, es mi prioridad.'
  ]},
  { situacion:'"Mi vecino vendió en tal precio, yo quiero ese mismo"', respuestas:[
    'Cada propiedad es distinta — antigüedad, acabados, orientación, si tiene parqueo o no. ¿Sabés en qué condiciones vendió tu vecino? Puede que no sea una comparación directa.',
    'Te armo una comparación real con propiedades similares que están publicadas hoy en la zona, así decidimos el precio con datos, no solo con el rumor del vecino.',
    'Si salimos al precio de tu vecino sin justificación, el riesgo es que la propiedad quede meses sin consultas — y ahí sí perdés tiempo y valor.'
  ]},
  { situacion:'"No tengo apuro en bajar el precio, prefiero esperar"', respuestas:[
    'Está perfecto, no hay que apurarse. Eso sí, te cuento que cuanto más tiempo lleva publicada sin ajustes, los compradores empiezan a pensar "algo tiene" — aunque no sea cierto.',
    'Probemos 30 días más al precio actual. Si no hay consultas serias, revisamos juntos si conviene un ajuste.',
    '¿Hay alguna razón puntual para no tener apuro — no necesitás la plata ahora, o esperás algo del mercado? Así ajusto mejor la estrategia.'
  ]},
  { situacion:'"¿Por qué te pago si puedo vender directo yo mismo?"', respuestas:[
    'Totalmente válido preguntarlo. Yo filtro a los curiosos de los compradores reales, negocio en tu nombre, me encargo de la parte legal y de que el precio no se caiga en la negociación — eso normalmente cubre mi comisión y más.',
    'Vender directo funciona, pero también significa que vos atendés cada llamada, coordinás cada visita y negociás solo. Yo hago ese trabajo para que vos no pierdas tiempo.',
    'Mi comisión se paga solo si la venta se concreta. Si no vendo, no cobro — el riesgo de que no funcione lo asumo yo, no vos.'
  ]},
  { situacion:'"Otro agente me ofreció venderlo más caro"', respuestas:[
    'Es una estrategia común para captar la propiedad: prometer un precio alto, y después de unas semanas sin consultas, presionarte para bajarlo. Prefiero ser honesto desde el inicio con un precio que sí tenga demanda real.',
    'Te muestro los datos de mercado de la zona para que decidas con información, no con la promesa de alguien que todavía no tiene que demostrar nada.',
    'Si ese precio fuera realista, ¿por qué no lo intentamos 30 días? Si no hay consultas, ahí queda claro cuál era el precio real.'
  ]},
  { situacion:'"No quiero mostrar la propiedad tan seguido"', respuestas:[
    'Entiendo, las visitas pueden ser incómodas. Por eso filtro antes de coordinar — solo te llevo interesados con intención real, no curiosos.',
    'Podemos coordinar un horario fijo (ej. sábados por la tarde) para concentrar las visitas en un solo momento de la semana.',
    'Cuantas menos visitas de calidad tengamos, más tiempo tarda la venta. Te prometo que cada visita que coordine va a tener sentido.'
  ]},
  { situacion:'"Quiero poner yo el precio, vos solo publicá"', respuestas:[
    'Puedo publicarlo al precio que quieras, pero te aviso desde ahora: si está sobrevalorado, es probable que no tengamos consultas y perdamos tiempo los dos. ¿Probamos con datos de mercado antes de decidir?',
    'Te armo una comparación de precios reales de la zona. Si después de verla igual preferís tu precio, lo respeto — pero prefiero que decidas con esa información.',
    'El precio inicial es la decisión más importante de todo el proceso. Si querés, lo revisamos juntos antes de publicar.'
  ]},
];

function _renderListaObjeciones(arr, prefix){
  return arr.map(function(ob, oi){
    var accId = 'obj-'+prefix+'-'+oi;
    var respuestasHtml = ob.respuestas.map(function(r){
      // El texto va en un atributo data-* (no como argumento inline del onclick):
      // las respuestas pueden contener comillas dobles y romperian el atributo.
      var attr = esc(r);
      return '<div style="margin-bottom:10px;padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.84rem;color:var(--text);line-height:1.6;">'
        + '"'+esc(r)+'"'
        + '<div style="margin-top:8px;display:flex;gap:8px;">'
        + '<button class="btn btn-outline btn-sm" data-t="'+attr+'" onclick="copiar(this.dataset.t)">📋 Copiar</button>'
        + '<button class="btn btn-outline btn-sm" data-t="'+attr+'" onclick="abrirWhatsApp(this.dataset.t)">💬 WhatsApp</button>'
        + '</div></div>';
    }).join('');
    return '<div class="home-acc" style="margin-bottom:8px;">'
      + '<button class="home-acc-hdr" onclick="homeAccToggle(\''+accId+'\')">'
      + '<span>'+esc(ob.situacion)+'</span>'
      + '<span id="'+accId+'-arr" class="home-acc-arr">▼</span>'
      + '</button>'
      + '<div id="'+accId+'" class="home-acc-body-wrap"><div class="home-acc-body"><div class="home-acc-body-inner">'+respuestasHtml+'</div></div></div>'
      + '</div>';
  }).join('');
}

function toolManejadorObjeciones(){
  return `<div class="tool-section" id="tool-objeciones">
    <div class="tool-header">
      <div class="tool-icon gold">💬</div>
      <div><div class="tool-title">Manejador de objeciones</div>
      <div class="tool-subtitle">Respuestas listas para las objeciones más comunes — de compradores y de propietarios. Elige la que mejor se adapte y cópiala.</div></div>
    </div>
    ${badgesHerramienta('manejador-objeciones')}
    <div class="sidebar-tabs" style="margin-bottom:14px;">
      <button class="sidebar-tab active" id="obj-tab-comprador" onclick="objTab('comprador')">Compradores</button>
      <button class="sidebar-tab" id="obj-tab-propietario" onclick="objTab('propietario')">Propietarios</button>
    </div>
    <div id="obj-lista-comprador">${_renderListaObjeciones(OBJECIONES_COMPRADOR,'c')}</div>
    <div id="obj-lista-propietario" hidden>${_renderListaObjeciones(OBJECIONES_PROPIETARIO,'p')}</div>
  </div>`;
}

function objTab(tab){
  $('obj-tab-comprador').classList.toggle('active', tab==='comprador');
  $('obj-tab-propietario').classList.toggle('active', tab==='propietario');
  $('obj-lista-comprador').hidden = tab!=='comprador';
  $('obj-lista-propietario').hidden = tab!=='propietario';
}

// ══════════════════════════════════════════════
// 14. COMPARADOR DE INMUEBLES
// ══════════════════════════════════════════════
function toolComparadorInmuebles(){
  return `<div class="tool-section" id="tool-comparador">
    <div class="tool-header">
      <div class="tool-icon">⚖️</div>
      <div><div class="tool-title">Comparador de inmuebles</div>
      <div class="tool-subtitle">Ingresa hasta 3 propiedades y genera una comparación visual para mostrarle al cliente. Completa solo los datos que tengas — ninguno es obligatorio.</div></div>
    </div>
    ${badgesHerramienta('comparador-inmuebles')}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:16px;">
      ${[1,2,3].map(n=>`
      <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;">
        <div style="font-size:0.75rem;font-weight:700;color:var(--navy);text-transform:uppercase;margin-bottom:10px;">Propiedad ${n}</div>
        <input type="text" placeholder="Nombre / dirección" id="comp-nombre-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
        <input type="number" placeholder="Precio (USD)" id="comp-precio-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
        <input type="number" placeholder="m²" id="comp-m2-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
        <input type="number" placeholder="Dormitorios" id="comp-dorm-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
        <input type="text" placeholder="Zona / barrio (opcional)" id="comp-zona-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
        <input type="number" placeholder="Antigüedad (años, opcional)" id="comp-antiguedad-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
        <select id="comp-parqueo-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;">
          <option value="">Parqueo (opcional)</option>
          <option value="Sí">Con parqueo</option>
          <option value="No">Sin parqueo</option>
        </select>
        <input type="number" placeholder="Expensas USD/mes (opcional)" id="comp-expensas-${n}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>
      </div>`).join('')}
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="generarComparacion()">Comparar</button>
    </div>
    <div id="comp-resultado" hidden>
      <div class="result-box navy-accent" style="margin-top:16px;">
        <div class="result-label">Comparación</div>
        <div id="comp-tabla" style="overflow-x:auto;"></div>
      </div>
      <div id="comp-recomendacion" style="margin-top:12px;padding:12px 14px;background:var(--surface-2);border-left:3px solid var(--gold);border-radius:0 var(--radius-sm) var(--radius-sm) 0;font-size:0.85rem;color:var(--text);line-height:1.6;"></div>
      <div class="btn-group" style="margin-top:10px;">
        <button class="btn btn-outline btn-sm" onclick="copiar(document.getElementById('comp-texto-plano').textContent)">&#128203; Copiar texto</button>
        <button class="btn btn-gold btn-sm" onclick="generarPDFComparador()">&#128196; Comparativa PDF</button>
      </div>
      <div id="comp-texto-plano" hidden></div>
    </div>
  </div>`;
}

function _leerPropiedadesComparador(){
  return [1,2,3].map(n=>({
    nombre: document.getElementById(`comp-nombre-${n}`).value.trim(),
    precio: parseFloat(document.getElementById(`comp-precio-${n}`).value)||0,
    m2: parseFloat(document.getElementById(`comp-m2-${n}`).value)||0,
    dorm: parseFloat(document.getElementById(`comp-dorm-${n}`).value)||0,
    zona: document.getElementById(`comp-zona-${n}`).value.trim(),
    antiguedad: parseFloat(document.getElementById(`comp-antiguedad-${n}`).value)||0,
    parqueo: document.getElementById(`comp-parqueo-${n}`).value,
    expensas: parseFloat(document.getElementById(`comp-expensas-${n}`).value)||0,
  })).filter(p=>p.nombre||p.precio);
}

function _filasComparador(){
  return [
    {label:'Precio (USD)', fn:p=>p.precio?'$ '+p.precio.toLocaleString('es-BO'):'—'},
    {label:'Zona', fn:p=>p.zona||'—'},
    {label:'Superficie (m²)', fn:p=>p.m2?p.m2+' m²':'—'},
    {label:'Precio por m²', fn:p=>(p.precio&&p.m2)?'$ '+(p.precio/p.m2).toFixed(0)+'/m²':'—'},
    {label:'Dormitorios', fn:p=>p.dorm||'—'},
    {label:'Antigüedad', fn:p=>p.antiguedad?p.antiguedad+' años':'—'},
    {label:'Parqueo', fn:p=>p.parqueo||'—'},
    {label:'Expensas', fn:p=>p.expensas?'$ '+p.expensas+'/mes':'—'},
  ];
}

function _recomendacionComparador(props){
  const frases = [];
  const conM2 = props.filter(p=>p.precio && p.m2);
  if(conM2.length>=2){
    const mejor = conM2.reduce((a,b)=>(a.precio/a.m2)<(b.precio/b.m2)?a:b);
    frases.push(`${mejor.nombre||'Una propiedad'} tiene el mejor precio por m² ($${(mejor.precio/mejor.m2).toFixed(0)}/m²).`);
  }
  const conDorm = props.filter(p=>p.dorm);
  if(conDorm.length>=2){
    const masGrande = conDorm.reduce((a,b)=>a.dorm>b.dorm?a:b);
    const empatados = conDorm.filter(p=>p.dorm===masGrande.dorm);
    if(empatados.length===1) frases.push(`${masGrande.nombre||'Una propiedad'} tiene más dormitorios (${masGrande.dorm}).`);
  }
  const conParqueoInfo = props.filter(p=>p.parqueo);
  const conParqueo = props.filter(p=>p.parqueo==='Sí');
  if(conParqueo.length>0 && conParqueo.length<conParqueoInfo.length){
    frases.push(`Con parqueo: ${conParqueo.map(p=>p.nombre||'una propiedad').join(', ')}.`);
  }
  const conExpensas = props.filter(p=>p.expensas);
  if(conExpensas.length>=2){
    const masBarata = conExpensas.reduce((a,b)=>a.expensas<b.expensas?a:b);
    frases.push(`${masBarata.nombre||'Una propiedad'} tiene la expensa más baja ($${masBarata.expensas}/mes).`);
  }
  return frases.join(' ');
}

function generarComparacion(){
  const props = _leerPropiedadesComparador();
  if(props.length<2){ toast('Completa al menos 2 propiedades'); return; }

  let tabla = `<table style="width:100%;border-collapse:collapse;font-size:0.83rem;">
    <thead><tr style="background:var(--navy);color:#fff;">
      <th style="padding:8px 12px;text-align:left;">Característica</th>
      ${props.map(p=>`<th style="padding:8px 12px;text-align:center;">${p.nombre||'—'}</th>`).join('')}
    </tr></thead><tbody>`;

  _filasComparador().forEach((r,i)=>{
    const bg = i%2===0?'var(--surface-2)':'var(--surface)';
    tabla += `<tr style="background:${bg};">
      <td style="padding:8px 12px;font-weight:600;color:var(--navy);">${r.label}</td>
      ${props.map(p=>`<td style="padding:8px 12px;text-align:center;">${r.fn(p)}</td>`).join('')}
    </tr>`;
  });

  tabla += `</tbody></table>`;
  $('comp-tabla').innerHTML = tabla;

  const recomendacion = _recomendacionComparador(props);
  const recEl = $('comp-recomendacion');
  if(recomendacion){ recEl.hidden = false; recEl.textContent = '💡 ' + recomendacion; }
  else { recEl.hidden = true; recEl.textContent = ''; }

  // Texto plano para copiar
  let txt = 'COMPARACIÓN DE INMUEBLES\n\n';
  props.forEach(p=>{
    txt += `${p.nombre||'Propiedad'}: $${p.precio.toLocaleString('es-BO')}`
      + (p.zona?` | ${p.zona}`:'')
      + (p.m2?` | ${p.m2}m²`:'')
      + (p.dorm?` | ${p.dorm} dorm.`:'')
      + (p.antiguedad?` | ${p.antiguedad} años`:'')
      + (p.parqueo?` | Parqueo: ${p.parqueo}`:'')
      + (p.expensas?` | Expensas: $${p.expensas}/mes`:'')
      + '\n';
  });
  if(recomendacion) txt += '\n' + recomendacion;
  $('comp-texto-plano').textContent = txt;
  $('comp-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 15. MENSAJE POST-VENTA
// ══════════════════════════════════════════════
function toolMensajePostventa(){
  return `<div class="tool-section" id="tool-postventa">
    <div class="tool-header">
      <div class="tool-icon gold">🤝</div>
      <div><div class="tool-title">Mensaje de seguimiento post-venta</div>
      <div class="tool-subtitle">Un cliente feliz puede traerte más clientes. Este mensaje mantiene la relación después del cierre y abre la puerta a que te recomienden.</div></div>
    </div>
    ${badgesHerramienta('mensaje-postventa')}
    <div class="form-row cols-2">
      <div class="form-group"><label>Nombre del cliente</label><input id="pv-nombre" type="text" placeholder="María Quispe"/></div>
      <div class="form-group"><label>¿Qué operación concretaron?</label>
        <select id="pv-tipo"><option>compra de su departamento</option><option>venta de su propiedad</option><option>alquiler</option><option>anticrético</option></select>
      </div>
    </div>
    <div class="form-row cols-2">
      <div class="form-group"><label>¿Cuánto tiempo pasó desde el cierre?</label>
        <select id="pv-tiempo"><option>1 semana</option><option>1 mes</option><option>3 meses</option><option>6 meses</option></select>
      </div>
      <div class="form-group"><label>Tipo de mensaje</label>
        <select id="pv-msg"><option value="seguimiento">Preguntar cómo están</option><option value="referido">Pedir referidos</option><option value="aniversario">Aniversario de la operación</option></select>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-gold" onclick="generarPostventa()">Generar mensaje</button>
    </div>
    <div id="pv-resultado" hidden>
      <div class="result-box">
        <div class="result-label">Tu mensaje</div>
        <div class="result-text" id="pv-texto"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="copiar(document.getElementById('pv-texto').textContent)">📋 Copiar</button>
        <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp(document.getElementById('pv-texto').textContent)">💬 WhatsApp</button>
      </div>
    </div>
  </div>`;
}

function generarPostventa(){
  const nombre = $('pv-nombre').value.trim()||'el cliente';
  const tipo = $('pv-tipo').value;
  const tiempo = $('pv-tiempo').value;
  const msg = $('pv-msg').value;
  let texto = '';
  if(msg==='seguimiento'){
    texto = `Hola, ${nombre}. Soy ${AGENTE.nombre}. Han pasado ${tiempo} desde que concretamos la ${tipo} y quería saber cómo están. Espero que todo haya ido excelente. Cualquier consulta que tengas sobre la propiedad, con gusto te ayudo.

📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;
  } else if(msg==='referido'){
    texto = `Hola, ${nombre}. Soy ${AGENTE.nombre}. Espero que estén muy contentos con su ${tipo.includes('compra')?'nueva propiedad':'operación'}. Si conocen a alguien que esté buscando comprar, vender o alquilar en ${AGENTE.ciudad}, me alegra mucho si me recomiendan. El boca a boca es lo más valioso en este negocio.

📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;
  } else {
    texto = `Hola, ${nombre}. Soy ${AGENTE.nombre}. Hoy se cumple un año desde que concretamos la ${tipo}, y quería saludarles y desearles muchos años de felicidad. Ha sido un gusto acompañarles en ese proceso.

📱 ${AGENTE.nombre} — ${AGENTE.whatsapp}`;
  }
  $('pv-texto').textContent = texto;
  $('pv-resultado').hidden = false;
}

// ══════════════════════════════════════════════
// 16. BANCO DE SCRIPTS
// ══════════════════════════════════════════════
