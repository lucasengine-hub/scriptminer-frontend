import { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Key, Save, Check, ExternalLink, Terminal, Lock } from 'lucide-react';
import { generateSecurityLog, initialSecurityLogs, type SecurityLogEntry } from '../lib/security';
import { PageHeader, SectionCard, inputClass } from './ui';

interface SecurityTabProps {
  t: (k: string) => string;
  keys: Record<string, string>;
  setKey: (id: string, value: string) => void;
}

const API_KEY_CONFIGS = [
  { id: 'openai', labelKey: 'openaiKey', placeholder: 'sk-xxxxxxxxxxxxxxxxxxxxxxxx', docsUrl: 'platform.openai.com/api-keys' },
  { id: 'gemini', labelKey: 'geminiKey', placeholder: 'AIzaSyxxxxxxxxxxxxxxxx', docsUrl: 'aistudio.google.com' },
  { id: 'tiktok', labelKey: 'tiktokKey', placeholder: 'tik_xxxxxxxxxxxxxxxx', docsUrl: 'developers.tiktok.com' },
];

export function SecurityTab({ t, keys, setKey }: SecurityTabProps) {
  const [visible, setVisible] = useState<Record<string, boolean>>({ openai: false, gemini: false, tiktok: false });
  const [saved, setSaved] = useState(false);
  const [logs, setLogs] = useState<SecurityLogEntry[]>(initialSecurityLogs);

  // Security terminal: auto-append logs every 3-5s
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-15), generateSecurityLog()]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const logColors: Record<string, string> = {
    info: 'text-slate-300',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
  };

  return (
    <div>
      <PageHeader title={t('securityTitle')} subtitle={t('securitySubtitle')} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* API Keys */}
        <SectionCard title={t('apiKeys')} subtitle={t('apiKeysDesc')} icon={<Key className="w-4 h-4 text-accent-400" />}>
          <div className="space-y-5">
            {API_KEY_CONFIGS.map((cfg) => (
              <div key={cfg.id}>
                <label className="text-sm font-medium text-muted mb-2 block">{t(cfg.labelKey)}</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-subtle absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={visible[cfg.id] ? 'text' : 'password'}
                    value={keys[cfg.id] ?? ''}
                    onChange={(e) => setKey(cfg.id, e.target.value)}
                    placeholder={cfg.placeholder}
                    className={`${inputClass} pl-11 pr-11 font-mono text-sm`}
                  />
                  <button onClick={() => setVisible({ ...visible, [cfg.id]: !visible[cfg.id] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors p-1" type="button">
                    {visible[cfg.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <a href={`https://${cfg.docsUrl}`} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-accent-400 hover:text-accent-300 transition-colors"><ExternalLink className="w-3 h-3" />{t('getKey')} {cfg.docsUrl}</a>
              </div>
            ))}
            <button onClick={handleSave} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all">
              {saved ? <><Check className="w-4 h-4" />{t('savedSuccess')}</> : <><Save className="w-4 h-4" />{t('saveKeys')}</>}
            </button>
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2.5"><Lock className="w-4 h-4 text-amber-400 shrink-0" /><p className="text-xs text-muted">{t('keysLocalNote')}</p></div>
            </div>
          </div>
        </SectionCard>

        {/* Account security */}
        <div className="space-y-6">
          <SectionCard title={t('accountSecurity')} subtitle="" icon={<Shield className="w-4 h-4 text-emerald-400" />}>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-subtle border border-default">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-semibold text-primary">{t('twoFactor')}</p><p className="text-xs text-muted mt-0.5">{t('twoFactorDesc')}</p></div>
                  <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">{t('planActive')}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-subtle border border-default">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-semibold text-primary">{t('activeSessions')}</p><p className="text-xs text-muted mt-0.5">{t('activeSessionsDesc')}</p></div>
                  <button className="text-xs text-accent-400 hover:text-accent-300 font-medium">{t('manage')}</button>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-subtle border border-default">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-semibold text-primary">{t('accessLogs')}</p><p className="text-xs text-muted mt-0.5">{t('accessLogsDesc')}</p></div>
                  <button className="text-xs text-accent-400 hover:text-accent-300 font-medium">{t('viewLogs')}</button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Security terminal */}
          <SectionCard title={t('securityTerminal')} subtitle={t('securityTerminalDesc')} icon={<Terminal className="w-4 h-4 text-emerald-400" />}>
            <div className="rounded-xl bg-black/70 border border-default p-4 font-mono text-xs h-56 overflow-y-auto scrollbar-thin">
              <div className="space-y-1">
                {logs.map((log) => (
                  <div key={log.id} className={`animate-fade-in-up ${logColors[log.level]}`}>
                    <span className="text-subtle">[{log.timestamp}]</span> {log.message}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
