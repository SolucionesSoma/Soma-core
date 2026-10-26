# Hopi en SOMA: plan de implementación

**Objetivo:** sustituir Flow por Hopi en la suite pública y entregar una página de producto con demo interactiva coherente con Nexo, Orbit y Atlas.

**Diseño:** reutilizar los tokens, Manrope, retícula editorial, mascota de origami azul y preferencias ES/EN y claro/oscuro de SOMA. Usar el conejo original de Hopi. Página en `/productos/hopi`, con módulos, recorrido, demo, marca blanca, preguntas y contacto; acceso separado a la aplicación real. No prometer pasarela de pagos: Hopi registra cobros externos.

**Decisión de ejecución:** desarrollo directo en copia aislada `/tmp/soma-core-hopi`, conforme a la petición de implementación autónoma del usuario. Sin rediseñar SOMA ni modificar los otros aplicativos. La demo es local, ficticia, reiniciable y sin mensajes externos.

## Entregables y comprobaciones

- [x] Sustituir Flow ES/EN, retirar su imagen y corregir la asociación de imágenes por nombre (la lista de seis productos tiene solo cinco imágenes posicionales).
- [x] Crear contenido y página Hopi con navegación móvil, tema, idioma, SEO, sitemap y rutas de despliegue.
- [x] Crear demo: menú/carrito, aprobación, cocina, cobro dividido, inventario estricto/flexible, marca blanca y asistente de conversación guiado local.
- [x] Probar transiciones, rechazo sin efectos parciales, división exacta en COP, inventario negativo/ajustes y reinicio completo mediante modelo puro; verificar el recorrido también en navegador.
- [x] Crear imagen comercial desde la demo renderizada y el conejo original, siguiendo las tarjetas actuales.
- [x] Compilar, ejecutar validadores existentes, revisar ES/EN y claro/oscuro en móvil/escritorio, obtener revisión independiente y publicar en GitHub.
- [ ] Verificar despliegue en somacoretech.com; informar cualquier impedimento real.

## Riesgos a revisar

1. La demo no debe hacer llamadas al backend real ni enviar mensajes.
2. El idioma cambia todos los controles nuevos; el tema conserva contraste.
3. Pedidos pendientes no se cobran; aprobaciones repetidas no descuentan dos veces.
4. Reiniciar restaura pedidos, inventario, carrito, marca y conversación.
5. No ocultar Flow solo en un idioma ni desplazar imágenes de Sonora y Relay.
