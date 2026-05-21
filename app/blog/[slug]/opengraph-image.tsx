import { ImageResponse } from "next/og";

import { getBlogPost } from "@/lib/constants/blog";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type BlogImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogOpenGraphImage({ params }: BlogImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 58%, #10b981 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <div style={{ fontWeight: 800 }}>Kompresio Blog</div>
          <div style={{ color: "#dbeafe" }}>{post?.category || "Guide"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 900, lineHeight: 1.04 }}>
            {post?.title || "Image Optimization Guide"}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#dbeafe", maxWidth: 920 }}>
            {post?.description || "Practical image optimization tips from Kompresio."}
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
