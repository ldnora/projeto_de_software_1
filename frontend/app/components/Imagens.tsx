export default function Imagens({ imagens }: { imagens: any[] }) {
  if (!imagens?.length) return null;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  return (
    <section style={{ display: "flex", gap: 12 }}>
      {imagens.map((img, i) => (
        <img
          key={i}
          src={baseUrl + img.url}
          alt={img.alternativeText || img.name}
          style={{ maxWidth: 300, borderRadius: 8 }}
        />
      ))}
    </section>
  );
}