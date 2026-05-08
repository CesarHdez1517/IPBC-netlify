import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";

/* ── env vars — añade estos en .env (ver .env.example) ────────────────────── */
const SVC  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? "";
const TPL  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? "";
const READY = !!(SVC && TPL && KEY);

/* ── tipos ─────────────────────────────────────────────────────────────────── */
interface Fields { from_name: string; from_email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "success" | "error";
const EMPTY: Fields = { from_name: "", from_email: "", subject: "", message: "" };

/* ── validación ─────────────────────────────────────────────────────────────── */
function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.from_name.trim())  e.from_name  = "El nombre es requerido.";
  if (!f.from_email.trim()) e.from_email = "El correo es requerido.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.from_email)) e.from_email = "Formato de correo inválido.";
  if (!f.subject.trim())    e.subject    = "El asunto es requerido.";
  if (!f.message.trim())    e.message    = "El mensaje es requerido.";
  else if (f.message.trim().length < 10) e.message = "Mínimo 10 caracteres.";
  return e;
}

const INFO = [
  { icon: MapPin, title: "Ubicación",       body: <span>Cuba<br/><span className="text-muted-foreground text-sm">Dirección disponible en persona</span></span> },
  { icon: Mail,   title: "Correo",          body: <a href="mailto:info@iglesia.cu" className="text-accent hover:underline">info@iglesia.cu</a> },
  { icon: Phone,  title: "Teléfono",        body: <span>Disponible para consultas</span> },
  { icon: Clock,  title: "Horarios",        body: <span>Dom: 9–11 AM · Mié: 7–8:30 PM</span> },
] as const;

export default function Contacto() {
  const formRef                 = useRef<HTMLFormElement>(null);
  const [fields, setFields]     = useState<Fields>(EMPTY);
  const [errors, setErrors]     = useState<Errors>({});
  const [status, setStatus]     = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setStatus("sending");
    try {
      if (READY) {
        await emailjs.sendForm(SVC, TPL, formRef.current!, { publicKey: KEY });
        setStatus("success");
        setFields(EMPTY);
        toast.success("¡Mensaje enviado! Te responderemos pronto.");
      } else {
        // fallback: abre cliente de correo
        const m = `mailto:info@iglesia.cu?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(
          `Nombre: ${fields.from_name}\nCorreo: ${fields.from_email}\n\n${fields.message}`
        )}`;
        window.location.href = m;
        toast.info("Se abrirá tu cliente de correo.");
        setStatus("idle");
      }
    } catch {
      setStatus("error");
      toast.error("Error al enviar. Inténtalo de nuevo.");
    }
  };

  const cls = (f: keyof Fields) =>
    "w-full px-4 py-3 border rounded-md bg-card text-foreground placeholder:text-muted-foreground " +
    "focus:outline-none focus:ring-2 transition-shadow " +
    (errors[f] ? "border-destructive focus:ring-destructive/50" : "border-border focus:ring-accent");

  return (
    <PageLayout>
      <section className="bg-primary text-primary-foreground py-14" aria-labelledby="cont-h">
        <div className="container">
          <h1 id="cont-h" className="text-4xl md:text-5xl font-bold mb-3">Contacto</h1>
          <p className="text-lg md:text-xl opacity-90">Nos encantaría escucharte</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Información</h2>
              <div className="divider-gold mb-8" aria-hidden />
              <ul className="space-y-4 list-none m-0 p-0" role="list">
                {INFO.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="card-elegant p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden>
                        <Icon className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-primary mb-1">{title}</h3>
                        <address className="not-italic text-sm text-foreground leading-relaxed">{body}</address>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Envíanos un Mensaje</h2>
              <div className="divider-gold mb-8" aria-hidden />

              {status === "success" ? (
                <div className="card-elegant p-10 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">¡Mensaje Enviado!</h3>
                  <p className="text-muted-foreground text-sm">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-elegant mt-2">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Formulario de contacto">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-semibold text-foreground mb-1.5">
                      Nombre <span className="text-destructive" aria-hidden>*</span>
                    </label>
                    <input id="from_name" name="from_name" type="text" autoComplete="name"
                      value={fields.from_name} onChange={handleChange} required
                      className={cls("from_name")} placeholder="Tu nombre completo"
                      aria-required aria-invalid={!!errors.from_name}
                      aria-describedby={errors.from_name ? "err-name" : undefined} />
                    {errors.from_name && <p id="err-name" className="text-destructive text-xs mt-1" role="alert">{errors.from_name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-semibold text-foreground mb-1.5">
                      Correo <span className="text-destructive" aria-hidden>*</span>
                    </label>
                    <input id="from_email" name="from_email" type="email" autoComplete="email"
                      value={fields.from_email} onChange={handleChange} required
                      className={cls("from_email")} placeholder="tu@email.com"
                      aria-required aria-invalid={!!errors.from_email}
                      aria-describedby={errors.from_email ? "err-email" : undefined} />
                    {errors.from_email && <p id="err-email" className="text-destructive text-xs mt-1" role="alert">{errors.from_email}</p>}
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-1.5">
                      Asunto <span className="text-destructive" aria-hidden>*</span>
                    </label>
                    <input id="subject" name="subject" type="text"
                      value={fields.subject} onChange={handleChange} required
                      className={cls("subject")} placeholder="Asunto de tu mensaje"
                      aria-required aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "err-subject" : undefined} />
                    {errors.subject && <p id="err-subject" className="text-destructive text-xs mt-1" role="alert">{errors.subject}</p>}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">
                      Mensaje <span className="text-destructive" aria-hidden>*</span>
                    </label>
                    <textarea id="message" name="message" rows={5}
                      value={fields.message} onChange={handleChange} required
                      className={`${cls("message")} resize-none`} placeholder="Escribe tu mensaje…"
                      aria-required aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "err-msg" : undefined} />
                    {errors.message && <p id="err-msg" className="text-destructive text-xs mt-1" role="alert">{errors.message}</p>}
                    <p className="text-xs text-muted-foreground mt-1 text-right">{fields.message.length} caracteres</p>
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="w-full btn-elegant disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-busy={status === "sending"}>
                    {status === "sending" ? (
                      <><span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden />Enviando…</>
                    ) : (
                      <><Send size={16} aria-hidden />Enviar Mensaje</>
                    )}
                  </button>
                  {!READY && <p className="text-xs text-muted-foreground text-center">* Se abrirá tu cliente de correo al enviar.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
