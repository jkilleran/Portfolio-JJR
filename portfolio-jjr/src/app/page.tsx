"use client";

import { motion } from "framer-motion";

const sections = [
  {
    id: "home",
    title: "Inicio",
    description: "Espacio para el mensaje principal, el nombre o el logo y la introducción del portafolio.",
  },
  {
    id: "about",
    title: "Sobre nosotros",
    description: "Espacio para la información personal, la propuesta o el equipo.",
  },
  {
    id: "projects",
    title: "Proyectos",
    description: "Espacio para mostrar trabajos destacados, cards o bloques visuales.",
  },
  {
    id: "skills",
    title: "Habilidades",
    description: "Espacio para herramientas, tecnologías, servicios o experiencia.",
  },
  {
    id: "contact",
    title: "Contacto",
    description: "Espacio para correo, redes sociales o un formulario simple.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] text-zinc-900">
      <section id="home" className="flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid w-full gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-zinc-300/70 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur sm:p-10 lg:p-14">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Portafolio</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Estructura lista para trabajar el diseño.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              Este archivo ya organiza el contenido en secciones claras para que el estilo visual quede separado del esquema base.
            </p>
          </div>

          <div className="rounded-[2rem] border border-zinc-300/70 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur sm:p-10 lg:p-14">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Zona de trabajo</p>
            <div className="mt-6 space-y-3">
              <div className="h-2 w-24 rounded-full bg-zinc-900" />
              <div className="h-2 w-32 rounded-full bg-zinc-300" />
              <div className="h-2 w-20 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>
      </section>

      {sections.slice(1).map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
          className="flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-16"
        >
          <div className="grid w-full gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-zinc-300/70 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur sm:p-10 lg:p-14">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Sección</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{section.title}</h2>
            </div>

            <div className="rounded-[2rem] border border-zinc-300/70 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur sm:p-10 lg:p-14">
              <p className="text-lg leading-8 text-zinc-700">{section.description}</p>
            </div>
          </div>
        </motion.section>
      ))}
    </main>
  );
}
