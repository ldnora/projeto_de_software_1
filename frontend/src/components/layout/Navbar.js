import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <nav className="container px-4 h-14 flex items-center" role="navigation" aria-label="Principal">
        <Link 
          href="/"
          className="text-lg font-semibold hover:text-primary transition-colors"
          aria-label="Ir para página inicial"
        >
          Jardim Botânico
        </Link>
        
        <button
          className="ml-auto md:hidden p-2"
          aria-label="Abrir menu de navegação"
        >
          <span className="sr-only">Menu</span>
          {/* Ícone de menu aqui */}
        </button>
      </nav>
    </header>
  );
}