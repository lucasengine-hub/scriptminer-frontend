import { useState, useEffect, useCallback } from 'react';
import type { Lang } from './i18n';

// ===== Types =====

export interface UserState {
  email: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  credits: number;
  maxCredits: number;
  rankPoints: number;
  referralCode: string;
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
  isLoggedIn: false,
  credits: 850,
  maxCredits: 1000,
  rankPoints: 0,
  referralCode: 'user_id_982',
};

export function useUser() {
  const [user, setUser] = usePersistentState<UserState>('vrtx_user', DEFAULT_USER);

  const login = useCallback((email: string) => {
    const isAdmin = email.trim().toLowerCase() === 'admin@vrtx.app';
    setUser({
      email,
      isAdmin,
      isLoggedIn: true,
      credits: isAdmin ? 999999 : 850,
      maxCredits: isAdmin ? 999999 : 1000,
      rankPoints: 0,
      referralCode: 'user_id_982',
    });
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(DEFAULT_USER);
  }, [setUser]);

  const consumeCredits = useCallback((amount: number) => {
    setUser((prev) => {
      if (prev.isAdmin) return prev; // unlimited
      return { ...prev, credits: Math.max(0, prev.credits - amount) };
    });
  }, [setUser]);

  const addCredits = useCallback((amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: prev.isAdmin ? prev.credits : prev.credits + amount,
      maxCredits: prev.isAdmin ? prev.maxCredits : Math.max(prev.maxCredits, prev.credits + amount),
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
