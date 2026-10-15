import { getBlogPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";
import { getTools } from "@/lib/constants/tools";
import { defaultLocale, locales, localePath } from "@/lib/i18n/config";

const INDEXNOW_KEY = "c037920ab6a84d4fa7129f7cf7c65306";

export async function GET() {
  const host = new URL(siteConfig.url).host;
  const tools = getTools(defaultLocale);
  const blogPosts = getBlogPosts(defaultLocale);

  const paths = [
    "/",
    "/tools",
    "/blog",
    "/company",
    "/pricing",
    "/privacy",
    "/terms",
    ...tools.map((t) => `/${t.slug}`),
    ...blogPosts.map((b) => `/blog/${b.slug}`),
  ];

  const urlList = locales.flatMap((locale) =>
    paths.map((path) => `${siteConfig.url}${localePath(locale, path)}`),
  );

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
