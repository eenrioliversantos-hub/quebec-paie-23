import { BlogArticleData } from '@/lib/admin-store';

export const CATALOG_ARTICLES: BlogArticleData[] = [
  // ==========================================
  // CATEGORIA 1: CÁLCULOS MANUAIS & FÓRMULAS FISCAIS
  // ==========================================
  {
    id: 'como-calcular-salario-liquido-manualmente',
    slug: 'como-calcular-salario-liquido-quebec-manualmente',
    category: 'calculos-manuais',
    readTime: '9 min',
    date: 'Édition Fiscale 2026',
    published: true,
    viewsCount: 3820,
    isFeaturedHero: true,
    isHot: true,
    imageUrl: 'https://picsum.photos/seed/quebectax2026/800/450',
    tableData: {
      headers: ['Rubrica Oficial', 'Alíquota 2026', 'Teto Máximo Anual', 'Destinação do Fundo'],
      rows: [
        ['RRQ de Base', '6,40%', 'MGA $73.200 (isenção $3.500)', 'Retraite Québec (Aposentadoria)'],
        ['RRQ Suplementar', '4,00%', 'MGS $85.600', 'Segunda camada de proteção'],
        ['RQAP Parental', '0,494%', 'Máximo $98.000', 'Maternidade / Paternidade'],
        ['Segurança-Desemprego (AE)', '1,32%', 'MRA $65.700', 'Assurance-emploi federal reduzida'],
        ['Abattement Fédéral QC', '-16,50%', 'Sem limite (Crédito direito)', 'Desconto federal concedido ao Québec'],
      ],
      caption: 'Barèmes Oficiais de Retenção na Fonte Revenu Québec & ARC 2026',
    },
    searchIntent: 'informational',
    targetKeyword: 'como calcular salario liquido quebec manual calcul formula',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Trabalhadores, Contadores & Estudantes',
      fr: 'Salariés, Comptables & Étudiants',
      en: 'Workers, Accountants & Students',
    },
    communicationTone: {
      pt: 'Técnico, Didático e 100% Preciso',
      fr: 'Technique, Didactique et Conforme',
      en: 'Technical, Step-by-Step & Verified',
    },
    relatedArticleIds: ['tutorial-passo-a-passo-calculador-salario-liquido', 'calculo-manual-interprovincial-quebec-vs-canada', 'comprendre-talon-paie'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Como Calcular o Salário Líquido no Québec Manualmente (Barèmes Oficiais 2026)',
      fr: 'Comment Calculer son Salaire Net au Québec Manuellement (Barèmes 2026 Pas à Pas)',
      en: 'How to Manually Calculate Quebec Net Salary Step-by-Step (2026 Tax Brackets)',
    },
    excerpt: {
      pt: 'Aprenda o passo a passo matemático exato para calcular seu salário líquido: faixas provinciais e federais, RRQ base e suplementar, RQAP, seguro-desemprego e o Abattement federal de 16,5%.',
      fr: 'Guide mathématique intégral pour calculer votre paie nette à la main : paliers Revenu Québec et ARC, RRQ supplémentaire, RQAP, AE et l’abattement provincial de 16,5 %.',
      en: 'Master the manual tax math behind your Quebec payslip: provincial brackets, federal brackets, QPP enhanced, QPIP, EI and the 16.5% Quebec Abatement.',
    },
    content: {
      pt: [
        'Calcular o salário líquido no Québec sem depender de softwares proprietários exige compreender como o governo provincial (Revenu Québec) e o federal (CRA/ARC) interagem.',
        '1. Rendimento Bruto Anual e Deduções Admissíveis: Inicie calculando o rendimento bruto tributável. Subtraia contribuições como REER/RPDB e despesas com sindicato antes de aplicar as faixas.',
        '2. Imposto Provincial do Québec: Aplique as alíquotas marginais de 2026 (14% até $51.780, 19% até $103.545, 24% até $126.000 e 25,75% acima). Em seguida, deduza o Crédito Pessoal Básico ($18.571 × 14% = $2.600 de desconto direto).',
        '3. Imposto Federal com Abattement de 16,5%: Calcule o imposto federal (15% a 33%) e aplique a redução automática de 16,5% exclusiva de quem reside no Québec (Artigo 120 da Lei do Imposto de Renda do Canadá).',
        '4. Encargos Sociais Públicos: Calcule o RRQ (6,40% sobre a faixa entre a isenção de $3.500 e o teto MGA de $73.200, mais 4% no segundo teto MGS até $85.600), o RQAP (0,494% até $98.000) e o Seguro-Desemprego AE (1,32% até $65.700).',
        'Você pode auditar cada centavo deste cálculo na nossa calculadora oficial sem fazer nenhuma conta na mão. Use o botão abaixo para rodar o algoritmo instantaneamente com o contracheque completo em cascata.',
      ],
      fr: [
        'Le calcul manuel du salaire net au Québec demande de combiner les règles distinctes de Revenu Québec et de l’Agence du revenu du Canada (ARC).',
        '1. Revenu brut imposable : Multipliez votre taux horaire par vos heures annuelles (ex: 40h × 52 = 2 080h). Déduisez les cotisations REER déductibles.',
        '2. Impôt provincial : Appliquez les tranches d’imposition 2026 (14%, 19%, 24% et 25,75%) et déduisez le crédit personnel de base de 18 571 $ multiplié par 14 %.',
        '3. Impôt fédéral et Abattement de 16,5 % : Calculez l’impôt fédéral de base puis retranchez 16,5 % en raison du statut fiscal autonome du Québec.',
        '4. Cotisations sociales : Intégrez le RRQ de base (6,40 %) et le RRQ supplémentaire (4,0 %), le RQAP (0,494 %) et l’assurance-emploi à taux réduit québécois (1,32 %).',
        'Testez cette formule en direct et vérifiez vos retenues à la source grâce à notre calculateur de salaire en cascade.',
      ],
      en: [
        'Manually calculating Quebec net pay requires balancing both Revenu Québec and Canada Revenue Agency (CRA) payroll formulas.',
        '1. Gross taxable earnings: Base hourly rate multiplied by regular annual hours, subtracting pretax deductions like registered pensions.',
        '2. Quebec provincial tax: Calculated across four progressive brackets with the 2026 basic personal amount tax credit ($18,571 × 14%).',
        '3. Federal tax with the 16.5% Quebec Abatement: Federal baseline tax reduced by 16.5% due to Quebec funding its own social services.',
        '4. Public contributions: QPP base (6.40%) + enhanced tier 2 (4%), QPIP parental insurance (0.494%), and discounted Quebec EI (1.32%).',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Fórmula Oficial do Salário Líquido no Québec',
        fr: 'Formule Officielle du Salaire Net Québécois',
        en: 'Official Quebec Net Pay Formula',
      },
      formula: 'Salário Líquido = Bruto - (Imp. QC - Créditos) - [(Imp. Federal - Créditos) × 0,835] - RRQ - RQAP - AE - Benefícios',
      variables: {
        pt: [
          'Bruto: Salário base + Horas extras + Adicionais de turno',
          'Imp. QC: Faixas provinciais (14% a 25,75%) menos Crédito Pessoal ($2.600)',
          '0,835: Fator de redução do Abatimento Federal de 16,5% (1 - 0,165)',
          'RRQ: 6,40% (base) + 4,00% (segundo teto MGS)',
          'RQAP: 0,494% | AE: 1,32%',
        ],
        fr: [
          'Brut : Taux horaire × heures + primes de quart',
          'Impôt QC : Taux progressifs 14 % à 25,75 % moins crédits',
          '0,835 : Facteur d’abattement fédéral de 16,5 %',
          'RRQ : 6,40 % base + 4,00 % bonification',
          'RQAP : 0,494 % | AE : 1,32 %',
        ],
        en: [
          'Gross: Base rate × hours + shift premiums',
          'QC Tax: Progressive brackets minus basic credit',
          '0.835: Federal 16.5% Quebec abatement factor (1 - 0.165)',
          'QPP: 6.40% base + 4.00% tier 2 enhanced',
          'QPIP: 0.494% | EI: 1.32%',
        ],
      },
      numericalExample: {
        pt: 'Exemplo prático ($25/h, 40h/sem = $52.000 bruto): Líquido anual = ~$40.185 | Quinzenal = ~$1.545,58 líquido (retirada de 22,7% em deduções totais).',
        fr: 'Exemple concret (25 $/h, 40h/sem = 52 000 $ brut) : Net annuel = ~40 185 $ | Paie aux deux semaines = ~1 545,58 $ net.',
        en: 'Example ($25/hr, 40 hrs/wk = $52,000 gross): Annual Net = ~$40,185 | Biweekly Net = ~$1,545.58 (22.7% total deductions).',
      },
    },
    officialSources: [
      {
        title: 'Guide des retenues à la source et des cotisations (TP-1015.G)',
        url: 'https://www.revenuquebec.ca',
        authority: 'Revenu Québec',
      },
      {
        title: 'Formules pour le calcul des retenues sur la paie (T4127)',
        url: 'https://www.canada.ca/fr/agence-revenu.html',
        authority: 'Agence du revenu du Canada (ARC)',
      },
    ],
    ctaTool: 'net-calc',
    ctaToolLabel: {
      pt: 'Testar Fórmula no Calculador de Salário Líquido',
      fr: 'Vérifier mon salaire net sur le calculateur officiel',
      en: 'Run this calculation in the Live Net Calculator',
    },
  },

  {
    id: 'como-calcular-horas-extras-cnesst',
    slug: 'como-calcular-horas-extras-cnesst-quebec',
    category: 'calculos-manuais',
    readTime: '7 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2950,
    isHot: true,
    imageUrl: 'https://picsum.photos/seed/cnesstovertime/800/450',
    searchIntent: 'informational',
    targetKeyword: 'como calcular horas extras quebec cnesst majoration 1.5',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Trabalhadores Industriais & Operários',
      fr: 'Ouvriers & Travailleurs de Quart',
      en: 'Shift & Industrial Workers',
    },
    communicationTone: {
      pt: 'Claro, Defensivo de Direitos e Factual',
      fr: 'Précis, Juridique et Pratique',
      en: 'Clear, Legal & Practical',
    },
    relatedArticleIds: ['cnesst-normes-travail', 'como-calcular-salario-liquido-manualmente'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Cálculo Manual de Horas Extras e Majoração de 50% (Normas CNESST Québec)',
      fr: 'Calcul Manuel des Heures Supplémentaires et Majoration de 50 % (Normes CNESST)',
      en: 'Manual Overtime Calculation: CNESST 1.5x Rules and Real Net Retention',
    },
    excerpt: {
      pt: 'Entenda a regra da semana de 40 horas no Québec, como calcular o adicional de 1,5x ou 2,0x e por que o imposto não devora todo o valor das horas extras.',
      fr: 'Comprenez la semaine normale de 40 heures, le calcul de la majoration de 50 % et pourquoi l’impôt ne mange pas tout votre gain supplémentaire.',
      en: 'Understand the statutory 40-hour workweek, 1.5x majoration math, and the truth about overtime taxation in Quebec.',
    },
    content: {
      pt: [
        'A Lei das Normas do Trabalho do Québec (Loi sur les normes du travail, artigo 52) estabelece que a semana normal de trabalho para a grande maioria dos assalariados é de 40 horas.',
        '1. Majoração de 50% (Taxa 1,5x): Toda hora trabalhada além de 40 horas na mesma semana de trabalho deve ser remunerada com acréscimo mínimo de 50% sobre o salário horário regular.',
        '2. Banco de Horas (Banque d’heures): O empregador só pode substituir o pagamento em dinheiro por folgas compensatórias se houver acordo mútuo por escrito, mantendo o multiplicador de 1,5h de folga por hora extra trabalhada.',
        '3. Mito Fiscal das Horas Extras: Muitos operários acreditam que trabalhar hora extra não compensa porque o governo levaria tudo. Isso é um erro conceitual! O Canadá e o Québec utilizam alíquotas fiscais marginais progressivas. A hora extra apenas é tributada na sua faixa marginal corrente; você nunca recebe menos líquido do que antes.',
        'Simule o impacto de 4h, 8h ou 12h extras semanais e veja quanto cai líquido no bolso no nosso simulador de horas extras.',
      ],
      fr: [
        'Au Québec, la Loi sur les normes du travail (article 52) fixe la semaine normale de travail à 40 heures pour la plupart des employés.',
        '1. Majoration de 50 % : Toute heure travaillée au-delà de 40 heures au cours d’une même semaine doit être payée avec une majoration minimale de 50 % (taux et demi).',
        '2. Remplacement par un congé : Les heures supplémentaires peuvent être converties en congé payé uniquement à la demande du travailleur ou par convention, à raison de 1,5 heure de congé par heure supplémentaire.',
        '3. La réalité fiscale : Vos heures supplémentaires sont imposées selon votre taux marginal d’imposition. Elles ne vous font jamais perdre d’argent net.',
      ],
      en: [
        'Under Quebec labour standards (Act respecting labour standards, s. 52), the standard workweek is 40 hours.',
        'Overtime worked past 40 hours must be paid at time and a half (1.5x the regular wage).',
        'Overtime is taxed only at your current marginal tax bracket, meaning overtime pay always increases your take-home pay.',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Fórmula de Horas Extras CNESST',
        fr: 'Formule des Heures Supplémentaires CNESST',
        en: 'CNESST Overtime Formula',
      },
      formula: 'Remuneração Semanal = (Horas Regulares × Taxa) + (Horas Extras × Taxa × 1,5)',
      variables: {
        pt: ['Horas Regulares: Máximo de 40 horas semanais', 'Taxa: Salário horário base', 'Horas Extras: Horas acima de 40 na semana'],
        fr: ['Heures régulières : Maximum 40h', 'Taux : Salaire horaire normal', 'Heures sup : Heures au-delà de 40h'],
        en: ['Regular hours: Up to 40 hrs/wk', 'Rate: Base hourly rate', 'Overtime: Hours beyond 40 hrs/wk'],
      },
      numericalExample: {
        pt: 'Trabalhador a $26/h que faz 48h (8h extras): 40h × $26 = $1.040 + 8h × ($26 × 1,5 = $39) = $312 extras. Bruto semanal total = $1.352 CAD.',
        fr: 'Exemple (26 $/h avec 48h travaillées) : 40h × 26 $ = 1 040 $ + 8h × 39 $ = 312 $. Brut hebdomadaire total = 1 352 $ CAD.',
        en: 'Example ($26/hr, 48 hrs worked): 40 hrs × $26 = $1,040 + 8 hrs × $39 = $312 overtime. Total gross = $1,352 CAD.',
      },
    },
    officialSources: [
      {
        title: 'Normes du travail : Heures supplémentaires et taux majoré',
        url: 'https://www.cnesst.gouv.qc.ca',
        authority: 'CNESST',
      },
    ],
    ctaTool: 'overtime',
    ctaToolLabel: {
      pt: 'Calcular Horas Extras no Simulador Dedicado',
      fr: 'Simuler mes heures supplémentaires en direct',
      en: 'Calculate Overtime Pay in the Overtime Tool',
    },
  },

  {
    id: 'como-comparar-duas-ofertas-de-emprego',
    slug: 'como-comparar-duas-ofertas-de-emprego-pacote-total',
    category: 'calculos-manuais',
    readTime: '8 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2180,
    searchIntent: 'informational',
    targetKeyword: 'como comparar ofertas de emprego salario compensacao total quebec',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Profissionais em Busca de Emprego & Transição',
      fr: 'Candidats & Professionnels en Recrutement',
      en: 'Job Seekers & Negotiators',
    },
    communicationTone: {
      pt: 'Estratégico, Analítico e Orientado a Resultados',
      fr: 'Stratégique, Financier et Concret',
      en: 'Strategic, Financial & Result-Driven',
    },
    relatedArticleIds: ['tutorial-passo-a-passo-criador-curriculo-ats', 'como-calcular-salario-liquido-manualmente'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Como Comparar 2 Ofertas de Emprego no Papel: Salário Bruto vs Pacote Real de Benefícios',
      fr: 'Comparer 2 Offres d’Emploi : Salaire Brut vs Rémunération Globale Réelle',
      en: 'Comparing Two Job Offers: Why Gross Hourly Rate Is Deceiving',
    },
    excerpt: {
      pt: 'Um salário de $30/h nem sempre ganha de um de $26/h quando você calcula adicionais de turno, seguro saúde coletivo e contrapartida de REER da empresa.',
      fr: 'Un salaire de 30 $/h ne rapporte pas toujours plus que 26 $/h avec primes de quart, assurances collectives payées et cotisation REER de l’employeur.',
      en: 'A $30/hr offer can yield less net cash and wealth than a $26/hr offer with employer match and benefits.',
    },
    content: {
      pt: [
        'Ao receber duas propostas de emprego no mercado canadense, focar exclusivamente no valor por hora é o erro mais comum cometido por imigrantes e trabalhadores locais.',
        '1. Adicionais de Turno (Primes de quart): Trabalhar em turno noturno ou fim de semana pode acrescentar de $1,50 a $3,50 por hora direta, o que equivale a um aumento de $3.120 a $7.280 anuais.',
        '2. Seguro Saúde e Odontológico Coletivo: Se a Oferta A exige que você pague $65 quinzenais pelo seguro coletivo e a Oferta B paga 100% da cobertura, você tem $1.690 a mais de líquido na Oferta B.',
        '3. Match de Previdência REER/RPDB: Uma empresa que oferece contrapartida de 4% sobre o salário bruto deposita dinheiro 100% gratuito e livre de impostos na sua conta previdenciária.',
        'Compare as duas propostas no nosso Comparador de Vagas com veredito fiscal imediato.',
      ],
      fr: [
        'Comparer deux offres d’emploi au Québec implique de calculer la rémunération globale et non seulement le taux horaire de base.',
        '1. Primes de quart de soir ou de nuit : Elles ajoutent souvent 2 $ à 4 $ par heure directement sur votre paie.',
        '2. Assurances collectives : La part payée par l’employeur a un impact direct sur le montant net perçu chaque quinzaine.',
        '3. Régime de retraite et abondement REER : L’argent gratuit versé par l’employeur augmente considéravelmente votre patrimoine annuel.',
      ],
      en: [
        'Total compensation in Canada extends far beyond base wage: shift premiums, employer-paid medical coverage, and RRSP matching radically alter real net earnings.',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Equação de Compensação Global Real',
        fr: 'Formule de Rémunération Globale',
        en: 'Total Compensation Formula',
      },
      formula: 'Compensação Real = Salário Líquido + Match REER Empresa + Valor Seguro Coletivo + Bônus',
      variables: {
        pt: ['Salário Líquido: Dinheiro depositado na conta', 'Match REER: Contribuição patronal gratuita', 'Valor Seguro: Despesas médicas economizadas'],
        fr: ['Net déposé : Argent en compte', 'Abondement REER : Cotisation employeur', 'Assurances : Dépenses de santé épargnées'],
        en: ['Take-home cash: Deposited salary', 'RRSP Match: Free employer contributions', 'Insurance: Health costs covered'],
      },
      numericalExample: {
        pt: 'Oferta A ($29/h sem REER) = $44.800 líquido | Oferta B ($26/h com 5% REER + seguro pago) = $42.200 líquido + $2.704 REER + $1.500 seguro = $46.404 de valor real.',
        fr: 'Offre A (29 $/h sans avantages) = 44 800 $ net | Offre B (26 $/h avec 5 % REER et assurances) = 46 404 $ de rémunération globale.',
        en: 'Offer A ($29/hr bare) = $44,800 net | Offer B ($26/hr with 5% RRSP + insurance) = $46,404 total compensation package.',
      },
    },
    officialSources: [
      {
        title: 'Retraite Québec : Les régimes complémentaires de retraite (RCR)',
        url: 'https://www.retraitequebec.gouv.qc.ca',
        authority: 'Retraite Québec',
      },
    ],
    ctaTool: 'compare-jobs',
    ctaToolLabel: {
      pt: 'Colocar as 2 Ofertas no Comparador de Vagas',
      fr: 'Comparer 2 offres sur le comparateur officiel',
      en: 'Run Head-to-Head Comparison Tool',
    },
  },

  {
    id: 'calculo-manual-aumento-salarial',
    slug: 'como-calcular-aumento-salarial-faixas-fiscais-quebec',
    category: 'calculos-manuais',
    readTime: '6 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 1980,
    searchIntent: 'informational',
    targetKeyword: 'como calcular aumento salarial imposto margens quebec',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Trabalhadores Negociando Aumento',
      fr: 'Salariés en Négociation Salariale',
      en: 'Professionals Negotiating Raises',
    },
    communicationTone: {
      pt: 'Esclarecedor e Motivador',
      fr: 'Éclairant et Pédagogique',
      en: 'Clear and Practical',
    },
    relatedArticleIds: ['como-calcular-salario-liquido-manualmente', 'comprendre-talon-paie'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Aumento Salarial e as Faixas Marginais: Quanto Realmente Sobra no Seu Bolso?',
      fr: 'Augmentation de Salaire et Paliers Marginaux : Combien Reste-t-il Vraiment ?',
      en: 'Salary Raise Simulator: How Much Net Cash Does a Raise Really Add?',
    },
    excerpt: {
      pt: 'Desmistificamos o mito de que um aumento de salário pode fazer você ganhar menos líquido por causa das faixas de imposto no Québec.',
      fr: 'Démystifiez la fausse croyance selon laquelle une augmentation pourrait réduire votre salaire net en changeant de palier.',
      en: 'Debunking the tax bracket trap: mathematical proof that raises always increase your net pay.',
    },
    content: {
      pt: [
        'Existe um boato recorrente entre trabalhadores no Canadá: "Se eu aceitar esse aumento de $3.000, vou pular para a próxima faixa de imposto e acabar recebendo menos líquido do que antes".',
        'Isso é matematicamente impossível no sistema tributário canadense e quebequense! Nosso regime é estritamente progressivo marginal.',
        'Apenas os dólares que ultrapassam o limite da faixa anterior são tributados pela nova alíquota mais alta. Todo o dinheiro ganho antes continua sujeito às alíquotas inferiores.',
        'Use nosso Simulador de Aumento Salarial para calcular a retenção líquida exata da sua negociação.',
      ],
      fr: [
        'Une croyance populaire prétend qu’une augmentation de salaire peut faire basculer dans une tranche supérieure et diminuer le revenu net.',
        'C’est mathématiquement faux. Les paliers d’imposition au Québec et au Canada sont progressifs et marginaux.',
        'Seule la portion de revenu excédant le seuil est soumise au taux supérieur.',
      ],
      en: [
        'Canadian tax brackets are strictly marginal. Only dollars earned above the threshold are taxed at the higher rate.',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Cálculo do Rendimento Líquido do Aumento',
        fr: 'Calcul du Gain Net d’une Augmentation',
        en: 'Net Raise Calculation',
      },
      formula: 'Aumento Líquido = Aumento Bruto × (1 - Alíquota Marginal Combinada)',
      variables: {
        pt: ['Aumento Bruto: Valor negociado', 'Alíquota Marginal: Soma das taxas provincial + federal da faixa'],
        fr: ['Augmentation brute : Montant négocié', 'Taux marginal : Taux combiné QC + ARC de la tranche'],
        en: ['Gross raise: Negotiated amount', 'Marginal rate: Combined federal + QC bracket rate'],
      },
      numericalExample: {
        pt: 'Aumento de $5.000 para quem ganha $55.000 (taxa marginal combinada de ~37,12%): Aumento líquido no bolso = $3.144/ano ($121 a mais por quinzena).',
        fr: 'Augmentation de 5 000 $ à 55 000 $ (taux marginal combiné ~37,12 %) = 3 144 $ net de plus par an dans vos poches.',
        en: 'A $5,000 raise at $55,000 salary yields ~$3,144 in real take-home cash per year.',
      },
    },
    officialSources: [
      {
        title: 'Taux d’imposition des particuliers et tranches de revenu',
        url: 'https://www.revenuquebec.ca',
        authority: 'Revenu Québec',
      },
    ],
    ctaTool: 'raise',
    ctaToolLabel: {
      pt: 'Simular Meu Aumento no Simulador de Promoção',
      fr: 'Simuler mon augmentation sur l’outil interactif',
      en: 'Simulate My Raise in the Raise Simulator',
    },
  },

  {
    id: 'calculo-manual-interprovincial-quebec-vs-canada',
    slug: 'calculo-salario-quebec-vs-ontario-alberta-comparativo',
    category: 'calculos-manuais',
    readTime: '9 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 4210,
    searchIntent: 'informational',
    targetKeyword: 'comparativo salario quebec ontario alberta poder de compra imposto',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Trabalhadores Móveis & Novos Imigrantes',
      fr: 'Professionnels en Mobilité & Nouveaux Arrivants',
      en: 'Interprovincial Movers & Newcomers',
    },
    communicationTone: {
      pt: 'Estratégico, Comparativo e Realista',
      fr: 'Comparatif, Économique et Structuré',
      en: 'Comparative, Economic & Thorough',
    },
    relatedArticleIds: ['como-calcular-salario-liquido-manualmente', 'reer-celiapp-optimisation'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Québec vs Ontário e Alberta: Como Calcular a Diferença Real de Salário e Custo de Vida',
      fr: 'Québec vs Ontario et Alberta : Comparatif Réel des Salaires Nets et Coût de la Vie',
      en: 'Quebec vs Ontario vs Alberta: Real Net Salary and Purchasing Power Math',
    },
    excerpt: {
      pt: 'Ontário e Alberta têm impostos de renda nominais mais baixos, mas o custo astronômico de moradia, creche e saúde privada muda todo o poder de compra real.',
      fr: 'L’Ontario et l’Alberta affichent des impôts sur le revenu plus bas, mais les coûts du logement et des services changent la donne financière.',
      en: 'Lower nominal tax rates in Ontario and Alberta vs Quebec’s lower rents, subsidized daycares and 16.5% federal abatement.',
    },
    content: {
      pt: [
        'Ao avaliar se vale a pena mudar de província dentro do Canadá, muitos profissionais olham apenas para a tabela de imposto de renda e concluem apressadamente que Alberta ou Ontário pagam mais.',
        '1. A Realidade Tributária: O Québec tem alíquotas provinciais mais altas, mas possui o Abattement federal de 16,5% que reduz a conta com Ottawa.',
        '2. Custos Estruturais da Vida: Em Toronto ou Vancouver, o aluguel médio consome de 40% a 55% da renda familiar. Em Montreal ou Québec City, esse índice é historicamente mais acessível.',
        '3. Serviços Públicos Subsidiados: O Québec oferece creches públicas a $9,35 por dia (CPEs), contra até $1.500/mês por criança em outras províncias, além de anuidades universitárias substancialmente inferiores.',
        'Compare o salário líquido e o poder de compra real nas 13 províncias e territórios no nosso comparador interprovincial.',
      ],
      fr: [
        'Changer de province au Canada requiert de mesurer le salaire net après impôt ainsi que l’indice du coût de la vie.',
        'Le Québec compense ses impôts provinciaux par un abattement fédéral de 16,5 % et des services publics abordables (garderies à 9,35 $/jour, loyers modérés).',
      ],
      en: [
        'Comparing Canadian provinces requires balancing net income against housing, daycare, and local sales taxes.',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Poder de Compra Real Ajustado',
        fr: 'Indice de Pouvoir d’Achat Réel',
        en: 'Adjusted Purchasing Power Formula',
      },
      formula: 'Poder de Compra Real = (Salário Líquido Anual / Índice de Custo de Vida da Província) × 100',
      variables: {
        pt: ['Líquido Anual: Renda líquida após todos os tributos', 'Índice de Custo: Montreal/QC (~100), Ontário (~118), Alberta (~104)'],
        fr: ['Net annuel : Revenu net après impôts', 'Indice coût de vie : Base Québec = 100, Ontario = ~118'],
        en: ['Annual Net: Post-tax take-home pay', 'Cost of living index: Quebec baseline 100, Ontario 118'],
      },
      numericalExample: {
        pt: 'Salário de $70.000 bruto: No Québec gera ~$51.850 líquidos (Poder real = $51.850). Em Ontário gera ~$54.200 líquidos, mas ajustado ao custo de vida de Toronto (118) seu poder real cai para $45.932 CAD.',
        fr: 'À 70 000 $ brut : Au Québec le net est de ~51 850 $ (Pouvoir réel = 51 850 $). En Ontario le net est de ~54 200 $, mais ramené au coût de la vie torontois (indice 118), le pouvoir réel n’est que de 45 932 $.',
        en: 'At $70,000 gross: Quebec yields ~$51,850 net. Ontario yields ~$54,200 net, but adjusted for high living costs (index 118), real purchasing power is only $45,932.',
      },
    },
    officialSources: [
      {
        title: 'Statistique Canada : Indices des prix à la consommation provinciaux',
        url: 'https://www.statcan.gc.ca',
        authority: 'Statistique Canada',
      },
    ],
    ctaTool: 'canada-provinces',
    ctaToolLabel: {
      pt: 'Ver Comparativo das 13 Províncias em Tempo Real',
      fr: 'Comparer les 13 provinces et territoires',
      en: 'Explore the 13 Provinces Comparison Tool',
    },
  },

  {
    id: 'calculo-manual-ferias-e-feriados-cnesst',
    slug: 'calculo-ferias-4-por-cento-6-por-cento-feriados-quebec',
    category: 'calculos-manuais',
    readTime: '7 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2600,
    searchIntent: 'informational',
    targetKeyword: 'como calcular ferias 4 por cento 6 feriados 1 sobre 20 quebec cnesst',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Trabalhadores & Departamento Pessoal',
      fr: 'Employés & Gestionnaires de Paie',
      en: 'Employees & Payroll Teams',
    },
    communicationTone: {
      pt: 'Rigoroso em Legislação e Didático',
      fr: 'Réglementaire et Explicatif',
      en: 'Compliant & Clear',
    },
    relatedArticleIds: ['cnesst-normes-travail', 'como-calcular-horas-extras-cnesst'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Como Calcular a Indenização de Férias (4% / 6%) e os 8 Feriados pela Regra de 1/20',
      fr: 'Calcul de l’Indemnité de Vacances (4 % / 6 %) et des 8 Jours Fériés (Règle du 1/20)',
      en: 'How to Calculate Quebec Vacation Pay (4% / 6%) and Statutory Holiday Pay (1/20 Rule)',
    },
    excerpt: {
      pt: 'Conheça os direitos de férias da CNESST por tempo de serviço e a regra matemática de 1/20 aplicada aos 8 feriados oficiais no Québec.',
      fr: 'Maîtrisez les indemnités de congés annuels selon votre ancienneté et la règle officielle du 1/20 pour les 8 fériés chômés et payés.',
      en: 'Full breakdown of Quebec statutory vacation indemnity and the 1/20 rule for the 8 official paid holidays.',
    },
    content: {
      pt: [
        'A indenização de férias (indemnité de congé annuel) e o pagamento de feriados são direitos inalienáveis garantidos pela CNESST no Québec.',
        '1. Regra dos 4%: Para quem tem menos de 3 anos de serviço contínuo na mesma empresa, o direito é de 2 semanas de descanso e indenização de 4% sobre o total de salários brutos ganhos no ano de referência.',
        '2. Regra dos 6%: A partir de 3 anos completos de serviço, o direito sobe para 3 semanas de férias e 6% do salário bruto total.',
        '3. A Famosa Regra de 1/20 para Feriados: Para cada um dos 8 feriados oficiais do Québec, a indenização devida equivale a 1/20 (5%) do salário ganho nas 4 semanas completas de trabalho que antecederam a semana do feriado.',
        'Calcule suas férias acumuladas e valores de feriados no nosso módulo dedicado de benefícios.',
      ],
      fr: [
        'Les congés annuels payés sont encadrés par les articles 66 à 77 de la Loi sur les normes du travail.',
        'Moins de 3 ans de service : 2 semaines et 4 % du salaire brut annuel.',
        '3 ans ou plus : 3 semaines et 6 % du salaire brut annuel.',
        'Règle du 1/20 : 1/20 du salaire gagné au cours des 4 semaines de paie complètes précédant la semaine du congé férié.',
      ],
      en: [
        'Quebec statutory vacation pay is 4% under 3 years of service (2 weeks) and 6% after 3 years (3 weeks).',
        'Statutory holidays are paid based on 1/20th of wages earned in the 4 preceding pay weeks.',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Fórmulas CNESST de Férias e Feriados',
        fr: 'Formules CNESST Vacances et Fériés',
        en: 'CNESST Vacation & Holiday Formulas',
      },
      formula: 'Indenização Feriado = Total Bruto das 4 Semanas Anteriores / 20',
      variables: {
        pt: ['Férias < 3 anos: Salário Bruto Anual × 4%', 'Férias >= 3 anos: Salário Bruto Anual × 6%', 'Feriado: 1/20 das últimas 4 semanas'],
        fr: ['Vacances < 3 ans : Brut annuel × 4 %', 'Vacances 3 ans et + : Brut annuel × 6 %', 'Férié : Brut 4 semaines / 20'],
        en: ['Vacation < 3 yrs: Annual Gross × 4%', 'Vacation 3+ yrs: Annual Gross × 6%', 'Holiday: Prior 4 weeks gross / 20'],
      },
      numericalExample: {
        pt: 'Trabalhador que ganhou $3.200 bruto nas 4 semanas anteriores: Indenização do feriado = $3.200 / 20 = $160 CAD pagos para ficar em casa comemorando o feriado.',
        fr: 'Employé ayant gagné 3 200 $ brut lors des 4 semaines précédentes : Indemnité du jour férié = 3 200 $ / 20 = 160 $ CAD.',
        en: 'Employee earning $3,200 gross across 4 preceding weeks: Paid holiday amount = $3,200 / 20 = $160 CAD.',
      },
    },
    officialSources: [
      {
        title: 'CNESST : Indemnité de congés annuels et jours fériés chômés',
        url: 'https://www.cnesst.gouv.qc.ca',
        authority: 'CNESST',
      },
    ],
    ctaTool: 'vacation-holidays',
    ctaToolLabel: {
      pt: 'Calcular Férias & Feriados no Módulo CNESST',
      fr: 'Calculer vacances et 8 fériés sur l’outil dédié',
      en: 'Calculate Vacation and Holiday Pay',
    },
  },

  {
    id: 'como-calcular-match-reer-e-restituicao',
    slug: 'como-calcular-match-reer-rpdb-restituicao-fonte',
    category: 'calculos-manuais',
    readTime: '8 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2430,
    searchIntent: 'informational',
    targetKeyword: 'como calcular match reer rpdb quebec tp1016 t1213 reducao fonte',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Investidores & Assalariados',
      fr: 'Épargnants & Travailleurs',
      en: 'Savers & Tax Planners',
    },
    communicationTone: {
      pt: 'Financeiro, Estratégico e Prático',
      fr: 'Financier, Stratégique et Clair',
      en: 'Financial & Actionable',
    },
    relatedArticleIds: ['reer-celiapp-optimisation', 'como-calcular-salario-liquido-manualmente'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Cálculo de Previdência REER/RPDB: O Match da Empresa e a Dedução na Fonte',
      fr: 'Calcul REER et RPDB : L’Abondement Employeur et la Déduction à la Source',
      en: 'RRSP Match Calculation: Free Employer Money and Tax Reduction at Source',
    },
    excerpt: {
      pt: 'Descubra como calcular o retorno do REER coletivo e como usar os formulários TP-1016 e T1213 para reduzir os impostos retidos na fonte a cada contracheque.',
      fr: 'Découvrez comment maximiser le match REER d’entreprise et réduire vos retenues fiscales chaque paie avec les formulaires TP-1016 et T1213.',
      en: 'How to calculate your employer RRSP match and use forms TP-1016 and T1213 to keep cash in every paycheck.',
    },
    content: {
      pt: [
        'O Plano de Aposentadoria Coletivo com contrapartida patronal (Match REER / RPDB) é o maior acelerador de patrimônio disponível para trabalhadores no Canadá.',
        '1. Dinheiro Gratuito (Match): Se sua empresa oferece match de 100% até 4% do salário e você ganha $60.000, você contribui $2.400 e a empresa coloca outros $2.400. É um retorno imediato garantido de 100% sobre o investimento.',
        '2. Redução do Imposto Retido na Fonte: Em vez de esperar abril do ano seguinte para receber uma restituição, o RH pode aplicar a dedução imediatamente na fonte ou você pode enviar o formulário TP-1016 ao Revenu Québec e o T1213 à ARC.',
        '3. Efeito no Contribuidor: Cada dólar colocado no REER diminui sua renda tributável na sua alíquota marginal mais alta.',
        'Calcule exatamente quanto dinheiro a empresa coloca no seu bolso no nosso simulador de REER.',
      ],
      fr: [
        'Le REER collectif avec contrepartie de l’employeur permet de doubler instantanément votre épargne de retraite.',
        'Utilisez les formulaires TP-1016 (Revenu Québec) et T1213 (ARC) pour réduire vos retenues d’impôt directement sur chaque chèque de paie.',
      ],
      en: [
        'Employer RRSP matching offers an instant 100% return on contributions up to the company ceiling.',
        'Submit form TP-1016 to Revenu Québec and T1213 to CRA to reduce withholding tax at source.',
      ],
    },
    formulaBox: {
      title: {
        pt: 'Fórmula de Economia Fiscal Imediata do REER',
        fr: 'Formule d’Économie d’Impôt REER',
        en: 'RRSP Immediate Tax Relief Formula',
      },
      formula: 'Economia Anual de Imposto = Contribuição Total REER × Alíquota Marginal Combinada',
      variables: {
        pt: ['Contribuição REER: Aporte do empregado', 'Alíquota Marginal: Taxa na faixa de renda mais alta'],
        fr: ['Cotisation REER : Versement employé', 'Taux marginal : Taux combiné d’imposition'],
        en: ['RRSP contribution: Employee savings', 'Marginal rate: Combined top tax rate'],
      },
      numericalExample: {
        pt: 'Salário de $60.000 com contribuição de $3.000 no REER (taxa marginal de 37,12%): Economia de imposto de $1.113,60 CAD devolvidos na fonte ou na declaração.',
        fr: 'Salaire de 60 000 $ avec 3 000 $ en REER (taux marginal 37,12 %) = 1 113,60 $ d’économie d’impôt immédiate.',
        en: 'At $60,000 salary, a $3,000 RRSP contribution delivers $1,113.60 CAD in direct tax savings.',
      },
    },
    officialSources: [
      {
        title: 'Formulaire TP-1016 : Demande de réduction de la retenue d’impôt',
        url: 'https://www.revenuquebec.ca',
        authority: 'Revenu Québec',
      },
      {
        title: 'Formulaire T1213 : Demande de réduction des retenues d’impôt à la source',
        url: 'https://www.canada.ca/fr/agence-revenu.html',
        authority: 'Agence du revenu du Canada (ARC)',
      },
    ],
    ctaTool: 'rrsp-savings',
    ctaToolLabel: {
      pt: 'Simular Match da Empresa e Economia de Imposto',
      fr: 'Simuler le match REER et l’économie d’impôt',
      en: 'Simulate Employer Match & Tax Savings',
    },
  },

  // ==========================================
  // CATEGORIA 2: TUTORIAIS PASSO A PASSO (CLICK-BY-CLICK)
  // ==========================================
  {
    id: 'tutorial-passo-a-passo-calculador-salario-liquido',
    slug: 'tutorial-passo-a-passo-calculador-salario-liquido-quebec',
    category: 'tutoriais-ferramentas',
    readTime: '6 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 3100,
    searchIntent: 'informational',
    targetKeyword: 'tutorial como usar calculadora salario liquido paient quebec passo a passo',
    searchVolumeLevel: 'high',
    funnelStage: 'topo',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Todos os Usuários da Plataforma',
      fr: 'Tous les Utilisateurs',
      en: 'All Platform Users',
    },
    communicationTone: {
      pt: 'Instrucional, Amigável e Passo a Passo',
      fr: 'Didactique, Pas à Pas et Pratique',
      en: 'Step-by-step & Visual Guide',
    },
    relatedArticleIds: ['como-calcular-salario-liquido-manualmente', 'comprendre-talon-paie'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Tutorial Passo a Passo: Como Usar o Calculador de Salário Líquido do PaieNet',
      fr: 'Tutoriel Pas à Pas : Comment Utiliser le Calculateur de Salaire PaieNet',
      en: 'Click-by-Click Guide: How to Use the PaieNet Quebec Salary Calculator',
    },
    excerpt: {
      pt: 'Aprenda a tirar o máximo proveito da ferramenta: alternância horário/anual, turnos de fábrica (36/40h Biscuits Leclerc), deduções de cafetaria e contracheque em cascata.',
      fr: 'Guide pas à pas pour configurer votre taux horaire, primes de quart d’usine, retenues personnalisées et exporter votre relevé en cascade.',
      en: 'Master the net salary calculator: hourly/annual toggle, factory shift models, deductions and cascade payslip export.',
    },
    content: {
      pt: [
        'O calculador de salário líquido do PaieNet foi construído para fornecer precisão até o centavo em relação aos contracheques emitidos pelos maiores empregadores industriais e corporativos do Québec.',
        'Siga o tutorial abaixo para preencher os dados corretamente em menos de 2 minutos e exportar seu contracheque oficial.',
      ],
      fr: [
        'Le calculateur PaieNet reproduit fidèlement les fiches de paie québécoises officielles.',
        'Suivez les 5 étapes simples ci-dessous pour simuler votre paie exacte.',
      ],
      en: [
        'Follow this 5-step tutorial to audit your Quebec paycheck and uncover every tax deduction.',
      ],
    },
    stepByStepGuide: [
      {
        step: 1,
        title: {
          pt: 'Defina o Modo de Entrada (Horário ou Anual)',
          fr: 'Choisissez le mode de saisie (Horaire ou Annuel)',
          en: 'Select Input Mode (Hourly or Annual)',
        },
        description: {
          pt: 'Selecione se prefere digitar sua taxa por hora (ex: $26,50/h) ou seu salário anual contratual (ex: $55.000). Ajuste as horas semanais regulares (padrão de 40h ou 37,5h para escritório).',
          fr: 'Basculez entre taux horaire ou salaire annuel brut et ajustez la durée normale hebdomadaire.',
          en: 'Toggle between hourly wage or annual salary and configure regular weekly hours.',
        },
        screenKicker: 'Card de Parâmetros Principais',
      },
      {
        step: 2,
        title: {
          pt: 'Ative o Modo Avançado para Adicionais de Turno',
          fr: 'Activez le Mode Avancé pour les Primes de Quart',
          en: 'Switch to Advanced Mode for Shift Premiums',
        },
        description: {
          pt: 'Caso trabalhe em indústria com regime 36/40 ou turnos noturnos, marque a opção para incluir o valor do adicional por hora (ex: +$1,50/h de noite).',
          fr: 'Renseignez vos primes de quart de soir, nuit ou fin de semaine.',
          en: 'Input night or weekend shift premiums ($/hr) if working in manufacturing or logistics.',
        },
        screenKicker: 'Avançado: Primes & Régimes',
      },
      {
        step: 3,
        title: {
          pt: 'Insira Deduções Não Estatutárias (Plano de Saúde & Cafetaria)',
          fr: 'Ajoutez les Déductions Non Obligatoires (Assurance & Cafétéria)',
          en: 'Add Voluntary Deductions (Health Insurance & Cafeteria)',
        },
        description: {
          pt: 'Informe a parcela do seguro coletivo paga por você, contribuição sindical ou descontos de refeitório da empresa para calibrar o valor depositado na conta.',
          fr: 'Indiquez les cotisations d’assurance collective, syndicat ou cafétéria.',
          en: 'Include employee health insurance premium, union dues, or cafeteria deductions.',
        },
        screenKicker: 'Deduções Não Estatutárias',
      },
      {
        step: 4,
        title: {
          pt: 'Analise o Live Preview Card com Retenção Líquida',
          fr: 'Consultez la Carte de Prévisualisation en Direct',
          en: 'Review the Real-Time Preview Card',
        },
        description: {
          pt: 'Observe na coluna da direita o valor líquido quinzenal, seu salário por hora limpo no bolso e a barra de retenção percentual comparando impostos e contribuições sociais.',
          fr: 'Vérifiez votre salaire net aux deux semaines et le taux effectif de rétention.',
          en: 'View net take-home per biweekly paycheck and your effective hourly cash rate.',
        },
        screenKicker: 'Painel Dinâmico',
      },
      {
        step: 5,
        title: {
          pt: 'Acesse o Contracheque em Cascata e Imprima seu Dossiê',
          fr: 'Accédez au Talon en Cascade et Exportez le Dossier',
          en: 'Open Cascade Payslip and Export Your Audit',
        },
        description: {
          pt: 'Clique no botão azul "Ver Contracheque Completo em Cascata" para abrir a tabela mágica auditada com a decomposição do Revenu Québec e ARC pronta para impressão ou cópia.',
          fr: 'Cliquez sur le bouton pour afficher la cascade officielle complète avec mémoire fiscale.',
          en: 'Click "View Full Cascade Payslip" to view the audited breakdown across 6 pay cycles.',
        },
        screenKicker: 'Dossiê Completo',
      },
    ],
    officialSources: [
      {
        title: 'Revenu Québec : Tables des déductions à la source',
        url: 'https://www.revenuquebec.ca',
        authority: 'Revenu Québec',
      },
    ],
    ctaTool: 'net-calc',
    ctaToolLabel: {
      pt: 'Abrir Calculador de Salário e Praticar o Tutorial',
      fr: 'Ouvrir le calculateur et suivre le tutoriel',
      en: 'Open the Live Net Calculator Now',
    },
  },

  {
    id: 'tutorial-passo-a-passo-criador-curriculo-ats',
    slug: 'tutorial-passo-a-passo-criador-curriculo-ats-formato-canadense',
    category: 'tutoriais-ferramentas',
    readTime: '8 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2840,
    searchIntent: 'informational',
    targetKeyword: 'tutorial como usar gerador curriculo canadense ats quebec passo a passo',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Candidatos & Imigrantes',
      fr: 'Candidats & Immigrants',
      en: 'Job Seekers & Expats',
    },
    communicationTone: {
      pt: 'Prático, Mentor e Focado em Aprovação',
      fr: 'Mentor, Professionnel et Efficace',
      en: 'Mentor & Career-Driven',
    },
    relatedArticleIds: ['cv-format-canadien', 'como-fazer-curriculo-formato-canadense-perfeito'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Tutorial Passo a Passo: Criando um Currículo Canadense Perfeito no Nosso Gerador ATS',
      fr: 'Tutoriel Pas à Pas : Créer un CV Canadien Conforme ATS avec Notre Générateur',
      en: 'Step-by-Step Tutorial: Building an ATS-Proof Canadian Resume With Our Builder',
    },
    excerpt: {
      pt: 'Descubra como preencher cada campo da ferramenta para gerar um currículo sem foto, otimizado para os robôs do Workday e Taleo, bilíngue e com pontuação máxima.',
      fr: 'Apprenez à utiliser notre créateur de CV étape par étape pour passer les filtres ATS et séduire les recruteurs québécois.',
      en: 'Learn how to use our resume builder to produce ATS-compliant, photo-free resumes aligned with Canadian hiring norms.',
    },
    content: {
      pt: [
        'Mais de 75% dos currículos enviados a vagas no Canadá são descartados automaticamente por robôs ATS (Applicant Tracking Systems) antes mesmo de serem lidos por um recrutador humano.',
        'Nosso Criador de Currículo Canadense foi desenhado especificamente para superar essas barreiras. Veja como usá-lo passo a passo.',
      ],
      fr: [
        'Plus de 75 % des CV sont éliminés par les logiciels de tri ATS. Notre outil garantit une structure et un formatage 100 % conformes.',
      ],
      en: [
        'Beat Canadian ATS filters with our built-in Canadian standard layout and targeted keyword integration.',
      ],
    },
    stepByStepGuide: [
      {
        step: 1,
        title: {
          pt: 'Informações de Contato sem Violações Anti-Discriminação',
          fr: 'Coordonnées conformes à la Charte des droits',
          en: 'Discrimination-Free Contact Details',
        },
        description: {
          pt: 'Insira seu nome, telefone canadense, e-mail profissional, cidade/província e perfil do LinkedIn. Não coloque foto, idade, estado civil ou nacionalidade.',
          fr: 'Renseignez vos coordonnées sans photo, âge ni situation familiale.',
          en: 'Add name, Canadian phone, city, and LinkedIn. Never include photo, age, or marital status.',
        },
        screenKicker: 'Etapa 1: Contato',
      },
      {
        step: 2,
        title: {
          pt: 'Redação do Perfil Profissional (Profil Sommaire)',
          fr: 'Rédaction du Profil Professionnel',
          en: 'Crafting the Professional Summary',
        },
        description: {
          pt: 'Escreva de 3 a 4 linhas sintetizando seus anos de experiência, especialidade central e a proposta de valor que você agrega à empresa canadense.',
          fr: 'Résumez vos compétences clés et votre proposition de valeur en 3 à 4 phrases percutantes.',
          en: 'Write 3 to 4 impactful sentences summarizing your key strengths and Canadian value prop.',
        },
        screenKicker: 'Etapa 2: Profil',
      },
      {
        step: 3,
        title: {
          pt: 'Experiências Anteriores Focadas em Verbos de Ação e Resultados',
          fr: 'Expériences avec Verbes d’Action et Résultats Chiffrés',
          en: 'Bullet Points with Action Verbs & Metrics',
        },
        description: {
          pt: 'Descreva cada trabalho usando marcadores com verbos no passado/presente e números quantitativos (ex: "Aumentou a produtividade da linha em 18%").',
          fr: 'Structurez chaque poste avec des accomplissements concrets et mesurables.',
          en: 'Detail accomplishments using strong action verbs and quantified impact (% or $ saved).',
        },
        screenKicker: 'Etapa 3: Expériences',
      },
      {
        step: 4,
        title: {
          pt: 'Auditoria de Pontuação ATS Score em Tempo Real',
          fr: 'Vérification du Score ATS en Direct',
          en: 'Real-Time ATS Score Audit',
        },
        description: {
          pt: 'Acompanhe a barra lateral da ferramenta que indica a densidade de palavras-chave, tipografia e compatibilidade com a Lei 96 da língua francesa no Québec.',
          fr: 'Vérifiez votre score de compatibilité ATS avant de générer le document.',
          en: 'Check the real-time ATS optimization gauge to ensure high keyword relevance.',
        },
        screenKicker: 'Etapa 4: Score ATS',
      },
      {
        step: 5,
        title: {
          pt: 'Exportação em PDF no Formato Carta Canadense (8.5" × 11")',
          fr: 'Exportation PDF au format Lettre US officiel',
          en: 'PDF Export in Official North American Letter Format',
        },
        description: {
          pt: 'Exporte seu currículo pronto para envio imediato no tamanho correto usado pelas empresas no Canadá (Letter, não A4).',
          fr: 'Téléchargez votre CV au format Lettre (8,5 x 11 pouces) prêt pour les candidatures.',
          en: 'Download your ATS-proof PDF in Letter dimensions (8.5" x 11") rather than European A4.',
        },
        screenKicker: 'Etapa 5: Exportação',
      },
    ],
    officialSources: [
      {
        title: 'Guichet-Emplois Canada : Rédiger un curriculum vitae canadien',
        url: 'https://www.guichetemplois.gc.ca',
        authority: 'IRCC',
      },
    ],
    ctaTool: 'resume-builder',
    ctaToolLabel: {
      pt: 'Criar Meu Currículo no Gerador ATS Agora',
      fr: 'Générer mon CV sur l’outil ATS',
      en: 'Build My Canadian Resume Now',
    },
  },

  {
    id: 'tutorial-passo-a-passo-simulador-entrevistas-star',
    slug: 'tutorial-como-treinar-entrevistas-metodo-star-quebec',
    category: 'tutoriais-ferramentas',
    readTime: '7 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2320,
    searchIntent: 'informational',
    targetKeyword: 'tutorial como usar simulador entrevista star perguntas respostas quebec',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Candidatos em Processos Seletivos',
      fr: 'Candidats en Entretiens d’Embauche',
      en: 'Job Candidates in Interview Rounds',
    },
    communicationTone: {
      pt: 'Interativo, Motivador e Focado em Prática',
      fr: 'Interactif, Concret et Formateur',
      en: 'Interactive, Practical & Coaching',
    },
    relatedArticleIds: ['entrevue-methode-star', 'como-se-preparar-para-entrevistas-no-quebec'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Tutorial Passo a Passo: Como Simular Entrevistas Canadenses e Dominar o Método STAR',
      fr: 'Tutoriel Pas à Pas : Simuler ses Entretiens Québécois avec la Méthode STAR',
      en: 'Click-by-Click Guide: Practicing Behavioral Interviews With the STAR Simulator',
    },
    excerpt: {
      pt: 'Treine perguntas comportamentais difíceis em francês e inglês com feedback em tempo real de clareza, concisão e adequação cultural canadense.',
      fr: 'Entraînez-vous aux questions comportementales en français québécois avec évaluation instantanée de vos réponses STAR.',
      en: 'Practice tricky Canadian behavioral interview questions with real-time AI scoring and feedback.',
    },
    content: {
      pt: [
        'Os recrutadores no Québec e no Canadá raramente fazem perguntas teóricas. Eles utilizam o modelo de entrevistas comportamentais baseadas no método STAR: Situação, Tarefa, Ação e Resultado.',
        'Nosso Simulador de Entrevistas permite que você treine as perguntas mais frequentes do seu setor antes do dia decisivo.',
      ],
      fr: [
        'Les employeurs québécois privilégient les mises en situation concrètes. Entraînez-vous à structurer vos réponses avec notre simulateur IA.',
      ],
      en: [
        'Master the Canadian STAR response formula with simulated realistic questions and feedback.',
      ],
    },
    stepByStepGuide: [
      {
        step: 1,
        title: {
          pt: 'Selecione a Carreira e o Idioma da Entrevista',
          fr: 'Sélectionnez le poste et la langue',
          en: 'Choose Role and Target Language',
        },
        description: {
          pt: 'Escolha seu setor (TI, Manufatura, Saúde, Gestão) e selecione Francês do Québec ou Inglês para iniciar.',
          fr: 'Choisissez votre domaine et la langue de passation de l’entrevue.',
          en: 'Select your target job category and preferred language (Quebec French or Canadian English).',
        },
        screenKicker: 'Seleção de Cenário',
      },
      {
        step: 2,
        title: {
          pt: 'Receba a Pergunta Comportamental Clássica',
          fr: 'Recevez la question comportementale',
          en: 'Receive Targeted Behavioral Question',
        },
        description: {
          pt: 'A ferramenta apresenta uma pergunta real utilizada pelos RHs canadenses (ex: "Fale sobre uma situação onde você teve um conflito com um colega").',
          fr: 'La plateforme génère une question réelle d’employeur québécois.',
          en: 'The system serves a real situational question commonly asked by Canadian employers.',
        },
        screenKicker: 'Pergunta do Recrutador',
      },
      {
        step: 3,
        title: {
          pt: 'Estruture sua Resposta nos 4 Pilares STAR',
          fr: 'Structurez votre réponse selon la méthode STAR',
          en: 'Draft Your Answer Using the STAR Pillars',
        },
        description: {
          pt: 'Preencha cada bloco: Situação (contexto), Tarefa (seu objetivo), Ação (o que você fez pessoalmente) e Resultado (a métrica ou aprendizado final).',
          fr: 'Rédigez ou dictez vos blocs Situation, Tâche, Action et Résultat.',
          en: 'Input Situation, Task, Action, and quantified Result.',
        },
        screenKicker: 'Blocos STAR',
      },
      {
        step: 4,
        title: {
          pt: 'Receba Avaliação Imediata de Clareza e Impacto',
          fr: 'Obtenez l’analyse instantanée de l’IA',
          en: 'Get Instant Score & Cultural Feedback',
        },
        description: {
          pt: 'A ferramenta avalia seu nível de vocabulário, modéstia corporativa canadense, clareza e fornece sugestões de melhoria para sua resposta.',
          fr: 'Découvrez votre note sur 100 et les pistes d’amélioration concrètes.',
          en: 'Receive scores for impact, structure, and suggestions to polish your answer.',
        },
        screenKicker: 'Diagnóstico & Score',
      },
    ],
    officialSources: [
      {
        title: 'Emploi-Québec : Préparer et réussir son entrevue d’embauche',
        url: 'https://www.quebec.ca/emploi',
        authority: 'LégisQuébec',
      },
    ],
    ctaTool: 'interview-simulator',
    ctaToolLabel: {
      pt: 'Iniciar Simulação de Entrevista Agora',
      fr: 'S’entraîner sur le simulateur d’entrevue',
      en: 'Launch Interview Practice Session',
    },
  },

  {
    id: 'tutorial-passo-a-passo-testes-tecnicos',
    slug: 'tutorial-como-realizar-testes-tecnicos-certificados-canada',
    category: 'tutoriais-ferramentas',
    readTime: '6 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 1870,
    searchIntent: 'informational',
    targetKeyword: 'testes tecnicos certificacao habilidades mercado trabalho quebec',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Profissionais Técnicos & Especialistas',
      fr: 'Techniciens & Candidats Qualifiés',
      en: 'Technical Professionals & Experts',
    },
    communicationTone: {
      pt: 'Técnico, Desafiador e Instrutivo',
      fr: 'Technique, Validant et Pratique',
      en: 'Technical & Career-Advancing',
    },
    relatedArticleIds: ['tutorial-passo-a-passo-criador-curriculo-ats', 'entrevue-methode-star'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Tutorial Passo a Passo: Como Realizar e Certificar Habilidades nos Testes Técnicos',
      fr: 'Tutoriel Pas à Pas : Valider vos Compétences sur les Tests Techniques',
      en: 'Step-by-Step Guide: Taking Technical Assessments & Skill Validations',
    },
    excerpt: {
      pt: 'Comprove suas competências técnicas e ganhe selos verificados para incluir no currículo e LinkedIn para impressionar recrutadores no Québec.',
      fr: 'Validez votre savoir-faire technique et obtenez des attestations reconnues pour valoriser votre candidature.',
      en: 'Take skill assessments aligned with Canadian requirements and prove your technical aptitude.',
    },
    content: {
      pt: [
        'Para imigrantes sem experiência de trabalho canadense prévia ("Canadian experience"), comprovar conhecimento técnico validado por testes é o atalho mais rápido para conseguir entrevistas.',
        'Conheça nosso simulador de testes técnicos e aprenda a certificar suas habilidades.',
      ],
      fr: [
        'Prouvez vos acquis professionnels face aux exigences des employeurs canadiens.',
      ],
      en: [
        'Bridge the Canadian experience barrier with certified competency test results.',
      ],
    },
    stepByStepGuide: [
      {
        step: 1,
        title: {
          pt: 'Selecione sua Trilha de Competência',
          fr: 'Choisissez votre filière de test',
          en: 'Select Skill Evaluation Track',
        },
        description: {
          pt: 'Escolha testes de TI (React, Java Spring, SQL), Normas CNESST de Saúde/Segurança, Contabilidade Quebequense ou Francês Corporativo.',
          fr: 'Sélectionnez votre domaine d’évaluation spécialisé.',
          en: 'Pick between Software, CNESST safety laws, Canadian accounting, or workplace French.',
        },
      },
      {
        step: 2,
        title: {
          pt: 'Responda as Questões Cronometradas com Casos Práticos',
          fr: 'Répondez aux mises en situation chronométrées',
          en: 'Complete Timed Practical Scenarios',
        },
        description: {
          pt: 'Resolva cenários reais enfrentados pelas empresas no dia a dia com limite de tempo por questão.',
          fr: 'Résolvez des cas réels d’entreprises sous contrainte de temps.',
          en: 'Solve real-world workplace scenarios within timed limits.',
        },
      },
      {
        step: 3,
        title: {
          pt: 'Emita seu Certificado de Proficiência Verificado',
          fr: 'Téléchargez votre attestation de réussite',
          en: 'Download Verified Achievement Badge',
        },
        description: {
          pt: 'Ao atingir nota acima de 80%, gere seu badge e certificado digital para anexar ao seu CV e perfil profissional.',
          fr: 'Générez votre certificat de compétences pour votre profil professionnel.',
          en: 'Obtain shareable credentials to attach to your Canadian CV and LinkedIn profile.',
        },
      },
    ],
    officialSources: [
      {
        title: 'Ordre des ingénieurs du Québec (OIQ) : Reconnaissance des compétences',
        url: 'https://www.oiq.qc.ca',
        authority: 'LégisQuébec',
      },
    ],
    ctaTool: 'tech-tests',
    ctaToolLabel: {
      pt: 'Realizar Teste Técnico Gratuito',
      fr: 'Passer une évaluation technique',
      en: 'Take a Free Skills Test Now',
    },
  },

  // ==========================================
  // CATEGORIA 3: CURRÍCULO ATS & CARREIRA NO CANADÁ
  // ==========================================
  {
    id: 'como-fazer-curriculo-formato-canadense-perfeito',
    slug: 'como-fazer-curriculo-formato-canadense-quebec-regras',
    category: 'curriculo-ats',
    readTime: '9 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 3650,
    isHot: true,
    imageUrl: 'https://picsum.photos/seed/canadianresumeats/800/450',
    searchIntent: 'informational',
    targetKeyword: 'como fazer curriculo formato canadense quebec modelo sem foto regras',
    searchVolumeLevel: 'high',
    funnelStage: 'topo',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Imigrantes & Candidatos a Vagas',
      fr: 'Nouveaux Arrivants & Chercheurs d’Emploi',
      en: 'Newcomers & Job Seekers',
    },
    communicationTone: {
      pt: 'Autoritário, Culturalmente Preciso e Essencial',
      fr: 'Essentiel, Normatif et Explicatif',
      en: 'Definitive & Actionable',
    },
    relatedArticleIds: ['cv-format-canadien', 'tutorial-passo-a-passo-criador-curriculo-ats'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'O Guia Definitivo do Currículo no Formato Canadense: Regras, Anti-Discriminação e ATS',
      fr: 'Le Guide Définitif du CV au Format Canadien : Normes, Anti-Discrimination et ATS',
      en: 'The Ultimate Guide to the Canadian Resume: Anti-Discrimination Laws and ATS Formatting',
    },
    excerpt: {
      pt: 'Por que fotos, idade, estado civil e endereço completo desclassificam seu CV no Canadá. Como estruturar suas conquistas no modelo que os recrutadores adoram.',
      fr: 'Pourquoi la photo et l’âge sont strictement proscrits au Canada et comment rédiger un CV percutant selon les normes québécoises.',
      en: 'Why photos, age, marital status, and full street addresses lead to immediate resume rejection in Canada.',
    },
    content: {
      pt: [
        'A Carta dos Direitos e Liberdades da Pessoa do Québec (Charte des droits et libertés) e a legislação trabalhista canadense impõem normas rigorosas contra a discriminação na contratação.',
        '1. O que JAMAIS colocar no seu CV canadense: Foto pessoal, data de nascimento ou idade, nacionalidade ou status de imigração, estado civil (casado, solteiro), número de filhos ou endereço residencial completo com rua e número.',
        '2. O que os recrutadores EXIGEM ver: Um perfil sumário claro de 3 linhas, lista de competências técnicas essenciais, histórico de empregos recentes com realizações quantificadas em porcentagem ou dólares economizados.',
        '3. Adequação à Lei 96 no Québec: Se a vaga for no Québec, o currículo deve ser submetido em francês impecável, salvo se a empresa solicitar explicitamente em inglês.',
        'Construa seu currículo 100% blindado contra erros no nosso gerador de currículos.',
      ],
      fr: [
        'Les employeurs canadiens éliminent automatiquement tout CV contenant une photo ou des données personnelles sensibles pour éviter tout litige de discrimination.',
        'Privilégiez la clarté : Profil percutant, réalisations chiffrées et conformité à la Loi 96 sur la langue française.',
      ],
      en: [
        'Canadian human rights legislation makes photos and personal demographics an immediate liability for employers.',
        'Focus on quantified achievements, clean ATS headings, and standard Letter format.',
      ],
    },
    officialSources: [
      {
        title: 'Commission des droits de la personne et des droits de la jeunesse (CDPDJ) : Embauche sans discrimination',
        url: 'https://www.cdpdj.qc.ca',
        authority: 'LégisQuébec',
      },
    ],
    ctaTool: 'resume-builder',
    ctaToolLabel: {
      pt: 'Gerar Meu CV Canadense Conforme',
      fr: 'Créer mon CV au format canadien',
      en: 'Build My Compliant Canadian Resume',
    },
  },

  {
    id: 'como-vencer-os-robos-ats-taleo-workday',
    slug: 'como-passar-nos-filtros-ats-workday-taleo-greenhouse',
    category: 'curriculo-ats',
    readTime: '8 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2790,
    searchIntent: 'informational',
    targetKeyword: 'como passar nos robos ats workday taleo greenhouse palavras chave quebec',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Candidatos a Grandes Empresas',
      fr: 'Candidats Grandes Entreprises',
      en: 'Corporate Job Candidates',
    },
    communicationTone: {
      pt: 'Técnico, Analítico e Hacker de Algoritmos',
      fr: 'Analytique, Stratégique et Efficace',
      en: 'Analytical & Tactical',
    },
    relatedArticleIds: ['como-fazer-curriculo-formato-canadense-perfeito', 'tutorial-passo-a-passo-criador-curriculo-ats'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Como Vencer os Robôs ATS (Workday, Taleo, Greenhouse): O Segredo das Palavras-Chave',
      fr: 'Comment Franchir les Filtres ATS (Workday, Taleo, Greenhouse) : Le Secret des Mots-Clés',
      en: 'How to Beat ATS Systems (Workday, Taleo, Greenhouse): Keyword Matching Tactics',
    },
    excerpt: {
      pt: 'Entenda como os algoritmos de triagem de currículos leem seu PDF, como alinhar termos exatos da descrição da vaga e evitar formatações que quebram o parser.',
      fr: 'Découvrez comment les moteurs de tri analysent vos fichiers et comment optimiser votre densité sémantique sans être rejeté.',
      en: 'Understand resume parser algorithms, column pitfalls, and how to mirror job descriptions to achieve 90%+ match rates.',
    },
    content: {
      pt: [
        'Sistemas como Workday, Taleo, Greenhouse e SAP SuccessFactors usam módulos OCR e parsers de linguagem natural para ranquear candidatos.',
        '1. Não use designs de múltiplas colunas complexas ou tabelas ocultas: Os parsers leem de cima para baixo e da esquerda para a direita, misturando o texto de colunas paralelas.',
        '2. Densidade de Palavras-Chave Reais: Identifique os 5 substantivos e competências mais repetidos no anúncio da vaga e garanta que eles apareçam exatamente na mesma grafia no seu CV.',
        '3. Formato do Arquivo: Envie sempre em PDF com texto selecionável ou DOCX limpo. Nunca envie imagens digitalizadas ou arquivos salvos no formato Canva sem texto vetorizado.',
      ],
      fr: [
        'Les robots ATS rejettent les colonnes complexes et les graphiques illisibles.',
        'Alignez le vocabulaire exact de l’offre d’emploi pour vous hisser en tête du classement des candidats.',
      ],
      en: [
        'ATS parsers process documents line by line. Multi-column graphics frequently corrupt data extraction.',
      ],
    },
    ctaTool: 'resume-builder',
    ctaToolLabel: {
      pt: 'Auditar Meu CV no Gerador ATS',
      fr: 'Tester la compatibilité ATS de mon profil',
      en: 'Audit My Resume on the ATS Tool',
    },
  },

  // ==========================================
  // CATEGORIA 4: ENTREVISTAS & MÉTODO STAR
  // ==========================================
  {
    id: 'como-se-preparar-para-entrevistas-no-quebec',
    slug: 'como-se-preparar-para-entrevistas-de-emprego-quebec-cultura',
    category: 'entrevistas-carreira',
    readTime: '8 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2940,
    searchIntent: 'informational',
    targetKeyword: 'como se preparar para entrevista de emprego no quebec cultura francisação',
    searchVolumeLevel: 'high',
    funnelStage: 'topo',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Imigrantes & Profissionais em Entrevistas',
      fr: 'Candidats & Nouveaux Travailleurs',
      en: 'Job Candidates in Quebec',
    },
    communicationTone: {
      pt: 'Cultural, Acolhedor e Estratégico',
      fr: 'Culturel, Pratique et Stratégique',
      en: 'Cultural, Tactical & Insightful',
    },
    relatedArticleIds: ['entrevue-methode-star', 'dominando-o-metodo-star-em-entrevistas'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Como se Preparar para Entrevistas no Québec: Códigos Culturais, Humildade e Francisação',
      fr: 'Préparer son Entrevue au Québec : Codes Culturels, Modestie et Francisation',
      en: 'Preparing for Quebec Job Interviews: Workplace Culture, Humility & Language Expectations',
    },
    excerpt: {
      pt: 'O ambiente de contratação no Québec valoriza colegialidade e trabalho em equipe acima de discursos corporativos agressivos. Veja como se destacar.',
      fr: 'Les recruteurs québécois privilégient l’authenticité et l’esprit d’équipe. Décryptage des attitudes gagnantes en entrevue.',
      en: 'Quebec employers prioritize collaborative mindset and team cohesion over aggressive self-promotion.',
    },
    content: {
      pt: [
        'A cultura corporativa do Québec tem particularidades profundas que a diferenciam tanto dos Estados Unidos quanto de países da América Latina e Europa.',
        '1. Menos Hierarquia e Mais Colegialidade (Collégialité): Chefes e subordinados no Québec tratam-se com proximidade e horizontalidade. Posturas autoritárias ou vangloriação excessiva são malvistas.',
        '2. A Pergunta da Pretensão Salarial: Ao ser questionado sobre "Vos attentes salariales", responda com uma faixa salarial baseada em dados reais de mercado (utilize nosso calculador para saber seu líquido e bruto exatos).',
        '3. Francês Corporativo: Mesmo em funções técnicas, demonstrar esforço genuíno e respeito pelo francês é um pré-requisito indispensável para a integração duradoura.',
      ],
      fr: [
        'L’entrevue au Québec est une conversation d’égal à égal. La simplicité, l’écoute et l’humilité sont les clés du succès.',
      ],
      en: [
        'Canadian workplace interviews are collaborative dialogues. Focus on team contributions and mutual cultural fit.',
      ],
    },
    officialSources: [
      {
        title: 'Québec en tête : Conseils pour passer une entrevue d’embauche au Québec',
        url: 'https://www.quebecentete.com',
        authority: 'IRCC',
      },
    ],
    ctaTool: 'interview-simulator',
    ctaToolLabel: {
      pt: 'Praticar no Simulador de Entrevistas STAR',
      fr: 'S’entraîner aux questions québécoises',
      en: 'Practice With the STAR Simulator',
    },
  },

  {
    id: 'dominando-o-metodo-star-em-entrevistas',
    slug: 'dominando-o-metodo-star-exemplos-prontos-entrevistas-canada',
    category: 'entrevistas-carreira',
    readTime: '9 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 3380,
    searchIntent: 'informational',
    targetKeyword: 'metodo star exemplos prontos situacao tarefa acao resultado entrevista',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Candidatos a Vagas Competitivas',
      fr: 'Candidats en Postulation Active',
      en: 'Active Interviewees',
    },
    communicationTone: {
      pt: 'Prático, Didático e Orientado a Modelos',
      fr: 'Méthodologique, Structuré et Concret',
      en: 'Methodical & Model-Driven',
    },
    relatedArticleIds: ['entrevue-methode-star', 'como-se-preparar-para-entrevistas-no-quebec'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Dominando o Método STAR: O Modelo Universal das Entrevistas Comportamentais Canadenses',
      fr: 'Maîtriser la Méthode STAR : Le Modèle Universel des Entretiens au Canada',
      en: 'Mastering the STAR Method: The Universal Framework for Canadian Behavioral Interviews',
    },
    excerpt: {
      pt: 'Aprenda a estruturar respostas de alto impacto com a fórmula Situação, Tarefa, Ação e Resultado. Exemplos práticos prontos para uso.',
      fr: 'Exemples concrets pour répondre avec précision aux questions situationnelles : Situation, Tâche, Action, Résultat.',
      en: 'Structure high-scoring behavioral answers using the Situation, Task, Action, and Result methodology.',
    },
    content: {
      pt: [
        'Quando o entrevistador começa com "Parlez-moi d’une fois où..." ou "Tell me about a time when...", ele está avaliando sua capacidade de aplicar o método STAR.',
        'S - Situação: Contextualize o problema de forma concisa em 2 frases (onde, quando, qual o cenário).',
        'T - Tarefa: Qual era a sua responsabilidade específica diante daquele desafio?',
        'A - Ação: O coração da resposta! O que VOCÊ fez especificamente (ferramentas, conversas, estratégias adotadas). Use a primeira pessoa "eu", não apenas "nós".',
        'R - Resultado: O desfecho com números concretos (ex: "reduzimos o tempo de entrega em 22% e o cliente renovou o contrato").',
      ],
      fr: [
        'La méthode STAR est la grille d’évaluation numéro un des recruteurs au Québec.',
        'Mettez l’accent sur vos actions personnelles et valorisez les résultats mesurables.',
      ],
      en: [
        'Structure your responses around Situation, Task, Action, and measurable Result for maximum interview impact.',
      ],
    },
    ctaTool: 'interview-simulator',
    ctaToolLabel: {
      pt: 'Simular Perguntas STAR no Nosso Aplicativo',
      fr: 'Tester mes réponses STAR en direct',
      en: 'Practice STAR Questions in Simulator',
    },
  },

  // ==========================================
  // CATEGORIA 5: PARA EMPRESAS, RH & EMPREGADORES (B2B)
  // ==========================================
  {
    id: 'estrategias-de-atracao-e-retencao-de-talentos-quebec',
    slug: 'como-empresas-atraem-e-retem-funcionarios-quebec-escassez-mao-de-obra',
    category: 'empresas-rh',
    readTime: '9 min',
    date: 'Édition B2B 2026',
    published: true,
    viewsCount: 1650,
    searchIntent: 'commercial_investigation',
    targetKeyword: 'como empresas atraem retem funcionarios quebec remuneracao beneficios rh',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'b2b_employers',
    targetAudienceLabel: {
      pt: 'Diretores de RH, Gestores & Empregadores',
      fr: 'Directeurs RH, Gestionnaires & Dirigeants',
      en: 'HR Directors, Managers & Business Leaders',
    },
    communicationTone: {
      pt: 'Estratégico, Corporativo e Focado em Retenção',
      fr: 'Stratégique, Managérial et Rentable',
      en: 'Executive, Strategic & High ROI',
    },
    relatedArticleIds: ['direitos-deveres-e-custo-patronal-folha-quebec', 'solucoes-salairepro-para-empresas-e-portais'],
    conversionGoal: 'pass_sale',
    title: {
      pt: 'Como Atrair, Contratar e Reter Funcionários no Québec em Tempos de Escassez de Mão de Obra',
      fr: 'Attirer, Embaucher et Fidéliser les Talents au Québec face à la Pénurie de Main-d’Œuvre',
      en: 'How Quebec Employers Attract, Hire, and Retain Talent Amid Labor Shortages',
    },
    excerpt: {
      pt: 'Estratégias comprovadas para empresas e indústrias no Québec: transparência salarial, adicionais de turno, planos de REER coletivo e benefícios não tributáveis.',
      fr: 'Stratégies concrètes pour les employeurs : transparence salariale, avantages non imposables et régimes de retraite collectifs.',
      en: 'Proven compensation frameworks for employers: wage transparency, shift premiums, group RRSP, and non-taxable fringe benefits.',
    },
    content: {
      pt: [
        'A escassez crônica de mão de obra (pénurie de main-d’œuvre) no Québec transformou a gestão de pessoas em uma batalha de atratividade e retenção.',
        '1. Transparência Salarial no Anúncio: Empresas que publicam a faixa salarial real recebem até 40% mais candidaturas qualificadas. Candidatos desconfiam de vagas com "salário a combinar".',
        '2. Benefícios Não Tributáveis de Alto Valor: Custear seguro de saúde, transporte coletivo, refeitório subsidiado ou programas de apoio à francisação custa menos em encargos patronais e gera impacto financeiro líquido imediato para o funcionário.',
        '3. Planos de Previdência Coletiva (REER / RPDB): Oferecer contrapartida patronal de 3% a 5% fideliza talentos-chave e reduz a rotatividade (turnover) que custa milhares de dólares em novos treinamentos.',
        'Utilize nosso comparador de propostas para calcular o impacto real de benefícios e bônus na renda líquida final do trabalhador.',
      ],
      fr: [
        'Face à la pénurie de travailleurs, les entreprises québécoises doivent optimiser leur marque employeur et leur rémunération globale.',
        'Misez sur des régimes collectifs avantageux et des outils de transparence salariale.',
      ],
      en: [
        'Quebec labor markets demand modern compensation packages: wage transparency, group retirement schemes, and tax-smart perks.',
      ],
    },
    officialSources: [
      {
        title: 'Conseil du patronat du Québec (CPQ) : État de la main-d’œuvre',
        url: 'https://www.cpq.qc.ca',
        authority: 'LégisQuébec',
      },
    ],
    ctaTool: 'compare-jobs',
    ctaToolLabel: {
      pt: 'Simular Propostas no Comparador de Empregos',
      fr: 'Comparer les offres d’emploi (A vs B)',
      en: 'Compare Job Offers (A vs B)',
    },
  },

  {
    id: 'direitos-deveres-e-custo-patronal-folha-quebec',
    slug: 'custo-patronal-folha-pagamento-quebec-encargos-direitos-empregador',
    category: 'empresas-rh',
    readTime: '9 min',
    date: 'Édition B2B 2026',
    published: true,
    viewsCount: 1420,
    searchIntent: 'informational',
    targetKeyword: 'custo patronal folha pagamento quebec encargos fss rrq cnesst empregador',
    searchVolumeLevel: 'medium',
    funnelStage: 'fundo',
    targetAudienceType: 'b2b_employers',
    targetAudienceLabel: {
      pt: 'Diretores Financeiros & Empregadores',
      fr: 'Dirigeants & Directeurs Financiers',
      en: 'CFOs, HR Managers & Business Owners',
    },
    communicationTone: {
      pt: 'Financeiro, Contábil e Regulatório',
      fr: 'Financier, Comptable et Réglementaire',
      en: 'Financial, Accounting & Regulatory',
    },
    relatedArticleIds: ['estrategias-de-atracao-e-retencao-de-talentos-quebec', 'solucoes-salairepro-para-empresas-e-portais'],
    conversionGoal: 'pass_sale',
    title: {
      pt: 'Guia do Empregador no Québec: Direitos, Deveres e Custos Patronais da Folha de Pagamento',
      fr: 'Guide de l’Employeur au Québec : Droits, Devoirs et Coûts Patronaux de la Paie',
      en: 'Quebec Employer Guide: Statutory Payroll Taxes, Rights, and Employer Obligations',
    },
    excerpt: {
      pt: 'Quanto um funcionário realmente custa para a empresa no Québec? Decomposição de RRQ patronal, FSS, CNESST, RQAP e Seguro-Desemprego patronal.',
      fr: 'Combien coûte réellement un employé au Québec ? Décomposition des cotisations patronales FSS, RRQ, CNESST, RQAP et AE.',
      en: 'True cost of an employee in Quebec: Employer contributions across QPP, HSF, CNESST, QPIP, and Employment Insurance.',
    },
    content: {
      pt: [
        'Contratar um funcionário no Québec implica pagar não apenas o salário bruto acordado, mas também uma série de encargos patronais obrigatórios que somam entre 12% e 22% adicionais.',
        '1. RRQ Patronal: A empresa recolhe exatamente o mesmo valor pago pelo funcionário (6,40% base + 4% suplementar sobre os ganhos admissíveis).',
        '2. FSS (Fonds des services de santé): Varia de 1,25% a 4,26% da folha salarial total, dependendo do porte da empresa.',
        '3. CNESST (Seguro de Acidentes de Trabalho): Varia de acordo com o nível de risco da atividade (de 0,60% em escritórios a mais de 7% na construção pesada e manufatura).',
        '4. RQAP e AE Patronais: O empregador paga 0,692% para o RQAP e 1,4 vezes o valor da contribuição do empregado para o Seguro-Desemprego federal.',
        'Nosso motor de cálculo pode ser auditado e integrado em lote via API para empresas.',
      ],
      fr: [
        'Les charges sociales patronales au Québec représentent un coût additionnel de 12 % à 20 % au-delà du salaire brut.',
        'Comprenez vos obligations fiscales et légales envers Revenu Québec et la CNESST.',
      ],
      en: [
        'Mandatory employer payroll taxes in Quebec add between 12% and 22% over gross wages depending on your sector CNESST risk rating and total payroll.',
      ],
    },
    officialSources: [
      {
        title: 'Revenu Québec : Cotisations de l’employeur au FSS, RRQ et RQAP',
        url: 'https://www.revenuquebec.ca',
        authority: 'Revenu Québec',
      },
    ],
    ctaTool: 'net-calc',
    ctaToolLabel: {
      pt: 'Calcular Salário Líquido e Encargos Oficiais',
      fr: 'Calculer le Salaire Net et les Retenues',
      en: 'Calculate Net Salary and Deductions',
    },
  },

  {
    id: 'solucoes-salairepro-para-empresas-e-portais',
    slug: 'solucoes-empresariais-salairepro-paient-b2b-api-widgets-rh',
    category: 'empresas-rh',
    readTime: '7 min',
    date: 'Édition B2B 2026',
    published: true,
    viewsCount: 1530,
    searchIntent: 'transactional',
    targetKeyword: 'solucoes b2b calculadora salario widget api portais vagas rh quebec',
    searchVolumeLevel: 'medium',
    funnelStage: 'fundo',
    targetAudienceType: 'b2b_employers',
    targetAudienceLabel: {
      pt: 'Portais de Vagas, RHs & Empresas Tech',
      fr: 'Jobboards, Portails RH & Entreprises',
      en: 'Job Boards, HR Tech & Employers',
    },
    communicationTone: {
      pt: 'Comercial, Tecnológico e Persuasivo',
      fr: 'Commercial, Innovant et Concret',
      en: 'Commercial, Innovative & Solution-Oriented',
    },
    relatedArticleIds: ['estrategias-de-atracao-e-retencao-de-talentos-quebec', 'direitos-deveres-e-custo-patronal-folha-quebec'],
    conversionGoal: 'pass_sale',
    title: {
      pt: 'Auditoria de Folha e Ferramentas de Remuneração no Québec: Boas Práticas',
      fr: 'Audit de Paie et Outils de Rémunération au Québec : Meilleures Pratiques',
      en: 'Payroll Auditing and Compensation Tools in Quebec: Best Practices',
    },
    excerpt: {
      pt: 'Entenda como utilizar calculadoras de alta precisão e simulações avançadas para planejar sua remuneração e auditar descontos fiscais no Québec.',
      fr: 'Comprenez comment utiliser les outils de calcul haute précision pour auditer les retenues fiscales au Québec.',
      en: 'Learn how to use high-precision payroll calculators and simulations to audit tax withholdings in Quebec.',
    },
    content: {
      pt: [
        'O PaieNet Québec é o portal de referência para trabalhadores assalariados e profissionais especializados em busca de transparência salarial.',
        '1. Precisão e Conformidade: Acompanhe as deduções oficiais de RRQ, RQAP, imposto federal e provincial atualizadas com as alíquotas oficiais de 2026.',
        '2. Planejamento de Carreira: Simule cenários de horas extras, férias proporcionais e aumento salarial antes de negociações trabalhistas.',
        '3. Ferramentas Pro: Otimize currículos no formato canadense ATS e prepare-se para entrevistas pelo método STAR.',
      ],
      fr: [
        'Accédez à nos outils de calcul de paie haute précision et optimisez votre parcours professionnel au Québec.',
      ],
      en: [
        'Access high-precision Quebec net wage calculation tools and plan your career moves with confidence.',
      ],
    },
    ctaTool: 'pro-plans',
    ctaToolLabel: {
      pt: 'Conhecer Ferramentas Avançadas do Carrière Pro',
      fr: 'Découvrir les Outils Avancés Carrière Pro',
      en: 'Explore Carrière Pro Advanced Tools',
    },
  },

  // ==========================================
  // CATEGORIA 6: PREVIDÊNCIA, APOSENTADORIA & FINANÇAS
  // ==========================================
  {
    id: 'guia-completo-aposentadoria-no-canada-rrq-oas-gis',
    slug: 'guia-completo-aposentadoria-canada-rrq-oas-gis-como-funciona',
    category: 'previdencia-financas',
    readTime: '10 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 3890,
    searchIntent: 'informational',
    targetKeyword: 'como funciona aposentadoria no canada rrq oas gis psv previdencia quebec',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'retirees_fire',
    targetAudienceLabel: {
      pt: 'Planejadores de Aposentadoria & Profissionais 45+',
      fr: 'Futurs Retraités & Travailleurs d’Expérience',
      en: 'Retirement Planners & Seasoned Workers',
    },
    communicationTone: {
      pt: 'Completo, Seguro e Estruturado',
      fr: 'Complet, Sécurisant et Structuré',
      en: 'Comprehensive, Safe & Structured',
    },
    relatedArticleIds: ['reer-celiapp-optimisation', 'como-calcular-match-reer-e-restituicao'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Guia Completo da Aposentadoria no Canadá: Como Funcionam RRQ, OAS (PSV) e GIS (SRG)',
      fr: 'Guide Complet de la Retraite au Canada : Comprendre le RRQ, la SV (OAS) et le SRG (GIS)',
      en: 'Complete Guide to Canadian Retirement: How QPP/RRQ, OAS, and GIS Work Together',
    },
    excerpt: {
      pt: 'Os 3 pilares da previdência canadense explicados: pensão do Québec, Segurança da Velhice federal e o impacto financeiro de se aposentar aos 60 vs 65 vs 70 anos.',
      fr: 'Les 3 piliers du système de retraite : régimes publics provinciaux et fédéraux, âges de départ optimaux et suppléments garantis.',
      en: 'The 3 pillars of Canada’s retirement system: public pensions, OAS benefits, and optimal age timing strategies.',
    },
    content: {
      pt: [
        'O sistema de aposentadoria no Canadá é um dos mais robustos do mundo ocidental, baseado em três pilares complementares que garantem renda básica e proporcional.',
        '1. Primeiro Pilar (Federal Básico): A Segurança da Velhice (OAS / PSV - Pension de la sécurité de la vieillesse), financiada por impostos gerais e paga a residentes a partir dos 65 anos com pelo menos 10 anos de moradia no Canadá. Se a renda for muito baixa, acrescenta-se o Suplemento de Renda Garantido (GIS / SRG).',
        '2. Segundo Pilar (Público Contributivo - RRQ no Québec): Financiado pelas contribuições retidas na sua folha de pagamento durante sua vida ativa. A idade de referência é 65 anos, mas você pode antecipar para os 60 anos (com redução permanente de até 36%) ou postergar até os 72 anos (com acréscimo de até 58,8%).',
        '3. Terceiro Pilar (Privado Individual): Suas economias voluntárias em REER (RRSP), CELI (TFSA) e planos de pensão da empresa.',
      ],
      fr: [
        'Le système de retraite canadien combine le Régime de rentes du Québec (RRQ), la Sécurité de la vieillesse (SV) fédérale et vos comptes enregistrés (REER, CELI).',
        'Choisir l’âge de versement entre 60 et 72 ans influence significativement vos rentes à vie.',
      ],
      en: [
        'Canada’s three retirement pillars: Old Age Security (OAS/GIS), Quebec Pension Plan (QPP/RRQ), and private registered savings (RRSP/TFSA).',
      ],
    },
    officialSources: [
      {
        title: 'Retraite Québec : Rente de retraite du Régime de rentes du Québec',
        url: 'https://www.retraitequebec.gouv.qc.ca',
        authority: 'Retraite Québec',
      },
      {
        title: 'Service Canada : Pension de la Sécurité de la vieillesse (SV)',
        url: 'https://www.canada.ca/fr/services/prestations/pensionspubliques/rpc/sv.html',
        authority: 'Agence du revenu du Canada (ARC)',
      },
    ],
    ctaTool: 'rrsp-savings',
    ctaToolLabel: {
      pt: 'Simular Poupança Previdenciária & REER',
      fr: 'Simuler mon épargne retraite sur l’outil',
      en: 'Plan Retirement Savings With REER Tool',
    },
  },

  {
    id: 'reer-celi-celiapp-qual-a-melhor-estrategia',
    slug: 'reer-vs-celi-vs-celiapp-qual-melhor-investimento-quebec',
    category: 'previdencia-financas',
    readTime: '9 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 3720,
    searchIntent: 'informational',
    targetKeyword: 'reer vs celi vs celiapp diferenca melhor investimento quebec canada',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'b2c_workers',
    targetAudienceLabel: {
      pt: 'Investidores & Compradores do 1º Imóvel',
      fr: 'Épargnants & Premiers Acheteurs Immobiliers',
      en: 'Savers & First-Time Homebuyers',
    },
    communicationTone: {
      pt: 'Consultivo, Prático e Rentável',
      fr: 'Conseil, Pratique et Rentable',
      en: 'Advisory, Practical & High Value',
    },
    relatedArticleIds: ['reer-celiapp-optimisation', 'remises-argent-international'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'REER vs CELI vs CELIAPP: A Estratégia Definitiva para Multiplicar seu Patrimônio',
      fr: 'REER vs CELI vs CELIAPP : La Stratégie Idéale pour Faire Fructifier son Argent',
      en: 'RRSP vs TFSA vs FHSA: Choosing the Ultimate Tax-Sheltered Strategy in Canada',
    },
    excerpt: {
      pt: 'Qual conta usar primeiro? Entenda por que o CELIAPP é o melhor instrumento fiscal já criado no Canadá para comprar a casa própria e como combinar REER e CELI.',
      fr: 'Le CELIAPP offre une déduction d’impôt à l’entrée et une exonération totale à la sortie pour l’achat d’une première propriété. Analyse comparative.',
      en: 'Why the FHSA/CELIAPP is the ultimate hybrid account and how to balance RRSP tax deductions with tax-free TFSA growth.',
    },
    content: {
      pt: [
        'O governo canadense oferece três contas registradas isentas ou diferidas de impostos que devem fazer parte da estratégia de qualquer trabalhador.',
        '1. CELIAPP (FHSA - Compte d’épargne libre d’impôt pour l’achat d’une première propriété): Combina o melhor do REER e do CELI. Você deduz até $8.000 por ano do imposto de renda e retira todo o dinheiro e rendimentos com 0% de imposto para comprar seu 1º imóvel no Canadá.',
        '2. REER (RRSP): Excelente para quem está em faixas de renda intermediárias e altas ($60.000+), gerando restituições fiscais de 37% a 50% que podem ser reinvestidas.',
        '3. CELI (TFSA): Dinheiro aplicado pós-imposto que cresce e pode ser resgatado a qualquer momento com zero imposto sobre os ganhos de capital.',
        'Abra sua conta com parceiros verificados como Wealthsimple ou Desjardins para começar sem taxas.',
      ],
      fr: [
        'Le CELIAPP permet d’épargner jusqu’à 40 000 $ à l’abri de l’impôt pour acheter votre première propriété.',
        'Le REER réduit votre impôt annuel tandis que le CELI offre des retraits totalement libres d’impôt.',
      ],
      en: [
        'The FHSA allows $8,000/yr tax deductions up to $40,000 for your first home, compounding tax-free.',
        'Use RRSP to lower current bracket tax and TFSA for liquid tax-free compounding.',
      ],
    },
    ctaTool: 'resources',
    ctaToolLabel: {
      pt: 'Acessar Guias de Planejamento Financeiro',
      fr: 'Consulter nos guides de planification financière',
      en: 'Explore Financial Planning Handbooks',
    },
  },

  // ==========================================
  // CATEGORIA 7: MOMENTOS DE VIDA & PERSONAS
  // ==========================================
  {
    id: 'guia-de-sobrevivencia-fiscal-novo-imigrante-quebec',
    slug: 'guia-de-sobrevivencia-fiscal-recem-chegado-quebec-nouveaux-arrivants',
    category: 'momentos-de-vida',
    readTime: '9 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 4520,
    isHot: true,
    imageUrl: 'https://picsum.photos/seed/quebecnewcomer/800/450',
    searchIntent: 'informational',
    targetKeyword: 'guia sobrevivencia fiscal recem chegado novos imigrantes quebec sin nas ramq conta',
    searchVolumeLevel: 'high',
    funnelStage: 'topo',
    targetAudienceType: 'b2c_newcomers',
    targetAudienceLabel: {
      pt: 'Novos Imigrantes & Recém-Chegados',
      fr: 'Nouveaux Arrivants & Résidents Permanents',
      en: 'Newcomers & Landed Immigrants',
    },
    communicationTone: {
      pt: 'Acolhedor, Seguro e Prático',
      fr: 'Bienveillant, Structuré et Rassurance',
      en: 'Welcoming, Practical & Reassuring',
    },
    relatedArticleIds: ['comprendre-talon-paie', 'remises-argent-international', 'como-fazer-curriculo-formato-canadense-perfeito'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Guia de Sobrevivência Fiscal e Burocrática do Recém-Chegado ao Québec (Nouveaux Arrivants)',
      fr: 'Guide de Survie Fiscale et Administrative du Nouvel Arrivant au Québec',
      en: 'Newcomer Survival Guide: SIN, First Bank Account, RAMQ, and First Paycheck',
    },
    excerpt: {
      pt: 'Chegou ao Québec? O checklist oficial dos primeiros 30 dias: emissão do NAS (SIN), abertura de conta bancária sem taxas, cartão de saúde da RAMQ e primeira declaração.',
      fr: 'Votre feuille de route des 30 premiers jours : NAS au Service Canada, compte bancaire gratuit pour immigrants, inscription RAMQ et premiers crédits.',
      en: 'Your essential 30-day onboarding checklist: Social Insurance Number, newcomer banking, health cards, and first tax return.',
    },
    content: {
      pt: [
        'Desembarcar no Québec traz uma enxurrada de termos burocráticos e procedimentos que devem ser feitos na ordem certa para evitar perda de dinheiro e problemas fiscais.',
        '1. Obter o Número de Seguro Social (NAS / SIN): Emitido gratuitamente pelo Service Canada. Sem ele, você não pode trabalhar legalmente nem receber salários.',
        '2. Abrir Conta Bancária sem Tarifas para Imigrantes: Instituições como Desjardins, BMO e RBC oferecem pacotes especiais com 12 meses de isenção de tarifas e emissão de cartão de crédito sem histórico prévio de crédito canadense.',
        '3. Inscrição na RAMQ: O seguro de saúde público do Québec cobre despesas médicas hospitalares. Não há mais carência de espera de 3 meses para a maioria dos residentes.',
        '4. Primeira Declaração de Imposto de Renda: Mesmo que você tenha chegado em dezembro e ganho pouco, declare impostos! É isso que libera o Crédito de Solidariedade do Québec e a devolução do TPS/TVQ.',
      ],
      fr: [
        'Dès votre arrivée, obtenez votre NAS au Service Canada et ouvrez votre compte bancaire sans frais mensuels.',
        'Inscrivez-vous rapidement à la RAMQ et produisez votre première déclaration de revenus pour recevoir les crédits de solidarité.',
      ],
      en: [
        'Secure your Social Insurance Number (SIN) immediately and open a newcomer bank package with waived fees.',
        'File your initial Canadian tax return even with low earnings to trigger solidarity tax refunds.',
      ],
    },
    officialSources: [
      {
        title: 'Service Canada : Numéro d’assurance sociale (NAS)',
        url: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
        authority: 'IRCC',
      },
      {
        title: 'Régie de l’assurance maladie du Québec (RAMQ) : Admissibilité et inscription',
        url: 'https://www.ramq.gouv.qc.ca',
        authority: 'LégisQuébec',
      },
    ],
    ctaTool: 'net-calc',
    ctaToolLabel: {
      pt: 'Calcular Primeiro Salário Líquido no Québec',
      fr: 'Calculer ma première paie au Québec',
      en: 'Calculate First Quebec Paycheck',
    },
  },

  {
    id: 'guia-do-estudante-internacional-trabalho-e-impostos',
    slug: 'estudante-internacional-quebec-trabalho-24h-pgwp-impostos',
    category: 'momentos-de-vida',
    readTime: '8 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2890,
    searchIntent: 'informational',
    targetKeyword: 'estudante internacional quebec trabalho 24 horas pgwp credito estudo imposto',
    searchVolumeLevel: 'high',
    funnelStage: 'meio',
    targetAudienceType: 'students',
    targetAudienceLabel: {
      pt: 'Estudantes Internacionais & Universitários',
      fr: 'Étudiants Internationaux & Cégep/Université',
      en: 'International Students & Graduates',
    },
    communicationTone: {
      pt: 'Orientativo, Seguro e Estruturado',
      fr: 'Éducatif, Préventif et Clair',
      en: 'Guiding, Compliant & Encouraging',
    },
    relatedArticleIds: ['guia-de-sobrevivencia-fiscal-novo-imigrante-quebec', 'como-calcular-horas-extras-cnesst'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Estudantes Internacionais no Québec: Limite de 24h Semanais, PGWP e Créditos de Estudo',
      fr: 'Étudiants Internationaux au Québec : Limite de 24h/semaine, PGWP et Frais de Scolarité',
      en: 'International Students in Quebec: 24h Work Cap, PGWP Transition & Tuition Tax Credits',
    },
    excerpt: {
      pt: 'Conheça a regra das 24 horas de trabalho off-campus, como acumular créditos fiscais com suas mensalidades (frais de scolarité) e preparar seu PGWP.',
      fr: 'Les règles de travail hors campus (24h/semaine), l’accumulation des crédits d’impôt pour études et la transition vers le permis postdiplôme.',
      en: 'Work hours limits, tuition tax credit roll-over, and payroll rules for international students in Quebec.',
    },
    content: {
      pt: [
        'Estudar no Québec abre caminhos para a residência permanente, mas exige cumprimento estrito das regras de autorização de trabalho emitidas pelo IRCC.',
        '1. Limite de 24 Horas Semanais Off-Campus: Durante o semestre letivo regular, estudantes com permissão de estudo válida podem trabalhar até 24 horas por semana fora do campus. Nas férias oficiais de verão e inverno, é permitido trabalhar full-time (40h+).',
        '2. Créditos por Mensalidades de Estudo (Frais de scolarité): Guarde os comprovantes fiscais T2202 e Relevé 8 fornecidos pela sua faculdade. Eles geram milhares de dólares em créditos tributários que você acumula para abater impostos quando começar a trabalhar em tempo integral.',
        '3. Transição para o PGWP (Permis de travail postdiplôme): Prepare seu currículo canadense com antecedência para começar a trabalhar imediatamente após a conclusão dos estudos.',
      ],
      fr: [
        'Le gouvernement fédéral limite le travail hors campus à 24 heures par semaine en période d’études.',
        'Déclarez vos frais de scolarité (Relevé 8 et T2202) pour accumuler des crédits fiscais reportables sur vos futures paies à temps plein.',
      ],
      en: [
        'International students can work up to 24 hours per week off-campus during academic sessions.',
        'Tuition fees generate carry-forward tax credits that substantially reduce future tax liability.',
      ],
    },
    officialSources: [
      {
        title: 'IRCC : Travailler hors campus pendant vos études au Canada',
        url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada/travail/travailler-hors-campus.html',
        authority: 'IRCC',
      },
    ],
    ctaTool: 'resume-builder',
    ctaToolLabel: {
      pt: 'Criar Currículo para Estágio ou Emprego Estudantil',
      fr: 'Créer un CV pour emploi étudiant',
      en: 'Build Student / Entry-Level Resume',
    },
  },

  {
    id: 'primeiro-emprego-no-canada-salario-minimo-e-direitos',
    slug: 'primeiro-emprego-quebec-salario-minimo-probation-direitos-cnesst',
    category: 'momentos-de-vida',
    readTime: '7 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2410,
    searchIntent: 'informational',
    targetKeyword: 'primeiro emprego quebec salario minimo periodo experiencia direitos cnesst',
    searchVolumeLevel: 'medium',
    funnelStage: 'topo',
    targetAudienceType: 'first_job',
    targetAudienceLabel: {
      pt: 'Jovens & Ingressantes no Mercado',
      fr: 'Jeunes Travailleurs & Nouveaux Salariés',
      en: 'Youth & First-Time Workers',
    },
    communicationTone: {
      pt: 'Instrutivo, Protetor de Direitos e Encorajador',
      fr: 'Pédagogique, Rassurant et Protecteur',
      en: 'Protective, Practical & Clear',
    },
    relatedArticleIds: ['cnesst-normes-travail', 'como-calcular-horas-extras-cnesst'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Primeiro Emprego no Canadá: Salário Mínimo, Período de Experiência e Seus Direitos CNESST',
      fr: 'Premier Emploi au Québec : Salaire Minimum, Période de Probation et Droits CNESST',
      en: 'First Job in Canada: Minimum Wage, Probationary Periods, and CNESST Workplace Rights',
    },
    excerpt: {
      pt: 'Entenda o salário mínimo oficial de $15,75/h no Québec, seus direitos desde o primeiro minuto de trabalho e como ler seu contracheque inaugural.',
      fr: 'Le salaire minimum au Québec, vos protections immédiates en matière de santé/sécurité et comment déchiffrer votre première paie.',
      en: 'Quebec’s statutory minimum wage, probation norms, and health and safety protections from day one.',
    },
    content: {
      pt: [
        'Conseguir o primeiro emprego no Canadá é uma conquista marcante, mas exige atenção para não ser explorado por desconhecimento das leis locais.',
        '1. Salário Mínimo Vigente no Québec: O salário mínimo geral é de $15,75/h (e $12,60/h para funcionários com gorjeta declarada como garçons). Qualquer pagamento abaixo disso é ilegal.',
        '2. Período de Experiência (Probation): A empresa pode avaliar seu desempenho nos primeiros 3 meses, mas isso NÃO anula seus direitos fundamentais: você tem direito a remuneração integral de cada minuto trabalhado, incluindo treinamentos obrigatórios.',
        '3. Saúde e Segurança CNESST: Todo empregador é obrigado a fornecer equipamentos de proteção e treinamento sem custo para você.',
      ],
      fr: [
        'Le taux général du salaire minimum est en vigueur au Québec. Toute heure travaillée, incluant la formation, doit être payée.',
        'Vos protections en matière de santé et sécurité au travail s’appliquent dès le premier jour.',
      ],
      en: [
        'Minimum wage protections apply unconditionally across Quebec, including all mandatory training hours.',
      ],
    },
    officialSources: [
      {
        title: 'CNESST : Salaire minimum et rémunération au Québec',
        url: 'https://www.cnesst.gouv.qc.ca',
        authority: 'CNESST',
      },
    ],
    ctaTool: 'net-calc',
    ctaToolLabel: {
      pt: 'Calcular Salário Líquido do Salário Mínimo',
      fr: 'Calculer le salaire net au salaire minimum',
      en: 'Calculate Minimum Wage Take-Home Pay',
    },
  },

  {
    id: 'transicao-e-saida-do-mercado-de-trabalho-quebec',
    slug: 'saida-mercado-trabalho-quebec-licenca-invalidez-demissao-fire',
    category: 'momentos-de-vida',
    readTime: '9 min',
    date: 'Édition 2026',
    published: true,
    viewsCount: 2150,
    searchIntent: 'informational',
    targetKeyword: 'saida mercado trabalho quebec licenca medica invalidez seguro desemprego fire',
    searchVolumeLevel: 'medium',
    funnelStage: 'meio',
    targetAudienceType: 'retirees_fire',
    targetAudienceLabel: {
      pt: 'Profissionais em Transição, Licença ou FIRE',
      fr: 'Travailleurs en Transition, Congé ou Retraite',
      en: 'Career Transitioners, Sick Leave & FIRE',
    },
    communicationTone: {
      pt: 'Estratégico, Previdenciário e Empático',
      fr: 'Prévoyant, Juridique et Stratégique',
      en: 'Empathetic, Strategic & Legal',
    },
    relatedArticleIds: ['guia-completo-aposentadoria-no-canada-rrq-oas-gis', 'reer-celiapp-optimisation'],
    conversionGoal: 'tool_engagement',
    title: {
      pt: 'Transição e Saída do Mercado de Trabalho: Licença Médica, Invalidez, Demissão e Movimento FIRE',
      fr: 'Transition et Sortie du Marché du Travail : Congé Médical, Invalidité, Congédiement et FIRE',
      en: 'Leaving the Workforce in Quebec: Medical Leave, Disability Pensions, Severance & FIRE',
    },
    excerpt: {
      pt: 'O que você tem direito ao se afastar do trabalho por doença (AE maladie de até 26 semanas), invalidez do RRQ, demissão com indenização ou aposentadoria precoce.',
      fr: 'Prestations de maladie de l’assurance-emploi, rente d’invalidité du RRQ, indemnités de préavis et indépendance financière.',
      en: 'Disability entitlements, sickness EI benefits, severance pay laws, and financial independence early retirement in Canada.',
    },
    content: {
      pt: [
        'Sair do mercado de trabalho — seja por decisão própria (aposentadoria antecipada/FIRE), seja por motivos inesperados de saúde ou demissão — exige planejamento fiscal rigoroso.',
        '1. Licença Médica e Seguro-Desemprego por Doença (Prestations de maladie de l’AE): O governo federal cobre até 26 semanas de licença médica remunerada (55% do seu salário até o teto máximo semanal de $695 CAD).',
        '2. Renda de Invalidez da Retraite Québec: Em caso de invalidez severa e permanente que impeça o retorno ao trabalho, o RRQ paga uma pensão mensal indexada vitalícia.',
        '3. Demissão sem Justa Causa e Aviso Prévio: A CNESST garante indenização compensatória de aviso prévio (de 1 a 8 semanas de salário integral) conforme seu tempo de serviço na empresa.',
        '4. O Movimento FIRE no Canadá: Como estruturar uma carteira de dividendos em contas CELI e retiradas estratégicas de REER para viver de renda pagando alíquotas fiscais reduzidas.',
      ],
      fr: [
        'En cas d’arrêt de travail médical, l’assurance-emploi offre jusqu’à 26 semaines de prestations de maladie.',
        'Pour les départs volontaires anticipés (mouvement FIRE), optimisez vos retraits de comptes enregistrés pour minimiser l’impôt.',
      ],
      en: [
        'Sickness EI provides up to 26 weeks of income support for workers dealing with illness or injury.',
        'Plan severance payments and strategic early retirement withdrawals with minimum tax leakage.',
      ],
    },
    officialSources: [
      {
        title: 'Service Canada : Prestations de maladie de l’assurance-emploi',
        url: 'https://www.canada.ca/fr/services/prestations/ae/assurance-emploi-maladie.html',
        authority: 'Agence du revenu du Canada (ARC)',
      },
      {
        title: 'Retraite Québec : Rente d’invalidité',
        url: 'https://www.retraitequebec.gouv.qc.ca',
        authority: 'Retraite Québec',
      },
    ],
    ctaTool: 'rrsp-savings',
    ctaToolLabel: {
      pt: 'Simular Renda Passiva e Previdência',
      fr: 'Simuler ma rente et mon épargne',
      en: 'Model Passive Income & Retirement',
    },
  },
];
