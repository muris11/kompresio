import {
  Archive,
  Code2,
  Crop,
  FileText,
  Gauge,
  Globe,
  ImageIcon,
  Layers,
  Lock,
  Maximize2,
  RefreshCcw,
  Search,
  ShieldCheck,
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
