import { useState } from 'react';
import { KanbanSquare, Plus, Video, User, ArrowRight } from 'lucide-react';
import { SectionCard, PageHeader, Modal, Field, inputClass } from './ui';
import { useKanban } from '../lib/store';

interface KanbanTabProps {
  t: (k: string) => string;
}

export function KanbanTab({ t }: KanbanTabProps) {
  const { cards, moveCard, addCard } = useKanban();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'lead'>('video');
  const [meta, setMeta] = useState('');

  const columns: { id: 'idea' | 'process' | 'done'; label: string; color: string }[] = [
    { id: 'idea', label: t('colIdea'), color: 'border-blue-500/40' },
    { id: 'process', label: t('colProcess'), color: 'border-amber-500/40' },
    { id: 'done', label: t('colDone'), color: 'border-emerald-500/40' },
  ];

  const handleAdd = () => {
    if (!title) return;
    addCard({ title, type, meta: meta || 'Sem meta' });
    setTitle(''); setMeta('');
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader title={t('kanbanTitle')} subtitle={t('kanbanSubtitle')} />

      <SectionCard
        title={t('kanbanTitle')}
        subtitle="Arraste cards entre colunas"
        icon={<KanbanSquare className="w-4 h-4 text-accent-400" />}
        actions={<button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/15 text-accent-400 border border-accent-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-accent-500/25 transition-all"><Plus className="w-3.5 h-3.5" />{t('addCard')}</button>}
      >
        <div className="grid md:grid-cols-3 gap-4">
          {columns.map((col) => {
            const colCards = cards.filter((c) => c.column === col.id);
            return (
              <div key={col.id} className={`rounded-xl bg-surface-subtle border ${col.color} p-3 min-h-[200px]`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-primary">{col.label}</h4>
                  <span className="text-[11px] text-muted bg-surface px-2 py-0.5 rounded-full">{colCards.length}</span>
                </div>
                <div className="space-y-2">
                  {colCards.map((card) => (
                    <div key={card.id} className="p-3 rounded-lg bg-surface border border-default hover:border-strong transition-all">
                      <div className="flex items-start gap-2 mb-2">
                        {card.type === 'video' ? <Video className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" /> : <User className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                        <p className="text-sm text-primary flex-1">{card.title}</p>
                      </div>
                      <p className="text-[10px] text-muted mb-2">{card.meta}</p>
                      <div className="flex items-center gap-1">
                        {col.id !== 'idea' && <button onClick={() => moveCard(card.id, 'idea')} className="text-[10px] text-muted hover:text-primary transition-all">←</button>}
                        {col.id === 'idea' && <button onClick={() => moveCard(card.id, 'process')} className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 transition-all">{t('colProcess')} <ArrowRight className="w-3 h-3" /></button>}
                        {col.id === 'process' && <button onClick={() => moveCard(card.id, 'done')} className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition-all">{t('colDone')} <ArrowRight className="w-3 h-3" /></button>}
                      </div>
                    </div>
                  ))}
                  {colCards.length === 0 && <p className="text-[11px] text-subtle text-center py-4">Vazio</p>}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('addCard')}>
        <div className="space-y-4">
          <Field label={t('cardTitle')}><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Ex: Vídeo Unboxing" /></Field>
          <Field label="Tipo">
            <select value={type} onChange={(e) => setType(e.target.value as 'video' | 'lead')} className={inputClass}>
              <option value="video">Vídeo</option>
              <option value="lead">Lead</option>
            </select>
          </Field>
          <Field label="Meta"><input value={meta} onChange={(e) => setMeta(e.target.value)} className={inputClass} placeholder="TikTok · 15s" /></Field>
          <button onClick={handleAdd} className="w-full rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white hover:shadow-glow transition-all">{t('addCard')}</button>
        </div>
      </Modal>
    </div>
  );
}
