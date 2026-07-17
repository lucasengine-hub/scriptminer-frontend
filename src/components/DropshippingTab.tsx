import { useState } from 'react';
import { Package, Link2, Loader2, Pickaxe, Star, TrendingUp, AlertTriangle, Target, Shield, Lightbulb, Zap } from 'lucide-react';
import { generateMinedData, type MinedProduct } from '../lib/types';
import { PageHeader, SectionCard, inputClass } from './ui';

export function DropshippingTab() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ analysis: MinedProduct; hooks: string[]; swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] } } | null>(null);

  const validateUrl = (val: string): boolean => {
    const lower = val.toLowerCase();
    return lower.includes('aliexpress') || lower.includes('shopee') || lower.includes('amazon');
  };

  const handleMine = async () => {
    setError('');
    if (!url.trim()) {
      setError('Insira um link de produto.');
      return;
    }
    if (!validateUrl(url)) {
      setError('Link inválido. Use um link do AliExpress, Shopee ou Amazon.');
      return;
    }

    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(generateMinedData(url));
    setLoading(false);
  };

  const swotCards = result ? [
    { title: 'Forças', icon: <Shield className="w-4 h-4 text-emerald-400" />, items: result.swot.strengths, color: 'border-emerald-500/20' },
    { title: 'Fraquezas', icon: <AlertTriangle className="w-4 h-4 text-amber-400" />, items: result.swot.weaknesses, color: 'border-amber-500/20' },
    { title: 'Oportunidades', icon: <Lightbulb className="w-4 h-4 text-blue-400" />, items: result.swot.opportunities, color: 'border-blue-500/20' },
    { title: 'Ameaças', icon: <Target className="w-4 h-4 text-red-400" />, items: result.swot.threats, color: 'border-red-500/20' },
  ] : [];

  return (
    <div>
      <PageHeader title="Mineração de Fornecedores & Páginas de Vendas" subtitle="Valide links de produtos físicos e minere criativos e análise competitiva." />

      {/* Link validator */}
      <SectionCard title="Validador de Link" subtitle="Cole um link do AliExpress, Shopee ou Amazon" icon={<Link2 className="w-4 h-4 text-accent-400" />}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Link2 className="w-4 h-4 text-subtle absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              placeholder="https://aliexpress.com/item/xxxxx"
              className={`${inputClass} pl-11`}
            />
          </div>
          <button
            onClick={handleMine}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Minerando...</> : <><Pickaxe className="w-4 h-4" />Minerar Criativos</>}
          </button>
        </div>
        {error && <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />{error}</p>}
      </SectionCard>

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="surface rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-white/5 rounded w-1/2 mb-4" />
            <div className="h-4 bg-white/5 rounded w-full mb-2" />
            <div className="h-4 bg-white/5 rounded w-3/4" />
          </div>
          <div className="surface rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-white/5 rounded w-1/2 mb-4" />
            <div className="h-4 bg-white/5 rounded w-full mb-2" />
            <div className="h-4 bg-white/5 rounded w-4/5" />
          </div>
          <div className="surface rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-white/5 rounded w-1/2 mb-4" />
            <div className="h-4 bg-white/5 rounded w-full mb-2" />
            <div className="h-4 bg-white/5 rounded w-3/4" />
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-6 space-y-6 animate-fade-in-up">
          {/* Product analysis */}
          <SectionCard title="Análise do Produto" subtitle="Dados extraídos da página" icon={<Package className="w-4 h-4 text-accent-400" />}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wide mb-1">Produto</p>
                <p className="text-sm font-semibold text-primary">{result.analysis.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wide mb-1">Preço</p>
                <p className="text-sm font-semibold text-primary">{result.analysis.price}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wide mb-1">Avaliação</p>
                <p className="text-sm font-semibold text-primary flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {result.analysis.rating}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wide mb-1">Vendas</p>
                <p className="text-sm font-semibold text-primary">{result.analysis.sales.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-default">
              <p className="text-[10px] text-muted uppercase tracking-wide mb-1">Fornecedor</p>
              <p className="text-sm font-semibold text-primary">{result.analysis.supplier}</p>
            </div>
          </SectionCard>

          {/* Hooks */}
          <SectionCard title="Ganchos em Vídeo para TikTok" subtitle="3 sugestões de alto impacto" icon={<Zap className="w-4 h-4 text-amber-400" />}>
            <div className="space-y-3">
              {result.hooks.map((hook, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-subtle border border-default">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <p className="text-sm text-primary leading-relaxed">{hook}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* SWOT */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent-400" />
              Análise SWOT — Concorrência Direta
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {swotCards.map((card) => (
                <div key={card.title} className={`surface rounded-xl p-5 border ${card.color}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {card.icon}
                    <h4 className="text-sm font-semibold text-primary">{card.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {card.items.map((item, i) => (
                      <li key={i} className="text-xs text-muted flex items-start gap-1.5">
                        <span className="text-subtle mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
