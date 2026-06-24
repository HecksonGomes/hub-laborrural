export interface AppConfig {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string; // Lucide icon identifier
  color: 'teal' | 'dark-teal' | 'brown' | 'mint' | 'orange' | 'slate';
  size: 'regular' | 'wide';
  isDefault: boolean;
  category: string;
}

export type AppColorTheme = AppConfig['color'];
export type AppSize = AppConfig['size'];
