import { fetchAPI } from "../../lib/api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  if (!planta) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-[200px] mb-4" />
        <Skeleton className="h-4 w-[300px] mb-8" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {planta.nome_popular}
            </h1>
            <p className="text-muted-foreground italic">
              {planta.nome_cientifico}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="prose">
              <p>{planta.descricao}</p>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div>
                <strong className="text-primary">Localização no Jardim: </strong>
                <span className="text-muted-foreground">
                  {planta.localizacao_jardim || "Não especificada"}
                </span>
              </div>

              {planta.latitude && planta.longitude && (
                <div>
                  <strong className="text-primary">Coordenadas: </strong>
                  <span className="text-muted-foreground">
                    {planta.latitude}, {planta.longitude}
                  </span>
                </div>
              )}

              {planta.categoria && (
                <div>
                  <strong className="text-primary">Categoria: </strong>
                  <span className="text-muted-foreground">
                    {planta.categoria}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}