import { useState } from 'react';
import { MousePointerClick, ShoppingCart, Wallet, Plus, Link2, Trash2, Lightbulb, Zap } from 'lucide-react';
import { affiliateKnowledge, affiliatePalettes, type AffiliateKnowledge, type PlatformPalette } from '../lib/mockdata';
import { CopyButton, EmptyState, Modal, PageHeader, SectionCard, StatCard, inputClass } from './ui';
import type { Product, AffiliateLink } from '../lib/store';

interface AffiliatesTabProps {
  t: (k: string) => string;
  products: Product[];
  links: AffiliateLink[];
  onGenerateLink: (productId: string, commissionRate: number, role: 'Afiliado' | 'Coprodutor', platform: string) => void;
  onDeleteLink: (id: string) => void;
  onImportProduct: (productName: string, description: string, hook: string) => void;
  consumeCredits: (amount: number) => void;
  isAdmin: boolean;
}

export function AffiliatesTab({ t, products, links, onGenerateLink, onDeleteLink, onImportProduct, consumeCredits, isAdmin }: AffiliatesTabProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformPalette>(affiliatePalettes[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [commission, setCommission] = useState(50);
  const [role, setRole] = useState<'Afiliado' | 'Coprodutor'>('Afiliado');

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);
  const totalSales = links.reduce((s, l) => s + l.conversions, 0);
  const totalCommission = links.reduce((s, l) => s + l.conversions * 47 * (l.commissionRate / 100), 0);

  const handleGenerate = () => {
    if (!selectedProduct) return;
    onGenerateLink(selectedProduct, commission, role, activePlatform.name);
    setModalOpen(false);
    setSelectedProduct('');
    setCommission(50);
    setRole('Afiliado');
  };

  const handleImport = (item: AffiliateKnowledge) => {
    onImportProduct(item.product, `${item.category} - ${item.platform}. ${item.tip}`, '');
    if (!isAdmin) consumeCredits(5);
  };

  const platformGlowStyle: React.CSSProperties = {
    boxShadow: `0 0 24px ${activePlatform.glow}, 0 0 0 1px ${activePlatform.glow}`,
  };

  return (
    <div>
      <PageHeader title={t('affiliatesTitle')} subtitle={t('affiliatesSubtitle')} />

      {/* Platform palette selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {affiliatePalettes.map((p) => (
            <button key={p.id} onClick={() => setActivePlatform(p)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${activePlatform.id === p.id ? 'text-white' : 'surface-subtle text-muted border-default hover:text-primary'}`} style={activePlatform.id === p.id ? { backgroundColor: p.color, borderColor: p.color, boxShadow: `0 0 16px ${p.glow}` } : {}}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<MousePointerClick className="w-4 h-4" />} label={t('totalClicks')} value={totalClicks.toLocaleString('pt-BR')} trend="+8%" accent="blue" />
        <StatCard icon={<ShoppingCart className="w-4 h-4" />} label={t('sales')} value={totalSales.toLocaleString('pt-BR')} trend="+23%" accent="emerald" />
        <StatCard icon={<Wallet className="w-4 h-4" />} label={t('totalCommission')} value={`R$ ${totalCommission.toFixed(0)}`} trend="+18%" accent="purple" />
      </div>

      <div style={platformGlowStyle} className="rounded-2xl transition-all duration-300 mb-6">
        <SectionCard title={t('affiliateLinks')} subtitle={`${links.length} ${t('transactions')}`} icon={<Link2 className="w-4 h-4" style={{ color: activePlatform.color }} />}
          actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-blue-700 px-3 py-2 text-xs font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"><Plus className="w-3.5 h-3.5" />{t('newLink')}</button>}>
          {links.length === 0 ? (
            <EmptyState
              icon={<Link2 className="w-7 h-7 text-accent-400" />}
              title="Nenhum link gerado ainda"
              description="Crie seu primeiro link de afiliado e comece a rastrear cliques, conversões e comissões em tempo real."
              ctaLabel="Criar primeiro link"
              onCta={() => setModalOpen(true)}
            />
          ) : (
            <div className="overflow-x-auto scrollbar-thin -mx-2">
              <table className="w-full min-w-[680px]">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-muted border-b border-default">
                    <th className="px-2 py-3 font-medium">{t('product')}</th>
                    <th className="px-2 py-3 font-medium">Código</th>
                    <th className="px-2 py-3 font-medium">{t('commissionRate')}</th>
                    <th className="px-2 py-3 font-medium">{t('clicks')}</th>
                    <th className="px-2 py-3 font-medium">{t('sales')}</th>
                    <th className="px-2 py-3 font-medium">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default">
                  {links.map((link) => (
                    <tr key={link.id} className="text-sm hover:bg-white/[0.02] transition-colors">
                      <td className="px-2 py-3"><div className="font-medium text-primary truncate max-w-[160px]">{link.productName}</div><div className="text-[11px] text-muted">{link.role} · {link.platform}</div></td>
                      <td className="px-2 py-3"><span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-500/15 text-accent-400">{link.code}</span></td>
                      <td className="px-2 py-3 text-muted">{link.commissionRate}%</td>
                      <td className="px-2 py-3 text-muted">{link.clicks.toLocaleString('pt-BR')}</td>
                      <td className="px-2 py-3 text-muted">{link.conversions.toLocaleString('pt-BR')}</td>
                      <td className="px-2 py-3"><div className="flex items-center gap-2"><CopyButton text={link.url} t={t} label="" /><button onClick={() => onDeleteLink(link.id)} className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Knowledge Bank */}
      <SectionCard title={t('knowledgeBank')} subtitle={t('knowledgeBankSubtitle')} icon={<Zap className="w-4 h-4 text-emerald-400" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {affiliateKnowledge.map((item: AffiliateKnowledge) => {
            const palette = affiliatePalettes.find((p) => p.name === item.platform);
            return (
              <div key={item.id} className="p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all" style={palette ? { boxShadow: `0 0 16px ${palette.glow}` } : {}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette?.color }} /><span className="text-[11px] font-medium text-muted">{item.platform}</span><span className="text-[10px] text-subtle">·</span><span className="text-[10px] text-subtle">{item.category}</span></div>
                  <span className="text-sm font-bold text-primary">{item.price}</span>
                </div>
                <h4 className="text-sm font-semibold text-primary mb-2">{item.product}</h4>
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 mb-3">
                  <p className="text-[11px] text-amber-400 font-medium mb-1 flex items-center gap-1.5"><Lightbulb className="w-3 h-3" />{t('strategicTip')}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.tip}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleImport(item)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-3 py-2 text-xs font-medium hover:bg-accent-500/25 transition-all"><Zap className="w-3.5 h-3.5" />{t('importStructure')}</button>
                  <CopyButton text={item.link} t={t} label={t('copy')} />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('newLink')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted mb-2 block">{t('product')}</label>
            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className={`${inputClass} cursor-pointer`}>
              <option value="">{t('selectProduct')}</option>
              {products.map((p) => (<option key={p.id} value={p.id} className="bg-ink-800">{p.name}</option>))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted mb-2 block">{t('partnership')}</label>
            <div className="flex gap-2">
              {(['Afiliado', 'Coprodutor'] as const).map((r) => (
                <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${role === r ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted mb-2 block">{t('commissionRate')}: {commission}%</label>
            <input type="range" min={10} max={80} value={commission} onChange={(e) => setCommission(Number(e.target.value))} className="w-full accent-accent-500" />
            <div className="flex justify-between text-[10px] text-subtle mt-1"><span>10%</span><span>80%</span></div>
          </div>
          <button onClick={handleGenerate} disabled={!selectedProduct} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"><Plus className="w-4 h-4" />{t('generateLink')}</button>
        </div>
      </Modal>
    </div>
  );
}
