"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Inicio", description: "Bienvenido a la página principal del portafolio." },
  { id: "about", label: "Quienes somos", description: "Conoce el equipo, la propuesta de valor y la filosofía de trabajo." },
  { id: "projects", label: "Proyectos", description: "Explora ejemplos de trabajos recientes con diseño limpio y funcional." },
  { id: "support", label: "Soporte", description: "Contacta al equipo de soporte y resuelve dudas rápidamente." },
  { id: "contact", label: "Contacto", description: "Encuentra las formas de contacto para iniciar un proyecto o una consulta." },
];

const menuItems = sections.slice(1);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "home";
      const middle = window.innerHeight / 2;
      sections.forEach((section) => {
        const node = document.getElementById(section.id);
        if (node) {
          const rect = node.getBoundingClientRect();
          // Marca la sección como activa si cubre el punto medio del viewport
          if (rect.top <= middle && rect.bottom >= middle) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-zinc-900">
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${scrolled ? "border-zinc-200/80 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl py-3" : "border-zinc-200/70 bg-white/85 backdrop-blur-xl py-4"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 sm:px-10 lg:px-16">
          <a href="#home" className="flex items-center gap-3 text-zinc-900 transition hover:text-zinc-800">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10">
              X
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.25em] sm:inline-block">
              Logo ejemplo
            </span>
          </a>

          <div className="flex items-center gap-5">
            <nav className="hidden items-center gap-6 md:flex">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative text-sm transition-colors duration-200 ${activeSection === item.id ? "font-semibold text-zinc-900" : "font-medium text-zinc-600 hover:text-zinc-900"}`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-0 top-full mt-2 h-[2px] w-full rounded-full transition-all duration-300 ${
                      activeSection === item.id ? "bg-zinc-900" : "bg-transparent group-hover:bg-zinc-900"
                    }`}
                  />
                </a>
              ))}
            </nav>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="ml-8 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-zinc-900 shadow-sm transition duration-300 hover:bg-zinc-50"
              aria-label="Ver perfil"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path d="M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                <path d="M4.5 20.5c0-3.5 2.8-6.5 6.5-6.5s6.5 3 6.5 6.5" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 min-h-screen px-6 py-10 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              className="rounded-[1.8rem] border border-zinc-300/70 bg-white/85 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur sm:p-10 lg:p-12"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">{section.label}</p>
              <h1 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl text-zinc-900">{section.label}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700">{section.description}</p>
            </motion.div>
          </div>
        </section>
      ))}
    </main>
  );
}
