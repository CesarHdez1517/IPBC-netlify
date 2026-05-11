import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingPage   from "@/components/LoadingPage";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Lazy-loaded routes — each page becomes its own JS chunk.
// The initial bundle only ships the shell (Header, Footer, ErrorBoundary, ThemeProvider).
// Pages are fetched on-demand when the user navigates to them.
const Home          = lazy(() => import("@/pages/Home"));
const QuienesSomos  = lazy(() => import("@/pages/QuienesSomos"));
const QueCreemos    = lazy(() => import("@/pages/QueCreemos"));
const Articulos     = lazy(() => import("@/pages/Articulos"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const Videos        = lazy(() => import("@/pages/Videos"));
const Contacto      = lazy(() => import("@/pages/Contacto"));
const Tienda        = lazy(() => import("@/pages/Tienda"));
const PagoExitoso   = lazy(() => import("@/pages/PagoExitoso"));
const NotFound      = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Toaster richColors position="bottom-right" />
        {/* Suspense shows LoadingPage while any lazy page chunk is being fetched */}
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/quienes-somos"   element={<QuienesSomos />} />
            <Route path="/que-creemos"     element={<QueCreemos />} />
            <Route path="/articulos"       element={<Articulos />} />
            <Route path="/articulos/:slug" element={<ArticleDetail />} />
            <Route path="/videos"          element={<Videos />} />
            <Route path="/contacto"        element={<Contacto />} />
            <Route path="/tienda"          element={<Tienda />} />
            <Route path="/pago-exitoso"    element={<PagoExitoso />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
