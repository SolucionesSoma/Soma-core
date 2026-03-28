import { useRef, useEffect, useState, type ComponentType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Facebook,
  Instagram,
  Linkedin,
  X,
  Music2,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  User,
  Building,
  Briefcase,
} from 'lucide-react';
import { footerConfig, type SocialLink } from '../config';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICON_MAP: Record<SocialLink['icon'], ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: Music2,
  x: X,
  email: Mail,
};

const WHATSAPP_NUMBER = '573185772152';

interface FooterProps {
  theme: 'light' | 'dark';
}

const Footer = ({ theme }: FooterProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: '',
  });
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !founderRef.current) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: founderRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
        once: true,
        onEnter: () => {
          gsap.fromTo(
            founderRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          );
        },
      });
      scrollTriggerRefs.current.push(st);
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRefs.current.forEach((st) => st.kill());
      scrollTriggerRefs.current = [];
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      'Hola, quiero más información sobre sus servicios.',
      '',
      '*Datos del contacto:*',
      `• Nombre: ${formData.nombre || '-'}`,
      `• Email: ${formData.email || '-'}`,
      `• Empresa: ${formData.empresa || '-'}`,
      '',
      '*Mensaje:*',
      `${formData.mensaje || '-'}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contacto" ref={sectionRef} className="relative w-full overflow-hidden bg-[var(--bg)]">
      <div id="equipo" className="relative px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              Nuestro fundador
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--fg)] sm:text-4xl">
              Visión joven y enfoque estratégico
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <article
              className="order-2 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--bg-card)] lg:order-1"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <div className="aspect-[5/5] overflow-hidden">
                <img
                  src={theme === 'dark' ? footerConfig.portraitImageDark || footerConfig.portraitImage : footerConfig.portraitImageLight || footerConfig.portraitImage}
                  alt={footerConfig.portraitAlt || footerConfig.artistName}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </article>

            <div ref={founderRef} className="order-1 lg:order-2">
              <article
                className="rounded-[2rem] border border-[var(--line)] bg-[var(--bg-card)] p-8 sm:p-10"
                style={{ boxShadow: 'var(--shadow)' }}
              >
                <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-200">
                  Fundador · Dirección estratégica
                </div>

                <h3 className="mt-5 text-2xl font-black text-[var(--fg)] sm:text-3xl">{footerConfig.artistName}</h3>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  {footerConfig.artistSubtitle}
                </p>

                <div className="mt-6 space-y-4 text-sm leading-8 text-[var(--muted)] sm:text-base">
                  <p>
                    Como egresado de la UIS, ha construido una trayectoria marcada por la innovación,
                    el desarrollo de productos digitales y la exploración de tecnologías aplicadas.
                  </p>

                  <p>
                    Su recorrido integra experiencia en investigación y publicación científica, lo que
                    aporta una base analítica y rigurosa a la forma en que diseña soluciones y convierte
                    ideas en herramientas.
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--line)] pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                    Perfil verificable
                  </p>
                  <ul className="space-y-3">
                    {footerConfig.founderLinks.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-cyan-700 dark:hover:text-cyan-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--line)] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2">
                <MessageCircle className="h-4 w-4 text-neon-cyan" />
                <span className="text-xs font-mono-custom uppercase tracking-wider text-neon-cyan">Contacto</span>
              </div>

              <h2 className="mb-6 font-display text-4xl text-[var(--fg)] md:text-5xl">
                Hablemos de tu
                <br />
                próximo proyecto
              </h2>

              <p className="mb-10 max-w-md leading-relaxed text-[var(--muted)]">
                Completa el formulario y al dar clic en enviar se abrirá WhatsApp
                con tu mensaje ya listo para ser enviado.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-[var(--line)] bg-[var(--bg-card)] p-4 transition-colors hover:border-neon-cyan/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10">
                    <Phone className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--muted)]">Teléfono</p>
                    <p className="font-medium text-[var(--fg)]">{footerConfig.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-[var(--line)] bg-[var(--bg-card)] p-4 transition-colors hover:border-neon-cyan/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10">
                    <Mail className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--muted)]">Email</p>
                    <a
                      href={`mailto:${footerConfig.email}`}
                      className="font-medium text-[var(--fg)] transition-colors hover:text-neon-cyan"
                    >
                      {footerConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-[var(--line)] bg-[var(--bg-card)] p-4 transition-colors hover:border-neon-cyan/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10">
                    <MapPin className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--muted)]">Ubicación</p>
                    <p className="font-medium text-[var(--fg)]">{footerConfig.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--line)] bg-[var(--bg-card)] p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'nombre', label: 'Nombre', type: 'text', icon: User, placeholder: 'Tu nombre' },
                  { name: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'tu@email.com' },
                  { name: 'empresa', label: 'Empresa', type: 'text', icon: Building, placeholder: 'Nombre de tu empresa' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-sm text-[var(--muted)]">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] py-4 pl-12 pr-4 text-[var(--fg)] placeholder:text-[var(--muted)] transition-colors focus:border-neon-cyan/50 focus:outline-none"
                        required={field.name !== 'empresa'}
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-sm text-[var(--muted)]">Mensaje</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-4 h-5 w-5 text-[var(--muted)]" />
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos sobre tu proyecto..."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--bg)] py-4 pl-12 pr-4 text-[var(--fg)] placeholder:text-[var(--muted)] transition-colors focus:border-neon-cyan/50 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-neon-cyan px-8 py-4 font-display text-sm uppercase tracking-wider text-void-black transition-colors hover:bg-white"
                >
                  Enviar por WhatsApp
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs text-[var(--muted)]">Se abrirá WhatsApp con tu información ya escrita</p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--line)] bg-[var(--bg)] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <img src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="SOMA Core" className="h-10 w-auto" />
              <p className="mb-6 mt-4 text-sm leading-relaxed text-[var(--muted)]">{footerConfig.brandDescription}</p>
              <div className="flex flex-wrap gap-3">
                {footerConfig.socialLinks.map((social) => {
                  const IconComponent = SOCIAL_ICON_MAP[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--muted)] transition-all hover:border-neon-cyan/50 hover:text-neon-cyan"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="mb-6 font-display text-sm uppercase tracking-wider text-[var(--fg)]">{footerConfig.quickLinksTitle}</h4>
              <ul className="space-y-3">
                {footerConfig.quickLinks.map((link) => (
                  <li key={link.sectionId}>
                    <button
                      onClick={() => scrollToSection(link.sectionId)}
                      className="text-sm text-[var(--muted)] transition-colors hover:text-neon-cyan"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-display text-sm uppercase tracking-wider text-[var(--fg)]">{footerConfig.contactTitle}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-neon-cyan/60" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">{footerConfig.emailLabel}</p>
                    <a href={`mailto:${footerConfig.email}`} className="text-sm text-[var(--fg)] transition-colors hover:text-neon-cyan">
                      {footerConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-neon-cyan/60" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">{footerConfig.phoneLabel}</p>
                    <span className="text-sm text-[var(--fg)]">{footerConfig.phone}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-neon-cyan/60" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">{footerConfig.addressLabel}</p>
                    <span className="text-sm text-[var(--fg)]">{footerConfig.address}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 md:flex-row">
            <p className="text-xs font-mono-custom text-[var(--muted)]">{footerConfig.copyrightText}</p>
            <div className="flex flex-wrap items-center gap-4">
              {footerConfig.legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[var(--muted)] transition-colors hover:text-cyan-700 dark:hover:text-cyan-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero información sobre sus servicios.')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>
    </section>
  );
};

export default Footer;
