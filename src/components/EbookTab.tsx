import { useState } from 'react';
import { BookOpen, Layout, Sparkles, Loader2, FileText, BookMarked, ListTree, Zap, Download, Music, Type, Image } from 'lucide-react';
import { generateEbookChapters, generateLandingBlocks, cinematicPrompts, cinematicVideoAssets, type EbookChapter, type LandingBlock, type Prompt, type VideoAsset } from '../lib/mockdata';
import { CopyButton, Field, PageHeader, SectionCard, inputClass } from './ui';

type SubTab = 'ebook' | 'landing' | 'assets';

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  headline: <Zap className="w-4 h-4 text-amber-400" />,
  pain: <FileText className="w-4 h-4 text-red-400" />,
  benefits: <Sparkles className="w-4 h-4 text-emerald-400" />,
  testimonials: <BookMarked className="w-4 h-4 text-blue-400" />,
  faq: <ListTree className="w-4 h-4 text-purple-400" />,
  cta: <Zap className="w-4 h-4 text-accent-400" />,
};

const ASSET_ICONS = {
  soundtrack: <Music className="w-5 h-5" />,
  subtitle: <Type className="w-5 h-5" />,
  visual: <Image className="w-5 h-5" />,
};
const ASSET_COLORS = {
  soundtrack: 'bg-pink-500/15 text-pink-400',
  subtitle: 'bg-amber-500/15 text-amber-400',
  visual: 'bg-blue-500/15 text-blue-400',
};

interface EbookTabProps {
  t: (k: string) => string;
  consumeCredits: (amount: number) => void;
  addRankPoints: (amount: number) => void;
  isAdmin: boolean;
}

export function EbookTab({ t, consumeCredits, addRankPoints, isAdmin }: EbookTabProps) {
  const [subTab, setSubTab] = useState<SubTab>('ebook');
  const [ebookTheme, setEbookTheme] = useState('');
  const [ebookLoading, setEbookLoading] = useState(false);
  const [chapters, setChapters] = useState<EbookChapter[]>([]);
  const [landingOffer, setLandingOffer] = useState('');
  const [landingLoading, setLandingLoading] = useState(false);
  const [blocks, setBlocks] = useState<LandingBlock[]>([]);

  const handleEbook = async () => {
    if (!ebookTheme.trim() || ebookLoading) return;
    setEbookLoading(true);
    setChapters([]);
    await new Promise((r) => setTimeout(r, 1500));
    setChapters(generateEbookChapters(ebookTheme));
    setEbookLoading(false);
    if (!isAdmin) consumeCredits(15);
    addRankPoints(20);
  };

  const handleLanding = async () => {
    if (!landingOffer.trim() || landingLoading) return;
    setLandingLoading(true);
    setBlocks([]);
    await new Promise((r) => setTimeout(r, 1500));
    setBlocks(generateLandingBlocks(landingOffer));
    setLandingLoading(false);
    if (!isAdmin) consumeCredits(15);
    addRankPoints(20);
  };

  return (
    <div>
      <PageHeader title={t('ebookTitle')} subtitle={t('ebookSubtitle')} />

      <div className="flex gap-2 mb-6 p-1.5 surface-subtle rounded-xl border border-default w-fit flex-wrap">
        {([{ v: 'ebook', l: t('createEbook'), i: <BookOpen className="w-4 h-4" /> }, { v: 'landing', l: t('createLanding'), i: <Layout className="w-4 h-4" /> }, { v: 'assets', l: t('videoAssets'), i: <Film className="w-4 h-4" /> }] as const).map((tab) => (
          <button key={tab.v} onClick={() => setSubTab(tab.v)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${subTab === tab.v ? 'bg-accent-500 text-white shadow-glow' : 'text-muted hover:text-primary'}`}>
            {tab.i}{tab.l}
          </button>
        ))}
      </div>

      {subTab === 'ebook' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SectionCard title={t('createEbook')} subtitle="" icon={<BookOpen className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-5">
              <Field label={t('ebookTheme')} icon={<BookOpen className="w-4 h-4" />}>
                <input type="text" value={ebookTheme} onChange={(e) => setEbookTheme(e.target.value)} placeholder={t('ebookThemePlaceholder')} className={inputClass} />
              </Field>
              <button onClick={handleEbook} disabled={!ebookTheme.trim() || ebookLoading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {ebookLoading ? <><Loader2 className="w-4 h-4 animate-spin" />{t('generating')}</> : <><Sparkles className="w-4 h-4" />{t('generateStructure')}</>}
              </button>
            </div>
          </SectionCard>
          <SectionCard title={t('summary')} subtitle={`5 ${t('chapters')}`} icon={<ListTree className="w-4 h-4 text-emerald-400" />}>
            {ebookLoading ? (
              <div className="space-y-4">{[1, 2, 3, 4, 5].map((i) => (<div key={i} className="animate-pulse"><div className="h-4 bg-white/5 rounded w-2/3 mb-2" /><div className="h-3 bg-white/5 rounded w-full mb-1" /><div className="h-3 bg-white/5 rounded w-4/5" /></div>))}</div>
            ) : chapters.length === 0 ? (
              <p className="text-sm text-muted text-center py-12">{t('noHistory')}</p>
            ) : (
              <div className="space-y-4">
                {chapters.map((ch) => (
                  <div key={ch.id} className="p-4 rounded-xl bg-surface-subtle border border-default animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">{ch.number}</span>
                      <h4 className="text-sm font-semibold text-primary">{ch.title}</h4>
                    </div>
                    <p className="text-xs text-muted mb-3">{ch.summary}</p>
                    <div className="flex flex-wrap gap-1.5">{ch.sections.map((s) => (<span key={s} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-muted border border-default">{s}</span>))}</div>
                  </div>
                ))}
                <CopyButton text={chapters.map((c) => `Cap. ${c.number}: ${c.title}\n${c.summary}\n${c.sections.join(', ')}`).join('\n\n')} t={t} label={t('copy')} />
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {subTab === 'landing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SectionCard title={t('createLanding')} subtitle="" icon={<Layout className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-5">
              <Field label={t('landingOffer')} icon={<Zap className="w-4 h-4" />}>
                <textarea value={landingOffer} onChange={(e) => setLandingOffer(e.target.value)} placeholder={t('landingOfferPlaceholder')} rows={3} className={`${inputClass} resize-none`} />
              </Field>
              <button onClick={handleLanding} disabled={!landingOffer.trim() || landingLoading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {landingLoading ? <><Loader2 className="w-4 h-4 animate-spin" />{t('generating')}</> : <><Sparkles className="w-4 h-4" />{t('generateLanding')}</>}
              </button>
            </div>
          </SectionCard>
          <SectionCard title={t('pageStructure')} subtitle="" icon={<Layout className="w-4 h-4 text-emerald-400" />}>
            {landingLoading ? (
              <div className="space-y-4">{[1, 2, 3, 4, 5, 6].map((i) => (<div key={i} className="animate-pulse"><div className="h-4 bg-white/5 rounded w-1/3 mb-2" /><div className="h-3 bg-white/5 rounded w-full mb-1" /><div className="h-3 bg-white/5 rounded w-3/4" /></div>))}</div>
            ) : blocks.length === 0 ? (
              <p className="text-sm text-muted text-center py-12">{t('noHistory')}</p>
            ) : (
              <div className="space-y-3">
                {blocks.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl bg-surface-subtle border border-default animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-2">{BLOCK_ICONS[b.type]}<h4 className="text-sm font-semibold text-primary">{b.title}</h4></div>
                    <pre className="text-xs text-muted whitespace-pre-wrap font-sans leading-relaxed">{b.content}</pre>
                  </div>
                ))}
                <CopyButton text={blocks.map((b) => `[${b.title}]\n${b.content}`).join('\n\n')} t={t} label={t('copy')} />
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {subTab === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SectionCard title={t('prompts')} subtitle="Cinematic Ultra-Professional Dark" icon={<Sparkles className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-3 max-h-[32rem] overflow-y-auto scrollbar-thin pr-1">
              {cinematicPrompts.map((p: Prompt) => (
                <div key={p.id} className="p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0"><h4 className="text-sm font-semibold text-primary truncate">{p.title}</h4><p className="text-[11px] text-muted">{p.category}</p></div>
                    <span className="shrink-0 px-2 py-1 rounded-full text-[10px] font-medium bg-accent-500/15 text-accent-400 border border-accent-500/30">{p.platform}</span>
                  </div>
                  <p className="text-xs text-muted font-mono leading-relaxed bg-ink-950/60 rounded-lg p-3 mb-3 border border-default">{p.text}</p>
                  <CopyButton text={p.text} t={t} label={t('copy')} />
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title={t('videoAssets')} subtitle="Premium Dark aesthetic" icon={<Film className="w-4 h-4 text-emerald-400" />}>
            <div className="space-y-3 max-h-[32rem] overflow-y-auto scrollbar-thin pr-1">
              {cinematicVideoAssets.map((a: VideoAsset) => (
                <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${ASSET_COLORS[a.type]}`}>{ASSET_ICONS[a.type]}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-primary truncate">{a.title}</h4>
                    <p className="text-xs text-muted line-clamp-1">{a.description}</p>
                    <p className="text-[10px] text-subtle mt-1 font-mono">{a.meta}</p>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-default px-3 py-2 text-xs font-medium text-muted hover:bg-accent-500/15 hover:text-accent-400 hover:border-accent-500/30 transition-all"><Download className="w-3.5 h-3.5" />{t('download')}</button>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-accent-500/10 to-blue-700/10 border border-accent-500/20">
              <div className="flex items-center gap-2.5"><FileText className="w-4 h-4 text-accent-400 shrink-0" /><p className="text-xs text-muted">Padrão estético: Tons de cinza escuro, azul meia-noite, chiaroscuro. Proibido cores saturadas infantis. Legendas Inter Bold / Montserrat Black com sombreamento preto.</p></div>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

import { Film } from 'lucide-react';
