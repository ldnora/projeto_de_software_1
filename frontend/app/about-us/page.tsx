import qs from "qs";
import Banner from "../components/Banner";
import BlocoDeTexto from "../components/BlocoDeTexto";
import Imagens from "../components/Imagens";

async function getAboutUsData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/about-us";
  const query = qs.stringify({
    populate: {
      zona_dinamica: {
        populate: "*",
      },
    },
  });
  const url = `${baseUrl}${path}?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Falha ao carregar página Sobre Nós");
  return res.json();
}

function renderBloco(bloco: any, idx: number) {
  switch (bloco.__component) {
    case "imagens.banner":
      return <Banner key={idx} Banner={bloco.Banner} />;
    case "texto.bloco-de-texto":
      return <BlocoDeTexto key={idx} texto={bloco.editor_de_texto} />;
    case "imagens.imagens":
      return <Imagens key={idx} imagens={bloco.imagens} />;
    default:
      return null;
  }
}

export default async function SobreNosPage() {
  const aboutUsData = await getAboutUsData();
  const zonaDinamica = aboutUsData.data?.zona_dinamica ?? [];

  return <main>{zonaDinamica.map(renderBloco)}</main>;
}
