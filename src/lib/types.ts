export type ScriptStyle = 'persuasive' | 'storytelling' | 'humorous' | 'objection';

export type ProductStatus = 'active' | 'pending' | 'draft';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  style: ScriptStyle;
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
  topNiches: string[];
  engagement: number;
}

export interface AutomationLog {
  id: string;
  time: string;
  product: string;
  channel: string;
  status: 'scheduled' | 'posted' | 'failed' | 'processing';
}

export const STYLE_OPTIONS: { value: ScriptStyle; label: string; hint: string }[] = [
  { value: 'persuasive', label: 'Persuasivo (Foco em Vendas e Conversão)', hint: 'Gatilhos mentais e CTA forte' },
  { value: 'storytelling', label: 'Storytelling (Conexão Emocional e Narrativa)', hint: 'Narrativa envolvente' },
  { value: 'humorous', label: 'Humorístico (Frenético/Viral para Redes Sociais)', hint: 'Ritmo rápido e viral' },
  { value: 'objection', label: 'Quebra de Objeções (Focado em Curar Dúvidas do Cliente)', hint: 'Antecipa e responde dúvidas' },
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

export function generateScript(name: string, description: string, price: string, style: ScriptStyle): string {
  const n = name || 'seu produto';
  const p = price ? `R$ ${price}` : 'preço imbatível';
  const d = description || 'uma solução completa que transforma a sua rotina';

  const scripts: Record<ScriptStyle, string> = {
    persuasive: `🎬 ROTEIRO PERSUASIVO — ALTA CONVERSÃO
═══════════════════════════════════════

[ABERTURA — GANCHO 3 SEGUNDOS]
🚨 Para tudo! Se você ainda não conhece ${n}, você está perdendo dinheiro.

[PROBLEMA]
😅 Você já sentiu que tenta de tudo e nada funciona? Perde tempo, perde energia e no fim fica frustrado(a)?

[SOLUÇÃO]
💡 Apresento ${n}: ${d}

[BENEFÍCIOS]
✅ Resultado visível nos primeiros 7 dias
✅ Mais tempo livre pra você
✅ Suporte completo e garantido

[PROVA / AUTORIDADE]
👥 Mais de 12.000 clientes satisfeitos não mentem.

[OFERTA]
🔥 Por apenas ${p} você garante acesso completo + bônus exclusivos.

[GATILHO DE ESCASSEZ]
⏳ Apenas 50 vagas com esse valor. O timer já está rodando.

[CTA FINAL]
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
💜 Se a Marina conseguiu, você também consegue. Não é sobre sorte — é sobre escolha.

[OFERTA SUAVE]
🎁 ${n} está disponível por ${p}.
Um pequeno passo pra uma grande mudança.

[CTA EMOCIONAL]
👉 Sua história pode ser a próxima. Comece agora.`,

    humorous: `🎬 ROTEIRO HUMORÍSTICO — VIRAL / REDES SOCIAIS
═══════════════════════════════════════

[GANCHO FRENÉTICO]
🤯 NÃO TÁ ACREDITANDO NO QUE EU VOU TE MOSTRAR! Para tudo e olha isso 👇

[RITMO RÁPIDO]
😅 Você: tentando resolver tudo sozinho(a), surtando, sem dormir...
Eu: descobri ${n} e minha vida virou um meme de "tudo certo".

[APRESENTAÇÃO TURBINADA]
🚀 ${n} é tipo aquele plot twist que ninguém esperava!
${d}

[DEMONSTRAÇÃO RÁPIDA]
⚡ Antes: 😩  |  Depois: 😎✨
Bora, bora, bora!

[OFERTA DESCONTRAÍDA]
💸 Custa só ${p}. Tipo, menos que um ifood pra família inteira.

[GATILHO VIRAL]
🔥 Manda esse vídeo pra aquele amigo que SEMPRE adia as coisas.

[CTA]
👉 Comenta "EU QUERO" e clica no botão. Bora viralizar junto!`,

    objection: `🎬 ROTEIRO QUEBRA DE OBJEÇÕES — DÚVIDAS CURADAS
═══════════════════════════════════════

[ABERTURA]
🤔 "Será que isso funciona mesmo?" — Eu também pensava assim.

[OBJEÇÃO 1: PREÇO]
💬 "Tá caro demais!"
✅ Pense no custo de continuar sem resolver: ${n} custa ${p}, mas o tempo que você economiza vale muito mais.

[OBJEÇÃO 2: TEMPO]
💬 "Não tenho tempo!"
✅ São só 15 minutos por dia. Menos do que você gasta rolando o feed.

[OBJEÇÃO 3: FUNCIONA PRA MIM?]
💬 "Isso é pra gente com mais experiência..."
✅ ${d} — foi feito justamente pra quem tá começando do zero.

[OBJEÇÃO 4: SEGURANÇA]
💬 "E se eu não gostar?"
✅ Garantia incondicional de 7 dias. Risco zero pra você.

[REFORÇO DE AUTORIDADE]
🏆 Mais de 12.000 pessoas já superaram essas mesmas dúvidas.

[CTA FINAL]
👉 Todas as suas objeções têm resposta. A única pergunta que resta é: quando você vai começar?
Clique agora e garanta o seu.`,
  };

  return scripts[style];
}

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Curso de Tráfego Pago Master', description: 'Curso completo de tráfego pago do zero ao avançado.', price: 297, style: 'persuasive', status: 'active', createdAt: '2026-07-10', clicks: 4820, sales: 184, commission: 5460 },
  { id: 'p2', name: 'E-book Receitas Fit Express', description: '120 receitas fit prontas em 15 minutos.', price: 47, style: 'humorous', status: 'active', createdAt: '2026-07-08', clicks: 3210, sales: 312, commission: 1464 },
  { id: 'p3', name: 'Mentoria Branding Pessoal', description: 'Mentoria de branding pessoal para criadores.', price: 1497, style: 'storytelling', status: 'pending', createdAt: '2026-07-12', clicks: 1290, sales: 22, commission: 1094 },
  { id: 'p4', name: 'App Produtividade Ninja', description: 'App de gestão de tarefas com IA.', price: 19.9, style: 'objection', status: 'draft', createdAt: '2026-07-14', clicks: 890, sales: 8, commission: 16 },
];

export const mockAffiliateLinks: AffiliateLink[] = [
  { id: 'a1', productId: 'p1', productName: 'Curso de Tráfego Pago Master', code: 'AFIL-7X2K', url: 'https://scriptminer.app/r/AFIL-7X2K', clicks: 4820, conversions: 184 },
  { id: 'a2', productId: 'p2', productName: 'E-book Receitas Fit Express', code: 'AFIL-9P3M', url: 'https://scriptminer.app/r/AFIL-9P3M', clicks: 3210, conversions: 312 },
  { id: 'a3', productId: 'p3', productName: 'Mentoria Branding Pessoal', code: 'AFIL-2K8R', url: 'https://scriptminer.app/r/AFIL-2K8R', clicks: 1290, conversions: 22 },
];

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

export const mockChannels: Channel[] = [
  { id: 'c1', name: 'TikTok', handle: '@scriptminer', connected: true, followers: 124000, trendScore: 92, bestTimes: ['12h', '19h', '21h'], topNiches: ['Marketing Digital', 'Fitness', 'Finanças'], engagement: 8.4 },
  { id: 'c2', name: 'Instagram Reels', handle: '@scriptminer.app', connected: true, followers: 89000, trendScore: 85, bestTimes: ['11h', '18h', '22h'], topNiches: ['Lifestyle', 'Beleza', 'Gastronomia'], engagement: 6.2 },
  { id: 'c3', name: 'YouTube Shorts', handle: '@ScriptMiner', connected: false, followers: 42000, trendScore: 78, bestTimes: ['14h', '17h', '20h'], topNiches: ['Tech', 'Educação', 'Gaming'], engagement: 5.1 },
];

export const mockAutomationLogs: AutomationLog[] = [
  { id: 'l1', time: '12:00', product: 'Curso de Tráfego Pago Master', channel: 'TikTok', status: 'posted' },
  { id: 'l2', time: '18:00', product: 'E-book Receitas Fit Express', channel: 'Instagram Reels', status: 'scheduled' },
  { id: 'l3', time: '21:00', product: 'Mentoria Branding Pessoal', channel: 'YouTube Shorts', status: 'processing' },
  { id: 'l4', time: '09:00', product: 'App Produtividade Ninja', channel: 'TikTok', status: 'failed' },
  { id: 'l5', time: '15:00', product: 'E-book Receitas Fit Express', channel: 'YouTube Shorts', status: 'scheduled' },
];

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR');
}
