import { useState } from 'react';
import { Settings, Users, Coins, Zap, ShieldCheck, UserCheck } from 'lucide-react';
import { Badge, PageHeader, SectionCard, StatCard } from './ui';
import type { AdminUser } from '../lib/store';


interface AdminTabProps {
  t: (k: string) => string;
  users: AdminUser[];
  onInjectCredits: (id: string, amount: number) => void;
}

export function AdminTab({ t, users, onInjectCredits }: AdminTabProps) {
  const [injectAmount, setInjectAmount] = useState<Record<string, string>>({});
  const [injected, setInjected] = useState<string | null>(null);

  const handleInject = (id: string) => {
    const amount = Number(injectAmount[id] ?? '0');
    if (amount <= 0) return;
    onInjectCredits(id, amount);
    setInjected(id);
    setInjectAmount({ ...injectAmount, [id]: '' });
    setTimeout(() => setInjected(null), 2000);
  };

  const totalCredits = users.reduce((s, u) => s + u.credits, 0);

  return (
    <div>
      <PageHeader title={t('adminTitle')} subtitle={t('adminSubtitle')} />

      {/* Admin badge */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-red-500/15 border border-amber-500/30 animate-fade-in-up">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-sm font-bold text-amber-400 tracking-wide">{t('adminBadge')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <StatCard icon={<Users className="w-4 h-4" />} label={t('totalUsers')} value={users.length.toString()} accent="blue" />
        <StatCard icon={<Coins className="w-4 h-4" />} label={t('totalCredits')} value={totalCredits.toLocaleString('pt-BR')} accent="amber" />
      </div>

      {/* User control */}
      <SectionCard title={t('userControl')} subtitle={t('injectCreditsDesc')} icon={<Settings className="w-4 h-4 text-accent-400" />}>
        <div className="overflow-x-auto scrollbar-thin -mx-2">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted border-b border-default">
                <th className="px-2 py-3 font-medium">{t('client')}</th>
                <th className="px-2 py-3 font-medium">Plano</th>
                <th className="px-2 py-3 font-medium">{t('aiCredits')}</th>
                <th className="px-2 py-3 font-medium">{t('status')}</th>
                <th className="px-2 py-3 font-medium">{t('injectCredits')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {users.map((u) => (
                <tr key={u.id} className="text-sm hover:bg-white/[0.02] transition-colors">
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name.slice(0, 2).toUpperCase()}</div>
                      <div className="min-w-0"><p className="font-medium text-primary truncate">{u.name}</p><p className="text-[11px] text-muted truncate">{u.email}</p></div>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-muted">{u.plan}</td>
                  <td className="px-2 py-3 text-primary font-medium">{u.credits.toLocaleString('pt-BR')}</td>
                  <td className="px-2 py-3"><Badge status={u.status === 'active' ? 'active' : 'suspended'} label={u.status === 'active' ? 'Ativo' : 'Suspenso'} /></td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <input type="number" min="0" value={injectAmount[u.id] ?? ''} onChange={(e) => setInjectAmount({ ...injectAmount, [u.id]: e.target.value })} placeholder="500" className="w-20 rounded-lg bg-surface-subtle border border-default px-2 py-1.5 text-xs text-primary focus:outline-none focus:border-accent-500/60" />
                      <button onClick={() => handleInject(u.id)} className="inline-flex items-center gap-1 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-2.5 py-1.5 text-xs font-medium hover:bg-accent-500/25 transition-all">
                        {injected === u.id ? <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Zap className="w-3.5 h-3.5" />}
                        {injected === u.id ? 'OK' : '+'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
