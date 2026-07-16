function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.hidden=false; clearTimeout(t._t); t._t=setTimeout(()=>{t.hidden=true;},2500); }

function copiar(texto){
  navigator.clipboard.writeText(texto).then(()=>toast('Copiado al portapapeles ✓')).catch(()=>{ const ta=document.createElement('textarea'); ta.value=texto; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); toast('Copiado ✓'); });
}

function abrirWhatsApp(texto){
  window.open('https://wa.me/?text='+encodeURIComponent(texto),'_blank');
}

function $(id){ return document.getElementById(id); }

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// Cuenta un numero grande de resultado (result-hero-num) desde su valor anterior hasta
// el nuevo en vez de saltar de golpe. formatFn recibe el valor (float) y devuelve el
// texto a mostrar, ej: function(v){ return '$ '+Math.round(v).toLocaleString('es-BO'); }
var _animNumState = {};
function animarNumero(id, target, formatFn, duration){
  var el = $(id); if(!el) return;
  var from = _animNumState[id] || 0;
  var start = performance.now();
  duration = duration || 450;
  function tick(now){
    var p = Math.min(1, (now-start)/duration);
    var eased = 1 - Math.pow(1-p, 3);
    el.textContent = formatFn(from + (target-from)*eased);
    if(p < 1) requestAnimationFrame(tick);
    else { _animNumState[id] = target; el.textContent = formatFn(target); }
  }
  requestAnimationFrame(tick);
}
function flashResultado(el){
  if(typeof el === 'string') el = $(el);
  if(!el) return;
  el.classList.remove('result-flash'); void el.offsetWidth; el.classList.add('result-flash');
}
