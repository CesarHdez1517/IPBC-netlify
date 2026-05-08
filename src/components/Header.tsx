import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Inicio",        href: "/",              end: true  },
  { label: "Quiénes Somos", href: "/quienes-somos", end: false },
  { label: "Qué Creemos",   href: "/que-creemos",   end: false },
  { label: "Artículos",     href: "/articulos",     end: false },
  { label: "Videos",        href: "/videos",        end: false },
  { label: "Tienda",        href: "/tienda",        end: false },
  { label: "Contacto",      href: "/contacto",      end: false },
] as const;

export default function Header() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    [
      "relative py-1 text-sm font-medium transition-colors duration-200 hover:text-accent",
      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-200",
      isActive ? "text-accent after:w-full" : "after:w-0 hover:after:w-full",
    ].join(" ");

  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    [
      "block py-3 px-4 text-sm font-medium rounded-sm transition-colors",
      isActive ? "text-accent bg-white/5" : "hover:bg-white/10 hover:text-accent",
    ].join(" ");

  return (
    <header
      className={`bg-primary text-primary-foreground sticky top-0 z-40 transition-shadow duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-lg"
      }`}
    >
      <div className="container">
        <nav className="flex justify-between items-center py-4" aria-label="Navegación principal">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Iglesia Presbiteriana Bíblica en Cuba — Inicio"
          >
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <span className="text-primary font-bold text-lg">✦</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">IPBC</span>
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex gap-6 lg:gap-8 list-none m-0 p-0" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} end={item.end} className={desktopLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden p-2 rounded hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </nav>

        {/* Mobile nav */}
        {isOpen && (
          <nav id="mobile-nav" className="md:hidden pb-4 border-t border-white/20 mobile-nav-enter" aria-label="Navegación móvil">
            <ul className="list-none m-0 p-0" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.end}
                    className={mobileLink}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
