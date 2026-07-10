function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.hidden=false; clearTimeout(t._t); t._t=setTimeout(()=>{t.hidden=true;},2500); }





function copiar(texto){


  navigator.clipboard.writeText(texto).then(()=>toast('Copiado al portapapeles ✓')).catch(()=>{ const ta=document.createElement('textarea'); ta.value=texto; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); toast('Copiado ✓'); });


}





function abrirWhatsApp(texto){


  window.open('https://wa.me/?text='+encodeURIComponent(texto),'_blank');


}





function $(id){ return document.getElementById(id); }





// ══════════════════════════════════════════════


// MAPA DEL PROCESO


// ══════════════════════════════════════════════


