import { ImageResponse } from "next/og";

import { getBlogPost } from "@/lib/constants/blog";
import { coerceLocale } from "@/lib/i18n/config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type BlogImageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function BlogOpenGraphImage({ params }: BlogImageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = coerceLocale(rawLocale);
  const post = getBlogPost(locale, slug);

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
            "linear-gradient(135deg, #0079bd 0%, #15803d 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}
        >
          <div style={{ fontWeight: 800 }}>Kompresio Blog</div>
          <div style={{ color: "#d6ecf8" }}>{post?.category || "Guide"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 900, lineHeight: 1.06 }}>
            {post?.title || "Image Optimization Guide"}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#e4f5ea",
              maxWidth: 960,
            }}
          >
            {post?.description ||
              "Practical image optimization tips from Kompresio."}
          </div>
          <div style={{ marginTop: 22, fontSize: 23, color: "#d6ecf8" }}>
            Developed by rifqysaputra.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
