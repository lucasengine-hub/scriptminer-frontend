import { useState } from 'react';
import {
  Cpu, Clock, Check, Loader2, X, Calendar, Webhook, Zap, Video, FileText, Send, AlertCircle, Play,
} from 'lucide-react';
import { type AutomationLog, mockAutomationLogs, mockProducts } from '../lib/types';
import { Badge, PageHeader, SectionCard, inputClass } from './ui';

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
  const [frequency, setFrequency] = useState(3);
  const [time12, setTime12] = useState(12);
  const [time18, setTime18] = useState(18);
  const [time21, setTime21] = useState(21);
  const [webhookUrl, setWebhookUrl] = useState('https://hook.make.com/ScriptMiner-Webhook');
  const [webhookError, setWebhookError] = useState('');
  const [caption, setCaption] = useState('🚨 Para tudo! Se você ainda não conhece este produto, você está perdendo dinheiro. Clica agora! #tráfegopago #marketing');
  const [scheduling, setScheduling] = useState(false);

  const validateWebhook = (url: string): boolean => {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch {
      return false;
    }
  };

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

  const handleWebhookChange = (val: string) => {
    setWebhookUrl(val);
    setWebhookError(val && !validateWebhook(val) ? 'URL inválida. Use um webhook válido (http/https).' : '');
  };

  return (
    <div>
      <PageHeader title="Central de Automação" subtitle="Configure o modo de postagem e gerencie a fila de publicações automáticas." />

      {/* Central toggle */}
      <div className="surface rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/15 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">Modo de Postagem</h3>
              <p className="text-[11px] text-muted">
                {mode === 'semi' ? 'Revisão manual antes de agendar' : 'Publicação 100% automática via webhooks'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-surface-subtle rounded-xl p-1.5 border border-default">
            <button
              onClick={() => setMode('semi')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'semi' ? 'bg-accent-500 text-white shadow-glow' : 'text-muted hover:text-primary'}`}
            >
              Semi-Automático
            </button>
            <button
              onClick={() => setMode('auto')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'auto' ? 'bg-accent-500 text-white shadow-glow' : 'text-muted hover:text-primary'}`}
            >
              100% Automático
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {mode === 'semi' ? (
          <SectionCard title="Revisão e Aprovação" subtitle="Revise o vídeo e legenda antes de agendar" icon={<Video className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted mb-2 block">Produto</label>
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  {mockProducts.map((p) => (
                    <option key={p.id} value={p.id} className="bg-ink-800">{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Mini player */}
              <div className="aspect-[9/16] max-w-[180px] mx-auto rounded-xl bg-gradient-to-br from-ink-950 to-ink-800 border border-default flex flex-col items-center justify-center gap-3 p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-accent-400 fill-accent-400" />
                </div>
                <p className="relative text-[11px] text-muted text-center">Prévia do vídeo gerado</p>
                <div className="relative flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-[10px] text-muted">00:15</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted mb-2 block flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Legenda gerada automaticamente
                </label>
                <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={3} className={`${inputClass} resize-none text-sm`} />
              </div>

              <button
                onClick={handleApprove}
                disabled={scheduling}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {scheduling ? <><Loader2 className="w-4 h-4 animate-spin" />Agendando...</> : <><Send className="w-4 h-4" />Aprovar e Agendar</>}
              </button>
            </div>
          </SectionCard>
        ) : (
          <SectionCard title="Configurações Avançadas" subtitle="Webhooks e Agendador de Tarefas" icon={<Webhook className="w-4 h-4 text-accent-400" />}>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-muted mb-2 block">Frequência diária: {frequency}x por dia</label>
                <input type="range" min={1} max={10} value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-accent-500" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted mb-2 block">Horários de pico</label>
                <div className="space-y-3">
                  {[
                    { label: 'Manhã', val: time12, set: setTime12 },
                    { label: 'Tarde', val: time18, set: setTime18 },
                    { label: 'Noite', val: time21, set: setTime21 },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted w-12">{t.label}</span>
                      <input type="range" min={0} max={23} value={t.val} onChange={(e) => t.set(Number(e.target.value))} className="flex-1 accent-accent-500" />
                      <span className="text-xs font-bold text-primary w-10 text-right">{String(t.val).padStart(2, '0')}h</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted mb-2 block flex items-center gap-1.5">
                  <Webhook className="w-3.5 h-3.5" />
                  URL do Webhook (Make.com / n8n)
                </label>
                <input type="text" value={webhookUrl} onChange={(e) => handleWebhookChange(e.target.value)} placeholder="https://hook.make.com/..." className={`${inputClass} font-mono text-sm`} />
                {webhookError && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{webhookError}</p>}
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all">
                <Zap className="w-4 h-4" />
                Ativar Automação
              </button>
            </div>
          </SectionCard>
        )}

        {/* Timeline */}
        <SectionCard title="Linha do Tempo" subtitle="Status das automações" icon={<Calendar className="w-4 h-4 text-emerald-400" />}>
          <div className="relative space-y-4 max-h-[36rem] overflow-y-auto scrollbar-thin pr-2">
            {/* Vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-default" />

            {logs.map((log) => (
              <div key={log.id} className="relative flex items-start gap-4 pl-0">
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                  log.status === 'posted' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' :
                  log.status === 'scheduled' ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' :
                  log.status === 'processing' ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' :
                  'bg-red-500/15 border-red-500/30 text-red-400'
                }`}>
                  {STATUS_ICON[log.status]}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge status={log.status} label={STATUS_LABEL[log.status]} />
                    <span className="text-xs text-muted">{log.channel} às {log.time}</span>
                  </div>
                  <p className="text-sm font-medium text-primary truncate">{log.product}</p>
                  {log.detail && <p className="text-[11px] text-red-400 mt-0.5">{log.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
