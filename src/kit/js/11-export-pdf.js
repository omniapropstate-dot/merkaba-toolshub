const DOC_INICIO = '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="margin:0;padding:0;font-family:Segoe UI,Arial,sans-serif;background:#fff;">';

// GENERADOR DE PDF v3 (html2canvas)
// ═══════════════════════

function _loadScript(src){
  return new Promise(function(resolve, reject){
    var s = document.createElement('script');
    s.src = src;
    s.onload = function(){ setTimeout(resolve, 80); };
    s.onerror = function(){ reject(new Error('No se pudo cargar: ' + src)); };
    document.head.appendChild(s);
  });
}

async function _loadLibs(){
  if(!window.jspdf || !window.jspdf.jsPDF){
    await _loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
  }
  if(!window.html2canvas){
    await _loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
  }
}

function descargarBlob(blob, filename){
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename; a.style.display = 'none';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 300);
}

function _findBestCut(canvas, naturalCutY, minY){
  var ctx = canvas.getContext('2d');
  var bestY = naturalCutY;
  var bestScore = -1;
  for(var y = naturalCutY; y >= minY; y -= 2){
    var data = ctx.getImageData(0, y, canvas.width, 1).data;
    var white = 0;
    for(var i = 0; i < data.length; i += 4){
      if(data[i] > 238 && data[i+1] > 238 && data[i+2] > 238) white++;
    }
    var score = white / (canvas.width);
    if(score > bestScore){ bestScore = score; bestY = y; }
    if(score > 0.97) break;
  }
  return bestY;
}

async function renderPDF(htmlContent, filename){
  var jsPDF = window.jspdf.jsPDF;
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;';
  wrap.innerHTML = htmlContent;
  document.body.appendChild(wrap);
  try {
    var canvas = await html2canvas(wrap, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      windowWidth: 794
    });
    var pdf = new jsPDF({ orientation:'portrait', unit:'px', format:'a4', compress:true });
    var pageW = pdf.internal.pageSize.getWidth();
    var pageH = pdf.internal.pageSize.getHeight();
    var scale = pageW / (canvas.width / 2);
    var pageHpx = Math.round(pageH / scale * 2);
    var currentY = 0;
    var firstPage = true;
    while(currentY < canvas.height){
      var naturalCut = currentY + pageHpx;
      var cutY;
      if(naturalCut >= canvas.height){
        cutY = canvas.height;
      } else {
        var searchMin = currentY + Math.round(pageHpx * 0.78);
        cutY = _findBestCut(canvas, naturalCut, searchMin);
      }
      var sliceH = cutY - currentY;
      var sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceH;
      var ctx = sliceCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, sliceH);
      ctx.drawImage(canvas, 0, currentY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
      if(!firstPage) pdf.addPage();
      firstPage = false;
      var displayH = (sliceH / 2) * scale;
      pdf.addImage(sliceCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pageW, displayH);
      currentY = cutY;
    }
    descargarBlob(pdf.output('blob'), filename);
    toast('PDF descargado.');
  } finally {
    document.body.removeChild(wrap);
  }
}

function _agentHeaderHTML(){
  var foto = localStorage.getItem('mk_foto') || '';
  var fotoHtml = foto
    ? '<img src="'+foto+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid #EFAE3C;flex-shrink:0;" />'
    : '<div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.15);border:3px solid #EFAE3C;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.8rem;">&#128100;</div>';
  var contacto = [];
  if(AGENTE.ciudad) contacto.push('<span>&#128205; '+esc(AGENTE.ciudad)+'</span>');
  if(AGENTE.whatsapp) contacto.push('<span>&#128242; '+esc(AGENTE.whatsapp)+'</span>');
  if(AGENTE.email) contacto.push('<span>&#9993;&#65039; '+esc(AGENTE.email)+'</span>');
  var fecha = new Date().toLocaleDateString('es-BO', {day:'2-digit', month:'long', year:'numeric'});
  return '<div style="background:linear-gradient(135deg,#1B335E 0%,#243f72 100%);color:#fff;padding:28px 36px;display:flex;align-items:center;gap:20px;">'
    + fotoHtml
    + '<div style="flex:1;">'
    +   '<div style="font-family:Georgia,serif;font-size:1.3rem;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">'+esc(AGENTE.nombre || 'Agente')+'</div>'
    +   '<div style="font-size:0.82rem;color:rgba(255,255,255,0.75);display:flex;flex-wrap:wrap;gap:12px;">'+contacto.join('')+'</div>'
    + '</div>'
    + '<div style="text-align:right;font-size:0.78rem;color:rgba(255,255,255,0.55);">'+fecha+'</div>'
    + '</div>'
    + '<div style="height:4px;background:linear-gradient(90deg,#EFAE3C,#f5c842,#EFAE3C);"></div>';
}

function buildPropuestaHTML(texto){
  var parrafos = texto.split(/\n+/).filter(function(l){ return l.trim(); });
  var parrafosHtml = parrafos.map(function(p){
    var t = p.trim();
    if(/^\d+\.\s/.test(t) || (t.length < 60 && t.endsWith(':'))){
      return '<h3 style="font-family:Georgia,serif;font-size:1rem;color:#1B335E;margin:18px 0 6px;font-weight:700;border-left:3px solid #EFAE3C;padding-left:10px;">'+esc(t)+'</h3>';
    }
    return '<p style="margin:0 0 10px;line-height:1.7;color:#2d3748;font-size:0.92rem;">'+esc(t)+'</p>';
  }).join('');
  return DOC_INICIO
    + _agentHeaderHTML()
    + '<div style="padding:32px 36px;">'
    +   '<h1 style="font-family:Georgia,serif;font-size:1.6rem;color:#1B335E;margin:0 0 6px;font-weight:700;">Propuesta de Captaci&#243;n</h1>'
    +   '<div style="width:48px;height:3px;background:#EFAE3C;border-radius:2px;margin-bottom:24px;"></div>'
    +   '<div style="background:#f8f9fc;border-left:4px solid #EFAE3C;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:24px;">'
    +     parrafosHtml
    +   '</div>'
    +   '<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">'
    +     '<div style="font-size:0.75rem;color:#94a3b8;">Documento confidencial &middot; Generado para uso profesional</div>'
    +     '<div style="width:80px;height:2px;background:#EFAE3C;border-radius:1px;"></div>'
    +   '</div>'
    + '</div>'
    + '</body></html>';
}

function buildFichaHTML(op, tipo, zona, precio, dorm, banos, m2, features, fotos){
  var chips = [
    op && '<span style="background:#1B335E;color:#fff;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:700;">'+esc(op)+'</span>',
    tipo && '<span style="background:rgba(27,51,94,0.1);color:#1B335E;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:600;">'+esc(tipo)+'</span>',
    zona && '<span style="background:rgba(239,174,60,0.15);color:#b8860b;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:600;">&#128205; '+esc(zona)+'</span>'
  ].filter(Boolean).join(' ');

  var statsArr = [];
  if(dorm) statsArr.push({ icon:'&#127951;', val:dorm, lbl:'Dormitorios' });
  if(banos) statsArr.push({ icon:'&#128698;', val:banos, lbl:'Ba&#241;os' });
  if(m2) statsArr.push({ icon:'&#128208;', val:m2+' m&#178;', lbl:'Superficie' });

  var statsHtml = statsArr.map(function(s){
    return '<div style="text-align:center;background:#f8f9fc;border-radius:10px;padding:14px 20px;flex:1;min-width:80px;">'
      + '<div style="font-size:1.4rem;">'+s.icon+'</div>'
      + '<div style="font-size:1.1rem;font-weight:700;color:#1B335E;">'+esc(String(s.val))+'</div>'
      + '<div style="font-size:0.72rem;color:#718096;">'+s.lbl+'</div>'
      + '</div>';
  }).join('');

  var featList = features ? features.split(/\n|,/).map(function(f){ return f.trim(); }).filter(Boolean) : [];
  var featHtml = featList.length
    ? '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;">'
      + featList.map(function(f){ return '<span style="background:#eef1f6;color:#1B335E;padding:5px 12px;border-radius:999px;font-size:0.78rem;">&#10003; '+esc(f)+'</span>'; }).join('')
      + '</div>'
    : '';

  var fotosArr = (fotos || []).filter(Boolean).slice(0,5);
  var fotosHtml = '';
  if(fotosArr.length){
    var imgs = fotosArr.map(function(src){
      return '<img src="'+src+'" style="width:calc(50% - 4px);border-radius:8px;display:block;" />';
    }).join('');
    fotosHtml = '<div style="margin-top:24px;">'
      + '<h3 style="font-family:Georgia,serif;font-size:1rem;color:#1B335E;margin:0 0 12px;font-weight:700;">Fotograf&#237;as</h3>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px;">'+imgs+'</div>'
      + '</div>';
  }

  var precioHtml = precio
    ? '<div style="background:linear-gradient(135deg,#EFAE3C,#f5c842);border-radius:10px;padding:16px 24px;margin:20px 0;display:flex;align-items:center;justify-content:space-between;">'
      + '<span style="font-size:0.85rem;font-weight:600;color:#7a5900;">Precio</span>'
      + '<span style="font-size:1.4rem;font-weight:800;color:#1B335E;">'+esc(precio)+'</span>'
      + '</div>'
    : '';

  return DOC_INICIO
    + _agentHeaderHTML()
    + '<div style="padding:28px 36px;">'
    +   '<div style="margin-bottom:16px;">'
    +     '<h1 style="font-family:Georgia,serif;font-size:1.5rem;color:#1B335E;margin:0 0 8px;font-weight:700;">Ficha de Propiedad</h1>'
    +     '<div style="display:flex;gap:6px;flex-wrap:wrap;">'+chips+'</div>'
    +   '</div>'
    +   precioHtml
    +   (statsHtml ? '<div style="display:flex;gap:10px;margin:16px 0;flex-wrap:wrap;">'+statsHtml+'</div>' : '')
    +   featHtml
    +   fotosHtml
    +   '<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">'
    +     '<div style="font-size:0.75rem;color:#94a3b8;">Documento generado para uso profesional</div>'
    +     '<div style="width:80px;height:2px;background:#EFAE3C;border-radius:1px;"></div>'
    +   '</div>'
    + '</div>'
    + '</body></html>';
}

async function generarPDFPropuesta(){
  var texto = $('prop-texto') ? $('prop-texto').textContent.trim() : '';
  if(!texto){ toast('Genera la propuesta primero.'); return; }
  toast('Preparando PDF...');
  try{
    await _loadLibs();
    var html = buildPropuestaHTML(texto);
    await renderPDF(html, 'Propuesta_Captacion.pdf');
  } catch(e){
    toast('Error al generar el PDF: ' + (e.message || 'error'));
    console.error(e);
  }
}

async function generarPDFFicha(){
  var op = $('ficha-op') ? $('ficha-op').value : '';
  var tipo = $('ficha-tipo') ? $('ficha-tipo').value : '';
  var zona = $('ficha-zona') ? $('ficha-zona').value : '';
  var precio = $('ficha-precio') ? $('ficha-precio').value : '';
  var dorm = $('ficha-dorm') ? $('ficha-dorm').value : '';
  var banos = $('ficha-banos') ? $('ficha-banos').value : '';
  var m2 = $('ficha-m2') ? $('ficha-m2').value : '';
  var features = $('ficha-features') ? $('ficha-features').value : '';
  var texto = $('ficha-texto') ? $('ficha-texto').textContent.trim() : '';
  if(!texto){ toast('Genera la ficha primero.'); return; }
  toast('Preparando PDF...');
  try{
    await _loadLibs();
    var html = buildFichaHTML(op, tipo, zona, precio, dorm, banos, m2, features, _fotosPropiedad);
    await renderPDF(html, 'Ficha_Propiedad.pdf');
  } catch(e){
    toast('Error al generar el PDF: ' + (e.message || 'error'));
    console.error(e);
  }
}



// ══════════════════════════════════════════════
// HERRAMIENTA: ACUERDO DE TRABAJO
// ══════════════════════════════════════════════
