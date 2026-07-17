import {
  LayoutDashboard, Pickaxe, BookOpen, Package, Network, Cpu,
  CreditCard, Settings, X, Sparkles, ChevronDown,
} from 'lucide-react';

export type TabId =
  | 'dashboard'
  | 'mining'
  | 'ebook'
  | 'dropshipping'
  | 'affiliates'
  | 'automation'
  | 'subscription'
  | 'settings';

interface NavSection {
  label: string;
  items: { id: TabId; label: string; icon: React.ReactNode }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: '',
    items: [{ id: 'dashboard', label: 'Dashboard Geral & Renda', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> }],
  },
  {
    label: 'Produtos Digitais',
    items: [
      { id: 'mining', label: 'Geração de Roteiros', icon: <Pickaxe className="w-[18px] h-[18px]" /> },
      { id: 'ebook', label: 'Criador de E-books & Copys', icon: <BookOpen className="w-[18px] h-[18px]" /> },
    ],
  },
  {
    label: 'Dropshipping & Físicos',
    items: [{ id: 'dropshipping', label: 'Mineração de Fornecedores', icon: <Package className="w-[18px] h-[18px]" /> }],
  },
  {
    label: 'Ecossistema de Vendas',
    items: [
      { id: 'affiliates', label: 'Gestão de Afiliações', icon: <Network className="w-[18px] h-[18px]" /> },
      { id: 'automation', label: 'Central de Automação', icon: <Cpu className="w-[18px] h-[18px]" /> },
    ],
  },
];

const BOTTOM_ITEMS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'subscription', label: 'Gerenciar Assinatura', icon: <CreditCard className="w-[18px] h-[18px]" /> },
  { id: 'settings', label: 'Configurações & Chaves', icon: <Settings className="w-[18px] h-[18px]" /> },
];

interface SidebarProps {
  active: TabId;
  onChange: (id: TabId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ active, onChange, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-surface-subtle border-r border-default flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-default shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-primary leading-tight">ScriptMiner</h1>
              <p className="text-[10px] text-muted leading-tight">Enterprise Edition</p>
            </div>
          </div>
          <button onClick={onCloseMobile} className="lg:hidden text-muted hover:text-primary p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-4">
          {NAV_SECTIONS.map((section, si) => (
            <div key={si}>
              {section.label && (
                <p className="px-3 mb-2 text-[10px] font-semibold text-subtle uppercase tracking-wider">
                  {section.label}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onChange(item.id); onCloseMobile(); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        isActive
                          ? 'bg-accent-500/15 text-primary border-accent-500/30 shadow-glow'
                          : 'text-muted hover:text-primary hover:bg-white/5 border-transparent'
                      }`}
                    >
                      <span className={isActive ? 'text-accent-400' : ''}>{item.icon}</span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="px-3 pb-3 space-y-1 border-t border-default pt-3">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onChange(item.id); onCloseMobile(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-accent-500/15 text-primary border-accent-500/30 shadow-glow'
                    : 'text-muted hover:text-primary hover:bg-white/5 border-transparent'
                }`}
              >
                <span className={isActive ? 'text-accent-400' : ''}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* User */}
        <div className="p-4 border-t border-default shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-default">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              SM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary truncate">Admin User</p>
              <p className="text-[10px] text-muted truncate flex items-center gap-1">
                Plano Black
                <ChevronDown className="w-3 h-3" />
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
