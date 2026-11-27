// =====================================================================
//  LoEntrego · Página de enlaces: el perfil y la ruta
//  · Arriba, el perfil: foto con órbita, @loentrego, bio y "En ruta ahora".
//  · Pensada para los comercios (nuestros clientes): unirse, cotizar y entrar a la app.
//  · Cada enlace es una parada; el cometa recorre la ruta en bucle.
//  · Todo cabe en una pantalla: la página no tiene scroll.
//  Para cambiar enlaces, solo se editan PERFILES y REDES.
// =====================================================================
(() => {
  'use strict';
  // Hoy el contacto es por Instagram y Facebook (WhatsApp aún no está activo)
  const IG_MENSAJE = 'https://ig.me/m/loentrego';

  // Paradas de cada perfil (la primera va destacada en lima)
  // Para nuestros clientes: los comercios. Invita a unir el comercio a LoEntrego.
  const PERFILES = {
    comercio: {
      para: 'tu comercio',
      frase: 'Une tu comercio a LoEntrego: recogemos tus pedidos y los llevamos hasta tu cliente.',
      paradas: [
        { titulo: 'Une tu comercio', detalle: 'Regístrate y empieza a enviar', etiqueta: 'Empieza aquí', url: 'https://loentrego.com/Pages/indexunete.html', icono: 'tienda' },
        { titulo: 'Cotiza tu envío', detalle: 'Escríbenos por Instagram', url: IG_MENSAJE, icono: 'instagram' },
        { titulo: 'Cómo funciona', detalle: 'Cobertura, tarifa y condiciones', url: 'https://loentrego.com/#condiciones', icono: 'ruta' },
      ],
    },
  };

  const REDES = [
    { nombre: 'Instagram', url: 'https://instagram.com/loentrego', icono: 'instagram' },
    { nombre: 'Facebook', url: 'https://facebook.com/loentrego', icono: 'facebook' },
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
  // Acento de cada parada: azul, naranja y lavanda de la paleta (la primera ya es lima)
  const TONOS = ['#B5DB2E', '#4F8DFF', '#FF8A1F', '#C3B9FF'];
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONOS[k] || ''}</svg>`;
  const ext = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (id) => document.getElementById(id);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;


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
    $('frase').textContent = p.frase;
    const lista = $('paradas');
    const pintar = () => {
      lista.innerHTML = p.paradas.map((e, i) => `
        <li class="parada${i === 0 ? ' destacada' : ''}" style="--i:${i};--tono:${TONOS[i % TONOS.length]}">
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
      encajar?.(); medir();
    };
    if (animar && !reduce) { lista.classList.add('saliendo'); setTimeout(pintar, 180); } else pintar();
  }
  botones.forEach((b) => b.addEventListener('click', () => elegir(b.dataset.perfil)));
  // Flechas del teclado entre perfiles
  document.querySelector('.perfiles')?.addEventListener('keydown', (e) => {
    const i = botones.findIndex((b) => b.getAttribute('aria-selected') === 'true');
    const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!n) return;
    const sig = botones[(i + n + botones.length) % botones.length];
    sig.focus(); elegir(sig.dataset.perfil);
  });

  // ---------- El cometa recorre la ruta solo (la página no tiene scroll) ----------
  const ruta = $('ruta');
  let nodos = [], t0 = performance.now();
  function medir() {
    const top0 = ruta.getBoundingClientRect().top;
    nodos = [...ruta.querySelectorAll('.nodo')].map((n) => { const b = n.getBoundingClientRect(); return { el: n.closest('.parada, .entregado'), y: b.top + b.height / 2 - top0 }; });
    t0 = performance.now();
  }
  // Ciclo de 5 s: baja 3 s de la primera parada a "Entregado", espera 2 s y vuelve a empezar
  function mover(ahora) {
    if (nodos.length) {
      const ini = nodos[0].y, fin = nodos[nodos.length - 1].y;
      const k = reduce ? 1 : Math.min(1, ((ahora - t0) % 5000) / 3000);
      const e = 1 - Math.pow(1 - k, 3);
      const y = ini + (fin - ini) * e;
      ruta.style.setProperty('--y', y + 'px');
      nodos.forEach((n) => n.el?.classList.toggle('pasada', n.y <= y + 2));
    }
    if (!reduce) requestAnimationFrame(mover);
  }
  // ---------- Nunca scroll: si no cabe, se compacta por niveles y al final se escala ----------
  const col = document.querySelector('.col');
  function encajar() {
    const root = document.documentElement;
    root.classList.remove('c0', 'c1', 'c2', 'c3', 'c4');
    col.style.transform = ''; col.style.height = '';
    const alto = window.innerHeight;
    // Lo que sobra: el final de la ruta no puede pasar el inicio del pie, ni la cabecera salirse por arriba
    const pie = document.querySelector('.pie');
    const sobra = () => {
      const fin = $('ruta').getBoundingClientRect().bottom, techo = (getComputedStyle(pie).display !== 'none' ? pie.getBoundingClientRect().top : alto) - 8;
      const arriba = -Math.min(0, col.firstElementChild.getBoundingClientRect().top);
      return Math.max(fin - techo, arriba);
    };
    for (const nivel of ['c0', 'c1', 'c2', 'c3', 'c4']) { if (sobra() <= 0) break; root.classList.add(nivel); }
    if (sobra() > 0) {                       // último recurso: escalar todo para que quepa
      const k = Math.max(0.6, (alto - sobra()) / alto);
      col.style.height = (alto / k) + 'px';
      col.style.transform = `scale(${k})`;
    }
  }
  addEventListener('resize', () => { encajar(); posicionarLuz(); medir(); });
  addEventListener('load', () => { encajar(); medir(); });
  document.fonts?.ready.then(() => { encajar(); medir(); });
  addEventListener('load', medir);
  requestAnimationFrame(mover);

  elegir('comercio', { animar: false, guardar: false });

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
