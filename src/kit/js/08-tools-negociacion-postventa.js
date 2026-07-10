function toolManejadorObjeciones(){


  const objeciones = [


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


      '¿Hay alguna condición que, si se diera, te haría decidir más rápido? Por ejemplo, si el propietario acepta una forma de pago diferente.',


    ]},


    { situacion:'El propietario pide bajar tu comisión', respuestas:[


      'Mi comisión incluye publicación en portales, filtro de compradores, acompañamiento legal y negociación activa. Si quieres reducirla, podemos sacar alguno de esos servicios — ¿cuál?',


      'Entiendo la preocupación por los costos. Considera que mi comisión solo se paga cuando la venta se concreta — no hay costo si no hay resultado.',


      'Un agente que acepta bajar su comisión fácilmente también va a ceder fácilmente en la negociación con el comprador. Yo defiendo el precio de tu propiedad igual que defiendo el mío.'


    ]},


  ];





  let html = `<div class="tool-section" id="tool-objeciones">


    <div class="tool-header">


      <div class="tool-icon gold">💬</div>


      <div><div class="tool-title">Manejador de objeciones <span class="tool-badge badge-guia">Guía</span></div>


      <div class="tool-subtitle">Respuestas listas para cuando el cliente dice que está caro, que lo va a pensar o que tiene otra opción. Elige la que mejor se adapte y cópiala.</div></div>


    </div>


    <div class="scripts-grid">`;





  objeciones.forEach((ob,oi)=>{


    html += `<div class="script-card">


      <div class="script-situation">${ob.situacion}</div>`;


    ob.respuestas.forEach((r,ri)=>{


      const id=`ob-${oi}-${ri}`;


      html += `<div style="margin-bottom:10px;padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.84rem;color:var(--text);line-height:1.6;">


        "${r}"


        <div style="margin-top:8px;display:flex;gap:8px;">


          <button class="btn btn-outline btn-sm" onclick="copiar('${r.replace(/'/g,"\\'")}')">📋 Copiar</button>


          <button class="btn btn-outline btn-sm" onclick="abrirWhatsApp('${r.replace(/'/g,"\\'")}')">💬 WhatsApp</button>


        </div>


      </div>`;


    });


    html += `</div>`;


  });





  html += `</div></div>`;


  return html;


}





// ══════════════════════════════════════════════


// 14. COMPARADOR DE INMUEBLES


// ══════════════════════════════════════════════


function toolComparadorInmuebles(){


  return `<div class="tool-section" id="tool-comparador">


    <div class="tool-header">


      <div class="tool-icon">⚖️</div>


      <div><div class="tool-title">Comparador de inmuebles <span class="tool-badge badge-hace">Hace</span></div>


      <div class="tool-subtitle">Ingresa hasta 3 propiedades y genera una comparación visual para mostrarle al cliente. Ayuda a que decida más rápido.</div></div>


    </div>


    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:16px;">


      ${[1,2,3].map(n=>`


      <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;">


        <div style="font-size:0.75rem;font-weight:700;color:var(--navy);text-transform:uppercase;margin-bottom:10px;">Propiedad ${n}</div>


        <input type="text" placeholder="Nombre / dirección" id="comp-nombre-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>


        <input type="number" placeholder="Precio (USD)" id="comp-precio-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>


        <input type="number" placeholder="m²" id="comp-m2-${n}" style="width:100%;margin-bottom:8px;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>


        <input type="number" placeholder="Dormitorios" id="comp-dorm-${n}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;background:var(--surface);font-family:Inter,sans-serif;"/>


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


      <div class="btn-group">


        <button class="btn btn-outline btn-sm" onclick="copiar(document.getElementById('comp-texto-plano').textContent)">&#128203; Copiar texto</button>


        <button class="btn btn-gold btn-sm" onclick="generarPDFComparador()">&#128196; Comparativa PDF</button>


      </div>


      <div id="comp-texto-plano" hidden></div>


    </div>


  </div>`;


}





function generarComparacion(){


  const props = [1,2,3].map(n=>({


    nombre: document.getElementById(`comp-nombre-${n}`).value.trim(),


    precio: parseFloat(document.getElementById(`comp-precio-${n}`).value)||0,


    m2: parseFloat(document.getElementById(`comp-m2-${n}`).value)||0,


    dorm: parseFloat(document.getElementById(`comp-dorm-${n}`).value)||0,


  })).filter(p=>p.nombre||p.precio);


  if(props.length<2){ toast('Completa al menos 2 propiedades'); return; }





  let tabla = `<table style="width:100%;border-collapse:collapse;font-size:0.83rem;">


    <thead><tr style="background:var(--navy);color:#fff;">


      <th style="padding:8px 12px;text-align:left;">Característica</th>


      ${props.map(p=>`<th style="padding:8px 12px;text-align:center;">${p.nombre||'—'}</th>`).join('')}


    </tr></thead><tbody>`;





  const rows = [


    {label:'Precio (USD)', fn:p=>p.precio?'$ '+p.precio.toLocaleString('es-BO'):'—'},


    {label:'Superficie (m²)', fn:p=>p.m2?p.m2+' m²':'—'},


    {label:'Precio por m²', fn:p=>(p.precio&&p.m2)?'$ '+(p.precio/p.m2).toFixed(0)+'/m²':'—'},


    {label:'Dormitorios', fn:p=>p.dorm||'—'},


  ];





  rows.forEach((r,i)=>{


    const bg = i%2===0?'var(--surface-2)':'var(--surface)';


    tabla += `<tr style="background:${bg};">


      <td style="padding:8px 12px;font-weight:600;color:var(--navy);">${r.label}</td>


      ${props.map(p=>`<td style="padding:8px 12px;text-align:center;">${r.fn(p)}</td>`).join('')}


    </tr>`;


  });





  tabla += `</tbody></table>`;


  $('comp-tabla').innerHTML = tabla;





  // Texto plano para copiar


  let txt = 'COMPARACIÓN DE INMUEBLES\n\n';


  props.forEach(p=>{ txt += `${p.nombre||'Propiedad'}: $${p.precio.toLocaleString('es-BO')} | ${p.m2?p.m2+'m²':''} | ${p.dorm?p.dorm+' dorm.':''}\n`; });


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


      <div><div class="tool-title">Mensaje de seguimiento post-venta <span class="tool-badge badge-hace">Hace</span></div>


      <div class="tool-subtitle">Un cliente feliz puede traerte más clientes. Este mensaje mantiene la relación después del cierre y abre la puerta a que te recomienden.</div></div>


    </div>


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


