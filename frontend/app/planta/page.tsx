import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import {
  Box,
  Badge,
  Heading,
  Text,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Tooltip,
  Stack
} from "@chakra-ui/react";

async function getPlantas() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = process.env.PLANTAS_API_URL ?? "/api/plantas";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      imagem: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Falha ao carregar as plantas");

  const data = await res.json();
  return data;
}

interface PlantaProps {
  id: number;
  documentId: string;
  nome_popular: string;
  nome_cientifico: string;
  descricao: string;
  descricao_imagem: string;
  localizacao_jardim: string;
  latitude: number;
  longitude: number;
  categoria: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  imagem: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  }[];
}

function PlantaCard({
  nome_popular,
  nome_cientifico,
  descricao_imagem,
  imagem,
  slug,
  categoria,
  // qrcode,
}: Readonly<PlantaProps>) {
  const imageUrl = 
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"}${imagem[0]?.url ?? ""}`;

  return (
    <LinkBox
      as="article"
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      overflow="hidden"
      transition="box-shadow 0.25s, transform 0.2s"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-4px) scale(1.02)",
      }}
      display="flex"
      flexDirection="column"
      h="100%"
    >
      <Box position="relative" w="full" h="240px" overflow="hidden">
        <Image
          src={imageUrl}
          alt={descricao_imagem}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s",
          }}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
        <Badge
          position="absolute"
          top={2}
          left={2}
          colorScheme="green"
          borderRadius="md"
          px={3}
          py={1}
          fontSize="0.85em"
          boxShadow="sm"
          bg="whiteAlpha.800"
        >
          {categoria}
        </Badge>
      </Box>
      <Stack spacing={2} p={6} flex="1">
        <Heading as="h3" size="md" mb={1}>
          <LinkOverlay as={Link} href={`/planta/${slug}`}>
            {nome_cientifico}
          </LinkOverlay>
        </Heading>
        <Text color="green.700" fontWeight="semibold">
          {nome_popular}
        </Text>
      </Stack>
    </LinkBox>
  );
}

export default async function Plantas() {
  const plantas = await getPlantas();

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 2, md: 10 }} py={12}>
      <Heading
        as="h1"
        size="2xl"
        fontWeight="bold"
        mb={10}
        textAlign="center"
        color="green.800"
        letterSpacing="tight"
      >
        Catálogo do Jardim Botânico 
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
        {plantas.data.map((member: PlantaProps) => (
          <PlantaCard key={member.documentId} {...member} />
        ))}
      </SimpleGrid>
    </Box>
  );
}