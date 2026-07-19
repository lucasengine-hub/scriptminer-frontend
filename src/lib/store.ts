import { useState, useEffect, useCallback } from 'react';
import type { Lang } from './i18n';

// ===== Types =====

export interface UserState {
  email: string;
  isAdmin: boolean;
  isGodMode: boolean;
  isLoggedIn: boolean;
  credits: number;
  maxCredits: number;
  rankPoints: number;
  referralCode: string;
  plan: 'free' | 'standard' | 'black';
}

export interface Workspace {
  id: string;
  name: string;
  type: 'personal' | 'agency';
}

export interface ProxyEntry {
  id: string;
  ip: string;
  port: number;
  country: string;
  status: 'active' | 'rotating' | 'down';
  latency: number;
}

export interface MarketplaceListing {
  id: string;
  productName: string;
  ownerEmail: string;
  price: number;
  commissionRate: number;
  category: string;
  description: string;
  createdAt: number;
  affiliateCount: number;
}

export interface VRTXPayOffer {
  id: string;
  offerName: string;
  price: number;
  orderBump: string;
  bumpPrice: number;
  link: string;
  conversions: number;
  declined: number;
  recovered: number;
}

export interface VRTXClassCourse {
  id: string;
  courseName: string;
  studentLink: string;
  modules: { id: string; title: string; order: number }[];
}

export interface MailFunnel {
  id: string;
  name: string;
  steps: { id: string; trigger: string; delay: string; subject: string; copy: string }[];
}

export interface SocialCRMRule {
  id: string;
  platform: 'Instagram' | 'TikTok';
  triggerKeyword: string;
  dmDelayMin: number;
  dmDelayMax: number;
  dmTemplate: string;
  active: boolean;
}

export interface KanbanCard {
  id: string;
  title: string;
  type: 'video' | 'lead';
  column: 'idea' | 'process' | 'done';
  meta: string;
}

export interface WebBuilderProject {
  id: string;
  name: string;
  offer: string;
  html: string;
  variantA: string;
  variantB: string;
  legalPrivacy: string;
  legalTerms: string;
}

export interface ScriptRecord {
  id: string;
  productName: string;
  style: string;
  output: string;
  createdAt: number;
  favorite: boolean;
  niche: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  style: string;
  audience: string;
  status: 'active' | 'pending' | 'draft';
  createdAt: string;
  clicks: number;
  sales: number;
  commission: number;
}

export interface AffiliateLink {
  id: string;
  productId: string;
  productName: string;
  code: string;
  url: string;
  clicks: number;
  conversions: number;
  commissionRate: number;
  role: 'Afiliado' | 'Coprodutor';
  platform: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  credits: number;
  status: 'active' | 'suspended';
}

// ===== Cross-Tab Event Bus (Synergy) =====
// Lightweight pub/sub so independent hooks can communicate without prop-drilling.

type Listener = (payload: any) => void;
const listeners: Record<string, Set<Listener>> = {};

export function vrtxEmit(event: string, payload?: any) {
  (listeners[event] ?? new Set()).forEach((fn) => fn(payload));
}

export function useVrtxEvent(event: string, handler: Listener) {
  useEffect(() => {
    if (!listeners[event]) listeners[event] = new Set();
    listeners[event].add(handler);
    return () => { listeners[event]?.delete(handler); };
  }, [event, handler]);
}

// Cross-tab event names
export const VRTX_EVENTS = {
  STUDIO_RENDERED: 'studio:rendered',
  IMPORT_PRODUCT: 'import:product',
  CREDITS_CHANGED: 'credits:changed',
} as const;

// ===== localStorage hook =====

function usePersistentState<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) as T : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [key, state]);

  return [state, setState];
}

// ===== Theme =====

export function useTheme() {
  const [theme, setTheme] = usePersistentState<'dark' | 'light'>('vrtx_theme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [setTheme]);
  return { theme, toggleTheme };
}

// ===== Language =====

export function useLanguage() {
  const [lang, setLang] = usePersistentState<Lang>('vrtx_lang', 'pt');
  const changeLang = useCallback((l: Lang) => setLang(l), [setLang]);
  return { lang, changeLang };
}

// ===== User =====

const DEFAULT_USER: UserState = {
  email: '',
  isAdmin: false,
  isGodMode: false,
  isLoggedIn: false,
  credits: 850,
  maxCredits: 1000,
  rankPoints: 0,
  referralCode: 'user_id_982',
  plan: 'free' as const,
};

export function useUser() {
  const [user, setUser] = usePersistentState<UserState>('vrtx_user', DEFAULT_USER);

  const login = useCallback((email: string, token?: string) => {
    const isAdmin = email.trim().toLowerCase() === 'admin@vrtx.app';
    const isGodMode = (token ?? '').trim().toUpperCase() === 'VRTX-CORE-MASTER-2026';
    setUser({
      email,
      isAdmin,
      isGodMode,
      isLoggedIn: true,
      credits: isAdmin || isGodMode ? 999999 : 850,
      maxCredits: isAdmin || isGodMode ? 999999 : 1000,
      rankPoints: 0,
      referralCode: 'user_id_982',
      plan: isGodMode ? 'black' : 'free',
    });
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(DEFAULT_USER);
  }, [setUser]);

  const consumeCredits = useCallback((amount: number) => {
    setUser((prev) => {
      if (prev.isAdmin || prev.isGodMode) return prev; // unlimited
      return { ...prev, credits: Math.max(0, prev.credits - amount) };
    });
  }, [setUser]);

  const addCredits = useCallback((amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: prev.isAdmin || prev.isGodMode ? prev.credits : prev.credits + amount,
      maxCredits: prev.isAdmin || prev.isGodMode ? prev.maxCredits : Math.max(prev.maxCredits, prev.credits + amount),
    }));
  }, [setUser]);

  const addRankPoints = useCallback((amount: number) => {
    setUser((prev) => ({ ...prev, rankPoints: prev.rankPoints + amount }));
  }, [setUser]);

  return { user, login, logout, consumeCredits, addCredits, addRankPoints };
}

// ===== Rank system =====

export interface RankInfo {
  name: string;
  nextName: string;
  current: number;
  next: number;
  progress: number;
  level: 0 | 1 | 2;
}

export function getRankInfo(points: number, t: (k: string) => string): RankInfo {
  const LEVEL_1 = 100;
  const LEVEL_2 = 300;
  if (points < LEVEL_1) {
    return { name: t('rankMiner'), nextName: t('rankShark'), current: points, next: LEVEL_1, progress: (points / LEVEL_1) * 100, level: 0 };
  }
  if (points < LEVEL_2) {
    return { name: t('rankShark'), nextName: t('rankElite'), current: points, next: LEVEL_2, progress: ((points - LEVEL_1) / (LEVEL_2 - LEVEL_1)) * 100, level: 1 };
  }
  return { name: t('rankElite'), nextName: t('rankElite'), current: points, next: LEVEL_2, progress: 100, level: 2 };
}

// ===== Script history =====

export function useScriptHistory() {
  const [history, setHistory] = usePersistentState<ScriptRecord[]>('vrtx_scripts', []);
  const addRecord = useCallback((rec: ScriptRecord) => setHistory((prev) => [rec, ...prev]), [setHistory]);
  const toggleFavorite = useCallback((id: string) => setHistory((prev) => prev.map((r) => r.id === id ? { ...r, favorite: !r.favorite } : r)), [setHistory]);
  const deleteRecord = useCallback((id: string) => setHistory((prev) => prev.filter((r) => r.id !== id)), [setHistory]);
  return { history, addRecord, toggleFavorite, deleteRecord };
}

// ===== Products =====

export function useProducts() {
  const [products, setProducts] = usePersistentState<Product[]>('vrtx_products', []);
  const addProduct = useCallback((p: Product) => setProducts((prev) => [p, ...prev]), [setProducts]);
  return { products, addProduct };
}

// ===== Affiliate links =====

export function useAffiliateLinks() {
  const [links, setLinks] = usePersistentState<AffiliateLink[]>('vrtx_aff_links', []);
  const addLink = useCallback((l: AffiliateLink) => setLinks((prev) => [l, ...prev]), [setLinks]);
  const deleteLink = useCallback((id: string) => setLinks((prev) => prev.filter((l) => l.id !== id)), [setLinks]);
  return { links, addLink, deleteLink };
}

// ===== API Keys =====

export function useApiKeys() {
  const [keys, setKeys] = usePersistentState<Record<string, string>>('vrtx_api_keys', { openai: '', gemini: '', tiktok: '' });
  const setKey = useCallback((id: string, value: string) => setKeys((prev) => ({ ...prev, [id]: value })), [setKeys]);
  return { keys, setKey };
}

// ===== Admin users =====

export function useAdminUsers() {
  const [users, setUsers] = usePersistentState<AdminUser[]>('vrtx_admin_users', [
    { id: 'u1', name: 'João Mendes', email: 'joao@email.com', plan: 'Black', credits: 920, status: 'active' },
    { id: 'u2', name: 'Ana Paula', email: 'ana@email.com', plan: 'Pro', credits: 340, status: 'active' },
    { id: 'u3', name: 'Carlos Silva', email: 'carlos@email.com', plan: 'Pro', credits: 50, status: 'active' },
    { id: 'u4', name: 'Mariana Lima', email: 'mari@email.com', plan: 'Black', credits: 780, status: 'active' },
    { id: 'u5', name: 'Pedro Costa', email: 'pedro@email.com', plan: 'Free', credits: 0, status: 'suspended' },
  ]);
  const injectCredits = useCallback((id: string, amount: number) => setUsers((prev) => prev.map((u) => u.id === id ? { ...u, credits: u.credits + amount } : u)), [setUsers]);
  return { users, injectCredits };
}

// ===== New Module Hooks =====

export function useWorkspaces() {
  const [current, setCurrent] = usePersistentState<Workspace>('vrtx_workspace', {
    id: 'ws1', name: 'Workspace Pessoal', type: 'personal',
  });
  const [list] = usePersistentState<Workspace[]>('vrtx_workspaces', [
    { id: 'ws1', name: 'Workspace Pessoal', type: 'personal' },
    { id: 'ws2', name: 'Cliente Agência A', type: 'agency' },
    { id: 'ws3', name: 'Cliente Agência B', type: 'agency' },
  ]);
  return { current, list, change: setCurrent };
}

export function useProxies() {
  const [proxies, setProxies] = usePersistentState<ProxyEntry[]>('vrtx_proxies', [
    { id: 'px1', ip: '189.45.12.8', port: 8080, country: 'BR', status: 'active', latency: 42 },
    { id: 'px2', ip: '201.33.88.140', port: 3128, country: 'BR', status: 'active', latency: 67 },
    { id: 'px3', ip: '45.231.88.9', port: 8080, country: 'BR', status: 'rotating', latency: 89 },
    { id: 'px4', ip: '177.44.101.2', port: 8888, country: 'BR', status: 'active', latency: 54 },
  ]);
  const rotate = useCallback(() => {
    setProxies((prev) => prev.map((p) => {
      const newIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      return { ...p, ip: newIp, latency: 30 + Math.floor(Math.random() * 80), status: 'active' as const };
    }));
  }, [setProxies]);
  const add = useCallback((p: ProxyEntry) => setProxies((prev) => [...prev, p]), [setProxies]);
  const remove = useCallback((id: string) => setProxies((prev) => prev.filter((p) => p.id !== id)), [setProxies]);
  return { proxies, rotate, add, remove };
}

export function useMarketplace() {
  const [listings, setListings] = usePersistentState<MarketplaceListing[]>('vrtx_marketplace', [
    { id: 'm1', productName: 'Curso Tráfego Master v2', ownerEmail: 'founder@vrtx.app', price: 297, commissionRate: 50, category: 'Tráfego', description: 'Curso completo com 40 módulos.', createdAt: Date.now() - 86400000, affiliateCount: 142 },
    { id: 'm2', productName: 'E-book Receitas Fit Pro', ownerEmail: 'ana@vrtx.app', price: 47, commissionRate: 40, category: 'Saúde', description: '120 receitas + plano alimentar.', createdAt: Date.now() - 172800000, affiliateCount: 89 },
    { id: 'm3', productName: 'Mentoria Branding Elite', ownerEmail: 'carlos@vrtx.app', price: 1497, commissionRate: 30, category: 'Branding', description: 'Mentoria 1:1 de 8 sessões.', createdAt: Date.now() - 259200000, affiliateCount: 24 },
  ]);
  const addListing = useCallback((l: Omit<MarketplaceListing, 'id' | 'createdAt' | 'affiliateCount'>) => {
    setListings((prev) => [...prev, { ...l, id: `m${Date.now()}`, createdAt: Date.now(), affiliateCount: 0 }]);
  }, [setListings]);
  const affiliate = useCallback((id: string) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, affiliateCount: l.affiliateCount + 1 } : l));
  }, [setListings]);
  return { listings, addListing, affiliate };
}

export function usePayOffers() {
  const [offers, setOffers] = usePersistentState<VRTXPayOffer[]>('vrtx_pay_offers', [
    { id: 'po1', offerName: 'Curso Completo VIP', price: 297, orderBump: 'Mentoria Bônus', bumpPrice: 97, link: `${window.location.origin}/pay/po1`, conversions: 84, declined: 12, recovered: 7 },
  ]);
  const addOffer = useCallback((o: Omit<VRTXPayOffer, 'id' | 'link' | 'conversions' | 'declined' | 'recovered'>) => {
    const id = `po${Date.now()}`;
    setOffers((prev) => [...prev, { ...o, id, link: `${window.location.origin}/pay/${id}`, conversions: 0, declined: 0, recovered: 0 }]);
  }, [setOffers]);
  const recoverDunning = useCallback((id: string) => {
    setOffers((prev) => prev.map((o) => o.id === id ? { ...o, declined: Math.max(0, o.declined - 1), recovered: o.recovered + 1 } : o));
  }, [setOffers]);
  return { offers, addOffer, recoverDunning };
}

export function useCourses() {
  const [courses, setCourses] = usePersistentState<VRTXClassCourse[]>('vrtx_courses', [
    { id: 'c1', courseName: 'Mentoria Tráfego Master', studentLink: `${window.location.origin}/class/c1`, modules: [
      { id: 'cm1', title: 'Fundamentos do Tráfego', order: 0 },
      { id: 'cm2', title: 'Escala com Facebook Ads', order: 1 },
    ]},
  ]);
  const addCourse = useCallback((name: string) => {
    const id = `c${Date.now()}`;
    setCourses((prev) => [...prev, { id, courseName: name, studentLink: `${window.location.origin}/class/${id}`, modules: [] }]);
  }, [setCourses]);
  const addModule = useCallback((courseId: string, title: string) => {
    setCourses((prev) => prev.map((c) => c.id === courseId ? {
      ...c, modules: [...c.modules, { id: `cm${Date.now()}`, title, order: c.modules.length }].sort((a, b) => a.order - b.order),
    } : c));
  }, [setCourses]);
  const reorderModule = useCallback((courseId: string, fromIdx: number, toIdx: number) => {
    setCourses((prev) => prev.map((c) => {
      if (c.id !== courseId) return c;
      const mods = [...c.modules].sort((a, b) => a.order - b.order);
      const [moved] = mods.splice(fromIdx, 1);
      mods.splice(toIdx, 0, moved);
      return { ...c, modules: mods.map((m, i) => ({ ...m, order: i })) };
    }));
  }, [setCourses]);
  const removeModule = useCallback((courseId: string, moduleId: string) => {
    setCourses((prev) => prev.map((c) => c.id === courseId ? { ...c, modules: c.modules.filter((m) => m.id !== moduleId).map((m, i) => ({ ...m, order: i })) } : c));
  }, [setCourses]);
  return { courses, addCourse, addModule, reorderModule, removeModule };
}

export function useMailFunnels() {
  const [funnels, setFunnels] = usePersistentState<MailFunnel[]>('vrtx_mail_funnels', [
    { id: 'f1', name: 'Recuperação de Carrinho', steps: [
      { id: 'fs1', trigger: 'Carrinho Abandonado', delay: '10 min', subject: 'Você esqueceu algo no carrinho!', copy: 'Olá! Notamos que você deixou um item para trás. Finalize agora e garanta o desconto.' },
      { id: 'fs2', trigger: 'Boleto Gerado', delay: '1 dia', subject: 'Seu boleto vence hoje!', copy: 'Última chamada! Seu boleto está prestes a vencer. Pague agora e não perca o acesso.' },
      { id: 'fs3', trigger: 'Upsell Pós-Compra', delay: '3 dias', subject: 'Oferta exclusiva para clientes VIP', copy: 'Como cliente, você tem acesso a uma oferta especial por tempo limitado.' },
    ]},
  ]);
  const addFunnel = useCallback((name: string) => {
    setFunnels((prev) => [...prev, { id: `f${Date.now()}`, name, steps: [] }]);
  }, [setFunnels]);
  return { funnels, addFunnel };
}

export function useSocialCRM() {
  const [rules, setRules] = usePersistentState<SocialCRMRule[]>('vrtx_social_crm', [
    { id: 'r1', platform: 'Instagram', triggerKeyword: 'EU QUERO', dmDelayMin: 2, dmDelayMax: 5, dmTemplate: 'Vi seu comentário! Aqui está o link exclusivo: [LINK_AFILIADO]', active: true },
  ]);
  const toggle = useCallback((id: string) => setRules((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r)), [setRules]);
  const addRule = useCallback((rule: Omit<SocialCRMRule, 'id' | 'active'>) => {
    setRules((prev) => [...prev, { ...rule, id: `r${Date.now()}`, active: true }]);
  }, [setRules]);
  return { rules, toggle, addRule };
}

export function useKanban() {
  const [cards, setCards] = usePersistentState<KanbanCard[]>('vrtx_kanban', [
    { id: 'k1', title: 'Vídeo: Unboxing Projetor 4K', type: 'video', column: 'idea', meta: 'TikTok · 15s' },
    { id: 'k2', title: 'Lead: Agência High-Ticket R$15k', type: 'lead', column: 'process', meta: 'WhatsApp · Quente' },
    { id: 'k3', title: 'Vídeo: Receitas Fit Express', type: 'video', column: 'done', meta: 'Reels · 30s' },
    { id: 'k4', title: 'Lead: Curso Tráfego Master', type: 'lead', column: 'idea', meta: 'Email · Frio' },
  ]);
  const moveCard = useCallback((id: string, column: KanbanCard['column']) => {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, column } : c));
  }, [setCards]);
  const addCard = useCallback((card: Omit<KanbanCard, 'id' | 'column'>) => {
    setCards((prev) => [...prev, { ...card, id: `k${Date.now()}`, column: 'idea' }]);
  }, [setCards]);
  return { cards, moveCard, addCard };
}

export function useWebBuilder() {
  const [projects, setProjects] = usePersistentState<WebBuilderProject[]>('vrtx_webbuilder', []);
  const addProject = useCallback((name: string, offer: string) => {
    const id = `wb${Date.now()}`;
    const html = `<div class="hero"><h1>${offer}</h1><p>Transforme seus resultados em 7 dias.</p><button>Quero Agora</button></div>`;
    setProjects((prev) => [...prev, {
      id, name, offer, html,
      variantA: `Descubra como ${offer} pode eliminar sua dor de cabeça hoje.`,
      variantB: `Imagine ter ${offer} funcionando para você 24/7. Comece agora.`,
      legalPrivacy: `POLÍTICA DE PRIVACIDADE\n\nColetamos dados conforme LGPD/GDPR. Seus dados são armazenados com criptografia AES-256 e nunca compartilhados com terceiros sem consentimento.`,
      legalTerms: `TERMOS DE USO\n\nAo usar esta plataforma você concorda com nossos termos. Garantia de 7 dias. Proibida reprodução não autorizada.`,
    }]);
  }, [setProjects]);
  return { projects, addProject };
}