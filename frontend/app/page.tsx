"use client";

import qs from "qs";
import Banner from "./components/Banner";
import BlocoDeTexto from "./components/BlocoDeTexto";

async function getHomeData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/home";

  const query = qs.stringify({
    populate: {
      zona_dinamica: {
        populate: "*", // ou especifique os campos dos componentes, se quiser limitar
      },
    },
  });

  const url = `${baseUrl}${path}?${query}`;

  const res = await fetch(url, { next: { revalidate: 60 } }); // SSR + ISR se Next 13/14

  if (!res.ok) throw new Error("Falha ao carregar a página Home");

  const data = await res.json();

  return data;
}

function renderBloco(bloco: any, idx: number) {
  switch (bloco.__component) {
    case "imagens.banner":
      return <Banner key={idx} Banner={bloco.Banner} />;
    case "texto.bloco-de-texto":
      return <BlocoDeTexto key={idx} texto={bloco.editor_de_texto} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const homeData = await getHomeData();
  const zonaDinamica = homeData.data?.zona_dinamica ?? [];

  return <main>{zonaDinamica.map(renderBloco)}</main>;
}
