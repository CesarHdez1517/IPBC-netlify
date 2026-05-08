import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function PagoExitoso() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <PageLayout>
      <section className="py-20 bg-background">
        <div className="container max-w-2xl">
          {/* Éxito */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6" aria-hidden>
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                <CheckCircle size={64} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">¡Pago Exitoso!</h1>
            <p className="text-lg text-foreground">
              Gracias por tu donación. Tu transacción ha sido procesada correctamente.
            </p>
          </div>

          {/* Detalles */}
          {sessionId && (
            <div className="card-elegant p-8 mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">Referencia de la Transacción</h2>
              <p className="font-mono text-sm text-muted-foreground break-all">{sessionId}</p>
            </div>
          )}

          {/* Próximos pasos */}
          <div className="card-elegant p-8 mb-8 bg-accent/5">
            <h2 className="text-xl font-bold text-primary mb-4">Próximos Pasos</h2>
            <ol className="space-y-3 list-none m-0 p-0">
              {[
                "Recibirás un correo de confirmación de PayPal.",
                "Puedes contactarnos si tienes alguna pregunta.",
                "¡Que Dios bendiga tu generosidad!",
              ].map((s, i) => (
                <li key={i} className="flex gap-3 text-foreground">
                  <span className="font-bold text-accent flex-shrink-0" aria-hidden>{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="text-center mb-8">
            <Link to="/contacto" className="text-accent font-semibold hover:underline">
              ¿Preguntas? Ponte en contacto →
            </Link>
          </div>

          <div className="text-center">
            <Link to="/tienda" className="btn-elegant-secondary">Volver a la Tienda</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
