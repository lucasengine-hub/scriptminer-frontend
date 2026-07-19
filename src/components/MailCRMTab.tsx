import { useState } from 'react';
import { Mail, MessageSquare, Clock, Plus, Instagram, Loader2, Sparkles, Workflow } from 'lucide-react';
import { SectionCard, PageHeader, Badge, Modal, Field, inputClass } from './ui';
import { useMailFunnels, useSocialCRM } from '../lib/store';

interface MailCRMTabProps {
  t: (k: string) => string;
}

export function MailCRMTab({ t }: MailCRMTabProps) {
  const { funnels } = useMailFunnels();
  const { rules, toggle, addRule } = useSocialCRM();
  const [modalOpen, setModalOpen] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState<Record<string, string>>({});
  const [newPlatform, setNewPlatform] = useState<'Instagram' | 'TikTok'>('Instagram');
  const [newKeyword, setNewKeyword] = useState('');
  const [newDelayMin, setNewDelayMin] = useState(2);
  const [newDelayMax, setNewDelayMax] = useState(5);
  const [newTemplate, setNewTemplate] = useState('');

  const handleGenerateCopy = async (stepId: string, subject: string) => {
    setGenerating(stepId);
    await new Promise((r) => setTimeout(r, 1500));
    const copy = `Olá! ${subject}\n\nNotamos seu interesse e preparamos algo especial. Esta oferta expira em 24h.\n\n👉 [LINK_EXCLUSIVO]\n\nEquipe VRTX`;
    setGeneratedCopy((prev) => ({ ...prev, [stepId]: copy }));
    setGenerating(null);
  };

  const handleAddRule = () => {
    if (!newKeyword || !newTemplate) return;
    addRule({ platform: newPlatform, triggerKeyword: newKeyword, dmDelayMin: newDelayMin, dmDelayMax: newDelayMax, dmTemplate: newTemplate });
    setNewKeyword(''); setNewTemplate(''); setModalOpen(false);
  };

  return (
    <div>
      <PageHeader title={t('mailTitle')} subtitle={t('mailSubtitle')} />

      {/* Email Funnels */}
      <SectionCard title={t('emailFunnel')} subtitle="Workflow visual de recuperação e escala" icon={<Mail className="w-4 h-4 text-accent-400" />}>
        {funnels.map((funnel) => (
          <div key={funnel.id} className="mb-6 last:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <Workflow className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-primary">{funnel.name}</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {funnel.steps.map((step, i) => (
                <div key={step.id} className="relative p-4 rounded-xl bg-surface-subtle border border-default">
                  {i < funnel.steps.length - 1 && <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-subtle">→</div>}
                  <div className="flex items-center justify-between mb-2">
                    <Badge status="scheduled" label={step.trigger} />
                    <span className="flex items-center gap-1 text-[10px] text-muted"><Clock className="w-3 h-3" />{step.delay}</span>
                  </div>
                  <p className="text-sm font-semibold text-primary mb-1">{step.subject}</p>
                  <p className="text-[11px] text-muted mb-3 line-clamp-2">{step.copy}</p>
                  <button
                    onClick={() => handleGenerateCopy(step.id, step.subject)}
                    disabled={generating === step.id}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-3 py-2 text-xs font-semibold hover:bg-accent-500/25 transition-all disabled:opacity-70"
                  >
                    {generating === step.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {t('generateEmailCopy')}
                  </button>
                  {generatedCopy[step.id] && (
                    <div className="mt-2 p-2 rounded-lg bg-surface border border-default text-[10px] text-muted whitespace-pre-wrap">{generatedCopy[step.id]}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Social CRM */}
      <SectionCard
        title={t('socialCRM')}
        subtitle={t('socialCRMSubtitle')}
        icon={<Instagram className="w-4 h-4 text-pink-400" />}
        className="mt-6"
        actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-pink-500/15 text-pink-400 border border-pink-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-pink-500/25 transition-all"><Plus className="w-3.5 h-3.5" />{t('socialCRM')}</button>}
      >
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-subtle border border-default">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rule.platform === 'Instagram' ? 'bg-pink-500/15 text-pink-400' : 'bg-slate-500/15 text-slate-400'}`}>
                {rule.platform === 'Instagram' ? <Instagram className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge status="active" label={rule.platform} />
                  <span className="text-[11px] text-muted">Se comentar <strong className="text-primary">"{rule.triggerKeyword}"</strong></span>
                </div>
                <p className="text-[11px] text-muted">DM em {rule.dmDelayMin}-{rule.dmDelayMax} min: <em>{rule.dmTemplate}</em></p>
              </div>
              <button
                onClick={() => toggle(rule.id)}
                className={`relative w-11 h-6 rounded-full transition-all ${rule.active ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all ${rule.active ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('socialCRM')}>
        <div className="space-y-4">
          <Field label="Plataforma">
            <select value={newPlatform} onChange={(e) => setNewPlatform(e.target.value as 'Instagram' | 'TikTok')} className={inputClass}>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
            </select>
          </Field>
          <Field label={t('triggerKeyword')}><input value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} className={inputClass} placeholder="EU QUERO" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Delay mín (min)"><input type="number" value={newDelayMin} onChange={(e) => setNewDelayMin(parseInt(e.target.value))} className={inputClass} /></Field>
            <Field label="Delay máx (min)"><input type="number" value={newDelayMax} onChange={(e) => setNewDelayMax(parseInt(e.target.value))} className={inputClass} /></Field>
          </div>
          <Field label={t('dmTemplate')}><textarea value={newTemplate} onChange={(e) => setNewTemplate(e.target.value)} className={inputClass} rows={3} placeholder="Vi seu comentário! Link: [LINK]" /></Field>
          <button onClick={handleAddRule} className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-3 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all">{t('socialCRM')}</button>
        </div>
      </Modal>
    </div>
  );
}
