// app/planta/[slug]/page.tsx

import qs from "qs";
import Image from "next/image";

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

  if (!slug) return <p>Nenhuma planta encontrada.</p>;

  const plantaData = await getPlanta(slug);

  if (!plantaData) return <p>Nenhuma planta encontrada.</p>;

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
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{plantaData.nome_popular}</h1>
      <h2 className="text-lg italic text-gray-500 mb-4">{plantaData.nome_cientifico}</h2>
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={imagemData.attributes.alternativeText || plantaData.nome_popular}
            width={500}
            height={350}
            className="rounded"
          />
          {imagemData.attributes.alternativeText && (
            <p className="text-sm text-gray-500">{imagemData.attributes.alternativeText}</p>
          )}
        </div>
      )}
      <p className="mb-2">
        <strong>Descrição:</strong> {plantaData.descricao}
      </p>
      <p className="mb-2">
        <strong>Localização no Jardim:</strong> {plantaData.localizacao_jardim}
      </p>
      <p className="mb-2">
        <strong>Categoria:</strong> {plantaData.categoria}
      </p>
      <p className="mb-2">
        <strong>Slug:</strong> {plantaData.slug}
      </p>
      {plantaData.latitude && plantaData.longitude && (
        <p className="mb-2">
          <strong>Coordenadas:</strong> {plantaData.latitude}, {plantaData.longitude}
        </p>
      )}
      {qrcodeUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">QR Code da Planta</h3>
          <img
            src={qrcodeUrl}
            alt={qrcodeData?.attributes?.alternativeText || "QR Code da planta"}
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
      )}
      <div className="mt-4 text-xs text-gray-400">
        <p>
          <strong>Criada em:</strong> {new Date(plantaData.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Editada em:</strong> {new Date(plantaData.updatedAt).toLocaleString()}
        </p>
        <p>
          <strong>Publicada em:</strong> {new Date(plantaData.publishedAt).toLocaleString()}
        </p>
        {plantaData.locale && (
          <p>
            <strong>Idioma:</strong> {plantaData.locale}
          </p>
        )}
      </div>
    </div>
  );
}
