import { fetchAPI } from "../../lib/api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Head from 'next/head';

export async function getStaticPaths() {
  try {
    const response = await fetchAPI("/api/plantas");
    
    if (!response?.data) {
      return {
        paths: [],
        fallback: "blocking",
      };
    }

    const paths = response.data.map((planta) => ({
      params: { slug: planta.slug },
    }));

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

    if (!plantasResponse?.data?.[0]) {
      return { notFound: true };
    }

    return {
      props: {
        planta: plantasResponse.data[0],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Erro em getStaticProps:", error);
    return { notFound: true };
  }
}

export default function PlantaPage({ planta }) {
  // Estado de carregamento
  if (!planta) {
    return (
      <div 
        className="container px-4 py-8"
        role="status" 
        aria-label="Carregando informações da planta"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-6 w-3/5" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${planta.nome_popular} - Jardim Botânico`}</title>
        <meta name="description" content={planta.descricao?.substring(0, 160)} />
      </Head>

      {/* Skip Link */}
      <a 
        href="#conteudo-principal" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
      >
        Pular para o conteúdo principal
      </a>

      {/* Conteúdo Principal */}
      <div className="container px-4 py-8">
        <article className="max-w-2xl mx-auto space-y-6">
          {/* Cabeçalho da Planta */}
          <Card className="hover-card">
            <CardHeader>
              <div className="space-y-2">
                <h1 
                  className="heading-adaptive"
                  tabIndex={0}
                >
                  {planta.nome_popular}
                </h1>
                <p 
                  className="text-adaptive text-muted-foreground italic"
                  tabIndex={0}
                  aria-label={`Nome científico: ${planta.nome_cientifico}`}
                >
                  {planta.nome_cientifico}
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Descrição da Planta */}
          <section 
            id="conteudo-principal"
            aria-labelledby="descricao-titulo"
          >
            <Card className="hover-card">
              <CardContent className="pt-6">
                <h2 
                  id="descricao-titulo" 
                  className="text-xl font-semibold mb-4"
                  tabIndex={0}
                >
                  Descrição
                </h2>
                <p 
                  className="text-adaptive text-muted-foreground"
                  tabIndex={0}
                >
                  {planta.descricao}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Informações Adicionais */}
          <section aria-labelledby="info-titulo">
            <Card className="hover-card">
              <CardContent className="pt-6">
                <h2 
                  id="info-titulo" 
                  className="text-xl font-semibold mb-6"
                  tabIndex={0}
                >
                  Informações Adicionais
                </h2>

                <dl className="space-y-4">
                  {/* Localização */}
                  <div className="border-l-2 border-primary pl-4">
                    <dt className="font-semibold text-primary">
                      Localização no Jardim
                    </dt>
                    <dd 
                      className="mt-1 text-muted-foreground"
                      tabIndex={0}
                    >
                      {planta.localizacao_jardim || "Não especificada"}
                    </dd>
                  </div>

                  {/* Coordenadas */}
                  {planta.latitude && planta.longitude && (
                    <div className="border-l-2 border-primary pl-4">
                      <dt className="font-semibold text-primary">
                        Coordenadas Geográficas
                      </dt>
                      <dd 
                        className="mt-1 text-muted-foreground"
                        tabIndex={0}
                      >
                        {planta.latitude}, {planta.longitude}
                      </dd>
                    </div>
                  )}

                  {/* Categoria */}
                  {planta.categoria && (
                    <div className="border-l-2 border-primary pl-4">
                      <dt className="font-semibold text-primary">
                        Categoria
                      </dt>
                      <dd 
                        className="mt-1 text-muted-foreground"
                        tabIndex={0}
                      >
                        {planta.categoria}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </section>

          {/* Botão Voltar ao Topo */}
          <div className="flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="button button-secondary"
              aria-label="Voltar ao topo da página"
            >
              Voltar ao topo
            </button>
          </div>
        </article>
      </div>
    </>
  );
}