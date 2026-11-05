# Implementación de Estándares ARIA en una Aplicación Web

El equipo de desarrollo frontend necesita mejorar la accesibilidad de una aplicación bancaria en línea. El objetivo es aplicar conscientemente los conceptos de los estándares ARIA para hacer la aplicación más accesible para usuarios con discapacidades. Los actores involucrados son los usuarios de la aplicación, el equipo de desarrollo frontend y el equipo de QA que validará la accesibilidad. La operación principal es la navegación y uso de la aplicación por parte de los usuarios, con un modo de falla específico siendo la incapacidad de un usuario con discapacidad para acceder a ciertas funcionalidades debido a la falta de atributos ARIA adecuados.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Estándares Aria (Accessible Rich Internet Applications) |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Identificación de Elementos Clave

**Objetivo:** Identificar los elementos de la interfaz de usuario que requieren mejoras de accesibilidad.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza la aplicación existente y enumera los componentes de la interfaz de usuario que pueden presentar problemas de accesibilidad para usuarios con discapacidades.
- Criterios de aceptación: Lista de elementos con descripción clara de los problemas potenciales de accesibilidad.

**Entregable:** Lista de elementos de la interfaz de usuario que requieren mejoras de accesibilidad.

<details>
<summary>Pistas de conocimiento</summary>

- Considera componentes como botones, formularios, enlaces y elementos de navegación.

</details>

### Fase 2: Aplicación de Atributos ARIA

**Objetivo:** Aplicar atributos ARIA a los elementos identificados para mejorar la accesibilidad.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Aplica los atributos ARIA adecuados a los elementos de la interfaz de usuario identificados en la fase anterior.
- Criterios de aceptación: Atributos ARIA aplicados correctamente a los elementos de la interfaz de usuario, validados por pruebas de accesibilidad.

**Entregable:** Aplicación con atributos ARIA aplicados a los elementos de la interfaz de usuario.

<details>
<summary>Pistas de conocimiento</summary>

- Investiga los atributos ARIA más comunes y su uso adecuado en diferentes tipos de elementos.

</details>

### Fase 3: Validación y Retroalimentación

**Objetivo:** Validar las mejoras de accesibilidad y recibir retroalimentación.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Realiza pruebas de accesibilidad en la aplicación modificada y documenta los resultados.
- Criterios de aceptación: Documento con resultados de las pruebas de accesibilidad y recomendaciones para futuras mejoras.

**Entregable:** Documento con resultados de las pruebas de accesibilidad y recomendaciones.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de accesibilidad para validar la implementación de los atributos ARIA.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los estándares ARIA y por qué son importantes para la accesibilidad web?
- **paraQueSirve**: ¿Cómo se aplican los atributos ARIA para mejorar la accesibilidad de los elementos de la interfaz de usuario?
- **comoSeUsa**: ¿Cuáles son los errores comunes al aplicar atributos ARIA y cómo se pueden evitar?
- **erroresComunes**: ¿Qué decisiones implica la aplicación de atributos ARIA en términos de accesibilidad y usabilidad?

## Criterios de Evaluacion

- Identificación correcta de elementos de la interfaz de usuario que requieren mejoras de accesibilidad.
- Aplicación adecuada de atributos ARIA a los elementos identificados.
- Validación efectiva de las mejoras de accesibilidad mediante pruebas y herramientas de accesibilidad.
- Documentación clara de los resultados de las pruebas y recomendaciones para futuras mejoras.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
