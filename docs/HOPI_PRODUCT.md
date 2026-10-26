# Hopi en el sitio SOMA

Página pública: `https://somacoretech.com/productos/hopi`.
Aplicación real: `https://hopi.somacoretech.com`.

Hopi sustituye a Flow en la suite ES/EN. Sonora y Relay mantienen sus propias imágenes;
la asociación ahora usa el nombre del producto para evitar desplazamientos de una lista posicional.

La página conserva Manrope, azules SOMA, retícula editorial, preferencias de idioma/tema,
contacto y pie corporativo de Nexo/Orbit/Atlas. Reutiliza el conejo original creado para Hopi
(`SolucionesSoma/Hopi`, `frontend/public/brand/`); no es una nueva mascota.

## Demo

La demo es ilustrativa, usa datos ficticios y vive solo en memoria del navegador.
No conecta con Hopi, WhatsApp ni un proveedor de IA. Las llamadas de Analytics y las fuentes
pertenecen al sitio SOMA existente. El botón de contacto abre WhatsApp solo cuando el visitante lo elige.

Recorrido: añadir productos, confirmar pedido, aprobación de personal, comanda, marcar listo,
dividir cuenta y registrar cobro externo. Cambian resumen y stock. El modo estricto bloquea
reservas insuficientes; el flexible admite negativos y ajustes. Marca blanca muestra Casa Cobre,
un restaurante ficticio. La conversación guiada comparte carrito/reglas con la demo.
El reinicio restaura todo; recargar también elimina los cambios.

La demo cuenta porciones por producto. No reproduce todas las funciones del backend real
(ingredientes/recetas, permisos, reportes financieros, impuestos configurables y logística).
Los importes son ejemplos en COP, finales; el domicilio de demo no añade tarifa.

## Desarrollo y comprobaciones

Desde `app/`, Node 22 o superior:

```sh
npm ci
npx playwright install chromium
npm run test:hopi-model
npm run test:hopi
npm run validate:site
npm run validate:orbit
npm run validate:atlas
npm run validate:nexo
npm run build
npm run validate:hopi
```

La compilación genera `dist/productos/hopi/index.html`, con metadatos de Hopi disponibles
sin ejecutar JavaScript. Vercel sirve ese documento en las rutas con y sin barra final.
La descripción viene del mismo contenido tipado utilizado por React. El selector EN actualiza
metadatos, idioma y URL en el navegador.

Para regenerar la tarjeta comercial, levantar primero `npm run dev -- --host 127.0.0.1 --port 18111`,
y ejecutar `npm run capture:hopi`. El script captura la demo funcionando, rechaza cookies con
su control visible y compone logo/captura en HTML; exporta WebP 1600×900. No modifica otras tarjetas.

Los reportes Playwright se guardan en `app/playwright-report/` y `app/test-results/`, fuera de Git.
El lint dirigido de los archivos modificados se verifica por separado: el lint global del repositorio
presenta incidencias anteriores en componentes ajenos a este cambio.
