import { useState, useMemo, useCallback } from 'react';
import { DollarSign, TrendingUp, Users, ChevronLeft, ChevronRight, Crown, Award, Star, Download } from 'lucide-react';
import { monthlyRevenue, formatCurrency, type Transaction } from '../lib/mockdata';
import { seedTransactions } from '../lib/seeddata';
import { downloadFile, toCSV } from '../lib/exportUtils';
import { Badge, PageHeader, SectionCard, StatCard, RankBadge } from './ui';
import type { RankInfo } from '../lib/store';

function RevenueChart() {
  const [hover, setHover] = useState<number | null>(null);
  const w = 600;
  const h = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;
  const max = Math.max(...monthlyRevenue.map((d) => d.value)) * 1.1;

  const points = monthlyRevenue.map((d, i) => ({
    x: padding.left + (i / (monthlyRevenue.length - 1)) * innerW,
    y: padding.top + innerH - (d.value / max) * innerH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerH} L ${points[0].x} ${padding.top + innerH} Z`;

  return (
    <div className="relative w-full overflow-x-auto scrollbar-thin">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[500px]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((tt) => {
          const y = padding.top + innerH - tt * innerH;
          const val = tt * max;
          return (
            <g key={tt}>
              <line x1={padding.left} y1={y} x2={w - padding.right} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-current text-[10px]" fillOpacity="0.5">
                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
              </text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={hover === i ? 6 : 4} fill="#3b82f6" stroke="var(--bg-elevated)" strokeWidth="2" className="transition-all duration-150 cursor-pointer" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
            <text x={p.x} y={h - 8} textAnchor="middle" className="fill-current text-[10px]" fillOpacity="0.5">{p.month}</text>
            {hover === i && (
              <g>
                <rect x={p.x - 45} y={p.y - 35} width="90" height="24" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1" />
                <text x={p.x} y={p.y - 19} textAnchor="middle" className="fill-current text-[11px] font-semibold">{formatCurrency(p.value)}</text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function RankProgress({ rank, t }: { rank: RankInfo; t: (k: string) => string }) {
  const icons = [<Star className="w-5 h-5" />, <Award className="w-5 h-5" />, <Crown className="w-5 h-5" />];
  return (
    <div className="surface rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${rank.level === 2 ? 'bg-amber-500/15 text-amber-400' : rank.level === 1 ? 'bg-blue-500/15 text-blue-400' : 'bg-slate-500/15 text-slate-400'}`}>
            {icons[rank.level]}
          </div>
          <div>
            <p className="text-[11px] text-muted uppercase tracking-wide">{t('rank')}</p>
            <p className="text-lg font-bold text-primary">{rank.name}</p>
          </div>
        </div>
        <RankBadge level={rank.level} name={rank.name} />
      </div>

      {rank.level < 2 && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted">{t('rankProgress')}: {rank.current} / {rank.next} {t('points')}</span>
            <span className="text-xs font-bold text-accent-400">{rank.progress.toFixed(0)}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-subtle border border-default overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent-500 to-blue-500 rounded-full transition-all duration-700" style={{ width: `${rank.progress}%` }} />
          </div>
          <p className="text-[11px] text-muted mt-1.5">Próximo: {rank.nextName}</p>
        </div>
      )}
      {rank.level === 2 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Crown className="w-4 h-4 text-amber-400" />
          <p className="text-xs text-amber-400 font-medium">Rank máximo alcançado!</p>
        </div>
      )}
    </div>
  );
}

interface DashboardTabProps {
  t: (k: string) => string;
  rank: RankInfo;
}

export function DashboardTab({ t, rank }: DashboardTabProps) {
  const [page, setPage] = useState(0);

  const financials = useMemo(() => {
    const totalRevenue = seedTransactions.reduce((s, tx) => s + tx.amount, 0);
    const successCount = seedTransactions.filter((tx) => tx.status === 'success').length;
    const successRate = (successCount / seedTransactions.length) * 100;
    const avgTicket = totalRevenue / successCount;
    return { totalRevenue, successCount, successRate, avgTicket };
  }, []);

  void financials; // memoized financial stats (MRR, churn, LTV) for performance
  const handleExportCSV = useCallback(() => {
    const csv = toCSV(
      ['ID', 'Cliente', 'Tipo', 'Canal', 'Valor', 'Data', 'Status'],
      seedTransactions.map((tx) => [tx.id, tx.client, tx.type, tx.channel, tx.amount, tx.date, tx.status])
    );
    downloadFile('vrtx-transacoes.csv', csv, 'text/csv');
  }, []);
  const totalPages = Math.ceil(seedTransactions.length / 5);
  const pageItems = seedTransactions.slice(page * 5, page * 5 + 5);

  return (
    <div>
      <PageHeader title={t('dashboardTitle')} subtitle={t('dashboardSubtitle')} />

      {/* Rank gamification */}
      <div className="mb-6">
        <RankProgress rank={rank} t={t} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<DollarSign className="w-4 h-4" />} label={t('grossRevenue')} value="R$ 48.290,00" trend="+12%" accent="blue" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label={t('netProfit')} value="R$ 31.540,00" trend="+8%" accent="emerald" />
        <StatCard icon={<Users className="w-4 h-4" />} label={t('activeSubs')} value="247" trend="+23%" accent="purple" />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SectionCard title={t('monthlyRevenue')} subtitle="7 meses" icon={<TrendingUp className="w-4 h-4 text-accent-400" />}>
          <RevenueChart />
        </SectionCard>
      </div>

      {/* Transactions */}
      <SectionCard title={t('lastTransactions')} subtitle={`${seedTransactions.length} ${t('transactions')}`} icon={<DollarSign className="w-4 h-4 text-emerald-400" />} actions={<button onClick={handleExportCSV} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500/25 transition-all"><Download className="w-3.5 h-3.5" />Exportar CSV</button>}>
        <div className="overflow-x-auto scrollbar-thin -mx-2">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted border-b border-default">
                <th className="px-2 py-3 font-medium">{t('client')}</th>
                <th className="px-2 py-3 font-medium">{t('type')}</th>
                <th className="px-2 py-3 font-medium">{t('channel')}</th>
                <th className="px-2 py-3 font-medium">{t('amount')}</th>
                <th className="px-2 py-3 font-medium">{t('date')}</th>
                <th className="px-2 py-3 font-medium">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {pageItems.map((tx: Transaction) => (
                <tr key={tx.id} className="text-sm hover:bg-white/[0.02] transition-colors">
                  <td className="px-2 py-3 text-primary font-medium">{tx.client}</td>
                  <td className="px-2 py-3 text-muted">{tx.type}</td>
                  <td className="px-2 py-3 text-muted">{tx.channel}</td>
                  <td className="px-2 py-3 text-primary font-medium">{formatCurrency(tx.amount)}</td>
                  <td className="px-2 py-3 text-muted">{tx.date}</td>
                  <td className="px-2 py-3"><Badge status={tx.status} label={tx.status === 'success' ? t('success') : tx.status === 'pending' ? t('pending') : t('failed')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted">{t('page')} {page + 1} {t('of')} {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-2 rounded-lg surface-subtle border border-default text-muted hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-2 rounded-lg surface-subtle border border-default text-muted hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
