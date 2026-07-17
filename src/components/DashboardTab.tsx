import { useState } from 'react';
import { DollarSign, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { monthlyRevenue, mockTransactions, formatCurrency, type Transaction } from '../lib/types';
import { Badge, PageHeader, SectionCard, StatCard } from './ui';

const PAGE_SIZE = 5;

function RevenueChart() {
  const [hover, setHover] = useState<number | null>(null);
  const w = 600;
  const h = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;

  const max = Math.max(...monthlyRevenue.map((d) => d.value)) * 1.1;
  const min = 0;

  const points = monthlyRevenue.map((d, i) => ({
    x: padding.left + (i / (monthlyRevenue.length - 1)) * innerW,
    y: padding.top + innerH - ((d.value - min) / (max - min)) * innerH,
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

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padding.top + innerH - t * innerH;
          const val = min + t * (max - min);
          return (
            <g key={t}>
              <line x1={padding.left} y1={y} x2={w - padding.right} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-current text-[10px]" fillOpacity="0.5">
                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaPath} fill="url(#areaGrad)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* Points + hover */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6 : 4}
              fill="#3b82f6"
              stroke="var(--bg-elevated)"
              strokeWidth="2"
              className="transition-all duration-150 cursor-pointer"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            <text x={p.x} y={h - 8} textAnchor="middle" className="fill-current text-[10px]" fillOpacity="0.5">
              {p.month}
            </text>
            {hover === i && (
              <g>
                <rect
                  x={p.x - 45}
                  y={p.y - 35}
                  width="90"
                  height="24"
                  rx="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text x={p.x} y={p.y - 19} textAnchor="middle" className="fill-current text-[11px] font-semibold">
                  {formatCurrency(p.value)}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

export function DashboardTab() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(mockTransactions.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const pageItems = mockTransactions.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Dashboard Geral & Quadro de Renda" subtitle="Visão financeira de alto nível da sua operação." />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<DollarSign className="w-4 h-4" />} label="Renda Bruta" value="R$ 48.290,00" trend="+12%" accent="blue" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Lucro Líquido" value="R$ 31.540,00" trend="+8%" accent="emerald" />
        <StatCard icon={<Users className="w-4 h-4" />} label="Assinaturas Ativas" value="247 usuários" trend="+23%" accent="purple" />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SectionCard title="Faturamento Mensal" subtitle="Últimos 7 meses" icon={<TrendingUp className="w-4 h-4 text-accent-400" />}>
          <RevenueChart />
        </SectionCard>
      </div>

      {/* Transactions table */}
      <SectionCard title="Últimas Transações" subtitle={`${mockTransactions.length} transações registradas`} icon={<DollarSign className="w-4 h-4 text-emerald-400" />}>
        <div className="overflow-x-auto scrollbar-thin -mx-2">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted border-b border-default">
                <th className="px-2 py-3 font-medium">Cliente</th>
                <th className="px-2 py-3 font-medium">Tipo</th>
                <th className="px-2 py-3 font-medium">Canal</th>
                <th className="px-2 py-3 font-medium">Valor</th>
                <th className="px-2 py-3 font-medium">Data</th>
                <th className="px-2 py-3 font-medium">Status</th>
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
                  <td className="px-2 py-3">
                    <Badge status={tx.status} label={tx.status === 'success' ? 'Sucesso' : tx.status === 'pending' ? 'Pendente' : 'Falhou'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted">
            Página {page + 1} de {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg surface-subtle border border-default text-muted hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg surface-subtle border border-default text-muted hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
