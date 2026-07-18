import { useState, useMemo, useEffect } from 'react';
import {
  Package, FileText, DollarSign, Film, Zap, Loader2, Clapperboard, Sparkles,
  Users, Clock, Type, Search, Star, Trash2, User, Volume2, Captions, Brain,
} from 'lucide-react';
import {
  type ScriptStyle, type MediaConfig, generateScript, countWords, estimateSpeechTime,
} from '../lib/mockdata';
import { detectNiche } from '../lib/security';
import { CopyButton, Field, PageHeader, SectionCard, inputClass } from './ui';
import type { ScriptRecord } from '../lib/store';

interface MiningTabProps {
  t: (k: string) => string;
  onGenerate: (productName: string, style: string, output: string, niche: string) => void;
  history: ScriptRecord[];
  onToggleFav: (id: string) => void;
  onDeleteRecord: (id: string) => void;
  consumeCredits: (amount: number) => void;
  addRankPoints: (amount: number) => void;
  isAdmin: boolean;
  prefillData?: { productName: string; description: string; hook: string } | null;
  onPrefillConsumed?: () => void;
}

const DEFAULT_OUTPUT = 'teleprompterPlaceholder';

export function MiningTab({ t, onGenerate, history, onToggleFav, onDeleteRecord, consumeCredits, addRankPoints, isAdmin, prefillData, onPrefillConsumed }: MiningTabProps) {
  const [form, setForm] = useState({ productName: '', description: '', price: '', audience: '', style: 'persuasive' as ScriptStyle });
  const [media, setMedia] = useState<MediaConfig>({
    presenter: 'male', presenterCustom: '', voiceTone: 'deep',
    subtitleStyle: 'hormozi', subtitleCustom: '', archetype: 'viral',
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [hasResult, setHasResult] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [showFavOnly, setShowFavOnly] = useState(false);

  // Consume prefill data from spy feed / knowledge bank
  useEffect(() => {
    if (prefillData && onPrefillConsumed) {
      setForm((prev) => ({ ...prev, productName: prefillData.productName, description: prefillData.description }));
      setMedia((prev) => ({ ...prev, presenter: 'male', voiceTone: 'viral', archetype: 'viral' }));
      onPrefillConsumed();
    }
  }, [prefillData, onPrefillConsumed]);

  const isValid = form.productName.trim() && form.description.trim() && form.price.trim() && Number(form.price) > 0;

  const blackBox = useMemo(() => {
    const text = `${form.productName} ${form.description} ${form.audience}`;
    return detectNiche(text);
  }, [form.productName, form.description, form.audience]);

  const stats = useMemo(() => {
    if (!hasResult) return { chars: 0, words: 0, time: 0 };
    return { chars: output.length, words: countWords(output), time: estimateSpeechTime(output) };
  }, [output, hasResult]);

  const filteredHistory = useMemo(() => {
    let h = history;
    if (showFavOnly) h = h.filter((r) => r.favorite);
    if (search.trim()) {
      const s = search.toLowerCase();
      h = h.filter((r) => r.productName.toLowerCase().includes(s) || r.niche.toLowerCase().includes(s) || r.style.toLowerCase().includes(s));
    }
    return h;
  }, [history, search, showFavOnly]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !isValid) return;
    const e2: Record<string, string> = {};
    if (!form.productName.trim()) e2.productName = 'Obrigatório';
    if (!form.description.trim()) e2.description = 'Obrigatório';
    if (!form.price.trim() || Number(form.price) <= 0) e2.price = 'Inválido';
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setLoading(true);
    setHasResult(false);
    setOutput('');

    // Simulate async API call using window.location.origin (relative path)
    const apiBase = window.location.origin;
    await new Promise((r) => setTimeout(r, 2000));
    // Simulated POST to `${apiBase}/api/v1/scripts/generate`
    void apiBase;

    const script = generateScript(form.productName, form.description, form.price, form.style, form.audience, media);
    setOutput(script);
    setHasResult(true);
    setLoading(false);

    if (!isAdmin) consumeCredits(10);
    addRankPoints(15);
    onGenerate(form.productName, form.style, script, blackBox?.niche ?? 'Geral');
  };

  const selectClass = `${inputClass} appearance-none cursor-pointer bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat`;
  const arrowStyle = { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")" };

  const styleOptions = [
    { value: 'persuasive', label: t('stylePersuasive') },
    { value: 'storytelling', label: t('styleStorytelling') },
    { value: 'humorous', label: t('styleHumorous') },
    { value: 'objection', label: t('styleObjection') },
  ];

  return (
    <div>
      <PageHeader title={t('miningTitle')} subtitle={t('miningSubtitle')} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Form + Media Matrix */}
        <div className="space-y-6">
          <SectionCard title={t('productData')} subtitle="" icon={<Zap className="w-4 h-4 text-accent-400" />}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label={t('productName')} icon={<Package className="w-4 h-4" />} error={errors.productName}>
                <input type="text" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} placeholder={t('productNamePlaceholder')} className={inputClass} />
              </Field>
              <Field label={t('productDesc')} icon={<FileText className="w-4 h-4" />} error={errors.description}>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t('productDescPlaceholder')} rows={3} className={`${inputClass} resize-none`} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t('sellPrice')} icon={<DollarSign className="w-4 h-4" />} error={errors.price}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle text-sm pointer-events-none">R$</span>
                    <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="297,00" className={`${inputClass} pl-12`} />
                  </div>
                </Field>
                <Field label={t('targetAudience')} icon={<Users className="w-4 h-4" />}>
                  <input type="text" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} placeholder={t('targetAudiencePlaceholder')} className={inputClass} />
                </Field>
              </div>
              <Field label={t('scriptStyle')} icon={<Film className="w-4 h-4" />}>
                <select value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value as ScriptStyle })} className={selectClass} style={arrowStyle}>
                  {styleOptions.map((o) => <option key={o.value} value={o.value} className="bg-ink-800">{o.label}</option>)}
                </select>
              </Field>

              {/* Media Matrix */}
              <div className="pt-2 border-t border-default">
                <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2"><Clapperboard className="w-4 h-4 text-accent-400" />{t('mediaMatrix')}</p>

                {/* Presenter */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-muted mb-2"><User className="w-3.5 h-3.5" />{t('presenter')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {([{ v: 'male', l: t('presenterMale') }, { v: 'female', l: t('presenterFemale') }, { v: 'other', l: t('presenterOther') }] as const).map((opt) => (
                      <button key={opt.v} type="button" onClick={() => setMedia({ ...media, presenter: opt.v })} className={`px-2 py-2 rounded-lg text-xs font-medium transition-all border ${media.presenter === opt.v ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}>{opt.l}</button>
                    ))}
                  </div>
                  {media.presenter === 'other' && (
                    <input type="text" value={media.presenterCustom} onChange={(e) => setMedia({ ...media, presenterCustom: e.target.value })} placeholder={t('presenterOtherPlaceholder')} className={`${inputClass} mt-2 text-sm`} />
                  )}
                </div>

                {/* Voice */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-muted mb-2"><Volume2 className="w-3.5 h-3.5" />{t('voiceTone')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([{ v: 'deep', l: t('voiceDeep') }, { v: 'corporate', l: t('voiceCorporate') }, { v: 'natural', l: t('voiceNatural') }, { v: 'viral', l: t('voiceViral') }] as const).map((opt) => (
                      <button key={opt.v} type="button" onClick={() => setMedia({ ...media, voiceTone: opt.v })} className={`px-2 py-2 rounded-lg text-xs font-medium transition-all border text-left ${media.voiceTone === opt.v ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}>{opt.l}</button>
                    ))}
                  </div>
                </div>

                {/* Subtitle */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-muted mb-2"><Captions className="w-3.5 h-3.5" />{t('subtitleStyle')}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {([{ v: 'hormozi', l: t('subtitleHormozi') }, { v: 'clean', l: t('subtitleClean') }, { v: 'custom', l: t('subtitleCustom') }] as const).map((opt) => (
                      <button key={opt.v} type="button" onClick={() => setMedia({ ...media, subtitleStyle: opt.v })} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border text-left ${media.subtitleStyle === opt.v ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}>{opt.l}</button>
                    ))}
                  </div>
                  {media.subtitleStyle === 'custom' && (
                    <input type="text" value={media.subtitleCustom} onChange={(e) => setMedia({ ...media, subtitleCustom: e.target.value })} placeholder={t('subtitleCustomPlaceholder')} className={`${inputClass} mt-2 text-sm`} />
                  )}
                </div>

                {/* Archetype */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-muted mb-2"><Brain className="w-3.5 h-3.5" />{t('archetype')}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {([{ v: 'viral', l: t('archViral') }, { v: 'corporate', l: t('archCorporate') }, { v: 'sexy', l: t('archSexy') }] as const).map((opt) => (
                      <button key={opt.v} type="button" onClick={() => setMedia({ ...media, archetype: opt.v })} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border text-left ${media.archetype === opt.v ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}>{opt.l}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Black Box */}
              {blackBox && (
                <div className="p-4 rounded-xl bg-black/30 border border-accent-500/20 animate-fade-in-up">
                  <p className="text-xs font-semibold text-accent-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />{t('blackBoxTitle')}
                  </p>
                  <p className="text-[11px] text-muted mb-2">{t('blackBoxDetected')}: <span className="text-primary font-medium">{blackBox.niche}</span></p>
                  <p className="text-xs text-muted leading-relaxed">{blackBox.insight}</p>
                </div>
              )}

              <button type="submit" disabled={loading || !isValid} className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-6 py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                <span className="flex items-center justify-center gap-2.5">
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" />{t('generating')}</> : <><Zap className="w-5 h-5 transition-transform group-hover:scale-110" />{t('saveGenerate')}</>}
                </span>
              </button>
              {!isValid && !loading && <p className="text-xs text-amber-400/80 text-center -mt-2">{t('fillRequired')}</p>}
            </form>
          </SectionCard>

          {/* History */}
          <SectionCard title={t('history')} subtitle={`${history.length} ${t('transactions')}`} icon={<FileText className="w-4 h-4 text-emerald-400" />}
            actions={<button onClick={() => setShowFavOnly(!showFavOnly)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${showFavOnly ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}><Star className={`w-3.5 h-3.5 ${showFavOnly ? 'fill-amber-400' : ''}`} /></button>}>
            <div className="mb-3 relative">
              <Search className="w-4 h-4 text-subtle absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('search')} className={`${inputClass} pl-10 py-2 text-sm`} />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
              {filteredHistory.length === 0 ? (
                <p className="text-sm text-muted text-center py-6">{t('noHistory')}</p>
              ) : filteredHistory.map((rec) => (
                <div key={rec.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-subtle border border-default hover:border-strong transition-all">
                  <button onClick={() => onToggleFav(rec.id)} className="text-muted hover:text-amber-400 transition-colors shrink-0">
                    <Star className={`w-4 h-4 ${rec.favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{rec.productName}</p>
                    <p className="text-[11px] text-muted">{rec.niche} · {rec.style}</p>
                  </div>
                  <CopyButton text={rec.output} t={t} label="" />
                  <button onClick={() => onDeleteRecord(rec.id)} className="text-muted hover:text-red-400 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right: Teleprompter */}
        <SectionCard title={t('teleprompter')} subtitle="" icon={<Clapperboard className="w-4 h-4 text-emerald-400" />} actions={hasResult ? <CopyButton text={output} t={t} /> : undefined}>
          <div className="relative h-[30rem] overflow-y-auto scrollbar-thin rounded-xl bg-surface-subtle border border-default p-5">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-accent-500/20 border-t-accent-500 animate-spin" />
                  <Sparkles className="w-5 h-5 text-accent-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-sm text-muted animate-pulse">Minando o melhor ângulo do produto...</p>
              </div>
            ) : (
              <pre className={`whitespace-pre-wrap break-words font-sans text-sm leading-relaxed ${hasResult ? 'text-primary animate-fade-in-up' : 'text-muted italic'}`}>{hasResult ? output : t(DEFAULT_OUTPUT)}</pre>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="surface-subtle rounded-xl border border-default p-3 text-center">
              <Type className="w-4 h-4 text-accent-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{stats.chars}</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">{t('characters')}</p>
            </div>
            <div className="surface-subtle rounded-xl border border-default p-3 text-center">
              <FileText className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{stats.words}</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">{t('words')}</p>
            </div>
            <div className="surface-subtle rounded-xl border border-default p-3 text-center">
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{stats.time}s</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">{t('speechTime')}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
