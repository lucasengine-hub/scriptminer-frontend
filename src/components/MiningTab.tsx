import { useState } from 'react';
import { Package, FileText, DollarSign, Film, Zap, Loader2, Clapperboard, Sparkles } from 'lucide-react';
import { STYLE_OPTIONS, generateScript, type ScriptStyle, type Product } from '../lib/types';
import { CopyButton, PageHeader, SectionCard } from './ui';

interface MiningTabProps {
  onProductCreated: (product: Product) => void;
}

const DEFAULT_OUTPUT = 'Seu roteiro gerado por IA aparecerá aqui...';

export function MiningTab({ onProductCreated }: MiningTabProps) {
  const [form, setForm] = useState({
    productName: '',
    description: '',
    price: '',
    style: 'persuasive' as ScriptStyle,
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(DEFAULT_OUTPUT);
  const [hasResult, setHasResult] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.productName.trim()) e.productName = 'Informe o nome do produto';
    if (!form.description.trim()) e.description = 'Descreva o produto';
    if (!form.price.trim() || Number(form.price) <= 0) e.price = 'Preço inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    setHasResult(false);
    setOutput('');

    // Simula POST para FastAPI: cria produto, recupera ID, gera roteiro
    await new Promise((r) => setTimeout(r, 2000));

    const script = generateScript(form.productName, form.description, form.price, form.style);
    setOutput(script);
    setHasResult(true);
    setLoading(false);

    onProductCreated({
      id: `p${Date.now()}`,
      name: form.productName,
      description: form.description,
      price: Number(form.price),
      style: form.style,
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
      clicks: 0,
      sales: 0,
      commission: 0,
    });
  };

  const inputBase =
    'w-full rounded-xl bg-ink-950/60 border border-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20 hover:border-white/10';

  return (
    <div>
      <PageHeader
        title="Mineração de Produtos"
        subtitle="Preencha os dados do produto e nossa IA cria um roteiro persuasivo pronto pra gravar."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Form */}
        <SectionCard title="Dados do Produto" subtitle="Preencha para gerar o roteiro" icon={<Zap className="w-4 h-4 text-accent-400" />}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Package className="w-4 h-4 text-slate-400" />
                Nome do Produto
              </label>
              <input
                type="text"
                value={form.productName}
                onChange={(e) => setForm({ ...form, productName: e.target.value })}
                placeholder="Ex: Curso de Tráfego Pago Master"
                className={inputBase}
              />
              {errors.productName && <p className="mt-1.5 text-xs text-red-400">{errors.productName}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Descrição Detalhada do Produto
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descreva o produto, seus diferenciais, público-alvo e principais benefícios..."
                rows={5}
                className={`${inputBase} resize-none`}
              />
              {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                Preço de Venda
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="297,00"
                  className={`${inputBase} pl-12`}
                />
              </div>
              {errors.price && <p className="mt-1.5 text-xs text-red-400">{errors.price}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Film className="w-4 h-4 text-slate-400" />
                Estilo do Roteiro
              </label>
              <select
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value as ScriptStyle })}
                className={`${inputBase} appearance-none cursor-pointer bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                }}
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-ink-800 text-slate-100">
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                {STYLE_OPTIONS.find((o) => o.value === form.style)?.hint}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-6 py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando roteiro...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 transition-transform group-hover:scale-110" />
                    Salvar e Gerar Roteiro
                  </>
                )}
              </span>
            </button>
          </form>
        </SectionCard>

        {/* Right: Teleprompter */}
        <SectionCard
          title="Teleprompter"
          subtitle="Roteiro final gerado por IA"
          icon={<Clapperboard className="w-4 h-4 text-emerald-400" />}
          actions={hasResult ? <CopyButton text={output} /> : undefined}
        >
          <div className="relative h-[32rem] overflow-y-auto scrollbar-thin rounded-xl bg-ink-950/60 border border-white/5 p-5">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-accent-500/20 border-t-accent-500 animate-spin" />
                  <Sparkles className="w-5 h-5 text-accent-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-sm text-slate-400 animate-pulse">Minando o melhor ângulo do produto...</p>
                <div className="w-48 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
            ) : (
              <pre
                className={`whitespace-pre-wrap break-words font-sans text-sm leading-relaxed ${
                  hasResult ? 'text-slate-100 animate-fade-in-up' : 'text-slate-500 italic'
                }`}
              >
                {output}
              </pre>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {hasResult ? `${output.length} caracteres` : 'Aguardando geração'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              {hasResult ? 'Pronto para gravação' : '—'}
            </span>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
