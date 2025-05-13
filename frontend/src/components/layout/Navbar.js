import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container px-4 h-16 flex items-center justify-between">
        <Link 
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
          aria-label="Ir para página inicial"
        >
          Jardim Botânico
        </Link>
        
        <nav className="hidden md:flex space-x-6" role="navigation">
          <Link 
            href="/plantas"
            className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            Plantas
          </Link>
          <Link 
            href="/categorias"
            className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            Categorias
          </Link>
          <Link 
            href="/sobre"
            className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            Sobre
          </Link>
        </nav>

        <button
          className="md:hidden p-2 hover:bg-primary-foreground/10 rounded-md"
          aria-label="Abrir menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}