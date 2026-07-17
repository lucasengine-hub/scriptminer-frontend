import { useState, useMemo } from 'react';
import { Package, FileText, DollarSign, Film, Zap, Loader2, Clapperboard, Sparkles, Users, Clock, Type } from 'lucide-react';
import { STYLE_OPTIONS, generateScript, countWords, estimateSpeechTime, type ScriptStyle, type Product } from '../lib/types';
import { CopyButton, Field, PageHeader, SectionCard, inputClass } from './ui';

interface MiningTabProps {
  onProductCreated: (product: Product) => void;
}

const DEFAULT_OUTPUT = 'Seu roteiro gerado por IA aparecerá aqui...';

export function MiningTab({ onProductCreated }: MiningTabProps) {
  const [form, setForm] = useState({
    productName: '',
    description: '',
    price: '',
    audience: '',
    style: 'persuasive' as ScriptStyle,
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(DEFAULT_OUTPUT);
  const [hasResult, setHasResult] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = form.productName.trim() && form.description.trim() && form.price.trim() && Number(form.price) > 0;

  const stats = useMemo(() => {
    if (!hasResult) return { chars: 0, words: 0, time: 0 };
    return {
      chars: output.length,
      words: countWords(output),
      time: estimateSpeechTime(output),
    };
  }, [output, hasResult]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !isValid) return;

    const e2: Record<string, string> = {};
    if (!form.productName.trim()) e2.productName = 'Informe o nome do produto';
    if (!form.description.trim()) e2.description = 'Descreva o produto';
    if (!form.price.trim() || Number(form.price) <= 0) e2.price = 'Preço inválido';
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setLoading(true);
    setHasResult(false);
    setOutput('');

    await new Promise((r) => setTimeout(r, 2000));

    const script = generateScript(form.productName, form.description, form.price, form.style, form.audience);
    setOutput(script);
    setHasResult(true);
    setLoading(false);

    onProductCreated({
      id: `p${Date.now()}`,
      name: form.productName,
      description: form.description,
      price: Number(form.price),
      style: form.style,
      audience: form.audience,
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
      clicks: 0,
      sales: 0,
      commission: 0,
    });
  };

  return (
    <div>
      <PageHeader title="Geração de Roteiros" subtitle="Preencha os dados do produto e nossa IA cria um roteiro persuasivo pronto pra gravar." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Form */}
        <SectionCard title="Dados do Produto" subtitle="Preencha para gerar o roteiro" icon={<Zap className="w-4 h-4 text-accent-400" />}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Nome do Produto" icon={<Package className="w-4 h-4" />} error={errors.productName}>
              <input type="text" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} placeholder="Ex: Curso de Tráfego Pago Master" className={inputClass} />
            </Field>

            <Field label="Descrição Detalhada do Produto" icon={<FileText className="w-4 h-4" />} error={errors.description}>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descreva o produto, seus diferenciais e principais benefícios..." rows={4} className={`${inputClass} resize-none`} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Preço de Venda" icon={<DollarSign className="w-4 h-4" />} error={errors.price}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle text-sm pointer-events-none">R$</span>
                  <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="297,00" className={`${inputClass} pl-12`} />
                </div>
              </Field>

              <Field label="Público-Alvo" icon={<Users className="w-4 h-4" />}>
                <input type="text" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} placeholder="Ex: afiliados iniciantes" className={inputClass} />
              </Field>
            </div>

            <Field label="Estilo do Roteiro" icon={<Film className="w-4 h-4" />}>
              <select
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value as ScriptStyle })}
                className={`${inputClass} appearance-none cursor-pointer bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                }}
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-ink-800 text-slate-100">{opt.label}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-muted">{STYLE_OPTIONS.find((o) => o.value === form.style)?.hint}</p>
            </Field>

            <button
              type="submit"
              disabled={loading || !isValid}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-6 py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2.5">
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" />Gerando roteiro...</>
                ) : (
                  <><Zap className="w-5 h-5 transition-transform group-hover:scale-110" />Salvar e Gerar Roteiro</>
                )}
              </span>
            </button>
            {!isValid && !loading && (
              <p className="text-xs text-amber-400/80 text-center -mt-2">Preencha todos os campos obrigatórios para habilitar o botão.</p>
            )}
          </form>
        </SectionCard>

        {/* Right: Teleprompter */}
        <SectionCard
          title="Teleprompter"
          subtitle="Roteiro final gerado por IA"
          icon={<Clapperboard className="w-4 h-4 text-emerald-400" />}
          actions={hasResult ? <CopyButton text={output} /> : undefined}
        >
          <div className="relative h-[30rem] overflow-y-auto scrollbar-thin rounded-xl bg-surface-subtle border border-default p-5">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-accent-500/20 border-t-accent-500 animate-spin" />
                  <Sparkles className="w-5 h-5 text-accent-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-sm text-muted animate-pulse">Minando o melhor ângulo do produto...</p>
                <div className="w-48 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
            ) : (
              <pre className={`whitespace-pre-wrap break-words font-sans text-sm leading-relaxed ${hasResult ? 'text-primary animate-fade-in-up' : 'text-muted italic'}`}>
                {output}
              </pre>
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="surface-subtle rounded-xl border border-default p-3 text-center">
              <Type className="w-4 h-4 text-accent-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{stats.chars}</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">Caracteres</p>
            </div>
            <div className="surface-subtle rounded-xl border border-default p-3 text-center">
              <FileText className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{stats.words}</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">Palavras</p>
            </div>
            <div className="surface-subtle rounded-xl border border-default p-3 text-center">
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{stats.time}s</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">Tempo est.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
