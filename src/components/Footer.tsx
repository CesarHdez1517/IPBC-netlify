import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Qué Creemos",   href: "/que-creemos"   },
  { label: "Artículos",     href: "/articulos"      },
  { label: "Videos",        href: "/videos"         },
  { label: "Tienda",        href: "/tienda"         },
  { label: "Contacto",      href: "/contacto"       },
] as const;

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" aria-label="Pie de página">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-primary font-bold text-sm">✦</span>
              </div>
              <p className="text-base font-bold text-accent">Iglesia Presbiteriana Bíblica</p>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Dedicados a proclamar el evangelio de Jesucristo y edificar la fe de nuestra comunidad en Cuba.
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <p className="text-base font-bold mb-4 text-accent">Enlaces Rápidos</p>
            <ul className="space-y-2 text-sm list-none m-0 p-0" role="list">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:text-accent transition-colors hover:underline underline-offset-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-base font-bold mb-4 text-accent">Contacto</p>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                <span>Cuba</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                <a href="mailto:info@iglesia.cu" className="hover:text-accent transition-colors">info@iglesia.cu</a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                <span>Contacto disponible</span>
              </div>
            </address>
          </div>
        </div>

        <div className="divider-gold my-8" role="separator" aria-hidden="true" />
        <p className="text-center text-sm opacity-75">
          &copy; {YEAR} Iglesia Presbiteriana Bíblica. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
