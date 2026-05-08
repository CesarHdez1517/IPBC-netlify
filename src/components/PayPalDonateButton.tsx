import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

declare global { interface Window { paypal?: any } }

interface Props {
  amount:      number;
  currency?:   string;
  description?: string;
  onSuccess?:  (details: unknown) => void;
  onError?:    (error: unknown) => void;
}

export default function PayPalDonateButton({
  amount, currency = "USD",
  description = "Donación a la Iglesia Presbiteriana Bíblica",
  onSuccess, onError,
}: Props) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const scriptLoadRef = useRef(false);

  const renderButtons = useCallback(() => {
    if (!window.paypal || !containerRef.current) return;
    containerRef.current.innerHTML = "";
    window.paypal.Buttons({
      createOrder: (_: unknown, actions: any) =>
        actions.order.create({
          purchase_units: [{ amount: { value: amount.toFixed(2), currency_code: currency }, description }],
        }),
      onApprove: async (_: unknown, actions: any) => {
        try {
          const details = await actions.order.capture();
          toast.success("¡Donación realizada! ¡Que Dios te bendiga!");
          onSuccess?.(details);
        } catch (err) {
          toast.error("Error al procesar la donación.");
          onError?.(err);
        }
      },
      onError: (err: unknown) => {
        toast.error("Error en PayPal. Inténtalo de nuevo.");
        onError?.(err);
      },
    }).render(containerRef.current);
  }, [amount, currency, description, onSuccess, onError]);

  useEffect(() => {
    if (window.paypal) { renderButtons(); return; }
    if (scriptLoadRef.current) return;

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId) { toast.error("PayPal no está configurado."); return; }

    scriptLoadRef.current = true;
    const script = document.createElement("script");
    script.src   = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload  = renderButtons;
    script.onerror = () => { toast.error("Error cargando PayPal."); scriptLoadRef.current = false; };
    document.body.appendChild(script);
  }, [currency, renderButtons]);

  return <div ref={containerRef} className="w-full min-h-[48px]" aria-label="Botón de pago con PayPal" />;
}
