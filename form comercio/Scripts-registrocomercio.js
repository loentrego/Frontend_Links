  const form = document.getElementById('registroForm');
  const successState = document.getElementById('successState');
  const submitBtn = document.getElementById('submitBtn');

  const togglePass = document.getElementById('togglePass');
  const passwordInput = document.getElementById('password');
  togglePass.addEventListener('click', () => {
    const isPass = passwordInput.type === 'password';
    passwordInput.type = isPass ? 'text' : 'password';
    togglePass.textContent = isPass ? 'Ocultar' : 'Ver';
    togglePass.setAttribute('aria-label', isPass ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });

  function showError(id, show){
    const el = document.getElementById('err-' + id);
    const input = document.getElementById(id);
    if(el) el.style.display = show ? 'block' : 'none';
    if(input) input.classList.toggle('invalid', show);
  }

  function validate(){
    let ok = true;

    const nombre = document.getElementById('nombre').value.trim();
    if(nombre.length < 3){
      showError('nombre', true); ok = false;
    } else showError('nombre', false);

    const direccion = document.getElementById('direccion').value.trim();
    if(direccion.length < 5){
      showError('direccion', true); ok = false;
    } else showError('direccion', false);

    const ciudad = document.getElementById('ciudad').value.trim();
    if(ciudad.length < 3){
      showError('ciudad', true); ok = false;
    } else showError('ciudad', false);

    const celular = document.getElementById('celular').value.trim();
    if(!/^3\d{9}$/.test(celular)){
      showError('celular', true); ok = false;
    } else showError('celular', false);

    const correo = document.getElementById('correo').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
      showError('correo', true); ok = false;
    } else showError('correo', false);

    const usuario = document.getElementById('usuario').value.trim();
    if(usuario.length < 4 || /\s/.test(usuario)){
      showError('usuario', true); ok = false;
    } else showError('usuario', false);

    const password = document.getElementById('password').value;
    if(password.length < 8){
      showError('password', true); ok = false;
    } else showError('password', false);

    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!validate()){
      const firstInvalid = form.querySelector('.invalid');
      if(firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creando cuenta…';

    const data = {
      nombre: document.getElementById('nombre').value.trim(),
      direccion: document.getElementById('direccion').value.trim(),
      ciudad: document.getElementById('ciudad').value.trim(),
      celular: document.getElementById('celular').value.trim(),
      correo: document.getElementById('correo').value.trim(),
      usuario: document.getElementById('usuario').value.trim(),
      creadoEn: new Date().toISOString()
    };

    try{
      if(window.storage){
        await window.storage.set('comercio:' + data.usuario, JSON.stringify(data), true);
      }
    }catch(err){
      console.error('No se pudo guardar el registro:', err);
    }

    document.getElementById('sum-nombre').textContent = data.nombre;
    document.getElementById('sum-direccion').textContent = data.direccion;
    document.getElementById('sum-ciudad').textContent = data.ciudad;
    document.getElementById('sum-celular').textContent = data.celular;
    document.getElementById('sum-correo').textContent = data.correo;
    document.getElementById('sum-usuario').textContent = data.usuario;

    form.classList.add('hide');
    successState.classList.add('show');
  });