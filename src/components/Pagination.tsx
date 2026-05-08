import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  scrollTargetId?: string;
}

function getWindow(current: number, total: number) {
  const d = 2, start = Math.max(0, current - d), end = Math.min(total - 1, current + d);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ currentPage, totalPages, onPageChange, scrollTargetId = "main-content" }: Props) {
  useEffect(() => {
    if (currentPage === 0) return;
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage, scrollTargetId]);

  if (totalPages <= 1) return null;

  const pages = getWindow(currentPage, totalPages);
  const base  = "px-3 py-2 rounded text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent border border-border";

  return (
    <nav className="flex justify-center items-center gap-1 mt-12" aria-label="Paginación">
      <button onClick={() => onPageChange(Math.max(0, currentPage - 1))} disabled={currentPage === 0}
        className={`${base} inline-flex items-center gap-1 hover:bg-card disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Página anterior">
        <ChevronLeft size={16} aria-hidden /><span className="hidden sm:inline">Anterior</span>
      </button>

      {pages[0] > 0 && <>
        <button onClick={() => onPageChange(0)} className={`${base} hover:bg-card`} aria-label="Página 1">1</button>
        {pages[0] > 1 && <span className="px-2 text-muted-foreground" aria-hidden>…</span>}
      </>}

      {pages.map((i) => (
        <button key={i} onClick={() => onPageChange(i)}
          className={i === currentPage ? `${base} bg-accent text-accent-foreground` : `${base} hover:bg-card`}
          aria-label={`Página ${i + 1}`} aria-current={i === currentPage ? "page" : undefined}>
          {i + 1}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages - 1 && <>
        {pages[pages.length - 1] < totalPages - 2 && <span className="px-2 text-muted-foreground" aria-hidden>…</span>}
        <button onClick={() => onPageChange(totalPages - 1)} className={`${base} hover:bg-card`} aria-label={`Página ${totalPages}`}>{totalPages}</button>
      </>}

      <button onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1}
        className={`${base} inline-flex items-center gap-1 hover:bg-card disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Página siguiente">
        <span className="hidden sm:inline">Siguiente</span><ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
}
