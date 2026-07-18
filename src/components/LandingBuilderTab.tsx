import { useState } from 'react';
import { Layout, Plus, Send, Check } from 'lucide-react';
import { mockLandingProjects, type LandingProject } from '../lib/mockdata';
import { Badge, Modal, PageHeader, SectionCard, inputClass } from './ui';

interface LandingBuilderTabProps {
  t: (k: string) => string;
}

export function LandingBuilderTab({ t }: LandingBuilderTabProps) {
  const [projects, setProjects] = useState<LandingProject[]>(mockLandingProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');

  const handleCreate = () => {
    if (!newName.trim() || !newClient.trim()) return;
    setProjects((prev) => [{
      id: `lp${Date.now()}`,
      name: newName,
      client: newClient,
      status: 'draft',
      createdAt: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setNewName('');
    setNewClient('');
    setModalOpen(false);
  };

  const sendPreview = (id: string) => {
    // Simulate sending preview
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status: 'draft' } : p));
  };

  const simulateAccept = (id: string) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status: 'published' } : p));
  };

  return (
    <div>
      <PageHeader title={t('landingBuilderTitle')} subtitle={t('landingBuilderSubtitle')} />

      <SectionCard title={t('landingBuilderTitle')} subtitle={`${projects.length} ${t('transactions')}`} icon={<Layout className="w-4 h-4 text-accent-400" />}
        actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-blue-700 px-3 py-2 text-xs font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all"><Plus className="w-3.5 h-3.5" />{t('newProject')}</button>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-primary truncate">{p.name}</h4>
                  <p className="text-[11px] text-muted">{t('client')}: {p.client} · {p.createdAt}</p>
                </div>
                <Badge status={p.status} label={p.status === 'draft' ? t('draft') : t('published')} />
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => sendPreview(p.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-default px-3 py-2 text-xs font-medium text-muted hover:text-accent-400 hover:border-accent-500/30 transition-all"><Send className="w-3.5 h-3.5" />{t('sendPreview')}</button>
                <button onClick={() => simulateAccept(p.id)} disabled={p.status === 'published'} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-2 text-xs font-medium hover:bg-emerald-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"><Check className="w-3.5 h-3.5" />{t('simulateAccept')}</button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('newProject')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted mb-2 block">{t('productName')}</label>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t('productName')} className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-muted mb-2 block">{t('client')}</label>
            <input type="text" value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder={t('client')} className={inputClass} />
          </div>
          <button onClick={handleCreate} disabled={!newName.trim() || !newClient.trim()} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"><Plus className="w-4 h-4" />{t('newProject')}</button>
        </div>
      </Modal>
    </div>
  );
}
