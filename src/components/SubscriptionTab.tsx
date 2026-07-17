import { useState } from 'react';
import { CreditCard, Sparkles, TrendingUp, Zap, Check, AlertTriangle, Crown, ArrowUpCircle } from 'lucide-react';
import { PageHeader, SectionCard } from './ui';

export function SubscriptionTab() {
  const [creditsUsed, setCreditsUsed] = useState(850);
  const creditsTotal = 1000;
  const creditsPercent = (creditsUsed / creditsTotal) * 100;
  const isWarning = creditsUsed > 900;

  const features = [
    'Roteiros ilimitados com IA',
    'Mineração de fornecedores avançada',
    'Automação 100% automática',
    'Gerador de E-books e Landing Pages',
    'Suporte prioritário 24/7',
    'API access com 10.000 créditos/mês',
  ];

  return (
    <div>
      <PageHeader title="Gerenciar Assinatura" subtitle="Controle seu plano, créditos de IA e faturamento." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Plan card */}
        <SectionCard title="Plano Atual" subtitle="Sua assinatura vigente" icon={<Crown className="w-4 h-4 text-amber-400" />}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 border border-accent-500/20 p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-primary">Plano Black</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Ativo</span>
              </div>
              <p className="text-xs text-muted mb-4">Ciclo: Anual · Renovação: 17/07/2027</p>

              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-extrabold text-primary">R$ 1.997</span>
                <span className="text-sm text-muted">/ano</span>
              </div>

              <div className="space-y-2 mb-5">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-surface-subtle border border-default px-4 py-2.5 text-sm font-medium text-primary hover:border-strong transition-all">
                  <CreditCard className="w-4 h-4" />
                  Ver Faturas
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-muted hover:text-red-400 hover:border-red-500/20 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Credits */}
        <SectionCard title="Créditos de IA" subtitle="Uso do mês atual" icon={<Sparkles className="w-4 h-4 text-accent-400" />}>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">{creditsUsed} / {creditsTotal} créditos utilizados</span>
                <span className="text-sm font-bold text-accent-400">{creditsPercent.toFixed(0)}%</span>
              </div>
              <div className="h-4 rounded-full bg-surface-subtle border border-default overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isWarning
                      ? 'bg-gradient-to-r from-amber-500 to-red-500'
                      : 'bg-gradient-to-r from-accent-500 to-blue-500'
                  }`}
                  style={{ width: `${creditsPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-muted mt-1.5">Restam {creditsTotal - creditsUsed} créditos neste ciclo.</p>
            </div>

            {/* Warning */}
            {isWarning && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 animate-fade-in-up">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-400">Seus créditos estão quase acabando!</p>
                    <p className="text-xs text-muted mt-0.5">Considere fazer um upgrade para evitar interrupções.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Usage breakdown */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted uppercase tracking-wide">Detalhamento de uso</p>
              {[
                { label: 'Geração de Roteiros', value: 420, icon: <Zap className="w-3.5 h-3.5 text-accent-400" /> },
                { label: 'Mineração de Produtos', value: 180, icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
                { label: 'E-books & Landing Pages', value: 150, icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
                { label: 'Automação de Postagens', value: 100, icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-subtle border border-default">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-xs text-muted">{item.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Simulate crossing threshold */}
            <button
              onClick={() => setCreditsUsed(920)}
              className="text-[11px] text-accent-400 hover:text-accent-300 transition-colors"
            >
              Simular uso avançado (920 créditos)
            </button>

            <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all">
              <ArrowUpCircle className="w-4 h-4" />
              Fazer Upgrade de Limite
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
