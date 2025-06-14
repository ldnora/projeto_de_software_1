// app/planta/page.tsx

import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import { Box, Heading, Text, SimpleGrid, LinkBox, LinkOverlay } from "@chakra-ui/react";

async function getPlantas() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = process.env.PLANTAS_API_URL ?? "/api/plantas";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      imagem: {
        fields: ["alternativeText", "name", "url"],
      },
      qrcode: {
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
  qrcode?: {
    id: number;
    alternativeText: string;
    name: string;
    url: string;
  } | null;
}

function PlantaCard({
  nome_popular,
  nome_cientifico,
  descricao_imagem,
  imagem,
  slug,
  qrcode,
}: Readonly<PlantaProps>) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${imagem[0]?.url ?? ""}`;

  return (
    <LinkBox
      as="article"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "xl" }}
    >
<<<<<<< HEAD
      <Image src={imageUrl} alt={descricao_imagem} width={500} height={500} />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{nome_cientifico}</h3>
        <p className="text-gray-600">{nome_popular}</p>
        {qrcode && qrcode.url && (
          <div className="mt-4">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"}${qrcode.url}`}
              alt={qrcode.alternativeText || "QR Code da planta"}
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </Link>
=======
      <Box position="relative" w="full" h="260px" overflow="hidden">
        <Image
          src={imageUrl}
          alt={descricao_imagem}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </Box>
      <Box p={6}>
        <Heading as="h3" size="md" mb={2}>
          <LinkOverlay as={Link} href={`/planta/${slug}`}>
            {nome_cientifico}
          </LinkOverlay>
        </Heading>
        <Text color="gray.600">{nome_popular}</Text>
      </Box>
    </LinkBox>
>>>>>>> frontend-chakra
  );
}

export default async function Plantas() {
  const plantas = await getPlantas();

  return (
    <Box>
      <Heading as="h1" size="xl" fontWeight="bold" mb={8}>
        Acervo
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {plantas.data.map((member: PlantaProps) => (
          <PlantaCard key={member.documentId} {...member} />
        ))}
      </SimpleGrid>
    </Box>
  );
}