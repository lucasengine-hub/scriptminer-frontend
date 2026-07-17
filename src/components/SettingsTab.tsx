import { useState } from 'react';
import { Eye, EyeOff, Key, Save, Check, Shield, ExternalLink } from 'lucide-react';
import { PageHeader, SectionCard, inputClass } from './ui';

interface ApiKeyConfig {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  docsUrl: string;
}

const API_KEYS: ApiKeyConfig[] = [
  { id: 'openai', label: 'OpenAI API Key', placeholder: 'sk-xxxxxxxxxxxxxxxxxxxxxxxx', icon: <Key className="w-4 h-4" />, docsUrl: 'platform.openai.com/api-keys' },
  { id: 'gemini', label: 'Google Gemini API Key', placeholder: 'AIzaSyxxxxxxxxxxxxxxxx', icon: <Key className="w-4 h-4" />, docsUrl: 'aistudio.google.com' },
  { id: 'tiktok', label: 'TikTok Developer Key', placeholder: 'tik_xxxxxxxxxxxxxxxx', icon: <Key className="w-4 h-4" />, docsUrl: 'developers.tiktok.com' },
];

export function SettingsTab() {
  const [keys, setKeys] = useState<Record<string, string>>({ openai: '', gemini: '', tiktok: '' });
  const [visible, setVisible] = useState<Record<string, boolean>>({ openai: false, gemini: false, tiktok: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Configurações & Chaves de API" subtitle="Cadastre e gerencie suas chaves de integração com segurança." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <SectionCard title="Chaves de API" subtitle="Armazenadas localmente no seu navegador" icon={<Key className="w-4 h-4 text-accent-400" />}>
          <div className="space-y-5">
            {API_KEYS.map((cfg) => (
              <div key={cfg.id}>
                <label className="text-sm font-medium text-muted mb-2 block">{cfg.label}</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-subtle absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={visible[cfg.id] ? 'text' : 'password'}
                    value={keys[cfg.id]}
                    onChange={(e) => setKeys({ ...keys, [cfg.id]: e.target.value })}
                    placeholder={cfg.placeholder}
                    className={`${inputClass} pl-11 pr-11 font-mono text-sm`}
                  />
                  <button
                    onClick={() => setVisible({ ...visible, [cfg.id]: !visible[cfg.id] })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors p-1"
                    type="button"
                  >
                    {visible[cfg.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <a href={`https://${cfg.docsUrl}`} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-accent-400 hover:text-accent-300 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Obter chave em {cfg.docsUrl}
                </a>
              </div>
            ))}

            <button
              onClick={handleSave}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"
            >
              {saved ? <><Check className="w-4 h-4" />Salvo com sucesso!</> : <><Save className="w-4 h-4" />Salvar Chaves</>}
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Segurança da Conta" subtitle="Preferências de proteção" icon={<Shield className="w-4 h-4 text-emerald-400" />}>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-subtle border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Autenticação em 2 Fatoresa</p>
                  <p className="text-xs text-muted mt-0.5">Proteja sua conta com 2FA via app</p>
                </div>
                <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Ativo</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Sessões Ativas</p>
                  <p className="text-xs text-muted mt-0.5">3 dispositivos conectados</p>
                </div>
                <button className="text-xs text-accent-400 hover:text-accent-300 font-medium">Gerenciar</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Logs de Acesso</p>
                  <p className="text-xs text-muted mt-0.5">Último login: 17/07/2026 14:32</p>
                </div>
                <button className="text-xs text-accent-400 hover:text-accent-300 font-medium">Ver logs</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <p className="text-xs text-muted">Suas chaves são armazenadas apenas no estado local desta sessão e nunca enviadas para servidores externos.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
