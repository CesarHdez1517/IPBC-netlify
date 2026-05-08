import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-background">
        <div className="flex flex-col items-center max-w-lg text-center">
          <AlertTriangle size={48} className="text-destructive mb-6" aria-hidden />
          <h1 className="text-xl font-bold text-foreground mb-2">Ocurrió un error inesperado</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Por favor, recarga la página. Si el problema persiste, contáctanos.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="text-xs text-left bg-muted p-4 rounded w-full overflow-auto mb-6 text-muted-foreground">
              {this.state.error.stack}
            </pre>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-elegant"
          >
            <RotateCcw size={16} aria-hidden />
            Recargar la página
          </button>
        </div>
      </div>
    );
  }
}
