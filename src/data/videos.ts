/**
 * videos.ts
 *
 * Misma lógica que articles.ts:
 * 1. Lee videos de src/content/videos/*.json (Decap CMS)
 * 2. Si no hay contenido CMS, muestra SEED_VIDEOS como fallback
 */

export interface Video {
  id:           number;
  youtubeId:    string;
  title:        string;
  description?: string;
  thumbnail?:   string;
}

// ── 1. Videos del CMS ────────────────────────────────────────────────────────
type RawCMSVideo = Omit<Video, 'id' | 'thumbnail'>;

const cmsModules = import.meta.glob<{ default: RawCMSVideo }>(
  '/src/content/videos/*.json',
  { eager: true }
);

const CMS_VIDEOS: Video[] = Object.entries(cmsModules).map(([, mod], i) => ({
  id:        1000 + i,
  thumbnail: `https://img.youtube.com/vi/${mod.default.youtubeId}/hqdefault.jpg`,
  ...mod.default,
}));

// ── 2. Videos semilla ────────────────────────────────────────────────────────
const SEED_VIDEOS: Video[] = [
  {
    id: 1,
    youtubeId: "YSRxgHaRLMI",
    title: "La Justificación por la Fe — Exposición de Romanos 3",
    description: "Estudio expositivo del capítulo 3 de Romanos, donde Pablo articula la doctrina central del evangelio.",
    thumbnail: "https://img.youtube.com/vi/YSRxgHaRLMI/hqdefault.jpg",
  },
  {
    id: 2,
    youtubeId: "pKMUo_GyCBY",
    title: "¿Quién es Jesucristo? — Cristología Bíblica",
    description: "Sermón sobre la persona y obra de Jesucristo según las Escrituras: verdadero Dios y verdadero hombre.",
    thumbnail: "https://img.youtube.com/vi/pKMUo_GyCBY/hqdefault.jpg",
  },
  {
    id: 3,
    youtubeId: "4T0JFfF9-HQ",
    title: "El Espíritu Santo en la Vida del Creyente",
    description: "El rol del Espíritu Santo en la santificación, la oración y la vida diaria del cristiano.",
    thumbnail: "https://img.youtube.com/vi/4T0JFfF9-HQ/hqdefault.jpg",
  },
];

// ── Fusión ───────────────────────────────────────────────────────────────────
const cmsIds = new Set(CMS_VIDEOS.map((v) => v.youtubeId));
const seedFiltered = SEED_VIDEOS.filter((v) => !cmsIds.has(v.youtubeId));

export const VIDEOS: Video[] = [...CMS_VIDEOS, ...seedFiltered];

/** Busca videos por título o descripción */
export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase();
  return VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      (v.description ?? "").toLowerCase().includes(q)
  );
}
