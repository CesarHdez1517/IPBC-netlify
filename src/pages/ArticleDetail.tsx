import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { marked } from "marked";
import { getArticleBySlug, ARTICLES } from "@/data/articles";
import PageLayout from "@/components/PageLayout";
import NotFound   from "./NotFound";

// ── Share icons (module-scope = no recreation on re-render) ──────────────────
const FbIcon = () => (
  <svg className="w-5 h-5 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.245 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const WaIcon = () => (
  <svg className="w-5 h-5 text-[#25d366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 0C5.373 0 0 5.373 0 12c0 2.114.548 4.098 1.508 5.826L0 24l6.335-1.652A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0" /></svg>
);

export default function ArticleDetail() {
  const { slug }   = useParams<{ slug: string }>();
  const navigate   = useNavigate();
  const article    = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <NotFound />;

  const publishedDate  = new Date(article.createdAt);
  const shareUrl       = `${window.location.origin}/articulos/${article.slug}`;
  const shareText      = `Mira este artículo: ${article.title}`;
  const htmlContent    = marked.parse(article.content) as string;

  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const SHARE = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, icon: <FbIcon /> },
    { label: "X (Twitter)", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, icon: <XIcon /> },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, icon: <WaIcon /> },
    { label: "Correo", href: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, icon: <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg> },
  ] as const;

  return (
    <PageLayout>
      <div className="bg-background border-b border-border">
        <div className="container py-4">
          <button onClick={() => navigate("/articulos")}
            className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium text-sm">
            <ArrowLeft size={16} aria-hidden /> Volver a Artículos
          </button>
        </div>
      </div>

      <header className="bg-card py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Calendar size={15} aria-hidden />
            <time dateTime={publishedDate.toISOString()}>
              {publishedDate.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </div>
          <div className="flex items-center flex-wrap gap-2 pt-6 border-t border-border">
            <span className="text-sm font-semibold text-foreground mr-1">Compartir:</span>
            {SHARE.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Compartir en ${label}`}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </header>

      {article.imageUrl && (
        <div className="bg-card pb-8">
          <div className="container max-w-4xl">
            <img src={article.imageUrl} alt={article.title}
              className="w-full max-h-96 object-cover rounded-xl shadow-md" loading="eager" decoding="async" />
          </div>
        </div>
      )}

      <article className="py-12 bg-background">
        <div className="container max-w-4xl">
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-card" aria-labelledby="related-h">
          <div className="container max-w-5xl">
            <h2 id="related-h" className="text-3xl font-bold text-primary mb-4">Artículos Relacionados</h2>
            <div className="divider-gold mb-10" aria-hidden />
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none m-0 p-0" role="list">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/articulos/${r.slug}`}
                    className="card-elegant p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all block h-full">
                    {r.imageUrl && <img src={r.imageUrl} alt="" aria-hidden className="w-full h-40 object-cover rounded-md mb-4" loading="lazy" decoding="async" />}
                    <h3 className="text-base font-bold text-primary mb-2 line-clamp-2">{r.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{r.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
