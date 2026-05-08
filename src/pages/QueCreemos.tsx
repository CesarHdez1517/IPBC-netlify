import PageLayout from "@/components/PageLayout";

const CRUZ = "https://d2xsxph8kpxj0f.cloudfront.net/310519663585857688/97Xf8M9F7MaacVrYT5fdRX/cruz-simbolo-nffZVtT6eokgd7UFZBHGFP.webp";

const DOCTRINAS = [
  { titulo: "La Autoridad de la Biblia",  desc: "La Biblia es la Palabra de Dios, infalible e inerrante, y la autoridad suprema en todas las materias de fe y práctica." },
  { titulo: "La Trinidad",                desc: "Creemos en un solo Dios que existe eternamente en tres personas: Padre, Hijo y Espíritu Santo." },
  { titulo: "La Salvación en Cristo",     desc: "La salvación es por gracia mediante la fe en Jesucristo, quien murió por nuestros pecados y resucitó al tercer día." },
  { titulo: "La Redención",               desc: "Todos los seres humanos son pecadores y necesitan la redención que solo viene a través de Jesucristo." },
  { titulo: "La Iglesia",                 desc: "La iglesia es el cuerpo de Cristo, compuesta por todos los creyentes regenerados, con misión de proclamar el evangelio." },
  { titulo: "El Retorno de Cristo",       desc: "Creemos en el retorno literal y personal de Jesucristo, quien juzgará a vivos y muertos." },
] as const;

const ADICIONALES = [
  { titulo: "La Soberanía de Dios",       desc: "Dios es soberano sobre todas las cosas. Su propósito eterno se cumple con certeza sin negar la responsabilidad humana." },
  { titulo: "La Justificación por Fe",    desc: "Somos justificados por fe sola en Cristo sola. Nuestra aceptación ante Dios depende de la obra de Cristo imputada por fe." },
  { titulo: "La Santificación",           desc: "El Espíritu Santo nos santifica progresivamente, transformándonos a la imagen de Cristo a lo largo de toda la vida." },
  { titulo: "Los Sacramentos",            desc: "Practicamos el Bautismo y la Cena del Señor, instituidos por Cristo como signos y sellos de la gracia del evangelio." },
] as const;

export default function QueCreemos() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden" aria-label="Encabezado">
        <img src={CRUZ} alt="Cruz de madera — símbolo de nuestra fe"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-black/15" aria-hidden />
        <div className="relative container h-full flex flex-col justify-end pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Qué Creemos</h1>
          <p className="text-lg text-white/90 mt-2">Nuestras doctrinas fundamentales</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container max-w-4xl">

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Doctrinas Fundamentales</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <p className="text-lg text-foreground leading-relaxed">
              Como iglesia presbiteriana, nos adherimos a las doctrinas históricas del cristianismo evangélico,
              basadas en la Palabra de Dios y resumidas en los estándares de Westminster.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14 list-none m-0 p-0" role="list">
            {DOCTRINAS.map(({ titulo, desc }) => (
              <li key={titulo} className="card-elegant p-6 h-full">
                <h3 className="text-lg font-bold text-primary mb-2">{titulo}</h3>
                <p className="text-foreground text-sm leading-relaxed">{desc}</p>
              </li>
            ))}
          </ul>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Creencias Adicionales</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <dl className="space-y-5">
              {ADICIONALES.map(({ titulo, desc }) => (
                <div key={titulo} className="bg-card p-6 rounded-lg shadow-sm">
                  <dt className="text-lg font-bold text-accent mb-2">{titulo}</dt>
                  <dd className="text-foreground leading-relaxed text-sm">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-primary text-primary-foreground p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Nuestro Compromiso</h2>
            <p className="text-lg leading-relaxed opacity-95">
              Nos comprometemos a vivir de acuerdo con estas doctrinas, a crecer en el conocimiento de Dios
              y a compartir el evangelio de Jesucristo con todos. Te invitamos a venir y experimentar la
              gracia transformadora de Dios a través de la fe en Cristo.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
