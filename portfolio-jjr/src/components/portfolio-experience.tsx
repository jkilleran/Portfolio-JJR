"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { id: "about", label: "Quiénes somos" },
  { id: "projects", label: "Proyectos" },
  { id: "support", label: "Soporte" },
  { id: "contact", label: "Contacto" },
] as const;

const sectionIds = ["home", ...navigation.map((item) => item.id)];

const projects = [
  {
    number: "01",
    title: "Plataforma de pagos",
    category: "Producto web",
    description: "Una experiencia clara para organizar pagos, proveedores y movimientos importantes.",
  },
  {
    number: "02",
    title: "Control de gastos",
    category: "Aplicación móvil",
    description: "Información financiera fácil de entender y disponible cuando realmente se necesita.",
  },
  {
    number: "03",
    title: "Movilidad urbana",
    category: "Producto digital",
    description: "Una solución pensada para conectar personas, rutas y decisiones en tiempo real.",
  },
  {
    number: "04",
    title: "Gestión operativa",
    category: "Sistema interno",
    description: "Procesos centralizados para que los equipos trabajen con menos fricción.",
  },
  {
    number: "05",
    title: "Auditoría digital",
    category: "Herramienta de datos",
    description: "Seguimiento visual y ordenado para convertir información compleja en acciones.",
  },
  {
    number: "06",
    title: "Tu próxima idea",
    category: "Construyamos juntos",
    description: "Un espacio para ese proyecto que todavía está en una libreta y necesita cobrar vida.",
  },
];

const revealContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.16,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 38, scale: 0.985, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" as const },
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

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 80;
  // For the about section we want the section's top to align
  // exactly below the header so it occupies the full viewport
  // (no other section visible). Use the element's offsetTop
  // to get a stable position and subtract the header height.
  let targetScroll = Math.max(
    0,
    element.getBoundingClientRect().top + window.pageYOffset - headerHeight,
  );

  if (id === "about") {
    targetScroll = Math.max(0, Math.round((element as HTMLElement).offsetTop - headerHeight));
  }

  window.scrollTo({ top: targetScroll, behavior: "smooth" });
}

function ProjectVisual({ index, large = false }: { index: number; large?: boolean }) {
  return (
    <div
      className={`visual-grid relative overflow-hidden rounded-[1.75rem] bg-[#111a16] text-white ${
        large ? "min-h-[300px] sm:min-h-[390px]" : "h-44"
      }`}
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#77a082]/25 blur-3xl" />
      <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#dca66b]/20 blur-3xl" />

      {index === 0 && (
        <div className="absolute inset-5 grid grid-cols-[0.55fr_1fr] gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="h-2 w-10 rounded-full bg-white/25" />
            <div className="mt-5 space-y-2">
              {["w-12", "w-16", "w-10"].map((width) => (
                <div key={width} className={`h-1.5 ${width} rounded-full bg-white/15`} />
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-[#d8f0de] p-3 text-[#111a16]">
              <p className="text-[9px] font-black uppercase tracking-[0.16em]">Resumen</p>
              <p className="mt-2 text-xl font-black">84%</p>
            </div>
            <div className="flex items-end gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3">
              {[35, 60, 45, 75, 55].map((height) => (
                <span key={height} style={{ height }} className="flex-1 rounded-full bg-[#91bd9b]" />
              ))}
            </div>
          </div>
        </div>
      )}

      {index === 1 && (
        <div className="absolute inset-5 grid place-items-center">
          <div className="h-[88%] w-[45%] rounded-[1.5rem] border-4 border-white/15 bg-[#eef2e9] p-3 text-[#111a16] shadow-2xl">
            <div className="mx-auto h-1.5 w-9 rounded-full bg-[#111a16]/15" />
            <div className="mt-5 h-14 rounded-2xl bg-[#d8f0de]" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="h-10 rounded-xl bg-white" />
              <div className="h-10 rounded-xl bg-[#dca66b]/40" />
            </div>
          </div>
        </div>
      )}

      {index === 2 && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-36 w-36 rounded-full border border-white/15">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-dashed border-[#91bd9b]/60"
            >
              <span className="absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-[#dca66b] shadow-[0_0_25px_rgba(220,166,107,0.7)]" />
            </motion.span>
            <span className="absolute inset-10 grid place-items-center rounded-full bg-[#d8f0de] text-xs font-black text-[#111a16]">JJR</span>
          </div>
        </div>
      )}

      {index === 3 && (
        <div className="absolute inset-5 flex items-end gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
          {[42, 75, 58, 92, 68].map((height, itemIndex) => (
            <motion.span
              key={height}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: itemIndex * 0.08, ease: "easeOut" }}
              className="flex-1 rounded-full bg-gradient-to-t from-[#77a082] to-[#d8f0de]"
            />
          ))}
        </div>
      )}

      {index === 4 && (
        <div className="absolute inset-0 grid place-items-center">
          {["h-36 w-36", "h-24 w-24", "h-12 w-12"].map((size, itemIndex) => (
            <motion.span
              key={size}
              animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 4 + itemIndex, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute ${size} rounded-full border border-[#91bd9b]`}
            />
          ))}
          <span className="relative z-10 h-5 w-5 rounded-full bg-[#dca66b] shadow-[0_0_30px_rgba(220,166,107,0.65)]" />
        </div>
      )}

      {index === 5 && (
        <div className="absolute inset-5 flex flex-col justify-center gap-3">
          <motion.div
            animate={{ x: [0, 7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mr-10 rounded-[1.4rem] rounded-bl-md bg-[#d8f0de] p-4 text-sm font-bold text-[#111a16]"
          >
            Cuéntanos tu idea.
          </motion.div>
          <motion.div
            animate={{ x: [0, -7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="ml-10 rounded-[1.4rem] rounded-br-md border border-white/15 bg-white/10 p-4 text-sm text-white/70"
          >
            Nosotros la convertimos en un plan.
          </motion.div>
        </div>
      )}

      <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/50 backdrop-blur">
        Proyecto {index + 1}
      </span>
    </div>
  );
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid h-10 w-10 place-items-center rounded-2xl text-xs font-black tracking-tight transition-colors ${
          inverse ? "bg-white text-[#111a16]" : "bg-[#111a16] text-white"
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
          ? "border-[#17201b]/10 bg-[#f4f0e8]/85 shadow-[0_18px_55px_rgba(17,26,22,0.08)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          href="#home"
          aria-label="JJR Studio, volver al inicio"
          className="rounded-2xl text-[#111a16] outline-none focus-visible:ring-2 focus-visible:ring-[#5c7c67] focus-visible:ring-offset-4"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark />
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.id);
              }}
              className={`group relative py-2 text-sm font-semibold transition-colors ${
                activeSection === item.id
                  ? "text-[#111a16]"
                  : "text-[#5e6962] hover:text-[#111a16]"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 rounded-full bg-[#5c7c67] transition-transform duration-300 ${
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
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contact");
            }}
            className="hidden items-center gap-2 rounded-full bg-[#111a16] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#111a16]/10 transition hover:-translate-y-0.5 hover:bg-[#26372e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c7c67] focus-visible:ring-offset-4 sm:inline-flex"
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
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[#17201b]/10 bg-white/70 text-[#111a16] outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-[#5c7c67] lg:hidden"
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
        className="overflow-hidden border-t border-[#17201b]/10 bg-[#f4f0e8]/95 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-[1440px] gap-1 px-5 py-5 sm:px-8">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                setMenuOpen(false);
                scrollToSection(item.id);
              }}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-[#26372e] transition hover:bg-white/80"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#77a082]"
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
      <div className="absolute -inset-8 rounded-full bg-[#a9c4ae]/30 blur-3xl" />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="visual-grid absolute inset-0 overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#111a16] p-5 text-white shadow-[0_40px_90px_rgba(17,26,22,0.28)] sm:p-7"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#77a082]/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#dca66b]/15 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e47765]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2bd6f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#77a082]" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
            Building ideas
          </span>
        </div>

        <div className="relative mt-8 grid gap-5 sm:grid-cols-[0.72fr_1.28fr]">
          <div className="hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:block">
            <div className="mb-8 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#d8f0de] text-[9px] font-black text-[#111a16]">
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

          <div className="rounded-[1.5rem] bg-[#eef2e9] p-5 text-[#111a16] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6f7c73]">
                  Proyecto activo
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  Una idea. Un producto real.
                </h2>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#111a16] text-white">
                ↗
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a867e]">
                  Progreso
                </p>
                <p className="mt-2 text-2xl font-black">84%</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e4e8e1]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0.84 }}
                    transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
                    className="h-full origin-left rounded-full bg-[#77a082]"
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-[#d8f0de] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5c6f61]">
                  Equipo
                </p>
                <div className="mt-4 flex -space-x-2">
                  {["J", "J", "R"].map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#d8f0de] bg-[#111a16] text-[10px] font-bold text-white"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-[#171f1b] p-4 text-white">
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
                      className="w-2 rounded-full bg-[#91bd9b]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 8, 0], y: [0, -4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
      initial={{ opacity: 0, x: 70, rotate: 3, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 70, damping: 18, mass: 0.9 }}
      className="relative mx-auto w-full max-w-[580px]"
    >
      <div className="absolute -inset-10 rounded-full bg-[#77a082]/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.25rem] bg-[#edf0e8] p-6 text-[#111a16] shadow-[0_35px_90px_rgba(0,0,0,0.24)] sm:p-9">
        <div className="flex items-center justify-between border-b border-[#111a16]/10 pb-6">
          <div className="flex -space-x-2">
            {["J", "J", "R"].map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                animate={reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                className={`grid h-12 w-12 place-items-center rounded-full border-4 border-[#edf0e8] text-xs font-black ${
                  index === 0
                    ? "bg-[#111a16] text-white"
                    : index === 1
                      ? "bg-[#dca66b] text-[#111a16]"
                      : "bg-[#9fc2a7] text-[#111a16]"
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a756d]">
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
              className="grid gap-3 rounded-2xl border border-[#111a16]/10 bg-white/55 p-4 transition hover:-translate-y-0.5 hover:bg-white sm:grid-cols-[44px_100px_1fr] sm:items-center"
            >
              <span className="text-xs font-black text-[#7b867e]">{number}</span>
              <span className="font-bold">{title}</span>
              <span className="text-sm leading-6 text-[#5f6b63]">{description}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#748078]">
          Johan · Jerlin · Robert
        </p>
      </div>
    </motion.div>
  );
}

export default function PortfolioExperience() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 850], [0, 95]);
  const scrollToProjectDetail = useRef(false);
  const activeProject = projects[selectedProject];

  const moveProject = (direction: number) => {
    setSelectedProject((current) => (current + direction + projects.length) % projects.length);
  };

  useEffect(() => {
    if (scrollToProjectDetail.current) {
      const supportElement = document.getElementById("support");
      if (supportElement) {
        const supportTop = supportElement.getBoundingClientRect().top + window.pageYOffset;
        const targetScroll = Math.max(0, supportTop - window.innerHeight + 1);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
      scrollToProjectDetail.current = false;
    }
  }, [selectedProject]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sectionAtReadingLine = entries.find((entry) => entry.isIntersecting);

        if (sectionAtReadingLine) {
          setActiveSection(sectionAtReadingLine.target.id);
        }
      },
      {
        rootMargin: "-42% 0px -52% 0px",
        threshold: 0,
      },
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
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-xl bg-[#111a16] px-4 py-2 text-sm font-bold text-white transition focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <SiteHeader activeSection={activeSection} scrolled={scrolled} />

      <main className="overflow-clip bg-[#f4f0e8] text-[#111a16]">
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
                <span className="h-2.5 w-2.5 rounded-full bg-[#6f9878] shadow-[0_0_0_7px_rgba(111,152,120,0.12)]" />
                <span className="text-xs font-black uppercase tracking-[0.24em] text-[#617067]">
                  Desarrollo de software · JJR
                </span>
              </motion.div>

              <motion.h1
                id="hero-title"
                variants={revealItem}
                className="text-[clamp(3.35rem,7.2vw,7.5rem)] font-black leading-[0.88] tracking-[-0.075em]"
              >
                Ideas que
                <span className="block font-serif font-normal italic text-[#5f8068]">
                  sí funcionan.
                </span>
              </motion.h1>

              <motion.p
                variants={revealItem}
                className="mt-7 max-w-xl text-lg leading-8 text-[#536159] sm:text-xl"
              >
                Diseñamos y desarrollamos productos digitales confiables, rápidos y accesibles para convertir una buena idea en una solución real.
              </motion.p>

              <motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("projects");
                  }}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#111a16] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#111a16]/15 transition hover:-translate-y-1 hover:bg-[#283b31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c7c67] focus-visible:ring-offset-4"
                >
                  Ver nuestros proyectos
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
                <a
                  href="#about"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("about");
                  }}
                  className="inline-flex items-center rounded-full border border-[#111a16]/15 bg-white/50 px-6 py-3.5 text-sm font-bold text-[#26372e] backdrop-blur transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c7c67] focus-visible:ring-offset-4"
                >
                  Conócenos
                </a>
              </motion.div>

              <motion.a
                variants={revealItem}
                href="#about"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("about");
                }}
                className="mt-12 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#6b786f] transition hover:text-[#111a16]"
              >
                <span className="grid h-9 w-6 place-items-start rounded-full border border-[#111a16]/20 p-1.5">
                  <motion.span
                    animate={reduceMotion ? undefined : { y: [0, 10, 0], opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 w-1.5 rounded-full bg-[#111a16]"
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
          className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-[#101713] px-5 py-28 text-white sm:px-8 lg:px-14"
        >
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#77a082]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#dca66b]/10 blur-3xl" />

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
                className="text-xs font-black uppercase tracking-[0.28em] text-[#91bd9b]"
              >
                Quiénes somos
              </motion.p>
              <motion.h2
                id="about-title"
                variants={revealItem}
                className="mt-6 text-[clamp(3.4rem,7vw,7.8rem)] font-black leading-[0.88] tracking-[-0.075em]"
              >
                Hola.
                <span className="block font-serif font-normal italic text-[#a9cdb1]">
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
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#dff0e1] px-6 py-3.5 text-sm font-black text-[#111a16] transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#101713]"
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
          className="relative min-h-[100svh] snap-start overflow-hidden bg-[#e9e5dc] px-5 py-28 sm:px-8 lg:px-14"
        >
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: [0, 35, 0], y: [0, -25, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#77a082]/15 blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-[1440px]">
            <motion.div
              initial={{ opacity: 0, y: 42, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="grid gap-7 lg:grid-cols-[1fr_0.55fr] lg:items-end"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#67806e]">
                  Proyectos
                </p>
                <h2
                  id="projects-title"
                  className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl"
                >
                  Explora una idea a la vez.
                </h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-[#5d6961] lg:justify-self-end">
                Selecciona una tarjeta para descubrir el concepto, su propósito y cómo podría convertirse en un producto real.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.button
                  key={project.title}
                  type="button"
                  aria-pressed={selectedProject === index}
                  onClick={() => {
                    scrollToProjectDetail.current = true;
                    setSelectedProject(index);
                  }}
                  initial={{ opacity: 0, y: 52, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={reduceMotion ? undefined : { y: -9, scale: 1.012 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.09,
                    ease: "easeOut",
                  }}
                  className="group relative rounded-[2.1rem] border border-[#111a16]/10 bg-white/45 p-3 text-left outline-none transition-shadow hover:shadow-[0_30px_70px_rgba(17,26,22,0.13)]"
                >
                  {selectedProject === index && (
                    <motion.span
                      layoutId="selected-project"
                      className="absolute inset-0 rounded-[2.1rem] border-2 border-transparent"
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    />
                  )}
                  <ProjectVisual index={index} />
                  <div className="px-3 pb-4 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#758078]">
                        {project.category}
                      </span>
                      <span className="text-xs font-black text-[#758078]">{project.number}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black tracking-[-0.035em]">
                      {project.title}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-16 border-t border-[#111a16]/10 pt-12">
              <AnimatePresence mode="wait">
                <motion.article
                  id="selected-project-detail"
                  key={activeProject.number}
                  initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="grid gap-7 rounded-[2.5rem] border border-[#111a16]/10 bg-white/60 p-4 shadow-[0_35px_90px_rgba(17,26,22,0.08)] sm:p-6 lg:grid-cols-[1.08fr_0.92fr]"
                >
                  <ProjectVisual index={selectedProject} large />
                  <div className="flex flex-col justify-between p-3 sm:p-6">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#67806e]">
                        {activeProject.category} · {activeProject.number}
                      </p>
                      <h3 className="mt-5 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
                        {activeProject.title}
                      </h3>
                      <p className="mt-6 text-lg leading-8 text-[#5d6961]">
                        {activeProject.description}
                      </p>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#111a16]/10 pt-6">
                      <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 text-sm font-black text-[#111a16]"
                      >
                        Hablemos de este concepto
                        <span className="transition-transform group-hover:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </a>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          aria-label="Proyecto anterior"
                          onClick={() => moveProject(-1)}
                          className="grid h-11 w-11 place-items-center rounded-full border border-[#111a16]/15 transition hover:-translate-x-1 hover:bg-[#111a16] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#77a082]"
                        >
                          <span className="rotate-180"><ArrowIcon /></span>
                        </button>
                        <button
                          type="button"
                          aria-label="Proyecto siguiente"
                          onClick={() => moveProject(1)}
                          className="grid h-11 w-11 place-items-center rounded-full bg-[#111a16] text-white transition hover:translate-x-1 hover:bg-[#283b31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#77a082]"
                        >
                          <ArrowIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section
          id="support"
          aria-labelledby="support-title"
          className="flex min-h-[80svh] snap-start items-center bg-[#cedccc] px-5 py-28 sm:px-8 lg:px-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto grid w-full max-w-[1440px] gap-10 rounded-[2.5rem] bg-[#111a16] p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#91bd9b]">Soporte</p>
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
          className="relative min-h-[100svh] snap-start overflow-hidden bg-[#f4f0e8] px-5 py-28 sm:px-8 lg:px-14"
        >
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 35, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#dca66b]/14 blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-[1440px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={revealContainer}
              className="grid gap-10 border-b border-[#111a16]/10 pb-16 lg:grid-cols-[0.85fr_1.15fr_0.8fr] lg:gap-16"
            >
              <motion.div variants={revealItem}>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#67806e]">
                  Contacto
                </p>
                <h2
                  id="contact-title"
                  className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl"
                >
                  Conectemos.
                </h2>

                <div className="mt-9 space-y-3">
                  {[
                    ["@", "Correo", "Canal por conectar"],
                    ["↗", "WhatsApp", "Canal por conectar"],
                    ["✦", "Formulario", "Disponible aquí"],
                  ].map(([icon, label, value]) => (
                    <div
                      key={label}
                      className="group flex items-center gap-4 rounded-2xl border border-[#111a16]/10 bg-white/45 p-3 transition hover:translate-x-1 hover:bg-white"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#111a16] text-sm font-black text-white transition group-hover:rotate-6 group-hover:bg-[#5c7c67]">
                        {icon}
                      </span>
                      <span>
                        <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#758078]">
                          {label}
                        </span>
                        <span className="mt-1 block text-sm font-semibold">{value}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={revealItem} className="lg:pt-16">
                <p className="max-w-xl text-2xl font-semibold leading-10 tracking-[-0.025em] text-[#3f4d45] sm:text-3xl sm:leading-[1.45]">
                  Para más información, cuéntanos qué quieres construir, qué problema deseas resolver y en qué punto está tu idea.
                </p>
                <p className="mt-6 max-w-lg leading-7 text-[#6b786f]">
                  No necesitas tener todo definido. Una conversación clara es suficiente para comenzar a darle forma.
                </p>
              </motion.div>

              <motion.a
                variants={revealItem}
                href="#project-form"
                whileHover={reduceMotion ? undefined : { y: -8, rotate: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                  default: { type: "spring", stiffness: 120, damping: 18 },
                }}
                className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[2.25rem] bg-[#111a16] p-7 text-white shadow-[0_30px_70px_rgba(17,26,22,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-[#77a082] focus-visible:ring-offset-4"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#77a082]/30 blur-3xl" />
                <span className="relative text-xs font-black uppercase tracking-[0.24em] text-white/45">
                  Nuevo proyecto
                </span>
                <span className="relative text-3xl font-black leading-tight tracking-[-0.045em]">
                  Dale vida a tu proyecto aquí.
                </span>
                <span className="relative grid h-12 w-12 place-items-center self-end rounded-full bg-[#d8f0de] text-[#111a16] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[-35deg]">
                  <ArrowIcon />
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              id="project-form"
              initial={{ opacity: 0, y: 50, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="mt-16 grid overflow-hidden rounded-[2.5rem] bg-[#111a16] text-white shadow-[0_35px_90px_rgba(17,26,22,0.18)] lg:grid-cols-[0.7fr_1.3fr]"
            >
              <div className="relative overflow-hidden border-b border-white/10 p-8 sm:p-12 lg:border-b-0 lg:border-r">
                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#77a082]/25 blur-3xl" />
                <p className="relative text-xs font-black uppercase tracking-[0.25em] text-[#91bd9b]">
                  Empecemos
                </p>
                <h3 className="relative mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
                  Tu idea puede comenzar con tres respuestas.
                </h3>
                <p className="relative mt-6 leading-7 text-white/50">
                  Esta primera versión prepara la experiencia. El envío real se conectará cuando definamos los canales oficiales de JJR.
                </p>
              </div>

              <form
                className="grid gap-5 p-8 sm:grid-cols-2 sm:p-12"
                onSubmit={(event) => {
                  event.preventDefault();
                  setFormStatus("El formulario está listo visualmente; falta conectar el canal de envío de JJR.");
                }}
              >
                <label className="grid gap-2 text-sm font-bold text-white/70">
                  Tu nombre
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="h-13 rounded-2xl border border-white/10 bg-white/5 px-4 text-base font-normal text-white outline-none transition focus:border-[#91bd9b] focus:bg-white/10"
                    placeholder="¿Cómo te llamas?"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-white/70">
                  Tu correo
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="h-13 rounded-2xl border border-white/10 bg-white/5 px-4 text-base font-normal text-white outline-none transition focus:border-[#91bd9b] focus:bg-white/10"
                    placeholder="nombre@correo.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-white/70 sm:col-span-2">
                  Cuéntanos sobre tu idea
                  <textarea
                    required
                    name="project"
                    rows={5}
                    className="resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-base font-normal leading-7 text-white outline-none transition focus:border-[#91bd9b] focus:bg-white/10"
                    placeholder="Qué quieres construir, para quién y qué problema resolvería..."
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                  <p aria-live="polite" className="max-w-md text-sm leading-6 text-white/45">
                    {formStatus || "Tus datos no se enviarán todavía."}
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#d8f0de] px-6 py-3.5 text-sm font-black text-[#111a16] transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#111a16]"
                  >
                    Preparar solicitud
                    <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
                  </button>
                </div>
              </form>
            </motion.div>

            <a
              href="#home"
              className="mx-auto mt-12 flex w-fit items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#6b786f] transition hover:text-[#111a16]"
            >
              Volver al inicio
              <span className="rotate-[-90deg]"><ArrowIcon /></span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
