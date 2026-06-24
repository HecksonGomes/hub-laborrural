import React from 'react';
import {
  BarChart3,
  Database,
  Users2,
  Calendar,
  Landmark,
  Briefcase,
  Settings,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  Link,
  Plus,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  Clock,
  MapPin,
  ClipboardList,
  Activity,
  Globe,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Database,
  Users2,
  Calendar,
  Landmark,
  Briefcase,
  Settings,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  Link,
  Plus,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  Clock,
  MapPin,
  ClipboardList,
  Activity,
  Globe
};

interface AppIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function AppIcon({ name, className = '', size = 24 }: AppIconProps) {
  const IconComponent = iconMap[name] || Link;
  return <IconComponent className={className} size={size} />;
}

export const AVAILABLE_ICONS = Object.keys(iconMap);
export { iconMap };
