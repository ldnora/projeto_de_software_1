export async function fetchAPI(path) {
  const res = await fetch(`${process.env.STRAPI_API_URL}${path}`);

  if (!res.ok) {
    console.error("Erro ao consultar a API: ", res.statusText);
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.data
}
