import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

// ===== Theme Hook =====

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}

// ===== CopyButton =====

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = 'Copiar', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 border ${
        copied
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          : 'bg-surface-subtle text-muted border-default hover:text-primary'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copiado! ✓
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          {label}
        </>
      )}
    </button>
  );
}

// ===== Badge =====

interface BadgeProps {
  status: string;
  label?: string;
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  draft: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  posted: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  scheduled: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  processing: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  failed: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export function Badge({ status, label }: BadgeProps) {
  const cls = STATUS_STYLES[status] ?? STATUS_STYLES.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label ?? status}
    </span>
  );
}

// ===== StatCard =====

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  accent?: 'blue' | 'emerald' | 'amber' | 'purple';
}

const ACCENT_STYLES: Record<string, string> = {
  blue: 'bg-blue-500/15 text-blue-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  purple: 'bg-purple-500/15 text-purple-400',
};

export function StatCard({ icon, label, value, trend, accent = 'blue' }: StatCardProps) {
  return (
    <div className="surface rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-strong">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ACCENT_STYLES[accent]}`}>
          {icon}
        </div>
        {trend && <span className="text-[11px] text-emerald-400 font-medium">{trend}</span>}
      </div>
      <p className="text-[11px] text-muted uppercase tracking-wide font-medium">{label}</p>
      <p className="text-xl font-bold text-primary mt-1">{value}</p>
    </div>
  );
}

// ===== SectionCard =====

export function SectionCard({
  title,
  subtitle,
  icon,
  children,
  actions,
  className = '',
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-default">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-accent-500/15 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-primary">{title}</h3>
            {subtitle && <p className="text-[11px] text-muted">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

// ===== PageHeader =====

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 lg:mb-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">{title}</h2>
      <p className="mt-2 text-muted text-sm sm:text-base max-w-2xl">{subtitle}</p>
    </div>
  );
}

// ===== Modal =====

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative surface rounded-2xl shadow-card w-full max-w-md animate-fade-in-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-default">
          <h3 className="text-sm font-semibold text-primary">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-primary text-lg leading-none">×</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ===== Input =====

export function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
        {icon}
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl bg-surface-subtle border border-default px-4 py-3 text-primary placeholder:text-subtle transition-all duration-200 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20 hover:border-strong';
