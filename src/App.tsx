import { useState, useCallback } from 'react';
import { Menu, Sparkles, Crown, ShieldCheck, Zap, LogOut } from 'lucide-react';
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
import { StudioTab } from './components/StudioTab';
import { MarketplaceTab } from './components/MarketplaceTab';
import { VRTXPayTab } from './components/VRTXPayTab';
import { VRTXClassTab } from './components/VRTXClassTab';
import { MailCRMTab } from './components/MailCRMTab';
import { WebBuilderTab } from './components/WebBuilderTab';
import { KanbanTab } from './components/KanbanTab';
import { CoreControlTab } from './components/CoreControlTab';
import { LanguageSwitcher, ThemeToggle, RankBadge } from './components/ui';
import { translations } from './lib/i18n';
import {
  useTheme, useLanguage, useUser, useScriptHistory, useProducts, useAffiliateLinks,
  useApiKeys, useAdminUsers, getRankInfo, type UserState, type RankInfo,
  vrtxEmit, VRTX_EVENTS,
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

  const handleLogin = (email: string, token?: string) => login(email, token);

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
      url: `${window.location.origin}/af/${code.toLowerCase().replace('afil-', '')}`,
      clicks: 0, conversions: 0, commissionRate, role, platform,
    });
  };

  const handleImportProduct = (productName: string, description: string, hook: string) => {
    setPrefillData({ productName, description, hook });
    setActiveTab('mining');
    // Cross-tab synergy: notify Web Builder to prefill
    vrtxEmit(VRTX_EVENTS.IMPORT_PRODUCT, { productName, description, hook });
  };

  if (!user.isLoggedIn) {
    return <LoginScreen t={t} onLogin={handleLogin} />;
  }

  // ===== Strict bifurcation: God-Mode vs Public Application =====
  if (user.isGodMode) {
    return <VrtxCoreEngineAdmin
      t={t} theme={theme} toggleTheme={toggleTheme} lang={lang} changeLang={changeLang}
      activeTab={activeTab} setActiveTab={setActiveTab} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      user={user} logout={logout} rank={rank}
      history={history} addRecord={addRecord} toggleFavorite={toggleFavorite} deleteRecord={deleteRecord}
      consumeCredits={consumeCredits} addRankPoints={addRankPoints}
      products={products} links={links} addLink={addLink} deleteLink={deleteLink}
      onGenerateScript={handleGenerateScript} onGenerateAffiliateLink={handleGenerateAffiliateLink}
      onImportProduct={handleImportProduct} prefillData={prefillData} setPrefillData={setPrefillData}
      keys={keys} setKey={setKey} adminUsers={adminUsers} injectCredits={injectCredits}
      addCredits={addCredits}
    />;
  }

  return <VrtxPublicApplication
    t={t} theme={theme} toggleTheme={toggleTheme} lang={lang} changeLang={changeLang}
    activeTab={activeTab} setActiveTab={setActiveTab} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
    user={user} logout={logout} rank={rank}
    history={history} addRecord={addRecord} toggleFavorite={toggleFavorite} deleteRecord={deleteRecord}
    consumeCredits={consumeCredits} addRankPoints={addRankPoints}
    products={products} links={links} addLink={addLink} deleteLink={deleteLink}
    onGenerateScript={handleGenerateScript} onGenerateAffiliateLink={handleGenerateAffiliateLink}
    onImportProduct={handleImportProduct} prefillData={prefillData} setPrefillData={setPrefillData}
    keys={keys} setKey={setKey} addCredits={addCredits}
  />;
}

// ===== Shared Topbar =====
interface TopbarProps {
  t: (k: string) => string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  lang: 'pt' | 'en' | 'es';
  changeLang: (l: 'pt' | 'en' | 'es') => void;
  setMobileOpen: (v: boolean) => void;
  user: { email: string; isAdmin: boolean; isGodMode: boolean; credits: number; maxCredits: number; rankPoints: number };
  logout: () => void;
  rank: { level: number; name: string };
  badgeLabel?: string;
  badgeIcon?: React.ReactNode;
  badgeClass?: string;
}

function Topbar({ t, theme, toggleTheme, lang, changeLang, setMobileOpen, user, logout, rank, badgeLabel, badgeIcon, badgeClass }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 sm:px-6 bg-surface-subtle/80 backdrop-blur-xl border-b border-default">
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 text-muted hover:text-primary"><Menu className="w-5 h-5" /></button>
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
          <span className="text-sm font-bold text-primary">{t('appName')}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {badgeLabel && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${badgeClass ?? ''}`}>
            {badgeIcon}
            {badgeLabel}
          </span>
        )}
        {user.isAdmin && !user.isGodMode && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-amber-500/15 to-red-500/15 text-amber-400 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />{t('adminBadge')}
          </span>
        )}
        <div className="hidden sm:block"><RankBadge level={rank.level} name={rank.name} /></div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg surface-subtle border border-default">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold text-primary">{user.isGodMode ? '∞' : user.credits}</span>
          <span className="text-[10px] text-muted">/ {user.isGodMode ? '∞' : user.maxCredits}</span>
        </div>
        <LanguageSwitcher lang={lang} onChange={changeLang} t={t} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <button onClick={logout} className="inline-flex items-center gap-1 text-xs text-muted hover:text-red-400 transition-colors px-2"><LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">Logout</span></button>
      </div>
    </header>
  );
}

// ===== VRTX Core Engine Admin (God-Mode) =====
interface CoreEngineProps {
  t: (k: string) => string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  lang: 'pt' | 'en' | 'es';
  changeLang: (l: 'pt' | 'en' | 'es') => void;
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  user: UserState;
  logout: () => void;
  rank: RankInfo;
  history: any[];
  addRecord: (r: any) => void;
  toggleFavorite: (id: string) => void;
  deleteRecord: (id: string) => void;
  consumeCredits: (n: number) => void;
  addRankPoints: (n: number) => void;
  products: any[];
  links: any[];
  addLink: (l: any) => void;
  deleteLink: (id: string) => void;
  onGenerateScript: (n: string, s: string, o: string, niche: string) => void;
  onGenerateAffiliateLink: (id: string, c: number, r: 'Afiliado' | 'Coprodutor', p: string) => void;
  onImportProduct: (n: string, d: string, h: string) => void;
  prefillData: { productName: string; description: string; hook: string } | null;
  setPrefillData: (d: any) => void;
  keys: Record<string, string>;
  setKey: (id: string, v: string) => void;
  adminUsers: any[];
  injectCredits: (id: string, n: number) => void;
  addCredits: (n: number) => void;
}

function VrtxCoreEngineAdmin(props: CoreEngineProps) {
  const { t, theme, toggleTheme, lang, changeLang, activeTab, setActiveTab, mobileOpen, setMobileOpen, user, logout, rank } = props;
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-ink-950 to-slate-950">
      <Sidebar active={activeTab} onChange={setActiveTab} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} t={t} isAdmin={user.isAdmin} isGodMode={user.isGodMode} userRank={rank} userName={user.email.split('@')[0]} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          t={t} theme={theme} toggleTheme={toggleTheme} lang={lang} changeLang={changeLang}
          setMobileOpen={setMobileOpen} user={user} logout={logout} rank={rank}
          badgeLabel={t('coreOperator')} badgeIcon={<Zap className="w-3.5 h-3.5" />}
          badgeClass="bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_16px_rgba(251,191,36,0.3)]"
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl w-full mx-auto">
          {/* Core Engine always shows CoreControl + full access to all tabs */}
          {activeTab === 'coreControl' && <CoreControlTab t={t} />}
          {activeTab === 'dashboard' && <DashboardTab t={t} rank={rank} />}
          {activeTab === 'mining' && (
            <MiningTab
              t={t}
              onGenerate={props.onGenerateScript}
              history={props.history}
              onToggleFav={props.toggleFavorite}
              onDeleteRecord={props.deleteRecord}
              consumeCredits={props.consumeCredits}
              addRankPoints={props.addRankPoints}
              isAdmin={user.isAdmin}
              prefillData={props.prefillData}
              onPrefillConsumed={() => props.setPrefillData(null)}
            />
          )}
          {activeTab === 'ebook' && <EbookTab t={t} consumeCredits={props.consumeCredits} addRankPoints={props.addRankPoints} isAdmin={user.isAdmin} />}
          {activeTab === 'studio' && <StudioTab t={t} consumeCredits={props.consumeCredits} addRankPoints={props.addRankPoints} isAdmin={user.isAdmin} isGodMode={user.isGodMode} credits={user.credits} />}
          {activeTab === 'marketplace' && <MarketplaceTab t={t} userEmail={user.email} />}
          {activeTab === 'pay' && <VRTXPayTab t={t} />}
          {activeTab === 'class' && <VRTXClassTab t={t} />}
          {activeTab === 'mail' && <MailCRMTab t={t} />}
          {activeTab === 'webBuilder' && <WebBuilderTab t={t} />}
          {activeTab === 'kanban' && <KanbanTab t={t} />}
          {activeTab === 'dropshipping' && <DropshippingTab t={t} onImportProduct={props.onImportProduct} consumeCredits={props.consumeCredits} addRankPoints={props.addRankPoints} isAdmin={user.isAdmin} />}
          {activeTab === 'landingBuilder' && <LandingBuilderTab t={t} />}
          {activeTab === 'traffic' && <TrafficTab t={t} />}
          {activeTab === 'massSender' && <MassSenderTab t={t} />}
          {activeTab === 'affiliates' && (
            <AffiliatesTab t={t} products={props.products} links={props.links} onGenerateLink={props.onGenerateAffiliateLink} onDeleteLink={props.deleteLink} onImportProduct={props.onImportProduct} consumeCredits={props.consumeCredits} isAdmin={user.isAdmin} />
          )}
          {activeTab === 'automation' && <AutomationTab t={t} />}
          {activeTab === 'subscription' && <SubscriptionTab t={t} user={user} addCredits={props.addCredits} />}
          {activeTab === 'security' && <SecurityTab t={t} keys={props.keys} setKey={props.setKey} />}
          {activeTab === 'admin' && user.isAdmin && <AdminTab t={t} users={props.adminUsers} onInjectCredits={props.injectCredits} />}
        </main>
        <footer className="border-t border-default px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto text-center text-xs text-amber-400/70">{t('appName')} — {t('coreOperator')} Engine Core</div>
        </footer>
      </div>
      <Chatbot t={t} currentTab={activeTab} creditsBalance={user.credits} isAdmin={user.isAdmin} />
    </div>
  );
}

// ===== VRTX Public Application (Regular Users) =====
interface PublicAppProps {
  t: (k: string) => string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  lang: 'pt' | 'en' | 'es';
  changeLang: (l: 'pt' | 'en' | 'es') => void;
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  user: UserState;
  logout: () => void;
  rank: RankInfo;
  history: any[];
  addRecord: (r: any) => void;
  toggleFavorite: (id: string) => void;
  deleteRecord: (id: string) => void;
  consumeCredits: (n: number) => void;
  addRankPoints: (n: number) => void;
  products: any[];
  links: any[];
  addLink: (l: any) => void;
  deleteLink: (id: string) => void;
  onGenerateScript: (n: string, s: string, o: string, niche: string) => void;
  onGenerateAffiliateLink: (id: string, c: number, r: 'Afiliado' | 'Coprodutor', p: string) => void;
  onImportProduct: (n: string, d: string, h: string) => void;
  prefillData: { productName: string; description: string; hook: string } | null;
  setPrefillData: (d: any) => void;
  keys: Record<string, string>;
  setKey: (id: string, v: string) => void;
  addCredits: (n: number) => void;
}

function VrtxPublicApplication(props: PublicAppProps) {
  const { t, theme, toggleTheme, lang, changeLang, activeTab, setActiveTab, mobileOpen, setMobileOpen, user, logout, rank } = props;
  return (
    <div className="min-h-screen flex">
      <Sidebar active={activeTab} onChange={setActiveTab} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} t={t} isAdmin={user.isAdmin} isGodMode={false} userRank={rank} userName={user.email.split('@')[0]} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar t={t} theme={theme} toggleTheme={toggleTheme} lang={lang} changeLang={changeLang} setMobileOpen={setMobileOpen} user={user} logout={logout} rank={rank} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardTab t={t} rank={rank} />}
          {activeTab === 'mining' && (
            <MiningTab
              t={t}
              onGenerate={props.onGenerateScript}
              history={props.history}
              onToggleFav={props.toggleFavorite}
              onDeleteRecord={props.deleteRecord}
              consumeCredits={props.consumeCredits}
              addRankPoints={props.addRankPoints}
              isAdmin={user.isAdmin}
              prefillData={props.prefillData}
              onPrefillConsumed={() => props.setPrefillData(null)}
            />
          )}
          {activeTab === 'ebook' && <EbookTab t={t} consumeCredits={props.consumeCredits} addRankPoints={props.addRankPoints} isAdmin={user.isAdmin} />}
          {activeTab === 'studio' && <StudioTab t={t} consumeCredits={props.consumeCredits} addRankPoints={props.addRankPoints} isAdmin={user.isAdmin} isGodMode={false} credits={user.credits} />}
          {activeTab === 'marketplace' && <MarketplaceTab t={t} userEmail={user.email} />}
          {activeTab === 'pay' && <VRTXPayTab t={t} />}
          {activeTab === 'class' && <VRTXClassTab t={t} />}
          {activeTab === 'mail' && <MailCRMTab t={t} />}
          {activeTab === 'webBuilder' && <WebBuilderTab t={t} />}
          {activeTab === 'kanban' && <KanbanTab t={t} />}
          {activeTab === 'dropshipping' && <DropshippingTab t={t} onImportProduct={props.onImportProduct} consumeCredits={props.consumeCredits} addRankPoints={props.addRankPoints} isAdmin={user.isAdmin} />}
          {activeTab === 'landingBuilder' && <LandingBuilderTab t={t} />}
          {activeTab === 'traffic' && <TrafficTab t={t} />}
          {activeTab === 'massSender' && <MassSenderTab t={t} />}
          {activeTab === 'affiliates' && (
            <AffiliatesTab t={t} products={props.products} links={props.links} onGenerateLink={props.onGenerateAffiliateLink} onDeleteLink={props.deleteLink} onImportProduct={props.onImportProduct} consumeCredits={props.consumeCredits} isAdmin={user.isAdmin} />
          )}
          {activeTab === 'automation' && <AutomationTab t={t} />}
          {activeTab === 'subscription' && <SubscriptionTab t={t} user={user} addCredits={props.addCredits} />}
          {activeTab === 'security' && <SecurityTab t={t} keys={props.keys} setKey={props.setKey} />}
          {activeTab === 'admin' && user.isAdmin && <AdminTab t={t} users={[]} onInjectCredits={() => {}} />}
        </main>
        <footer className="border-t border-default px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto text-center text-xs text-muted">{t('appName')} — {t('enterpriseEdition')}</div>
        </footer>
      </div>
      <Chatbot t={t} currentTab={activeTab} creditsBalance={user.credits} isAdmin={user.isAdmin} />
    </div>
  );
}
