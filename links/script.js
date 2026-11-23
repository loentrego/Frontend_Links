// =====================================================================
//  LoEntrego · Página de enlaces (tipo Linktree)
//  Para cambiar, agregar o quitar un enlace solo se edita la lista ENLACES
//  o REDES. El orden de la lista es el orden en la página.
// =====================================================================
(() => {
  'use strict';

  const WHATSAPP = '573101234567';
  const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

  // destacado: true → botón grande lima (usar en uno solo)
  const ENLACES = [
    { titulo: 'Escríbenos por WhatsApp', detalle: 'Cotiza tu envío en minutos', url: wa('Hola LoEntrego, quiero información para enviar mis pedidos.'), icono: 'whatsapp', destacado: true },
    { titulo: 'Quiero enviar con LoEntrego', detalle: 'Registra tu comercio', url: 'https://loentrego.com/Pages/indexunete.html', icono: 'tienda' },
    { titulo: 'Conoce cómo funciona', detalle: 'Cobertura, tarifa y pasos', url: 'https://loentrego.com/', icono: 'ruta' },
    { titulo: 'Quiero ser repartidor', detalle: 'Escríbenos y te contamos', url: wa('Hola LoEntrego, quiero trabajar como repartidor.'), icono: 'moto' },
    { titulo: 'Entrar a la app', detalle: 'Comercios y repartidores', url: 'https://app.loentrego.com/', icono: 'app' },
    { titulo: 'Califícanos en Google', detalle: 'Tu opinión nos ayuda a crecer', url: 'https://g.page/r/loentrego/review', icono: 'estrella' },
  ];

  const REDES = [
    { nombre: 'Instagram', url: 'https://instagram.com/loentrego', icono: 'instagram' },
    { nombre: 'Facebook', url: 'https://facebook.com/loentrego', icono: 'facebook' },
    { nombre: 'TikTok', url: 'https://tiktok.com/@loentrego', icono: 'tiktok' },
    { nombre: 'Correo', url: 'mailto:contacto@loentrego.com', icono: 'correo' },
  ];

  const ICONOS = {
    whatsapp: '<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4Z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.3 2 .9c-.3 1.3-1.4 2-2.7 1.8-3-.5-5.7-3.2-6.2-6.2-.2-1.3.5-2.4 1.8-2.7l.9 2Z"/>',
    tienda: '<path d="M3 9.5 12 4l9 5.5V20H3Z"/><path d="M9 20v-6h6v6"/>',
    ruta: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    moto: '<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5h5l3.5-6h3l1.5 6M14 10.5l-1.5-3H10M17 10.5l1-2.5h2.5"/>',
    app: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/>',
    estrella: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>',
    facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.6 1.6-1.6H17V4.3a20 20 0 0 0-2.3-.1C12.4 4.2 11 5.6 11 8.1v2.4H8.5v3H11V21"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.2 4.3 5 4.5"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONOS[k] || ''}</svg>`;
  const externo = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  document.getElementById('enlaces').innerHTML = ENLACES.map((e, i) => `
    <a class="enlace${e.destacado ? ' destacado' : ''}" href="${esc(e.url)}"${externo(e.url)} style="--i:${i}">
      <span class="e-ico">${svg(e.icono)}</span>
      <span class="e-txt"><b>${esc(e.titulo)}</b><small>${esc(e.detalle)}</small></span>
      <span class="e-flecha" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
    </a>`).join('');

  document.getElementById('redes').innerHTML = REDES.map((r) => `
    <a class="red" href="${esc(r.url)}"${externo(r.url)} aria-label="${esc(r.nombre)}" title="${esc(r.nombre)}">${svg(r.icono)}</a>`).join('');

  // Compartir: menú del celular si existe; si no, copia el enlace
  const toast = document.getElementById('toast');
  let t;
  const avisar = (txt) => { toast.textContent = txt; toast.dataset.show = ''; clearTimeout(t); t = setTimeout(() => delete toast.dataset.show, 1800); };
  document.getElementById('compartir').addEventListener('click', async () => {
    const datos = { title: 'LoEntrego', text: 'Logística de última milla en Bogotá, Funza y Soacha', url: location.href };
    if (navigator.share) { try { await navigator.share(datos); } catch { /* cancelado */ } return; }
    try { await navigator.clipboard.writeText(location.href); avisar('Enlace copiado'); }
    catch { avisar(location.href); }
  });
})();
