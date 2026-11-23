# LoEntrego · Links

Páginas sueltas que se comparten por enlace.

| Carpeta | Qué es | Estilo |
|---|---|---|
| `form comercio/` | Registro de comercio con el enlace de un solo uso que genera el panel admin. | "Día": claro, panel azul con beneficios y formulario en 3 bloques. |
| `form repartidor/` | Registro de repartidor con el enlace de un solo uso. | "Noche": oscuro, 3 pasos marcados como una ruta con cometa, vehículos en tarjetas y placa colombiana. |
| `links/` | Página de enlaces tipo Linktree (para la bio de Instagram, TikTok, etc.). | Columna para celular con la ruta y el cometa de la marca. |
| `registro-comun.js` | Lo que comparten los dos formularios: token, API, validaciones, celular y contraseña. | — |

## Formularios de registro

El panel admin (Enlaces) genera la URL con el token: `…/form comercio/?t=TOKEN`.

- Al abrir: `GET /api/registro/:token` → `{ valido, rol, vence }`. Si venció o ya se usó, el formulario se bloquea y lo explica.
- Al enviar: `POST /api/registro/:token` con los datos (ver el inicio de cada `Scripts-*.js`).
- En GitHub Pages o en local funcionan en **modo demostración**: validan todo y muestran el final, pero no crean ninguna cuenta.

## Página de enlaces

Para cambiar, agregar o quitar enlaces se edita solo la lista `ENLACES` (y `REDES`) al inicio de `links/script.js`.

Antes de publicar, revisa estos enlaces, que van de ejemplo:

- Instagram, Facebook y TikTok (`@loentrego`)
- La reseña de Google (`g.page/r/loentrego/review`)
