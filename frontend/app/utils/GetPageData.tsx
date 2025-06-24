import qs from "qs";

export async function getPageData(path: string, nome_pagina: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  const query = qs.stringify({
    populate: {
      zona_dinamica: {
        populate: "*", 
      },
    },
  });

  const url = `${baseUrl}${path}?${query}`;

  const res = await fetch(url, { next: { revalidate: 60 } }); // SSR + ISR se Next 13/14

  if (!res.ok) throw new Error(`Falha ao carregar a página "${nome_pagina}"`);

  const data = await res.json();

  return data;
}