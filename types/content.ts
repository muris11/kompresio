import type { Locale } from "@/lib/i18n/config";

export type IconName =
  | "shield"
  | "gauge"
  | "file"
  | "clock"
  | "database"
  | "trash"
  | "rocket"
  | "globe"
  | "code"
  | "lock"
  | "badge"
  | "alert"
  | "scale"
  | "image"
  | "trending"
  | "book";

export type IconCard = {
  title: string;
  description: string;
  icon: IconName;
};

export type LinkCard = IconCard & { href: string };

export type Metric = { label: string; value: string };

export type Testimonial = { quote: string; name: string; role: string };

export type HomeContent = {
  testimonials: Testimonial[];
  faqs: Array<{ question: string; answer: string }>;
};

export type BlogIndexContent = {
  learningPaths: LinkCard[];
};

export type PrivacyContent = {
  sections: Array<{ title: string; body: string; icon: IconName }>;
  boundaries: string[];
};

export type TermsContent = {
  sections: Array<{ title: string; body: string; icon: IconName }>;
};

export type CompanyContent = {
  stats: Array<{ label: string; value: string; description: string }>;
  principles: IconCard[];
  resources: LinkCard[];
};

export type PricingContent = {
  plans: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    icon: IconName;
    badge: string;
    featured: boolean;
    href: string;
    cta: string;
    features: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
};

export type PageContent = {
  locale: Locale;
  home: HomeContent;
  blogIndex: BlogIndexContent;
  privacy: PrivacyContent;
  terms: TermsContent;
  company: CompanyContent;
  pricing: PricingContent;
};
