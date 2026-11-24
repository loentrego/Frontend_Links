// =====================================================================
//  LoEntrego · Página de enlaces
//  Mosaico de tarjetas sobre el planeta. Todo cabe en una pantalla.
//  Para cambiar, agregar o quitar enlaces solo se editan ENLACES y REDES.
//    tamano: 'ancha' (fila completa) o 'normal' (media fila)
//    destacado: true → la tarjeta lima (usar en una sola)
// =====================================================================
(() => {
  'use strict';
  const WHATSAPP = '573101234567';
  const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

  const ENLACES = [
    { titulo: 'Escríbenos por WhatsApp', detalle: 'Cotiza tu envío en minutos', url: wa('Hola LoEntrego, quiero información para enviar mis pedidos.'), icono: 'whatsapp', tamano: 'ancha', destacado: true },
    { titulo: 'Envía con nosotros', detalle: 'Registra tu comercio', url: 'https://loentrego.com/Pages/indexunete.html', icono: 'tienda' },
    { titulo: 'Sé repartidor', detalle: 'Únete al equipo', url: wa('Hola LoEntrego, quiero trabajar como repartidor.'), icono: 'moto' },
    { titulo: '¿Dónde va mi pedido?', detalle: 'Con tu código LOE-', url: wa('Hola LoEntrego, quiero saber cómo va mi pedido. Mi código es LOE-'), icono: 'caja' },
    { titulo: 'Entrar a la app', detalle: 'Comercios y repartidores', url: 'https://app.loentrego.com/', icono: 'app' },
    { titulo: 'Conoce LoEntrego', detalle: 'Cobertura, tarifa y cómo funciona', url: 'https://loentrego.com/', icono: 'ruta', tamano: 'ancha' },
  ];

  const REDES = [
    { nombre: 'WhatsApp', url: wa('Hola LoEntrego'), icono: 'whatsapp' },
    { nombre: 'Instagram', url: 'https://instagram.com/loentrego', icono: 'instagram' },
    { nombre: 'Facebook', url: 'https://facebook.com/loentrego', icono: 'facebook' },
    { nombre: 'Califícanos en Google', url: 'https://g.page/r/loentrego/review', icono: 'estrella' },
    { nombre: 'Correo', url: 'mailto:contacto@loentrego.com', icono: 'correo' },
  ];

  const ICONOS = {
    whatsapp: '<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4Z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.3 2 .9c-.3 1.3-1.4 2-2.7 1.8-3-.5-5.7-3.2-6.2-6.2-.2-1.3.5-2.4 1.8-2.7l.9 2Z"/>',
    tienda: '<path d="M3 9.5 12 4l9 5.5V20H3Z"/><path d="M9 20v-6h6v6"/>',
    moto: '<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5h5l3.5-6h3l1.5 6M14 10.5l-1.5-3H10M17 10.5l1-2.5h2.5"/>',
    caja: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    app: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/>',
    ruta: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    estrella: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>',
    facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.6 1.6-1.6H17V4.3a20 20 0 0 0-2.3-.1C12.4 4.2 11 5.6 11 8.1v2.4H8.5v3H11V21"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONOS[k] || ''}</svg>`;
  const ext = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (id) => document.getElementById(id);

  $('mosaico').innerHTML = ENLACES.map((e, i) => `
    <a class="tile${e.tamano === 'ancha' ? ' ancha' : ''}${e.destacado ? ' destacado' : ''}" href="${esc(e.url)}"${ext(e.url)} style="--i:${i}">
      <span class="t-ico">${svg(e.icono)}</span>
      <span class="t-txt"><b>${esc(e.titulo)}</b><small>${esc(e.detalle)}</small></span>
      <span class="t-flecha" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
    </a>`).join('');

  $('redes').innerHTML = REDES.map((r) => `<a class="red" href="${esc(r.url)}"${ext(r.url)} aria-label="${esc(r.nombre)}" title="${esc(r.nombre)}">${svg(r.icono)}</a>`).join('');

  // ---------- Nunca scroll: si no cabe, se compacta por niveles y al final se escala ----------
  const col = document.querySelector('.col');
  function encajar() {
    const root = document.documentElement;
    root.classList.remove('c1', 'c2', 'c3');
    col.style.transform = ''; col.style.height = '';
    const alto = window.innerHeight;
    const sobra = () => col.scrollHeight - alto;
    for (const nivel of ['c1', 'c2', 'c3']) { if (sobra() <= 0) break; root.classList.add(nivel); }
    if (sobra() > 0) {
      const k = alto / col.scrollHeight;
      col.style.height = (alto / k) + 'px';
      col.style.transform = `scale(${k})`;
    }
  }
  addEventListener('resize', encajar);
  addEventListener('load', encajar);
  document.fonts?.ready.then(encajar);
  encajar();

  // ---------- Compartir ----------
  const toast = $('toast');
  let t;
  const avisar = (txt) => { toast.textContent = txt; toast.dataset.show = ''; clearTimeout(t); t = setTimeout(() => delete toast.dataset.show, 1800); };
  $('compartir').addEventListener('click', async () => {
    const datos = { title: 'LoEntrego', text: 'Logística de última milla en Bogotá, Funza y Soacha', url: location.href };
    if (navigator.share) { try { await navigator.share(datos); } catch { /* cancelado */ } return; }
    try { await navigator.clipboard.writeText(location.href); avisar('Enlace copiado'); } catch { avisar(location.href); }
  });
})();
