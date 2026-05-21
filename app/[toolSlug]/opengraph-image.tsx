import { ImageResponse } from "next/og";

import { getTool } from "@/lib/constants/tools";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ToolImageProps = {
  params: Promise<{
    toolSlug: string;
  }>;
};

export default async function ToolOpenGraphImage({ params }: ToolImageProps) {
  const { toolSlug } = await params;
  const tool = getTool(toolSlug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020617 0%, #1d4ed8 62%, #06b6d4 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <div style={{ fontWeight: 800 }}>Kompresio</div>
          <div style={{ color: "#bfdbfe" }}>{tool?.category || "Image tool"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.04 }}>
            {tool?.h1 || "Image Optimization Tool"}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#dbeafe", maxWidth: 900 }}>
            {tool?.description ||
              "Fast, private, browser-based image optimization with Kompresio."}
          </div>
          <div style={{ marginTop: 22, fontSize: 23, color: "#bfdbfe" }}>
            Developed by rifqysaputra.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
