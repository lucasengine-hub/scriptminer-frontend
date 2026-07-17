import { useState } from 'react';
import { BookOpen, Layout, Sparkles, Loader2, FileText, BookMarked, ListTree, Zap } from 'lucide-react';
import { TONE_OPTIONS, generateEbookChapters, generateLandingBlocks, type EbookChapter, type LandingBlock } from '../lib/types';
import { CopyButton, Field, PageHeader, SectionCard, inputClass } from './ui';

type SubTab = 'ebook' | 'landing';

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  headline: <Zap className="w-4 h-4 text-amber-400" />,
  pain: <FileText className="w-4 h-4 text-red-400" />,
  benefits: <Sparkles className="w-4 h-4 text-emerald-400" />,
  testimonials: <BookMarked className="w-4 h-4 text-blue-400" />,
  faq: <ListTree className="w-4 h-4 text-purple-400" />,
  cta: <Zap className="w-4 h-4 text-accent-400" />,
};

export function EbookTab() {
  const [subTab, setSubTab] = useState<SubTab>('ebook');

  // Ebook state
  const [ebookTheme, setEbookTheme] = useState('');
  const [ebookTone, setEbookTone] = useState('formal');
  const [ebookLoading, setEbookLoading] = useState(false);
  const [chapters, setChapters] = useState<EbookChapter[]>([]);

  // Landing state
  const [landingOffer, setLandingOffer] = useState('');
  const [landingLoading, setLandingLoading] = useState(false);
  const [blocks, setBlocks] = useState<LandingBlock[]>([]);

  const handleGenerateEbook = async () => {
    if (!ebookTheme.trim() || ebookLoading) return;
    setEbookLoading(true);
    setChapters([]);
    await new Promise((r) => setTimeout(r, 1500));
    setChapters(generateEbookChapters(ebookTheme, ebookTone));
    setEbookLoading(false);
  };

  const handleGenerateLanding = async () => {
    if (!landingOffer.trim() || landingLoading) return;
    setLandingLoading(true);
    setBlocks([]);
    await new Promise((r) => setTimeout(r, 1500));
    setBlocks(generateLandingBlocks(landingOffer));
    setLandingLoading(false);
  };

  return (
    <div>
      <PageHeader title="Criador de E-books & Copys" subtitle="Gere estruturas completas de e-books e landing pages com IA." />

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 p-1.5 surface-subtle rounded-xl border border-default w-fit">
        <button
          onClick={() => setSubTab('ebook')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            subTab === 'ebook' ? 'bg-accent-500 text-white shadow-glow' : 'text-muted hover:text-primary'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Criar E-book
        </button>
        <button
          onClick={() => setSubTab('landing')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            subTab === 'landing' ? 'bg-accent-500 text-white shadow-glow' : 'text-muted hover:text-primary'
          }`}
        >
          <Layout className="w-4 h-4" />
          Criar Landing Page
        </button>
      </div>

      {subTab === 'ebook' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SectionCard title="Configuração do E-book" subtitle="Defina tema e tom de voz" icon={<BookOpen className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-5">
              <Field label="Tema do E-book" icon={<BookOpen className="w-4 h-4" />}>
                <input type="text" value={ebookTheme} onChange={(e) => setEbookTheme(e.target.value)} placeholder="Ex: Investimentos para Iniciantes" className={inputClass} />
              </Field>

              <Field label="Tom de Voz" icon={<Sparkles className="w-4 h-4" />}>
                <select
                  value={ebookTone}
                  onChange={(e) => setEbookTone(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat`}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")" }}
                >
                  {TONE_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value} className="bg-ink-800">{t.label}</option>
                  ))}
                </select>
              </Field>

              <button
                onClick={handleGenerateEbook}
                disabled={!ebookTheme.trim() || ebookLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {ebookLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Gerando estrutura...</> : <><Sparkles className="w-4 h-4" />Gerar Estrutura</>}
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Sumário Gerado" subtitle="5 capítulos estruturados" icon={<ListTree className="w-4 h-4 text-emerald-400" />}>
            {ebookLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-white/5 rounded w-full mb-1" />
                    <div className="h-3 bg-white/5 rounded w-4/5" />
                  </div>
                ))}
              </div>
            ) : chapters.length === 0 ? (
              <p className="text-sm text-muted text-center py-12">O sumário do seu e-book aparecerá aqui.</p>
            ) : (
              <div className="space-y-4">
                {chapters.map((ch) => (
                  <div key={ch.id} className="p-4 rounded-xl bg-surface-subtle border border-default animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {ch.number}
                      </span>
                      <h4 className="text-sm font-semibold text-primary">{ch.title}</h4>
                    </div>
                    <p className="text-xs text-muted mb-3">{ch.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ch.sections.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-muted border border-default">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <CopyButton text={chapters.map((c) => `Capítulo ${c.number}: ${c.title}\n${c.summary}\n${c.sections.join(', ')}`).join('\n\n')} label="Copiar Sumário" />
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {subTab === 'landing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SectionCard title="Configuração da Landing Page" subtitle="Defina a oferta principal" icon={<Layout className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-5">
              <Field label="Oferta Principal" icon={<Zap className="w-4 h-4" />}>
                <textarea value={landingOffer} onChange={(e) => setLandingOffer(e.target.value)} placeholder="Ex: Curso completo de tráfego pago por R$ 297" rows={3} className={`${inputClass} resize-none`} />
              </Field>

              <button
                onClick={handleGenerateLanding}
                disabled={!landingOffer.trim() || landingLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {landingLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Gerando blocos...</> : <><Sparkles className="w-4 h-4" />Gerar Landing Page</>}
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Estrutura da Página" subtitle="Blocos gerados pela IA" icon={<Layout className="w-4 h-4 text-emerald-400" />}>
            {landingLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-white/5 rounded w-full mb-1" />
                    <div className="h-3 bg-white/5 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : blocks.length === 0 ? (
              <p className="text-sm text-muted text-center py-12">A estrutura da sua landing page aparecerá aqui.</p>
            ) : (
              <div className="space-y-3">
                {blocks.map((block) => (
                  <div key={block.id} className="p-4 rounded-xl bg-surface-subtle border border-default animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2">
                      {BLOCK_ICONS[block.type]}
                      <h4 className="text-sm font-semibold text-primary">{block.title}</h4>
                    </div>
                    <pre className="text-xs text-muted whitespace-pre-wrap font-sans leading-relaxed">{block.content}</pre>
                  </div>
                ))}
                <CopyButton text={blocks.map((b) => `[${b.title}]\n${b.content}`).join('\n\n')} label="Copiar Estrutura" />
              </div>
            )}
          </SectionCard>
        </div>
      )}
    </div>
  );
}
