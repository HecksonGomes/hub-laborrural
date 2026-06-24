import { AppConfig } from './types';

export const DEFAULT_APPS: AppConfig[] = [
  {
    id: 'data-insights',
    title: 'Data Insights',
    description: 'Advanced analytics and reporting dashboards for business intelligence.',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // Demo visual URL or can be a custom redirect
    icon: 'BarChart3',
    color: 'teal',
    size: 'regular',
    isDefault: true,
    category: 'Analytics',
  },
  {
    id: 'sales-manager',
    title: 'Sales Manager',
    description: 'Complete CRM solution to track leads, pipelines, and close deals faster.',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    icon: 'Database',
    color: 'dark-teal',
    size: 'regular',
    isDefault: true,
    category: 'CRM',
  },
  {
    id: 'team-sync',
    title: 'Team Sync',
    description: 'Centralized communication platform for team collaboration and messaging.',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    icon: 'Users2',
    color: 'brown',
    size: 'regular',
    isDefault: true,
    category: 'Comunicação',
  },
  {
    id: 'resource-planner',
    title: 'Resource Planner',
    description: 'Comprehensive project management and resource allocation tool for enterprise teams.',
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    icon: 'Calendar',
    color: 'brown',
    size: 'wide',
    isDefault: true,
    category: 'Gestão',
  },
  {
    id: 'finance-hub',
    title: 'Finance Hub',
    description: 'Manage budgets, expenses, and financial forecasting securely.',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    icon: 'Landmark',
    color: 'mint',
    size: 'regular',
    isDefault: true,
    category: 'Finanças',
  }
];

export const CATEGORIES = [
  'Todos',
  'Analytics',
  'CRM',
  'Comunicação',
  'Gestão',
  'Finanças',
  'Outros'
];
