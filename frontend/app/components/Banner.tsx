"use client";
import Image from "next/image";

export default function Banner({ Banner }: { Banner: any }) {
  if (!Banner || !Banner.url) return null;
  const src = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337") + Banner.url;
  return (
    <section>
      <Image
        src={src}
        alt={Banner.alternativeText || Banner.name || "Banner"}
        width={1600}
        height={500}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        priority
      />
    </section>
  );
}