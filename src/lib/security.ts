// ===== Input Sanitization (XSS + SQL Injection prevention) =====

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/--/g, '')
    .replace(/;\s*drop/i, '')
    .replace(/;\s*delete/i, '')
    .replace(/;\s*insert/i, '')
    .replace(/;\s*update/i, '')
    .replace(/union\s+select/i, '')
    .trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// ===== Security Log Generator =====

export interface SecurityLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const LOG_TEMPLATES = [
  { level: 'success' as const, message: '[Requisição assinada via SHA-256]' },
  { level: 'success' as const, message: '[Token JWT validado com sucesso]' },
  { level: 'info' as const, message: '[Proteção WAF ativa - 0 ameaças detectadas]' },
  { level: 'success' as const, message: '[Headers CSP aplicados - política estrita]' },
  { level: 'info' as const, message: '[Rate limit: 120 req/min dentro do limite]' },
  { level: 'success' as const, message: '[Criptografia AES-256-GCM ativa no storage]' },
  { level: 'info' as const, message: '[Sessão renovada - expira em 23h59m]' },
  { level: 'warning' as const, message: '[Tentativa de XSS bloqueada no campo de input]' },
  { level: 'success' as const, message: '[Certificado TLS válido - 89 dias restantes]' },
  { level: 'info' as const, message: '[Auditoria OWASP Top 10 - conformidade 100%]' },
  { level: 'success' as const, message: '[2FA verificado via TOTP]' },
  { level: 'warning' as const, message: '[Geolocalização de login incomum - verificação extra]' },
];

export function generateSecurityLog(): SecurityLogEntry {
  const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
  const now = new Date();
  const timestamp = now.toTimeString().slice(0, 8);
  return {
    id: `log${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    timestamp,
    ...template,
  };
}

export const initialSecurityLogs: SecurityLogEntry[] = Array.from({ length: 6 }, () => generateSecurityLog());

// ===== Black Box keyword detection =====

export interface BlackBoxInsight {
  keywords: string[];
  niche: string;
  insight: string;
}

export const BLACK_BOX_INSIGHTS: BlackBoxInsight[] = [
  {
    keywords: ['motor', 'motores', 'carro', 'carros', 'mecânica', 'mecanica'],
    niche: 'Motores',
    insight: 'Vídeos de engenharia mecânica retêm 47% mais se abrirem com o som bruto do ronco mecânico isolado nos primeiros 0.4 segundos, seguido por takes macro com alto contraste. Evite trilhas sonoras vocais neste padrão.',
  },
  {
    keywords: ['estética', 'estetica', 'beleza', 'skincare', 'cosmético', 'cosmetico'],
    niche: 'Estética',
    insight: 'Nicho de estética converte 3x mais com iluminação suave lateral e transições em câmera lenta de 120fps. Foque em texturas macro da pele e resultados de antes/depois com fade de 0.5s.',
  },
  {
    keywords: ['dropshipping', 'produto físico', 'produto fisico', 'aliexpress', 'shopee'],
    niche: 'Dropshipping',
    insight: 'Criativos de dropshipping performam 62% melhor com unboxing em primeira pessoa e som ASMR do produto. Mostre as mãos abrindo a caixa nos primeiros 1.5s para máxima retenção.',
  },
  {
    keywords: ['fitness', 'treino', 'academia', 'suplemento', 'dieta'],
    niche: 'Fitness',
    insight: 'Conteúdo fitness viraliza com transições de match-cut entre o esforço e o resultado. Use ângulos baixos e luz dura para destacar definição muscular. Trilha: Phonk minimalista com BPM 140+.',
  },
  {
    keywords: ['finanças', 'investimento', 'renda extra', 'dinheiro', 'trading'],
    niche: 'Finanças',
    insight: 'Nicho financeiro exige autoridade visual: fundos escuros, gráficos animados em neon azul/dourado, e tipografia bold com números grandes. Voz grave corporativa aumenta percepção de credibilidade em 38%.',
  },
  {
    keywords: ['culinária', 'culinaria', 'receita', 'comida', 'gastronomia'],
    niche: 'Culinária',
    insight: 'Receitas virais usam overhead shots fixos com cortes rápidos a cada 1.2s. Iluminação quente 3200K e close-ups no momento da finalização. Trilha: Lo-Fi sutil sem vocais para não competir com o som da cozinha.',
  },
];

export function detectNiche(text: string): BlackBoxInsight | null {
  const lower = text.toLowerCase();
  for (const insight of BLACK_BOX_INSIGHTS) {
    if (insight.keywords.some((kw) => lower.includes(kw))) return insight;
  }
  return null;
}
