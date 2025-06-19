export default function BlocoDeTexto({ texto }: { texto: string }) {
  return (
    <section className="bloco-texto" style={{maxWidth: 700, margin: "2rem auto", fontSize: "1.15rem", lineHeight: 1.75}}>
      {texto.split("\n").map((linha, i) => (
        <p key={i} style={{marginBottom: "1em"}}>{linha}</p>
      ))}
    </section>
  );
}