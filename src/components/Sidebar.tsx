import { Pickaxe, Network, Clapperboard, Radio, Cpu, Sparkles, X } from 'lucide-react';

export type TabId = 'mining' | 'affiliates' | 'videos' | 'channels' | 'automation';

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'mining', label: 'Mineração de Produtos', icon: <Pickaxe className="w-[18px] h-[18px]" /> },
  { id: 'affiliates', label: 'Afiliações & Produtos', icon: <Network className="w-[18px] h-[18px]" /> },
  { id: 'videos', label: 'Vídeos & Prompts de IA', icon: <Clapperboard className="w-[18px] h-[18px]" /> },
  { id: 'channels', label: 'Canais de Distribuição', icon: <Radio className="w-[18px] h-[18px]" /> },
  { id: 'automation', label: 'Central de Automação', icon: <Cpu className="w-[18px] h-[18px]" /> },
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
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen lg:h-screen w-64 shrink-0 bg-ink-900/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">ScriptMiner</h1>
              <p className="text-[10px] text-slate-500 leading-tight">Enterprise Edition</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-1">
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
            Plataforma
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-500/15 text-white border border-accent-500/30 shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-accent-400' : ''}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-ink-800/60 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              SM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Admin User</p>
              <p className="text-[10px] text-slate-500 truncate">Plano Enterprise</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
