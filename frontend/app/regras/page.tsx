"use client";

import { getPageData } from "../utils/GetPageData";
import { renderBloco } from "../utils/RenderBloco";

export default async function RegrasPage() {
  const path = "/api/regras";
  const nome_pagina = "Regras";

  const regrasData = await getPageData(path, nome_pagina);
  const zonaDinamica = regrasData.data?.zona_dinamica ?? [];

  return <main>{zonaDinamica.map(renderBloco)}</main>;
}
