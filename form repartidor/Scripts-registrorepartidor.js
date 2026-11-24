// ============ Registro de repartidor ============
//  Mismo diseño y funcionamiento que el registro de comercio.
//  Envía a POST /api/registro/:token:
//  { rol:"repartidor", nombre, tipo_documento, documento, celular, correo,
//    vehiculo:"moto", placa, usuario, password, acepta_datos }
//  Por ahora solo moto; la zona la asigna el administrador en el panel.
(() => {
  'use strict';
  const R = window.Registro;
  const $ = (id) => document.getElementById(id);
  const form = $('registroForm'), btn = $('submitBtn'), aviso = $('aviso');

  const avisar = (texto, tono = 'info') => { aviso.textContent = texto; aviso.dataset.tono = tono; aviso.hidden = !texto; };

  // Enlace: si venció o ya se usó, el formulario se bloquea
  R.verificar('repartidor').then((v) => {
    if (!v.ok) { avisar(v.motivo, 'error'); form.querySelectorAll('input, select, button').forEach((el) => (el.disabled = true)); }
    if (v.vence) $('link-info').textContent = `Enlace de un solo uso · vence el ${R.fechaCorta(v.vence)}`;
  });

  R.contrasena('password', 'togglePass', form.querySelector('.meter'));
  $('celular').addEventListener('input', (e) => { e.target.value = R.formatoCelular(e.target.value); });
  $('documento').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/[^0-9A-Za-z]/g, ''); });
  $('usuario').addEventListener('input', (e) => { e.target.value = e.target.value.toLowerCase().replace(/\s/g, ''); });
  $('placa').addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });

  const reglas = {
    nombre: () => R.marcar('nombre', $('nombre').value.trim().split(/\s+/).length < 2),
    documento: () => R.marcar('documento', !/^[0-9A-Za-z]{5,15}$/.test($('documento').value)),
    celular: () => R.marcar('celular', !R.celularOk($('celular').value)),
    correo: () => R.marcar('correo', !R.correoOk($('correo').value)),
    placa: () => R.marcar('placa', !/^[A-Z]{3}\d{2}[A-Z]$/.test($('placa').value)),
    usuario: () => R.marcar('usuario', !R.usuarioOk($('usuario').value)),
    password: () => R.marcar('password', $('password').value.length < 8),
    datos: () => R.marcar('datos', !$('datos').checked),
  };
  Object.keys(reglas).forEach((id) => {
    const el = $(id);
    el.addEventListener('blur', () => { if (el.value) reglas[id](); });
    el.addEventListener('input', () => { if (el.classList.contains('invalid')) reglas[id](); });
    el.addEventListener('change', () => { if (el.type === 'checkbox') reglas[id](); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = Object.values(reglas).map((f) => f()).every(Boolean);
    if (!ok) { form.querySelector('.invalid')?.focus(); return; }

    const datos = {
      rol: 'repartidor',
      nombre: $('nombre').value.trim().replace(/\s+/g, ' '),
      tipo_documento: $('tipo_documento').value,
      documento: $('documento').value,
      celular: R.soloDigitos($('celular').value),
      correo: $('correo').value.trim().toLowerCase(),
      vehiculo: 'moto',            // por ahora solo moto
      placa: $('placa').value,     // la zona la asigna el administrador
      usuario: $('usuario').value.trim(),
      password: $('password').value,
      acepta_datos: true,
    };

    btn.disabled = true; btn.querySelector('span').textContent = 'Creando cuenta…';
    const r = await R.enviar(datos);
    if (!r.ok) {
      Object.entries(r.campos || {}).forEach(([id, txt]) => R.marcar(id, true, txt));
      avisar(r.mensaje, 'error');
      btn.disabled = false; btn.querySelector('span').textContent = 'Crear mi cuenta';
      form.querySelector('.invalid')?.focus();
      return;
    }

    $('sum-nombre').textContent = datos.nombre;
    $('sum-vehiculo').textContent = `Moto · ${datos.placa}`;
    $('sum-contacto').textContent = `${R.formatoCelular(datos.celular)} · ${datos.correo}`;
    $('sum-usuario').textContent = datos.usuario;
    form.hidden = true;
    $('successState').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
