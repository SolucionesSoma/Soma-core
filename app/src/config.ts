// =============================================================================
// SOMA - Soluciones Digitales Configuration
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "SOMA Core | IA y Software a la Medida",
  description:
    "SOMA Core crea software a la medida e inteligencia artificial para optimizar procesos y acelerar resultados de negocio.",
  language: "es",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-image.svg",
  brandName: "SOMA-CORE",
  decodeText: "SOMA-CORE",
  decodeChars: "<>/{}[]01",
  subtitle: "Diseñamos tecnología que impulsa resultados reales para tu empresa.",
  ctaPrimary: "Empezar proyecto",
  ctaPrimaryTarget: "contacto",
  ctaSecondary: "Conócenos",
  ctaSecondaryTarget: "conocenos",
  navItems: [
    { label: "Servicios", sectionId: "servicios", icon: "disc" },
    { label: "Proceso", sectionId: "proceso", icon: "play" },
    { label: "Equipo", sectionId: "equipo", icon: "calendar" },
    { label: "Contacto", sectionId: "contacto", icon: "music" },
  ],
};

// -- Services Cube Section (adapted from AlbumCube) ---------------------------
export interface Service {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface AlbumCubeConfig {
  albums: Service[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "Software a la medida",
      subtitle: "Desarrollo",
      image: "/images/gallery2.jpg",
      description: "Creamos plataformas, paneles y herramientas digitales adaptadas a tu operación.",
    },
    {
      id: 2,
      title: "Soluciones con IA",
      subtitle: "Inteligencia Artificial",
      image: "/images/gallery3.jpg",
      description: "Aplicamos IA donde genera valor: clasificación, análisis, predicción y asistencia.",
    },
    {
      id: 3,
      title: "Optimización",
      subtitle: "Procesos",
      image: "/images/gallery4.jpg",
      description: "Analizamos cuellos de botella y rediseñamos procesos para reducir fricción.",
    },
    {
      id: 4,
      title: "Consultoría",
      subtitle: "Estrategia",
      image: "/images/gallery5.jpg",
      description: "Te acompañamos en la transformación digital de tu empresa.",
    },
  ],
  cubeTextures: [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
  ],
  scrollHint: "Descubre nuestros servicios",
};

// -- Parallax Gallery Section -------------------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
  href: string,
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
  description: string;
  url: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "Nuestro Trabajo",
  sectionTitle: "Tecnología que transforma",
  galleryLabel: "Logros",
  galleryTitle: "Logros y reconocimientos",
  marqueeTexts: [
    "SOFTWARE A LA MEDIDA",
    "INTELIGENCIA ARTIFICIAL",
    "OPTIMIZACIÓN DE PROCESOS",
    "TRANSFORMACIÓN DIGITAL",
    "INNOVACIÓN",
    "RESULTADOS REALES",
  ],
  endCtaText: "¿Listo para transformar tu empresa?",
  parallaxImagesTop: [
    { id: 1, src: "/images/portfolio/portfolio1.png", alt: "Abogado Hernan Morantes", href:"https://abogadohernanmorantes.com/" },
    { id: 2, src: "/images/portfolio/portfolio5.png", alt: "Arquitecto Jesus", href:"https://jesus-morantes.vercel.app/" },
    { id: 3, src: "/images/portfolio/portfolio3.png", alt: "Montt.ink tatto", href:"https://montt-ink.vercel.app/" },
    { id: 4, src: "/images/portfolio/portfolio4.png", alt: "Crediseguros", href:"https://crediseguros.vercel.app/" },
    
  ],
  parallaxImagesBottom: [
   { id: 8, src: "/images/portfolio/portfolio3.png", alt: "Montt.ink tatto", href:"https://montt-ink.vercel.app/" },
    { id: 9, src: "/images/portfolio/portfolio1.png", alt: "Abogado Hernan Morantes", href:"https://abogadohernanmorantes.com/" },
    { id: 10, src: "/images/portfolio/portfolio4.png", alt: "Crediseguros", href:"https://crediseguros.vercel.app/" },
   { id: 11, src: "/images/portfolio/portfolio2.png", alt: "Soft Asesorias", href:"https://soft-asesorias-mocha.vercel.app/" },
   { id: 12, src: "/images/portfolio/portfolio5.png", alt: "Arquitecto Jesus", href:"https://jesus-morantes.vercel.app/" },
  ],
  galleryImages: [
        {
      id: 1,
      src: "/images/news2.png",
      title: "Primer y tercer puesto - Hackathon Metropolitana",
      date: "2024",
      description:
        "Estudiantes de Ingeniería de Sistemas UIS ganadores del Hackathon Metropolitana organizada por el AMB.",
      url: "https://comunicaciones.uis.edu.co/estudiantes-de-ingenieria-de-sistemas-uis-ganadores-del-hackathon-metropolitana-organizada-por-el-amb/",
    },
    {
      id: 2,
      src: "/images/news1.png",
      title: "Publicación científica en IA",
      date: "2025",
      description:
        "Deep Learning on field photography reveals the morphometric diversity of Colombian Freshwater Fish.",
      url: "https://link.springer.com/article/10.1007/s00435-025-00747-x",
    },
    {
      id: 3,
      src: "/images/news4.png",
      title: "Segundo y tercer lugar - HackDay 2024 (Indra)",
      date: "2024",
      description:
        "Destacada participación de estudiantes UIS en competencia de tecnología HackDay 2024.",
      url: "https://comunicaciones.uis.edu.co/destacada-participacion-de-estudiantes-uis-en-competencia-de-tecnologia-hackday-2024/",
    },
  ],
};

// -- Process Section (adapted from TourSchedule) ------------------------------
export interface ProcessStep {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  image: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  tourDates: ProcessStep[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "Nuestro Proceso",
  sectionTitle: "De la idea a la solución",
  vinylImage: "/images/gallery3.jpg",
  buyButtonText: "Iniciar",
  detailsButtonText: "Ver detalles",
  bottomNote: "Cada proyecto es único y merece una solución a la medida.",
  bottomCtaText: "Hablemos de tu proyecto",
  tourDates: [
    {
      id: 1,
      date: "01. Diagnóstico",
      time: "Paso 1",
      city: "Entendimiento",
      venue: "Analizamos tu necesidad, metas y puntos críticos",
      image: "/images/gallery1.jpg",
    },
    {
      id: 2,
      date: "02. Diseño",
      time: "Paso 2",
      city: "Solución",
      venue: "Definimos la estructura técnica y funcional",
      image: "/images/gallery2.jpg",
    },
    {
      id: 3,
      date: "03. Implementación",
      time: "Paso 3",
      city: "Desarrollo",
      venue: "Construimos rápido con foco en utilidad real",
      image: "/images/gallery4.jpg",
    },
    {
      id: 4,
      date: "04. Escalamiento",
      time: "Paso 4",
      city: "Crecimiento",
      venue: "Medimos, iteramos y preparamos para crecer",
      image: "/images/gallery5.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface SocialLink {
  icon: "facebook" | "instagram" | "linkedin" | "tiktok" | "x" | "email";
  label: string;
  href: string;
}

export interface QuickLink {
  label: string;
  sectionId: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitImageLight: string;
  portraitImageDark: string;
  portraitAlt: string;
  artistName: string;
  artistSubtitle: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: QuickLink[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  copyrightText: string;
  socialLinks: SocialLink[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/images/founder-white.png",
  portraitImageLight: "/images/founder-white.png",
  portraitImageDark: "/images/founder-black.png",
  portraitAlt: "SOMA Team",
  artistName: "David Morantes",
  artistSubtitle: "CEO · CIO · COO",
  brandDescription:
    "Desarrollamos soluciones digitales con visión estratégica, diseño funcional y enfoque en resultados reales para empresas en evolución.",
  quickLinksTitle: "Enlaces",
  quickLinks: [
    { label: "Inicio", sectionId: "inicio" },
    { label: "Servicios", sectionId: "servicios" },
    { label: "Conócenos", sectionId: "conocenos" },
    { label: "Proceso", sectionId: "proceso" },
    { label: "Fundador", sectionId: "equipo" },
    { label: "Contacto", sectionId: "contacto" },
  ],
  contactTitle: "Contacto",
  emailLabel: "Email",
  email: "contacto@somaacoretech.com",
  phoneLabel: "Teléfono",
  phone: "+57 318 577 2152",
  addressLabel: "Ubicación",
  address: "Colombia",
  copyrightText: "© 2026 SOMA CORE. Todos los derechos reservados.",
  socialLinks: [
    { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/search/pages/?q=Soma%20core" },
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/somacoretech/" },
    { icon: "linkedin", label: "LinkedIn", href: "http://linkedin.com/company/soma-core" },
    { icon: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@somacoretech" },
    { icon: "x", label: "X", href: "https://x.com/SomaCoreTech" },
    { icon: "email", label: "Correo", href: "mailto:contacto@somaacoretech.com" },
  ],
};
