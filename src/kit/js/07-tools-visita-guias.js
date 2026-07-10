function toolChecklistVisita(){


  const items = [


    {t:'Antes de la visita', items:[


      {txt:'Confirmar la cita con 1 hora de anticipación',tag:'obligatorio'},


      {txt:'Llevar la ficha de la propiedad impresa o en el celular',tag:'importante'},


      {txt:'Conocer el precio de propiedades similares en la zona',tag:'importante'},


      {txt:'Preparar 2-3 fortalezas del inmueble para destacar',tag:''},


    ]},


    {t:'Durante la visita', items:[


      {txt:'Llegar 10 minutos antes para revisar el estado del inmueble',tag:'importante'},


      {txt:'Dejar que el cliente recorra sin interrumpir — observar su reacción',tag:''},


      {txt:'Preguntar: "¿Qué te parece hasta ahora?"',tag:'importante'},


      {txt:'Identificar señales positivas: preguntas sobre mudanza, medidas, vecinos',tag:''},


      {txt:'Preguntar: "¿Hay algo que te gustaría que fuera diferente?"',tag:'importante'},


    ]},


    {t:'Al finalizar la visita', items:[


      {txt:'Preguntar directamente: "¿Te interesa avanzar?"',tag:'obligatorio'},


      {txt:'Si hay interés: definir próximo paso concreto (fecha, condición, precio)',tag:'obligatorio'},


      {txt:'Tomar nota del nombre completo y WhatsApp del visitante',tag:'obligatorio'},


      {txt:'Registrar fecha y observaciones en tu control de seguimientos',tag:'importante'},


    ]},


  ];


  let html = `<div class="tool-section" id="tool-checklist-visita">


    <div class="tool-header">


      <div class="tool-icon">✅</div>


      <div><div class="tool-title">Checklist de visita <span class="tool-badge badge-guia">Guía</span></div>


      <div class="tool-subtitle">No improvises la visita. Sigue este checklist para llegar preparado y no perderte los momentos clave donde el comprador muestra interés real.</div></div>


    </div>`;


  items.forEach((sec,si)=>{


    html += `<div style="margin-bottom:20px;"><div style="font-size:0.8rem;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${sec.t}</div><ul class="checklist">`;


    sec.items.forEach((it,ii)=>{


      const id=`cv-${si}-${ii}`;


      const tagHtml = it.tag ? `<span class="checklist-tag tag-${it.tag}">${it.tag}</span>` : '';


      html += `<li><input type="checkbox" id="${id}" onchange="toggleCheck('${id}')"><label class="checklist-text" id="label-${id}" for="${id}">${it.txt}${tagHtml}</label></li>`;


    });


    html += `</ul></div>`;


  });


  html += `</div>`;


  return html;


}





function toggleCheck(id){


  const cb = document.getElementById(id);


  const label = document.getElementById('label-'+id);


  if(label) label.classList.toggle('checked', cb.checked);


}





// ══════════════════════════════════════════════


// 10. CHECKLIST ANTICRÉTICO


// ══════════════════════════════════════════════


function toolChecklistAntictretico(){


  const items = [


    {txt:'Verificar folio real del inmueble en Derechos Reales',tag:'obligatorio'},


    {txt:'Confirmar que el inmueble no tiene gravámenes ni hipotecas',tag:'obligatorio'},


    {txt:'Verificar que el propietario es quien figura en el folio real',tag:'obligatorio'},


    {txt:'Confirmar que no está en proceso de remate o embargo',tag:'obligatorio'},


    {txt:'El contrato debe elevarse a escritura pública ante notario',tag:'obligatorio'},


    {txt:'Inscribir el contrato en Derechos Reales antes de entregar el capital',tag:'obligatorio'},


    {txt:'No firmar con documento privado — sin registro el capital queda desprotegido',tag:'obligatorio'},


    {txt:'Verificar que el inmueble no tiene otro anticrético vigente',tag:'obligatorio'},


    {txt:'Confirmar quién paga el impuesto (IT) de la operación',tag:'importante'},


    {txt:'Establecer por escrito la condición de devolución del capital',tag:'importante'},


    {txt:'Fotografiar el estado del inmueble al momento de entrega',tag:'importante'},


    {txt:'Acordar por escrito quién cubre gastos de mantenimiento',tag:''},


  ];


  let html = `<div class="tool-section" id="tool-checklist-anti">


    <div class="tool-header">


      <div class="tool-icon">🏛️</div>


      <div><div class="tool-title">Checklist de anticrético <span class="tool-badge badge-guia">Guía</span></div>


      <div class="tool-subtitle">Revisa cada punto antes de entregar el dinero del anticrético. Saltarse un paso puede generar problemas legales que duran meses.</div></div>


    </div>


    <ul class="checklist">`;


  items.forEach((it,i)=>{


    const id=`ca-${i}`;


    const tagHtml = it.tag ? `<span class="checklist-tag tag-${it.tag}">${it.tag}</span>` : '';


    html += `<li><input type="checkbox" id="${id}" onchange="toggleCheck('${id}')"><label class="checklist-text" id="label-${id}" for="${id}">${it.txt}${tagHtml}</label></li>`;


  });


  html += `</ul>


    <div class="guide-alert" style="margin-top:12px;">


      <strong>Límite profesional</strong>


      Esta guía es un resumen general. Para cada operación, recomienda a tu cliente trabajar con un abogado. Tu trabajo es orientar, no dar asesoría legal antes de firmar.


    </div>


  </div>`;


  return html;


}





// ══════════════════════════════════════════════


// 11. GUÍA DE CAPTACIÓN


// ══════════════════════════════════════════════


function toolGuiaCaptacion(){


  return `<div class="tool-section" id="tool-guia-captacion">


    <div class="tool-header">


      <div class="tool-icon">🎯</div>


      <div><div class="tool-title">Guía de captación y defensa del precio <span class="tool-badge badge-guia">Guía</span></div>


      <div class="tool-subtitle">Cómo prepararte para la reunión con el propietario, proponer un precio justo y defender tu comisión sin perder el trabajo.</div></div>


    </div>


    <div class="guide-steps">


      <div class="guide-step"><div class="guide-step-num">1</div><div class="guide-step-content"><h4>Investigar antes de ir</h4><p>Busca en UltraCasas e InfoCasas propiedades similares en la misma zona. Anota 2-3 con precio y características. Esos son tus datos concretos de respaldo.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">2</div><div class="guide-step-content"><h4>La reunión: escuchar antes de hablar</h4><p>Pregunta: "¿Cuánto espera obtener por la propiedad?" Deja que hable. Luego presenta tu precio sugerido con datos concretos, no con opiniones.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">3</div><div class="guide-step-content"><h4>Si el propietario pide más de lo que el mercado soporta</h4><p>No discutas. Muéstrale los comparables: "El mercado en esta zona está pagando entre X y Y. Si salimos a Z, la propiedad va a quedarse meses sin venderse y los compradores van a pensar que algo está mal." Propón salir al precio real y revisar en 30 días.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">4</div><div class="guide-step-content"><h4>Si te piden que bajes tu comisión</h4><p>No bajes sin ofrecer menos servicio a cambio. Respuesta: "Mi comisión incluye publicación en portales, filtro de compradores, acompañamiento legal y negociación. Si quieres reducirla, podemos quitar alguno de esos servicios — ¿cuál preferirías sacar?"</p></div></div>


      <div class="guide-step"><div class="guide-step-num">5</div><div class="guide-step-content"><h4>Captar en exclusiva cuando sea posible</h4><p>Explica: "Si trabajo en exclusiva, me comprometo con toda mi energía en este inmueble. Si trabajo con otras agencias, el inmueble aparece duplicado en portales, con precios diferentes, y el comprador desconfía." Ofrece un plazo de 60-90 días como prueba.</p></div></div>


    </div>


    <div class="guide-alert" style="margin-top:16px;"><strong>Recuerda</strong>Captar sobrevalorado es peor que no captar. Un inmueble que lleva meses en portales sin venderse tiene el precio mal. El tiempo perdido vale más que la captación.</div>


  </div>`;


}





// ══════════════════════════════════════════════


// 12. GUÍA LEGAL


// ══════════════════════════════════════════════


function toolGuiaLegal(){


  return `<div class="tool-section" id="tool-guia-legal">


    <div class="tool-header">


      <div class="tool-icon">⚖️</div>


      <div><div class="tool-title">Guía del proceso legal <span class="tool-badge badge-guia">Guía</span></div>


      <div class="tool-subtitle">Los pasos del proceso legal de una venta en Bolivia. Orientación para guiar al cliente — no reemplaza a un abogado.</div></div>


    </div>


    <div class="guide-steps">


      <div class="guide-step"><div class="guide-step-num">1</div><div class="guide-step-content"><h4>Folio real (Información Rápida de Derechos Reales)</h4><p>Verifica que el vendedor es el propietario real, que no hay hipotecas, gravámenes ni embargos. Se obtiene en la oficina de Derechos Reales del departamento. Costo: aproximadamente Bs. 15-30.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">2</div><div class="guide-step-content"><h4>Minuta de compraventa</h4><p>Documento preparado por un abogado que establece las condiciones de la venta: precio, forma de pago, plazos. Ambas partes deben firmarlo ante notario.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">3</div><div class="guide-step-content"><h4>Impuestos de la operación</h4><p>Impuesto a la Transferencia (IT): 3% del valor de venta, lo paga el vendedor. Si el vendedor es empresa, puede aplicar RC-IVA. Consultar con contador si hay dudas sobre el régimen.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">4</div><div class="guide-step-content"><h4>Escritura pública ante notario</h4><p>La minuta se eleva a escritura pública en notaría. El notario verifica identidades y da fe del acto. Costo varía según el valor del inmueble.</p></div></div>


      <div class="guide-step"><div class="guide-step-num">5</div><div class="guide-step-content"><h4>Registro en Derechos Reales</h4><p>La escritura se inscribe en Derechos Reales para que el comprador quede como nuevo propietario en el folio real. Sin este paso, el comprador no queda registrado como nuevo dueño ante la ley.</p></div></div>


    </div>


    <div class="guide-alert"><strong>L&#237;mite profesional</strong>Esta gu&#237;a es orientativa. Para una transacci&#243;n espec&#237;fica, siempre recomienda al cliente trabajar con un abogado o notario de su confianza. Tu rol es guiar, no asesorar legalmente.</div>


    <div class="btn-group" style="margin-top:16px;">


      <button class="btn btn-gold btn-sm" onclick="generarPDFGuiaLegal()">&#128196; Resumen legal para el cliente PDF</button>


    </div>


  </div>`;


}





// ══════════════════════════════════════════════


// 13. MANEJADOR DE OBJECIONES


// ══════════════════════════════════════════════


