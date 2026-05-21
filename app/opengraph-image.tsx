import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 55%, #06b6d4 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 800 }}>Kompresio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.05 }}>
            Compress and convert images in seconds
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#dbeafe" }}>
            Fast, private, browser-based image optimization.
          </div>
          <div style={{ marginTop: 22, fontSize: 24, color: "#bfdbfe" }}>
            Developed by rifqysaputra.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
