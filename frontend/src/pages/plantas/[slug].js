import { fetchAPI } from "../../lib/api";

export async function getStaticPaths() {
  try {
    const response = await fetchAPI("/api/plantas");
    console.log("Resposta da API (getStaticPaths):", response);

    if (!response?.data) {
      console.error("Erro: A API não retornou dados válidos");
      return {
        paths: [],
        fallback: "blocking",
      };
    }

    const paths = response.data.map(planta => ({
      params: { slug: planta.slug }  
    }));

    console.log("Paths gerados:", paths);
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Erro em getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const query = `filters[slug][$eq]=${params.slug}`;
    const plantasResponse = await fetchAPI(`/api/plantas?${query}`);
    
    console.log("URL da requisição:", `/api/plantas?${query}`);
    console.log("Resposta da API (getStaticProps):", plantasResponse);

    if (!plantasResponse?.data?.[0]) {
      return { notFound: true };
    }

    return {
      props: {
        planta: plantasResponse.data[0] 
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Erro em getStaticProps:", error);
    return { notFound: true };
  }
}

export default function PlantaPage({ planta }) {
  if (!planta) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{planta.nome_popular}</h1>
      <p className="italic text-gray-600">{planta.nome_cientifico}</p>
      <p className="mt-4">{planta.descricao}</p>

      <div className="mt-6">
        <p>
          <strong>Localização no Jardim:</strong>{" "}
          {planta.localizacao_jardim || "Não especificada"}
        </p>
        {planta.latitude && planta.longitude && (
          <p>
            <strong>Coordenadas:</strong> {planta.latitude}, {planta.longitude}
          </p>
        )}
        {planta.categoria && (
          <p>
            <strong>Categoria:</strong> {planta.categoria}
          </p>
        )}
      </div>
    </div>
  );
}