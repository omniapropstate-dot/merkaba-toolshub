

  // Chequeo de acceso — mk_auth vive en sessionStorage (no localStorage): se
  // borra al cerrar la pestana/navegador, para que el link SIEMPRE pida
  // contrasena de nuevo en una visita nueva, en vez de quedar adentro para
  // siempre como pasaba antes.
  if(sessionStorage.getItem("mk_auth")!=="1"){
    window.location.href = "/login";
  } else {
    // Revalida contra Supabase en cada carga: si cambio la contrasena o se
    // desactivo la cuenta desde que este dispositivo inicio sesion, saca al
    // toque. Sin esto, localStorage guardaba la sesion para siempre y cambiar
    // la contrasena de alguien (ej. la cuenta demo) no le sacaba el acceso.
    (function(){
      var _id = localStorage.getItem('mk_id');
      var _pwd = localStorage.getItem('mk_pwd');
      var _valido = true;
      try{
        var _xhr = new XMLHttpRequest();
        _xhr.open('POST', 'https://rdmqlclavqbhrhxbkiwo.supabase.co/rest/v1/rpc/session_valida', false);
        _xhr.setRequestHeader('Content-Type','application/json');
        _xhr.setRequestHeader('apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbXFsY2xhdnFiaHJoeGJraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTQyMTUsImV4cCI6MjA5NzAzMDIxNX0.y06LLkP2TuyffScZl-rGNsl1pMLtpqYSisBG8-t727Q');
        _xhr.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbXFsY2xhdnFiaHJoeGJraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTQyMTUsImV4cCI6MjA5NzAzMDIxNX0.y06LLkP2TuyffScZl-rGNsl1pMLtpqYSisBG8-t727Q');
        _xhr.send(JSON.stringify({p_id:_id, p_password:_pwd}));
        if(_xhr.status===200){ _valido = JSON.parse(_xhr.responseText)===true; }
      }catch(e){ /* sin conexion: no expulsar por un problema de red */ }
      if(!_valido){
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
        throw new Error('sesion invalida');
      }
    })();
    // Ademas del chequeo al cargar, revisa cada 60s mientras el kit sigue
    // abierto: si alguien cambia esta contrasena mientras otro ya esta
    // adentro (ej. rotar la contrasena de la cuenta demo), lo saca sin que
    // tenga que recargar el navegador el mismo.
    setInterval(function(){
      var _id2 = localStorage.getItem('mk_id');
      var _pwd2 = localStorage.getItem('mk_pwd');
      if(!_id2) return;
      fetch('https://rdmqlclavqbhrhxbkiwo.supabase.co/rest/v1/rpc/session_valida', {
        method:'POST',
        headers:{'Content-Type':'application/json','apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbXFsY2xhdnFiaHJoeGJraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTQyMTUsImV4cCI6MjA5NzAzMDIxNX0.y06LLkP2TuyffScZl-rGNsl1pMLtpqYSisBG8-t727Q','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbXFsY2xhdnFiaHJoeGJraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTQyMTUsImV4cCI6MjA5NzAzMDIxNX0.y06LLkP2TuyffScZl-rGNsl1pMLtpqYSisBG8-t727Q'},
        body: JSON.stringify({p_id:_id2, p_password:_pwd2})
      }).then(function(r){ return r.json(); }).then(function(ok){
        if(ok!==true){
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/login';
        }
      }).catch(function(){ /* sin conexion: no expulsar por un corte de red */ });
    }, 60000);
  }
// ══════════════════════════════════════════════
// CUENTA DEMO — no persiste guardados a Supabase
// ══════════════════════════════════════════════
const DEMO_CLIENTE_ID = '033a71aa-b53c-450f-b0e7-332c7ec25b01';

// ══════════════════════════════════════════════
// DATOS DEL AGENTE (viene del perfil en Supabase)
// ══════════════════════════════════════════════
const AGENTE = {
  id: localStorage.getItem('mk_id') || '',
  nombre: localStorage.getItem('mk_nombre') || 'Agente',
  ciudad: localStorage.getItem('mk_ciudad') || 'Bolivia',
  whatsapp: localStorage.getItem('mk_whatsapp') || '',
  email: localStorage.getItem('mk_email') || '',
  plan: localStorage.getItem('mk_plan') || 'basico',
  esDemo: localStorage.getItem('mk_id') === DEMO_CLIENTE_ID
};
document.getElementById('agent-badge').textContent = AGENTE.nombre;
const LIMITE_SEGUIMIENTOS = AGENTE.plan === 'completo' ? 50 : 20;

// ══════════════════════════════════════════════
// TIERS — herramientas exclusivas del plan Completo
// ══════════════════════════════════════════════
const HERRAMIENTAS_TIER2 = [
  'propuesta-propietario','acuerdo-trabajo',
  'generador-anuncio','cartera-propiedades-excel',
  'diagnostico-comprador',
  'control-seguimientos-excel',
  'manejador-objeciones','comparador-inmuebles','comparador-inmuebles-excel',
  'calc-antictretico','calc-anticretico-excel',
  'generador-referidos','reactivador-contactos',
  'registro-comisiones-excel','presentacion-personal-word'
];
const SOPORTE_WHATSAPP = '59169638816';

// ══════════════════════════════════════════════
// FASES Y HERRAMIENTAS
// ══════════════════════════════════════════════
const FASES = [
  { id:'captacion', num:1, nombre:'Captación', desc:'Reunión con el propietario, precio de salida, acuerdo de trabajo', color:'navy', tools:['guia-captacion','propuesta-propietario','calc-comision','acuerdo-trabajo'] },
  { id:'publicacion', num:2, nombre:'Publicación y marketing', desc:'Ficha de propiedad, canales, portales', color:'navy', tools:['ficha-propiedad','cartera-propiedades-excel','generador-anuncio'] },
  { id:'interesados', num:3, nombre:'Atención de interesados', desc:'Primera respuesta, filtrar interesados, separar curiosos de compradores con intención real', color:'navy', tools:['respuesta-rapida','filtro-comprador'] },
  { id:'visita', num:4, nombre:'La visita', desc:'Checklist antes de mostrar, leer señales de cierre', color:'navy', tools:['checklist-visita','guia-visita','diagnostico-comprador'] },
  { id:'seguimiento', num:5, nombre:'Seguimiento post-visita', desc:'La mayoría de ventas se cierra después de 5 contactos o más. Aquí están las herramientas para no perder el hilo', color:'gold', tools:['generador-seguimiento','tablero-seguimientos','control-seguimientos-excel'] },
  { id:'negociacion', num:6, nombre:'Negociación y cierre', desc:'Objeciones, doble tipo de cambio, comparar inmuebles', color:'navy', tools:['manejador-objeciones','calc-tipo-cambio','comparador-inmuebles','comparador-inmuebles-excel'] },
  { id:'legal', num:7, nombre:'Proceso legal', desc:'Folio real, minuta, anticrético, documentos', color:'navy', tools:['guia-legal','checklist-antictretico','calc-antictretico','calc-anticretico-excel'] },
  { id:'postventa', num:8, nombre:'Post-venta y referidos', desc:'La etapa que la mayoría ignora. Un cliente satisfecho puede traerte 3 más', color:'gold', tools:['mensaje-postventa','generador-referidos','reactivador-contactos'] },
  { id:'transversal', num:0, nombre:'Recursos transversales', desc:'Comisiones, presentación, mensajes para cada momento', color:'navy', tools:['registro-comisiones-excel','presentacion-personal-word','banco-scripts','mis-plantillas','tablero-pendientes','biblioteca'] },
];

const TIPOS = [
  { id:'calculadoras', icon:'🧮', nombre:'Calculadoras', tools:['calc-comision','calc-tipo-cambio','calc-antictretico'] },
  { id:'generadores', icon:'✏️', nombre:'Generadores de texto', tools:['propuesta-propietario','respuesta-rapida','generador-seguimiento','mensaje-postventa','generador-anuncio','generador-referidos','reactivador-contactos'] },
  { id:'checklists', icon:'✅', nombre:'Checklists', tools:['checklist-visita','checklist-antictretico'] },
  { id:'guias', icon:'📖', nombre:'Guías y referencias', tools:['guia-captacion','guia-legal','manejador-objeciones','banco-scripts','guia-visita'] },
  { id:'formularios', icon:'📄', nombre:'Formularios', tools:['ficha-propiedad','filtro-comprador','comparador-inmuebles','acuerdo-trabajo','presentacion-personal-word','diagnostico-comprador'] },
  { id:'excel', icon:'📊', nombre:'Excel / Sheets', tools:['cartera-propiedades-excel','control-seguimientos-excel','comparador-inmuebles-excel','calc-anticretico-excel','registro-comisiones-excel'] },
  { id:'organizadores', icon:'🗂️', nombre:'Mis organizadores', tools:['mis-plantillas','tablero-pendientes','tablero-seguimientos'] },
];

// ══════════════════════════════════════════════
// UTILIDADES
// ══════════════════════════════════════════════
