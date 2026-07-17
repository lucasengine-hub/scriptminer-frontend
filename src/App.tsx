import { useState } from 'react';
import { Menu, Moon, Sun, Sparkles } from 'lucide-react';
import { Sidebar, type TabId } from './components/Sidebar';
import { DashboardTab } from './components/DashboardTab';
import { MiningTab } from './components/MiningTab';
import { EbookTab } from './components/EbookTab';
import { DropshippingTab } from './components/DropshippingTab';
import { AffiliatesTab } from './components/AffiliatesTab';
import { AutomationTab } from './components/AutomationTab';
import { SettingsTab } from './components/SettingsTab';
import { SubscriptionTab } from './components/SubscriptionTab';
import { Chatbot } from './components/Chatbot';
import { useTheme } from './components/ui';
import {
  type Product, type AffiliateLink, mockProducts, mockAffiliateLinks,
} from './lib/types';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>(mockAffiliateLinks);

  const handleProductCreated = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const handleGenerateLink = (productId: string, commissionRate: number, role: 'Afiliado' | 'Coprodutor') => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const code = `AFIL-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const newLink: AffiliateLink = {
      id: `a${Date.now()}`,
      productId,
      productName: product.name,
      code,
      url: `https://scriptminer.com/af/${code.toLowerCase().replace('afil-', '')}`,
      clicks: 0,
      conversions: 0,
      commissionRate,
      role,
    };
    setAffiliateLinks((prev) => [newLink, ...prev]);
  };

  const handleDeleteLink = (id: string) => {
    setAffiliateLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        active={activeTab}
        onChange={setActiveTab}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar + theme toggle */}
        <div className="lg:hidden sticky top-0 z-20 h-14 flex items-center justify-between px-4 bg-surface-subtle/80 backdrop-blur-xl border-b border-default">
          <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 text-muted hover:text-primary">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-primary">ScriptMiner</span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Desktop theme toggle (top-right floating) */}
        <button
          onClick={toggleTheme}
          className="hidden lg:flex fixed top-4 right-6 z-30 w-10 h-10 rounded-xl surface items-center justify-center hover:scale-105 transition-all"
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Moon className="w-5 h-5 text-accent-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
        </button>

        {/* Tab content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'mining' && <MiningTab onProductCreated={handleProductCreated} />}
          {activeTab === 'ebook' && <EbookTab />}
          {activeTab === 'dropshipping' && <DropshippingTab />}
          {activeTab === 'affiliates' && (
            <AffiliatesTab
              products={products}
              affiliateLinks={affiliateLinks}
              onGenerateLink={handleGenerateLink}
              onDeleteLink={handleDeleteLink}
            />
          )}
          {activeTab === 'automation' && <AutomationTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'subscription' && <SubscriptionTab />}
        </main>

        <footer className="border-t border-default px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto text-center text-xs text-muted">
            ScriptMiner — Ecossistema Enterprise de Geração de Roteiros & Mineração de Produtos
          </div>
        </footer>
      </div>

      <Chatbot />
    </div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-9 h-9 rounded-lg surface flex items-center justify-center hover:scale-105 transition-all"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? <Moon className="w-4 h-4 text-accent-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
    </button>
  );
}
