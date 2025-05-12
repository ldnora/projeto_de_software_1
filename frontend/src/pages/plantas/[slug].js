import { fetchAPI } from "../../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Head from 'next/head';

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

    const paths = response.data.map((planta) => ({
      params: { slug: planta.slug },
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
  if (!planta) {
    return (
      <div className="min-h-screen p-6 bg-background" role="status" aria-label="Carregando informações da planta">
        <div className="container max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-6 px-4">
      <div className="container max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="space-y-4 bg-card">
            <div className="space-y-2">
              <CardTitle>
                <h1 className="text-3xl font-bold text-card-foreground">
                  {planta.nome_popular}
                </h1>
              </CardTitle>
              <p className="text-lg italic text-muted-foreground">
                {planta.nome_cientifico}
              </p>
            </div>
            {planta.categoria && (
              <Badge variant="secondary" className="text-sm">
                {planta.categoria}
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <section className="prose prose-slate dark:prose-invert">
              <h2 className="text-xl font-semibold text-card-foreground">Descrição da Planta</h2>
              <p className="text-card-foreground/90 leading-relaxed">
                {planta.descricao}
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-semibold text-card-foreground mb-2">Localização no Jardim</h3>
                <p className="text-muted-foreground">
                  {planta.localizacao_jardim || "Não especificada"}
                </p>
              </div>

              {planta.latitude && planta.longitude && (
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold text-card-foreground mb-2">Coordenadas</h3>
                  <p className="text-muted-foreground">
                    {planta.latitude}, {planta.longitude}
                  </p>
                </div>
              )}
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}