import { useState } from 'react';
import { Film, Music, Captions, Mic, Globe, Play, Upload, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { SectionCard, PageHeader, Badge, CopyButton } from './ui';

interface StudioTabProps {
  t: (k: string) => string;
}

const DUB_LANGS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
];

export function StudioTab({ t }: StudioTabProps) {
  const [cloning, setCloning] = useState(false);
  const [cloned, setCloned] = useState(false);
  const [dubLang, setDubLang] = useState('en');
  const [dubbing, setDubbing] = useState(false);
  const [dubbed, setDubbed] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [script] = useState('🚨 Para tudo! Você ainda não conhece o VRTX? Está perdendo dinheiro. Apresento o ecossistema completo de escala digital.');

  const handleCloneVoice = async () => {
    setCloning(true);
    await new Promise((r) => setTimeout(r, 1800));
    setCloning(false);
    setCloned(true);
  };

  const handleAutoDub = async () => {
    setDubbing(true);
    setDubbed(false);
    await new Promise((r) => setTimeout(r, 1500));
    setDubbing(false);
    setDubbed(true);
  };

  const handleRender = async () => {
    setRendering(true);
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress((p) => {
        if (p >= 100) { clearInterval(interval); setRendering(false); return 100; }
        return p + 5;
      });
    }, 120);
  };

  const tracks = [
    { id: 'video' as const, label: t('trackVideo'), icon: <Film className="w-4 h-4" />, color: 'from-blue-500 to-blue-700', clips: [{ name: 'Hook 0-3s', start: 0, dur: 30 }, { name: 'Demo 3-10s', start: 30, dur: 50 }, { name: 'CTA 10-15s', start: 80, dur: 20 }] },
    { id: 'audio' as const, label: t('trackAudio'), icon: <Music className="w-4 h-4" />, color: 'from-emerald-500 to-emerald-700', clips: [{ name: 'Neon Pulse 120BPM', start: 0, dur: 100 }] },
    { id: 'subtitle' as const, label: t('trackSubtitle'), icon: <Captions className="w-4 h-4" />, color: 'from-amber-500 to-amber-700', clips: [{ name: 'Hormozi Neon', start: 0, dur: 40 }, { name: 'Clean Montserrat', start: 40, dur: 60 }] },
  ];

  return (
    <div>
      <PageHeader title={t('studioTitle')} subtitle={t('studioSubtitle')} />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <SectionCard title={t('cloneVoice')} subtitle={cloned ? 'Voz clonada com sucesso' : 'Upload de áudio para clonar'} icon={<Mic className="w-4 h-4 text-emerald-400" />}>
          <button
            onClick={handleCloneVoice}
            disabled={cloning}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-70"
          >
            {cloning ? <><Loader2 className="w-4 h-4 animate-spin" />{t('cloningVoice')}</> : <><Upload className="w-4 h-4" />{t('uploadAudio')}</>}
          </button>
          {cloned && <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400"><Sparkles className="w-3.5 h-3.5" />Voz sintetizada e pronta para dublagem.</div>}
        </SectionCard>

        <SectionCard title={t('autoDub')} subtitle={dubbed ? `Dublado para ${DUB_LANGS.find((l) => l.code === dubLang)?.label}` : 'Tradução automática do roteiro'} icon={<Globe className="w-4 h-4 text-accent-400" />}>
          <select
            value={dubLang}
            onChange={(e) => { setDubLang(e.target.value); setDubbed(false); }}
            className="w-full rounded-xl bg-surface-subtle border border-default px-4 py-3 text-sm text-primary mb-3 focus:outline-none focus:border-accent-500/60"
          >
            {DUB_LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          <button
            onClick={handleAutoDub}
            disabled={dubbing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow disabled:opacity-70"
          >
            {dubbing ? <><Loader2 className="w-4 h-4 animate-spin" />{t('dubbingTo')} {DUB_LANGS.find((l) => l.code === dubLang)?.label}...</> : <><Wand2 className="w-4 h-4" />{t('autoDub')}</>}
          </button>
        </SectionCard>

        <SectionCard title={t('renderPreview')} subtitle={rendering ? `${renderProgress}%` : 'Renderização final do vídeo'} icon={<Play className="w-4 h-4 text-amber-400" />}>
          <button
            onClick={handleRender}
            disabled={rendering}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] disabled:opacity-70"
          >
            {rendering ? <><Loader2 className="w-4 h-4 animate-spin" />{t('rendering')}</> : <><Play className="w-4 h-4" />{t('renderPreview')}</>}
          </button>
          {rendering && (
            <div className="mt-3 h-2 rounded-full bg-surface-subtle overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-150" style={{ width: `${renderProgress}%` }} />
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard title={t('studioEditor')} subtitle="Timeline estilo CapCut com faixas de edição" icon={<Film className="w-4 h-4 text-accent-400" />}>
        <div className="space-y-3">
          {tracks.map((track) => (
            <div key={track.id} className="flex items-center gap-3">
              <div className={`w-28 shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${track.color} text-white text-xs font-semibold`}>
                {track.icon}{track.label}
              </div>
              <div className="flex-1 h-14 rounded-lg bg-surface-subtle border border-default relative overflow-hidden">
                {track.clips.map((clip, i) => (
                  <div
                    key={i}
                    className={`absolute top-1.5 bottom-1.5 rounded-md bg-gradient-to-r ${track.color} opacity-80 flex items-center px-2 text-[10px] font-medium text-white truncate`}
                    style={{ left: `${clip.start}%`, width: `${clip.dur}%` }}
                  >
                    {clip.name}
                  </div>
                ))}
                <div className="absolute top-0 bottom-0 w-0.5 bg-red-500" style={{ left: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <SectionCard title="Roteiro Ativo" subtitle="Script em PT-BR" icon={<Captions className="w-4 h-4 text-accent-400" />}>
          <div className="rounded-xl bg-surface-subtle border border-default p-4 text-sm text-muted whitespace-pre-wrap leading-relaxed">{script}</div>
          <div className="mt-3 flex items-center gap-2">
            <CopyButton text={script} t={t} />
            <Badge status="active" label="PT-BR" />
            {dubbed && <Badge status="published" label={`Dubbed: ${DUB_LANGS.find((l) => l.code === dubLang)?.label}`} />}
          </div>
        </SectionCard>

        <SectionCard title="Configuração de Saída" subtitle="Parâmetros de renderização" icon={<Sparkles className="w-4 h-4 text-amber-400" />}>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-surface-subtle border border-default p-3"><p className="text-[10px] text-muted uppercase">Resolução</p><p className="text-primary font-semibold">1080×1920</p></div>
            <div className="rounded-lg bg-surface-subtle border border-default p-3"><p className="text-[10px] text-muted uppercase">FPS</p><p className="text-primary font-semibold">60</p></div>
            <div className="rounded-lg bg-surface-subtle border border-default p-3"><p className="text-[10px] text-muted uppercase">Codec</p><p className="text-primary font-semibold">H.264</p></div>
            <div className="rounded-lg bg-surface-subtle border border-default p-3"><p className="text-[10px] text-muted uppercase">Bitrate</p><p className="text-primary font-semibold">12 Mbps</p></div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
