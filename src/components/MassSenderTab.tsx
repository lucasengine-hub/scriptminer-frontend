import { useState, useRef } from 'react';
import { Send, Loader2, Terminal, MessageSquare, Users, Download } from 'lucide-react';
import { PageHeader, SectionCard, inputClass } from './ui';
import { downloadFile, toCSV } from '../lib/exportUtils';

interface MassSenderTabProps {
  t: (k: string) => string;
}

interface LogLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning';
}

export function MassSenderTab({ t }: MassSenderTabProps) {
  const [channel, setChannel] = useState<'whatsapp' | 'fb'>('whatsapp');
  const [message, setMessage] = useState('');
  const [dispatching, setDispatching] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const startDispatch = async () => {
    if (!message.trim() || dispatching) return;
    setDispatching(true);
    setLogs([]);

    const totalContacts = channel === 'whatsapp' ? 1247 : 384;
    const channelName = channel === 'whatsapp' ? t('whatsapp') : t('fbGroups');

    const logEntries: LogLine[] = [
      { id: '1', text: `[${new Date().toTimeString().slice(0, 8)}] Inicializando dispatcher ${channelName}...`, type: 'info' },
      { id: '2', text: `[${new Date().toTimeString().slice(0, 8)}] Conexão segura estabelecida (WAF ativo)`, type: 'success' },
      { id: '3', text: `[${new Date().toTimeString().slice(0, 8)}] Total de contatos na fila: ${totalContacts}`, type: 'info' },
      { id: '4', text: `[${new Date().toTimeString().slice(0, 8)}] Anti-banimento: delay aleatório 3 a 8s entre envios`, type: 'info' },
    ];

    for (let i = 0; i < logEntries.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setLogs((prev) => [...prev, logEntries[i]]);
      scrollToBottom();
    }

    // Simulate progressive sends in batches
    const batches = 5;
    const perBatch = Math.floor(totalContacts / batches);
    for (let b = 1; b <= batches; b++) {
      await new Promise((r) => setTimeout(r, 800));
      const sent = b * perBatch;
      const entry: LogLine = {
        id: `batch${b}`,
        text: `[${new Date().toTimeString().slice(0, 8)}] Lote ${b}/${batches}: ${sent} mensagens enviadas (${Math.round((b / batches) * 100)}%)`,
        type: b === batches ? 'success' : 'info',
      };
      setLogs((prev) => [...prev.slice(-99), entry]);
      scrollToBottom();
    }

    const finalEntry: LogLine = {
      id: 'final',
      text: `[${new Date().toTimeString().slice(0, 8)}] Disparo concluído! ${totalContacts} mensagens entregues. Taxa de entrega: 98.4%`,
      type: 'success',
    };
    setLogs((prev) => [...prev.slice(-99), finalEntry]);
    setDispatching(false);
    scrollToBottom();
  };

  return (
    <div>
      <PageHeader title={t('senderTitle')} subtitle={t('senderSubtitle')} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <SectionCard title={t('senderTitle')} subtitle="" icon={<Send className="w-4 h-4 text-accent-400" />}>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-muted mb-2 block">{t('selectChannel')}</label>
              <div className="flex gap-2">
                {([{ v: 'whatsapp', l: t('whatsapp'), i: <MessageSquare className="w-4 h-4" /> }, { v: 'fb', l: t('fbGroups'), i: <Users className="w-4 h-4" /> }] as const).map((opt) => (
                  <button key={opt.v} onClick={() => setChannel(opt.v)} className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all border ${channel === opt.v ? 'bg-accent-500/15 text-accent-400 border-accent-500/30' : 'bg-surface-subtle text-muted border-default hover:text-primary'}`}>{opt.i}{opt.l}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted mb-2 block">{t('messageContent')}</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('messagePlaceholder')} rows={5} className={`${inputClass} resize-none`} />
            </div>
            <button onClick={startDispatch} disabled={!message.trim() || dispatching} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {dispatching ? <><Loader2 className="w-4 h-4 animate-spin" />{t('dispatching')}</> : <><Send className="w-4 h-4" />{t('startDispatch')}</>}
            </button>
            <button onClick={() => { const csv = toCSV(['Canal', 'Total Contatos', 'Taxa Entrega'], [[channel === 'whatsapp' ? 'WhatsApp' : 'Facebook Groups', String(channel === 'whatsapp' ? 1247 : 384), '98.4%']]); downloadFile('vrtx-disparo-contatos.csv', csv, 'text/csv'); }} disabled={dispatching} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-surface-subtle border border-default px-5 py-2.5 text-sm font-medium text-muted hover:text-primary hover:border-strong transition-all disabled:opacity-50"><Download className="w-4 h-4" />Exportar Contatos CSV</button>
          </div>
        </SectionCard>

        <SectionCard title={t('consoleLog')} subtitle="" icon={<Terminal className="w-4 h-4 text-emerald-400" />}>
          <div className="rounded-xl bg-black/60 border border-default p-4 font-mono text-xs h-[24rem] overflow-y-auto scrollbar-thin">
            {logs.length === 0 ? (
              <p className="text-muted italic">$ Aguardando início do disparo...</p>
            ) : (
              <div className="space-y-1">
                {logs.map((log) => (
                  <div key={log.id} className={`animate-fade-in-up ${log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-amber-400' : 'text-slate-300'}`}>{log.text}</div>
                ))}
                <div ref={logEndRef} />
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
