import { Heart, DollarSign, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import PayPalDonateButton from "@/components/PayPalDonateButton";
import PageLayout from "@/components/PageLayout";

const OPTIONS = [
  { id: "s", amount: 10, label: "Donación básica",    benefits: ["Apoyo a programas locales"] as const },
  { id: "m", amount: 25, label: "Donación mediana",   benefits: ["Apoyo a programas locales", "Materiales educativos"] as const },
  { id: "l", amount: 50, label: "Donación generosa",  benefits: ["Apoyo a programas locales", "Materiales educativos", "Expansión del ministerio"] as const },
] as const;

const FAQ = [
  { q: "¿Cómo se usan las donaciones?",   a: "Financian programas comunitarios, educación bíblica, apoyo familiar y expansión del ministerio en Cuba." },
  { q: "¿Es segura mi donación?",          a: "Sí. Procesamos con PayPal, que usa encriptación de nivel bancario." },
  { q: "¿Recibiré un recibo?",             a: "Recibirás un recibo de PayPal por correo. Contáctanos si necesitas documentación adicional." },
] as const;

export default function Tienda() {
  const [preset,  setPreset]  = useState<string | null>(null);
  const [custom,  setCustom]  = useState("");

  const presetAmt = OPTIONS.find((o) => o.id === preset)?.amount ?? null;
  const customAmt = custom ? parseFloat(custom) : null;
  const finalAmt  = presetAmt ?? (customAmt && customAmt >= 0.5 ? customAmt : null);

  const pick = (id: string) => { setPreset((p) => (p === id ? null : id)); setCustom(""); };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14" aria-labelledby="tienda-h">
        <div className="container">
          <h1 id="tienda-h" className="text-4xl md:text-5xl font-bold mb-3">Apoya Nuestro Ministerio</h1>
          <p className="text-lg md:text-xl opacity-90">Tu generosidad nos ayuda a continuar proclamando el evangelio en Cuba</p>
        </div>
      </section>

      <section className="py-16 bg-background" aria-labelledby="don-h">
        <div className="container max-w-5xl">
          <div className="mb-12 text-center">
            <h2 id="don-h" className="text-3xl font-bold text-primary mb-4">Haz una Donación</h2>
            <div className="divider-gold mb-6" aria-hidden />
            <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
              Cada donación es una inversión en el reino de Dios y ayuda a llegar a más personas en Cuba.
            </p>
          </div>

          {/* Presets */}
          <fieldset className="border-0 p-0 m-0 mb-10">
            <legend className="sr-only">Selecciona un monto predefinido</legend>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none m-0 p-0" role="list">
              {OPTIONS.map((o) => {
                const sel = preset === o.id;
                return (
                  <li key={o.id}>
                    <button type="button" onClick={() => pick(o.id)} aria-pressed={sel}
                      className={`w-full text-left card-elegant p-7 transition-all focus-visible:ring-2 focus-visible:ring-accent
                        ${sel ? "ring-2 ring-accent shadow-lg scale-[1.02]" : "hover:shadow-lg hover:scale-[1.01]"}`}>
                      <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-3" aria-hidden>
                          <DollarSign size={28} className="text-accent" />
                        </div>
                        <p className="text-3xl font-bold text-primary">${o.amount}</p>
                        <p className="text-muted-foreground text-sm mt-1">{o.label}</p>
                      </div>
                      <ul className="space-y-2 mb-5 list-none m-0 p-0" aria-label="Beneficios">
                        {o.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" aria-hidden />{b}
                          </li>
                        ))}
                      </ul>
                      <div className={`w-full py-2 px-4 rounded text-center text-sm font-semibold transition-colors ${sel ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"}`} aria-hidden>
                        {sel ? "Seleccionado ✓" : "Seleccionar"}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          {/* Monto personalizado */}
          <div className="card-elegant p-7 mb-10">
            <h3 className="text-xl font-bold text-primary mb-2">Donación Personalizada</h3>
            <p className="text-muted-foreground text-sm mb-4">¿Prefieres otro monto? Ingrésalo aquí.</p>
            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold select-none" aria-hidden>$</span>
              <input type="number" value={custom} onChange={(e) => { setCustom(e.target.value); setPreset(null); }}
                placeholder="0.00" min="0.50" step="0.01"
                className="w-full pl-8 pr-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Monto personalizado en dólares" />
            </div>
          </div>

          {/* PayPal */}
          {finalAmt !== null && finalAmt >= 0.5 && (
            <div className="card-elegant p-7 mb-10">
              <h3 className="text-xl font-bold text-primary mb-4">Confirmar Donación</h3>
              <p className="text-lg text-foreground mb-6">
                Monto a donar: <strong className="text-accent">${finalAmt.toFixed(2)} USD</strong>
              </p>
              <PayPalDonateButton amount={finalAmt} currency="USD"
                description={`Donación IPBC — $${finalAmt.toFixed(2)}`}
                onSuccess={() => { setPreset(null); setCustom(""); }} />
            </div>
          )}

          {/* FAQ */}
          <div className="bg-card p-7 rounded-xl border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">Preguntas Frecuentes</h3>
            <dl className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold text-foreground mb-1">{q}</dt>
                  <dd className="text-muted-foreground text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground" aria-labelledby="thanks-h">
        <div className="container text-center">
          <Heart size={48} className="mx-auto mb-4 fill-current text-accent" aria-hidden />
          <h2 id="thanks-h" className="text-3xl font-bold mb-4">¡Gracias por Tu Generosidad!</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
            Tu donación es una bendición para nuestro ministerio. Que Dios te bendiga abundantemente.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
