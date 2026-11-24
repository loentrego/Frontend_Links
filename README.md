# LoEntrego · Links

Páginas sueltas que se comparten por enlace.

| Carpeta | Qué es | Estilo |
|---|---|---|
| `form comercio/` | Registro de comercio con el enlace de un solo uso que genera el panel admin. | Panel azul con beneficios y formulario en 3 bloques. Tema claro u oscuro automático. |
| `form repartidor/` | Registro de repartidor con el enlace de un solo uso. | El mismo diseño del registro de comercio, en 2 bloques: datos personales y acceso. Sin datos de vehículo; la zona la asigna el administrador. |
| `links/` | Página de enlaces (para la bio de Instagram, etc.). | Perfil arriba (foto, @loentrego con sello, bio y "En ruta ahora"); el visitante elige si es comercio, repartidor o cliente, y los enlaces son paradas que el cometa recorre solo. Contacto por Instagram y Facebook. Una sola pantalla sin scroll. |
| `registro-comun.js` | Lo que comparten los dos formularios: token, API, validaciones, celular y contraseña. | — |

## Formularios de registro

El panel admin (Enlaces) genera la URL con el token: `…/form comercio/?t=TOKEN`.

- Al abrir: `GET /api/registro/:token` → `{ valido, rol, vence }`. Si venció o ya se usó, el formulario se bloquea y lo explica.
- Al enviar: `POST /api/registro/:token` con los datos (ver el inicio de cada `Scripts-*.js`).
- En GitHub Pages o en local funcionan en **modo demostración**: validan todo y muestran el final, pero no crean ninguna cuenta.

## Página de enlaces

Se puede compartir con un perfil ya elegido: `links/?para=comercio`, `links/?para=repartidor` o `links/?para=cliente`.


Para cambiar, agregar o quitar enlaces se editan solo las listas `PERFILES` y `REDES` al inicio de `links/script.js`.

Antes de publicar, revisa estos enlaces, que van de ejemplo:

- Instagram y Facebook (`@loentrego`)
- La reseña de Google (`g.page/r/loentrego/review`)
