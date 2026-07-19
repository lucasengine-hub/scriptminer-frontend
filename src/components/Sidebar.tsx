import {
  LayoutDashboard, Pickaxe, BookOpen, Package, Layout, Megaphone, Network, Cpu,
  CreditCard, Shield, Crown, X, Sparkles, ChevronDown, Settings, Send,
  Film, Store, CreditCard as PayIcon, GraduationCap, Mail, Code2, KanbanSquare, Layers,
} from 'lucide-react';
import { useState } from 'react';
import { useWorkspaces } from '../lib/store';

export type TabId =
  | 'dashboard' | 'mining' | 'ebook' | 'dropshipping' | 'landingBuilder'
  | 'traffic' | 'massSender' | 'affiliates' | 'automation'
  | 'studio' | 'marketplace' | 'pay' | 'class' | 'mail' | 'webBuilder' | 'kanban'
  | 'subscription' | 'security' | 'admin' | 'coreControl';

interface SidebarProps {
  active: TabId;
  onChange: (id: TabId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  t: (k: string) => string;
  isAdmin: boolean;
  isGodMode: boolean;
  userRank: { level: number; name: string };
  userName: string;
}

export function Sidebar({ active, onChange, mobileOpen, onCloseMobile, t, isAdmin, isGodMode, userRank, userName }: SidebarProps) {
  const { current, list, change } = useWorkspaces();
  const [wsOpen, setWsOpen] = useState(false);

  const sections: { label: string; items: { id: TabId; label: string; icon: React.ReactNode }[] }[] = [
    {
      label: t('catGeneral'),
      items: [{ id: 'dashboard', label: t('navDashboard'), icon: <LayoutDashboard className="w-[18px] h-[18px]" /> }],
    },
    {
      label: t('catDigital'),
      items: [
        { id: 'mining', label: t('navMining'), icon: <Pickaxe className="w-[18px] h-[18px]" /> },
        { id: 'ebook', label: t('navEbook'), icon: <BookOpen className="w-[18px] h-[18px]" /> },
        { id: 'studio', label: t('navStudio'), icon: <Film className="w-[18px] h-[18px]" /> },
      ],
    },
    {
      label: t('catMonopoly'),
      items: [
        { id: 'marketplace', label: t('navMarketplace'), icon: <Store className="w-[18px] h-[18px]" /> },
        { id: 'pay', label: t('navPay'), icon: <PayIcon className="w-[18px] h-[18px]" /> },
        { id: 'class', label: t('navClass'), icon: <GraduationCap className="w-[18px] h-[18px]" /> },
        { id: 'mail', label: t('navMail'), icon: <Mail className="w-[18px] h-[18px]" /> },
      ],
    },
    {
      label: t('catDropshipping'),
      items: [{ id: 'dropshipping', label: t('navDropshipping'), icon: <Package className="w-[18px] h-[18px]" /> }],
    },
    {
      label: t('catTraffic'),
      items: [
        { id: 'landingBuilder', label: t('navLandingBuilder'), icon: <Layout className="w-[18px] h-[18px]" /> },
        { id: 'webBuilder', label: t('navWebBuilder'), icon: <Code2 className="w-[18px] h-[18px]" /> },
        { id: 'kanban', label: t('navKanban'), icon: <KanbanSquare className="w-[18px] h-[18px]" /> },
        { id: 'traffic', label: t('navTraffic'), icon: <Megaphone className="w-[18px] h-[18px]" /> },
        { id: 'massSender', label: t('navMassSender'), icon: <Send className="w-[18px] h-[18px]" /> },
        { id: 'affiliates', label: t('navAffiliates'), icon: <Network className="w-[18px] h-[18px]" /> },
        { id: 'automation', label: t('navAutomation'), icon: <Cpu className="w-[18px] h-[18px]" /> },
      ],
    },
    {
      label: t('catConfigs'),
      items: [
        { id: 'subscription', label: t('navSubscription'), icon: <CreditCard className="w-[18px] h-[18px]" /> },
        { id: 'security', label: t('navSecurity'), icon: <Shield className="w-[18px] h-[18px]" /> },
        ...(isAdmin ? [{ id: 'admin' as TabId, label: t('navAdmin'), icon: <Settings className="w-[18px] h-[18px]" /> }] : []),
        ...(isGodMode ? [{ id: 'coreControl' as TabId, label: t('navCoreControl'), icon: <Layers className="w-[18px] h-[18px]" /> }] : []),
      ],
    },
  ];

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={onCloseMobile} />}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-surface-subtle border-r border-default flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-default shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-primary leading-tight">{t('appName')}</h1>
              <p className="text-[10px] text-muted leading-tight">{t('enterpriseEdition')}</p>
            </div>
          </div>
          <button onClick={onCloseMobile} className="lg:hidden text-muted hover:text-primary p-1"><X className="w-5 h-5" /></button>
        </div>

        {/* Workspace Dropdown */}
        <div className="px-3 py-3 border-b border-default relative">
          <button
            onClick={() => setWsOpen(!wsOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-surface border border-default hover:border-strong transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {current.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[10px] text-muted uppercase tracking-wider">{t('workspace')}</p>
              <p className="text-xs font-semibold text-primary truncate">{current.name}</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${wsOpen ? 'rotate-180' : ''}`} />
          </button>
          {wsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setWsOpen(false)} />
              <div className="absolute left-3 right-3 mt-2 surface rounded-xl shadow-card z-50 py-1 animate-fade-in-up">
                {list.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => { change(ws); setWsOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors ${ws.id === current.id ? 'text-accent-400 bg-accent-500/10' : 'text-muted hover:text-primary hover:bg-white/5'}`}
                  >
                    <div className="w-6 h-6 rounded bg-surface-subtle flex items-center justify-center text-[9px] font-bold text-primary">{ws.name.slice(0, 2).toUpperCase()}</div>
                    <span className="flex-1 text-left">{ws.name}</span>
                    {ws.type === 'agency' && <span className="text-[9px] text-amber-400 uppercase">{t('agencyWorkspace')}</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-4">
          {sections.map((section, si) => (
            <div key={si}>
              {section.label && <p className="px-3 mb-2 text-[10px] font-semibold text-subtle uppercase tracking-wider">{section.label}</p>}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button key={item.id} onClick={() => { onChange(item.id); onCloseMobile(); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${isActive ? 'bg-accent-500/15 text-primary border-accent-500/30 shadow-glow' : 'text-muted hover:text-primary hover:bg-white/5 border-transparent'}`}>
                      <span className={isActive ? 'text-accent-400' : ''}>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-default shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-default">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-primary truncate">{userName}</p>
              <p className="text-[10px] text-muted truncate flex items-center gap-1">
                <Crown className={`w-3 h-3 ${userRank.level >= 2 ? 'text-amber-400' : userRank.level === 1 ? 'text-blue-400' : 'text-slate-400'}`} />
                {userRank.name}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
