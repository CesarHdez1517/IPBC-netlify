import { Loader2 } from "lucide-react";
import PageLayout from "./PageLayout";

export default function LoadingPage({ message = "Cargando contenido…" }: { message?: string }) {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-32 gap-4" role="status" aria-live="polite" aria-label={message}>
        <Loader2 className="animate-spin text-accent" size={44} aria-hidden />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </PageLayout>
  );
}
