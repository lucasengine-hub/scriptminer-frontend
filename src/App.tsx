import { useState, useCallback } from 'react';
import { Menu, Sparkles, Crown, ShieldCheck } from 'lucide-react';
import { Sidebar, type TabId } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { DashboardTab } from './components/DashboardTab';
import { MiningTab } from './components/MiningTab';
import { EbookTab } from './components/EbookTab';
import { DropshippingTab } from './components/DropshippingTab';
import { LandingBuilderTab } from './components/LandingBuilderTab';
import { TrafficTab } from './components/TrafficTab';
import { MassSenderTab } from './components/MassSenderTab';
import { AffiliatesTab } from './components/AffiliatesTab';
import { AutomationTab } from './components/AutomationTab';
import { SubscriptionTab } from './components/SubscriptionTab';
import { SecurityTab } from './components/SecurityTab';
import { AdminTab } from './components/AdminTab';
import { Chatbot } from './components/Chatbot';
import { LanguageSwitcher, ThemeToggle, RankBadge } from './components/ui';
import { translations } from './lib/i18n';
import {
  useTheme, useLanguage, useUser, useScriptHistory, useProducts, useAffiliateLinks,
  useApiKeys, useAdminUsers, getRankInfo,
} from './lib/store';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLang } = useLanguage();
  const t = useCallback((key: string) => (translations[lang] as unknown as Record<string, string>)[key] ?? key, [lang]);
  const { user, login, logout, consumeCredits, addCredits, addRankPoints } = useUser();
  const { history, addRecord, toggleFavorite, deleteRecord } = useScriptHistory();
  const { products, addProduct } = useProducts();
  const { links, addLink, deleteLink } = useAffiliateLinks();
  const { keys, setKey } = useApiKeys();
  const { users: adminUsers, injectCredits } = useAdminUsers();

  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<{ productName: string; description: string; hook: string } | null>(null);

  const rank = getRankInfo(user.rankPoints, t);

  const handleLogin = (email: string) => login(email);

  const handleGenerateScript = (productName: string, style: string, output: string, niche: string) => {
    addRecord({ id: `s${Date.now()}`, productName, style, output, createdAt: Date.now(), favorite: false, niche });
    addProduct({
      id: `p${Date.now()}`, name: productName, description: '', price: 0, style, audience: '',
      status: 'active', createdAt: new Date().toISOString().slice(0, 10), clicks: 0, sales: 0, commission: 0,
    });
  };

  const handleGenerateAffiliateLink = (productId: string, commissionRate: number, role: 'Afiliado' | 'Coprodutor', platform: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const code = `AFIL-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    addLink({
      id: `a${Date.now()}`, productId, productName: product.name, code,
      url: `https://vrtx.app/af/${code.toLowerCase().replace('afil-', '')}`,
      clicks: 0, conversions: 0, commissionRate, role, platform,
    });
  };

  const handleImportProduct = (productName: string, description: string, hook: string) => {
    setPrefillData({ productName, description, hook });
    setActiveTab('mining');
  };

  if (!user.isLoggedIn) {
    return <LoginScreen t={t} onLogin={handleLogin} />;
  }

  const userName = user.isAdmin ? 'Admin VRTX' : (user.email.split('@')[0] || 'User');

  return (
    <div className="min-h-screen flex">
      <Sidebar active={activeTab} onChange={setActiveTab} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} t={t} isAdmin={user.isAdmin} userRank={rank} userName={userName} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 sm:px-6 bg-surface-subtle/80 backdrop-blur-xl border-b border-default">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 text-muted hover:text-primary"><Menu className="w-5 h-5" /></button>
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-bold text-primary">{t('appName')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin badge */}
            {user.isAdmin && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-amber-500/15 to-red-500/15 text-amber-400 border border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('adminBadge')}
              </span>
            )}
            {/* Rank badge */}
            <div className="hidden sm:block"><RankBadge level={rank.level} name={rank.name} /></div>
            {/* Credits indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg surface-subtle border border-default">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-primary">{user.isAdmin ? '∞' : user.credits}</span>
              <span className="text-[10px] text-muted">/ {user.isAdmin ? '∞' : user.maxCredits}</span>
            </div>
            <LanguageSwitcher lang={lang} onChange={changeLang} t={t} />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button onClick={logout} className="text-xs text-muted hover:text-red-400 transition-colors px-2 hidden sm:block">Logout</button>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardTab t={t} rank={rank} />}
          {activeTab === 'mining' && (
            <MiningTab
              t={t}
              onGenerate={handleGenerateScript}
              history={history}
              onToggleFav={toggleFavorite}
              onDeleteRecord={deleteRecord}
              consumeCredits={consumeCredits}
              addRankPoints={addRankPoints}
              isAdmin={user.isAdmin}
              prefillData={prefillData}
              onPrefillConsumed={() => setPrefillData(null)}
            />
          )}
          {activeTab === 'ebook' && <EbookTab t={t} consumeCredits={consumeCredits} addRankPoints={addRankPoints} isAdmin={user.isAdmin} />}
          {activeTab === 'dropshipping' && <DropshippingTab t={t} onImportProduct={handleImportProduct} consumeCredits={consumeCredits} addRankPoints={addRankPoints} isAdmin={user.isAdmin} />}
          {activeTab === 'landingBuilder' && <LandingBuilderTab t={t} />}
          {activeTab === 'traffic' && <TrafficTab t={t} />}
          {activeTab === 'massSender' && <MassSenderTab t={t} />}
          {activeTab === 'affiliates' && (
            <AffiliatesTab
              t={t}
              products={products}
              links={links}
              onGenerateLink={handleGenerateAffiliateLink}
              onDeleteLink={deleteLink}
              onImportProduct={handleImportProduct}
              consumeCredits={consumeCredits}
              isAdmin={user.isAdmin}
            />
          )}
          {activeTab === 'automation' && <AutomationTab t={t} />}
          {activeTab === 'subscription' && <SubscriptionTab t={t} user={user} addCredits={addCredits} />}
          {activeTab === 'security' && <SecurityTab t={t} keys={keys} setKey={setKey} />}
          {activeTab === 'admin' && user.isAdmin && <AdminTab t={t} users={adminUsers} onInjectCredits={injectCredits} />}
        </main>

        <footer className="border-t border-default px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto text-center text-xs text-muted">{t('appName')} — {t('enterpriseEdition')}</div>
        </footer>
      </div>

      <Chatbot t={t} />
    </div>
  );
}
