// ===== VRTX Massive Seed Database =====
// Real high-conversion data to populate the application immediately.

export interface NicheSeed {
  id: string;
  name: string;
  category: 'Motores/Automotivo' | 'Estética/Skincare' | 'Finanças/Crypto' | 'Dropshipping Físico';
  teleprompterScript: string;
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  visualHooks: string[];
  emailCopies: { subject: string; body: string }[];
}

export const nicheSeeds: NicheSeed[] = [
  {
    id: 'n1',
    name: 'Motores/Automotivo',
    category: 'Motores/Automotivo',
    teleprompterScript: `🎬 ROTEIRO MOTORES — ALTA RETENÇÃO

[CENA 1 - GANCHO 0.4s]
🔊 Use ronco bruto nos primeiros 0.4 segundos. Som de escape esportivo cortando. Tela preta → explosão de luz amarela.

[CENA 2 - PROBLEMA 3s]
"Você gasta combustível à toa porque seu motor tá engasgado, sem resposta. Cada arrancada parece um suspiro, não um rugido."

[CENA 3 - SOLUÇÃO 7s]
"Apresento o TurboFlux X1: o módulo de otimização que libera 23% de potência real do seu motor. Instala em 8 minutos, sem mexer na garantia."

[CENA 4 - DEMONSTRAÇÃO 12s]
[Close no motor ligado antes: som fraco] → [Depois: ronco grave, acelerada limpa]
"Olha a diferença. Antes: motor engasgando. Depois: resposta instantânea no acelerador."

[CENA 5 - PROVA 18s]
"12.400 motoristas já instalaram. Avaliação 4.9 estrelas. Mecânicos recomendam."

[CENA 6 - OFERTA 22s]
"Por R$ 197 (de R$ 397) você leva o módulo + manual + suporte vitalício. Só hoje."

[CENA 7 - CTA 25s]
"👉 Clica no botão. Seu motor merece roncar de verdade."`,
    swot: {
      strengths: ['Produto físico com margem 4x', 'Nicho apaixonado e comprador', 'Conteúdo visual de alta viralidade (som de motor)', 'Ticket médio R$ 197'],
      weaknesses: ['Público cético com "milagres" de motor', 'Necessita prova em vídeo para converter', 'Sazonalidade: pico no verão'],
      opportunities: ['Poucos criativos nativos no TikTok para o nicho', 'Parcerias com influenciadores automotivos', 'Bundle com limpa-injetores', 'Mercado de carros antigos em crescimento'],
      threats: ['Concorrência com produtos genéricos mais baratos', 'Mudanças no Código de Trânsito', 'Plataformas podem barrar som de motor alto'],
    },
    visualHooks: [
      'Ronco bruto de escape nos primeiros 0.4s com tela preta → explosão amarela',
      'Close no conta-giros subindo com luz vermelha pulsante',
      'Antes/depois do som do motor em split-screen vertical',
      'Fumaça branca saindo do escapamento em câmera lenta',
      'Mão girando chave na ignição com som amplificado',
    ],
    emailCopies: [
      { subject: 'Seu motor tá engasgado? Isso resolve em 8 min', body: 'Olá! Se seu carro perdeu a arrancada e parece engasgar a cada acelerada, existe um motivo. O TurboFlux X1 libera 23% de potência real em 8 minutos. 12.400 motoristas já testaram. Garanta o seu com 50% OFF hoje: [LINK]' },
      { subject: 'Por que mecânicos não te contam isso', body: 'A maioria dos mecânicos cobra R$ 800+ pra "regular o motor". Mas o TurboFlux X1 faz a mesma otimização por R$ 197 e você instala sozinho. Veja como: [LINK]' },
      { subject: 'Última chance: 50% OFF expira à meia-noite', body: 'O TurboFlux X1 com 50% OFF sai do ar à meia-noite. Seu motor merece roncar de verdade. Clique agora: [LINK]' },
    ],
  },
  {
    id: 'n2',
    name: 'Estética/Skincare',
    category: 'Estética/Skincare',
    teleprompterScript: `🎬 ROTEIRO SKINCARE — RETENÇÃO EMOCIONAL

[CENA 1 - GANCHO 0.3s]
"Para tudo. Essa textura tá fazendo isso com a pele?" [Close em sérum dourado pingando]

[CENA 2 - DOR 3s]
"Você acorda, olha no espelho e vê aquela oleosidade no nariz, os poros dilatados, a macaquice de linhas de expressão surgindo cedo demais."

[CENA 3 - SOLUÇÃO 8s]
"Apresento o Sérum NiacinGlow 10%: niacinamida pura + ácido hialurônico. Controla oleosidade, minimiza poros e dá aquele glow que parece filtro."

[CENA 4 - DEMONSTRAÇÃO 15s]
[Aplicação no rosto: antes com brilho no nariz → depois com pele matte e glow]
"Olha o nariz: antes brilhando. Depois: matte por 8 horas. Sem filtro."

[CENA 5 - PROVA 20s]
"38.000 mulheres já usam. Dermatologistas recomendam. Sem parabenos, sem perfume, vegano."

[CENA 6 - OFERTA 24s]
"R$ 47 (de R$ 97). Frasco duplo pra 60 dias. Garantia de 30 dias."

[CENA 7 - CTA 27s]
"👉 Clica agora. Sua pele vai te agradecer."`,
    swot: {
      strengths: ['Ticket baixo (R$ 47) com alto volume', 'Nicho feminino comprador e recorrente', 'Conteúdo visual de alta conversão (before/after)', 'Recompra natural a cada 60 dias'],
      weaknesses: ['Mercado saturado de produtos similares', 'Exige prova visual forte (before/after)', 'Sensível a críticas de dermatologistas'],
      opportunities: ['TikTok tem baixa saturação de niacinamida em PT-BR', 'Bundle com protetor solar', 'Programa de assinatura recorrente', 'Influenciadoras de micro-nicho convertem bem'],
      threats: ['Marcas grandes com orçamento de mídia', 'Plataformas barram claims de "clareamento"', 'Falsificações no Mercado Livre'],
    },
    visualHooks: [
      'Close em sérum dourado pingando na pele com luz lateral',
      'Before/after do nariz brilhante → matte em split-screen',
      'Textura do produto espalhando em câmera lenta macro',
      'Mão aplicando no dorso com glow imediato',
      'Comparação de poros antes/depois com lente macro',
    ],
    emailCopies: [
      { subject: 'Aquela oleosidade no nariz? Acabou', body: 'Você acorda e o nariz já tá brilhando. O Sérum NiacinGlow 10% controla oleosidade por 8 horas e minimiza poros. 38.000 mulheres já usam. R$ 47 hoje: [LINK]' },
      { subject: 'Dermatologistas não querem que você saiba disso', body: 'Niacinamida 10% faz o trabalho de cremes de R$ 300 por uma fração do preço. O NiacinGlow é vegano, sem parabenos e com garantia de 30 dias. Peça já: [LINK]' },
      { subject: 'Últimas 50 unidades com 50% OFF', body: 'O NiacinGlow com 50% OFF está acabando. Sua pele matte e com glow te espera. Clique: [LINK]' },
    ],
  },
  {
    id: 'n3',
    name: 'Finanças/Crypto',
    category: 'Finanças/Crypto',
    teleprompterScript: `🎬 ROTEIRO CRYPTO — AUTORIDADE E ESCASSEZ

[CENA 1 - GANCHO 0.5s]
"Se você tem R$ 100 sobrando, para tudo e escuta isso." [Gráfico de velas subindo em verde neon]

[CENA 2 - DOR 4s]
"Você vê o Bitcoin subir, vê o Ethereum explodir, e fica só olhando. Porque ninguém te ensinou o caminho seguro de começar com pouco."

[CENA 3 - SOLUÇÃO 9s]
"Apresento o Método CryptoStart: 7 aulas que te levam do zero ao primeiro aporte em 5 dias. Sem jargão, sem promessa de lambo, só estratégia de risco controlado."

[CENA 4 - PROVA 16s]
"4.200 alunos. Retorno médio de 18% no primeiro trimestre. Depoimentos reais na tela."

[CENA 5 - OFERTA 22s]
"R$ 97 (de R$ 497). Acesso vitalício + grupo VIP + planilha de gestão de risco."

[CENA 6 - GATILHO 26s]
"Vagas limitadas. Quando fechar 200, o preço volta. Timer rodando."

[CENA 7 - CTA 30s]
"👉 Clica agora. O próximo ciclo de alta não vai esperar você."`,
    swot: {
      strengths: ['Ticket R$ 97 com margem quase 100%', 'Infoproduto escalável', 'Nicho com alto interesse e urgência', 'Receita recorrente com upsell de mentoria'],
      weaknesses: ['Mercado desconfiado por golpes', 'Plataformas barram promessas de ganho', 'Exige autoridade e prova social forte'],
      opportunities: ['Ciclos de alta geram picos de demanda', 'Poucos cursos em PT-BR com didática real', 'Bundle com planilha de gestão', 'Comunidade VIP como upsell recorrente'],
      threats: ['Regulação crescente em cripto', 'Quedas de mercado reduzem demanda', 'Concorrentes com orçamento de mídia alto'],
    },
    visualHooks: [
      'Gráfico de velas subindo em verde neon com zoom agressivo',
      'Número do saldo subindo em tempo real na tela',
      'Print de depoimentos reais com nomes borrados parcialmente',
      'Timer regressivo vermelho pulsando no canto',
      'Mão digitando valor de aporte em calculadora do celular',
    ],
    emailCopies: [
      { subject: 'Você deixou R$ 2.400 na mesa esse mês', body: 'Enquanto você hesitava, o Bitcoin subiu 18%. O Método CryptoStart te ensina a entrar com R$ 100 e gerenciar risco. 4.200 alunos. R$ 97 hoje: [LINK]' },
      { subject: 'O próximo ciclo de alta não vai esperar', body: 'Quando o mercado acorda, quem já estudou lucra. O CryptoStart te leva do zero ao primeiro aporte em 5 dias. Vagas limitadas: [LINK]' },
      { subject: 'Timer rodando: 50% OFF expira hoje', body: 'O Método CryptoStart com 50% OFF sai do ar à meia-noite. Acesso vitalício + grupo VIP + planilha de risco. Clique: [LINK]' },
    ],
  },
  {
    id: 'n4',
    name: 'Dropshipping Físico',
    category: 'Dropshipping Físico',
    teleprompterScript: `🎬 ROTEIRO DROPSHIPPING FÍSICO — UNBOXING VIRAL

[CENA 1 - GANCHO 0.3s]
"Esse produto custa R$ 19 e vende por R$ 89. Olha o porquê." [Unboxing ASMR com som amplificado]

[CENA 2 - DOR 3s]
"Você quer começar a vender online mas acha que precisa de estoque, CNPJ e R$ 5.000. Mentira."

[CENA 3 - SOLUÇÃO 8s]
"Apresento o Kit DropStart: 12 produtos campeões já validados + fornecedores + criativos prontos. Você só conecta o pixel e dispara."

[CENA 4 - DEMONSTRAÇÃO 15s]
[Tela dividida: produto no AliExpress R$ 19 → anúncio pronto R$ 89 → venda caindo no painel]
"R$ 19 de custo. R$ 89 de venda. Margem de 70%. Sem tocar no produto."

[CENA 5 - PROVA 20s]
"2.800 lojas ativas. Ticket médio R$ 89. ROAS médio 3.2x."

[CENA 6 - OFERTA 24s]
"R$ 697 (de R$ 1.497). Kit completo + suporte 90 dias + grupo de fornecedores."

[CENA 7 - CTA 28s]
"👉 Clica no botão. Sua primeira venda pode sair hoje."`,
    swot: {
      strengths: ['Ticket R$ 697 com alta margem', 'Produto digital + físico = escalável', 'Nicho de empreendedores em crescimento', 'ROAS comprovado de 3.2x'],
      weaknesses: ['Público cético com "ganhe dinheiro online"', 'Exige prova de vendas reais', 'Suporte pós-venda demanda estrutura'],
      opportunities: ['TikTok Ads com baixo CPM em PT-BR', 'Bundle com mentoria de tráfego', 'Comissão recorrente de fornecedores', 'Mercado de dropshipping em alta no Brasil'],
      threats: ['Plataformas barram claims de ganho', 'Concorrentes com preços menores', 'Mudanças em políticas de importação'],
    },
    visualHooks: [
      'Unboxing ASMR com som de caixa rasgando amplificado',
      'Tela dividida: custo R$ 19 → venda R$ 89 em tempo real',
      'Painel de vendas com notificações caindo em sequência',
      'Close no produto com luz de estúdio premium',
      'Gráfico de ROAS subindo de 1x para 3.2x animado',
    ],
    emailCopies: [
      { subject: 'R$ 19 de custo, R$ 89 de venda. Olha isso', body: 'O Kit DropStart tem 12 produtos já validados com margem de 70%. Você só conecta o pixel e dispara. 2.800 lojas ativas. R$ 697 hoje: [LINK]' },
      { subject: 'Sua primeira venda pode sair hoje', body: 'Sem estoque, sem CNPJ, sem R$ 5.000. O Kit DropStart entrega produtos, fornecedores e criativos prontos. ROAS médio 3.2x. Clique: [LINK]' },
      { subject: 'Últimas vagas com 50% OFF', body: 'O Kit DropStart com 50% OFF sai do ar à meia-noite. Suporte 90 dias + grupo de fornecedores incluídos. Garanta: [LINK]' },
    ],
  },
];

// ===== Seed: 15 Transactions =====

export interface SeedTransaction {
  id: string;
  client: string;
  type: string;
  channel: string;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

export const seedTransactions: SeedTransaction[] = [
  { id: 'st1', client: 'João Mendes', type: 'Curso CryptoStart', channel: 'Hotmart', amount: 97, date: '19/07/2026', status: 'success' },
  { id: 'st2', client: 'Ana Paula', type: 'Sérum NiacinGlow', channel: 'Kiwify', amount: 47, date: '19/07/2026', status: 'success' },
  { id: 'st3', client: 'Carlos Silva', type: 'Kit DropStart', channel: 'Hotmart', amount: 697, date: '18/07/2026', status: 'success' },
  { id: 'st4', client: 'Mariana Lima', type: 'TurboFlux X1', channel: 'Shopee', amount: 197, date: '18/07/2026', status: 'success' },
  { id: 'st5', client: 'Pedro Costa', type: 'Curso CryptoStart', channel: 'Hotmart', amount: 97, date: '17/07/2026', status: 'success' },
  { id: 'st6', client: 'Fernanda Rocha', type: 'Sérum NiacinGlow', channel: 'Kiwify', amount: 47, date: '17/07/2026', status: 'success' },
  { id: 'st7', client: 'Rafael Dias', type: 'Kit DropStart', channel: 'Hotmart', amount: 697, date: '16/07/2026', status: 'success' },
  { id: 'st8', client: 'Juliana Souza', type: 'TurboFlux X1', channel: 'Shopee', amount: 197, date: '16/07/2026', status: 'success' },
  { id: 'st9', client: 'Bruno Alves', type: 'Curso CryptoStart', channel: 'Hotmart', amount: 97, date: '15/07/2026', status: 'success' },
  { id: 'st10', client: 'Camila Reis', type: 'Sérum NiacinGlow', channel: 'Kiwify', amount: 47, date: '15/07/2026', status: 'success' },
  { id: 'st11', client: 'Diego Martins', type: 'Kit DropStart', channel: 'Hotmart', amount: 697, date: '14/07/2026', status: 'success' },
  { id: 'st12', client: 'Larissa Gomes', type: 'TurboFlux X1', channel: 'Shopee', amount: 197, date: '14/07/2026', status: 'success' },
  { id: 'st13', client: 'Thiago Nunes', type: 'Curso CryptoStart', channel: 'Hotmart', amount: 97, date: '13/07/2026', status: 'success' },
  { id: 'st14', client: 'Beatriz Castro', type: 'Sérum NiacinGlow', channel: 'Kiwify', amount: 47, date: '13/07/2026', status: 'success' },
  { id: 'st15', client: 'Vinícius Lima', type: 'Kit DropStart', channel: 'Hotmart', amount: 697, date: '12/07/2026', status: 'success' },
];

// ===== Seed: 3 Spy Creatives (detailed) =====

export interface SeedSpyCreative {
  id: string;
  product: string;
  niche: string;
  ctr: number;
  cpc: number;
  views: number;
  clicks: number;
  duration: string;
  hook: string;
  adText: string;
  copyStructure: string;
}

export const seedSpyCreatives: SeedSpyCreative[] = [
  {
    id: 'ssc1',
    product: 'TurboFlux X1 — Módulo de Potência',
    niche: 'Motores/Automotivo',
    ctr: 3.8,
    cpc: 0.24,
    views: 1840000,
    clicks: 69920,
    duration: '00:26',
    hook: '🔊 Seu motor tá engasgado? Isso resolve em 8 minutos...',
    adText: '🚨 Para tudo! Se seu carro perdeu a arrancada e parece engasgar a cada acelerada, existe um motivo. O TurboFlux X1 libera 23% de potência real em 8 minutos, sem mexer na garantia. 12.400 motoristas já instalaram. R$ 197 (de R$ 397) só hoje. Clique agora.',
    copyStructure: 'Ronco bruto 0.4s → Dor do motor engasgado → Solução TurboFlux → Demo antes/depois → Prova 12.400 installs → Oferta R$ 197 → CTA com escassez',
  },
  {
    id: 'ssc2',
    product: 'Sérum NiacinGlow 10%',
    niche: 'Estética/Skincare',
    ctr: 4.2,
    cpc: 0.18,
    views: 2310000,
    clicks: 97020,
    duration: '00:27',
    hook: '💧 Essa textura tá fazendo isso com a pele? Olha o nariz...',
    adText: 'Para tudo. Essa textura tá fazendo isso com a pele? O Sérum NiacinGlow 10% controla oleosidade por 8 horas e minimiza poros. 38.000 mulheres já usam. Vegano, sem parabenos. R$ 47 (de R$ 97) com garantia de 30 dias. Clica agora.',
    copyStructure: 'Gancho de textura 0.3s → Dor da oleosidade → Solução NiacinGlow → Demo before/after nariz → Prova 38k mulheres → Oferta R$ 47 → CTA emocional',
  },
  {
    id: 'ssc3',
    product: 'Método CryptoStart',
    niche: 'Finanças/Crypto',
    ctr: 2.9,
    cpc: 0.31,
    views: 1420000,
    clicks: 41180,
    duration: '00:30',
    hook: '📈 Se você tem R$ 100 sobrando, para tudo e escuta isso...',
    adText: 'Se você tem R$ 100 sobrando, para tudo e escuta isso. Você vê o Bitcoin subir e fica só olhando porque ninguém te ensinou o caminho seguro. O Método CryptoStart te leva do zero ao primeiro aporte em 5 dias. 4.200 alunos. R$ 97 (de R$ 497). Vagas limitadas. Clica agora.',
    copyStructure: 'Gancho de R$ 100 0.5s → Dor de ficar de fora → Solução CryptoStart → Prova 4.200 alunos → Oferta R$ 97 → Timer de escassez → CTA urgência',
  },
];
