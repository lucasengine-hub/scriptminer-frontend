import { useState } from 'react';
import {
  Package, Link2, Loader2, Pickaxe, Star, TrendingUp, AlertTriangle, Target,
  Shield, Lightbulb, Zap, Eye, Copy, Sparkles,
} from 'lucide-react';
import {
  spyFeed, dropshippingKnowledge, dropshippingPalettes, type SpyCreative, type KnowledgeItem, type PlatformPalette,
} from '../lib/mockdata';
import { sanitizeInput, isValidUrl } from '../lib/security';
import { CopyButton, PageHeader, SectionCard, inputClass } from './ui';

interface DropshippingTabProps {
  t: (k: string) => string;
  onImportProduct: (productName: string, description: string, hook: string) => void;
  consumeCredits: (amount: number) => void;
  addRankPoints: (amount: number) => void;
  isAdmin: boolean;
}

interface MinedData {
  analysis: { name: string; price: string; rating: number; sales: number; supplier: string };
  hooks: string[];
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
}

function generateMinedData(url: string): MinedData {
  const platform = dropshippingPalettes.find((p) => url.toLowerCase().includes(p.id)) ?? dropshippingPalettes[0];
  return {
    analysis: {
      name: `Mini Projetor Portátil 4K (${platform.name})`,
      price: 'R$ 189,90',
      rating: 4.8,
      sales: 12400,
      supplier: 'Shenzhen Tech Co.',
    },
    hooks: [
      '🤯 "Você vai parar de pagar cinema depois de ver isso..." (Gancho de curiosidade + economia)',
      '🎬 "Testei o projetor mais barato da internet e OLHA O QUE ACONTECEU" (Formato review/honestidade)',
      '🔥 "3 motivos pra NÃO comprar um projetor (e 1 que muda tudo)" (Gatilho de curiosidade reversa)',
    ],
    swot: {
      strengths: ['Produto com alta margem (4x)', 'Fornecedor com boa avaliação', 'Produto leve (frete barato)'],
      weaknesses: ['Concorrência alta no nicho', 'Público cético com produtos chineses'],
      opportunities: ['Nicho de home office em alta', 'Poucos criativos nativos no TikTok', 'Possibilidade de bundle com suporte'],
      threats: ['Vendedores com preço mais baixo', 'Mudanças na política de dropshipping'],
    },
  };
}

export function DropshippingTab({ t, onImportProduct, consumeCredits, addRankPoints, isAdmin }: DropshippingTabProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformPalette>(dropshippingPalettes[0]);
  const [subTab, setSubTab] = useState<'scanner' | 'spy'>('scanner');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MinedData | null>(null);

  const handleMine = async () => {
    setError('');
    const clean = sanitizeInput(url);
    if (!clean.trim()) { setError(t('invalidLink')); return; }
    if (!isValidUrl(clean)) { setError(t('invalidLink')); return; }
    if (!dropshippingPalettes.some((p) => clean.toLowerCase().includes(p.id))) { setError(t('invalidLink')); return; }

    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(generateMinedData(clean));
    setLoading(false);
    if (!isAdmin) consumeCredits(20);
    addRankPoints(25);
  };

  const handleImport = (item: KnowledgeItem) => {
    onImportProduct(item.product, `${item.category} - ${item.platform}. ${item.tip}`, '');
    if (!isAdmin) consumeCredits(5);
  };

  const handleClone = (creative: SpyCreative) => {
    onImportProduct(creative.product, `Niche: ${creative.niche}. Hook: ${creative.hook}. Structure: ${creative.copyStructure}`, creative.hook);
    if (!isAdmin) consumeCredits(10);
  };

  const platformGlowStyle: React.CSSProperties = {
    boxShadow: `0 0 24px ${activePlatform.glow}, 0 0 0 1px ${activePlatform.glow}`,
  };

  const swotCards = result ? [
    { title: t('strengths'), icon: <Shield className="w-4 h-4 text-emerald-400" />, items: result.swot.strengths, color: 'border-emerald-500/20' },
    { title: t('weaknesses'), icon: <AlertTriangle className="w-4 h-4 text-amber-400" />, items: result.swot.weaknesses, color: 'border-amber-500/20' },
    { title: t('opportunities'), icon: <Lightbulb className="w-4 h-4 text-blue-400" />, items: result.swot.opportunities, color: 'border-blue-500/20' },
    { title: t('threats'), icon: <Target className="w-4 h-4 text-red-400" />, items: result.swot.threats, color: 'border-red-500/20' },
  ] : [];

  return (
    <div>
      <PageHeader title={t('dropTitle')} subtitle={t('dropSubtitle')} />

      {/* Platform palette selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {dropshippingPalettes.map((p) => (
            <button key={p.id} onClick={() => setActivePlatform(p)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${activePlatform.id === p.id ? 'text-white' : 'surface-subtle text-muted border-default hover:text-primary'}`} style={activePlatform.id === p.id ? { backgroundColor: p.color, borderColor: p.color, boxShadow: `0 0 16px ${p.glow}` } : {}}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 p-1.5 surface-subtle rounded-xl border border-default w-fit">
        {([{ v: 'scanner', l: t('linkValidator'), i: <Package className="w-4 h-4" /> }, { v: 'spy', l: t('spyFeed'), i: <Eye className="w-4 h-4" /> }] as const).map((tab) => (
          <button key={tab.v} onClick={() => setSubTab(tab.v)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${subTab === tab.v ? 'bg-accent-500 text-white shadow-glow' : 'text-muted hover:text-primary'}`}>{tab.i}{tab.l}</button>
        ))}
      </div>

      {subTab === 'scanner' && (
        <div style={platformGlowStyle} className="rounded-2xl transition-all duration-300">
          <SectionCard title={t('linkValidator')} subtitle={activePlatform.name} icon={<Link2 className="w-4 h-4" style={{ color: activePlatform.color }} />}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Link2 className="w-4 h-4 text-subtle absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" value={url} onChange={(e) => { setUrl(e.target.value); setError(''); }} placeholder={t('linkPlaceholder')} className={`${inputClass} pl-11`} />
              </div>
              <button onClick={handleMine} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{t('mining')}</> : <><Pickaxe className="w-4 h-4" />{t('mineCreatives')}</>}
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />{error}</p>}

            {loading && (
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (<div key={i} className="surface rounded-2xl p-6 animate-pulse"><div className="h-5 bg-white/5 rounded w-1/2 mb-4" /><div className="h-4 bg-white/5 rounded w-full mb-2" /><div className="h-4 bg-white/5 rounded w-3/4" /></div>))}
              </div>
            )}

            {result && !loading && (
              <div className="mt-6 space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-subtle border border-default">
                  <div><p className="text-[10px] text-muted uppercase tracking-wide mb-1">{t('product')}</p><p className="text-sm font-semibold text-primary">{result.analysis.name}</p></div>
                  <div><p className="text-[10px] text-muted uppercase tracking-wide mb-1">{t('price')}</p><p className="text-sm font-semibold text-primary">{result.analysis.price}</p></div>
                  <div><p className="text-[10px] text-muted uppercase tracking-wide mb-1">Rating</p><p className="text-sm font-semibold text-primary flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{result.analysis.rating}</p></div>
                  <div><p className="text-[10px] text-muted uppercase tracking-wide mb-1">{t('sales')}</p><p className="text-sm font-semibold text-primary">{result.analysis.sales.toLocaleString('pt-BR')}</p></div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2"><Zap className="w-4 h-4" style={{ color: activePlatform.color }} />{t('tiktokHooks')}</h3>
                  <div className="space-y-3">
                    {result.hooks.map((hook, i) => (
                      <div key={i} className="p-4 rounded-xl bg-surface-subtle border border-default">
                        <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span><p className="text-sm text-primary leading-relaxed">{hook}</p></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4" style={{ color: activePlatform.color }} />{t('swotAnalysis')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {swotCards.map((card) => (
                      <div key={card.title} className={`surface rounded-xl p-5 border ${card.color}`}>
                        <div className="flex items-center gap-2 mb-3">{card.icon}<h4 className="text-sm font-semibold text-primary">{card.title}</h4></div>
                        <ul className="space-y-2">{card.items.map((item, i) => (<li key={i} className="text-xs text-muted flex items-start gap-1.5"><span className="text-subtle mt-0.5">•</span>{item}</li>))}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {subTab === 'spy' && (
        <div className="space-y-6">
          <SectionCard title={t('spyFeed')} subtitle={t('spyFeedSubtitle')} icon={<Eye className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-4">
              {spyFeed.map((creative: SpyCreative) => (
                <div key={creative.id} className="p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Video thumbnail mock */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg bg-gradient-to-br from-ink-950 to-ink-800 border border-default flex items-center justify-center shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <Eye className="w-6 h-6 text-accent-400 relative" />
                      <span className="absolute bottom-1 right-1 text-[9px] text-white bg-black/60 px-1 rounded">{creative.duration}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-primary truncate">{creative.product}</h4>
                          <p className="text-[11px] text-muted">{creative.niche}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted mb-3 italic">"{creative.hook}"</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center p-2 rounded-lg bg-ink-950/40 border border-default"><p className="text-sm font-bold text-accent-400">{creative.ctr}%</p><p className="text-[9px] text-muted uppercase">{t('ctr')}</p></div>
                        <div className="text-center p-2 rounded-lg bg-ink-950/40 border border-default"><p className="text-sm font-bold text-emerald-400">{(creative.views / 1000000).toFixed(1)}M</p><p className="text-[9px] text-muted uppercase">{t('views')}</p></div>
                        <div className="text-center p-2 rounded-lg bg-ink-950/40 border border-default"><p className="text-sm font-bold text-amber-400">{(creative.clicks / 1000).toFixed(0)}K</p><p className="text-[9px] text-muted uppercase">{t('clicks')}</p></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleClone(creative)} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-500 to-blue-700 px-3 py-2 text-xs font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"><Copy className="w-3.5 h-3.5" />{t('cloneCopy')}</button>
                        <CopyButton text={creative.copyStructure} t={t} label={t('copy')} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Knowledge Bank */}
          <SectionCard title={t('knowledgeBank')} subtitle={t('knowledgeBankSubtitle')} icon={<Sparkles className="w-4 h-4 text-emerald-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dropshippingKnowledge.map((item: KnowledgeItem) => {
                const palette = dropshippingPalettes.find((p) => p.name === item.platform);
                return (
                  <div key={item.id} className="p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all" style={palette ? { boxShadow: `0 0 16px ${palette.glow}` } : {}}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette?.color }} />
                        <span className="text-[11px] font-medium text-muted">{item.platform}</span>
                        <span className="text-[10px] text-subtle">·</span>
                        <span className="text-[10px] text-subtle">{item.category}</span>
                      </div>
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
        </div>
      )}
    </div>
  );
}
