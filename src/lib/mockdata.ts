// ===== Script Style =====

export type ScriptStyle = 'persuasive' | 'storytelling' | 'humorous' | 'objection';
export type Presenter = 'male' | 'female' | 'other';
export type VoiceTone = 'deep' | 'corporate' | 'natural' | 'viral';
export type SubtitleStyle = 'hormozi' | 'clean' | 'custom';
export type Archetype = 'viral' | 'corporate' | 'sexy';

export interface MediaConfig {
  presenter: Presenter;
  presenterCustom: string;
  voiceTone: VoiceTone;
  subtitleStyle: SubtitleStyle;
  subtitleCustom: string;
  archetype: Archetype;
}

// ===== Script Generator =====

export function generateScript(
  name: string, description: string, price: string, style: ScriptStyle,
  audience: string, media: MediaConfig,
): string {
  const n = name || 'seu produto';
  const p = price ? `R$ ${price}` : 'preço imbatível';
  const d = description || 'uma solução completa que transforma a sua rotina';
  const a = audience || 'empreendedores que querem escalar';

  // Build media metadata header
  const presenterLabel = media.presenter === 'male' ? 'Masculino' : media.presenter === 'female' ? 'Feminino' : (media.presenterCustom || 'Customizado');
  const voiceLabels: Record<VoiceTone, string> = {
    deep: 'Voz Ultra-Grave de Impacto',
    corporate: 'Voz Corporativa e Didática',
    natural: 'Voz Natural com Pausas e Respiração Real',
    viral: 'Voz Rápida Estilo TikTok Viral',
  };
  const subtitleLabels: Record<SubtitleStyle, string> = {
    hormozi: 'Estilo Hormozi (Neon Pesado, cores piscando)',
    clean: 'Clean Executive (Montserrat Minimalista)',
    custom: media.subtitleCustom || 'Customizado',
  };
  const archLabels: Record<Archetype, string> = {
    viral: 'ENGAJADO/VIRAL - Quebra rápida de padrão e retenção agressiva',
    corporate: 'CORDIAL/CORPORATIVO - Tom polido para High-Ticket e autoridade',
    sexy: 'SEXY/PROVOCATIVO - Copywriting magnético, desejo e status',
  };

  const header = `═══════════════════════════════════════════
🎬 VRTX CREATIVE MATRIX - METADADOS TÉCNICOS
═══════════════════════════════════════════
[APRESENTADOR: ${presenterLabel}]
[DIRETRIZ DE VOZ: ${voiceLabels[media.voiceTone]}]
[DESIGN DE LEGENDA: ${subtitleLabels[media.subtitleStyle]}]
[ARQUÉTIPO: ${archLabels[media.archetype]}]
═══════════════════════════════════════════

`;

  const scripts: Record<ScriptStyle, string> = {
    persuasive: `🎬 ROTEIRO PERSUASIVO - ALTA CONVERSÃO

[CENA 1 - GANCHO 3 SEGUNDOS]
🚨 Para tudo! Se você ainda não conhece ${n}, você está perdendo dinheiro.

[CENA 2 - PROBLEMA]
😅 Você, ${a}, já sentiu que tenta de tudo e nada funciona? Perde tempo, perde energia e no fim fica frustrado(a)?

[CENA 3 - SOLUÇÃO]
💡 Apresento ${n}: ${d}

[CENA 4 - BENEFÍCIOS]
✅ Resultado visível nos primeiros 7 dias
✅ Mais tempo livre pra você
✅ Suporte completo e garantido

[CENA 5 - PROVA / AUTORIDADE]
👥 Mais de 12.000 clientes satisfeitos não mentem.

[CENA 6 - OFERTA]
🔥 Por apenas ${p} você garante acesso completo + bônus exclusivos.

[CENA 7 - GATILHO DE ESCASSEZ]
⏳ Apenas 50 vagas com esse valor. O timer já está rodando.

[CENA 8 - CTA FINAL]
👉 CLIQUE NO BOTÃO ABAIXO e garanta o seu agora!
Não deixe pra depois, depois custa mais caro.`,

    storytelling: `🎬 ROTEIRO STORYTELLING - CONEXÃO EMOCIONAL

[CENA 1 - O ANTES]
🌧️ Há 6 meses, a Marina acordou exausta. De novo. Aquele sentimento de que faltava algo...

[CENA 2 - A VIRADA]
✨ Até que uma amiga mencionou ${n}. Ela hesitou. Achou que era mais um do mesmo.

[CENA 3 - A TRANSFORMAÇÃO]
🌟 Mas decidiu tentar. ${d}
Em 3 semanas, a Marina dormia tranquila. Sorria de novo.

[CENA 4 - A UNIVERSALIZAÇÃO]
💜 Se a Marina conseguiu, você também consegue, ${a}. Não é sobre sorte, é sobre escolha.

[CENA 5 - OFERTA SUAVE]
🎁 ${n} está disponível por ${p}.
Um pequeno passo pra uma grande mudança.

[CENA 6 - CTA EMOCIONAL]
👉 Sua história pode ser a próxima. Comece agora.`,

    humorous: `🎬 ROTEIRO HUMORÍSTICO - VIRAL / REDES SOCIAIS

[CENA 1 - GANCHO FRENÉTICO]
🤯 NÃO TÁ ACREDITANDO NO QUE EU VOU TE MOSTRAR! Para tudo e olha isso 👇

[CENA 2 - RITMO RÁPIDO]
😅 Você: surtando, sem dormir, tentando resolver tudo sozinho(a)...
Eu: descobri ${n} e minha vida virou um meme de tudo certo.

[CENA 3 - APRESENTAÇÃO TURBINADA]
🚀 ${n} é tipo aquele plot twist que ninguém esperava!
${d}

[CENA 4 - DEMONSTRAÇÃO RÁPIDA]
⚡ Antes: 😩  |  Depois: 😎✨
Bora, bora, bora!

[CENA 5 - OFERTA DESCONTRAÍDA]
💸 Custa só ${p}. Tipo, menos que um ifood pra família inteira.

[CENA 6 - GATILHO VIRAL]
🔥 Manda esse vídeo pra aquele amigo que SEMPRE adia as coisas.

[CENA 7 - CTA]
👉 Comenta EU QUERO e clica no botão. Bora viralizar junto!`,

    objection: `🎬 ROTEIRO QUEBRA DE OBJEÇÕES - DÚVIDAS CURADAS

[CENA 1 - ABERTURA]
🤔 Será que isso funciona mesmo? Eu também pensava assim.

[CENA 2 - OBJEÇÃO: PREÇO]
💬 Tá caro demais!
✅ Pense no custo de continuar sem resolver: ${n} custa ${p}, mas o tempo que você economiza vale muito mais.

[CENA 3 - OBJEÇÃO: TEMPO]
💬 Não tenho tempo!
✅ São só 15 minutos por dia. Menos do que você gasta rolando o feed.

[CENA 4 - OBJEÇÃO: FUNCIONA PRA MIM?]
💬 Isso é pra gente com mais experiência...
✅ ${d} Foi feito justamente pra ${a}.

[CENA 5 - OBJEÇÃO: SEGURANÇA]
💬 E se eu não gostar?
✅ Garantia incondicional de 7 dias. Risco zero pra você.

[CENA 6 - REFORÇO DE AUTORIDADE]
🏆 Mais de 12.000 pessoas já superaram essas mesmas dúvidas.

[CENA 7 - CTA FINAL]
👉 Todas as suas objeções têm resposta. A única pergunta que resta é: quando você vai começar?
Clique agora e garanta o seu.`,
  };

  return header + scripts[style];
}

// ===== Spy Feed =====

export interface SpyCreative {
  id: string;
  product: string;
  niche: string;
  ctr: number;
  views: number;
  clicks: number;
  duration: string;
  hook: string;
  copyStructure: string;
}

export const spyFeed: SpyCreative[] = [
  {
    id: 'spy1', product: 'Mini Projetor Portátil 4K', niche: 'Tecnologia',
    ctr: 8.4, views: 2400000, clicks: 201600, duration: '00:18',
    hook: '🤯 Você vai parar de pagar cinema depois de ver isso...',
    copyStructure: 'Gancho de curiosidade + economia → Demonstração em 5s → Prova social → CTA com escassez',
  },
  {
    id: 'spy2', product: 'Corretor Postura Inteligente', niche: 'Saúde',
    ctr: 7.1, views: 1800000, clicks: 127800, duration: '00:22',
    hook: '😅 90% das pessoas têm má postura e não sabem. Veja a transformação em 7 dias',
    copyStructure: 'Problema silencioso → Antes/depois → Benefício rápido → Depoimento → CTA de urgência',
  },
  {
    id: 'spy3', product: 'Kit Maquiagem Profissional 24 Cores', niche: 'Beleza',
    ctr: 9.2, views: 3200000, clicks: 294400, duration: '00:15',
    hook: '💄 A maquiagem que virou febre no TikTok acabou de chegar (últimas unidades)',
    copyStructure: 'Gatilho de tendência + escassez → Unboxing ASMR → Look completo em 15s → CTA',
  },
];

// ===== Knowledge Bank (Dropshipping) =====

export interface KnowledgeItem {
  id: string;
  platform: 'AliExpress' | 'Shopee' | 'Amazon' | 'Mercado Livre';
  product: string;
  price: string;
  link: string;
  tip: string;
  category: string;
}

export const dropshippingKnowledge: KnowledgeItem[] = [
  { id: 'kb1', platform: 'AliExpress', product: 'Smartwatch T800 Ultra', price: 'R$ 89,90', link: 'https://aliexpress.com/item/t800', tip: 'Foque em tráfego direto com vídeo de unboxing ASMR. Público: homens 18 a 35 anos interessados em tecnologia acessível.', category: 'Wearables' },
  { id: 'kb2', platform: 'AliExpress', product: 'Luminária LED Galáxia 3D', price: 'R$ 49,90', link: 'https://aliexpress.com/item/galaxy3d', tip: 'Viraliza no TikTok com vídeos no escuro. Nicho de decoração e presente. Capriche na embalagem.', category: 'Decoração' },
  { id: 'kb3', platform: 'Shopee', product: 'Organizador Acrílico de Cosméticos', price: 'R$ 39,90', link: 'https://shopee.com/item/org-acrilico', tip: 'Público feminino 20 a 45 anos. Use gatilho de organização e estética. Fotos em banheiros organizados.', category: 'Organização' },
  { id: 'kb4', platform: 'Shopee', product: 'Tapete Antiderrapante Banheiro 3D', price: 'R$ 29,90', link: 'https://shopee.com/item/tapete3d', tip: 'Vídeos de teste de água convertem muito. Foque em segurança e estética. Nicho home.', category: 'Casa' },
  { id: 'kb5', platform: 'Amazon', product: 'Purificador Ar HEPA Compacto', price: 'R$ 299,00', link: 'https://amazon.com/item/hepa', tip: 'Nicho premium. Posicione como saúde respiratória. Público: famílias com crianças e alérgicos.', category: 'Saúde' },
  { id: 'kb6', platform: 'Mercado Livre', product: 'Kit Ferramenta 108 Peças', price: 'R$ 149,00', link: 'https://mercadolivre.com/item/kit108', tip: 'Público masculino DIY. Vídeos de unboxing com close nas peças. Foque na quantidade e durabilidade.', category: 'Ferramentas' },
];

// ===== Knowledge Bank (Affiliates) =====

export interface AffiliateKnowledge {
  id: string;
  platform: 'Kiwify' | 'Hotmart' | 'Cakto';
  product: string;
  price: string;
  link: string;
  tip: string;
  category: string;
}

export const affiliateKnowledge: AffiliateKnowledge[] = [
  { id: 'ak1', platform: 'Kiwify', product: 'E-book Receitas Fit Express', price: 'R$ 47,00', link: 'https://kiwify.com/receitasfit', tip: 'Kiwify com infoproduto de estética: Foque em tráfego direto para página de vendas com gatilhos de transformação imediata. Público: mulheres de 25 a 45 anos.', category: 'Saúde' },
  { id: 'ak2', platform: 'Kiwify', product: 'Mentoria Criador de Conteúdo', price: 'R$ 497,00', link: 'https://kiwify.com/mentoria-criador', tip: 'High-ticket. Use webinar gratuito como funil. Público: criadores iniciantes com menos de 10k seguidores.', category: 'Mentoria' },
  { id: 'ak3', platform: 'Hotmart', product: 'Curso Tráfego Pago Master', price: 'R$ 297,00', link: 'https://hotmart.com/trafegopago', tip: 'Produto campeão de afiliados. Comissão 50%. Foque em bônus exclusivos para diferenciar. Público: afiliados e infoprodutores iniciantes.', category: 'Marketing' },
  { id: 'ak4', platform: 'Hotmart', product: 'E-book Investimentos do Zero', price: 'R$ 27,00', link: 'https://hotmart.com/invest-zero', tip: 'Ticket baixo com alto volume. Funil de upsell. Público: jovens 18 a 30 anos buscando renda extra.', category: 'Finanças' },
  { id: 'ak5', platform: 'Cakto', product: 'Comunidade VIP Escala Digital', price: 'R$ 97/mês', link: 'https://cakto.com/escala-vip', tip: 'Receita recorrente. Posicione como acesso exclusivo a mentoria semanal. Público: empreendedores digitais em fase de validação.', category: 'Comunidade' },
  { id: 'ak6', platform: 'Cakto', product: 'Template Pack Landing Pages', price: 'R$ 67,00', link: 'https://cakto.com/template-pack', tip: 'Produto de entrega imediata. Foque na economia de tempo e design profissional. Público: freelancers e pequenas agências.', category: 'Design' },
];

// ===== Platform Palettes =====

export interface PlatformPalette {
  id: string;
  name: string;
  color: string;
  glow: string;
}

export const dropshippingPalettes: PlatformPalette[] = [
  { id: 'aliexpress', name: 'AliExpress', color: '#FF4747', glow: 'rgba(255, 71, 71, 0.25)' },
  { id: 'shopee', name: 'Shopee', color: '#EE4D2D', glow: 'rgba(238, 77, 45, 0.25)' },
  { id: 'amazon', name: 'Amazon', color: '#FF9900', glow: 'rgba(255, 153, 0, 0.25)' },
  { id: 'mercadolivre', name: 'Mercado Livre', color: '#FFF159', glow: 'rgba(255, 241, 89, 0.25)' },
];

export const affiliatePalettes: PlatformPalette[] = [
  { id: 'kiwify', name: 'Kiwify', color: '#00E676', glow: 'rgba(0, 230, 118, 0.25)' },
  { id: 'hotmart', name: 'Hotmart', color: '#F04E23', glow: 'rgba(240, 78, 35, 0.25)' },
  { id: 'cakto', name: 'Cakto', color: '#7B2CBF', glow: 'rgba(123, 44, 191, 0.25)' },
];

// ===== Mock: Dashboard =====

export const monthlyRevenue: { month: string; value: number }[] = [
  { month: 'Jan', value: 28400 },
  { month: 'Fev', value: 31200 },
  { month: 'Mar', value: 35800 },
  { month: 'Abr', value: 33100 },
  { month: 'Mai', value: 40200 },
  { month: 'Jun', value: 44600 },
  { month: 'Jul', value: 48290 },
];

export interface Transaction {
  id: string;
  client: string;
  type: string;
  channel: string;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

export const mockTransactions: Transaction[] = [
  { id: 't1', client: 'João Mendes', type: 'Curso Completo', channel: 'Hotmart', amount: 297, date: '17/07/2026', status: 'success' },
  { id: 't2', client: 'Ana Paula', type: 'Mentoria', channel: 'Eduzz', amount: 1497, date: '17/07/2026', status: 'success' },
  { id: 't3', client: 'Carlos Silva', type: 'E-book', channel: 'Kiwify', amount: 47, date: '16/07/2026', status: 'success' },
  { id: 't4', client: 'Mariana Lima', type: 'Assinatura', channel: 'Cakto', amount: 97, date: '16/07/2026', status: 'pending' },
  { id: 't5', client: 'Pedro Costa', type: 'Curso Completo', channel: 'Hotmart', amount: 297, date: '15/07/2026', status: 'success' },
  { id: 't6', client: 'Fernanda Rocha', type: 'Mentoria', channel: 'Eduzz', amount: 1497, date: '15/07/2026', status: 'success' },
  { id: 't7', client: 'Rafael Dias', type: 'E-book', channel: 'Kiwify', amount: 47, date: '14/07/2026', status: 'failed' },
  { id: 't8', client: 'Juliana Souza', type: 'Assinatura', channel: 'Cakto', amount: 97, date: '14/07/2026', status: 'success' },
  { id: 't9', client: 'Bruno Alves', type: 'Curso Completo', channel: 'Hotmart', amount: 297, date: '13/07/2026', status: 'success' },
  { id: 't10', client: 'Camila Reis', type: 'Mentoria', channel: 'Eduzz', amount: 1497, date: '13/07/2026', status: 'success' },
];

// ===== Mock: Ebook =====

export interface EbookChapter {
  id: string;
  number: number;
  title: string;
  summary: string;
  sections: string[];
}

export function generateEbookChapters(theme: string): EbookChapter[] {
  const t = theme || 'seu tema';
  return [
    { id: 'ch1', number: 1, title: `Introdução ao Universo de ${t}`, summary: `Uma visão geral do que você vai aprender e por que ${t} é essencial hoje.`, sections: ['O que é e por que importa', 'Oportunidades do mercado', 'Como este e-book vai te ajudar'] },
    { id: 'ch2', number: 2, title: `Fundamentos Práticos de ${t}`, summary: 'Os conceitos centrais que você precisa dominar antes de avançar.', sections: ['Conceitos-chave', 'Erros comuns', 'Ferramentas recomendadas'] },
    { id: 'ch3', number: 3, title: `Estratégias Avançadas em ${t}`, summary: 'Táticas usadas por profissionais para escalar resultados.', sections: ['Framework de execução', 'Otimização e métricas', 'Automação do processo'] },
    { id: 'ch4', number: 4, title: `Estudos de Caso Reais`, summary: 'Exemplos práticos de quem aplicou e obteve sucesso.', sections: ['Caso 1: do zero ao lucro', 'Caso 2: escala com automação', 'Lições aprendidas'] },
    { id: 'ch5', number: 5, title: `Próximos Passos e Plano de Ação`, summary: 'Um roteiro claro para você colocar tudo em prática agora.', sections: ['Checklist final', 'Recursos extras', 'Plano de 30 dias'] },
  ];
}

export interface LandingBlock {
  id: string;
  type: 'headline' | 'pain' | 'benefits' | 'testimonials' | 'faq' | 'cta';
  title: string;
  content: string;
}

export function generateLandingBlocks(offer: string): LandingBlock[] {
  const o = offer || 'sua oferta';
  return [
    { id: 'lb1', type: 'headline', title: 'Headline', content: `Descubra como ${o} pode transformar seus resultados em 7 dias, mesmo começando do zero.` },
    { id: 'lb2', type: 'pain', title: 'Dor', content: `Cansado de tentar de tudo e não ver resultado? Você não está sozinho. 90% das pessoas desistem antes de encontrar o caminho certo.` },
    { id: 'lb3', type: 'benefits', title: 'Benefícios', content: `✅ Resultado em 7 dias\n✅ Método validado por 12.000+ alunos\n✅ Suporte completo\n✅ Garantia incondicional de 7 dias` },
    { id: 'lb4', type: 'testimonials', title: 'Depoimentos', content: `"Mudei minha vida em 3 semanas." — Marina\n"Finalmente entendi como funciona." — Carlos\n"Melhor investimento que fiz." — Juliana` },
    { id: 'lb5', type: 'faq', title: 'FAQ', content: `Funciona pra iniciantes? Sim, do zero ao avançado.\nE se eu não gostar? Garantia de 7 dias.\nQuanto tempo por dia? 15 minutos bastam.` },
    { id: 'lb6', type: 'cta', title: 'CTA Final', content: `👉 Garanta seu acesso agora por apenas R$ 297 (50% OFF). Vagas limitadas!` },
  ];
}

// ===== Mock: Prompts & Video Assets (Cinematic Dark) =====

export interface Prompt {
  id: string;
  title: string;
  platform: string;
  category: string;
  text: string;
}

export const cinematicPrompts: Prompt[] = [
  { id: 'pr1', title: 'Gancho Visual Moody Noir', platform: 'Midjourney', category: 'Thumbnail', text: 'A person looking shocked at their phone, dark moody cinematic noir lighting, chiaroscuro, deep shadows, midnight blue tones, hyperrealistic, 8k --ar 9:16 --v 6' },
  { id: 'pr2', title: 'Cena de Transformação Dark', platform: 'Leonardo AI', category: 'B-roll', text: 'Before and after split screen, tired person in dark shadows to confident person with dramatic rim light, midnight blue and gold accents, cinematic color grade, vertical format' },
  { id: 'pr3', title: 'Roteiro Gancho 3s Retenção', platform: 'ChatGPT', category: 'Hook', text: 'Escreva um gancho de 3 segundos em português que quebre o padrão visual e sonoro. Tema: [SEU PRODUTO]. Use curiosidade + urgência. Proíba cores saturadas infantis. Exija estética premium dark.' },
  { id: 'pr4', title: 'Thumbnail Premium Dark Studio', platform: 'Midjourney', category: 'Thumbnail', text: 'Product on a pedestal with deep blue neon glow, dark studio background, chiaroscuro lighting, high contrast, professional product photography, 8k --ar 9:16' },
  { id: 'pr5', title: 'Legendas em Massa High-Ticket', platform: 'ChatGPT', category: 'Copy', text: 'Gere 10 variações de legendas para Instagram Reels sobre [SEU PRODUTO], com CTA, emojis e hashtags de tendência. Tom: corporativo e elegante.' },
  { id: 'pr6', title: 'Referência Visual Cinematic Noir', platform: 'Leonardo AI', category: 'B-roll', text: 'Fast-paced montage style frames, dynamic camera angles, dark moody aesthetic, midnight blue and amber accents, chiaroscuro, vertical 9:16, cinematic color grade, no saturated colors' },
];

export interface VideoAsset {
  id: string;
  title: string;
  type: 'soundtrack' | 'subtitle' | 'visual';
  description: string;
  meta: string;
}

export const cinematicVideoAssets: VideoAsset[] = [
  { id: 'v1', title: 'Trilha: "Midnight Phonk"', type: 'soundtrack', description: 'Phonk minimalista e elegante de negócios, BPM 140, ideal para ganchos de retenção agressiva.', meta: '140 BPM · 0:15 · Royalty-free' },
  { id: 'v2', title: 'Trilha: "Corporate Suspense"', type: 'soundtrack', description: 'Trilha épica de suspense corporativo para builds e revelações de oferta.', meta: '90 BPM · 0:30 · Royalty-free' },
  { id: 'v3', title: 'Trilha: "Lo-Fi Deep Focus"', type: 'soundtrack', description: 'Lo-Fi profissional profundo para vídeos educativos e autoridade.', meta: '75 BPM · 0:45 · Royalty-free' },
  { id: 'v4', title: 'Legenda: Inter Bold + Glow', type: 'subtitle', description: 'Inter Bold 48px com sombreamento projetado preto e palavras-chave em amarelo dourado.', meta: 'Inter Bold · 48px · Drop shadow' },
  { id: 'v5', title: 'Legenda: Montserrat Black', type: 'subtitle', description: 'Montserrat Black com outline branco puro, máxima leitura em fundos escuros.', meta: 'Montserrat Black · 52px · Outline' },
  { id: 'v6', title: 'Referência: Moody Studio Setup', type: 'visual', description: 'Setup de estúdio dark com iluminação chiaroscuro e acentos azul meia-noite.', meta: '9:16 · 4K · PNG + MP4' },
];

// ===== Mock: Landing Builder Projects =====

export interface LandingProject {
  id: string;
  name: string;
  client: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export const mockLandingProjects: LandingProject[] = [
  { id: 'lp1', name: 'Landing Curso Tráfego Master', client: 'João Mendes', status: 'published', createdAt: '2026-07-10' },
  { id: 'lp2', name: 'Landing E-book Receitas Fit', client: 'Ana Paula', status: 'draft', createdAt: '2026-07-12' },
  { id: 'lp3', name: 'Landing Mentoria Branding', client: 'Carlos Silva', status: 'draft', createdAt: '2026-07-14' },
  { id: 'lp4', name: 'Landing App Produtividade', client: 'Mariana Lima', status: 'published', createdAt: '2026-07-15' },
];

// ===== Mock: Traffic Analytics =====

export interface TrafficMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}

export const trafficMetrics: TrafficMetric[] = [
  { id: 'tm1', label: 'CPA', value: 'R$ 12,40', trend: '8% menor', positive: true },
  { id: 'tm2', label: 'ROAS', value: '3.8x', trend: '15% maior', positive: true },
  { id: 'tm3', label: 'Cliques', value: '48.290', trend: '23% maior', positive: true },
  { id: 'tm4', label: 'CPC', value: 'R$ 0,38', trend: '5% menor', positive: true },
];

// ===== Mock: Automation Logs =====

export interface AutomationLog {
  id: string;
  time: string;
  product: string;
  channel: string;
  status: 'scheduled' | 'posted' | 'failed' | 'processing';
  detail?: string;
}

export const mockAutomationLogs: AutomationLog[] = [
  { id: 'l1', time: '12:00', product: 'Curso de Tráfego Pago Master', channel: 'TikTok', status: 'posted' },
  { id: 'l2', time: '18:00', product: 'E-book Receitas Fit Express', channel: 'Instagram Reels', status: 'scheduled' },
  { id: 'l3', time: '21:00', product: 'Mentoria Branding Pessoal', channel: 'YouTube Shorts', status: 'processing' },
  { id: 'l4', time: '09:00', product: 'App Produtividade Ninja', channel: 'TikTok', status: 'failed', detail: 'Limite de API' },
  { id: 'l5', time: '15:00', product: 'E-book Receitas Fit Express', channel: 'YouTube Shorts', status: 'scheduled' },
];

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
  return Math.ceil(countWords(text) / 2.5);
}
