import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex-1 bg-background flex flex-col items-center justify-center px-4 py-24">
        <div className="text-center max-w-md">
          <div className="text-accent text-6xl mb-4 select-none" aria-hidden>✦</div>
          <h1 className="text-8xl font-bold text-primary mb-2 leading-none">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">Página no encontrada</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Link to="/" className="btn-elegant">
            <Home size={18} aria-hidden />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
