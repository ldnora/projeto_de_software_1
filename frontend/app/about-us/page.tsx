import { renderBloco } from "../utils/RenderBloco";
import { getPageData } from "../utils/GetPageData";

export default async function SobreNosPage() {
  const path = "/api/about-us";
  const nome_pagina = "Sobre nós";

  const aboutUsData = await getPageData(path, nome_pagina);
  const zonaDinamica = aboutUsData.data?.zona_dinamica ?? [];

  return <main>{zonaDinamica.map(renderBloco)}</main>;
}
