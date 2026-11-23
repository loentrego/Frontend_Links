// ============ Registro de repartidor (3 pasos) ============
//  Envía a POST /api/registro/:token:
//  { rol:"repartidor", nombre, tipo_documento, documento, celular, correo,
//    vehiculo, placa, municipio, usuario, password, acepta_datos }
(() => {
  'use strict';
  const R = window.Registro;
  const $ = (id) => document.getElementById(id);
  const form = $('registroForm'), btn = $('submitBtn'), atras = $('atras'), aviso = $('aviso');
  const ruta = document.querySelector('.ruta');
  const VEHICULOS = { moto: 'Moto', bicicleta: 'Bicicleta', carro: 'Carro', a_pie: 'A pie' };
  const MUNICIPIOS = { bogota: 'Bogotá', funza: 'Funza', soacha: 'Soacha' };
  let paso = 1;

  const avisar = (texto, tono = 'info') => { aviso.textContent = texto; aviso.dataset.tono = tono; aviso.hidden = !texto; };
  R.verificar('repartidor').then((v) => {
    if (v.demo) avisar('Modo demostración: puedes probar el registro, pero no se crea ninguna cuenta.', 'info');
    else if (!v.ok) { avisar(v.motivo, 'error'); form.querySelectorAll('input, select, button').forEach((el) => (el.disabled = true)); }
    if (v.vence) $('link-info').textContent = `Enlace de un solo uso · vence el ${R.fechaCorta(v.vence)}`;
  });

  R.contrasena('password', 'togglePass', form.querySelector('.meter'));
  $('celular').addEventListener('input', (e) => { e.target.value = R.formatoCelular(e.target.value); });
  $('documento').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/[^0-9A-Za-z]/g, ''); });
  $('usuario').addEventListener('input', (e) => { e.target.value = e.target.value.toLowerCase().replace(/\s/g, ''); });
  $('placa').addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });

  // La placa solo se pide para moto y carro
  const necesitaPlaca = () => ['moto', 'carro'].includes(form.vehiculo.value);
  const actualizarPlaca = () => {
    $('campo-placa').hidden = !necesitaPlaca();
    $('placa').placeholder = form.vehiculo.value === 'carro' ? 'ABC123' : 'ABC12D';
  };
  form.querySelectorAll('input[name="vehiculo"]').forEach((r) => r.addEventListener('change', actualizarPlaca));
  actualizarPlaca();

  const reglas = {
    1: {
      nombre: () => R.marcar('nombre', $('nombre').value.trim().split(/\s+/).length < 2),
      documento: () => R.marcar('documento', !/^[0-9A-Za-z]{5,15}$/.test($('documento').value)),
      celular: () => R.marcar('celular', !R.celularOk($('celular').value)),
      correo: () => R.marcar('correo', !R.correoOk($('correo').value)),
    },
    2: {
      placa: () => R.marcar('placa', necesitaPlaca() && !/^[A-Z]{3}\d{2}[A-Z0-9]$/.test($('placa').value)),
    },
    3: {
      usuario: () => R.marcar('usuario', !R.usuarioOk($('usuario').value)),
      password: () => R.marcar('password', $('password').value.length < 8),
      datos: () => R.marcar('datos', !$('datos').checked),
    },
  };
  Object.values(reglas).forEach((grupo) => Object.keys(grupo).forEach((id) => {
    const el = $(id);
    el.addEventListener('blur', () => { if (el.value) grupo[id](); });
    el.addEventListener('input', () => { if (el.classList.contains('invalid')) grupo[id](); });
    el.addEventListener('change', () => { if (el.type === 'checkbox') grupo[id](); });
  }));

  function ir(n, desplazar = true) {
    paso = n;
    form.querySelectorAll('.paso').forEach((s) => (s.hidden = Number(s.dataset.paso) !== n));
    ruta.querySelectorAll('.parada').forEach((p) => {
      const k = Number(p.dataset.paso);
      p.classList.toggle('hecha', k < n);
      p.toggleAttribute('aria-current', k === n);
      if (k === n) p.setAttribute('aria-current', 'step');
    });
    ruta.style.setProperty('--p', (n - 1) / 2);
    atras.hidden = n === 1;
    btn.querySelector('span').textContent = n === 3 ? 'Crear mi cuenta' : 'Siguiente';
    const primero = form.querySelector(`.paso[data-paso="${n}"] input:not([type=radio]), .paso[data-paso="${n}"] .veh input:checked`);
    if (desplazar) {
      primero?.focus({ preventScroll: true });
      document.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  atras.addEventListener('click', () => ir(paso - 1));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = Object.values(reglas[paso]).map((f) => f()).every(Boolean);
    if (!ok) { form.querySelector(`.paso[data-paso="${paso}"] .invalid`)?.focus(); return; }
    if (paso < 3) { ir(paso + 1); return; }

    const datos = {
      rol: 'repartidor',
      nombre: $('nombre').value.trim().replace(/\s+/g, ' '),
      tipo_documento: $('tipo_documento').value,
      documento: $('documento').value,
      celular: R.soloDigitos($('celular').value),
      correo: $('correo').value.trim().toLowerCase(),
      vehiculo: form.vehiculo.value,
      placa: necesitaPlaca() ? $('placa').value : null,
      municipio: form.municipio.value,
      usuario: $('usuario').value.trim(),
      password: $('password').value,
      acepta_datos: true,
    };

    btn.disabled = true; btn.querySelector('span').textContent = 'Creando cuenta…';
    const r = await R.enviar(datos);
    if (!r.ok) {
      avisar(r.mensaje, 'error');
      const campos = Object.keys(r.campos || {});
      campos.forEach((id) => R.marcar(id, true, r.campos[id]));
      // Si el error es de un paso anterior, vuelve a ese paso
      const pasoErr = [1, 2, 3].find((n) => campos.some((c) => c in reglas[n]));
      if (pasoErr && pasoErr !== paso) ir(pasoErr);
      btn.disabled = false; btn.querySelector('span').textContent = paso === 3 ? 'Crear mi cuenta' : 'Siguiente';
      return;
    }

    $('sum-nombre').textContent = datos.nombre;
    $('sum-vehiculo').textContent = VEHICULOS[datos.vehiculo] + (datos.placa ? ` · ${datos.placa}` : '');
    $('sum-zona').textContent = MUNICIPIOS[datos.municipio];
    $('sum-usuario').textContent = datos.usuario;
    ruta.querySelectorAll('.parada').forEach((p) => p.classList.add('hecha'));
    ruta.style.setProperty('--p', 1);
    form.hidden = true;
    $('successState').hidden = false;
  });

  ir(1, false);
})();
