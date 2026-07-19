import { useState } from 'react';
import { GraduationCap, Plus, ArrowUp, ArrowDown, Trash2, GripVertical, BookOpen } from 'lucide-react';
import { SectionCard, PageHeader, inputClass, CopyButton } from './ui';
import { useCourses } from '../lib/store';

interface VRTXClassTabProps {
  t: (k: string) => string;
}

export function VRTXClassTab({ t }: VRTXClassTabProps) {
  const { courses, addCourse, addModule, reorderModule, removeModule } = useCourses();
  const [newCourse, setNewCourse] = useState('');
  const [newModule, setNewModule] = useState('');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(courses[0]?.id ?? null);

  const activeCourse = courses.find((c) => c.id === activeCourseId);

  const handleCreateCourse = () => {
    if (!newCourse) return;
    addCourse(newCourse);
    setNewCourse('');
  };

  const handleAddModule = () => {
    if (!activeCourseId || !newModule) return;
    addModule(activeCourseId, newModule);
    setNewModule('');
  };

  return (
    <div>
      <PageHeader title={t('classTitle')} subtitle={t('classSubtitle')} />

      <SectionCard title={t('createCourse')} subtitle="Hospede seus cursos com módulos drag & drop" icon={<GraduationCap className="w-4 h-4 text-accent-400" />}>
        <div className="flex gap-2 mb-4">
          <input value={newCourse} onChange={(e) => setNewCourse(e.target.value)} className={inputClass} placeholder={t('courseName')} />
          <button onClick={handleCreateCourse} className="inline-flex items-center gap-1.5 rounded-xl bg-accent-500/15 text-accent-400 border border-accent-500/30 px-4 py-3 text-sm font-semibold hover:bg-accent-500/25 transition-all whitespace-nowrap"><Plus className="w-4 h-4" />{t('createCourse')}</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCourseId(c.id)}
              className={`text-left p-4 rounded-xl border transition-all ${activeCourseId === c.id ? 'bg-accent-500/10 border-accent-500/40 shadow-glow' : 'bg-surface-subtle border-default hover:border-strong'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-accent-400" />
                <p className="text-sm font-semibold text-primary truncate">{c.courseName}</p>
              </div>
              <p className="text-[11px] text-muted">{c.modules.length} módulos</p>
              <code className="block mt-2 text-[10px] text-subtle truncate">{c.studentLink}</code>
            </button>
          ))}
        </div>
      </SectionCard>

      {activeCourse && (
        <SectionCard title={`Módulos — ${activeCourse.courseName}`} subtitle="Reordene com as setas" icon={<BookOpen className="w-4 h-4 text-emerald-400" />} className="mt-6">
          <div className="flex gap-2 mb-4">
            <input value={newModule} onChange={(e) => setNewModule(e.target.value)} className={inputClass} placeholder={t('moduleTitle')} />
            <button onClick={handleAddModule} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-4 py-3 text-sm font-semibold hover:bg-emerald-500/25 transition-all whitespace-nowrap"><Plus className="w-4 h-4" />{t('addModule')}</button>
          </div>

          <div className="space-y-2">
            {activeCourse.modules.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-subtle border border-default hover:border-strong transition-all">
                <GripVertical className="w-4 h-4 text-subtle" />
                <span className="w-7 h-7 rounded-lg bg-accent-500/15 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <p className="flex-1 text-sm text-primary">{m.title}</p>
                <button onClick={() => reorderModule(activeCourse.id, i, Math.max(0, i - 1))} disabled={i === 0} className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-white/5 disabled:opacity-30 transition-all"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => reorderModule(activeCourse.id, i, Math.min(activeCourse.modules.length - 1, i + 1))} disabled={i === activeCourse.modules.length - 1} className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-white/5 disabled:opacity-30 transition-all"><ArrowDown className="w-3.5 h-3.5" /></button>
                <button onClick={() => removeModule(activeCourse.id, m.id)} className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            {activeCourse.modules.length === 0 && <p className="text-sm text-muted text-center py-4">Nenhum módulo ainda. Adicione o primeiro.</p>}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <code className="flex-1 text-[11px] text-muted bg-surface px-3 py-2 rounded-lg border border-default truncate">{activeCourse.studentLink}</code>
            <CopyButton text={activeCourse.studentLink} t={t} label={t('generateStudentLink')} />
            <CopyButton text={JSON.stringify({ courseName: activeCourse.courseName, modules: activeCourse.modules, studentLink: activeCourse.studentLink }, null, 2)} t={t} label="Backup JSON" />
          </div>
        </SectionCard>
      )}
    </div>
  );
}
