// ============ Registro de comercio ============
//  Envía a POST /api/registro/:token:
//  { rol:"comercio", nombre, tipo, direccion, municipio, pedidos_diarios, celular, correo, usuario, password, acepta_datos }
(() => {
  'use strict';
  const R = window.Registro;
  const $ = (id) => document.getElementById(id);
  const form = $('registroForm'), btn = $('submitBtn'), aviso = $('aviso');
  const MUNICIPIOS = { bogota: 'Bogotá', funza: 'Funza', soacha: 'Soacha' };
  const TIPOS = { comercio: 'Tienda o local', ecommerce: 'Tienda en línea', sector_publico: 'Entidad pública' };

  const avisar = (texto, tono = 'info') => { aviso.textContent = texto; aviso.dataset.tono = tono; aviso.hidden = !texto; };

  // Enlace: vigente, vencido o modo demostración
  R.verificar('comercio').then((v) => {
    if (v.demo) avisar('Modo demostración: puedes probar el formulario, pero no se crea ninguna cuenta.', 'info');
    else if (!v.ok) { avisar(v.motivo, 'error'); form.querySelectorAll('input, button').forEach((el) => (el.disabled = true)); }
    if (v.vence) $('link-info').textContent = `Enlace de un solo uso · vence el ${R.fechaCorta(v.vence)}`;
  });

  R.contrasena('password', 'togglePass', form.querySelector('.meter'));
  $('celular').addEventListener('input', (e) => { e.target.value = R.formatoCelular(e.target.value); });
  $('usuario').addEventListener('input', (e) => { e.target.value = e.target.value.toLowerCase().replace(/\s/g, ''); });

  const reglas = {
    nombre: () => R.marcar('nombre', $('nombre').value.trim().length < 2),
    direccion: () => R.marcar('direccion', $('direccion').value.trim().length < 5),
    celular: () => R.marcar('celular', !R.celularOk($('celular').value)),
    correo: () => R.marcar('correo', !R.correoOk($('correo').value)),
    usuario: () => R.marcar('usuario', !R.usuarioOk($('usuario').value)),
    password: () => R.marcar('password', $('password').value.length < 8),
    datos: () => R.marcar('datos', !$('datos').checked),
  };
  // Se valida al salir de cada campo y se limpia al corregir
  Object.keys(reglas).forEach((id) => {
    const el = $(id);
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') reglas[id](); });
    el.addEventListener('input', () => { if (el.classList.contains('invalid')) reglas[id](); });
    el.addEventListener('change', () => { if (el.type === 'checkbox') reglas[id](); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = Object.values(reglas).map((f) => f()).every(Boolean);
    if (!ok) { form.querySelector('.invalid')?.focus(); return; }

    const datos = {
      rol: 'comercio',
      nombre: $('nombre').value.trim(),
      tipo: form.tipo.value,
      direccion: $('direccion').value.trim(),
      municipio: form.municipio.value,
      pedidos_diarios: $('pedidos').value ? Number($('pedidos').value) : null,
      celular: R.soloDigitos($('celular').value),
      correo: $('correo').value.trim().toLowerCase(),
      usuario: $('usuario').value.trim(),
      password: $('password').value,
      acepta_datos: true,
    };

    btn.disabled = true; btn.querySelector('span').textContent = 'Creando cuenta…';
    const r = await R.enviar(datos);
    if (!r.ok) {
      Object.entries(r.campos || {}).forEach(([id, txt]) => R.marcar(id, true, txt));
      avisar(r.mensaje, 'error');
      btn.disabled = false; btn.querySelector('span').textContent = 'Crear cuenta de comercio';
      form.querySelector('.invalid')?.focus();
      return;
    }

    $('sum-nombre').textContent = datos.nombre;
    $('sum-tipo').textContent = TIPOS[datos.tipo];
    $('sum-direccion').textContent = `${datos.direccion} · ${MUNICIPIOS[datos.municipio]}`;
    $('sum-contacto').textContent = `${R.formatoCelular(datos.celular)} · ${datos.correo}`;
    $('sum-usuario').textContent = datos.usuario;
    form.hidden = true;
    $('successState').hidden = false;
    $('successState').querySelector('h2').focus?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
