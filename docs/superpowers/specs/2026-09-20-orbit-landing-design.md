# Orbit Landing + Demo Design

## Objetivo

Crear `somacoretech.com/productos/orbit` como landing bilingüe de Orbit, integrada al sitio SOMA, con una demo frontend interactiva dentro de la misma página. Debe presentar funciones reales del aplicativo auditado sin exponer datos, infraestructura ni marca de Más x Menos.

## Posicionamiento

**Promesa principal:** La operación completa, bajo control.

Orbit conecta incidencias, PQRSF, activos, mantenimientos, SLA, automatización e inteligencia operativa en una plataforma empresarial.

**Audiencia:** líderes de TI, operaciones, servicio, mantenimiento y experiencia del cliente en organizaciones con varias áreas o sedes.

**Conversión:**

1. Solicitar demostración por WhatsApp.
2. Contactar por `contacto@somacoretech.com`.
3. Explorar la demo frontend integrada.

## Identidad Orbit

- Marca propia: `Orbit`.
- Firma: `Una solución de SOMA` / `A SOMA solution`.
- Símbolo: zorro de papel geométrico, perteneciente a la familia visual del ave de SOMA sin repetir su silueta.
- Paleta: azules SOMA; cian claro como acento distintivo. Sin naranja, rojo de Más x Menos, morado ni gradientes de texto.
- Personalidad: vigilante, precisa, inteligente, empresarial.
- El símbolo final debe construirse como activo limpio y escalable; la exploración generada es referencia de dirección, no arte final automático.

## Arquitectura de la página

La ruta vive dentro de la aplicación actual y reutiliza navegación, footer, preferencias, tipografía, tokens, modo claro/oscuro y selector ES/EN.

1. **Hero:** marca Orbit, promesa, resumen, CTA WhatsApp, CTA correo y vista de producto fiel.
2. **Confianza operativa:** incidencias, PQRSF, activos y mantenimientos como sistema conectado.
3. **Módulos:** servicio, PQRSF, activos, mantenimientos, analítica, configuración e IA.
4. **Flujo:** creación, clasificación, asignación, SLA, colaboración, solución y trazabilidad.
5. **Demo integrada:** interfaz interactiva en la misma página.
6. **Gobierno:** permisos por área, perfiles, estados configurables, evidencias y auditoría.
7. **Integraciones:** WhatsApp, correo, servicios embebidos y APIs; solo se afirmarán integraciones verificadas en el código.
8. **Preguntas frecuentes:** implantación, personalización, datos, permisos, soporte y demo.
9. **Conversión final:** WhatsApp y correo.

## Contenido funcional verificable

- Incidencias con estados, prioridad, SLA, asignación, adjuntos, comentarios y trazabilidad.
- PQRSF con flujo y permisos por área.
- Clasificación mediante IA y alternativa manual.
- Escalamiento colaborativo o transferencia del caso.
- Respuestas internas y públicas.
- Creación y consulta pública de tickets.
- Gestión de activos, inventario, insumos, proveedores, facturas, traslados y actas de entrega.
- Mantenimientos programados con calendario, checklist, equipos intervenidos, evidencias y firmas.
- Dashboard de servicio, activos y mantenimientos.
- Usuarios, roles, permisos, áreas y catálogos configurables.
- Notificaciones y actualizaciones en tiempo real.
- Integración de tickets con WhatsApp.

No se publicarán nombres, dominios, correos, textos contractuales, servicios internos ni reglas exclusivas de Más x Menos.

## Demo frontend integrada

### Alcance

La demo es un componente aislado, sin autenticación ni llamadas al backend. Usa datos ficticios locales y se carga de forma diferida al aproximarse al viewport.

### Navegación

- Dashboard.
- Incidencias.
- PQRSF.
- Mantenimientos.
- Activos.

### Interacciones

- Cambiar módulo desde sidebar.
- Aplicar filtros predefinidos.
- Abrir ticket y consultar timeline, SLA, asignación, adjuntos y respuesta.
- Simular creación de incidencia sin persistencia.
- Abrir mantenimiento desde calendario y revisar checklist/firmas.
- Abrir activo y revisar ubicación, factura, traslados y mantenimiento.
- Cambiar tema usando la preferencia global.
- Reiniciar demo al estado original.

### Límites

- Todos los datos llevan nombres ficticios.
- Las acciones se reinician al recargar.
- No contiene formularios que aparenten guardar datos reales.
- Aviso persistente: `Entorno demostrativo · Datos ficticios`.
- En móvil usa una composición propia compacta; no reduce una pantalla de escritorio hasta volverla ilegible.

## Imágenes de producto

- No se usarán fotografías genéricas como representación principal del software.
- El hero y las secciones funcionales usarán composiciones de UI basadas en las vistas reales auditadas.
- Deben reemplazar logo, rojo corporativo, correos, nombres de sedes y datos de Más x Menos.
- Se producirán capturas limpias desde la demo Orbit para asegurar fidelidad entre marketing y producto.

## Internacionalización

- Contenido completo en español e inglés.
- El selector global conserva la sección y ruta actual.
- Textos, atributos accesibles, metadatos y datos de la demo se traducen.
- Orbit no anunciará francés aunque el aplicativo auditado contenga traducciones parciales.

## SEO

- Canonical: `https://somacoretech.com/productos/orbit`.
- Alternativa inglesa por `?lang=en`.
- Metadatos únicos, Open Graph y JSON-LD `SoftwareApplication`.
- Sitemap actualizado.
- Enlaces internos desde la tarjeta Orbit y navegación contextual hacia la suite.
- El contenido principal debe existir como HTML indexable; la demo no contiene la propuesta de valor esencial.

## Accesibilidad y rendimiento

- Contraste WCAG AA, foco visible, navegación por teclado y nombres accesibles.
- Demo usable sin hover y con objetivos táctiles mínimos de 44 px.
- Respeto a `prefers-reduced-motion`.
- Sin autoplay, carruseles automáticos ni animaciones de entrada repetidas.
- Carga diferida de demo y activos pesados.
- Imágenes WebP/AVIF responsivas sin pérdida visual perceptible.
- La landing no debe degradar las métricas existentes del sitio.

## Componentes y datos

- `OrbitPage`: composición comercial.
- `OrbitDemo`: shell aislado y lazy.
- `OrbitDemoSidebar`: navegación entre módulos.
- `OrbitDashboard`, `OrbitTickets`, `OrbitMaintenance`, `OrbitAssets`: vistas.
- `OrbitTicketDetail`, `OrbitMaintenanceDetail`, `OrbitAssetDetail`: paneles de detalle.
- `orbitDemoData`: dataset ficticio inmutable.
- `orbitContent`: textos ES/EN.
- Los componentes compartidos de header/footer/preferencias se reutilizan; no se duplica el sistema legal estático.

## Estados y errores

- La demo ofrece estados con contenido, vacío, filtro sin resultados y reinicio.
- Un error de carga muestra una alternativa estática fiel y CTA de contacto.
- La página funciona aunque JavaScript de la demo tarde en cargar.

## Validación

- Pruebas de ruta y enlaces desde la home.
- Pruebas de cambio ES/EN y claro/oscuro.
- Pruebas de navegación, filtros, detalles y reinicio de la demo.
- Comprobación de ausencia de referencias Más x Menos/MXM.
- Build, validación del sitio, revisión responsive y teclado.
- Verificación pública tras publicar.

## Criterios de aceptación

1. Orbit dispone de marca propia con zorro de papel y firma SOMA.
2. La landing vive en `/productos/orbit` y mantiene el sistema visual del sitio.
3. La demo está integrada, es interactiva y no usa backend.
4. Los cinco módulos definidos son navegables en escritorio y móvil.
5. Todo el contenido está disponible en ES/EN y claro/oscuro.
6. Ningún texto o activo expone Más x Menos ni información real.
7. Las afirmaciones comerciales corresponden a funciones auditadas.
8. WhatsApp y correo funcionan como conversiones principales.
9. SEO, accesibilidad, rendimiento y pruebas pasan antes de publicar.
