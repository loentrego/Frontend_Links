// =====================================================================
//  LoEntrego · Página de enlaces: una guía de envío con su ruta
//  · Arriba, la guía (como la etiqueta de un paquete).
//  · "¿Quién eres?": cambia las paradas según el perfil.
//  · Cada enlace es una parada; el cometa baja por la ruta al desplazar.
//  Para compartir un perfil ya elegido:  links/?para=repartidor
//  Para cambiar enlaces, solo se editan PERFILES y REDES.
// =====================================================================
(() => {
  'use strict';
  const WHATSAPP = '573101234567';
  const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

  // Paradas de cada perfil (la primera va destacada en lima)
  const PERFILES = {
    comercio: {
      para: 'ti, comercio',
      frase: 'Llevamos los pedidos de tu comercio hasta la puerta de tu cliente.',
      paradas: [
        { titulo: 'Cotiza tu envío', detalle: 'Escríbenos por WhatsApp', etiqueta: 'Más rápido', url: wa('Hola LoEntrego, quiero información para enviar los pedidos de mi comercio.'), icono: 'whatsapp' },
        { titulo: 'Registra tu comercio', detalle: 'Déjanos tus datos y te contactamos', url: 'https://loentrego.com/Pages/indexunete.html', icono: 'tienda' },
        { titulo: 'Cómo funciona', detalle: 'Cobertura, tarifa y pasos', url: 'https://loentrego.com/', icono: 'ruta' },
        { titulo: 'Entra a la app', detalle: 'Crea y sigue tus pedidos', url: 'https://app.loentrego.com/', icono: 'app' },
      ],
    },
    repartidor: {
      para: 'ti, repartidor',
      frase: 'Súbete a la ruta: entregas cerca de ti, con todo claro en la app.',
      paradas: [
        { titulo: 'Quiero repartir', detalle: 'Escríbenos y te contamos cómo empezar', etiqueta: 'Únete', url: wa('Hola LoEntrego, quiero trabajar como repartidor.'), icono: 'moto' },
        { titulo: 'Conoce LoEntrego', detalle: 'Dónde operamos y cómo trabajamos', url: 'https://loentrego.com/Pages/indexnosotros.html', icono: 'ruta' },
        { titulo: 'Entra a la app', detalle: 'Tu ruta del día', url: 'https://app.loentrego.com/', icono: 'app' },
      ],
    },
    cliente: {
      para: 'ti, que esperas un pedido',
      frase: 'Tu pedido va en camino. Aquí te ayudamos a seguirlo.',
      paradas: [
        { titulo: '¿Dónde va mi pedido?', detalle: 'Pregúntanos con tu código LE-', etiqueta: 'Seguimiento', url: wa('Hola LoEntrego, quiero saber cómo va mi pedido. Mi código es LE-'), icono: 'caja' },
        { titulo: 'Califica tu entrega', detalle: 'Tu opinión en Google nos ayuda', url: 'https://g.page/r/loentrego/review', icono: 'estrella' },
        { titulo: '¿Tienes un negocio?', detalle: 'Envía tus pedidos con nosotros', url: 'https://loentrego.com/Pages/indexunete.html', icono: 'tienda' },
      ],
    },
  };

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
    caja: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    estrella: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>',
    facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.6 1.6-1.6H17V4.3a20 20 0 0 0-2.3-.1C12.4 4.2 11 5.6 11 8.1v2.4H8.5v3H11V21"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.2 4.3 5 4.5"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONOS[k] || ''}</svg>`;
  const ext = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (id) => document.getElementById(id);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Código de guía: LE- + 4 dígitos que cambian cada día (como un envío nuevo)
  const hoy = new Date();
  $('codigo').textContent = 'LE-' + String(((hoy.getFullYear() * 372 + hoy.getMonth() * 31 + hoy.getDate()) * 7919) % 9000 + 1000);

  $('redes').innerHTML = REDES.map((r) => `<a class="red" href="${esc(r.url)}"${ext(r.url)} aria-label="${esc(r.nombre)}" title="${esc(r.nombre)}">${svg(r.icono)}</a>`).join('');

  // ---------- Perfil ----------
  const botones = [...document.querySelectorAll('[data-perfil]')];
  const luz = document.querySelector('.perfil-luz');
  // El resaltado lima se mueve debajo del perfil elegido
  function posicionarLuz() {
    const b = botones.find((x) => x.getAttribute('aria-selected') === 'true');
    if (b) { luz.style.width = b.offsetWidth + 'px'; luz.style.transform = `translateX(${b.offsetLeft - 4}px)`; }
  }
  function elegir(perfil, { animar = true, guardar = true } = {}) {
    if (!PERFILES[perfil]) perfil = 'comercio';
    const p = PERFILES[perfil];
    botones.forEach((b) => {
      const act = b.dataset.perfil === perfil;
      b.setAttribute('aria-selected', String(act));
      b.tabIndex = act ? 0 : -1;
    });
    posicionarLuz();
    $('para').textContent = p.para;
    $('frase').textContent = p.frase;
    const lista = $('paradas');
    const pintar = () => {
      lista.innerHTML = p.paradas.map((e, i) => `
        <li class="parada${i === 0 ? ' destacada' : ''}" style="--i:${i}">
          <span class="nodo" aria-hidden="true"></span>
          <a class="tarjeta" href="${esc(e.url)}"${ext(e.url)}>
            <span class="t-ico">${svg(e.icono)}</span>
            <span class="t-txt">
              <small class="t-num">Parada ${i + 1}${e.etiqueta ? ` · <em>${esc(e.etiqueta)}</em>` : ''}</small>
              <b>${esc(e.titulo)}</b>
              <span>${esc(e.detalle)}</span>
            </span>
            <span class="t-flecha" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
          </a>
        </li>`).join('');
      lista.classList.remove('saliendo');
      medir();
    };
    if (animar && !reduce) { lista.classList.add('saliendo'); setTimeout(pintar, 180); } else pintar();
    if (guardar) { const u = new URL(location); u.searchParams.set('para', perfil); history.replaceState(null, '', u); }
  }
  botones.forEach((b) => b.addEventListener('click', () => elegir(b.dataset.perfil)));
  // Flechas del teclado entre perfiles
  document.querySelector('.perfiles').addEventListener('keydown', (e) => {
    const i = botones.findIndex((b) => b.getAttribute('aria-selected') === 'true');
    const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!n) return;
    const sig = botones[(i + n + botones.length) % botones.length];
    sig.focus(); elegir(sig.dataset.perfil);
  });

  // ---------- El cometa baja por la ruta al desplazar ----------
  const ruta = $('ruta');
  let nodos = [], alto = 1, top0 = 0;
  function medir() {
    const r = ruta.getBoundingClientRect();
    top0 = r.top + scrollY; alto = r.height;
    nodos = [...ruta.querySelectorAll('.nodo')].map((n) => { const b = n.getBoundingClientRect(); return { el: n.closest('.parada, .entregado'), y: b.top + scrollY + b.height / 2 - top0 }; });
    mover();
  }
  function mover() {
    // El cometa va a la altura del centro de la pantalla (y nunca antes de la primera parada)
    const fin = nodos.length ? nodos[nodos.length - 1].y : alto;
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    let centro = scrollY + innerHeight * 0.55 - top0;
    // Si la página es corta, el cometa no alcanzaría el final: se reparte lo que falta en el recorrido
    const centroMax = max + innerHeight * 0.55 - top0;
    if (centroMax < fin) centro += (fin - centroMax) * (max ? scrollY / max : 1);
    const y = Math.max(nodos[0]?.y || 0, Math.min(fin, centro));
    ruta.style.setProperty('--y', y + 'px');
    nodos.forEach((n) => n.el?.classList.toggle('pasada', n.y <= y + 2));
  }
  let tic = false;
  addEventListener('scroll', () => { if (!tic) { tic = true; requestAnimationFrame(() => { mover(); tic = false; }); } }, { passive: true });
  // Al redimensionar (también cuando el celular esconde su barra) solo se recoloca: no se vuelve a dibujar
  addEventListener('resize', () => { posicionarLuz(); medir(); });
  addEventListener('load', medir);

  elegir(new URLSearchParams(location.search).get('para') || 'comercio', { animar: false, guardar: false });

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
