"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const navigation = [
  { id: "about", label: "Quiénes somos" },
  { id: "projects", label: "Proyectos" },
  { id: "support", label: "Soporte" },
  { id: "contact", label: "Contacto" },
] as const;

const sectionIds = ["home", ...navigation.map((item) => item.id)];

const projectTypes = [
  {
    number: "01",
    title: "Productos web",
    description: "Experiencias rápidas, claras y preparadas para crecer.",
  },
  {
    number: "02",
    title: "Aplicaciones móviles",
    description: "Productos útiles que acompañan a tus clientes donde estén.",
  },
  {
    number: "03",
    title: "Sistemas internos",
    description: "Herramientas que ordenan procesos y simplifican el trabajo.",
  },
];

const revealContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.12,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid h-10 w-10 place-items-center rounded-2xl text-xs font-black tracking-tight transition-colors ${
          inverse ? "bg-white text-[#000000]" : "bg-[#000000] text-white"
        }`}
      >
        JJR
      </span>
      <span className="hidden text-sm font-bold uppercase tracking-[0.22em] sm:block">
        Studio
      </span>
    </span>
  );
}

function SiteHeader({
  activeSection,
  scrolled,
}: {
  activeSection: string;
  scrolled: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#14213D]/10 bg-[#FFFFFF]/85 shadow-[0_18px_55px_rgba(17,26,22,0.08)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          href="#home"
          aria-label="JJR Studio, volver al inicio"
          className="rounded-2xl text-[#000000] outline-none focus-visible:ring-2 focus-visible:ring-[#FCA311] focus-visible:ring-offset-4"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark />
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group relative py-2 text-sm font-semibold transition-colors ${
                activeSection === item.id
                  ? "text-[#000000]"
                  : "text-[#14213D] hover:text-[#000000]"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 rounded-full bg-[#FCA311] transition-transform duration-300 ${
                  activeSection === item.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-[#000000] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#000000]/10 transition hover:-translate-y-0.5 hover:bg-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA311] focus-visible:ring-offset-4 sm:inline-flex"
          >
            Hablemos
            <ArrowIcon />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[#14213D]/10 bg-white/70 text-[#000000] outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-[#FCA311] lg:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[13px] h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <motion.nav
        id="mobile-menu"
        aria-label="Navegación móvil"
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="overflow-hidden border-t border-[#14213D]/10 bg-[#FFFFFF]/95 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-[1440px] gap-1 px-5 py-5 sm:px-8">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-[#14213D] transition hover:bg-white/80"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#FCA311]"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  );
}

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      variants={revealItem}
      className="relative mx-auto min-h-[430px] w-full max-w-[650px] lg:min-h-[570px]"
    >
      <div className="absolute -inset-8 rounded-full bg-[#FCA311]/20 blur-3xl" />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="visual-grid absolute inset-0 overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#000000] p-5 text-white shadow-[0_40px_90px_rgba(17,26,22,0.28)] sm:p-7"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FCA311]/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#FCA311]/15 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCA311]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCA311]" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
            Building ideas
          </span>
        </div>

        <div className="relative mt-8 grid gap-5 sm:grid-cols-[0.72fr_1.28fr]">
          <div className="hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:block">
            <div className="mb-8 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#FFFFFF] text-[9px] font-black text-[#000000]">
                JJR
              </span>
              <span className="text-xs font-semibold text-white/70">Workspace</span>
            </div>
            <div className="space-y-3">
              {["Overview", "Projects", "Team", "Insights"].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl px-3 py-2.5 text-xs ${
                    index === 0 ? "bg-white/10 text-white" : "text-white/40"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-[#E5E5E5] p-5 text-[#000000] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14213D]">
                  Proyecto activo
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  Una idea. Un producto real.
                </h2>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#000000] text-white">
                ↗
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#14213D]">
                  Progreso
                </p>
                <p className="mt-2 text-2xl font-black">84%</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#FFFFFF]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0.84 }}
                    transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
                    className="h-full origin-left rounded-full bg-[#FCA311]"
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-[#FFFFFF] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#14213D]">
                  Equipo
                </p>
                <div className="mt-4 flex -space-x-2">
                  {["J", "J", "R"].map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#FFFFFF] bg-[#000000] text-[10px] font-bold text-white"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-[#14213D] p-4 text-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                    Rendimiento
                  </p>
                  <p className="mt-1 text-sm font-semibold">Diseñado para avanzar</p>
                </div>
                <div className="flex h-14 items-end gap-1.5" aria-hidden="true">
                  {[28, 42, 34, 52, 44, 62, 72].map((height, index) => (
                    <motion.span
                      key={height}
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{ delay: 0.7 + index * 0.07, duration: 0.45 }}
                      className="w-2 rounded-full bg-[#FCA311]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 8, 0], y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl sm:bottom-7 sm:left-7"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
            Nuestro enfoque
          </p>
          <p className="mt-1 text-xs font-semibold">Claro · Ágil · Humano</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function AboutVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 42, rotate: 1.5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[580px]"
    >
      <div className="absolute -inset-10 rounded-full bg-[#FCA311]/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.25rem] bg-[#E5E5E5] p-6 text-[#000000] shadow-[0_35px_90px_rgba(0,0,0,0.24)] sm:p-9">
        <div className="flex items-center justify-between border-b border-[#000000]/10 pb-6">
          <div className="flex -space-x-2">
            {["J", "J", "R"].map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                animate={reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                className={`grid h-12 w-12 place-items-center rounded-full border-4 border-[#E5E5E5] text-xs font-black ${
                  index === 0
                    ? "bg-[#000000] text-white"
                    : index === 1
                      ? "bg-[#FCA311] text-[#000000]"
                      : "bg-[#FCA311] text-[#000000]"
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#14213D]">
            Un solo equipo
          </span>
        </div>

        <blockquote className="py-8 text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">
          “La tecnología se siente mejor cuando realmente resuelve.”
        </blockquote>

        <div className="space-y-2.5">
          {[
            ["01", "Confiable", "Código y comunicación sin sorpresas."],
            ["02", "Rápido", "Decisiones ágiles con dirección clara."],
            ["03", "Accesible", "Soluciones que tienen sentido para tu negocio."],
          ].map(([number, title, description]) => (
            <div
              key={title}
              className="grid gap-3 rounded-2xl border border-[#000000]/10 bg-white/55 p-4 transition hover:-translate-y-0.5 hover:bg-white sm:grid-cols-[44px_100px_1fr] sm:items-center"
            >
              <span className="text-xs font-black text-[#14213D]">{number}</span>
              <span className="font-bold">{title}</span>
              <span className="text-sm leading-6 text-[#14213D]">{description}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#14213D]">
          Johan · Jerlin · Robert
        </p>
      </div>
    </motion.div>
  );
}

export default function PortfolioExperience() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 850], [0, 95]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.7] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#home"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-xl bg-[#000000] px-4 py-2 text-sm font-bold text-white transition focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <SiteHeader activeSection={activeSection} scrolled={scrolled} />

      <main className="overflow-clip bg-[#FFFFFF] text-[#000000]">
        <section
          id="home"
          aria-labelledby="hero-title"
          className="relative flex min-h-[100svh] snap-start items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-14 lg:pt-24"
        >
          <div className="hero-orb hero-orb-left" aria-hidden="true" />
          <div className="hero-orb hero-orb-right" aria-hidden="true" />

          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-20">
            <motion.div
              variants={revealContainer}
              initial="hidden"
              animate="show"
              className="relative z-10 max-w-2xl"
            >
              <motion.div variants={revealItem} className="mb-7 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FCA311] shadow-[0_0_0_7px_rgba(252,163,17,0.12)]" />
                <span className="text-xs font-black uppercase tracking-[0.24em] text-[#14213D]">
                  Desarrollo de software · JJR
                </span>
              </motion.div>

              <motion.h1
                id="hero-title"
                variants={revealItem}
                className="text-[clamp(3.35rem,7.2vw,7.5rem)] font-black leading-[0.88] tracking-[-0.075em]"
              >
                Ideas que
                <span className="block font-serif font-normal italic text-[#FCA311]">
                  sí funcionan.
                </span>
              </motion.h1>

              <motion.p
                variants={revealItem}
                className="mt-7 max-w-xl text-lg leading-8 text-[#14213D] sm:text-xl"
              >
                Diseñamos y desarrollamos productos digitales confiables, rápidos y accesibles para convertir una buena idea en una solución real.
              </motion.p>

              <motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#000000] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#000000]/15 transition hover:-translate-y-1 hover:bg-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA311] focus-visible:ring-offset-4"
                >
                  Ver nuestros proyectos
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center rounded-full border border-[#000000]/15 bg-white/50 px-6 py-3.5 text-sm font-bold text-[#14213D] backdrop-blur transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA311] focus-visible:ring-offset-4"
                >
                  Conócenos
                </a>
              </motion.div>

              <motion.a
                variants={revealItem}
                href="#about"
                className="mt-12 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#14213D] transition hover:text-[#000000]"
              >
                <span className="grid h-9 w-6 place-items-start rounded-full border border-[#000000]/20 p-1.5">
                  <motion.span
                    animate={reduceMotion ? undefined : { y: [0, 10, 0], opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 w-1.5 rounded-full bg-[#000000]"
                  />
                </span>
                Descubre más
              </motion.a>
            </motion.div>

            <motion.div style={reduceMotion ? undefined : { y: heroY }}>
              <HeroVisual reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-title"
          className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-[#14213D] px-5 py-28 text-white sm:px-8 lg:px-14"
        >
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#FCA311]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#FCA311]/10 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={revealContainer}
              className="max-w-2xl"
            >
              <motion.p
                variants={revealItem}
                className="text-xs font-black uppercase tracking-[0.28em] text-[#FCA311]"
              >
                Quiénes somos
              </motion.p>
              <motion.h2
                id="about-title"
                variants={revealItem}
                className="mt-6 text-[clamp(3.4rem,7vw,7.8rem)] font-black leading-[0.88] tracking-[-0.075em]"
              >
                Hola.
                <span className="block font-serif font-normal italic text-[#FCA311]">
                  Somos JJR.
                </span>
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-8 max-w-xl text-lg leading-8 text-white/65 sm:text-xl"
              >
                Somos tres desarrolladores que combinan ideas, diseño y tecnología para crear soluciones simples de usar y sólidas por dentro.
              </motion.p>
              <motion.p
                variants={revealItem}
                className="mt-4 max-w-xl leading-7 text-white/45"
              >
                Trabajamos cerca de cada cliente, explicamos el proceso con claridad y construimos pensando en lo que viene después.
              </motion.p>
              <motion.a
                variants={revealItem}
                href="#projects"
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#FFFFFF] px-6 py-3.5 text-sm font-black text-[#000000] transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#14213D]"
              >
                Visita nuestros proyectos
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </motion.a>
            </motion.div>

            <AboutVisual reduceMotion={reduceMotion} />
          </div>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-title"
          className="flex min-h-[100svh] snap-start items-center bg-[#E5E5E5] px-5 py-28 sm:px-8 lg:px-14"
        >
          <div className="mx-auto w-full max-w-[1440px]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#14213D]">
                Próxima pantalla
              </p>
              <h2
                id="projects-title"
                className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl"
              >
                Proyectos que cuentan una historia.
              </h2>
            </motion.div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {projectTypes.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="group min-h-64 rounded-[2rem] border border-[#000000]/10 bg-white/55 p-7 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_30px_70px_rgba(17,26,22,0.1)]"
                >
                  <span className="text-xs font-black tracking-[0.2em] text-[#14213D]">
                    {project.number}
                  </span>
                  <h3 className="mt-16 text-2xl font-black tracking-[-0.035em]">
                    {project.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#14213D]">{project.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="support"
          aria-labelledby="support-title"
          className="flex min-h-[80svh] snap-start items-center bg-[#FCA311] px-5 py-28 sm:px-8 lg:px-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto grid w-full max-w-[1440px] gap-10 rounded-[2.5rem] bg-[#000000] p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FCA311]">Soporte</p>
              <h2
                id="support-title"
                className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl"
              >
                Seguimos ahí después de entregar.
              </h2>
            </div>
            <p className="self-end text-lg leading-8 text-white/60">
              Un buen producto continúa evolucionando. Por eso pensamos el mantenimiento, las mejoras y el acompañamiento como parte del trabajo.
            </p>
          </motion.div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="flex min-h-[75svh] snap-start items-center bg-[#FFFFFF] px-5 py-28 sm:px-8 lg:px-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto w-full max-w-[1100px] text-center"
          >
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#14213D]">Contacto</p>
            <h2
              id="contact-title"
              className="mx-auto mt-6 max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.065em] sm:text-8xl"
            >
              Hagamos algo que funcione.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#14213D]">
              Esta sección quedará preparada para conectar el correo, WhatsApp o el formulario definitivo del equipo.
            </p>
            <a
              href="#home"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#000000] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA311] focus-visible:ring-offset-4"
            >
              Volver al inicio
              <span className="rotate-[-90deg]">
                <ArrowIcon />
              </span>
            </a>
          </motion.div>
        </section>
      </main>
    </>
  );
}
