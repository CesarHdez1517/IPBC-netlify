/**
 * articles.ts
 *
 * Lee artículos desde dos fuentes, en este orden de prioridad:
 *
 * 1. Archivos JSON en src/content/articulos/*.json
 *    → creados/editados desde el panel /admin/ de Decap CMS
 *    → Vite los empaqueta en build-time con import.meta.glob
 *
 * 2. SEED_ARTICLES (hardcodeados abajo)
 *    → artículos de ejemplo para que el sitio no esté vacío
 *      en el primer despliegue o si el CMS no tiene contenido aún
 *
 * Cuando creas un artículo en el CMS con el mismo slug que uno del seed,
 * el del CMS reemplaza al del seed automáticamente.
 */

export interface Article {
  id:         number;
  slug:       string;
  title:      string;
  excerpt:    string;
  content:    string;
  imageUrl?:  string;
  createdAt:  string;
}

// ── 1. Artículos del CMS (src/content/articulos/*.json) ─────────────────────
// import.meta.glob se evalúa en BUILD TIME por Vite.
// Si la carpeta no existe o está vacía, el objeto queda vacío sin errores.
// Si usas { eager: true }, los módulos están disponibles sincrónicamente.
type RawCMSArticle = Omit<Article, 'id' | 'slug'>;

const cmsModules = import.meta.glob<{ default: RawCMSArticle }>(
  '/src/content/articulos/*.json',
  { eager: true }
);

const CMS_ARTICLES: Article[] = Object.entries(cmsModules).map(([path, mod], i) => ({
  id:   1000 + i,                                     // IDs altos para no colisionar con seed
  slug: path.split('/').pop()!.replace('.json', ''),  // nombre de archivo = slug
  ...mod.default,
}));

// ── 2. Artículos semilla (se muestran cuando el CMS no tiene contenido) ─────
const SEED_ARTICLES: Article[] = [
  {
    id: 1,
    slug: "soberania-de-dios-en-la-salvacion",
    title: "La Soberanía de Dios en la Salvación",
    excerpt: "Un estudio profundo sobre cómo la doctrina de la soberanía de Dios se manifiesta plenamente en el plan eterno de redención.",
    content: `## La Soberanía de Dios

La Biblia enseña con toda claridad que Dios es soberano sobre todas las cosas, incluyendo la salvación del ser humano.

## El Decreto Eterno

Antes de la fundación del mundo, Dios eligió en Cristo a aquellos que habrían de ser salvos (Efesios 1:4).

> "Nos escogió en él antes de la fundación del mundo, para que fuésemos santos y sin mancha delante de él." — Efesios 1:4

## La Gracia Irresistible

Cuando Dios llama eficazmente a una persona, esa persona viene a Cristo porque Dios transforma su corazón (Ezequiel 36:26).

## Aplicación Práctica

Esta doctrina impulsa la evangelización: sabemos que nuestro mensaje no regresará vacío, porque Dios tiene pueblo en todas las naciones.`,
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
    createdAt: "2024-11-15T10:00:00Z",
  },
  {
    id: 2,
    slug: "cinco-solas-de-la-reforma",
    title: "Los Cinco Solas de la Reforma Protestante",
    excerpt: "Los cinco principios teológicos que definieron la Reforma del siglo XVI y siguen siendo la base del protestantismo evangélico.",
    content: `## Los Cinco Solas

La Reforma Protestante del siglo XVI produjo cinco principios fundamentales conocidos como los "Cinco Solas".

## Sola Scriptura — Solo la Escritura

La Biblia es la única regla infalible de fe y práctica.

## Sola Fide — Solo la Fe

La justificación ante Dios se recibe únicamente por la fe, no por las obras.

## Sola Gratia — Sola Gracia

La salvación es un don inmerecido de Dios. El ser humano no contribuye nada a su propia salvación.

## Solus Christus — Solo Cristo

Cristo es el único mediador entre Dios y los hombres (Hechos 4:12).

## Soli Deo Gloria — Solo a Dios la Gloria

El fin último de la creación y de la salvación es la gloria de Dios.`,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    createdAt: "2024-10-22T09:00:00Z",
  },
  {
    id: 3,
    slug: "oracion-como-comunion-con-dios",
    title: "La Oración como Comunión con Dios",
    excerpt: "La oración no es una técnica religiosa, sino el medio de gracia por el cual nos relacionamos con nuestro Padre celestial.",
    content: `## ¿Qué es la Oración?

La oración es la comunión del alma redimida con su Creador y Redentor.

## Los Elementos de la Oración

Una oración bíblica equilibrada incluye adoración, confesión, agradecimiento y súplica.

## La Oración Modelo

En Mateo 6:9-13, Jesús nos enseñó a orar con el Padre Nuestro como modelo que cubre cada aspecto de nuestra relación con Dios.

## La Perseverancia en la Oración

Pablo nos exhorta a "orar sin cesar" (1 Tesalonicenses 5:17) — cultivar una actitud continua de dependencia y comunión con Dios.`,
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    createdAt: "2024-09-10T08:00:00Z",
  },
];

// ── Fusión: CMS + Seed ───────────────────────────────────────────────────────
// Los slugs del CMS reemplazan los del seed si coinciden.
const cmsSlugs = new Set(CMS_ARTICLES.map((a) => a.slug));
const seedFiltered = SEED_ARTICLES.filter((a) => !cmsSlugs.has(a.slug));

/**
 * Lista completa de artículos, ordenados por fecha descendente.
 * Artículos del CMS tienen prioridad sobre los del seed.
 */
export const ARTICLES: Article[] = [
  ...CMS_ARTICLES,
  ...seedFiltered,
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

/** Busca artículos por título, resumen o contenido (case-insensitive) */
export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
  );
}

/** Obtiene un artículo por slug */
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
