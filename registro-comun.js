// =====================================================================
//  LoEntrego · Lo común a los formularios de registro (comercio y repartidor)
//
//  El panel admin genera un enlace de un solo uso:  .../form comercio/?t=TOKEN
//    GET  /api/registro/:token  → { valido, rol, vence }        (al abrir)
//    POST /api/registro/:token  → { usuario, rol, mensaje }     (al enviar)
//  En el dominio real habla con la API. En GitHub Pages o en local (mockup)
//  funciona en modo demostración: valida todo pero no envía nada.
// =====================================================================
window.Registro = (() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const token = (params.get('t') || '').trim();
  const demo = /github\.io$|^localhost$|^127\.0\.0\.1$/.test(location.hostname) || location.protocol === 'file:';
  const API = '/api/registro/';

  const soloDigitos = (v) => String(v || '').replace(/\D/g, '');
  // 3001234567 → 300 123 4567 mientras se escribe
  const formatoCelular = (v) => { const d = soloDigitos(v).slice(0, 10); return [d.slice(0, 3), d.slice(3, 6), d.slice(6)].filter(Boolean).join(' '); };
  const celularOk = (v) => /^3\d{9}$/.test(soloDigitos(v));
  const correoOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
  const usuarioOk = (v) => /^[a-z0-9._-]{4,40}$/.test(String(v).trim());

  // 0 a 3 según largo y variedad (para la barrita de la contraseña)
  function fuerza(p) {
    if (!p || p.length < 8) return p ? 1 : 0;
    let n = 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) n++;
    if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p) || p.length >= 12) n++;
    return Math.min(3, n);
  }

  function fechaCorta(iso) {
    try { return new Date(iso).toLocaleString('es-CO', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'America/Bogota' }); }
    catch { return ''; }
  }

  // Revisa el enlace al abrir. Devuelve { ok, demo, vence, motivo }
  async function verificar(rolEsperado) {
    if (demo) return { ok: true, demo: true };
    if (!token) return { ok: false, motivo: 'Este enlace no es válido. Pide uno nuevo a LoEntrego.' };
    try {
      const r = await fetch(API + encodeURIComponent(token));
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.valido) return { ok: false, motivo: d.mensaje || 'Este enlace ya se usó o venció. Pide uno nuevo a LoEntrego.' };
      if (d.rol && d.rol !== rolEsperado) return { ok: false, motivo: 'Este enlace es para otro tipo de registro.' };
      return { ok: true, vence: d.vence };
    } catch {
      return { ok: false, motivo: 'No pudimos revisar el enlace. Revisa tu conexión y vuelve a intentarlo.' };
    }
  }

  // Envía el registro. Devuelve { ok, campos, mensaje }
  async function enviar(datos) {
    if (demo) { await new Promise((r) => setTimeout(r, 700)); return { ok: true, demo: true }; }
    try {
      const r = await fetch(API + encodeURIComponent(token), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) return { ok: true, ...d };
      return { ok: false, campos: d.campos || {}, mensaje: d.mensaje || 'No pudimos crear la cuenta. Intenta de nuevo.' };
    } catch {
      return { ok: false, mensaje: 'Sin conexión con el servidor. Revisa tu internet e intenta de nuevo.' };
    }
  }

  // Muestra u oculta el error de un campo
  function marcar(id, mal, texto) {
    const input = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (input) { input.classList.toggle('invalid', !!mal); input.setAttribute('aria-invalid', mal ? 'true' : 'false'); }
    if (err) { if (texto) err.textContent = texto; err.classList.toggle('show', !!mal); if (input) input.setAttribute('aria-describedby', 'err-' + id); }
    return !mal;
  }

  // Ojo de la contraseña + barrita de fuerza
  function contrasena(inputId, botonId, medidor) {
    const input = document.getElementById(inputId), btn = document.getElementById(botonId);
    btn?.addEventListener('click', () => {
      const ver = input.type === 'password';
      input.type = ver ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(ver));
      btn.setAttribute('aria-label', ver ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
    if (medidor) input.addEventListener('input', () => { medidor.dataset.n = fuerza(input.value); });
  }

  return { token, demo, soloDigitos, formatoCelular, celularOk, correoOk, usuarioOk, fuerza, fechaCorta, verificar, enviar, marcar, contrasena };
})();
