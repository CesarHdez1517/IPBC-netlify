import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home          from "@/pages/Home";
import QuienesSomos  from "@/pages/QuienesSomos";
import QueCreemos    from "@/pages/QueCreemos";
import Articulos     from "@/pages/Articulos";
import ArticleDetail from "@/pages/ArticleDetail";
import Videos        from "@/pages/Videos";
import Contacto      from "@/pages/Contacto";
import Tienda        from "@/pages/Tienda";
import PagoExitoso   from "@/pages/PagoExitoso";
import NotFound      from "@/pages/NotFound";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Toaster richColors position="bottom-right" />
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/quienes-somos"  element={<QuienesSomos />} />
          <Route path="/que-creemos"    element={<QueCreemos />} />
          <Route path="/articulos"      element={<Articulos />} />
          <Route path="/articulos/:slug" element={<ArticleDetail />} />
          <Route path="/videos"         element={<Videos />} />
          <Route path="/contacto"       element={<Contacto />} />
          <Route path="/tienda"         element={<Tienda />} />
          <Route path="/pago-exitoso"   element={<PagoExitoso />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
