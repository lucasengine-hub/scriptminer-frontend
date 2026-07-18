import { useState } from 'react';
import { Sparkles, Mail, Lock, Loader2, Shield, Zap, TrendingUp } from 'lucide-react';
import { isValidEmail } from '../lib/security';

interface LoginScreenProps {
  t: (k: string) => string;
  onLogin: (email: string) => void;
}

export function LoginScreen({ t, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) { setError('E-mail inválido'); return; }
    if (password.length < 4) { setError('Senha muito curta'); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-blue-700 items-center justify-center shadow-glow mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">{t('appName')}</h1>
          <p className="text-sm text-muted mt-1">{t('loginSubtitle')}</p>
        </div>

        {/* Form card */}
        <div className="surface rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-primary mb-6">{t('loginTitle')}</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                <Mail className="w-4 h-4" />{t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="w-full rounded-xl bg-surface-subtle border border-default px-4 py-3 text-primary placeholder:text-subtle focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20 transition-all"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                <Lock className="w-4 h-4" />{t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className="w-full rounded-xl bg-surface-subtle border border-default px-4 py-3 text-primary placeholder:text-subtle focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20 transition-all"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-6 py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" />{t('signingIn')}</> : <><Zap className="w-5 h-5" />{t('signIn')}</>}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted">{t('adminHint')}</p>
        </div>

        {/* Feature badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" />OWASP Top 10</span>
          <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-accent-400" />Escala Digital</span>
        </div>
      </div>
    </div>
  );
}
