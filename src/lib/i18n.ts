export type Lang = 'pt' | 'en' | 'es';

export interface Dict {
  // App
  appName: string;
  appTagline: string;
  enterpriseEdition: string;
  // Auth
  loginTitle: string;
  loginSubtitle: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  signIn: string;
  signingIn: string;
  adminHint: string;
  // Sidebar categories
  catGeneral: string;
  catDigital: string;
  catDropshipping: string;
  catTraffic: string;
  catConfigs: string;
  // Sidebar items
  navDashboard: string;
  navMining: string;
  navEbook: string;
  navDropshipping: string;
  navLandingBuilder: string;
  navTraffic: string;
  navMassSender: string;
  navAffiliates: string;
  navAutomation: string;
  navSubscription: string;
  navSecurity: string;
  navAdmin: string;
  // Common
  save: string;
  cancel: string;
  delete: string;
  close: string;
  copy: string;
  copied: string;
  generate: string;
  generating: string;
  import: string;
  search: string;
  filter: string;
  all: string;
  status: string;
  actions: string;
  product: string;
  price: string;
  clicks: string;
  sales: string;
  commission: string;
  date: string;
  client: string;
  type: string;
  channel: string;
  amount: string;
  page: string;
  of: string;
  // Dashboard
  dashboardTitle: string;
  dashboardSubtitle: string;
  grossRevenue: string;
  netProfit: string;
  activeSubs: string;
  monthlyRevenue: string;
  lastTransactions: string;
  transactions: string;
  success: string;
  pending: string;
  failed: string;
  rank: string;
  rankProgress: string;
  points: string;
  // Ranks
  rankMiner: string;
  rankShark: string;
  rankElite: string;
  // Mining
  miningTitle: string;
  miningSubtitle: string;
  productData: string;
  productName: string;
  productNamePlaceholder: string;
  productDesc: string;
  productDescPlaceholder: string;
  sellPrice: string;
  targetAudience: string;
  targetAudiencePlaceholder: string;
  scriptStyle: string;
  stylePersuasive: string;
  styleStorytelling: string;
  styleHumorous: string;
  styleObjection: string;
  saveGenerate: string;
  teleprompter: string;
  teleprompterPlaceholder: string;
  characters: string;
  words: string;
  speechTime: string;
  fillRequired: string;
  // Media matrix
  mediaMatrix: string;
  presenter: string;
  presenterMale: string;
  presenterFemale: string;
  presenterOther: string;
  presenterOtherPlaceholder: string;
  voiceTone: string;
  voiceDeep: string;
  voiceCorporate: string;
  voiceNatural: string;
  voiceViral: string;
  subtitleStyle: string;
  subtitleHormozi: string;
  subtitleClean: string;
  subtitleCustom: string;
  subtitleCustomPlaceholder: string;
  archetype: string;
  archViral: string;
  archCorporate: string;
  archSexy: string;
  // Black box
  blackBoxTitle: string;
  blackBoxDetected: string;
  // History
  history: string;
  favorites: string;
  noHistory: string;
  // Ebook
  ebookTitle: string;
  ebookSubtitle: string;
  createEbook: string;
  createLanding: string;
  ebookTheme: string;
  ebookThemePlaceholder: string;
  ebookTone: string;
  toneFormal: string;
  toneCasual: string;
  toneAggressive: string;
  generateStructure: string;
  summary: string;
  chapters: string;
  landingOffer: string;
  landingOfferPlaceholder: string;
  generateLanding: string;
  pageStructure: string;
  headline: string;
  pain: string;
  benefits: string;
  testimonials: string;
  faq: string;
  cta: string;
  prompts: string;
  videoAssets: string;
  download: string;
  // Dropshipping
  dropTitle: string;
  dropSubtitle: string;
  linkValidator: string;
  linkPlaceholder: string;
  mineCreatives: string;
  mining: string;
  invalidLink: string;
  productAnalysis: string;
  tiktokHooks: string;
  swotAnalysis: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  spyFeed: string;
  spyFeedSubtitle: string;
  cloneCopy: string;
  knowledgeBank: string;
  knowledgeBankSubtitle: string;
  strategicTip: string;
  importStructure: string;
  ctr: string;
  views: string;
  // Landing builder
  landingBuilderTitle: string;
  landingBuilderSubtitle: string;
  newProject: string;
  projectName: string;
  sendPreview: string;
  simulateAccept: string;
  draft: string;
  published: string;
  // Traffic
  trafficTitle: string;
  trafficSubtitle: string;
  pixelId: string;
  pixelPlaceholder: string;
  analytics: string;
  cpa: string;
  roas: string;
  cpc: string;
  // Mass sender
  senderTitle: string;
  senderSubtitle: string;
  selectChannel: string;
  whatsapp: string;
  fbGroups: string;
  messageContent: string;
  messagePlaceholder: string;
  startDispatch: string;
  dispatching: string;
  consoleLog: string;
  // Affiliates
  affiliatesTitle: string;
  affiliatesSubtitle: string;
  totalClicks: string;
  totalCommission: string;
  affiliateLinks: string;
  generateLink: string;
  newLink: string;
  selectProduct: string;
  partnership: string;
  affiliate: string;
  coproducer: string;
  commissionRate: string;
  // Automation
  automationTitle: string;
  automationSubtitle: string;
  postMode: string;
  semiAuto: string;
  fullAuto: string;
  reviewApprove: string;
  videoPreview: string;
  autoCaption: string;
  approveSchedule: string;
  scheduling: string;
  advancedConfig: string;
  frequency: string;
  perDay: string;
  peakTimes: string;
  webhookUrl: string;
  webhookPlaceholder: string;
  invalidWebhook: string;
  activateAutomation: string;
  timeline: string;
  timelineSubtitle: string;
  posted: string;
  scheduled: string;
  processing: string;
  // Subscription
  subscriptionTitle: string;
  subscriptionSubtitle: string;
  currentPlan: string;
  planBlack: string;
  planActive: string;
  annual: string;
  renewal: string;
  viewInvoices: string;
  cancelPlan: string;
  aiCredits: string;
  creditsUsed: string;
  creditsRemaining: string;
  creditsWarning: string;
  creditsWarningDesc: string;
  usageBreakdown: string;
  upgradeLimit: string;
  buyExtraCredits: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  scarcityTimer: string;
  confirmPurchase: string;
  referralProgram: string;
  referralSubtitle: string;
  referralLink: string;
  referralDesc: string;
  simulateReferral: string;
  referralBonus: string;
  // Security
  securityTitle: string;
  securitySubtitle: string;
  apiKeys: string;
  apiKeysDesc: string;
  openaiKey: string;
  geminiKey: string;
  tiktokKey: string;
  getKey: string;
  saveKeys: string;
  savedSuccess: string;
  accountSecurity: string;
  twoFactor: string;
  twoFactorDesc: string;
  activeSessions: string;
  activeSessionsDesc: string;
  accessLogs: string;
  accessLogsDesc: string;
  manage: string;
  viewLogs: string;
  securityTerminal: string;
  securityTerminalDesc: string;
  keysLocalNote: string;
  // Admin
  adminTitle: string;
  adminSubtitle: string;
  adminBadge: string;
  userControl: string;
  injectCredits: string;
  injectCreditsDesc: string;
  totalUsers: string;
  totalCredits: string;
  // Chatbot
  chatbotName: string;
  chatbotOnline: string;
  chatbotGreeting: string;
  chatbotPlaceholder: string;
  chatbotTyping: string;
  // Misc
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;
}

export const translations: Record<Lang, Dict> = {
  pt: {
    appName: 'VRTX',
    appTagline: 'Enterprise Edition',
    enterpriseEdition: 'Enterprise Edition',
    loginTitle: 'Acesso ao VRTX',
    loginSubtitle: 'Entre na plataforma de escala digital corporativa.',
    email: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    password: 'Senha',
    passwordPlaceholder: '••••••••',
    signIn: 'Entrar',
    signingIn: 'Entrando...',
    adminHint: 'Dica: use admin@vrtx.app para acesso total.',
    catGeneral: 'Geral',
    catDigital: 'Produtos Digitais',
    catDropshipping: 'Dropshipping & Físicos',
    catTraffic: 'Tráfego & Ecossistema',
    catConfigs: 'Configurações',
    navDashboard: 'Dashboard Executivo & Receita',
    navMining: 'Geração de Roteiros Avançada',
    navEbook: 'Fábrica de E-books & Copys',
    navDropshipping: 'Scanner de Fornecedores & Spy',
    navLandingBuilder: 'Construtor de Landing Pages',
    navTraffic: 'Tráfego Pago & Pixels',
    navMassSender: 'Disparador Massivo',
    navAffiliates: 'Hub de Afiliações',
    navAutomation: 'Central de Postagens',
    navSubscription: 'Gerenciar Assinatura',
    navSecurity: 'Auditoria & Chaves de API',
    navAdmin: 'Controle do Sistema',
    save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', close: 'Fechar',
    copy: 'Copiar', copied: 'Copiado! ✓', generate: 'Gerar', generating: 'Gerando...',
    import: 'Importar', search: 'Buscar', filter: 'Filtrar', all: 'Todos',
    status: 'Status', actions: 'Ações', product: 'Produto', price: 'Preço',
    clicks: 'Cliques', sales: 'Vendas', commission: 'Comissão', date: 'Data',
    client: 'Cliente', type: 'Tipo', channel: 'Canal', amount: 'Valor',
    page: 'Página', of: 'de',
    dashboardTitle: 'Dashboard Executivo & Painel de Receita',
    dashboardSubtitle: 'Visão financeira de alto nível da sua operação de escala digital.',
    grossRevenue: 'Renda Bruta', netProfit: 'Lucro Líquido', activeSubs: 'Assinaturas Ativas',
    monthlyRevenue: 'Faturamento Mensal', lastTransactions: 'Últimas Transações',
    transactions: 'transações', success: 'Sucesso', pending: 'Pendente', failed: 'Falhou',
    rank: 'Rank', rankProgress: 'Progresso do Rank', points: 'pontos',
    rankMiner: 'Minerador Iniciante', rankShark: 'Shark das Vendas', rankElite: 'VRTX Elite Maker',
    miningTitle: 'Geração de Roteiros Avançada',
    miningSubtitle: 'Matriz de configuração hiper-realista de criativos com IA.',
    productData: 'Dados do Produto', productName: 'Nome do Produto',
    productNamePlaceholder: 'Ex: Curso de Tráfego Pago Master',
    productDesc: 'Descrição Detalhada do Produto',
    productDescPlaceholder: 'Descreva o produto, diferenciais e benefícios...',
    sellPrice: 'Preço de Venda', targetAudience: 'Público-Alvo',
    targetAudiencePlaceholder: 'Ex: afiliados iniciantes',
    scriptStyle: 'Estilo do Roteiro',
    stylePersuasive: 'Persuasivo (Vendas e Conversão)',
    styleStorytelling: 'Storytelling (Conexão Emocional)',
    styleHumorous: 'Humorístico/Viral (Redes Sociais)',
    styleObjection: 'Quebra de Objeções (Curar Dúvidas)',
    saveGenerate: 'Salvar e Gerar Roteiro',
    teleprompter: 'Teleprompter', teleprompterPlaceholder: 'Seu roteiro gerado por IA aparecerá aqui...',
    characters: 'Caracteres', words: 'Palavras', speechTime: 'Tempo est.',
    fillRequired: 'Preencha os campos obrigatórios para habilitar o botão.',
    mediaMatrix: 'Matriz de Mídia e Criativos',
    presenter: 'Gênero/Apresentador',
    presenterMale: 'Masculino', presenterFemale: 'Feminino',
    presenterOther: 'Outro (Customizado)', presenterOtherPlaceholder: 'Ex: Cyborg Futurista',
    voiceTone: 'Entonação Vocal da IA',
    voiceDeep: 'Voz Ultra-Grave de Impacto', voiceCorporate: 'Voz Corporativa e Didática',
    voiceNatural: 'Voz Natural com Pausas', voiceViral: 'Voz Rápida TikTok Viral',
    subtitleStyle: 'Matriz de Legendas Dinâmicas',
    subtitleHormozi: 'Legenda Estilo Hormozi (Neon Pesada)',
    subtitleClean: 'Legenda Clean Executive (Montserrat)',
    subtitleCustom: 'Customizada (Especificações livres)',
    subtitleCustomPlaceholder: 'Cor, sombra, tamanho da fonte...',
    archetype: 'Arquétipo de Engajamento',
    archViral: 'Engajado/Viral (Quebra de padrão)',
    archCorporate: 'Cordial/Corporativo (High-Ticket)',
    archSexy: 'Sexy/Provocativo (Desejo e Status)',
    blackBoxTitle: 'VRTX Black Box - Insights Ocultos de Retenção',
    blackBoxDetected: 'Nicho identificado',
    history: 'Histórico', favorites: 'Favoritos', noHistory: 'Nenhum registro ainda.',
    ebookTitle: 'Fábrica de E-books & Copys',
    ebookSubtitle: 'Gere estruturas completas de e-books, landing pages e ativos de vídeo.',
    createEbook: 'Criar E-book', createLanding: 'Criar Landing Page',
    ebookTheme: 'Tema do E-book', ebookThemePlaceholder: 'Ex: Investimentos para Iniciantes',
    ebookTone: 'Tom de Voz', toneFormal: 'Formal', toneCasual: 'Descontraído', toneAggressive: 'Agressivo',
    generateStructure: 'Gerar Estrutura', summary: 'Sumário', chapters: 'capítulos',
    landingOffer: 'Oferta Principal', landingOfferPlaceholder: 'Ex: Curso completo por R$ 297',
    generateLanding: 'Gerar Landing Page', pageStructure: 'Estrutura da Página',
    headline: 'Headline', pain: 'Dor', benefits: 'Benefícios',
    testimonials: 'Depoimentos', faq: 'FAQ', cta: 'CTA Final',
    prompts: 'Prompts', videoAssets: 'Ativos de Vídeo', download: 'Baixar',
    dropTitle: 'Scanner de Fornecedores & VRTX Spy Feed',
    dropSubtitle: 'Valide links, minere criativos virais e espione a concorrência.',
    linkValidator: 'Validador de Link', linkPlaceholder: 'https://aliexpress.com/item/xxxxx',
    mineCreatives: 'Minerar Criativos', mining: 'Minerando...',
    invalidLink: 'Link inválido. Use AliExpress, Shopee, Amazon ou Mercado Livre.',
    productAnalysis: 'Análise do Produto', tiktokHooks: 'Ganchos para TikTok',
    swotAnalysis: 'Análise SWOT - Concorrência Direta',
    strengths: 'Forças', weaknesses: 'Fraquezas', opportunities: 'Oportunidades', threats: 'Ameaças',
    spyFeed: 'VRTX Spy Feed', spyFeedSubtitle: 'Criativos virais em tempo real',
    cloneCopy: 'Clonar Engenharia de Copy',
    knowledgeBank: 'Ativos e Links de Alta Conversão',
    knowledgeBankSubtitle: 'Produtos campeões prontos para promoção',
    strategicTip: 'Dica Estratégica do Especialista',
    importStructure: 'Importar Estrutura de Vendas',
    ctr: 'CTR', views: 'Views',
    landingBuilderTitle: 'Construtor de Landing Pages para Terceiros',
    landingBuilderSubtitle: 'Gerencie projetos de clientes da sua agência.',
    newProject: 'Novo Projeto', projectName: 'Nome do Projeto',
    sendPreview: 'Enviar Pré-visualização', simulateAccept: 'Simular Aceite do Cliente',
    draft: 'Rascunho', published: 'Publicado',
    trafficTitle: 'Tráfego Pago & Integração de Pixels',
    trafficSubtitle: 'Armazene IDs de pixels e monitore métricas analíticas.',
    pixelId: 'ID do Pixel', pixelPlaceholder: 'Ex: 123456789012345',
    analytics: 'Analytics', cpa: 'CPA', roas: 'ROAS', cpc: 'CPC',
    senderTitle: 'Disparador Massivo Automatizado',
    senderSubtitle: 'Envie mensagens em massa com delays anti-banimento.',
    selectChannel: 'Canal', whatsapp: 'WhatsApp', fbGroups: 'Grupos do Facebook',
    messageContent: 'Conteúdo da Mensagem',
    messagePlaceholder: 'Digite sua mensagem promocional...',
    startDispatch: 'Iniciar Disparo', dispatching: 'Disparando...',
    consoleLog: 'Console de Logs',
    affiliatesTitle: 'Hub de Afiliações Expandido',
    affiliatesSubtitle: 'Gerencie links, comissões e performance por plataforma.',
    totalClicks: 'Cliques Totais', totalCommission: 'Comissão Acumulada',
    affiliateLinks: 'Links de Afiliado', generateLink: 'Gerar Link', newLink: 'Gerar Novo Link',
    selectProduct: 'Selecione um produto...', partnership: 'Tipo de Parceria',
    affiliate: 'Afiliado', coproducer: 'Coprodutor', commissionRate: 'Comissão',
    automationTitle: 'Central de Postagens Automáticas',
    automationSubtitle: 'Configure o modo de postagem e gerencie a fila de distribuição.',
    postMode: 'Modo de Postagem', semiAuto: 'Semi-Automático', fullAuto: '100% Automático',
    reviewApprove: 'Revisão e Aprovação', videoPreview: 'Prévia do vídeo gerado',
    autoCaption: 'Legenda gerada automaticamente', approveSchedule: 'Aprovar e Agendar',
    scheduling: 'Agendando...', advancedConfig: 'Configurações Avançadas',
    frequency: 'Frequência diária', perDay: 'x por dia', peakTimes: 'Horários de pico',
    webhookUrl: 'URL do Webhook (Make/n8n)', webhookPlaceholder: 'https://hook.make.com/...',
    invalidWebhook: 'URL inválida. Use http ou https.', activateAutomation: 'Ativar Automação',
    timeline: 'Linha do Tempo', timelineSubtitle: 'Status das automações',
    posted: 'Postado', scheduled: 'Agendado', processing: 'Processando',
    subscriptionTitle: 'Gerenciar Assinatura & Indicação',
    subscriptionSubtitle: 'Controle seu plano, créditos de IA e programa de indicação.',
    currentPlan: 'Plano Atual', planBlack: 'Plano Black', planActive: 'Ativo',
    annual: 'ano', renewal: 'Renovação', viewInvoices: 'Ver Faturas', cancelPlan: 'Cancelar',
    aiCredits: 'Créditos de IA', creditsUsed: 'créditos utilizados',
    creditsRemaining: 'créditos restantes neste ciclo.',
    creditsWarning: 'Seus créditos estão quase acabando!',
    creditsWarningDesc: 'Considere fazer um upgrade para evitar interrupções.',
    usageBreakdown: 'Detalhamento de uso', upgradeLimit: 'Fazer Upgrade de Limite',
    buyExtraCredits: 'Comprar Créditos Extras',
    checkoutTitle: 'Checkout Rápido de Créditos',
    checkoutSubtitle: 'Pacote de 500 créditos extras',
    scarcityTimer: 'Oferta expira em',
    confirmPurchase: 'Confirmar Compra',
    referralProgram: 'Programa de Indicação',
    referralSubtitle: 'Compartilhe o VRTX e ganhe créditos',
    referralLink: 'Seu Link de Indicação',
    referralDesc: 'Compartilhe o VRTX. Se o seu indicado assinar qualquer plano pago, você ganha +250 créditos de IA automaticamente.',
    simulateReferral: 'Simular Indicação Aceita',
    referralBonus: '+250 créditos adicionados!',
    securityTitle: 'Auditoria de Segurança & Chaves de API',
    securitySubtitle: 'Cadastre chaves e monitore a segurança da sua conta.',
    apiKeys: 'Chaves de API', apiKeysDesc: 'Armazenadas localmente no seu navegador',
    openaiKey: 'OpenAI API Key', geminiKey: 'Google Gemini API Key', tiktokKey: 'TikTok Developer Key',
    getKey: 'Obter chave em', saveKeys: 'Salvar Chaves', savedSuccess: 'Salvo com sucesso!',
    accountSecurity: 'Segurança da Conta', twoFactor: 'Autenticação em 2 Fatores',
    twoFactorDesc: 'Proteja sua conta com 2FA via app',
    activeSessions: 'Sessões Ativas', activeSessionsDesc: '3 dispositivos conectados',
    accessLogs: 'Logs de Acesso', accessLogsDesc: 'Último login: 17/07/2026 14:32',
    manage: 'Gerenciar', viewLogs: 'Ver logs',
    securityTerminal: 'Terminal de Segurança',
    securityTerminalDesc: 'Monitoramento de segurança em tempo real',
    keysLocalNote: 'Suas chaves são armazenadas apenas no estado local desta sessão e nunca enviadas para servidores externos.',
    adminTitle: 'Controle do Sistema',
    adminSubtitle: 'Gerenciamento de usuários e injeção de créditos em massa.',
    adminBadge: 'MODO DESENVOLVEDOR - ACESSO TOTAL UNLOCKED',
    userControl: 'Controle de Usuários', injectCredits: 'Injetar Créditos',
    injectCreditsDesc: 'Adicione créditos a qualquer usuário do sistema',
    totalUsers: 'Usuários Totais', totalCredits: 'Créditos em Circulação',
    chatbotName: 'VRTX_AI', chatbotOnline: 'Online agora',
    chatbotGreeting: 'Olá! Sou o VRTX_AI, seu assistente de escala. Como posso ajudar?',
    chatbotPlaceholder: 'Digite sua mensagem...',
    chatbotTyping: 'VRTX_AI está digitando...',
    language: 'Idioma', theme: 'Tema', darkMode: 'Dark Mode', lightMode: 'Light Mode',
  },
  en: {
    appName: 'VRTX',
    appTagline: 'Enterprise Edition',
    enterpriseEdition: 'Enterprise Edition',
    loginTitle: 'VRTX Access',
    loginSubtitle: 'Sign in to the corporate digital scaling platform.',
    email: 'Email', emailPlaceholder: 'your@email.com',
    password: 'Password', passwordPlaceholder: '••••••••',
    signIn: 'Sign In', signingIn: 'Signing in...', adminHint: 'Tip: use admin@vrtx.app for full access.',
    catGeneral: 'General', catDigital: 'Digital Products',
    catDropshipping: 'Dropshipping & Physical', catTraffic: 'Traffic & Ecosystem',
    catConfigs: 'Configuration',
    navDashboard: 'Executive Dashboard & Revenue',
    navMining: 'Advanced Script Generation',
    navEbook: 'E-book Factory & Copy Builder',
    navDropshipping: 'Supplier Scanner & Spy',
    navLandingBuilder: 'Landing Page Builder',
    navTraffic: 'Paid Traffic & Pixels',
    navMassSender: 'Mass Dispatcher',
    navAffiliates: 'Affiliates Hub',
    navAutomation: 'Posting Center',
    navSubscription: 'Manage Subscription',
    navSecurity: 'Audit & API Keys',
    navAdmin: 'System Control',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', close: 'Close',
    copy: 'Copy', copied: 'Copied! ✓', generate: 'Generate', generating: 'Generating...',
    import: 'Import', search: 'Search', filter: 'Filter', all: 'All',
    status: 'Status', actions: 'Actions', product: 'Product', price: 'Price',
    clicks: 'Clicks', sales: 'Sales', commission: 'Commission', date: 'Date',
    client: 'Client', type: 'Type', channel: 'Channel', amount: 'Amount',
    page: 'Page', of: 'of',
    dashboardTitle: 'Executive Dashboard & Revenue Panel',
    dashboardSubtitle: 'High-level financial overview of your digital scaling operation.',
    grossRevenue: 'Gross Revenue', netProfit: 'Net Profit', activeSubs: 'Active Subscriptions',
    monthlyRevenue: 'Monthly Revenue', lastTransactions: 'Last Transactions',
    transactions: 'transactions', success: 'Success', pending: 'Pending', failed: 'Failed',
    rank: 'Rank', rankProgress: 'Rank Progress', points: 'points',
    rankMiner: 'Starter Miner', rankShark: 'Sales Shark', rankElite: 'VRTX Elite Maker',
    miningTitle: 'Advanced Script Generation',
    miningSubtitle: 'Hyper-realistic creative configuration matrix with AI.',
    productData: 'Product Data', productName: 'Product Name',
    productNamePlaceholder: 'Ex: Traffic Mastery Course',
    productDesc: 'Detailed Product Description',
    productDescPlaceholder: 'Describe the product, differentials and benefits...',
    sellPrice: 'Sale Price', targetAudience: 'Target Audience',
    targetAudiencePlaceholder: 'Ex: beginner affiliates',
    scriptStyle: 'Script Style',
    stylePersuasive: 'Persuasive (Sales & Conversion)',
    styleStorytelling: 'Storytelling (Emotional Connection)',
    styleHumorous: 'Humorous/Viral (Social Media)',
    styleObjection: 'Objection Handling (Cure Doubts)',
    saveGenerate: 'Save & Generate Script',
    teleprompter: 'Teleprompter', teleprompterPlaceholder: 'Your AI-generated script will appear here...',
    characters: 'Characters', words: 'Words', speechTime: 'Est. time',
    fillRequired: 'Fill required fields to enable the button.',
    mediaMatrix: 'Media & Creative Matrix',
    presenter: 'Presenter',
    presenterMale: 'Male', presenterFemale: 'Female',
    presenterOther: 'Other (Custom)', presenterOtherPlaceholder: 'Ex: Futuristic Cyborg',
    voiceTone: 'AI Voice Tone',
    voiceDeep: 'Ultra-Deep Impact Voice', voiceCorporate: 'Corporate & Didactic Voice',
    voiceNatural: 'Natural Voice with Pauses', voiceViral: 'Fast TikTok Viral Voice',
    subtitleStyle: 'Dynamic Subtitle Matrix',
    subtitleHormozi: 'Hormozi Style (Heavy Neon)',
    subtitleClean: 'Clean Executive (Montserrat)',
    subtitleCustom: 'Custom (Free specs)',
    subtitleCustomPlaceholder: 'Color, shadow, font size...',
    archetype: 'Engagement Archetype',
    archViral: 'Viral (Pattern break)',
    archCorporate: 'Corporate (High-Ticket)',
    archSexy: 'Sexy/Provocative (Desire & Status)',
    blackBoxTitle: 'VRTX Black Box - Hidden Retention Insights',
    blackBoxDetected: 'Niche detected',
    history: 'History', favorites: 'Favorites', noHistory: 'No records yet.',
    ebookTitle: 'E-book Factory & Copy Builder',
    ebookSubtitle: 'Generate complete e-book structures, landing pages and video assets.',
    createEbook: 'Create E-book', createLanding: 'Create Landing Page',
    ebookTheme: 'E-book Theme', ebookThemePlaceholder: 'Ex: Investing for Beginners',
    ebookTone: 'Tone of Voice', toneFormal: 'Formal', toneCasual: 'Casual', toneAggressive: 'Aggressive',
    generateStructure: 'Generate Structure', summary: 'Summary', chapters: 'chapters',
    landingOffer: 'Main Offer', landingOfferPlaceholder: 'Ex: Complete course for $297',
    generateLanding: 'Generate Landing Page', pageStructure: 'Page Structure',
    headline: 'Headline', pain: 'Pain', benefits: 'Benefits',
    testimonials: 'Testimonials', faq: 'FAQ', cta: 'Final CTA',
    prompts: 'Prompts', videoAssets: 'Video Assets', download: 'Download',
    dropTitle: 'Supplier Scanner & VRTX Spy Feed',
    dropSubtitle: 'Validate links, mine viral creatives and spy on competitors.',
    linkValidator: 'Link Validator', linkPlaceholder: 'https://aliexpress.com/item/xxxxx',
    mineCreatives: 'Mine Creatives', mining: 'Mining...',
    invalidLink: 'Invalid link. Use AliExpress, Shopee, Amazon or Mercado Livre.',
    productAnalysis: 'Product Analysis', tiktokHooks: 'TikTok Hooks',
    swotAnalysis: 'SWOT Analysis - Direct Competition',
    strengths: 'Strengths', weaknesses: 'Weaknesses', opportunities: 'Opportunities', threats: 'Threats',
    spyFeed: 'VRTX Spy Feed', spyFeedSubtitle: 'Real-time viral creatives',
    cloneCopy: 'Clone Copy Engineering',
    knowledgeBank: 'High-Converting Assets & Links',
    knowledgeBankSubtitle: 'Best-selling products ready for promotion',
    strategicTip: 'Expert Strategic Tip',
    importStructure: 'Import Sales Structure',
    ctr: 'CTR', views: 'Views',
    landingBuilderTitle: 'Third-Party Landing Page Builder',
    landingBuilderSubtitle: 'Manage your agency client projects.',
    newProject: 'New Project', projectName: 'Project Name',
    sendPreview: 'Send Preview', simulateAccept: 'Simulate Client Approval',
    draft: 'Draft', published: 'Published',
    trafficTitle: 'Paid Traffic & Pixel Integration',
    trafficSubtitle: 'Store pixel IDs and monitor analytics metrics.',
    pixelId: 'Pixel ID', pixelPlaceholder: 'Ex: 123456789012345',
    analytics: 'Analytics', cpa: 'CPA', roas: 'ROAS', cpc: 'CPC',
    senderTitle: 'Mass Automated Dispatcher',
    senderSubtitle: 'Send bulk messages with anti-ban delays.',
    selectChannel: 'Channel', whatsapp: 'WhatsApp', fbGroups: 'Facebook Groups',
    messageContent: 'Message Content', messagePlaceholder: 'Type your promotional message...',
    startDispatch: 'Start Dispatch', dispatching: 'Dispatching...',
    consoleLog: 'Log Console',
    affiliatesTitle: 'Expanded Affiliates Hub',
    affiliatesSubtitle: 'Manage links, commissions and performance by platform.',
    totalClicks: 'Total Clicks', totalCommission: 'Accumulated Commission',
    affiliateLinks: 'Affiliate Links', generateLink: 'Generate Link', newLink: 'Generate New Link',
    selectProduct: 'Select a product...', partnership: 'Partnership Type',
    affiliate: 'Affiliate', coproducer: 'Co-producer', commissionRate: 'Commission',
    automationTitle: 'Automated Posting Center',
    automationSubtitle: 'Configure posting mode and manage the distribution queue.',
    postMode: 'Posting Mode', semiAuto: 'Semi-Automatic', fullAuto: '100% Automatic',
    reviewApprove: 'Review & Approval', videoPreview: 'Generated video preview',
    autoCaption: 'Auto-generated caption', approveSchedule: 'Approve & Schedule',
    scheduling: 'Scheduling...', advancedConfig: 'Advanced Configuration',
    frequency: 'Daily frequency', perDay: 'x per day', peakTimes: 'Peak times',
    webhookUrl: 'Webhook URL (Make/n8n)', webhookPlaceholder: 'https://hook.make.com/...',
    invalidWebhook: 'Invalid URL. Use http or https.', activateAutomation: 'Activate Automation',
    timeline: 'Timeline', timelineSubtitle: 'Automation status',
    posted: 'Posted', scheduled: 'Scheduled', processing: 'Processing',
    subscriptionTitle: 'Manage Subscription & Referral',
    subscriptionSubtitle: 'Control your plan, AI credits and referral program.',
    currentPlan: 'Current Plan', planBlack: 'Black Plan', planActive: 'Active',
    annual: 'year', renewal: 'Renewal', viewInvoices: 'View Invoices', cancelPlan: 'Cancel',
    aiCredits: 'AI Credits', creditsUsed: 'credits used',
    creditsRemaining: 'credits remaining this cycle.',
    creditsWarning: 'Your credits are running low!',
    creditsWarningDesc: 'Consider upgrading to avoid interruptions.',
    usageBreakdown: 'Usage breakdown', upgradeLimit: 'Upgrade Limit',
    buyExtraCredits: 'Buy Extra Credits',
    checkoutTitle: 'Quick Credit Checkout',
    checkoutSubtitle: '500 extra credits pack',
    scarcityTimer: 'Offer expires in',
    confirmPurchase: 'Confirm Purchase',
    referralProgram: 'Referral Program',
    referralSubtitle: 'Share VRTX and earn credits',
    referralLink: 'Your Referral Link',
    referralDesc: 'Share VRTX. If your referral subscribes to any paid plan, you earn +250 AI credits automatically.',
    simulateReferral: 'Simulate Accepted Referral',
    referralBonus: '+250 credits added!',
    securityTitle: 'Security Audit & API Keys',
    securitySubtitle: 'Register keys and monitor your account security.',
    apiKeys: 'API Keys', apiKeysDesc: 'Stored locally in your browser',
    openaiKey: 'OpenAI API Key', geminiKey: 'Google Gemini API Key', tiktokKey: 'TikTok Developer Key',
    getKey: 'Get key at', saveKeys: 'Save Keys', savedSuccess: 'Saved successfully!',
    accountSecurity: 'Account Security', twoFactor: 'Two-Factor Authentication',
    twoFactorDesc: 'Protect your account with 2FA via app',
    activeSessions: 'Active Sessions', activeSessionsDesc: '3 connected devices',
    accessLogs: 'Access Logs', accessLogsDesc: 'Last login: 07/17/2026 2:32 PM',
    manage: 'Manage', viewLogs: 'View logs',
    securityTerminal: 'Security Terminal',
    securityTerminalDesc: 'Real-time security monitoring',
    keysLocalNote: 'Your keys are stored only in this session local state and never sent to external servers.',
    adminTitle: 'System Control',
    adminSubtitle: 'User management and mass credit injection.',
    adminBadge: 'DEVELOPER MODE - FULL ACCESS UNLOCKED',
    userControl: 'User Control', injectCredits: 'Inject Credits',
    injectCreditsDesc: 'Add credits to any system user',
    totalUsers: 'Total Users', totalCredits: 'Credits in Circulation',
    chatbotName: 'VRTX_AI', chatbotOnline: 'Online now',
    chatbotGreeting: 'Hello! I am VRTX_AI, your scaling assistant. How can I help?',
    chatbotPlaceholder: 'Type your message...',
    chatbotTyping: 'VRTX_AI is typing...',
    language: 'Language', theme: 'Theme', darkMode: 'Dark Mode', lightMode: 'Light Mode',
  },
  es: {
    appName: 'VRTX',
    appTagline: 'Enterprise Edition',
    enterpriseEdition: 'Enterprise Edition',
    loginTitle: 'Acceso a VRTX',
    loginSubtitle: 'Entre en la plataforma de escala digital corporativa.',
    email: 'Correo', emailPlaceholder: 'su@email.com',
    password: 'Contraseña', passwordPlaceholder: '••••••••',
    signIn: 'Entrar', signingIn: 'Entrando...', adminHint: 'Consejo: use admin@vrtx.app para acceso total.',
    catGeneral: 'General', catDigital: 'Productos Digitales',
    catDropshipping: 'Dropshipping & Físicos', catTraffic: 'Tráfico & Ecosistema',
    catConfigs: 'Configuración',
    navDashboard: 'Dashboard Ejecutivo & Ingresos',
    navMining: 'Generación Avanzada de Guiones',
    navEbook: 'Fábrica de E-books & Copys',
    navDropshipping: 'Escáner de Proveedores & Spy',
    navLandingBuilder: 'Constructor de Landing Pages',
    navTraffic: 'Tráfico de Pago & Píxeles',
    navMassSender: 'Disparador Masivo',
    navAffiliates: 'Hub de Afiliados',
    navAutomation: 'Centro de Publicaciones',
    navSubscription: 'Gestionar Suscripción',
    navSecurity: 'Auditoría & Claves de API',
    navAdmin: 'Control del Sistema',
    save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', close: 'Cerrar',
    copy: 'Copiar', copied: '¡Copiado! ✓', generate: 'Generar', generating: 'Generando...',
    import: 'Importar', search: 'Buscar', filter: 'Filtrar', all: 'Todos',
    status: 'Estado', actions: 'Acciones', product: 'Producto', price: 'Precio',
    clicks: 'Clics', sales: 'Ventas', commission: 'Comisión', date: 'Fecha',
    client: 'Cliente', type: 'Tipo', channel: 'Canal', amount: 'Monto',
    page: 'Página', of: 'de',
    dashboardTitle: 'Dashboard Ejecutivo & Panel de Ingresos',
    dashboardSubtitle: 'Vista financiera de alto nivel de su operación de escala digital.',
    grossRevenue: 'Ingresos Brutos', netProfit: 'Beneficio Neto', activeSubs: 'Suscripciones Activas',
    monthlyRevenue: 'Facturación Mensual', lastTransactions: 'Últimas Transacciones',
    transactions: 'transacciones', success: 'Éxito', pending: 'Pendiente', failed: 'Falló',
    rank: 'Rango', rankProgress: 'Progreso de Rango', points: 'puntos',
    rankMiner: 'Minero Iniciado', rankShark: 'Tiburón de Ventas', rankElite: 'VRTX Elite Maker',
    miningTitle: 'Generación Avanzada de Guiones',
    miningSubtitle: 'Matriz hiperrealista de configuración de creativos con IA.',
    productData: 'Datos del Producto', productName: 'Nombre del Producto',
    productNamePlaceholder: 'Ej: Curso de Tráfico de Pago',
    productDesc: 'Descripción Detallada del Producto',
    productDescPlaceholder: 'Describa el producto, diferenciales y beneficios...',
    sellPrice: 'Precio de Venta', targetAudience: 'Público Objetivo',
    targetAudiencePlaceholder: 'Ej: afiliados principiantes',
    scriptStyle: 'Estilo del Guion',
    stylePersuasive: 'Persuasivo (Ventas y Conversión)',
    styleStorytelling: 'Storytelling (Conexión Emocional)',
    styleHumorous: 'Humorístico/Viral (Redes Sociales)',
    styleObjection: 'Rotura de Objeciones (Curar Dudas)',
    saveGenerate: 'Guardar y Generar Guion',
    teleprompter: 'Teleprompter', teleprompterPlaceholder: 'Su guion generado por IA aparecerá aquí...',
    characters: 'Caracteres', words: 'Palabras', speechTime: 'Tiempo est.',
    fillRequired: 'Rellene los campos obligatorios para habilitar el botón.',
    mediaMatrix: 'Matriz de Medios y Creativos',
    presenter: 'Presentador',
    presenterMale: 'Masculino', presenterFemale: 'Femenino',
    presenterOther: 'Otro (Personalizado)', presenterOtherPlaceholder: 'Ej: Cyborg Futurista',
    voiceTone: 'Tono de Voz de IA',
    voiceDeep: 'Voz Ultra-Grave de Impacto', voiceCorporate: 'Voz Corporativa y Didáctica',
    voiceNatural: 'Voz Natural con Pausas', voiceViral: 'Voz Rápida TikTok Viral',
    subtitleStyle: 'Matriz de Subtítulos Dinámicos',
    subtitleHormozi: 'Subtítulo Estilo Hormozi (Neon Pesado)',
    subtitleClean: 'Clean Executive (Montserrat)',
    subtitleCustom: 'Personalizado (Especificaciones libres)',
    subtitleCustomPlaceholder: 'Color, sombra, tamaño de fuente...',
    archetype: 'Arquetipo de Engagement',
    archViral: 'Viral (Ruptura de patrón)',
    archCorporate: 'Corporativo (High-Ticket)',
    archSexy: 'Sexy/Provocativo (Deseo y Status)',
    blackBoxTitle: 'VRTX Black Box - Insights Ocultos de Retención',
    blackBoxDetected: 'Nicho detectado',
    history: 'Historial', favorites: 'Favoritos', noHistory: 'Sin registros aún.',
    ebookTitle: 'Fábrica de E-books & Copys',
    ebookSubtitle: 'Genere estructuras completas de e-books, landing pages y activos de vídeo.',
    createEbook: 'Crear E-book', createLanding: 'Crear Landing Page',
    ebookTheme: 'Tema del E-book', ebookThemePlaceholder: 'Ej: Inversiones para Principiantes',
    ebookTone: 'Tono de Voz', toneFormal: 'Formal', toneCasual: 'Relajado', toneAggressive: 'Agresivo',
    generateStructure: 'Generar Estructura', summary: 'Sumario', chapters: 'capítulos',
    landingOffer: 'Oferta Principal', landingOfferPlaceholder: 'Ej: Curso completo por $297',
    generateLanding: 'Generar Landing Page', pageStructure: 'Estructura de Página',
    headline: 'Headline', pain: 'Dolor', benefits: 'Beneficios',
    testimonials: 'Testimonios', faq: 'FAQ', cta: 'CTA Final',
    prompts: 'Prompts', videoAssets: 'Activos de Vídeo', download: 'Descargar',
    dropTitle: 'Escáner de Proveedores & VRTX Spy Feed',
    dropSubtitle: 'Valide enlaces, mine creativos virales y espíe a la competencia.',
    linkValidator: 'Validador de Enlace', linkPlaceholder: 'https://aliexpress.com/item/xxxxx',
    mineCreatives: 'Minar Creativos', mining: 'Minando...',
    invalidLink: 'Enlace inválido. Use AliExpress, Shopee, Amazon o Mercado Libre.',
    productAnalysis: 'Análisis del Producto', tiktokHooks: 'Ganchos para TikTok',
    swotAnalysis: 'Análisis SWOT - Competencia Directa',
    strengths: 'Fortalezas', weaknesses: 'Debilidades', opportunities: 'Oportunidades', threats: 'Amenazas',
    spyFeed: 'VRTX Spy Feed', spyFeedSubtitle: 'Creativos virales en tiempo real',
    cloneCopy: 'Clonar Ingeniería de Copy',
    knowledgeBank: 'Activos y Enlaces de Alta Conversión',
    knowledgeBankSubtitle: 'Productos campeones listos para promoción',
    strategicTip: 'Consejo Estratégico del Experto',
    importStructure: 'Importar Estructura de Ventas',
    ctr: 'CTR', views: 'Views',
    landingBuilderTitle: 'Constructor de Landing Pages para Terceros',
    landingBuilderSubtitle: 'Gestione proyectos de clientes de su agencia.',
    newProject: 'Nuevo Proyecto', projectName: 'Nombre del Proyecto',
    sendPreview: 'Enviar Vista Previa', simulateAccept: 'Simular Aprobación del Cliente',
    draft: 'Borrador', published: 'Publicado',
    trafficTitle: 'Tráfico de Pago & Integración de Píxeles',
    trafficSubtitle: 'Almacene IDs de píxeles y monitoree métricas analíticas.',
    pixelId: 'ID del Píxel', pixelPlaceholder: 'Ej: 123456789012345',
    analytics: 'Analytics', cpa: 'CPA', roas: 'ROAS', cpc: 'CPC',
    senderTitle: 'Disparador Masivo Automatizado',
    senderSubtitle: 'Envíe mensajes masivos con retrasos anti-baneo.',
    selectChannel: 'Canal', whatsapp: 'WhatsApp', fbGroups: 'Grupos de Facebook',
    messageContent: 'Contenido del Mensaje', messagePlaceholder: 'Escriba su mensaje promocional...',
    startDispatch: 'Iniciar Disparo', dispatching: 'Disparando...',
    consoleLog: 'Consola de Logs',
    affiliatesTitle: 'Hub de Afiliados Expandido',
    affiliatesSubtitle: 'Gestione enlaces, comisiones y rendimiento por plataforma.',
    totalClicks: 'Clics Totales', totalCommission: 'Comisión Acumulada',
    affiliateLinks: 'Enlaces de Afiliado', generateLink: 'Generar Enlace', newLink: 'Generar Nuevo Enlace',
    selectProduct: 'Seleccione un producto...', partnership: 'Tipo de Asociación',
    affiliate: 'Afiliado', coproducer: 'Coproductor', commissionRate: 'Comisión',
    automationTitle: 'Centro de Publicaciones Automáticas',
    automationSubtitle: 'Configure el modo de publicación y gestione la cola de distribución.',
    postMode: 'Modo de Publicación', semiAuto: 'Semi-Automático', fullAuto: '100% Automático',
    reviewApprove: 'Revisión y Aprobación', videoPreview: 'Vista previa del vídeo generado',
    autoCaption: 'Leyenda generada automáticamente', approveSchedule: 'Aprobar y Programar',
    scheduling: 'Programando...', advancedConfig: 'Configuración Avanzada',
    frequency: 'Frecuencia diaria', perDay: 'x por día', peakTimes: 'Horarios pico',
    webhookUrl: 'URL del Webhook (Make/n8n)', webhookPlaceholder: 'https://hook.make.com/...',
    invalidWebhook: 'URL inválida. Use http o https.', activateAutomation: 'Activar Automatización',
    timeline: 'Línea de Tiempo', timelineSubtitle: 'Estado de automatizaciones',
    posted: 'Publicado', scheduled: 'Programado', processing: 'Procesando',
    subscriptionTitle: 'Gestionar Suscripción & Referidos',
    subscriptionSubtitle: 'Controle su plan, créditos de IA y programa de referidos.',
    currentPlan: 'Plan Actual', planBlack: 'Plan Black', planActive: 'Activo',
    annual: 'año', renewal: 'Renovación', viewInvoices: 'Ver Facturas', cancelPlan: 'Cancelar',
    aiCredits: 'Créditos de IA', creditsUsed: 'créditos utilizados',
    creditsRemaining: 'créditos restantes este ciclo.',
    creditsWarning: '¡Sus créditos se están agotando!',
    creditsWarningDesc: 'Considere actualizar para evitar interrupciones.',
    usageBreakdown: 'Desglose de uso', upgradeLimit: 'Ampliar Límite',
    buyExtraCredits: 'Comprar Créditos Extra',
    checkoutTitle: 'Checkout Rápido de Créditos',
    checkoutSubtitle: 'Paquete de 500 créditos extra',
    scarcityTimer: 'Oferta expira en',
    confirmPurchase: 'Confirmar Compra',
    referralProgram: 'Programa de Referidos',
    referralSubtitle: 'Comparta VRTX y gane créditos',
    referralLink: 'Su Enlace de Referido',
    referralDesc: 'Comparta VRTX. Si su referido se suscribe a cualquier plan de pago, gana +250 créditos de IA automáticamente.',
    simulateReferral: 'Simular Referido Aceptado',
    referralBonus: '¡+250 créditos añadidos!',
    securityTitle: 'Auditoría de Seguridad & Claves de API',
    securitySubtitle: 'Registre claves y monitoree la seguridad de su cuenta.',
    apiKeys: 'Claves de API', apiKeysDesc: 'Almacenadas localmente en su navegador',
    openaiKey: 'OpenAI API Key', geminiKey: 'Google Gemini API Key', tiktokKey: 'TikTok Developer Key',
    getKey: 'Obtener clave en', saveKeys: 'Guardar Claves', savedSuccess: '¡Guardado con éxito!',
    accountSecurity: 'Seguridad de Cuenta', twoFactor: 'Autenticación en 2 Factores',
    twoFactorDesc: 'Proteja su cuenta con 2FA vía app',
    activeSessions: 'Sesiones Activas', activeSessionsDesc: '3 dispositivos conectados',
    accessLogs: 'Logs de Acceso', accessLogsDesc: 'Último login: 17/07/2026 14:32',
    manage: 'Gestionar', viewLogs: 'Ver logs',
    securityTerminal: 'Terminal de Seguridad',
    securityTerminalDesc: 'Monitoreo de seguridad en tiempo real',
    keysLocalNote: 'Sus claves se almacenan solo en el estado local de esta sesión y nunca se envían a servidores externos.',
    adminTitle: 'Control del Sistema',
    adminSubtitle: 'Gestión de usuarios e inyección masiva de créditos.',
    adminBadge: 'MODO DESARROLLADOR - ACCESO TOTAL UNLOCKED',
    userControl: 'Control de Usuarios', injectCredits: 'Inyectar Créditos',
    injectCreditsDesc: 'Añada créditos a cualquier usuario del sistema',
    totalUsers: 'Usuarios Totales', totalCredits: 'Créditos en Circulación',
    chatbotName: 'VRTX_AI', chatbotOnline: 'En línea ahora',
    chatbotGreeting: '¡Hola! Soy VRTX_AI, tu asistente de escala. ¿Cómo puedo ayudar?',
    chatbotPlaceholder: 'Escribe tu mensaje...',
    chatbotTyping: 'VRTX_AI está escribiendo...',
    language: 'Idioma', theme: 'Tema', darkMode: 'Modo Oscuro', lightMode: 'Modo Claro',
  },
};
