"use client";

import { getPageData } from "./utils/GetPageData";
import { renderBloco } from "./utils/RenderBloco";

export default async function HomePage() {
  const path = "/api/home";
  const nome_pagina = "Home";

  const homeData = await getPageData(path, nome_pagina);
  const zonaDinamica = homeData.data?.zona_dinamica ?? [];

  return <main>{zonaDinamica.map(renderBloco)}</main>;
}
