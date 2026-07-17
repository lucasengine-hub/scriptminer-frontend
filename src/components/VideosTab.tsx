import { useState } from 'react';
import { Clapperboard, Music, Type, Image, Download, Sparkles, FileText } from 'lucide-react';
import { type Prompt, type VideoAsset, mockPrompts, mockVideoAssets } from '../lib/types';
import { CopyButton, PageHeader, SectionCard } from './ui';

const PLATFORM_COLORS: Record<string, string> = {
  Midjourney: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'Leonardo AI': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  ChatGPT: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
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

export function VideosTab() {
  const [filter, setFilter] = useState<string>('all');

  const filteredPrompts = filter === 'all' ? mockPrompts : mockPrompts.filter((p) => p.platform === filter);

  return (
    <div>
      <PageHeader
        title="Vídeos & Prompts de IA"
        subtitle="Central criativa com prompts prontos e ativos de vídeo para acelerar sua produção."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Prompts */}
        <SectionCard
          title="Banco de Prompts"
          subtitle="Pronto para copiar e colar"
          icon={<Sparkles className="w-4 h-4 text-accent-400" />}
        >
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-5">
            {['all', 'Midjourney', 'Leonardo AI', 'ChatGPT'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-accent-500/15 text-accent-400 border border-accent-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Todos' : f}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-[32rem] overflow-y-auto scrollbar-thin pr-1">
            {filteredPrompts.map((prompt: Prompt) => (
              <div
                key={prompt.id}
                className="p-4 rounded-xl bg-ink-950/40 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-100 truncate">{prompt.title}</h4>
                    <p className="text-[11px] text-slate-500">{prompt.category}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-medium border ${PLATFORM_COLORS[prompt.platform]}`}>
                    {prompt.platform}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono leading-relaxed bg-ink-950/60 rounded-lg p-3 mb-3 border border-white/5">
                  {prompt.text}
                </p>
                <CopyButton text={prompt.text} label="Copiar Prompt" />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Video assets */}
        <SectionCard
          title="Ativos do Vídeo"
          subtitle="Gerencie e baixe elementos"
          icon={<Clapperboard className="w-4 h-4 text-emerald-400" />}
        >
          <div className="space-y-3 max-h-[32rem] overflow-y-auto scrollbar-thin pr-1">
            {mockVideoAssets.map((asset: VideoAsset) => (
              <div
                key={asset.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-ink-950/40 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${ASSET_COLORS[asset.type]}`}>
                  {ASSET_ICONS[asset.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-100 truncate">{asset.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{asset.description}</p>
                  <p className="text-[10px] text-slate-600 mt-1 font-mono">{asset.meta}</p>
                </div>
                <button className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-accent-500/15 hover:text-accent-400 hover:border-accent-500/30 transition-all">
                  <Download className="w-3.5 h-3.5" />
                  Baixar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-accent-500/10 to-blue-700/10 border border-accent-500/20">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-accent-400 shrink-0" />
              <p className="text-xs text-slate-300">
                Dica: combine os prompts com os ativos para criar um vídeo completo em menos de 10 minutos.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
