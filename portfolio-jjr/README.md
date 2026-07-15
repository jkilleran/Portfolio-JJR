# Portfolio JJR

Este proyecto es un portafolio web moderno desarrollado con Next.js, TypeScript y Tailwind CSS. La idea principal es tener una experiencia de scroll progresivo con secciones claras para trabajar el diseño y el contenido.

## Tecnologías utilizadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- ESLint

## Estructura del proyecto

```bash
src/
  app/
    layout.tsx
    page.tsx
    globals.css
```

- `src/app/page.tsx`: contiene la estructura principal de la landing.
- `src/app/layout.tsx`: define el layout global de la aplicación.
- `src/app/globals.css`: estilos globales y configuración base.

## Requisitos

- Node.js 18 o superior
- npm

## Cómo empezar

1. Clona el repositorio.
2. Entra a la carpeta del proyecto:

```bash
cd portfolio-jjr
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre la aplicación en tu navegador en:

```text
http://localhost:3000
```

## Comandos útiles

```bash
npm run dev
npm run build
npm run lint
```

## Recomendaciones para trabajar en equipo

- Mantén el contenido y el diseño separados en la medida de lo posible.
- Usa secciones claras para cada bloque del portafolio: Inicio, Sobre nosotros, Proyectos, Habilidades y Contacto.
- Si agregas nuevas secciones o componentes, intenta mantener la estructura organizada y fácil de entender.
- Antes de subir cambios, verifica que el proyecto siga compilando con:

```bash
npm run build
```

## Nota

Este proyecto está pensado para que sea fácil adaptar el diseño visual sin perder la estructura base del sitio.
