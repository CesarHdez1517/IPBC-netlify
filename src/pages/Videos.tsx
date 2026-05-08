import { Play, Search as SearchIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { VIDEOS, searchVideos } from "@/data/videos";
import PageLayout  from "@/components/PageLayout";
import SearchBar   from "@/components/SearchBar";
import Pagination  from "@/components/Pagination";

const PER_PAGE = 9;
const YT_CHANNEL = "https://www.youtube.com/@IPBCuba"; // ← actualiza con tu canal real

export default function Videos() {
  const [query,       setQuery]       = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const displayed  = useMemo(() => (query ? searchVideos(query) : VIDEOS), [query]);
  const paginated  = displayed.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);
  const totalPages = Math.ceil(displayed.length / PER_PAGE);

  const handleSearch = (q: string) => { setQuery(q); setCurrentPage(0); };
  const handleClear  = ()          => { setQuery(""); setCurrentPage(0); };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14" aria-labelledby="vid-h">
        <div className="container">
          <h1 id="vid-h" className="text-4xl md:text-5xl font-bold mb-3">Sermones y Enseñanzas</h1>
          <p className="text-lg md:text-xl opacity-90">Descubre nuestros videos de predicación y enseñanza bíblica</p>
        </div>
      </section>

      {/* Search */}
      <div className="bg-card py-8 border-b border-border">
        <div className="container max-w-2xl">
          <SearchBar placeholder="Buscar videos…" label="Buscar videos" onSearch={handleSearch} onClear={handleClear} className="w-full" />
          {query && (
            <p className="text-sm text-muted-foreground mt-3" role="status" aria-live="polite">
              <strong className="text-foreground">{displayed.length}</strong> resultado{displayed.length !== 1 ? "s" : ""} para &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-background" aria-label="Lista de videos">
        <div className="container">
          {paginated.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none m-0 p-0" role="list">
                {paginated.map((video) => {
                  const ytUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
                  return (
                    <li key={video.id}>
                      <article className="card-elegant overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all h-full flex flex-col">
                        {/* Un solo enlace = un solo tab-stop por video */}
                        <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                          className="relative block bg-muted aspect-video group focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label={`Ver "${video.title}" en YouTube`}>
                          <img
                            src={video.thumbnail ?? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                            alt="" aria-hidden
                            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                            loading="lazy" decoding="async"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors" aria-hidden>
                            <div className="bg-accent rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                              <Play size={28} className="text-white fill-white" />
                            </div>
                          </div>
                        </a>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-base font-bold text-primary mb-2 line-clamp-2">{video.title}</h3>
                          {video.description && (
                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{video.description}</p>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          ) : (
            <div className="text-center py-20" role="status">
              <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4 opacity-40" aria-hidden />
              <p className="text-lg text-muted-foreground mb-6">No se encontraron videos para &ldquo;{query}&rdquo;.</p>
              <button onClick={handleClear} className="btn-elegant">Limpiar búsqueda</button>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-card" aria-labelledby="sub-h">
        <div className="container max-w-3xl text-center">
          <h2 id="sub-h" className="text-3xl font-bold text-primary mb-4">Nuestro Canal de YouTube</h2>
          <div className="divider-gold mb-6" aria-hidden />
          <p className="text-lg text-foreground mb-8 leading-relaxed">
            Suscríbete para recibir notificaciones de nuevos sermones y enseñanzas.
          </p>
          <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn-elegant">
            Suscribirse al Canal
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
