/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Settings, 
  HelpCircle, 
  Bell, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  X, 
  Check, 
  AlertCircle, 
  Download, 
  Upload, 
  User, 
  ArrowLeft,
  ChevronDown,
  Globe,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { AppConfig, AppColorTheme, AppSize } from './types';
import { DEFAULT_APPS, CATEGORIES } from './data';
import { AppIcon, AVAILABLE_ICONS } from './components/AppIcon';

// Simulators
import { 
  DataInsightsSimulator, 
  SalesManagerSimulator, 
  TeamSyncSimulator, 
  ResourcePlannerSimulator, 
  FinanceHubSimulator, 
  CustomAppSimulator 
} from './components/Simulators';

export default function App() {
  // State
  const [apps, setApps] = useState<AppConfig[]>(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#config=')) {
        const base64Data = hash.replace('#config=', '');
        const decodedStr = decodeURIComponent(atob(base64Data));
        const parsed = JSON.parse(decodedStr);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Erro ao decodificar config da URL:', e);
    }

    const saved = localStorage.getItem('labor_rural_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Erro ao decodificar apps salvos:', e);
      }
    }
    return DEFAULT_APPS;
  });

  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedAppForWorkspace, setSelectedAppForWorkspace] = useState<AppConfig | null>(null);
  
  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppForEdit, setSelectedAppForEdit] = useState<AppConfig | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Form state for creating/editing apps
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formIcon, setFormIcon] = useState('Link');
  const [formColor, setFormColor] = useState<AppColorTheme>('teal');
  const [formSize, setFormSize] = useState<AppSize>('regular');
  const [formCategory, setFormCategory] = useState('Outros');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('labor_rural_apps', JSON.stringify(apps));
      const jsonStr = JSON.stringify(apps);
      const base64Data = btoa(encodeURIComponent(jsonStr));
      window.history.replaceState(null, '', `#config=${base64Data}`);
    } catch (e) {
      console.error('Erro ao salvar config na URL:', e);
    }
  }, [apps]);

  // Open modal in edit mode
  const handleOpenEditModal = (app: AppConfig) => {
    setSelectedAppForEdit(app);
    setFormTitle(app.title);
    setFormDesc(app.description);
    setFormUrl(app.url);
    setFormIcon(app.icon);
    setFormColor(app.color);
    setFormSize(app.size);
    setFormCategory(app.category);
    setIsEditModalOpen(true);
  };

  // Open modal in create mode
  const handleOpenCreateModal = () => {
    setSelectedAppForEdit(null);
    setFormTitle('');
    setFormDesc('');
    setFormUrl('');
    setFormIcon('Globe');
    setFormColor('teal');
    setFormSize('regular');
    setFormCategory('Outros');
    setIsEditModalOpen(true);
  };

  // Delete App
  const handleDeleteApp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja remover este aplicativo do portal?')) {
      setApps(apps.filter(app => app.id !== id));
      if (selectedAppForWorkspace?.id === id) {
        setSelectedAppForWorkspace(null);
      }
    }
  };

  // Save/Edit App
  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (selectedAppForEdit) {
      // Editing existing app
      setApps(apps.map(app => {
        if (app.id === selectedAppForEdit.id) {
          const updated = {
            ...app,
            title: formTitle,
            description: formDesc,
            url: formUrl || '#',
            icon: formIcon,
            color: formColor,
            size: formSize,
            category: formCategory
          };
          // Sync workspace view if currently open
          if (selectedAppForWorkspace?.id === app.id) {
            setSelectedAppForWorkspace(updated);
          }
          return updated;
        }
        return app;
      }));
    } else {
      // Creating new app
      const newApp: AppConfig = {
        id: `app-${Date.now()}`,
        title: formTitle,
        description: formDesc,
        url: formUrl || '#',
        icon: formIcon,
        color: formColor,
        size: formSize,
        isDefault: false,
        category: formCategory
      };
      setApps([...apps, newApp]);
    }

    setIsEditModalOpen(false);
  };

  // Reset to original mockup apps
  const handleResetToDefaults = () => {
    if (confirm('Deseja restaurar as configurações originais do Portal? Isso substituirá as suas alterações atuais.')) {
      setApps(DEFAULT_APPS);
      setSelectedAppForWorkspace(null);
      setEditMode(false);
    }
  };

  // Share Configuration via URL
  const handleCopyShareableLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copiável gerado com sucesso! Envie este link para replicar esta configuração.');
    }).catch(() => {
      alert('Erro ao copiar link. Por favor, copie a URL do navegador manualmente.');
    });
  };

  // Filtered Apps
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = 
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'Todos' || 
        app.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, selectedCategory]);

  // Color helper styles
  const getColorStyles = (color: AppColorTheme) => {
    switch (color) {
      case 'teal':
        return {
          border: 'border-t-4 border-t-blue-600',
          iconBg: 'bg-indigo-50 text-indigo-600',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          hoverBorder: 'hover:border-blue-600/30'
        };
      case 'dark-teal':
        return {
          border: 'border-t-4 border-t-slate-800',
          iconBg: 'bg-rose-50 text-rose-600',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          hoverBorder: 'hover:border-slate-800/30'
        };
      case 'brown':
        return {
          border: 'border-t-4 border-t-amber-600',
          iconBg: 'bg-amber-50 text-amber-600',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          hoverBorder: 'hover:border-amber-600/30'
        };
      case 'mint':
        return {
          border: 'border-t-4 border-t-emerald-600',
          iconBg: 'bg-emerald-50 text-emerald-600',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          hoverBorder: 'hover:border-emerald-600/30'
        };
      case 'orange':
        return {
          border: 'border-t-4 border-t-orange-600',
          iconBg: 'bg-orange-50 text-orange-600',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          hoverBorder: 'hover:border-orange-600/30'
        };
      case 'slate':
      default:
        return {
          border: 'border-t-4 border-t-slate-500',
          iconBg: 'bg-slate-100 text-slate-600',
          btnBg: 'bg-slate-800 hover:bg-slate-900 text-white',
          hoverBorder: 'hover:border-slate-500/30'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* BACKGROUND TEXTURE WATERMARK */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-0" />

      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95 px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setSelectedAppForWorkspace(null)} 
            className="flex items-center gap-3 cursor-pointer group"
            id="header-brand"
          >
            {/* Styled Logo SVG evoking tech-agricultural leaf with clean brand color */}
            <div className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg shadow-sm transform group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 22h20L12 2z" strokeLinejoin="round" />
                <path d="M12 8l6 10H6l6-10z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg text-slate-800 tracking-tight leading-none">Labor Rural</span>
              <span className="font-mono text-[9px] text-blue-600 tracking-widest font-bold uppercase mt-0.5">Portal Hub</span>
            </div>
          </div>

          {/* Right Header Navigation Utilities */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Quick Toggle for Edit Mode */}
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                editMode 
                  ? 'bg-safety-orange/10 text-safety-orange border-safety-orange/30' 
                  : 'bg-off-white text-gray-500 hover:text-primary border-gray-200'
              }`}
              title="Alternar Modo de Edição de Links"
              id="edit-mode-toggle"
            >
              <Sliders size={14} className={editMode ? 'animate-pulse' : ''} />
              <span className="hidden md:inline">{editMode ? 'Modo Editor Ativo' : 'Gerenciar Links'}</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => { setNotifOpen(!notifOpen); setHelpOpen(false); setProfileOpen(false); }}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer relative"
                id="notifications-btn"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-safety-orange rounded-full" />
              </button>
              
              <AnimatePresence>
                {notifOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50 text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                      <h4 className="font-display font-bold text-primary uppercase">Notificações</h4>
                      <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-2.5 p-1.5 rounded hover:bg-off-white">
                        <div className="w-2 h-2 bg-neon-mint rounded-full mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Bem-vindo ao Portal Labor Rural!</p>
                          <p className="text-gray-500 text-[10px] mt-0.5">Clique em "Gerenciar Links" no topo para alterar os endereços de destino.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 p-1.5 rounded hover:bg-off-white">
                        <div className="w-2 h-2 bg-safety-orange rounded-full mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Uso de Iframe e Redirecionamento</p>
                          <p className="text-gray-500 text-[10px] mt-0.5">Caso registre links externos corporativos, o portal abrirá no Sandbox ou nova aba segura.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Help / Info */}
            <div className="relative">
              <button 
                onClick={() => { setHelpOpen(!helpOpen); setNotifOpen(false); setProfileOpen(false); }}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                id="help-btn"
              >
                <HelpCircle size={20} />
              </button>

              <AnimatePresence>
                {helpOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50 text-xs text-gray-600 space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-1">
                      <h4 className="font-display font-bold text-primary uppercase">Como Configurar</h4>
                      <button onClick={() => setHelpOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                    </div>
                    <p>Você pode configurar os links ("ABRIR APP") clicando em <strong className="text-safety-orange">Gerenciar Links</strong>.</p>
                    <p>Ao ativar, cada card exibirá um botão <strong>Editar Link</strong> para você inserir URLs reais da sua empresa, planilhas do Google Sheets ou contatos comerciais.</p>
                    <p>O portal também possui simuladores locais integrados de alta-fidelidade para demonstração imediata do fluxo.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setHelpOpen(false); setNotifOpen(false); }}
                className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 transition-all cursor-pointer"
                id="profile-dropdown-btn"
              >
                <div className="w-8 h-8 rounded-full bg-deep-forest text-neon-mint font-display font-bold flex items-center justify-center text-sm shadow-inner border border-secondary/20">
                  HS
                </div>
                <ChevronDown size={14} className="text-gray-500 hidden sm:inline" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1.5 z-50 text-xs font-sans"
                  >
                    <div className="px-3.5 py-2 border-b border-gray-100">
                      <p className="font-bold text-gray-800">Heckson Silva</p>
                      <p className="text-gray-400 text-[10px] font-mono">heckson.silva10@gmail.com</p>
                    </div>
                    
                    <button 
                      onClick={() => { setEditMode(!editMode); setProfileOpen(false); }}
                      className="w-full text-left px-3.5 py-2 hover:bg-off-white text-gray-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Sliders size={14} /> {editMode ? 'Desativar Editor' : 'Gerenciar Aplicativos'}
                    </button>

                    <button 
                      onClick={() => { handleCopyShareableLink(); setProfileOpen(false); }}
                      className="w-full text-left px-3.5 py-2 hover:bg-off-white text-gray-700 flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink size={14} /> Copiar Link Compartilhável
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button 
                      onClick={handleResetToDefaults}
                      className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <RefreshCw size={14} /> Redefinir Padrões
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </header>

      {/* ADMIN FLOATING SYSTEM NOTIFICATION BANNER */}
      <AnimatePresence>
        {editMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-white border-b border-secondary/30 text-xs overflow-hidden z-30"
          >
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-safety-orange animate-ping" />
                <span className="text-neon-mint font-bold">[MODO EDITOR ATIVO]</span>
                <span className="text-gray-300">Altere os links cadastrados de direcionamento clicando nos ícones de lápis.</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopyShareableLink}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-semibold font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink size={12} />
                  Copiar Link Compartilhável
                </button>
                <button 
                  onClick={handleResetToDefaults}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  Restaurar Hub
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE WORKSPACE IF APPLICABLE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 z-10 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {selectedAppForWorkspace ? (
            
            // SCREEN 2: THE EMBEDDED WORKSPACE SIMULATION
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-md border border-gray-200/60 shadow-lg overflow-hidden flex flex-col flex-1 min-h-[550px]"
              id="app-workspace"
            >
              {/* Workspace Controls Header */}
              <div className="bg-primary text-white p-4 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedAppForWorkspace(null)}
                    className="p-1.5 rounded hover:bg-white/10 text-neon-mint transition-colors cursor-pointer flex items-center justify-center"
                    title="Voltar ao Painel Principal"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/15 rounded text-neon-mint">
                        <AppIcon name={selectedAppForWorkspace.icon} size={16} />
                      </div>
                      <h2 className="text-lg font-display font-bold leading-none">{selectedAppForWorkspace.title}</h2>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wide">
                      Workspace Integrado de Produção
                    </span>
                  </div>
                </div>

                {/* Simulated Address Bar */}
                <div className="hidden md:flex flex-1 max-w-lg bg-black/30 rounded border border-white/10 px-3 py-1 items-center gap-2 mx-4 text-xs font-mono text-gray-300">
                  <Globe size={12} className="text-secondary" />
                  <span className="truncate select-all flex-1">{selectedAppForWorkspace.url}</span>
                  <span className="text-[9px] bg-secondary/20 text-neon-mint px-1 rounded uppercase">Seguro</span>
                </div>

                {/* Workspace Right Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button 
                    onClick={() => window.open(selectedAppForWorkspace.url, '_blank')}
                    className="bg-secondary hover:bg-secondary/90 text-white font-mono text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5"
                    title="Abrir URL real configurada em uma nova aba"
                  >
                    <ExternalLink size={13} />
                    <span>Abrir em Nova Aba</span>
                  </button>
                  <button 
                    onClick={() => {
                      const temp = selectedAppForWorkspace;
                      setSelectedAppForWorkspace(null);
                      setTimeout(() => setSelectedAppForWorkspace(temp), 10);
                    }}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    title="Recarregar Ambiente"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Simulators or Custom URL frame wrapper */}
              <div className="bg-bg-rural flex-1 min-h-[450px]">
                {selectedAppForWorkspace.id === 'data-insights' ? (
                  <DataInsightsSimulator />
                ) : selectedAppForWorkspace.id === 'sales-manager' ? (
                  <SalesManagerSimulator />
                ) : selectedAppForWorkspace.id === 'team-sync' ? (
                  <TeamSyncSimulator />
                ) : selectedAppForWorkspace.id === 'resource-planner' ? (
                  <ResourcePlannerSimulator />
                ) : selectedAppForWorkspace.id === 'finance-hub' ? (
                  <FinanceHubSimulator />
                ) : (
                  <CustomAppSimulator 
                    title={selectedAppForWorkspace.title} 
                    description={selectedAppForWorkspace.description} 
                    url={selectedAppForWorkspace.url} 
                    accentColor={selectedAppForWorkspace.color}
                  />
                )}
              </div>
              
              {/* Workspace Footer Alert */}
              <div className="bg-off-white border-t border-gray-100 p-3 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span>STATUS: AMBIENTE INTEGRADO ATIVO</span>
                <span>DESENVOLVIDO PARA LABOR RURAL</span>
              </div>

            </motion.div>

          ) : (

            // SCREEN 1: THE PRIMARY HUB VIEW
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 flex flex-col"
            >
              {/* HERO WELCOME BANNER */}
              <div className="text-left space-y-1.5 py-6" id="hero-banner">
                <h1 className="text-2xl md:text-3xl font-sans font-bold text-slate-800 tracking-tight">
                  Bem-vindo ao Portal Labor Rural
                </h1>
                <p className="text-sm text-slate-500 font-sans">
                  Centralize e gerencie todos os seus aplicativos e recursos em um único lugar.
                </p>
              </div>

              {/* DYNAMIC SEARCH & FILTER PANEL */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Category selectors */}
                <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none" id="category-filters">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-semibold font-sans rounded-full transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar aplicativos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-9 py-2 text-xs font-sans placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

              </div>

              {/* APPLICATIONS GRID PANEL */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="apps-grid">
                <AnimatePresence mode="popLayout">
                  {filteredApps.map((app) => {
                    const theme = getColorStyles(app.color);
                    const isWide = app.size === 'wide';
                    
                    return (
                      <motion.div
                        layout
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group ${theme.border} ${theme.hoverBorder} ${
                          isWide ? 'lg:col-span-2' : 'col-span-1'
                        }`}
                      >
                        {/* Edit overlay buttons (visible when edit mode is toggled ON) */}
                        {editMode && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                            <button
                              onClick={() => handleOpenEditModal(app)}
                              className="p-1.5 rounded-full bg-white text-slate-600 hover:text-blue-600 border border-slate-200 shadow-sm transition-colors cursor-pointer"
                              title="Configurar Link / Detalhes"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={(e) => handleDeleteApp(app.id, e)}
                              className="p-1.5 rounded-full bg-white text-red-500 hover:bg-red-50 border border-slate-200 shadow-sm transition-colors cursor-pointer"
                              title="Remover aplicativo"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}

                        {/* WIDE CARD LAYOUT (Resource Planner style) */}
                        {isWide ? (
                          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 flex-1">
                            <div className="flex items-start md:items-center gap-4 flex-1">
                              {/* Colored Icon box */}
                              <div className={`p-3.5 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${theme.iconBg}`}>
                                <AppIcon name={app.icon} size={26} />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-sans font-bold text-lg text-slate-800 tracking-tight">{app.title}</h3>
                                  <span className="text-[9px] bg-slate-100 text-slate-500 font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wide">
                                    {app.category}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-sans pr-4">{app.description}</p>
                                
                                {/* URL display preview inside card */}
                                <div className="text-[10px] font-mono text-slate-400 truncate max-w-sm pt-1">
                                  Destino: <span className="underline">{app.url}</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button right */}
                            <div className="flex-shrink-0">
                              <button
                                onClick={() => setSelectedAppForWorkspace(app)}
                                className={`w-full md:w-auto px-5 py-2.5 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${theme.btnBg}`}
                              >
                                <span>ABRIR APP</span>
                                <ExternalLink size={12} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          
                          // REGULAR CARD LAYOUT (Standard bento-style apps)
                          <div className="p-6 flex flex-col justify-between h-full flex-1 space-y-5">
                            
                            <div className="space-y-4">
                              {/* Top row with category chip & Icon */}
                              <div className="flex justify-between items-center">
                                <div className={`p-3 rounded-xl flex items-center justify-center shadow-sm ${theme.iconBg}`}>
                                  <AppIcon name={app.icon} size={22} />
                                </div>
                                <span className="text-[9px] bg-slate-100 text-slate-500 font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wide">
                                  {app.category}
                                </span>
                              </div>

                              {/* Title and Description */}
                              <div className="space-y-1">
                                <h3 className="font-sans font-bold text-lg text-slate-800 tracking-tight">{app.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed font-sans">{app.description}</p>
                              </div>
                            </div>

                            {/* Button and Info Row at bottom */}
                            <div className="space-y-3 pt-2">
                              {/* Destination URL subtitle */}
                              <div className="text-[10px] font-mono text-slate-400 truncate border-t border-slate-100 pt-2">
                                Destino: <span className="underline">{app.url}</span>
                              </div>

                              <button
                                onClick={() => setSelectedAppForWorkspace(app)}
                                className={`w-full px-5 py-2.5 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${theme.btnBg}`}
                              >
                                <span>ABRIR APP</span>
                                <ExternalLink size={12} />
                              </button>
                            </div>

                          </div>
                        )}

                      </motion.div>
                    );
                  })}

                  {/* SPECIAL "+ ADICIONAR NOVO APP" DASHED CARD */}
                  {editMode && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-600 hover:bg-slate-50/50 transition-all flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[220px] group bg-white"
                      onClick={handleOpenCreateModal}
                      id="add-app-card"
                    >
                      <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center mb-3 group-hover:bg-white group-hover:border-blue-300 transition-colors">
                        <Plus className="text-slate-400 group-hover:text-blue-600" size={24} />
                      </div>
                      <h4 className="font-sans font-bold text-slate-500 group-hover:text-blue-600 transition-colors text-sm">Adicionar Novo Aplicativo</h4>
                      <p className="text-[10px] text-slate-400 font-sans mt-1 max-w-[200px]">
                        Conectar app externo via API ou link seguro.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EMPTY STATE */}
                {filteredApps.length === 0 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                      <AlertCircle size={24} />
                    </div>
                    <h3 className="font-sans font-bold text-slate-800 text-base">Nenhum aplicativo encontrado</h3>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Não encontramos apps com as palavras buscadas na categoria selecionada. Ative o "Modo Editor" para cadastrar novos links.
                    </p>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                      >
                        Limpar Busca
                      </button>
                    )}
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER NAVBAR */}
      <footer className="bg-slate-100 border-t border-slate-200 py-5 mt-12 z-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright notice left */}
          <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase text-center md:text-left">
            © 2026 LABOR RURAL. TODOS OS DIREITOS RESERVADOS.
          </div>

          {/* Status Indicator right */}
          <div className="flex gap-4 items-center">
             <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Todos os sistemas operacionais
             </span>
          </div>

        </div>
      </footer>

      {/* MODAL: EDIT / REGISTER APP CONFIGURATION */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 shadow-xl rounded-md max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
              id="app-editor-modal"
            >
              {/* Header */}
              <div className="bg-primary text-white p-4 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-neon-mint" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-wide">
                    {selectedAppForEdit ? `Configurar Link: ${selectedAppForEdit.title}` : 'Cadastrar Novo Aplicativo'}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleSaveApp} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Nome do Aplicativo *
                  </label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ex: Gestor de Maquinário"
                    className="w-full bg-off-white border border-gray-200 rounded px-3 py-2 font-sans focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Descrição Curta *
                  </label>
                  <textarea 
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Ex: Controle avançado de frotas agrícolas e operadores de campo."
                    rows={2}
                    className="w-full bg-off-white border border-gray-200 rounded px-3 py-2 font-sans focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                    required
                  />
                </div>

                {/* URL */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Link de Direcionamento (URL)
                    </label>
                    <span className="text-[9px] text-gray-400 font-sans">
                      Será aberto ao clicar em "ABRIR APP"
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="Ex: https://sheets.google.com/... ou https://meu-erp.com"
                    className="w-full bg-off-white border border-gray-200 rounded px-3 py-2 font-mono focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                  />
                  
                  {/* Real-time Link Validation Help */}
                  {formUrl && !formUrl.startsWith('http://') && !formUrl.startsWith('https://') && (
                    <div className="text-[10px] text-amber-600 font-sans flex items-center gap-1 bg-amber-50 p-1.5 rounded border border-amber-100">
                      <Info size={12} />
                      <span>Insira um link contendo <strong>http://</strong> ou <strong>https://</strong> para redirecionamento externo seguro.</span>
                    </div>
                  )}

                  {/* Pre-configured quick fills */}
                  <div className="pt-1">
                    <span className="text-[9px] text-gray-400 font-sans block mb-1">Links Rápidos de Demonstração:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        type="button"
                        onClick={() => setFormUrl('https://docs.google.com/spreadsheets/d/demo/edit')}
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer"
                      >
                        Google Sheet
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormUrl('https://wa.me/5511999998888')}
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer"
                      >
                        WhatsApp CRM
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormUrl('https://app.powerbi.com/view?demo')}
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer"
                      >
                        Power BI Dashboard
                      </button>
                    </div>
                  </div>
                </div>

                {/* Split grid for Layout and Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Categoria do App
                    </label>
                    <select 
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-off-white border border-gray-200 rounded px-3 py-2 font-sans focus:outline-none focus:border-secondary focus:bg-white text-sm"
                    >
                      {CATEGORIES.filter(c => c !== 'Todos').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Card width size */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Tamanho do Card no Grid
                    </label>
                    <select 
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value as AppSize)}
                      className="w-full bg-off-white border border-gray-200 rounded px-3 py-2 font-sans focus:outline-none focus:border-secondary focus:bg-white text-sm"
                    >
                      <option value="regular">Padrão (1 coluna)</option>
                      <option value="wide">Largo (2 colunas - ex: Resource Planner)</option>
                    </select>
                  </div>
                </div>

                {/* Color Accent Picker */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Cor de Destaque Visual (Tema)
                  </label>
                  <div className="flex gap-2.5 pt-1">
                    {([
                      { id: 'teal', color: 'bg-secondary', label: 'Teal' },
                      { id: 'dark-teal', color: 'bg-deep-forest', label: 'Deep Forest' },
                      { id: 'brown', color: 'bg-copper-brown', label: 'Rust Brown' },
                      { id: 'mint', color: 'bg-neon-mint', label: 'Neon Mint' },
                      { id: 'orange', color: 'bg-safety-orange', label: 'Orange' },
                      { id: 'slate', color: 'bg-gray-500', label: 'Slate' },
                    ] as const).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormColor(item.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform relative cursor-pointer ${item.color} ${
                          formColor === item.id ? 'scale-110 ring-2 ring-primary ring-offset-2' : 'hover:scale-105'
                        }`}
                        title={item.label}
                      >
                        {formColor === item.id && (
                          <Check size={14} className={item.id === 'mint' ? 'text-primary' : 'text-white'} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Grid Picker */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Selecionar Ícone do Aplicativo
                  </label>
                  <div className="bg-off-white border border-gray-200 rounded p-2.5 grid grid-cols-6 sm:grid-cols-7 gap-2 max-h-36 overflow-y-auto">
                    {AVAILABLE_ICONS.map((iconName) => (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setFormIcon(iconName)}
                        className={`p-2 rounded flex items-center justify-center transition-colors hover:bg-gray-200 cursor-pointer ${
                          formIcon === iconName 
                            ? 'bg-deep-forest text-neon-mint' 
                            : 'text-gray-600 bg-white border border-gray-100'
                        }`}
                        title={iconName}
                      >
                        <AppIcon name={iconName} size={16} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-[11px] uppercase tracking-wider py-2.5 rounded transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-deep-forest hover:bg-primary text-white font-mono text-[11px] uppercase tracking-wider py-2.5 rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-bold"
                  >
                    <Check size={14} />
                    <span>Salvar Configuração</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
}

