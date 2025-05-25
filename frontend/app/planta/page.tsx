import Image from "next/image";
import Link from "next/link";
import qs from "qs";

async function getPlantas() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = process.env.PLANTAS_API_URL ?? "/api/planta";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      imagem: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  console.log(res)

  if (!res.ok) throw new Error("Falha ao carregar as plantas");

  const data = await res.json();
  // console.log(data);

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
  latitude: Float16Array;
  longitude: Float16Array;
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
  descricao,
  imagem,
  slug,
}: Readonly<PlantaProps>) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${imagem[0].url}`;

  return (
    <Link
      href={`/planta/${slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={imagem[0].alternativeText || imagem[0].name}
        width={500}
        height={500}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{imagem[0].name}</h3>
        <p className="text-gray-600">{descricao}</p>
      </div>
    </Link>
  );
}
export default async function Plantas() {
  const teamMembers = await getPlantas();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.data.map((member: PlantaProps) => (
          <PlantaCard key={member.documentId} {...member} />
        ))}
      </div>
    </div>
  );
}
