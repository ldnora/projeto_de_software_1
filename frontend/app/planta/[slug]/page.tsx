import qs from "qs";
import Image from "next/image";
import { Box, Heading, Text, Stack, SimpleGrid } from "@chakra-ui/react";

async function getPlanta(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = process.env.PLANTAS_API_URL ?? "/api/plantas";
  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      imagem: { fields: ["alternativeText", "name", "url"] },
    },
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao buscar planta");
  const data = await res.json();
  return data?.data?.[0] || null;
}

export default async function PlantaDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  if (!slug) return <Text>Nenhuma planta encontrada.</Text>;

  const plantaData = await getPlanta(slug);

  if (!plantaData) return <Text>Nenhuma planta encontrada.</Text>;

  // Usa o array de objetos imagem normalmente
  const imagens: Array<{ url: string; alternativeText?: string; id?: string | number }> =
    plantaData.imagem || [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

  return (
    <Box maxW="3xl" mx="auto" my={8} p={{ base: 4, md: 8 }} bg="white" rounded="lg" boxShadow="lg">
      <Heading as="h1" size="2xl" mb={1} color="green.800">
        {plantaData.nome_popular}
      </Heading>
      <Text as="h2" fontSize="xl" fontStyle="italic" color="green.600" mb={6}>
        {plantaData.nome_cientifico}
      </Text>

      {imagens.length > 0 && (
        <SimpleGrid columns={{ base: 1, md: Math.min(imagens.length, 2) }} spacing={4} mb={8}>
          {imagens.map((img, idx) => {
            // Só renderiza se tiver URL válida
            if (!img?.url) return null;
            const src = `${baseUrl}${img.url}`;
            return (
              <Box key={img.id ?? idx} position="relative" w="full" h="320px" rounded="md" overflow="hidden" boxShadow="md">
                <Image
                  src={src}
                  alt={img.alternativeText || plantaData.nome_popular}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority={idx === 0}
                />
                {img.alternativeText && (
                  <Text fontSize="sm" color="gray.500" mt={2} px={2} pt={2}>
                    {img.alternativeText}
                  </Text>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      )}

      <Stack spacing={3} mb={6}>
        <Text fontSize="md" color="gray.800">
          <strong>Descrição:</strong> {plantaData.descricao}
        </Text>
        <Text fontSize="md" color="gray.700">
          <strong>Localização no Jardim:</strong> {plantaData.localizacao_jardim}
        </Text>
        {plantaData.latitude && plantaData.longitude && (
          <Text fontSize="md" color="gray.700">
            <strong>Coordenadas:</strong> {plantaData.latitude}, {plantaData.longitude}
          </Text>
        )}
      </Stack>
    </Box>
  );
}