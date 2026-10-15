import { ImageResponse } from "next/og";

import { getTool } from "@/lib/constants/tools";
import { coerceLocale } from "@/lib/i18n/config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ToolImageProps = {
  params: Promise<{
    locale: string;
    toolSlug: string;
  }>;
};

export default async function ToolOpenGraphImage({ params }: ToolImageProps) {
  const { locale: rawLocale, toolSlug } = await params;
  const locale = coerceLocale(rawLocale);
  const tool = getTool(locale, toolSlug);

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
            "linear-gradient(135deg, #0079bd 0%, #0a5f8f 60%, #171a22 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}
        >
          <div style={{ fontWeight: 800 }}>Kompresio</div>
          <div style={{ color: "#bfe0f2" }}>{tool?.category || "Image tool"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, fontWeight: 900, lineHeight: 1.05 }}>
            {tool?.h1 || "Image Optimization Tool"}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#d6ecf8",
              maxWidth: 940,
            }}
          >
            {tool?.description ||
              "Fast, private, browser-based image optimization with Kompresio."}
          </div>
          <div style={{ marginTop: 22, fontSize: 23, color: "#a9d5ec" }}>
            Developed by rifqysaputra.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
