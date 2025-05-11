export async function fetchAPI(path) {
  const apiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
  const fullUrl = `${apiUrl}${path}`;

  console.log(fullUrl);
  
  const res = await fetch(fullUrl);
  
  if (!res.ok) {
    console.error("Erro ao buscar dados da API:", res.statusText);
    throw new Error("Falha ao buscar dados da API");
  }

  const data = await res.json();
  return data;
}