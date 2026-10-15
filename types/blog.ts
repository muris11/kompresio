export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category:
    | "Compression"
    | "Formats"
    | "Resize"
    | "SEO"
    | "Privacy"
    | "Developer"
    | "Workflow"
    | "Document";
  readTime: string;
  publishedAt: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  relatedTools: string[];
};
