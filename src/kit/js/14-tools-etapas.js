function toolDiagnosticoComprador(){
  return `<div class="tool-section" id="tool-diagnostico-comprador">
    <div class="tool-header">
      <div class="tool-icon gold">🔍</div>
      <div>
        <div class="tool-title">Diagnóstico del comprador (durante la visita)</div>
        <div class="tool-subtitle">Respondé 6 preguntas rápidas y te dice si el visitante es un comprador real o un mirón.</div>
      </div>
    </div>
    ${badgesHerramienta('diagnostico-comprador')}

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

buildSidebar();
buildMobileSidebar();
// ══════════════════════════════════════════════
// HOME PERSONALIZADO
// ══════════════════════════════════════════════
