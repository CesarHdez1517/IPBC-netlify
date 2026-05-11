import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";

const VALORES = [
  { titulo: "Fidelidad Bíblica",     desc: "Enseñamos y vivimos de acuerdo con la Palabra de Dios sin compromisos." },
  { titulo: "Comunidad Auténtica",   desc: "Fomentamos relaciones genuinas basadas en el amor de Cristo." },
  { titulo: "Servicio Desinteresado",desc: "Servimos a nuestra comunidad motivados por el ejemplo de Jesucristo." },
  { titulo: "Crecimiento Espiritual",desc: "Promovemos el desarrollo integral de cada creyente en fe y madurez." },
] as const;

const ARCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663585857688/97Xf8M9F7MaacVrYT5fdRX/arquitectura-iglesia-i9Z47VtioUConGA432XXHJ.webp";

export default function QuienesSomos() {
  return (
    <PageLayout>
      <PageHero
        title="Quiénes Somos"
        subtitle="Conoce nuestra historia y misión"
        backgroundImage={ARCO}
        imageAlt="Exterior de la Iglesia Presbiteriana Bíblica en Cuba"
      />

      <section className="py-16 bg-background">
        <div className="container max-w-4xl space-y-14">

          {/* Historia */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Nuestra Historia</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <div className="space-y-4 text-lg text-foreground leading-relaxed">
              <p>
                La Iglesia Presbiteriana Bíblica en Cuba es una comunidad de fe comprometida con la proclamación
                del evangelio de Jesucristo. Nuestra historia es un testimonio del poder transformador de la
                Palabra de Dios en la vida de las personas y comunidades.
              </p>
              <p>
                Desde nuestros inicios, hemos mantenido un compromiso inquebrantable con la enseñanza fiel de
                las Escrituras y la aplicación práctica de los principios bíblicos en nuestra vida cotidiana.
              </p>
            </div>
          </div>

          {/* Misión */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Nuestra Misión</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <blockquote className="bg-card p-8 rounded-lg shadow-md border-l-4 border-accent not-italic">
              <p className="text-lg text-foreground leading-relaxed">
                Proclamar el evangelio de Jesucristo en su plenitud, edificar a los creyentes en la fe bíblica,
                y servir a nuestra comunidad con amor, integridad y dedicación, bajo la guía del Espíritu Santo.
              </p>
            </blockquote>
          </div>

          {/* Visión */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Nuestra Visión</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <blockquote className="bg-card p-8 rounded-lg shadow-md border-l-4 border-accent not-italic">
              <p className="text-lg text-foreground leading-relaxed">
                Ser una iglesia que brille como luz en Cuba, transformando vidas a través de la Palabra de Dios
                y siendo un testimonio vivo del poder redentor de Jesucristo.
              </p>
            </blockquote>
          </div>

          {/* Valores */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Nuestros Valores</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none m-0 p-0" role="list">
              {VALORES.map(({ titulo, desc }) => (
                <li key={titulo} className="card-elegant p-6 h-full">
                  <h3 className="text-lg font-bold text-accent mb-2">{titulo}</h3>
                  <p className="text-foreground text-sm leading-relaxed">{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Link to="/que-creemos" className="btn-elegant">Conoce lo que Creemos</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
