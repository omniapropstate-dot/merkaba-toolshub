// ══════════════════════════════════════════════
// VER PLAN + PAGAR CON QR
// Un solo modal compartido (2 vistas: que incluye <-> pagar), usado desde:
// candado de herramienta bloqueada (03), perfil bloqueado en demo (10),
// home de la cuenta demo (15) y el modal "que es la demo" (body.html).
// ══════════════════════════════════════════════
var PLANES_KIT = {
  'Esencial': {
    precio: 'Bs 250',
    lista: [
      'Calculadora de comisión','Calculadora tipo de cambio','Respuesta rápida al lead',
      'Generador de seguimiento','Mensaje post-venta','Checklist de visita','Checklist anticrético',
      'Guía de captación','Guía del proceso legal','Scripts de captación','Ficha de propiedad',
      'Filtro de comprador (antes de la visita)','Mis plantillas','Tablero de pendientes','Seguimientos activos'
    ]
  },
  'Profesional': {
    precio: 'Bs 350',
    lista: [
      '__LEAD__Todo lo del plan Esencial, más:',
      'Propuesta al propietario','Acuerdo de trabajo','Manejador de objeciones','Comparador de inmuebles',
      'Diagnóstico del comprador (durante la visita)','Presentación personal','Calculadora de anticrético',
      'Planilla de cartera de propiedades','Planilla de control de seguimientos','Planilla de registro de comisiones'
    ]
  }
};
var QR_SRC_KIT = {
  'Esencial': '/icons/qr-esencial.jpg',
  'Profesional': '/icons/qr-profesional.jpg'
};
var QR_WA_MSG_KIT = {
  'Esencial': 'Hola! Ya pagué el Plan Esencial (Bs 250) del kit del agente inmobiliario. Te mando el comprobante.',
  'Profesional': 'Hola! Ya pagué el Plan Profesional (Bs 350) del kit del agente inmobiliario. Te mando el comprobante.'
};
var _planActualPago = 'Esencial';

function abrirPlanModal(plan){
  _planActualPago = plan;
  var p = PLANES_KIT[plan];
  $('mp-name').textContent = 'Plan ' + plan;
  $('mp-price').innerHTML = p.precio + '<span>pago único</span>';
  $('mp-list').innerHTML = p.lista.map(function(item){
    if(item.indexOf('__LEAD__') === 0) return '<li class="lead">' + esc(item.replace('__LEAD__','')) + '</li>';
    return '<li>' + esc(item) + '</li>';
  }).join('');
  $('view-features').hidden = false;
  $('view-pay').hidden = true;
  $('plan-modal').classList.add('open');
}

function cerrarPlanModal(){
  $('plan-modal').classList.remove('open');
}

function irAPagarPlan(){
  var plan = _planActualPago;
  $('pay-titulo').textContent = 'Pagá el Plan ' + plan;
  $('qr-monto').textContent = PLANES_KIT[plan].precio;
  $('qr-img').src = QR_SRC_KIT[plan];
  $('qr-img-zoom').src = QR_SRC_KIT[plan];
  var link = $('qr-descarga-link');
  link.href = QR_SRC_KIT[plan];
  link.setAttribute('download', 'qr-plan-' + plan.toLowerCase() + '.jpg');
  $('qr-whatsapp-link').href = 'https://wa.me/'+SOPORTE_WHATSAPP+'?text='+encodeURIComponent(QR_WA_MSG_KIT[plan]);
  $('view-features').hidden = true;
  $('view-pay').hidden = false;
}

function volverAFeaturesPlan(){
  $('view-features').hidden = false;
  $('view-pay').hidden = true;
}

function abrirZoomQR(){ $('zoom-modal').classList.add('open'); }
function cerrarZoomQR(){ $('zoom-modal').classList.remove('open'); }

// Reemplaza el mensaje bloqueado de "Mi perfil" en la cuenta demo (guardar/foto)
// por las 2 opciones de plan, en vez de un solo link generico a WhatsApp.
function mostrarBloqueoPerfil(texto){
  var msg = $('perfil-msg');
  msg.style.color = '';
  msg.innerHTML = '<p style="margin:0 0 10px;color:var(--text-muted);font-size:0.82rem;">' + esc(texto) + '</p>'
    + '<div class="plan-cta-row">'
    +   '<button class="plan-cta" type="button" onclick="cerrarPerfil();abrirPlanModal(\'Esencial\')"><div class="plan-cta-lbl">Ver y pagar</div><div class="plan-cta-name">Esencial <span class="plan-cta-price">· Bs 250</span></div></button>'
    +   '<button class="plan-cta" type="button" onclick="cerrarPerfil();abrirPlanModal(\'Profesional\')"><div class="plan-cta-lbl">Ver y pagar</div><div class="plan-cta-name">Profesional <span class="plan-cta-price">· Bs 350</span></div></button>'
    + '</div>';
}
