import { Link } from "react-router-dom";
import { BookOpen, Users, Video, Heart, MapPin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HERO      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663585857688/97Xf8M9F7MaacVrYT5fdRX/hero-iglesia-3KL8Z35VnGZT35SLVK5xFv.webp";
const BIBLIA    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663585857688/97Xf8M9F7MaacVrYT5fdRX/biblia-estudio-ksy8miWfqsVvS4rfryzFN8.webp";
const COMUNIDAD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663585857688/97Xf8M9F7MaacVrYT5fdRX/comunidad-iglesia-fEN6qGo5tJvMnQL2eKNdEt.webp";

const FEATURES = [
  { href: "/quienes-somos", icon: Users,    title: "Quiénes Somos", desc: "Conoce nuestra historia, misión y visión como comunidad de fe." },
  { href: "/que-creemos",   icon: BookOpen, title: "Qué Creemos",   desc: "Nuestras doctrinas y principios fundamentales basados en la Biblia." },
  { href: "/articulos",     icon: Heart,    title: "Artículos",     desc: "Reflexiones bíblicas y enseñanzas para tu crecimiento espiritual." },
  { href: "/videos",        icon: Video,    title: "Videos",        desc: "Sermones, enseñanzas y contenido audiovisual de nuestra iglesia." },
] as const;

function AnimCard({
  href, icon: Icon, title, desc, delay,
}: { href: string; icon: React.ElementType; title: string; desc: string; delay: number }) {
  const [ref, visible] = useScrollAnimation<HTMLLIElement>({ delay });
  return (
    <li ref={ref} className={`anim-fade-up${visible ? " visible" : ""}`}>
      <Link to={href} className="card-elegant p-6 text-center hover:-translate-y-1 transition-transform block h-full group">
        <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/25 transition-colors" aria-hidden>
          <Icon className="text-accent" size={32} />
        </div>
        <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </Link>
    </li>
  );
}

export default function Home() {
  const [faithRef,     faithVisible]     = useScrollAnimation();
  const [communityRef, communityVisible] = useScrollAnimation();
  // FIX: was useScrollAnimation({ animation: "scale-up" } as any)
  // "animation" is not a valid option — the animation class is applied via className below.
  const [ctaRef,       ctaVisible]       = useScrollAnimation();

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative h-[480px] md:h-[580px] overflow-hidden" aria-label="Bienvenida">
        {/*
          FIX: was h-[120%] + top:-10% hack to prevent white edges during zoom.
          heroZoom now animates scale() from center — no overflow hacks needed.
        */}
        <img
          src={HERO}
          alt="Interior de la Iglesia Presbiteriana Bíblica en Cuba"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "heroZoom 10s ease-out forwards" }}
          fetchPriority="high"
          decoding="async"
        />
        {/* FIX: .overlay-dark was undefined — now defined in index.css */}
        <div className="overlay-dark" aria-hidden />
        <div className="relative container h-full flex flex-col justify-center items-center text-center text-white gap-5 px-4">
          {/* FIX: .location-badge was undefined — now defined in index.css */}
          <div className="location-badge">
            <MapPin size={14} aria-hidden />
            <span>Cuba</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg max-w-3xl">
            Iglesia Presbiteriana Bíblica
          </h1>
          <p className="text-lg md:text-xl max-w-xl drop-shadow opacity-90 leading-relaxed">
            Proclamando el evangelio de Jesucristo y edificando la fe en Cuba
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link to="/quienes-somos" className="btn-elegant-secondary text-base shadow-lg">
              Conoce Más
            </Link>
            <Link
              to="/contacto"
              className="px-6 py-3 border border-white/40 rounded-md font-semibold text-white
                         hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Welcome ── */}
      {/* FIX: .section-major was undefined — now defined in index.css */}
      <section className="section-major bg-background" aria-labelledby="welcome-h">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 id="welcome-h" className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Bienvenido a Nuestra Comunidad
          </h2>
          <div className="divider-gold my-6" aria-hidden />
          {/* FIX: .lead was undefined — now defined in index.css */}
          <p className="lead mx-auto">
            Somos una iglesia presbiteriana comprometida con la predicación fiel de la Palabra de Dios.
            Nos reúne la fe en Jesucristo y el deseo de vivir de acuerdo con los principios bíblicos.
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      {/* FIX: .section-content was undefined — now defined in index.css */}
      <section className="section-content bg-card" aria-labelledby="features-h">
        <div className="container">
          <h2 id="features-h" className="text-3xl font-bold text-primary text-center mb-12">
            Explora Nuestro Contenido
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none m-0 p-0" role="list">
            {FEATURES.map((f, i) => (
              <AnimCard key={f.href} {...f} desc={f.desc} delay={i * 80} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fe ── */}
      <section className="section-major bg-background" aria-labelledby="faith-h">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div ref={faithRef} className={`anim-fade-right${faithVisible ? " visible" : ""}`}>
              <img
                src={BIBLIA}
                alt="Biblia abierta sobre una mesa de madera"
                className="rounded-lg shadow-lg w-full h-80 md:h-96 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h2 id="faith-h" className="text-3xl font-bold text-primary mb-4">Nuestra Fe</h2>
              <div className="divider-gold mb-6 w-16" aria-hidden />
              <p className="text-lg text-foreground leading-relaxed mb-4">
                La Biblia es la Palabra de Dios y la autoridad suprema en todas las materias de fe y práctica.
                Creemos en la salvación por gracia mediante la fe en Jesucristo.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Nos comprometemos a vivir de acuerdo con los principios presbiterianos de gobierno eclesiástico
                y a servir a nuestra comunidad con amor y dedicación.
              </p>
              <Link to="/que-creemos" className="btn-elegant">Leer Nuestras Creencias</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comunidad ── */}
      <section className="section-major bg-card" aria-labelledby="community-h">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 id="community-h" className="text-3xl font-bold text-primary mb-4">Nuestra Comunidad</h2>
              <div className="divider-gold mb-6 w-16" aria-hidden />
              <p className="text-lg text-foreground leading-relaxed mb-4">
                Somos una familia de creyentes unidos en Cristo, dedicados a crecer juntos en fe y servicio.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Nos reunimos regularmente para adorar, estudiar la Biblia y apoyarnos mutuamente.
                Te invitamos a unirte a nosotros.
              </p>
              <Link to="/contacto" className="btn-elegant-secondary">Ponte en Contacto</Link>
            </div>
            <div
              ref={communityRef}
              className={`anim-fade-left${communityVisible ? " visible" : ""} order-1 md:order-2`}
            >
              <img
                src={COMUNIDAD}
                alt="Miembros de la comunidad de la iglesia reunidos"
                className="rounded-lg shadow-lg w-full h-80 md:h-96 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {/* FIX: .section-hero was undefined — now defined in index.css */}
      <section className="section-hero bg-primary text-primary-foreground" aria-labelledby="cta-h">
        {/* FIX: was useScrollAnimation({ animation: "scale-up" } as any) — "animation" is not valid.
            The .anim-scale-up class is applied here via className. */}
        <div ref={ctaRef} className={`anim-scale-up${ctaVisible ? " visible" : ""} container text-center`}>
          <h2 id="cta-h" className="text-3xl md:text-4xl font-bold mb-4">¿Tienes Preguntas?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Nos encantaría escucharte. Contáctanos para más información sobre nuestros servicios y actividades.
          </p>
          <Link to="/contacto" className="btn-elegant-secondary shadow-lg">Enviar Mensaje</Link>
        </div>
      </section>
    </PageLayout>
  );
}
