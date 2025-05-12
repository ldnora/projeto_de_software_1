export default function Footer() {
  return (
    <footer className="border-t py-6 mt-8" role="contentinfo">
      <div className="container px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Jardim Botânico. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}