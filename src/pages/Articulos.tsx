import { Link } from "react-router-dom";
import { Calendar, Search as SearchIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { ARTICLES, searchArticles } from "@/data/articles";
import PageLayout from "@/components/PageLayout";
import PageHero  from "@/components/PageHero";
import SearchBar  from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const PER_PAGE = 9;

export default function Articulos() {
  const [query,       setQuery]       = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const displayed = useMemo(
    () => (query ? searchArticles(query) : ARTICLES),
    [query]
  );
  const paginated  = displayed.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);
  const totalPages = Math.ceil(displayed.length / PER_PAGE);

  const handleSearch = (q: string) => { setQuery(q); setCurrentPage(0); };
  const handleClear  = ()          => { setQuery(""); setCurrentPage(0); };

  return (
    <PageLayout>
      <PageHero
        title="Artículos Bíblicos"
        subtitle="Reflexiones y enseñanzas de la Palabra de Dios"
      />

      <div className="bg-card py-8 border-b border-border">
        <div className="container max-w-2xl">
          <SearchBar placeholder="Buscar artículos…" label="Buscar artículos" onSearch={handleSearch} onClear={handleClear} className="w-full" />
          {query && (
            <p className="text-sm text-muted-foreground mt-3" role="status" aria-live="polite">
              <strong className="text-foreground">{displayed.length}</strong> resultado{displayed.length !== 1 ? "s" : ""} para &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>

      <section className="py-16 bg-background" aria-label="Lista de artículos">
        <div className="container">
          {paginated.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none m-0 p-0" role="list">
                {paginated.map((article, index) => {
                  const date = new Date(article.createdAt);
                  const isFirst = index === 0 && currentPage === 0;
                  return (
                    <li key={article.id}>
                      <Link to={`/articulos/${article.slug}`}
                        className={`${isFirst ? "card-featured" : "card-elegant"} p-6 h-full flex flex-col block`}>
                        {article.imageUrl && (
                          <img src={article.imageUrl} alt="" aria-hidden
                            className="w-full h-48 object-cover rounded-md mb-4" loading="lazy" decoding="async" />
                        )}
                        <h3 className="text-lg font-bold text-primary mb-2 flex-1 line-clamp-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">{article.excerpt}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                          <Calendar size={14} aria-hidden />
                          <time dateTime={date.toISOString()}>
                            {date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                          </time>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          ) : (
            <div className="text-center py-20" role="status">
              <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4 opacity-40" aria-hidden />
              <p className="text-lg text-muted-foreground mb-6">No se encontraron artículos para &ldquo;{query}&rdquo;.</p>
              <button onClick={handleClear} className="btn-elegant">Limpiar búsqueda</button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
