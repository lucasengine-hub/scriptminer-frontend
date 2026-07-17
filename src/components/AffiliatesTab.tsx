import { useState } from 'react';
import { Network, MousePointerClick, ShoppingCart, Wallet, Plus, Link2, Trash2 } from 'lucide-react';
import {
  type Product, type AffiliateLink, STATUS_LABEL, formatCurrency, formatNumber,
} from '../lib/types';
import { Badge, CopyButton, Modal, PageHeader, SectionCard, StatCard, inputClass } from './ui';

interface AffiliatesTabProps {
  products: Product[];
  affiliateLinks: AffiliateLink[];
  onGenerateLink: (productId: string, commissionRate: number, role: 'Afiliado' | 'Coprodutor') => void;
  onDeleteLink: (id: string) => void;
}

export function AffiliatesTab({ products, affiliateLinks, onGenerateLink, onDeleteLink }: AffiliatesTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [commission, setCommission] = useState(50);
  const [role, setRole] = useState<'Afiliado' | 'Coprodutor'>('Afiliado');

  const totalClicks = affiliateLinks.reduce((s, l) => s + l.clicks, 0);
  const totalSales = affiliateLinks.reduce((s, l) => s + l.conversions, 0);
  const totalCommission = affiliateLinks.reduce((s, l) => s + l.conversions * 47, 0);

  const handleGenerate = () => {
    if (!selectedProduct) return;
    onGenerateLink(selectedProduct, commission, role);
    setModalOpen(false);
    setSelectedProduct('');
    setCommission(50);
    setRole('Afiliado');
  };

  return (
    <div>
      <PageHeader title="Gestão de Afiliações" subtitle="Gerencie links de afiliado, comissões e performance por produto." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<MousePointerClick className="w-4 h-4" />} label="Cliques Totais" value={formatNumber(totalClicks)} trend="+8%" accent="blue" />
        <StatCard icon={<ShoppingCart className="w-4 h-4" />} label="Vendas" value={formatNumber(totalSales)} trend="+23%" accent="emerald" />
        <StatCard icon={<Wallet className="w-4 h-4" />} label="Comissão Acumulada" value={formatCurrency(totalCommission)} trend="+18%" accent="purple" />
      </div>

      {/* Links table */}
      <SectionCard
        title="Links de Afiliado"
        subtitle={`${affiliateLinks.length} links gerados`}
        icon={<Link2 className="w-4 h-4 text-accent-400" />}
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-blue-700 px-3 py-2 text-xs font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Gerar Novo Link
          </button>
        }
      >
        {affiliateLinks.length === 0 ? (
          <p className="text-sm text-muted text-center py-8">Nenhum link de afiliado gerado ainda.</p>
        ) : (
          <div className="overflow-x-auto scrollbar-thin -mx-2">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted border-b border-default">
                  <th className="px-2 py-3 font-medium">Produto</th>
                  <th className="px-2 py-3 font-medium">Código</th>
                  <th className="px-2 py-3 font-medium">Comissão</th>
                  <th className="px-2 py-3 font-medium">Cliques</th>
                  <th className="px-2 py-3 font-medium">Vendas</th>
                  <th className="px-2 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {affiliateLinks.map((link) => {
                  return (
                    <tr key={link.id} className="text-sm hover:bg-white/[0.02] transition-colors">
                      <td className="px-2 py-3">
                        <div className="font-medium text-primary truncate max-w-[180px]">{link.productName}</div>
                        <div className="text-[11px] text-muted">{link.role}</div>
                      </td>
                      <td className="px-2 py-3">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-500/15 text-accent-400">{link.code}</span>
                      </td>
                      <td className="px-2 py-3 text-muted">{link.commissionRate}%</td>
                      <td className="px-2 py-3 text-muted">{formatNumber(link.clicks)}</td>
                      <td className="px-2 py-3 text-muted">{formatNumber(link.conversions)}</td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <CopyButton text={link.url} label="" />
                          <button onClick={() => onDeleteLink(link.id)} className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Products status */}
      <div className="mt-6">
        <SectionCard title="Produtos Cadastrados" subtitle={`${products.length} produtos`} icon={<Network className="w-4 h-4 text-emerald-400" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-primary truncate">{p.name}</h4>
                  <Badge status={p.status} label={STATUS_LABEL[p.status]} />
                </div>
                <p className="text-xs text-muted line-clamp-2 mb-3">{p.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-primary font-medium">{formatCurrency(p.price)}</span>
                  <span className="text-muted">{p.sales} vendas</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Gerar Novo Link de Afiliado">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted mb-2 block">Produto</label>
            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className={`${inputClass} cursor-pointer`}>
              <option value="">Selecione um produto...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-ink-800">{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted mb-2 block">Tipo de Parceria</label>
            <div className="flex gap-2">
              {(['Afiliado', 'Coprodutor'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    role === r ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted mb-2 block">Comissão: {commission}%</label>
            <input type="range" min={10} max={80} value={commission} onChange={(e) => setCommission(Number(e.target.value))} className="w-full accent-accent-500" />
            <div className="flex justify-between text-[10px] text-subtle mt-1">
              <span>10%</span><span>80%</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedProduct}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Gerar Link
          </button>
        </div>
      </Modal>
    </div>
  );
}
