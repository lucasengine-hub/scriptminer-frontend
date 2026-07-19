import { useState } from 'react';
import { Store, Plus, Users, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { SectionCard, PageHeader, Badge, StatCard, Modal, Field, inputClass } from './ui';
import { useMarketplace } from '../lib/store';
import { formatCurrency } from '../lib/types';

interface MarketplaceTabProps {
  t: (k: string) => string;
  userEmail: string;
}

export function MarketplaceTab({ t, userEmail }: MarketplaceTabProps) {
  const { listings, addListing, affiliate } = useMarketplace();
  const [modalOpen, setModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [commissionRate, setCommissionRate] = useState(40);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const totalAffiliates = listings.reduce((sum, l) => sum + l.affiliateCount, 0);
  const totalVolume = listings.reduce((sum, l) => sum + l.price * l.affiliateCount, 0);

  const handleList = () => {
    if (!productName || !price) return;
    addListing({
      productName, ownerEmail: userEmail, price: parseFloat(price),
      commissionRate, category: category || 'Geral', description: description || 'Produto VRTX.',
    });
    setProductName(''); setPrice(''); setCommissionRate(40); setCategory(''); setDescription('');
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader title={t('marketplaceTitle')} subtitle={t('marketplaceSubtitle')} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<Store className="w-4 h-4" />} label="Produtos listados" value={String(listings.length)} accent="blue" />
        <StatCard icon={<Users className="w-4 h-4" />} label="Afiliados ativos" value={String(totalAffiliates)} accent="emerald" />
        <StatCard icon={<DollarSign className="w-4 h-4" />} label="Volume gerado" value={formatCurrency(totalVolume)} accent="amber" />
      </div>

      <SectionCard
        title={t('marketplaceTitle')}
        subtitle="Cross-selling interno entre utilizadores VRTX"
        icon={<TrendingUp className="w-4 h-4 text-accent-400" />}
        actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-accent-500/25 transition-all"><Plus className="w-3.5 h-3.5" />{t('listProduct')}</button>}
      >
        <div className="space-y-3">
          {listings.map((l) => (
            <div key={l.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{l.productName}</p>
                <p className="text-[11px] text-muted truncate">{l.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge status="active" label={l.category} />
                  <span className="text-[10px] text-subtle">{l.affiliateCount} afiliados</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-primary">{formatCurrency(l.price)}</p>
                <p className="text-[10px] text-emerald-400">{l.commissionRate}% comissão</p>
              </div>
              <button
                onClick={() => affiliate(l.id)}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-2 text-xs font-semibold hover:bg-emerald-500/25 transition-all"
              >
                <Users className="w-3.5 h-3.5" />{t('affiliateNow')}
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('listProduct')}>
        <div className="space-y-4">
          <Field label={t('productName')}>
            <input value={productName} onChange={(e) => setProductName(e.target.value)} className={inputClass} placeholder="Ex: Curso Master VRTX" />
          </Field>
          <Field label={t('price')}>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="297" />
          </Field>
          <Field label={t('commissionRate')}>
            <input type="range" min="10" max="80" value={commissionRate} onChange={(e) => setCommissionRate(parseInt(e.target.value))} className="w-full" />
            <p className="text-xs text-muted mt-1">{commissionRate}% por venda</p>
          </Field>
          <Field label="Categoria">
            <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} placeholder="Tráfego, Saúde, Finanças..." />
          </Field>
          <Field label={t('productDesc')}>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} rows={3} placeholder="Descrição do produto..." />
          </Field>
          <button onClick={handleList} className="w-full rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white hover:shadow-glow transition-all">{t('listProduct')}</button>
        </div>
      </Modal>
    </div>
  );
}
