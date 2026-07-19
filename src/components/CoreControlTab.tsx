import { useState } from 'react';
import { Users, DollarSign, TrendingDown, Zap, Loader2, Crown, ShieldCheck } from 'lucide-react';
import { SectionCard, PageHeader, Badge, StatCard, Field, inputClass } from './ui';
import { useAdminUsers } from '../lib/store';
import { formatCurrency } from '../lib/types';

interface CoreControlTabProps {
  t: (k: string) => string;
}

export function CoreControlTab({ t }: CoreControlTabProps) {
  const { users, injectCredits } = useAdminUsers();
  const [batchAmount, setBatchAmount] = useState('1000');
  const [injecting, setInjecting] = useState(false);

  const mrr = users.reduce((s, u) => s + (u.plan === 'black' ? 997 : u.plan === 'standard' ? 97 : 0), 0);
  const churnRate = 2.4;
  const ltv = 4280;

  const handleBatchInject = async () => {
    setInjecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const amount = parseInt(batchAmount) || 0;
    users.forEach((u) => injectCredits(u.id, amount));
    setInjecting(false);
  };

  return (
    <div>
      <PageHeader title={t('coreControlTitle')} subtitle={t('coreControlSubtitle')} />

      {/* CORE OPERATOR badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_24px_rgba(251,191,36,0.3)]">
        <ShieldCheck className="w-4 h-4" />
        {t('coreOperator')}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<DollarSign className="w-4 h-4" />} label={t('mrrGlobal')} value={formatCurrency(mrr)} trend="+18%" accent="emerald" />
        <StatCard icon={<TrendingDown className="w-4 h-4" />} label={t('churnRate')} value={`${churnRate}%`} accent="amber" />
        <StatCard icon={<Crown className="w-4 h-4" />} label={t('ltv')} value={formatCurrency(ltv)} accent="blue" />
        <StatCard icon={<Users className="w-4 h-4" />} label={t('totalUsers')} value={String(users.length)} accent="purple" />
      </div>

      <SectionCard title={t('batchInject')} subtitle="Injeção de créditos em lote para todos os utilizadores" icon={<Zap className="w-4 h-4 text-amber-400" />}>
        <div className="flex items-end gap-3 mb-6">
          <div className="flex-1">
            <Field label="Créditos por utilizador">
              <input type="number" value={batchAmount} onChange={(e) => setBatchAmount(e.target.value)} className={inputClass} placeholder="1000" />
            </Field>
          </div>
          <button
            onClick={handleBatchInject}
            disabled={injecting}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all disabled:opacity-70"
          >
            {injecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {t('batchInject')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] text-muted uppercase tracking-wider border-b border-default">
                <th className="py-2 px-3">Utilizador</th>
                <th className="py-2 px-3">Plano</th>
                <th className="py-2 px-3">Créditos</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-default/50 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 text-primary">{u.email}</td>
                  <td className="py-3 px-3"><Badge status={u.plan === 'black' ? 'active' : 'pending'} label={u.plan} /></td>
                  <td className="py-3 px-3 text-primary font-semibold">{u.credits.toLocaleString()}</td>
                  <td className="py-3 px-3"><Badge status="active" label="Ativo" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
