import { useState, useCallback } from 'react';
import { Code2, FileText, Download, Flame, GitCompare, Plus, Eye, Loader2 } from 'lucide-react';
import { SectionCard, PageHeader, Badge, Modal, Field, inputClass, CopyButton, EmptyState } from './ui';
import { useWebBuilder, useVrtxEvent, VRTX_EVENTS } from '../lib/store';
import { generateSEOMetaTags } from '../lib/exportUtils';

interface WebBuilderTabProps {
  t: (k: string) => string;
}

export function WebBuilderTab({ t }: WebBuilderTabProps) {
  const { projects, addProject } = useWebBuilder();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [offer, setOffer] = useState('');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [view, setView] = useState<'preview' | 'source' | 'legal' | 'ab'>('preview');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [exporting, setExporting] = useState(false);

  const project = projects.find((p) => p.id === activeProject);

  // Cross-tab synergy: prefill from imported product
  const handleImport = useCallback((payload: { productName: string; description: string; hook: string }) => {
    setName(payload.productName);
    setOffer(payload.hook || payload.description.slice(0, 80));
  }, []);
  useVrtxEvent(VRTX_EVENTS.IMPORT_PRODUCT, handleImport);

  const handleCreate = () => {
    if (!name || !offer) return;
    addProject(name, offer);
    setName(''); setOffer('');
    setModalOpen(false);
  };

  const handleExport = async () => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setExporting(false);
  };

  return (
    <div>
      <PageHeader title={t('webBuilderTitle')} subtitle={t('webBuilderSubtitle')} />

      <SectionCard
        title="Projetos"
        subtitle="Landing pages geradas com preview e código"
        icon={<Code2 className="w-4 h-4 text-accent-400" />}
        actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-accent-500/25 transition-all"><Plus className="w-3.5 h-3.5" />{t('newProject')}</button>}
      >
        {projects.length === 0 ? (
          <EmptyState icon={<Code2 className="w-7 h-7 text-accent-400" />} title="Nenhum projeto criado" description="Crie sua primeira Landing Page com preview, código fonte e documentos legais gerados automaticamente." ctaLabel="Criar primeiro projeto" onCta={() => setModalOpen(true)} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => { setActiveProject(p.id); setView('preview'); }}
                className={`text-left p-4 rounded-xl border transition-all ${activeProject === p.id ? 'bg-accent-500/10 border-accent-500/40 shadow-glow' : 'bg-surface-subtle border-default hover:border-strong'}`}
              >
                <p className="text-sm font-semibold text-primary truncate">{p.name}</p>
                <p className="text-[11px] text-muted truncate">{p.offer}</p>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      {project && (
        <SectionCard
          title={project.name}
          subtitle={project.offer}
          icon={<Eye className="w-4 h-4 text-emerald-400" />}
          className="mt-6"
          actions={
            <div className="flex items-center gap-2">
              <button onClick={() => setShowHeatmap(!showHeatmap)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${showHeatmap ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-surface-subtle text-muted border-default hover:border-strong'}`}><Flame className="w-3.5 h-3.5" />{t('heatmap')}</button>
              <button onClick={handleExport} disabled={exporting} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500/25 transition-all disabled:opacity-70">
                {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}{t('exportZip')}
              </button>
            </div>
          }
        >
          <div className="flex gap-1 mb-4 border-b border-default">
            {([
              { id: 'preview', label: 'Preview', icon: <Eye className="w-3.5 h-3.5" /> },
              { id: 'source', label: t('sourceCode'), icon: <Code2 className="w-3.5 h-3.5" /> },
              { id: 'legal', label: t('legalGenerator'), icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'ab', label: t('abTest'), icon: <GitCompare className="w-3.5 h-3.5" /> },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${view === tab.id ? 'text-accent-400 border-accent-500' : 'text-muted border-transparent hover:text-primary'}`}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          {view === 'preview' && (
            <div className="relative rounded-xl bg-gradient-to-br from-surface-subtle to-surface border border-default p-8 min-h-[300px]">
              <div dangerouslySetInnerHTML={{ __html: project.html }} />
              {showHeatmap && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-red-500/40 blur-2xl" />
                  <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-yellow-500/40 blur-2xl" />
                  <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-blue-500/30 blur-2xl" />
                  <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full bg-red-500/30 blur-2xl" />
                </div>
              )}
            </div>
          )}

          {view === 'source' && (
            <div>
              <div className="mb-3">
                <p className="text-[10px] text-muted uppercase tracking-wide mb-2">SEO + Open Graph + JSON-LD</p>
                <pre className="rounded-xl bg-surface-subtle border border-default p-3 text-[10px] text-emerald-400 overflow-x-auto whitespace-pre-wrap font-mono max-h-32">{generateSEOMetaTags(project.offer)}</pre>
                <div className="mt-2"><CopyButton text={generateSEOMetaTags(project.offer)} t={t} label="Copiar SEO Tags" /></div>
              </div>
              <pre className="rounded-xl bg-surface-subtle border border-default p-4 text-[11px] text-muted overflow-x-auto whitespace-pre-wrap font-mono">{project.html}</pre>
              <div className="mt-3"><CopyButton text={project.html} t={t} label={t('copy')} /></div>
            </div>
          )}

          {view === 'legal' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-accent-400" />{t('privacyPolicy')}</h4>
                <pre className="rounded-xl bg-surface-subtle border border-default p-4 text-[11px] text-muted whitespace-pre-wrap font-mono">{project.legalPrivacy}</pre>
                <div className="mt-2"><CopyButton text={project.legalPrivacy} t={t} /></div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-400" />{t('termsOfUse')}</h4>
                <pre className="rounded-xl bg-surface-subtle border border-default p-4 text-[11px] text-muted whitespace-pre-wrap font-mono">{project.legalTerms}</pre>
                <div className="mt-2"><CopyButton text={project.legalTerms} t={t} /></div>
              </div>
            </div>
          )}

          {view === 'ab' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/30">
                <Badge status="failed" label={t('variantA')} />
                <p className="mt-3 text-sm text-primary">{project.variantA}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30">
                <Badge status="active" label={t('variantB')} />
                <p className="mt-3 text-sm text-primary">{project.variantB}</p>
              </div>
            </div>
          )}
        </SectionCard>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('newProject')}>
        <div className="space-y-4">
          <Field label={t('projectName')}><input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Ex: Curso VIP Landing" /></Field>
          <Field label={t('landingOffer')}><input value={offer} onChange={(e) => setOffer(e.target.value)} className={inputClass} placeholder="Ex: Curso completo por R$ 297" /></Field>
          <button onClick={handleCreate} className="w-full rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white hover:shadow-glow transition-all">{t('generateLanding')}</button>
        </div>
      </Modal>
    </div>
  );
}
