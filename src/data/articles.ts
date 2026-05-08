export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

// ── Reemplaza este contenido con tus artículos reales ──────────────────────
// Puedes exportar desde tu base de datos como JSON y pegarlo aquí,
// o conectar un CMS headless (Sanity, Contentful, etc.) más adelante.

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "soberania-de-dios-en-la-salvacion",
    title: "La Soberanía de Dios en la Salvación",
    excerpt: "Un estudio profundo sobre cómo la doctrina de la soberanía de Dios se manifiesta plenamente en el plan eterno de redención.",
    content: `## La Soberanía de Dios

La Biblia enseña con toda claridad que Dios es soberano sobre todas las cosas, incluyendo la salvación del ser humano. Esta verdad, lejos de ser una doctrina fría o abstracta, es el fundamento de nuestra esperanza y confianza.

## El Decreto Eterno

Antes de la fundación del mundo, Dios eligió en Cristo a aquellos que habrían de ser salvos (Efesios 1:4). Esta elección no se basa en méritos previstos ni en la fe anticipada del ser humano, sino únicamente en la gracia y el propósito soberano de Dios.

> "Nos escogió en él antes de la fundación del mundo, para que fuésemos santos y sin mancha delante de él." — Efesios 1:4

## La Gracia Irresistible

Cuando Dios llama eficazmente a una persona, esa persona viene a Cristo. No porque sea coaccionada, sino porque Dios transforma su corazón de piedra en corazón de carne (Ezequiel 36:26), dándole el deseo de venir a Él.

## Implicaciones Prácticas

Esta doctrina no paraliza la evangelización; al contrario, la impulsa. Sabemos que nuestro mensaje no regresará vacío, porque Dios tiene pueblo en todas las naciones que ha de ser llamado.

La soberanía de Dios es el ancla de nuestra fe en tiempos de incertidumbre. Que podamos descansar en la certeza de que Aquel que comenzó la buena obra la perfeccionará hasta el día de Cristo Jesús (Filipenses 1:6).`,
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
    createdAt: "2024-11-15T10:00:00Z",
  },
  {
    id: 2,
    slug: "cinco-solas-de-la-reforma",
    title: "Los Cinco Solas de la Reforma Protestante",
    excerpt: "Una exposición de los cinco principios teológicos que definieron la Reforma del siglo XVI y siguen siendo la base del protestantismo evangélico.",
    content: `## Los Cinco Solas

La Reforma Protestante del siglo XVI produjo cinco principios fundamentales, conocidos como los "Cinco Solas", que articulan el corazón del evangelio bíblico.

## Sola Scriptura — Solo la Escritura

La Biblia es la única regla infalible de fe y práctica. No la tradición eclesiástica ni los decretos papales, sino únicamente la Palabra de Dios tiene autoridad suprema sobre el creyente.

## Sola Fide — Solo la Fe

La justificación ante Dios se recibe únicamente por la fe, no por las obras. Esta fue la chispa que encendió la Reforma cuando Martín Lutero redescubrió la verdad de Romanos 1:17.

## Sola Gratia — Sola Gracia

La salvación es un don inmerecido de Dios. El ser humano no contribuye nada a su propia salvación; todo viene de la gracia divina.

## Solus Christus — Solo Cristo

Cristo es el único mediador entre Dios y los hombres. No hay salvación en ningún otro nombre (Hechos 4:12).

## Soli Deo Gloria — Solo a Dios la Gloria

El fin último de toda la creación, y especialmente de la salvación, es la gloria de Dios. El creyente vive para glorificar a Dios en todo lo que hace.

Estos cinco principios no son reliquias históricas; son verdades eternas que la iglesia debe proclamar en cada generación.`,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    createdAt: "2024-10-22T09:00:00Z",
  },
  {
    id: 3,
    slug: "oracion-como-comunion-con-dios",
    title: "La Oración como Comunión con Dios",
    excerpt: "La oración no es una técnica religiosa para obtener lo que queremos, sino el medio de gracia por el cual nos relacionamos con nuestro Padre celestial.",
    content: `## ¿Qué es la Oración?

La oración es la comunión del alma redimida con su Creador y Redentor. El Catecismo de Westminster la define como "el ofrecimiento de nuestros deseos a Dios, por cosas conformes a su voluntad, en el nombre de Cristo, con confesión de nuestros pecados y reconocimiento agradecido de sus misericordias."

## Los Elementos de la Oración

Una oración bíblica equilibrada incluye:

- **Adoración**: Reconocer la grandeza y santidad de Dios
- **Confesión**: Reconocer nuestros pecados y pedir perdón
- **Agradecimiento**: Dar gracias por las bendiciones recibidas
- **Súplica**: Presentar nuestras necesidades y las de otros

## La Oración Modelo

En Mateo 6:9-13, Jesús nos enseñó a orar con el Padre Nuestro, no como una fórmula mágica, sino como un modelo que cubre cada aspecto de nuestra relación con Dios.

## La Perseverancia en la Oración

Pablo nos exhorta a "orar sin cesar" (1 Tesalonicenses 5:17). Esto no significa estar de rodillas todo el día, sino cultivar una actitud continua de dependencia y comunión con Dios.

Que la oración sea para nosotros no una obligación religiosa, sino el deleite del alma que ha sido reconciliada con su Padre.`,
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    createdAt: "2024-09-10T08:00:00Z",
  },
  {
    id: 4,
    slug: "la-iglesia-visible-e-invisible",
    title: "La Iglesia Visible e Invisible",
    excerpt: "El concepto reformado de la iglesia distingue entre la iglesia visible, que incluye a todos los que profesan fe, y la iglesia invisible, conocida solo por Dios.",
    content: `## Dos Aspectos de una Sola Iglesia

La tradición reformada distingue entre dos aspectos de la iglesia de Cristo: la iglesia visible y la iglesia invisible.

## La Iglesia Invisible

La iglesia invisible está compuesta por todos los verdaderos creyentes de todos los tiempos y lugares, cuyos corazones han sido regenerados por el Espíritu Santo. Solo Dios conoce perfectamente quiénes pertenecen a esta iglesia.

> "Pero el fundamento de Dios está firme, teniendo este sello: Conoce el Señor a los que son suyos." — 2 Timoteo 2:19

## La Iglesia Visible

La iglesia visible es la congregación de todos los que profesan la fe verdadera, junto con sus hijos. Incluye tanto creyentes genuinos como profesantes nominales.

## Las Marcas de la Verdadera Iglesia

Los reformadores identificaron tres marcas que distinguen a la verdadera iglesia:

1. La predicación fiel de la Palabra de Dios
2. La administración correcta de los sacramentos
3. El ejercicio de la disciplina eclesiástica

## Implicaciones para la Vida Congregacional

Esta distinción nos lleva a la humildad: no podemos juzgar definitivamente el corazón de nadie. Al mismo tiempo, nos llama a examinar nuestra propia fe para asegurarnos de que sea genuina.`,
    imageUrl: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=80",
    createdAt: "2024-08-05T10:00:00Z",
  },
  {
    id: 5,
    slug: "la-gracia-comun-de-dios",
    title: "La Gracia Común de Dios hacia la Humanidad",
    excerpt: "Dios derrama bendiciones generales sobre toda la humanidad, tanto creyentes como incrédulos. Esta doctrina de la gracia común tiene profundas implicaciones éticas y sociales.",
    content: `## ¿Qué es la Gracia Común?

La gracia común (del latín *gratia communis*) es la benevolencia general que Dios muestra hacia toda la humanidad, independientemente de la condición espiritual de cada persona.

## Evidencias Bíblicas

Jesús mismo enseñó: "Él hace salir su sol sobre malos y buenos, y hace llover sobre justos e injustos" (Mateo 5:45). Esta es la expresión más clara de la gracia común en el Nuevo Testamento.

## Ámbitos de la Gracia Común

La gracia común opera en varios niveles:

- **Natural**: La preservación de la creación, las leyes naturales, la providencia divina
- **Civil**: La conciencia humana, el sentido de justicia, las instituciones sociales
- **Cultural**: El arte, la ciencia, la filosofía, los logros humanos en general

## Gracia Común vs. Gracia Salvadora

Es crucial no confundir la gracia común con la gracia salvadora. La primera no lleva a la salvación; solo la segunda, que regenera el corazón, conduce a la fe y la vida eterna.

## Aplicación Práctica

Esta doctrina nos llama a valorar las contribuciones de todos los seres humanos, a trabajar por el bien común, y a reconocer la imagen de Dios en toda persona.`,
    imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80",
    createdAt: "2024-07-18T09:00:00Z",
  },
  {
    id: 6,
    slug: "el-dia-del-senor-en-la-tradicion-reformada",
    title: "El Día del Señor en la Tradición Reformada",
    excerpt: "La observancia del día de reposo cristiano tiene profundas raíces bíblicas y una rica tradición en las iglesias reformadas y presbiterianas.",
    content: `## El Día de Reposo Cristiano

El Día del Señor (domingo) es el día de reposo cristiano, el día en que la iglesia se reúne para adorar a Dios y descansar de sus labores ordinarias.

## Fundamento Bíblico

El principio del reposo semanal se remonta a la creación (Génesis 2:2-3) y está codificado en el cuarto mandamiento (Éxodo 20:8-11). Después de la resurrección de Cristo, la iglesia adoptó el primer día de la semana como el día de reposo cristiano.

> "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él." — Salmo 118:24

## La Tradición Reformada

Los reformadores, especialmente en la tradición escocesa y puritana, enfatizaron la observancia del Día del Señor como un signo del pacto de gracia. La Confesión de Westminster dedica un capítulo completo a este tema.

## Cómo Observar el Día del Señor

La observancia positiva del Día del Señor incluye:

- Reunirse con la congregación para adorar
- Escuchar la predicación de la Palabra
- Participar en los sacramentos cuando se administren
- La oración personal y familiar
- Las obras de misericordia y necesidad

## Un Anticipo del Cielo

El Día del Señor es un anticipo del descanso eterno que aguarda al pueblo de Dios. Cada domingo es un pequeño anticipo de la gloria venidera.`,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    createdAt: "2024-06-30T08:00:00Z",
  },
];

/** Busca artículos por título o contenido (case-insensitive) */
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
