import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 fade-in" aria-label="Contenido principal">
        {children}
      </main>
      <Footer />
    </div>
  );
}
