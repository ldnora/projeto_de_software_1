// app/planta/[slug]/page.tsx

import qs from "qs";
import Image from "next/image";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

async function getPlanta(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = process.env.PLANTAS_API_URL ?? "/api/plantas";
  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      imagem: { fields: ["alternativeText", "name", "url"] },
      qrcode: { fields: ["alternativeText", "name", "url"] },
    },
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao buscar planta");

  const data = await res.json();
  return data?.data?.[0] || null;
}

export default async function PlantaDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) return <Text>Nenhuma planta encontrada.</Text>;

  const plantaData = await getPlanta(slug);

  if (!plantaData) return <Text>Nenhuma planta encontrada.</Text>;

  // Checagem segura para imagem
  let imagemData = null;
  if (plantaData.imagem && plantaData.imagem.data) {
    imagemData = Array.isArray(plantaData.imagem.data)
      ? plantaData.imagem.data[0]
      : plantaData.imagem.data;
  }

  // Checagem segura para qrcode
  let qrcodeData = null;
  if (plantaData.qrcode && plantaData.qrcode.data) {
    qrcodeData = plantaData.qrcode.data;
  }

  const imageUrl = imagemData?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"}${imagemData.attributes.url}`
    : null;

  const qrcodeUrl = qrcodeData?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"}${qrcodeData.attributes.url}`
    : null;

  return (
    <Box maxW="2xl" mx="auto" my={8} p={6} bg="white" rounded="md" boxShadow="md">
      <Heading as="h1" size="xl" mb={2}>{plantaData.nome_popular}</Heading>
      <Text as="h2" fontSize="lg" fontStyle="italic" color="gray.500" mb={4}>
        {plantaData.nome_cientifico}
      </Text>
      {imageUrl && (
        <Box mb={4}>
          <Box position="relative" w="100%" h="350px" overflow="hidden" rounded="md">
            <Image
              src={imageUrl}
              alt={imagemData.attributes.alternativeText || plantaData.nome_popular}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </Box>
          {imagemData.attributes.alternativeText && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {imagemData.attributes.alternativeText}
            </Text>
          )}
        </Box>
      )}
      <Stack mb={4}>
        <Text><strong>Descrição:</strong> {plantaData.descricao}</Text>
        <Text><strong>Localização no Jardim:</strong> {plantaData.localizacao_jardim}</Text>
        <Text><strong>Categoria:</strong> {plantaData.categoria}</Text>
        <Text><strong>Slug:</strong> {plantaData.slug}</Text>
        {plantaData.latitude && plantaData.longitude && (
          <Text>
            <strong>Coordenadas:</strong> {plantaData.latitude}, {plantaData.longitude}
          </Text>
        )}
      </Stack>
      <Box mt={4} fontSize="xs" color="gray.400">
        <Text>
          <strong>Criada em:</strong> {new Date(plantaData.createdAt).toLocaleString()}
        </Text>
        <Text>
          <strong>Editada em:</strong> {new Date(plantaData.updatedAt).toLocaleString()}
        </Text>
        <Text>
          <strong>Publicada em:</strong> {new Date(plantaData.publishedAt).toLocaleString()}
        </Text>
        {plantaData.locale && (
          <Text>
            <strong>Idioma:</strong> {plantaData.locale}
          </Text>
        )}
      </Box>
    </Box>
  );
}
