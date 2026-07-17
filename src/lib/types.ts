// ===== Core Types =====

export type ScriptStyle = 'persuasive' | 'storytelling' | 'humorous' | 'objection';
export type ProductStatus = 'active' | 'pending' | 'draft';
export type TxStatus = 'success' | 'pending' | 'failed';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  style: ScriptStyle;
  audience: string;
  status: ProductStatus;
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
}

export interface Transaction {
  id: string;
  client: string;
  type: string;
  channel: string;
  amount: number;
  date: string;
  status: TxStatus;
}

export interface Prompt {
  id: string;
  title: string;
  platform: 'Midjourney' | 'Leonardo AI' | 'ChatGPT';
  category: string;
  text: string;
}

export interface VideoAsset {
  id: string;
  title: string;
  type: 'soundtrack' | 'subtitle' | 'visual';
  description: string;
  meta: string;
}

export interface Channel {
  id: string;
  name: string;
  handle: string;
  connected: boolean;
  followers: number;
  trendScore: number;
  bestTimes: string[];
  topNiches: { name: string; score: number; views: string; likes: string }[];
  engagement: number;
}

export interface AutomationLog {
  id: string;
  time: string;
  product: string;
  channel: string;
  status: 'scheduled' | 'posted' | 'failed' | 'processing';
  detail?: string;
}

export interface EbookChapter {
  id: string;
  number: number;
  title: string;
  summary: string;
  sections: string[];
}

export interface LandingBlock {
  id: string;
  type: 'headline' | 'pain' | 'benefits' | 'testimonials' | 'faq' | 'cta';
  title: string;
  content: string;
}

// ===== Style Options =====

export const STYLE_OPTIONS: { value: ScriptStyle; label: string; hint: string }[] = [
  { value: 'persuasive', label: 'Persuasivo (Foco em Vendas e Conversão)', hint: 'Gatilhos mentais e CTA forte' },
  { value: 'storytelling', label: 'Storytelling (Conexão Emocional e Narrativa)', hint: 'Narrativa envolvente' },
  { value: 'humorous', label: 'Humorístico/Viral (Redes Sociais)', hint: 'Ritmo rápido e viral' },
  { value: 'objection', label: 'Quebra de Objeções (Curar Dúvidas do Cliente)', hint: 'Antecipa e responde dúvidas' },
];

export const STYLE_LABEL: Record<ScriptStyle, string> = {
  persuasive: 'Persuasivo',
  storytelling: 'Storytelling',
  humorous: 'Humorístico',
  objection: 'Quebra de Objeções',
};

export const STATUS_LABEL: Record<ProductStatus, string> = {
  active: 'Ativo',
  pending: 'Pendente',
  draft: 'Rascunho',
};

export const TONE_OPTIONS = [
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Descontraído' },
  { value: 'aggressive', label: 'Agressivo' },
];

// ===== Script Generator =====

export function generateScript(name: string, description: string, price: string, style: ScriptStyle, audience?: string): string {
  const n = name || 'seu produto';
  const p = price ? `R$ ${price}` : 'preço imbatível';
  const d = description || 'uma solução completa que transforma a sua rotina';
  const a = audience || 'empreendedores que querem escalar';

  const scripts: Record<ScriptStyle, string> = {
    persuasive: `🎬 ROTEIRO PERSUASIVO — ALTA CONVERSÃO
═══════════════════════════════════════

[CENA 1 — GANCHO 3 SEGUNDOS]
🚨 Para tudo! Se você ainda não conhece ${n}, você está perdendo dinheiro.

[CENA 2 — PROBLEMA]
😅 Você, ${a}, já sentiu que tenta de tudo e nada funciona? Perde tempo, perde energia e no fim fica frustrado(a)?

[CENA 3 — SOLUÇÃO]
💡 Apresento ${n}: ${d}

[CENA 4 — BENEFÍCIOS]
✅ Resultado visível nos primeiros 7 dias
✅ Mais tempo livre pra você
✅ Suporte completo e garantido

[CENA 5 — PROVA / AUTORIDADE]
👥 Mais de 12.000 clientes satisfeitos não mentem.

[CENA 6 — OFERTA]
🔥 Por apenas ${p} você garante acesso completo + bônus exclusivos.

[CENA 7 — GATILHO DE ESCASSEZ]
⏳ Apenas 50 vagas com esse valor. O timer já está rodando.

[CENA 8 — CTA FINAL]
👉 CLIQUE NO BOTÃO ABAIXO e garanta o seu agora!
Não deixe pra depois — depois custa mais caro.`,

    storytelling: `🎬 ROTEIRO STORYTELLING — CONEXÃO EMOCIONAL
═══════════════════════════════════════

[CENA 1 — O ANTES]
🌧️ Há 6 meses, a Marina acordou exausta. De novo. Aquele sentimento de "isso não pode ser tudo que a vida tem"...

[CENA 2 — A VIRADA]
✨ Até que uma amiga mencionou ${n}. Ela hesitou. Achou que era "mais um do mesmo".

[CENA 3 — A TRANSFORMAÇÃO]
🌟 Mas decidiu tentar. ${d}
Em 3 semanas, a Marina dormia tranquila. Sorria de novo.

[CENA 4 — A UNIVERSALIZAÇÃO]
💜 Se a Marina conseguiu, você também consegue, ${a}. Não é sobre sorte — é sobre escolha.

[CENA 5 — OFERTA SUAVE]
🎁 ${n} está disponível por ${p}.
Um pequeno passo pra uma grande mudança.

[CENA 6 — CTA EMOCIONAL]
👉 Sua história pode ser a próxima. Comece agora.`,

    humorous: `🎬 ROTEIRO HUMORÍSTICO — VIRAL / REDES SOCIAIS
═══════════════════════════════════════

[CENA 1 — GANCHO FRENÉTICO]
🤯 NÃO TÁ ACREDITANDO NO QUE EU VOU TE MOSTRAR! Para tudo e olha isso 👇

[CENA 2 — RITMO RÁPIDO]
😅 Você: surtando, sem dormir, tentando resolver tudo sozinho(a)...
Eu: descobri ${n} e minha vida virou um meme de "tudo certo".

[CENA 3 — APRESENTAÇÃO TURBINADA]
🚀 ${n} é tipo aquele plot twist que ninguém esperava!
${d}

[CENA 4 — DEMONSTRAÇÃO RÁPIDA]
⚡ Antes: 😩  |  Depois: 😎✨
Bora, bora, bora!

[CENA 5 — OFERTA DESCONTRAÍDA]
💸 Custa só ${p}. Tipo, menos que um ifood pra família inteira.

[CENA 6 — GATILHO VIRAL]
🔥 Manda esse vídeo pra aquele amigo que SEMPRE adia as coisas.

[CENA 7 — CTA]
👉 Comenta "EU QUERO" e clica no botão. Bora viralizar junto!`,

    objection: `🎬 ROTEIRO QUEBRA DE OBJEÇÕES — DÚVIDAS CURADAS
═══════════════════════════════════════

[CENA 1 — ABERTURA]
🤔 "Será que isso funciona mesmo?" — Eu também pensava assim.

[CENA 2 — OBJEÇÃO: PREÇO]
💬 "Tá caro demais!"
✅ Pense no custo de continuar sem resolver: ${n} custa ${p}, mas o tempo que você economiza vale muito mais.

[CENA 3 — OBJEÇÃO: TEMPO]
💬 "Não tenho tempo!"
✅ São só 15 minutos por dia. Menos do que você gasta rolando o feed.

[CENA 4 — OBJEÇÃO: FUNCIONA PRA MIM?]
💬 "Isso é pra gente com mais experiência..."
✅ ${d} — foi feito justamente pra ${a}.

[CENA 5 — OBJEÇÃO: SEGURANÇA]
💬 "E se eu não gostar?"
✅ Garantia incondicional de 7 dias. Risco zero pra você.

[CENA 6 — REFORÇO DE AUTORIDADE]
🏆 Mais de 12.000 pessoas já superaram essas mesmas dúvidas.

[CENA 7 — CTA FINAL]
👉 Todas as suas objeções têm resposta. A única pergunta que resta é: quando você vai começar?
Clique agora e garanta o seu.`,
  };

  return scripts[style];
}

// ===== Mock Data: Dashboard =====

export const monthlyRevenue: { month: string; value: number }[] = [
  { month: 'Jan', value: 28400 },
  { month: 'Fev', value: 31200 },
  { month: 'Mar', value: 35800 },
  { month: 'Abr', value: 33100 },
  { month: 'Mai', value: 40200 },
  { month: 'Jun', value: 44600 },
  { month: 'Jul', value: 48290 },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', client: 'João Mendes', type: 'Curso Completo', channel: 'Hotmart', amount: 297, date: '17/07/2026', status: 'success' },
  { id: 't2', client: 'Ana Paula', type: 'Mentoria', channel: 'Eduzz', amount: 1497, date: '17/07/2026', status: 'success' },
  { id: 't3', client: 'Carlos Silva', type: 'E-book', channel: 'Direto', amount: 47, date: '16/07/2026', status: 'success' },
  { id: 't4', client: 'Mariana Lima', type: 'Assinatura', channel: 'Stripe', amount: 49, date: '16/07/2026', status: 'pending' },
  { id: 't5', client: 'Pedro Costa', type: 'Curso Completo', channel: 'Hotmart', amount: 297, date: '15/07/2026', status: 'success' },
  { id: 't6', client: 'Fernanda Rocha', type: 'Mentoria', channel: 'Eduzz', amount: 1497, date: '15/07/2026', status: 'success' },
  { id: 't7', client: 'Rafael Dias', type: 'E-book', channel: 'Direto', amount: 47, date: '14/07/2026', status: 'failed' },
  { id: 't8', client: 'Juliana Souza', type: 'Assinatura', channel: 'Stripe', amount: 49, date: '14/07/2026', status: 'success' },
  { id: 't9', client: 'Bruno Alves', type: 'Curso Completo', channel: 'Hotmart', amount: 297, date: '13/07/2026', status: 'success' },
  { id: 't10', client: 'Camila Reis', type: 'Mentoria', channel: 'Eduzz', amount: 1497, date: '13/07/2026', status: 'success' },
];

// ===== Mock Data: Products =====

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Curso de Tráfego Pago Master', description: 'Curso completo de tráfego pago do zero ao avançado.', price: 297, style: 'persuasive', audience: 'afiliados e infoprodutores', status: 'active', createdAt: '2026-07-10', clicks: 4820, sales: 184, commission: 5460 },
  { id: 'p2', name: 'E-book Receitas Fit Express', description: '120 receitas fit prontas em 15 minutos.', price: 47, style: 'humorous', audience: 'mulheres fitness', status: 'active', createdAt: '2026-07-08', clicks: 3210, sales: 312, commission: 1464 },
  { id: 'p3', name: 'Mentoria Branding Pessoal', description: 'Mentoria de branding pessoal para criadores.', price: 1497, style: 'storytelling', audience: 'criadores de conteúdo', status: 'pending', createdAt: '2026-07-12', clicks: 1290, sales: 22, commission: 1094 },
  { id: 'p4', name: 'App Produtividade Ninja', description: 'App de gestão de tarefas com IA.', price: 19.9, style: 'objection', audience: 'empreendedores', status: 'draft', createdAt: '2026-07-14', clicks: 890, sales: 8, commission: 16 },
];

export const mockAffiliateLinks: AffiliateLink[] = [
  { id: 'a1', productId: 'p1', productName: 'Curso de Tráfego Pago Master', code: 'AFIL-7X2K', url: 'https://scriptminer.com/af/7x2k', clicks: 4820, conversions: 184, commissionRate: 50, role: 'Afiliado' },
  { id: 'a2', productId: 'p2', productName: 'E-book Receitas Fit Express', code: 'AFIL-9P3M', url: 'https://scriptminer.com/af/9p3m', clicks: 3210, conversions: 312, commissionRate: 30, role: 'Afiliado' },
  { id: 'a3', productId: 'p3', productName: 'Mentoria Branding Pessoal', code: 'AFIL-2K8R', url: 'https://scriptminer.com/af/2k8r', clicks: 1290, conversions: 22, commissionRate: 70, role: 'Coprodutor' },
];

// ===== Mock Data: Prompts & Video Assets =====

export const mockPrompts: Prompt[] = [
  { id: 'pr1', title: 'Gancho Visual de Choque', platform: 'Midjourney', category: 'Thumbnail', text: 'A person looking shocked at their phone, dramatic neon blue lighting, dark background, cinematic, hyperrealistic, 8k --ar 9:16 --v 6' },
  { id: 'pr2', title: 'Cena de Transformação', platform: 'Leonardo AI', category: 'B-roll', text: 'Before and after split screen, tired person to energetic person, warm golden light on right side, dark moody left side, vertical format' },
  { id: 'pr3', title: 'Roteiro Gancho 3s', platform: 'ChatGPT', category: 'Hook', text: 'Escreva um gancho de 3 segundos, em português, que faça o espectador parar de rolar o feed. Tema: [SEU PRODUTO]. Use curiosidade + urgência.' },
  { id: 'pr4', title: 'Thumbnail Premium', platform: 'Midjourney', category: 'Thumbnail', text: 'Product on a pedestal with blue neon glow, dark studio background, professional product photography, high contrast, 8k --ar 9:16' },
  { id: 'pr5', title: 'Legendas em Massa', platform: 'ChatGPT', category: 'Copy', text: 'Gere 10 variações de legendas para Instagram Reels sobre [SEU PRODUTO], com CTA, emojis e hashtags de tendência.' },
  { id: 'pr6', title: 'Referência Visual Viral', platform: 'Leonardo AI', category: 'B-roll', text: 'Fast-paced montage style frames, dynamic camera angles, street aesthetic, neon accents, vertical 9:16, cinematic color grade' },
];

export const mockVideoAssets: VideoAsset[] = [
  { id: 'v1', title: 'Trilha Sonora — "Neon Pulse"', type: 'soundtrack', description: 'Beat eletrônico envolvente, 120 BPM, ideal para ganchos de 15s.', meta: '120 BPM · 0:15 · Royalty-free' },
  { id: 'v2', title: 'Trilha Sonora — "Emotional Rise"', type: 'soundtrack', description: 'Crescendo emocional para roteiros storytelling.', meta: '90 BPM · 0:30 · Royalty-free' },
  { id: 'v3', title: 'Legenda Estilo "Bold Pop"', type: 'subtitle', description: 'Fonte bold amarela com outline preto, animação pop-in por palavra.', meta: 'Montserrat Bold · 48px · Pop-in' },
  { id: 'v4', title: 'Legenda Estilo "Minimal Glow"', type: 'subtitle', description: 'Fonte fina branca com glow azul sutil, fade suave.', meta: 'Inter Light · 40px · Fade' },
  { id: 'v5', title: 'Referência Visual — "Dark Studio"', type: 'visual', description: 'Setup de estúdio escuro com neon azul, perfeito para produtos premium.', meta: '9:16 · 4K · PNG + MP4' },
  { id: 'v6', title: 'Referência Visual — "Lifestyle Urban"', type: 'visual', description: 'Cenas urbanas dinâmicas para produtos de lifestyle.', meta: '9:16 · 4K · PNG + MP4' },
];

// ===== Mock Data: Channels =====

export const mockChannels: Channel[] = [
  {
    id: 'c1', name: 'TikTok', handle: '@scriptminer', connected: true, followers: 124000, trendScore: 92, engagement: 8.4,
    bestTimes: ['12h', '19h', '21h'],
    topNiches: [
      { name: 'Marketing Digital', score: 94, views: '2.4M', likes: '180K' },
      { name: 'Fitness', score: 81, views: '1.8M', likes: '142K' },
      { name: 'Finanças', score: 68, views: '1.2M', likes: '98K' },
    ],
  },
  {
    id: 'c2', name: 'Instagram Reels', handle: '@scriptminer.app', connected: true, followers: 89000, trendScore: 85, engagement: 6.2,
    bestTimes: ['11h', '18h', '22h'],
    topNiches: [
      { name: 'Lifestyle', score: 88, views: '1.9M', likes: '156K' },
      { name: 'Beleza', score: 79, views: '1.4M', likes: '110K' },
      { name: 'Gastronomia', score: 65, views: '980K', likes: '76K' },
    ],
  },
  {
    id: 'c3', name: 'YouTube Shorts', handle: '@ScriptMiner', connected: false, followers: 42000, trendScore: 78, engagement: 5.1,
    bestTimes: ['14h', '17h', '20h'],
    topNiches: [
      { name: 'Tech', score: 85, views: '1.6M', likes: '124K' },
      { name: 'Educação', score: 72, views: '1.1M', likes: '88K' },
      { name: 'Gaming', score: 61, views: '840K', likes: '62K' },
    ],
  },
];

// ===== Mock Data: Automation Logs =====

export const mockAutomationLogs: AutomationLog[] = [
  { id: 'l1', time: '12:00', product: 'Curso de Tráfego Pago Master', channel: 'TikTok', status: 'posted' },
  { id: 'l2', time: '18:00', product: 'E-book Receitas Fit Express', channel: 'Instagram Reels', status: 'scheduled' },
  { id: 'l3', time: '21:00', product: 'Mentoria Branding Pessoal', channel: 'YouTube Shorts', status: 'processing' },
  { id: 'l4', time: '09:00', product: 'App Produtividade Ninja', channel: 'TikTok', status: 'failed', detail: 'Limite de API' },
  { id: 'l5', time: '15:00', product: 'E-book Receitas Fit Express', channel: 'YouTube Shorts', status: 'scheduled' },
];

// ===== Mock Data: Ebook =====

export function generateEbookChapters(theme: string, _tone: string): EbookChapter[] {
  const t = theme || 'seu tema';
  return [
    { id: 'ch1', number: 1, title: `Introdução ao Universo de ${t}`, summary: `Uma visão geral do que você vai aprender e por que ${t} é essencial hoje.`, sections: ['O que é e por que importa', 'Oportunidades do mercado', 'Como este e-book vai te ajudar'] },
    { id: 'ch2', number: 2, title: `Fundamentos Práticos de ${t}`, summary: 'Os conceitos centrais que você precisa dominar antes de avançar.', sections: ['Conceitos-chave', 'Erros comuns', 'Ferramentas recomendadas'] },
    { id: 'ch3', number: 3, title: `Estratégias Avançadas em ${t}`, summary: 'Táticas usadas por profissionais para escalar resultados.', sections: ['Framework de execução', 'Otimização e métricas', 'Automação do processo'] },
    { id: 'ch4', number: 4, title: `Estudos de Caso Reais`, summary: 'Exemplos práticos de quem aplicou e obteve sucesso.', sections: ['Caso 1: do zero ao lucro', 'Caso 2: escala com automação', 'Lições aprendidas'] },
    { id: 'ch5', number: 5, title: `Próximos Passos e Plano de Ação`, summary: 'Um roteiro claro para você colocar tudo em prática agora.', sections: ['Checklist final', 'Recursos extras', 'Plano de 30 dias'] },
  ];
}

export function generateLandingBlocks(offer: string): LandingBlock[] {
  const o = offer || 'sua oferta';
  return [
    { id: 'lb1', type: 'headline', title: 'Headline', content: `Descubra como ${o} pode transformar seus resultados em 7 dias — mesmo começando do zero.` },
    { id: 'lb2', type: 'pain', title: 'Dor', content: `Cansado de tentar de tudo e não ver resultado? Você não está sozinho — 90% das pessoas desistem antes de encontrar o caminho certo.` },
    { id: 'lb3', type: 'benefits', title: 'Benefícios', content: `✅ Resultado em 7 dias\n✅ Método validado por 12.000+ alunos\n✅ Suporte completo\n✅ Garantia incondicional de 7 dias` },
    { id: 'lb4', type: 'testimonials', title: 'Depoimentos', content: `"Mudei minha vida em 3 semanas." — Marina\n"Finalmente entendi como funciona." — Carlos\n"Melhor investimento que fiz." — Juliana` },
    { id: 'lb5', type: 'faq', title: 'FAQ', content: `Funciona pra iniciantes? Sim, do zero ao avançado.\nE se eu não gostar? Garantia de 7 dias.\nQuanto tempo por dia? 15 minutos bastam.` },
    { id: 'lb6', type: 'cta', title: 'CTA Final', content: `👉 Garanta seu acesso agora por apenas R$ 297 (50% OFF). Vagas limitadas!` },
  ];
}

// ===== Mock Data: Dropshipping =====

export interface MinedProduct {
  name: string;
  price: string;
  rating: number;
  sales: number;
  supplier: string;
}

export function generateMinedData(_url: string): {
  analysis: MinedProduct;
  hooks: string[];
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
} {
  return {
    analysis: {
      name: 'Mini Projetor Portátil 4K',
      price: 'R$ 189,90',
      rating: 4.8,
      sales: 12400,
      supplier: 'Shenzhen Tech Co.',
    },
    hooks: [
      '🤯 "Você vai parar de pagar cinema depois de ver isso..." (Gancho de curiosidade + economia)',
      '🎬 "Testei o projetor mais barato da internet e OLHA O QUE ACONTECEU" (Formato review/honestidade)',
      '🔥 "3 motivos pra NÃO comprar um projetor (e 1 que muda tudo)" (Gatilho de curiosidade reversa)',
    ],
    swot: {
      strengths: ['Produto com alta margem (4x)', 'Fornecedor com boa avaliação', 'Produto leve (frete barato)'],
      weaknesses: ['Concorrência alta no nicho', 'Público cético com produtos chineses'],
      opportunities: ['Nicho de home office em alta', 'Poucos criativos nativos no TikTok', 'Possibilidade de bundle com suporte'],
      threats: ['Vendedores com preço mais baixo', 'Mudanças na política do AliExpress'],
    },
  };
}

// ===== Helpers =====

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR');
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function estimateSpeechTime(text: string): number {
  // ~150 palavras por minuto = 2.5 palavras/segundo
  return Math.ceil(countWords(text) / 2.5);
}
