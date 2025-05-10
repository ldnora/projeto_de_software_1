import path from "path";
import { fetchAPI } from "../../lib/api";

export async function getStaticPaths() {
  const plantas = await fetchAPI("/plantas"); 

  console.log('PLANTAS: \n', plantas);
  
  const paths = plantas.map((planta) => ({
    params: { slug: planta.slug },
  }));

  console.log('PATHS: \n', paths)

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
    const planta = await fetchAPI(`/plantas?slug=${params.slug}`);
  
    // Verificar se a planta foi encontrada
    if (!planta || planta.length === 0) {
      return { notFound: true };
    }
  
    const plantaSelecionada = {
      nome_popular: planta[0].nome_popular || null,
      nome_cientifico: planta[0].nome_cientifico || null,
      descricao: planta[0].descricao || null,
      descricao_imagem: planta[0].descricao_imagem || null,
      slug: planta[0].slug || null,
      localizacao_jardim: planta[0].localizacao_jardim || null,
      latitude: planta[0].latitude || null,
      longitude: planta[0].longitude || null,
      categoria: planta[0].categoria || null,
    };
  
    return {
      props: { planta: plantaSelecionada },
      revalidate: 60,
    };
  }

export default function PlantaPage({ planta }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{planta.nome_popular}</h1>
      <p className="italic text-gray-600">{planta.nome_cientifico}</p>
      <p className="mt-4">{planta.descricao}</p>

      {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {planta.imagem.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={planta.descricao_imagem}
            className="rounded shadow"
          />
        ))}
      </div> */}

      <p className="mt-4">
        <strong>Localização no Jardim:</strong> {planta.localizacao_jardim}
      </p>
      <p>
        <strong>Coordenadas:</strong> {planta.latitude}, {planta.longitude}
      </p>
      <p>
        <strong>Categoria:</strong> {planta.categoria}
      </p>
    </div>
  );
}
