import { useState } from 'react';
import {
  Cpu, Clock, Check, Loader2, X, Calendar, Webhook, Key, Zap, Video, FileText, Send,
} from 'lucide-react';
import { type AutomationLog, mockAutomationLogs, mockProducts, mockChannels } from '../lib/types';
import { Badge, CopyButton, PageHeader, SectionCard } from './ui';

const STATUS_ICON: Record<string, React.ReactNode> = {
  posted: <Check className="w-3.5 h-3.5" />,
  scheduled: <Clock className="w-3.5 h-3.5" />,
  processing: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  failed: <X className="w-3.5 h-3.5" />,
};

const STATUS_LABEL: Record<string, string> = {
  posted: 'Postado',
  scheduled: 'Agendado',
  processing: 'Processando',
  failed: 'Falhou',
};

export function AutomationTab() {
  const [mode, setMode] = useState<'semi' | 'auto'>('semi');
  const [logs, setLogs] = useState<AutomationLog[]>(mockAutomationLogs);
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]?.id ?? '');
  const [times, setTimes] = useState('12h, 18h, 21h');
  const [frequency, setFrequency] = useState(3);
  const [webhookUrl, setWebhookUrl] = useState('https://hook.make.com/ScriptMiner-Webhook');
  const [apiKey, setApiKey] = useState('');
  const [scheduling, setScheduling] = useState(false);

  const handleApprove = () => {
    if (!selectedProduct || scheduling) return;
    setScheduling(true);
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === selectedProduct);
      const newLog: AutomationLog = {
        id: `l${Date.now()}`,
        time: '18:00',
        product: product?.name ?? 'Produto',
        channel: 'TikTok',
        status: 'scheduled',
      };
      setLogs([newLog, ...logs]);
      setScheduling(false);
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        title="Central de Automação"
        subtitle="Configure o modo de postagem e gerencie a fila de publicações automáticas."
      />

      {/* Central toggle */}
      <div className="bg-ink-800/60 rounded-2xl border border-white/5 shadow-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/15 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Modo de Postagem</h3>
              <p className="text-[11px] text-slate-500">
                {mode === 'semi' ? 'Revisão manual antes de agendar' : 'Publicação 100% automática via webhooks'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-ink-950/60 rounded-xl p-1.5 border border-white/5">
            <button
              onClick={() => setMode('semi')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'semi' ? 'bg-accent-500 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semi-Automático
            </button>
            <button
              onClick={() => setMode('auto')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'auto' ? 'bg-accent-500 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              100% Automático
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Mode-specific config */}
        {mode === 'semi' ? (
          <SectionCard
            title="Revisão e Aprovação"
            subtitle="Revise o vídeo e roteiro antes de agendar"
            icon={<Video className="w-4 h-4 text-accent-400" />}
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Produto</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full rounded-xl bg-ink-950/60 border border-white/5 px-4 py-2.5 text-sm text-slate-100 cursor-pointer focus:outline-none focus:border-accent-500/60"
                >
                  {mockProducts.map((p) => (
                    <option key={p.id} value={p.id} className="bg-ink-800">{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Preview mock */}
              <div className="aspect-[9/16] max-w-[200px] mx-auto rounded-xl bg-gradient-to-br from-ink-950 to-ink-800 border border-white/10 flex flex-col items-center justify-center gap-3 p-4">
                <div className="w-14 h-14 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <Video className="w-6 h-6 text-accent-400" />
                </div>
                <p className="text-[11px] text-slate-400 text-center">Prévia do vídeo gerado</p>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-[10px] text-slate-500">00:15</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-ink-950/40 border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-400">Roteiro aprovado</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  🚨 Para tudo! Se você ainda não conhece este produto, você está perdendo dinheiro...
                </p>
              </div>

              <button
                onClick={handleApprove}
                disabled={scheduling}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {scheduling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Aprovar e Agendar
                  </>
                )}
              </button>
            </div>
          </SectionCard>
        ) : (
          <SectionCard
            title="Configurações Avançadas"
            subtitle="Webhooks e Agendador de Tarefas"
            icon={<Webhook className="w-4 h-4 text-accent-400" />}
          >
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Frequência diária</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="flex-1 accent-accent-500"
                  />
                  <span className="text-sm font-bold text-white w-20 text-right">{frequency}x por dia</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Horários de postagem</label>
                <input
                  type="text"
                  value={times}
                  onChange={(e) => setTimes(e.target.value)}
                  placeholder="12h, 18h, 21h"
                  className="w-full rounded-xl bg-ink-950/60 border border-white/5 px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-accent-500/60"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">URL do Webhook (Make.com / n8n)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 rounded-xl bg-ink-950/60 border border-white/5 px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-accent-500/60"
                  />
                  <CopyButton text={webhookUrl} label="Copiar" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Chave de API (Integrador)</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
                    className="w-full rounded-xl bg-ink-950/60 border border-white/5 pl-11 pr-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-accent-500/60"
                  />
                </div>
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all">
                <Zap className="w-4 h-4" />
                Ativar Automação
              </button>
            </div>
          </SectionCard>
        )}

        {/* Automation log / timeline */}
        <SectionCard
          title="Linha do Tempo"
          subtitle="Status das automações"
          icon={<Calendar className="w-4 h-4 text-emerald-400" />}
        >
          <div className="space-y-3 max-h-[36rem] overflow-y-auto scrollbar-thin pr-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-ink-950/40 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-ink-800 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-200">{log.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-100 truncate">{log.product}</p>
                  <p className="text-[11px] text-slate-500">{log.channel}</p>
                </div>
                <Badge status={log.status} label={STATUS_LABEL[log.status]} />
                <span className="text-slate-500 shrink-0">{STATUS_ICON[log.status]}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
