import { ImageResponse } from "next/og";

import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = coerceLocale((await params).locale);
  const hero = getDictionary(locale).home.hero;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0079bd 0%, #0a5f8f 55%, #171a22 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 800 }}>Kompresio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.06 }}>
            {hero.title}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#d6ecf8" }}>
            {hero.description}
          </div>
          <div style={{ marginTop: 22, fontSize: 24, color: "#a9d5ec" }}>
            Developed by rifqysaputra.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
