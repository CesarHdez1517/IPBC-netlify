import { useState } from "react";
import { Search, X } from "lucide-react";

interface Props {
  placeholder?: string;
  onSearch:     (q: string) => void;
  onClear?:     () => void;
  className?:   string;
  label?:       string;
}

export default function SearchBar({ placeholder = "Buscar...", onSearch, onClear, className = "", label = "Buscar" }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = query.trim();
    if (t) onSearch(t);
  };

  const handleClear = () => { setQuery(""); onClear?.(); };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} role="search" aria-label={label}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          className="w-full pl-10 pr-10 py-3 border border-border rounded-md bg-card text-foreground
                     placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent
                     transition-shadow"
        />
        {query && (
          <button type="button" onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Limpiar búsqueda">
            <X size={18} aria-hidden />
          </button>
        )}
      </div>
    </form>
  );
}
