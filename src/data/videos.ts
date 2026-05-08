export interface Video {
  id: number;
  youtubeId: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

// ── Reemplaza estos IDs con los videos reales de tu canal de YouTube ────────

export const VIDEOS: Video[] = [
  {
    id: 1,
    youtubeId: "YSRxgHaRLMI",
    title: "La Justificación por la Fe — Exposición de Romanos 3",
    description: "Estudio expositivo del capítulo 3 de Romanos, donde Pablo articula la doctrina central del evangelio: la justificación solo por la fe.",
    thumbnail: `https://img.youtube.com/vi/YSRxgHaRLMI/hqdefault.jpg`,
  },
  {
    id: 2,
    youtubeId: "pKMUo_GyCBY",
    title: "¿Quién es Jesucristo? — Cristología Bíblica",
    description: "Sermón sobre la persona y obra de Jesucristo según las Escrituras: verdadero Dios y verdadero hombre.",
    thumbnail: `https://img.youtube.com/vi/pKMUo_GyCBY/hqdefault.jpg`,
  },
  {
    id: 3,
    youtubeId: "4T0JFfF9-HQ",
    title: "El Espíritu Santo en la Vida del Creyente",
    description: "¿Cuál es el rol del Espíritu Santo en la santificación, la oración y la vida diaria del cristiano?",
    thumbnail: `https://img.youtube.com/vi/4T0JFfF9-HQ/hqdefault.jpg`,
  },
  {
    id: 4,
    youtubeId: "bRcnrNLCqxg",
    title: "La Oración: Cómo Hablar con Dios",
    description: "Una enseñanza práctica sobre los elementos y la actitud de la oración bíblica, basada en el Padre Nuestro.",
    thumbnail: `https://img.youtube.com/vi/bRcnrNLCqxg/hqdefault.jpg`,
  },
  {
    id: 5,
    youtubeId: "4T0JFfF9-HQ",
    title: "La Reforma Protestante: 500 Años Después",
    description: "Una mirada histórica y teológica a los principios de la Reforma que siguen siendo relevantes hoy.",
    thumbnail: `https://img.youtube.com/vi/4T0JFfF9-HQ/hqdefault.jpg`,
  },
  {
    id: 6,
    youtubeId: "pKMUo_GyCBY",
    title: "Los Sacramentos: Bautismo y Cena del Señor",
    description: "Una exposición del significado bíblico de los dos sacramentos que Cristo instituyó para su iglesia.",
    thumbnail: `https://img.youtube.com/vi/pKMUo_GyCBY/hqdefault.jpg`,
  },
];

/** Busca videos por título o descripción */
export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase();
  return VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      (v.description ?? "").toLowerCase().includes(q)
  );
}
