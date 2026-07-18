import { useState, useEffect } from 'react';
import { CreditCard, Sparkles, TrendingUp, Zap, Check, AlertTriangle, Crown, ArrowUpCircle, Users, Gift, Clock } from 'lucide-react';
import { Modal, PageHeader, SectionCard, CopyButton } from './ui';
import type { UserState } from '../lib/store';

interface SubscriptionTabProps {
  t: (k: string) => string;
  user: UserState;
  addCredits: (amount: number) => void;
}

export function SubscriptionTab({ t, user, addCredits }: SubscriptionTabProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [referralBonus, setReferralBonus] = useState(false);

  useEffect(() => {
    if (!checkoutOpen) return;
    const timer = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [checkoutOpen]);

  const creditsUsed = user.isAdmin ? 0 : user.credits;
  const creditsTotal = user.isAdmin ? 999999 : user.maxCredits;
  const creditsPercent = user.isAdmin ? 0 : (user.credits / user.maxCredits) * 100;
  const isWarning = !user.isAdmin && creditsPercent >= 80;

  const referralLink = `https://vrtx.app/invite/${user.referralCode}`;

  const features = [
    'Roteiros ilimitados com IA',
    'Mineração de fornecedores avançada',
    'Automação 100% automática',
    'Gerador de E-books e Landing Pages',
    'Suporte prioritário 24/7',
    'API access com 10.000 créditos/mês',
  ];

  const usageItems = [
    { label: 'Geração de Roteiros', value: 420, icon: <Zap className="w-3.5 h-3.5 text-accent-400" /> },
    { label: 'Mineração de Produtos', value: 180, icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'E-books & Landing Pages', value: 150, icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
    { label: 'Automação de Postagens', value: 100, icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSimulateReferral = () => {
    setReferralBonus(true);
    addCredits(250);
    setTimeout(() => setReferralBonus(false), 3000);
  };

  return (
    <div>
      <PageHeader title={t('subscriptionTitle')} subtitle={t('subscriptionSubtitle')} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Plan card */}
        <SectionCard title={t('currentPlan')} subtitle="" icon={<Crown className="w-4 h-4 text-amber-400" />}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 border border-accent-500/20 p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-primary">{t('planBlack')}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">{t('planActive')}</span>
              </div>
              <p className="text-xs text-muted mb-4">{t('annual')} · {t('renewal')}: 17/07/2027</p>
              <div className="flex items-baseline gap-1 mb-5"><span className="text-3xl font-extrabold text-primary">R$ 1.997</span><span className="text-sm text-muted">/{t('annual')}</span></div>
              <div className="space-y-2 mb-5">
                {features.map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-muted"><Check className="w-4 h-4 text-emerald-400 shrink-0" />{f}</div>))}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-surface-subtle border border-default px-4 py-2.5 text-sm font-medium text-primary hover:border-strong transition-all"><CreditCard className="w-4 h-4" />{t('viewInvoices')}</button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-muted hover:text-red-400 hover:border-red-500/20 transition-all">{t('cancelPlan')}</button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Credits */}
        <SectionCard title={t('aiCredits')} subtitle="" icon={<Sparkles className="w-4 h-4 text-accent-400" />}>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">{user.isAdmin ? '∞ / Ilimitado' : `${creditsUsed} / ${creditsTotal} ${t('creditsUsed')}`}</span>
                {!user.isAdmin && <span className="text-sm font-bold text-accent-400">{creditsPercent.toFixed(0)}%</span>}
              </div>
              {!user.isAdmin && (
                <div className="h-4 rounded-full bg-surface-subtle border border-default overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${isWarning ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-accent-500 to-blue-500'}`} style={{ width: `${creditsPercent}%` }} />
                </div>
              )}
              {!user.isAdmin && <p className="text-[11px] text-muted mt-1.5">{creditsTotal - creditsUsed} {t('creditsRemaining')}</p>}
            </div>

            {isWarning && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 animate-fade-in-up">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div><p className="text-sm font-semibold text-amber-400">{t('creditsWarning')}</p><p className="text-xs text-muted mt-0.5">{t('creditsWarningDesc')}</p></div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted uppercase tracking-wide">{t('usageBreakdown')}</p>
              {usageItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-subtle border border-default">
                  <div className="flex items-center gap-2">{item.icon}<span className="text-xs text-muted">{item.label}</span></div>
                  <span className="text-xs font-semibold text-primary">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setCheckoutOpen(true)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"><CreditCard className="w-4 h-4" />{t('buyExtraCredits')}</button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"><ArrowUpCircle className="w-4 h-4" />{t('upgradeLimit')}</button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Referral program */}
      <div className="mt-6">
        <SectionCard title={t('referralProgram')} subtitle={t('referralSubtitle')} icon={<Gift className="w-4 h-4 text-emerald-400" />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center"><Users className="w-6 h-6 text-emerald-400" /></div>
                <div>
                  <p className="text-sm font-semibold text-primary">+250 {t('aiCredits')}</p>
                  <p className="text-[11px] text-muted">{t('referralDesc')}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-subtle border border-default">
                <label className="text-xs text-muted mb-2 block">{t('referralLink')}</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-primary font-mono truncate">{referralLink}</code>
                  <CopyButton text={referralLink} t={t} label={t('copy')} />
                </div>
              </div>
              <button onClick={handleSimulateReferral} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all">
                {referralBonus ? <><Check className="w-4 h-4" />{t('referralBonus')}</> : <><Gift className="w-4 h-4" />{t('simulateReferral')}</>}
              </button>
            </div>
            <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-700/10 border border-emerald-500/20">
              <div className="text-center">
                <Gift className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm text-muted">Compartilhe o VRTX. Se o seu indicado assinar qualquer plano pago, você ganha +250 créditos de IA automaticamente.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Checkout modal with countdown */}
      <Modal open={checkoutOpen} onClose={() => { setCheckoutOpen(false); setCountdown(600); }} title={t('checkoutTitle')}>
        <div className="space-y-5">
          <div className="text-center p-4 rounded-xl bg-surface-subtle border border-default">
            <p className="text-sm text-muted">{t('checkoutSubtitle')}</p>
            <p className="text-3xl font-extrabold text-primary mt-2">R$ 97</p>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">{t('scarcityTimer')}: </span>
            <span className="text-sm font-bold text-amber-400 font-mono">{formatTime(countdown)}</span>
          </div>
          <button onClick={() => { addCredits(500); setCheckoutOpen(false); setCountdown(600); }} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"><Check className="w-4 h-4" />{t('confirmPurchase')}</button>
        </div>
      </Modal>
    </div>
  );
}
