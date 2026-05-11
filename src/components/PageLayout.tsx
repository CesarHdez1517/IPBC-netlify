import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1" aria-label="Contenido principal">
        <div key={location.pathname} className="fade-in">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
