import { useState } from 'react';
import { Network, Users, MousePointerClick, ShoppingCart, Wallet, Plus, Link2, Trash2 } from 'lucide-react';
import {
  type Product, type AffiliateLink, STATUS_LABEL, formatCurrency, formatNumber,
} from '../lib/types';
import { Badge, CopyButton, PageHeader, SectionCard, StatCard } from './ui';

interface AffiliatesTabProps {
  products: Product[];
  affiliateLinks: AffiliateLink[];
  onGenerateLink: (productId: string) => void;
  onDeleteLink: (id: string) => void;
}

export function AffiliatesTab({ products, affiliateLinks, onGenerateLink, onDeleteLink }: AffiliatesTabProps) {
  const [selectedProduct, setSelectedProduct] = useState('');

  const totalAffiliates = 247;
  const totalClicks = affiliateLinks.reduce((s, l) => s + l.clicks, 0);
  const totalSales = affiliateLinks.reduce((s, l) => s + l.conversions, 0);
  const totalCommission = affiliateLinks.reduce((s, l) => s + l.conversions * 47, 0);

  return (
    <div>
      <PageHeader
        title="Afiliações & Produtos Cadastrados"
        subtitle="Gerencie seus produtos minerados e crie links de afiliado exclusivos para cada um."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users className="w-4 h-4" />} label="Total de Afiliados" value={formatNumber(totalAffiliates)} trend="+12%" accent="blue" />
        <StatCard icon={<MousePointerClick className="w-4 h-4" />} label="Cliques no Link" value={formatNumber(totalClicks)} trend="+8%" accent="emerald" />
        <StatCard icon={<ShoppingCart className="w-4 h-4" />} label="Vendas" value={formatNumber(totalSales)} trend="+23%" accent="amber" />
        <StatCard icon={<Wallet className="w-4 h-4" />} label="Comissão Acumulada" value={formatCurrency(totalCommission)} trend="+18%" accent="purple" />
      </div>

      {/* Products table */}
      <div className="mb-6">
        <SectionCard title="Produtos Minerados" subtitle={`${products.length} produtos cadastrados`} icon={<Network className="w-4 h-4 text-accent-400" />}>
          <div className="overflow-x-auto scrollbar-thin -mx-2">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-white/5">
                  <th className="px-2 py-3 font-medium">Produto</th>
                  <th className="px-2 py-3 font-medium">Preço</th>
                  <th className="px-2 py-3 font-medium">Cliques</th>
                  <th className="px-2 py-3 font-medium">Vendas</th>
                  <th className="px-2 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="text-sm hover:bg-white/[0.02] transition-colors">
                    <td className="px-2 py-3">
                      <div className="font-medium text-slate-100">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.createdAt}</div>
                    </td>
                    <td className="px-2 py-3 text-slate-300">{formatCurrency(p.price)}</td>
                    <td className="px-2 py-3 text-slate-300">{formatNumber(p.clicks)}</td>
                    <td className="px-2 py-3 text-slate-300">{formatNumber(p.sales)}</td>
                    <td className="px-2 py-3"><Badge status={p.status} label={STATUS_LABEL[p.status]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Affiliate links management */}
      <SectionCard
        title="Gestão de Afiliados"
        subtitle="Gere e gerencie links exclusivos"
        icon={<Link2 className="w-4 h-4 text-accent-400" />}
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="flex-1 rounded-xl bg-ink-950/60 border border-white/5 px-4 py-2.5 text-sm text-slate-100 cursor-pointer focus:outline-none focus:border-accent-500/60"
          >
            <option value="">Selecione um produto...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id} className="bg-ink-800">{p.name}</option>
            ))}
          </select>
          <button
            onClick={() => selectedProduct && onGenerateLink(selectedProduct)}
            disabled={!selectedProduct}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Gerar Link
          </button>
        </div>

        <div className="space-y-3">
          {affiliateLinks.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-8">Nenhum link de afiliado gerado ainda.</p>
          )}
          {affiliateLinks.map((link) => {
            const product = products.find((p) => p.id === link.productId);
            return (
              <div
                key={link.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-ink-950/40 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-100 truncate">{link.productName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-500/15 text-accent-400">{link.code}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span>{formatNumber(link.clicks)} cliques</span>
                    <span>·</span>
                    <span>{formatNumber(link.conversions)} conversões</span>
                    {product && <><span>·</span><span>{formatCurrency(link.conversions * 47)}</span></>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CopyButton text={link.url} label="Copiar Link" />
                  <button
                    onClick={() => onDeleteLink(link.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
