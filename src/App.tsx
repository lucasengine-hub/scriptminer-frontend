import { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { Sidebar, type TabId } from './components/Sidebar';
import { MiningTab } from './components/MiningTab';
import { AffiliatesTab } from './components/AffiliatesTab';
import { VideosTab } from './components/VideosTab';
import { ChannelsTab } from './components/ChannelsTab';
import { AutomationTab } from './components/AutomationTab';
import {
  type Product, type AffiliateLink, mockProducts, mockAffiliateLinks,
} from './lib/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('mining');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>(mockAffiliateLinks);

  const handleProductCreated = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const handleGenerateLink = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const code = `AFIL-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const newLink: AffiliateLink = {
      id: `a${Date.now()}`,
      productId,
      productName: product.name,
      code,
      url: `https://scriptminer.app/r/${code}`,
      clicks: 0,
      conversions: 0,
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

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 h-14 flex items-center justify-between px-4 bg-ink-950/80 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">ScriptMiner</span>
          </div>
          <div className="w-9" />
        </div>

        {/* Tab content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl w-full mx-auto">
          {activeTab === 'mining' && <MiningTab onProductCreated={handleProductCreated} />}
          {activeTab === 'affiliates' && (
            <AffiliatesTab
              products={products}
              affiliateLinks={affiliateLinks}
              onGenerateLink={handleGenerateLink}
              onDeleteLink={handleDeleteLink}
            />
          )}
          {activeTab === 'videos' && <VideosTab />}
          {activeTab === 'channels' && <ChannelsTab />}
          {activeTab === 'automation' && <AutomationTab />}
        </main>

        <footer className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto text-center text-xs text-slate-600">
            ScriptMiner — Ecossistema de Geração de Roteiros & Mineração de Produtos · Enterprise Edition
          </div>
        </footer>
      </div>
    </div>
  );
}
