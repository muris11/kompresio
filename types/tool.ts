export type ToolMode =
  | "compress"
  | "webp"
  | "avif"
  | "resize"
  | "crop"
  | "remove-bg"
  | "metadata"
  | "batch"
  | "analyzer"
  | "pdf"
  | "heic";

export type ToolDefinition = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  icon: string;
  mode: ToolMode;
  primaryAction: string;
  primaryKeyword: string;
  category:
    | "Compression"
    | "Conversion"
    | "Resize"
    | "Privacy"
    | "Batch"
    | "Utility";
  supportedFormats: string[];
  benefits: string[];
  steps: string[];
  useCases: string[];
  related: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};
