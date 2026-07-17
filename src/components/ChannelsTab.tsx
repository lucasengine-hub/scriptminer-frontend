import { useState } from 'react';
import { Radio, TrendingUp, Clock, Eye, Heart, Zap } from 'lucide-react';
import { type Channel, mockChannels, formatNumber } from '../lib/types';
import { PageHeader, SectionCard } from './ui';

function TrendBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            score >= 85 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
            score >= 70 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
            'bg-gradient-to-r from-slate-500 to-slate-400'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-200 w-8 text-right">{score}</span>
    </div>
  );
}

export function ChannelsTab() {
  const [channels] = useState<Channel[]>(mockChannels);
  const [selectedId, setSelectedId] = useState<string>(channels[0]?.id ?? '');
  const selected = channels.find((c) => c.id === selectedId);

  return (
    <div>
      <PageHeader
        title="Canais de Distribuição"
        subtitle="Conecte suas redes e descubra os melhores horários e nichos para postar."
      />

      {/* Channel cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setSelectedId(ch.id)}
            className={`text-left bg-ink-800/60 rounded-2xl border p-5 transition-all duration-300 ${
              selectedId === ch.id
                ? 'border-accent-500/40 shadow-glow'
                : 'border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{ch.name}</h3>
                  <p className="text-[11px] text-slate-500">{ch.handle}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-medium border ${
                  ch.connected
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
                }`}
              >
                {ch.connected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Seguidores</p>
                <p className="text-sm font-bold text-white">{formatNumber(ch.followers)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Engajamento</p>
                <p className="text-sm font-bold text-white">{ch.engagement}%</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Score de Tendência
              </p>
              <TrendBar score={ch.trendScore} />
            </div>
          </button>
        ))}
      </div>

      {/* Detailed panel for selected channel */}
      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Best times */}
          <SectionCard
            title={`Melhores Horários — ${selected.name}`}
            subtitle="Baseado em tendências do dia"
            icon={<Clock className="w-4 h-4 text-accent-400" />}
          >
            <div className="space-y-3">
              {selected.bestTimes.map((time, i) => {
                const intensity = [85, 72, 90][i] ?? 70;
                return (
                  <div key={time} className="flex items-center gap-4 p-3 rounded-xl bg-ink-950/40 border border-white/5">
                    <div className="w-14 h-14 rounded-xl bg-accent-500/15 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-accent-400">{time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-300">Pico de engajamento</span>
                        <span className="text-xs font-bold text-emerald-400">{intensity}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-500 to-blue-500 rounded-full transition-all duration-700"
                          style={{ width: `${intensity}%` }}
                        />
                      </div>
                    </div>
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Top niches */}
          <SectionCard
            title="Nichos em Alta"
            subtitle={`Tendências performando melhor em ${selected.name}`}
            icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
          >
            <div className="space-y-3">
              {selected.topNiches.map((niche) => {
                return (
                  <div key={niche.name} className="p-4 rounded-xl bg-surface-subtle border border-default">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary">{niche.name}</span>
                      <span className="text-xs font-bold text-emerald-400">{niche.score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
                        style={{ width: `${niche.score}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{niche.views}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{niche.likes}</span>
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
