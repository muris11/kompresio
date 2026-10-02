import { blogPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";
import { tools } from "@/lib/constants/tools";

const INDEXNOW_KEY = "c037920ab6a84d4fa7129f7cf7c65306";

export async function GET() {
  const host = new URL(siteConfig.url).host;

  const urlList = [
    `${siteConfig.url}/`,
    `${siteConfig.url}/tools`,
    `${siteConfig.url}/blog`,
    `${siteConfig.url}/company`,
    `${siteConfig.url}/pricing`,
    `${siteConfig.url}/privacy`,
    `${siteConfig.url}/terms`,
    ...tools.map((t) => `${siteConfig.url}/${t.slug}`),
    ...blogPosts.map((b) => `${siteConfig.url}/blog/${b.slug}`),
  ];

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    return Response.json({
      success: response.ok,
      status: response.status,
      submittedUrlsCount: urlList.length,
      message: response.ok
        ? `Successfully submitted ${urlList.length} URLs to IndexNow for immediate search engine indexing.`
        : `IndexNow submission returned status ${response.status}`,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        submittedUrlsCount: urlList.length,
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  return GET();
}
