import { useState } from 'react';
import { CreditCard, Plus, Link2, TrendingUp, AlertCircle, CheckCircle2, Loader2, DollarSign } from 'lucide-react';
import { SectionCard, PageHeader, Badge, StatCard, Modal, Field, inputClass, CopyButton } from './ui';
import { usePayOffers } from '../lib/store';
import { formatCurrency } from '../lib/types';

interface VRTXPayTabProps {
  t: (k: string) => string;
}

export function VRTXPayTab({ t }: VRTXPayTabProps) {
  const { offers, addOffer, recoverDunning } = usePayOffers();
  const [modalOpen, setModalOpen] = useState(false);
  const [offerName, setOfferName] = useState('');
  const [price, setPrice] = useState('');
  const [orderBump, setOrderBump] = useState('');
  const [bumpPrice, setBumpPrice] = useState('');
  const [recovering, setRecovering] = useState<string | null>(null);

  const totalConversions = offers.reduce((s, o) => s + o.conversions, 0);
  const totalRevenue = offers.reduce((s, o) => s + o.conversions * o.price, 0);
  const totalDeclined = offers.reduce((s, o) => s + o.declined, 0);
  const totalRecovered = offers.reduce((s, o) => s + o.recovered, 0);

  const handleCreate = () => {
    if (!offerName || !price) return;
    addOffer({
      offerName, price: parseFloat(price),
      orderBump: orderBump || 'Sem bump', bumpPrice: bumpPrice ? parseFloat(bumpPrice) : 0,
    });
    setOfferName(''); setPrice(''); setOrderBump(''); setBumpPrice('');
    setModalOpen(false);
  };

  const handleRecover = async (id: string) => {
    setRecovering(id);
    await new Promise((r) => setTimeout(r, 1200));
    recoverDunning(id);
    setRecovering(null);
  };

  return (
    <div>
      <PageHeader title={t('payTitle')} subtitle={t('paySubtitle')} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<CheckCircle2 className="w-4 h-4" />} label="Conversões" value={String(totalConversions)} accent="emerald" />
        <StatCard icon={<DollarSign className="w-4 h-4" />} label="Receita" value={formatCurrency(totalRevenue)} accent="blue" />
        <StatCard icon={<AlertCircle className="w-4 h-4" />} label="Recusados" value={String(totalDeclined)} accent="amber" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Recuperados" value={String(totalRecovered)} accent="emerald" />
      </div>

      <SectionCard
        title={t('createOffer')}
        subtitle="Checkout nativo VRTX com Order Bump"
        icon={<CreditCard className="w-4 h-4 text-accent-400" />}
        actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-accent-500/25 transition-all"><Plus className="w-3.5 h-3.5" />{t('createOffer')}</button>}
      >
        <div className="space-y-3">
          {offers.map((o) => (
            <div key={o.id} className="p-4 rounded-xl bg-surface-subtle border border-default">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-primary">{o.offerName}</p>
                  <p className="text-[11px] text-muted">Bump: {o.orderBump} (+{formatCurrency(o.bumpPrice)})</p>
                </div>
                <Badge status="active" label={formatCurrency(o.price)} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <code className="flex-1 text-[11px] text-muted bg-surface px-3 py-2 rounded-lg border border-default truncate">{o.link}</code>
                <CopyButton text={o.link} t={t} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2"><p className="text-emerald-400 font-bold">{o.conversions}</p><p className="text-[10px] text-muted">Conv.</p></div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2"><p className="text-amber-400 font-bold">{o.declined}</p><p className="text-[10px] text-muted">Recus.</p></div>
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2"><p className="text-blue-400 font-bold">{o.recovered}</p><p className="text-[10px] text-muted">Recup.</p></div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t('dunningManagement')} subtitle="Recuperação automática de pagamentos recusados" icon={<AlertCircle className="w-4 h-4 text-amber-400" />} className="mt-6">
        <div className="space-y-2">
          {offers.filter((o) => o.declined > 0).map((o) => (
            <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-subtle border border-default">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-sm text-primary">{o.offerName}</p>
                  <p className="text-[11px] text-muted">{o.declined} pagamentos recusados</p>
                </div>
              </div>
              <button
                onClick={() => handleRecover(o.id)}
                disabled={recovering === o.id}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-amber-500/25 transition-all disabled:opacity-70"
              >
                {recovering === o.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Link2 className="w-3.5 h-3.5" />}
                {t('recoverPayment')}
              </button>
            </div>
          ))}
          {offers.filter((o) => o.declined > 0).length === 0 && <p className="text-sm text-muted text-center py-4">Nenhum pagamento recusado no momento.</p>}
        </div>
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('createOffer')}>
        <div className="space-y-4">
          <Field label={t('offerName')}><input value={offerName} onChange={(e) => setOfferName(e.target.value)} className={inputClass} placeholder="Ex: Curso VIP" /></Field>
          <Field label={t('price')}><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="297" /></Field>
          <Field label={t('orderBump')}><input value={orderBump} onChange={(e) => setOrderBump(e.target.value)} className={inputClass} placeholder="Ex: Mentoria Bônus" /></Field>
          <Field label={t('bumpPrice')}><input type="number" value={bumpPrice} onChange={(e) => setBumpPrice(e.target.value)} className={inputClass} placeholder="97" /></Field>
          <button onClick={handleCreate} className="w-full rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white hover:shadow-glow transition-all">{t('generatePayLink')}</button>
        </div>
      </Modal>
    </div>
  );
}
