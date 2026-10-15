import {
  Archive,
  BadgeCheck,
  BookOpenText,
  Clock3,
  Code2,
  Crop,
  DatabaseZap,
  FileText,
  Gauge,
  Globe,
  ImageIcon,
  Layers,
  Lock,
  Maximize2,
  RefreshCcw,
  Rocket,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  archive: Archive,
  code: Code2,
  crop: Crop,
  file: FileText,
  gauge: Gauge,
  globe: Globe,
  image: ImageIcon,
  layers: Layers,
  lock: Lock,
  resize: Maximize2,
  refresh: RefreshCcw,
  search: Search,
  shield: ShieldCheck,
  zap: Zap,
  trending: TrendingUp,
  book: BookOpenText,
  clock: Clock3,
  database: DatabaseZap,
  trash: Trash2,
  rocket: Rocket,
  badge: BadgeCheck,
  alert: ShieldAlert,
  scale: Scale,
};

export function ToolIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name as keyof typeof iconMap] || ImageIcon;
  return <Icon className={cn("size-5", className)} aria-hidden="true" />;
}
