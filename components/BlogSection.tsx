'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import { NewsletterBox } from '@/components/NewsletterBox';
import { adminStore, BlogArticleData } from '@/lib/admin-store';
import { TrustAuthorityBar } from '@/components/TrustAuthorityBar';
import { normalizeUrl } from '@/lib/utils';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Target,
  Users,
  Building2,
  Info,
  Layers,
  Compass,
  Crown,
  Share2,
  FileCheck2,
  Calculator,
  Award,
  TrendingUp,
  Flame,
  FileText,
  DollarSign,
  Scale,
  Download,
  Copy,
  Check,
  Search,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Eye,
  Bookmark,
  Newspaper,
  ListOrdered,
  HelpCircle,
  Percent,
  Filter,
} from 'lucide-react';

export type Article = BlogArticleData;

export interface CategoryHubItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  tags: string[];
  theme: {
    iconBg: string;
    iconText: string;
    borderHover: string;
  };
}

export const CATEGORY_HUBS: CategoryHubItem[] = [
  {
    id: 'calculos-manuais',
    icon: Calculator,
    title: {
      pt: 'Cálculos Manuais & Fórmulas',
      en: 'Manual Math & Formulas',
      fr: 'Calculs Manuels & Formules',
    },
    desc: {
      pt: 'Fórmulas passo a passo das deduções de impostos do Québec, RRQ, RQAP e abatimento de 16,5%.',
      en: 'Step-by-step mathematical breakdown of Quebec tax brackets, QPP, QPIP and 16.5% abatement.',
      fr: 'Mémoire de calcul détaillé des retenues d’impôt québécois, RRQ bonifié, RQAP et abattement.',
    },
    tags: ['#FórmulaLíquido', '#RRQ2026', '#Abattement16.5%'],
    theme: {
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-700',
      borderHover: 'hover:border-blue-400',
    },
  },
  {
    id: 'curriculo-ats',
    icon: FileCheck2,
    title: {
      pt: 'Currículo Canadense & ATS',
      en: 'Canadian Resume & ATS',
      fr: 'CV Canadien & Normes ATS',
    },
    desc: {
      pt: 'Padrão local sem foto, conformidade contra vieses e palavras-chave para robôs de triagem.',
      en: 'No-photo Canadian standard, screening robot keywords and anti-discrimination compliance.',
      fr: 'Format officiel sans photo, mots-clés conformes aux filtres ATS et normes anti-discrimination.',
    },
    tags: ['#SemFoto', '#FiltrosATS', '#CVQuebec'],
    theme: {
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-700',
      borderHover: 'hover:border-emerald-400',
    },
  },
  {
    id: 'entrevistas-carreira',
    icon: Target,
    title: {
      pt: 'Entrevistas STAR & Testes',
      en: 'STAR Interviews & Tests',
      fr: 'Entretiens STAR & Tests RH',
    },
    desc: {
      pt: 'Técnica STAR para perguntas comportamentais, inteligência cultural no Québec e testes CNESST.',
      en: 'STAR interview framework for behavioral questions, Quebec workplace culture and safety tests.',
      fr: 'Méthode STAR pour entrevues comportementales, intégration culturelle et tests SIMDUT.',
    },
    tags: ['#MetodoSTAR', '#CulturaQuebec', '#TestesTecnicos'],
    theme: {
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-700',
      borderHover: 'hover:border-purple-400',
    },
  },
  {
    id: 'previdencia-financas',
    icon: TrendingUp,
    title: {
      pt: 'Previdência, REER & Finanças',
      en: 'Pensions, RRSP & Wealth',
      fr: 'Retraite, REER & Finances',
    },
    desc: {
      pt: 'Estratégias de abatimento no imposto de renda com REER, CELIAPP e aposentadoria pelo RRQ.',
      en: 'Tax refund strategies using RRSP match, FHSA savings and public pension projections.',
      fr: 'Stratégies d’économie d’impôt avec REER, CELIAPP et projection de rente du RRQ.',
    },
    tags: ['#MatchREER', '#CELIAPP', '#AposentadoriaRRQ'],
    theme: {
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-800',
      borderHover: 'hover:border-amber-400',
    },
  },
  {
    id: 'empresas-rh',
    icon: Building2,
    title: {
      pt: 'Empresas, RH & Retenção B2B',
      en: 'B2B Employers & Retention',
      fr: 'Employeurs & Rétention RH',
    },
    desc: {
      pt: 'Pesquisas salariais de mercado, estratégias de retenção contra escassez e custo de contratação.',
      en: 'Competitive salary benchmarks, retention tactics to fight labor shortage and employer costs.',
      fr: 'Grilles de salaires, rétention de talents face à la pénurie et charges sociales employeurs.',
    },
    tags: ['#EscassezDeTalentos', '#PesquisaSalarial', '#CustoRH'],
    theme: {
      iconBg: 'bg-rose-100',
      iconText: 'text-rose-700',
      borderHover: 'hover:border-rose-400',
    },
  },
  {
    id: 'momentos-de-vida',
    icon: Users,
    title: {
      pt: 'Fases de Vida & Transição',
      en: 'Life Stages & Transition',
      fr: 'Étapes de Vie & Transition',
    },
    desc: {
      pt: 'Checklists práticos para recém-chegados, primeiro emprego, estudantes e planejamento familiar.',
      en: 'Actionable checklists for newcomers, first job in Canada, students and family roadmaps.',
      fr: 'Guides d’installation pour nouveaux arrivants, premier emploi et conciliation de vie.',
    },
    tags: ['#NovosImigrantes', '#PrimeiroEmprego', '#VidaNoQuebec'],
    theme: {
      iconBg: 'bg-teal-100',
      iconText: 'text-teal-700',
      borderHover: 'hover:border-teal-400',
    },
  },
  {
    id: 'cnesst',
    icon: Scale,
    title: {
      pt: 'Normas CNESST & Direitos',
      en: 'Labour Standards & Rights',
      fr: 'Normes CNESST & Droits',
    },
    desc: {
      pt: 'Semana normal de 40h, tempo e meio (1,5×), cálculo de 1/20 de feriados e aviso de demissão.',
      en: 'Statutory 40h week, 1.5× overtime threshold, 1/20 statutory holiday rule and severance.',
      fr: 'Semaine de 40h légale, taux et demi (1,5×), règle du 1/20 des jours fériés et préavis.',
    },
    tags: ['#Normas40h', '#Regra1_20', '#TempoEMeio'],
    theme: {
      iconBg: 'bg-cyan-100',
      iconText: 'text-cyan-700',
      borderHover: 'hover:border-cyan-400',
    },
  },
  {
    id: 'tutoriais-ferramentas',
    icon: Layers,
    title: {
      pt: 'Tutoriais dos Simuladores',
      en: 'Tool Tutorials',
      fr: 'Tutoriels des Simulateurs',
    },
    desc: {
      pt: 'Passo a passo prático para utilizar cada simulador do portal e auditar seu holerite real.',
      en: 'Walkthrough guides to utilize each calculator tool and audit your genuine paystub.',
      fr: 'Tutoriels pas à pas pour exploiter les simulateurs et valider votre talon de paie.',
    },
    tags: ['#HoleriteLeclerc', '#Simuladores', '#TalonDePaie'],
    theme: {
      iconBg: 'bg-indigo-100',
      iconText: 'text-indigo-700',
      borderHover: 'hover:border-indigo-400',
    },
  },
];

interface BlogSectionProps {
  lang: Language;
  onSelectTool: (tool: ToolId) => void;
  onOpenEbookModal: () => void;
  initialArticleId?: string | null;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  lang,
  onSelectTool,
  onOpenEbookModal,
  initialArticleId,
  activeCategory,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory || 'all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(initialArticleId || null);
  const [prevInitialId, setPrevInitialId] = useState<string | null | undefined>(initialArticleId);
  const [prevActiveCategory, setPrevActiveCategory] = useState<string | undefined>(activeCategory);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync incoming category from Header navigation
  if (activeCategory !== undefined && activeCategory !== prevActiveCategory) {
    setPrevActiveCategory(activeCategory);
    setSelectedCategory(activeCategory);
  }

  const articles = useSyncExternalStore(
    (cb) => adminStore.subscribe(cb),
    () => adminStore.getArticles(),
    () => adminStore.getInitialArticles()
  );

  if (initialArticleId !== prevInitialId) {
    setPrevInitialId(initialArticleId);
    setActiveArticleId(initialArticleId || null);
  }

  const handleOpenArticle = (art: BlogArticleData) => {
    setActiveArticleId(art.id);
    adminStore.logEvent({
      type: 'article_view',
      summary: `Leitura do artigo: ${art.title[lang] || art.title.pt}`,
      location: 'Québec, Canada',
      details: `Categoria: ${art.category} | ${art.readTime}`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyArticleLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const categories = [
    { id: 'all', icon: BookOpen, label: lang === 'pt' ? 'Todos os Artigos' : lang === 'en' ? 'All Articles' : 'Tous les articles' },
    { id: 'calculos-manuais', icon: Calculator, label: lang === 'pt' ? 'Cálculos Manuais & Fórmulas' : lang === 'en' ? 'Manual Math & Formulas' : 'Calculs Manuels & Formules' },
    { id: 'tutoriais-ferramentas', icon: Layers, label: lang === 'pt' ? 'Tutoriais das Ferramentas' : lang === 'en' ? 'Tool Tutorials' : 'Tutoriels Outils' },
    { id: 'curriculo-ats', icon: FileCheck2, label: lang === 'pt' ? 'Currículo Canadense & ATS' : lang === 'en' ? 'Canadian Resume & ATS' : 'CV Canadien & ATS' },
    { id: 'entrevistas-carreira', icon: Target, label: lang === 'pt' ? 'Entrevistas STAR & Testes' : lang === 'en' ? 'STAR Interviews & Tests' : 'Entretiens STAR & Tests' },
    { id: 'empresas-rh', icon: Building2, label: lang === 'pt' ? 'Empresas, RH & Retenção' : lang === 'en' ? 'B2B Employers & Retention' : 'Entreprises & Rétention RH' },
    { id: 'previdencia-financas', icon: TrendingUp, label: lang === 'pt' ? 'Previdência & Aposentadoria' : lang === 'en' ? 'Pensions & Retirement' : 'Retraite & Finances' },
    { id: 'momentos-de-vida', icon: Users, label: lang === 'pt' ? 'Momentos de Vida & Transição' : lang === 'en' ? 'Life Stages & Transition' : 'Étapes de Vie & Transition' },
    { id: 'impots', icon: DollarSign, label: lang === 'pt' ? 'Salário & Impostos' : lang === 'en' ? 'Taxes & Payroll' : 'Impôts & Salaire' },
    { id: 'carriere', icon: Briefcase, label: lang === 'pt' ? 'Carreira & Emprego' : lang === 'en' ? 'Career & Hiring' : 'Carrière & Embauche' },
    { id: 'finances', icon: CreditCard, label: lang === 'pt' ? 'Finanças & Bancos' : lang === 'en' ? 'Finance & Banking' : 'Banques & Virements' },
    { id: 'cnesst', icon: Scale, label: 'CNESST & Direitos' },
  ];

  const audiences = [
    { id: 'all', label: lang === 'pt' ? 'Todos os Públicos' : lang === 'en' ? 'All Audiences' : 'Tous publics' },
    { id: 'b2c_workers', label: lang === 'pt' ? 'Trabalhadores & Assalariados' : lang === 'en' ? 'Salaried Workers' : 'Salariés & Travailleurs' },
    { id: 'b2b_employers', label: lang === 'pt' ? 'Empresas & RH B2B' : lang === 'en' ? 'B2B Employers & HR' : 'Entreprises & RH' },
    { id: 'b2c_newcomers', label: lang === 'pt' ? 'Novos Imigrantes' : lang === 'en' ? 'Newcomers' : 'Nouveaux Arrivants' },
    { id: 'students', label: lang === 'pt' ? 'Estudantes Internacionais' : lang === 'en' ? 'Students' : 'Étudiants' },
    { id: 'first_job', label: lang === 'pt' ? 'Primeiro Emprego' : lang === 'en' ? 'First Job' : 'Premier Emploi' },
    { id: 'retirees_fire', label: lang === 'pt' ? 'Aposentadoria & FIRE' : lang === 'en' ? 'Retirement & FIRE' : 'Retraite & FIRE' },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      if (a.published === false) return false;
      const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
      const matchesAudience = selectedAudience === 'all' || a.targetAudienceType === selectedAudience;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (a.title[lang] || a.title.pt || '').toLowerCase().includes(q) ||
        (a.excerpt[lang] || a.excerpt.pt || '').toLowerCase().includes(q) ||
        (a.targetKeyword || '').toLowerCase().includes(q);
      return matchesCategory && matchesAudience && matchesSearch;
    });
  }, [articles, selectedCategory, selectedAudience, searchQuery, lang]);

  const activeArticle = articles.find((a) => a.id === activeArticleId);

  // Related articles resolved dynamically from relatedArticleIds or fallback to same category
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    if (activeArticle.relatedArticleIds && activeArticle.relatedArticleIds.length > 0) {
      return articles.filter((a) => activeArticle.relatedArticleIds?.includes(a.id) && a.id !== activeArticle.id);
    }
    return articles.filter((a) => a.category === activeArticle.category && a.id !== activeArticle.id).slice(0, 3);
  }, [activeArticle, articles]);

  const isBrowsingAll = selectedCategory === 'all' && selectedAudience === 'all' && !searchQuery.trim();

  const heroArticle = useMemo(() => {
    return articles.find((a) => a.isFeaturedHero) || articles[0];
  }, [articles]);

  const hotArticles = useMemo(() => {
    return articles.filter((a) => a.isHot && a.id !== heroArticle?.id).slice(0, 4);
  }, [articles, heroArticle]);

  const subHeroArticles = useMemo(() => {
    const excludedIds = new Set([heroArticle?.id, ...hotArticles.map((h) => h.id)]);
    return articles.filter((a) => !excludedIds.has(a.id)).slice(0, 3);
  }, [articles, heroArticle, hotArticles]);

  const manualMathArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'calculos-manuais').slice(0, 3);
  }, [articles]);

  const careerArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'curriculo-ats' || a.category === 'entrevistas-carreira').slice(0, 3);
  }, [articles]);

  const b2bArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'empresas-rh').slice(0, 3);
  }, [articles]);

  const pensionFinanceArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'previdencia-financas' || a.category === 'finances').slice(0, 3);
  }, [articles]);

  const lifeStagesArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'momentos-de-vida').slice(0, 3);
  }, [articles]);

  const trendingTopics = [
    { label: '#CálculoLíquido2026', cat: 'calculos-manuais' },
    { label: '#CVCanadenseSemFoto', cat: 'curriculo-ats' },
    { label: '#NormasCNESST40h', cat: 'calculos-manuais' },
    { label: '#Abattement16.5%', cat: 'calculos-manuais' },
    { label: '#MatchREER100%', cat: 'previdencia-financas' },
    { label: '#EscassezRHQuébec', cat: 'empresas-rh' },
    { label: '#13Provincias', cat: 'calculos-manuais' },
    { label: '#AposentadoriaRRQ', cat: 'previdencia-financas' },
  ];

  // Verified Affiliate Partners Database
  const affiliatePartners = [
    {
      id: 'wise',
      name: 'Wise Canada (Ex-TransferWise)',
      category: 'finances',
      badge: lang === 'pt' ? 'Câmbio Comercial Real' : 'Real Mid-Market Rate',
      perk: lang === 'pt' ? 'Taxa média real com 0% de spread oculto' : 'Real exchange rate with zero hidden spread',
      description: lang === 'pt' ? 'Economize até 8x em comparação aos bancos tradicionais ao enviar e receber fundos entre Brasil, Canadá e Europa.' : 'Save up to 8x compared to high-street banks when sending money internationally.',
      cta: lang === 'pt' ? 'Abrir Conta Wise Grátis' : 'Open Free Wise Account',
      url: 'https://wise.com',
    },
    {
      id: 'wealthsimple',
      name: 'Wealthsimple Québec',
      category: 'finances',
      badge: lang === 'pt' ? 'Investimento & REER' : 'RRSP & First Home Savings',
      perk: lang === 'pt' ? 'Bônus de boas-vindas e conta CELIAPP/REER sem taxa de corretagem' : 'Commission-free trading and automated RRSP portfolio',
      description: lang === 'pt' ? 'Plataforma canadense líder para investir seu salário líquido, aproveitar o teto do REER e abater impostos do Québec.' : 'Top Canadian platform to invest savings, maximize your RRSP deduction and reduce tax.',
      cta: lang === 'pt' ? 'Ver Oferta Wealthsimple' : 'View Wealthsimple Bonus',
      url: 'https://www.wealthsimple.com',
    },
    {
      id: 'desjardins',
      name: 'Desjardins Québec',
      category: 'finances',
      badge: lang === 'pt' ? 'Banco para Novos Imigrantes' : 'Newcomer Banking Package',
      perk: lang === 'pt' ? 'Cartão de crédito sem histórico canadense + conta sem tarifas por 1 ano' : 'Credit card without Canadian history + free checking account for 1 year',
      description: lang === 'pt' ? 'A maior cooperativa financeira do Québec com suporte dedicado a imigrantes recém-chegados.' : 'The leading financial group in Quebec with full onboarding assistance for newcomers.',
      cta: lang === 'pt' ? 'Consultar Pacote Desjardins' : 'Claim Desjardins Offer',
      url: 'https://www.desjardins.com',
    },
    {
      id: 'turbotax',
      name: 'TurboTax / H&R Block Canada',
      category: 'impots',
      badge: lang === 'pt' ? 'Declaração QC + Federal' : 'Double Tax Filing QC + CRA',
      perk: lang === 'pt' ? 'Otimização automática de créditos de solidariedade e abatimento de 16,5%' : 'Maximize Quebec Solidarity Tax Credit and 16.5% abatement',
      description: lang === 'pt' ? 'Software fiscal oficial para envio simultâneo à Receita Federal Canadense (CRA) e Revenu Québec sem erros.' : 'Certified Canadian tax software to ensure complete compliance and top tax refunds.',
      cta: lang === 'pt' ? 'Simular Declaração' : 'Start Tax Return',
      url: 'https://turbotax.intuit.ca',
    },
  ];

  // Visual Editorial Cover Art Renderer with Photo Support
  const renderArticleCover = (art: BlogArticleData, isHero: boolean = false) => {
    const hasPhoto = Boolean(art.imageUrl);
    const photoUrl = art.imageUrl || `https://picsum.photos/seed/${art.id}/1200/600`;

    return (
      <div className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden relative border border-slate-200/80 shadow-xs bg-slate-900 group ${isHero ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[16/10]'}`}>
        <img
          src={photoUrl}
          alt={art.title[lang] || art.title.pt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={isHero ? 'eager' : 'lazy'}
          onError={(e) => {
            // Fallback gradient if remote placeholder fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10 pointer-events-none" />

        {/* Floating Metadata Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] pointer-events-none">
          <span className="font-extrabold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-xs flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>{categories.find((c) => c.id === art.category)?.label || 'Dossiê Fiscal'}</span>
          </span>
          <span className="text-[10px] font-bold text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
            {art.readTime}
          </span>
        </div>

        {/* Bottom Banner on Hero Card */}
        {isHero && (
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs text-white pointer-events-none">
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Auditado por Contadores CPA no Québec 2026</span>
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-blue-200 bg-blue-950/80 px-2 py-0.5 rounded">
              PaieNet Édition Fiscale
            </span>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Paragraph Renderer with Bullet Support and Internal Link Buttons
  const renderParagraphWithLinks = (text: string) => {
    const isBullet = text.startsWith('•') || text.startsWith('-');
    const cleanText = isBullet ? text.replace(/^[•-]\s*/, '') : text;

    const linkRegex = /\[([^\]]+)\]\(#([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(cleanText)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(cleanText.substring(lastIndex, matchIndex));
      }

      const linkText = match[1];
      const targetHash = match[2] as ToolId;

      parts.push(
        <button
          key={`link-${matchIndex}`}
          type="button"
          onClick={() => {
            onSelectTool(targetHash);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className="text-blue-600 hover:text-blue-800 font-extrabold underline cursor-pointer inline bg-transparent p-0 m-0 border-none align-baseline text-xs sm:text-sm transition-colors"
        >
          {linkText}
        </button>
      );

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < cleanText.length) {
      parts.push(cleanText.substring(lastIndex));
    }

    const content = parts.length > 0 ? parts : cleanText;

    if (isBullet) {
      return (
        <div className="flex items-start gap-2.5 my-2 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
          <span className="leading-relaxed text-slate-700">{content}</span>
        </div>
      );
    }

    // Section title detection (e.g., "1. Rendimento Bruto", "Passo 2", etc.)
    const isSectionHeader = /^[0-9]+\.\s+|^Passo\s+[0-9]+:|^Étape\s+[0-9]+:|^Step\s+[0-9]+:/i.test(cleanText);
    if (isSectionHeader) {
      return (
        <div className="pt-3 pb-1">
          <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span>{content}</span>
          </h4>
        </div>
      );
    }

    return <p className="leading-relaxed text-slate-700 my-2">{content}</p>;
  };

  // Dedicated Category Knowledge Hub Showcase Component
  const renderCategoryHub = () => (
    <section id="blog-categorias" className="scroll-mt-24 space-y-4 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/90 pb-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shadow-2xs">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {lang === 'pt'
                ? 'Hub de Categorias Especializadas'
                : lang === 'en'
                ? 'Specialized Topics & Category Hub'
                : 'Hub de Catégories Spécialisées'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {lang === 'pt'
              ? 'Navegue pelos 8 eixos temáticos auditados. Clique em qualquer categoria para filtrar os artigos ou consulte as fórmulas e guias de cada área.'
              : lang === 'en'
              ? 'Explore all 8 verified knowledge pillars. Click any category to filter articles or access in-depth guides and formulas.'
              : 'Explorez les 8 piliers de conformité. Cliquez sur une catégorie pour filtrer les articles et accéder aux calculs détaillés.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                onCategoryChange?.('all');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              {lang === 'pt' ? '← Ver Todos os Artigos' : '← Voir tous les articles'}
            </button>
          )}
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl">
            8 {lang === 'pt' ? 'Áreas Temáticas' : 'Piliers Thématiques'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORY_HUBS.map((hub) => {
          const HubIcon = hub.icon;
          const isSelected = selectedCategory === hub.id;
          const count = articles.filter((a) => a.category === hub.id).length;

          return (
            <div
              key={hub.id}
              onClick={() => {
                const next = isSelected ? 'all' : hub.id;
                setSelectedCategory(next);
                onCategoryChange?.(next);
                if (next !== 'all') {
                  setTimeout(() => {
                    const el = document.getElementById('blog-catalogo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                  : 'bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-md shadow-2xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${hub.theme.iconBg} ${hub.theme.iconText}`}
                  >
                    <HubIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-slate-100 text-slate-600 border-slate-200/80 group-hover:bg-blue-50 group-hover:text-blue-700'
                    }`}
                  >
                    {count} {lang === 'pt' ? 'artigos' : 'articles'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4
                    className={`font-black text-sm transition-colors ${
                      isSelected ? 'text-blue-900' : 'text-slate-900 group-hover:text-blue-600'
                    }`}
                  >
                    {hub.title[lang] || hub.title.pt}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {hub.desc[lang] || hub.desc.pt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hub.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span
                  className={`text-[11px] ${
                    isSelected ? 'text-blue-700 font-black' : 'text-slate-500 group-hover:text-blue-600'
                  }`}
                >
                  {isSelected
                    ? lang === 'pt'
                      ? '✓ Filtro Ativo'
                      : '✓ Filtre Actif'
                    : lang === 'pt'
                    ? 'Filtrar artigos →'
                    : 'Explorer →'}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                    isSelected ? 'text-blue-600' : 'text-slate-400'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="space-y-8">
      {/* If an article is selected, display Enhanced Article Reader */}
      {activeArticle ? (
        <article className="space-y-6 animate-in fade-in duration-200">
          {/* Back Navigation Bar & Share Actions */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {lang === 'pt'
                  ? '← Voltar à Página Principal do Blog'
                  : lang === 'en'
                  ? '← Back to Blog Home'
                  : '← Retour à l’accueil du blog'}
              </span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{activeArticle.readTime}</span>
              </span>

              <button
                type="button"
                onClick={handleCopyArticleLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
                title="Copiar link do artigo"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (lang === 'pt' ? 'Copiado!' : 'Copié !') : (lang === 'pt' ? 'Compartilhar' : 'Partager')}</span>
              </button>
            </div>
          </div>

          {/* Article Header & Visual Cover Art */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            {/* Visual Cover Art Canvas */}
            {renderArticleCover(activeArticle, true)}

            {/* Category and Date row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {categories.find((c) => c.id === activeArticle.category)?.label || 'Guia'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-semibold">{activeArticle.date}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Revisão Contábil 2026</span>
              </span>
            </div>

            {/* Target Audience & Communication Tone Badges */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Público-Alvo</span>
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                    {activeArticle.targetAudienceLabel?.[lang] || activeArticle.targetAudienceLabel?.pt || (activeArticle.targetAudienceType === 'b2b_employers' ? 'Empresas & RH B2B' : 'Consumidores B2C')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Tom Editorial</span>
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                    {activeArticle.communicationTone?.[lang] || activeArticle.communicationTone?.pt || 'Didático, Acolhedor & Prático'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Funil de Intenção</span>
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                    {activeArticle.funnelStage === 'fundo'
                      ? 'Fundo de Funil (Ação & Conversão)'
                      : activeArticle.funnelStage === 'meio'
                      ? 'Meio de Funil (Consideração Técnica)'
                      : 'Topo de Funil (Educação & Atração)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Author Credibility (E-E-A-T) Box */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                  JP
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900">Jean-Philippe Beaulieu, CPA auditeur</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Pôle d’Expertise Comptable & Fiscale PaieNet.qc · Membre de l’Ordre des CPA
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 sm:text-right font-medium">
                Conforme aux barèmes ARC & Revenu Québec 2026
              </div>
            </div>

            {/* Title & Excerpt */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {activeArticle.title[lang] || activeArticle.title.pt}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium pb-4 border-b border-slate-100">
                {activeArticle.excerpt[lang] || activeArticle.excerpt.pt}
              </p>
            </div>

            {/* Key Takeaways Box (Executive Summary) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-300/80 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>
                  {lang === 'pt' ? '📋 Destaques Práticos & O Que Você Vai Aprender:' : '📋 Points Clés & Synthèse Pratique :'}
                </span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-800 space-y-1.5 list-disc list-inside">
                <li>
                  {lang === 'pt'
                    ? 'Aplicação exata das retenções no holerite (RRQ, RQAP, Seguro-Desemprego AE e Impostos).'
                    : 'Application exacte des déductions sur le talon de paie (RRQ, RQAP, AE et impôts).'}
                </li>
                <li>
                  {lang === 'pt'
                    ? 'Como não perder o desconto federal de 16,5% exclusivo para residentes tributários no Québec.'
                    : 'Comment bénéficier de l’abattement fédéral de 16,5 % propre aux résidents du Québec.'}
                </li>
                <li>
                  {lang === 'pt'
                    ? 'Soluções e ferramentas práticas no portal para simular seu caso sem erros de contabilidade.'
                    : 'Solutions et simulateurs gratuits disponibles sur le portail pour calculer vos droits.'}
                </li>
              </ul>
            </div>

            {/* Article Content Paragraphs with Rich Formatting */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 pt-2">
              {(activeArticle.content[lang] || activeArticle.content.pt || []).map((paragraph, idx) => (
                <div key={idx} className="leading-relaxed">
                  {renderParagraphWithLinks(paragraph)}
                </div>
              ))}
            </div>

            {/* In-Article Editorial Highlight Image with Professional Caption */}
            <div className="my-6 space-y-2">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs relative aspect-[16/9] max-h-80 bg-slate-100">
                <img
                  src={`https://picsum.photos/seed/${activeArticle.id}-detail/1000/500`}
                  alt={`Ilustração prática: ${activeArticle.title[lang] || activeArticle.title.pt}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-300" />
                    <span>Dossiê Visual & Análise Técnica do Mercado de Trabalho</span>
                  </span>
                  <span className="text-[10px] text-slate-300">Fonte: PaieNet.qc Research 2026</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic text-center">
                Gráfico ilustrativo de procedimentos e conformidade fiscal segundo os barèmes oficiais de Revenu Québec e ARC.
              </p>
            </div>

            {/* Official Table Data Rendering */}
            {activeArticle.tableData && (
              <div className="my-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span>{activeArticle.tableData.caption || 'Tabela de Referência Oficial 2026'}</span>
                  </h4>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Revenu Québec & ARC
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-200 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        {activeArticle.tableData.headers.map((h, i) => (
                          <th key={i} className="p-3 font-bold border-b border-slate-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {activeArticle.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-blue-50/50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-3 text-slate-700 ${cIdx === 1 ? 'font-mono font-bold text-blue-700' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Formula Math Box */}
            {activeArticle.formulaBox && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-blue-500/30 shadow-md space-y-4 my-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/30">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      {activeArticle.formulaBox.title[lang] || activeArticle.formulaBox.title.pt}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                    Fórmula Exata 2026
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs sm:text-sm text-blue-300 overflow-x-auto">
                  <code>{activeArticle.formulaBox.formula}</code>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Variáveis da Equação:</span>
                  <ul className="space-y-1 list-disc list-inside">
                    {(activeArticle.formulaBox.variables[lang] || activeArticle.formulaBox.variables.pt || []).map((v, i) => (
                      <li key={i} className="text-slate-300">{v}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">Exemplo Numérico Real:</span>
                  <p className="leading-relaxed font-medium">
                    {activeArticle.formulaBox.numericalExample[lang] || activeArticle.formulaBox.numericalExample.pt}
                  </p>
                </div>

                {activeArticle.ctaTool && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (activeArticle.ctaTool) onSelectTool(activeArticle.ctaTool);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'pt' ? 'Calcular Meu Caso ao Vivo na Ferramenta →' : 'Tester ce calcul en direct →'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Click-by-Click Step-by-Step Tutorial Box */}
            {activeArticle.stepByStepGuide && activeArticle.stepByStepGuide.length > 0 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-4 my-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {lang === 'pt' ? 'Tutorial Prático Passo a Passo (Clique a Clique)' : 'Tutoriel Pratique Pas à Pas'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Guia Prático
                  </span>
                </div>

                <div className="space-y-3">
                  {activeArticle.stepByStepGuide.map((step) => (
                    <div
                      key={step.step}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5 transition-all hover:border-blue-300"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {step.step}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {step.title[lang] || step.title.pt}
                          </h4>
                        </div>
                        {step.screenKicker && (
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded hidden sm:inline">
                            {step.screenKicker}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {step.description[lang] || step.description.pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Official Sources & References */}
            {activeArticle.officialSources && activeArticle.officialSources.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 my-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'pt' ? 'Fontes Governamentais & Legislação Verificada' : 'Sources Officielles & Références'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Barèmes 2026</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeArticle.officialSources.map((source, idx) => (
                    <a
                      key={idx}
                      href={normalizeUrl(source.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-semibold text-[11px] transition-colors shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{source.authority}: {source.title}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Internal Tools Strip */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3.5 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  <span className="font-extrabold text-xs sm:text-sm">
                    {lang === 'pt' ? '⚡ Ferramentas Oficiais Recomendadas no PaieNet:' : '⚡ Outils Officiels Recommandés :'}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                  100% Gratuito
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTool('net-calc');
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 transition-colors text-left group cursor-pointer"
                >
                  <span className="font-bold block text-white group-hover:text-white">Salário Líquido</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-100">Cálculo oficial</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTool('overtime');
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-600 transition-colors text-left group cursor-pointer"
                >
                  <span className="font-bold block text-white group-hover:text-white">Horas Extras</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-100">1.5× CNESST</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTool('canada-provinces');
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 transition-colors text-left group cursor-pointer"
                >
                  <span className="font-bold block text-white group-hover:text-white">13 Províncias</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-100">Comparativo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTool('resume-builder');
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 transition-colors text-left group cursor-pointer"
                >
                  <span className="font-bold block text-white group-hover:text-white">Gerador de CV</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-100">ATS Canadá</span>
                </button>
              </div>
            </div>

            {/* Contextual CTA for Designated Tool */}
            {activeArticle.ctaTool && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block flex items-center gap-1.5 justify-center sm:justify-start">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'pt'
                        ? '⚡ Ferramenta Prática Recomendada para este Caso:'
                        : lang === 'en'
                        ? '⚡ Recommended Practical Tool for this Need:'
                        : '⚡ Outil pratique recommandé pour ce sujet :'}
                    </span>
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {activeArticle.ctaToolLabel[lang] || activeArticle.ctaToolLabel.pt}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (activeArticle.ctaTool) onSelectTool(activeArticle.ctaTool);
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
                >
                  <span>
                    {lang === 'pt'
                      ? 'Abrir Ferramenta Grátis'
                      : lang === 'en'
                      ? 'Open Free Tool'
                      : 'Lancer l’outil gratuit'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* MONETIZATION ZONE 4: VERIFIED AFFILIATE PARTNER COMPARISON */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      {lang === 'pt' ? 'Soluções e Serviços Parceiros Auditados no Québec' : 'Partenaires & Services Recommandés au Québec'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Instituições financeiras e plataformas selecionadas com benefícios exclusivos
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Auditado 2026
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {affiliatePartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {partner.badge}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Parceiro Oficial</span>
                        </span>
                      </div>

                      <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {partner.name}
                      </h5>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {partner.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-600">
                        {partner.perk}
                      </span>
                      <a
                        href={normalizeUrl(partner.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => adminStore.trackAffiliateClick(partner.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                      >
                        <span>{partner.cta}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* FTC & Google AdSense Required Affiliate Disclosure */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Transparência Editorial (Conformidade AdSense & FTC):</strong> Este artigo contém links de parceiros comerciais auditados. Se você contratar através destes links, o PaieNet poderá receber uma comissão sem custo adicional para você. Nossa independência técnica de cálculo permanece 100% inalterada.
                </span>
              </div>
            </div>

            {/* MONETIZATION ZONE 5: SMART RECOMMENDATION BOX */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-blue-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                    {lang === 'pt' ? 'Recomendação de Leitura Aprofundada' : 'Recommandation de Lecture'}
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {lang === 'pt' ? 'Guia Definitivo do Salário & Deduções no Québec (140p)' : 'Guide Ultime de la Paie & Déductions au Québec (140p)'}
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === 'pt'
                      ? 'Manual passo a passo sobre impostos provinciais/federais, bônus de Excel e modelos de orçamento.'
                      : 'Manuel complet pour maîtriser vos impôts, déductions et droits de travail.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenEbookModal}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs whitespace-nowrap shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'pt' ? 'Comprar E-book ($9.99)' : lang === 'en' ? 'Buy E-book ($9.99)' : 'Acheter l’E-book (9,99 $)'}</span>
              </button>
            </div>
          </div>

          {/* RETENÇÃO SEO & INTERNAL LINKING: ARTIGOS RELACIONADOS */}
          {relatedArticles.length > 0 && (
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {lang === 'pt' ? 'Artigos Relacionados & Retenção de Leitura' : 'Articles Connexes & En Savoir Plus'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Aprofunde seus conhecimentos fiscais e trabalhistas no mercado do Québec
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 hidden sm:inline">
                  Rede Editorial Conectada
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleOpenArticle(rel)}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-200">
                        <img
                          src={rel.imageUrl || `https://picsum.photos/seed/${rel.id}/600/350`}
                          alt={rel.title[lang] || rel.title.pt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                          {categories.find((c) => c.id === rel.category)?.label || 'Guia'}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>{rel.readTime}</span>
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {rel.title[lang] || rel.title.pt}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-blue-600">
                      <span>{lang === 'pt' ? 'Ler artigo' : 'Consulter'}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Box at the end of article */}
          <div className="mt-8">
            <NewsletterBox lang={lang} variant="card" />
          </div>
        </article>
      ) : (
        /* ============================================================== */
        /* REDESIGNED BLOG PORTAL SHOWCASE VIEW                           */
        /* ============================================================== */
        <div className="space-y-8">
          {/* Top Portal Banner with Market Indicators & E-book CTA */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                  <Newspaper className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Edição Fiscal & Carreira Québec 2026</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">Revenu Québec & ARC Conforme</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {lang === 'pt'
                      ? 'Portal de Finanças, Carreira e Legislação do Québec'
                      : lang === 'en'
                      ? 'Quebec Payroll, Career & Labour Standards Hub'
                      : 'Portail Fiscal, Emploi et Normes du Travail au Québec'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {lang === 'pt'
                      ? 'Cálculos explicados passo a passo, tutoriais de simuladores, modelos de currículo canadense ATS, estratégias de retenção para empresas e consultoria para cada fase de vida.'
                      : lang === 'en'
                      ? 'Manual tax math, step-by-step tool tutorials, ATS-compliant Canadian CV guides, B2B retention strategies and practical newcomer roadmaps.'
                      : 'Formules de calcul décortiquées, tutoriels des simulateurs, CV canadien au format ATS et conseils stratégiques pour employeurs et salariés.'}
                  </p>
                </div>
              </div>

              {/* Direct E-book Banner Action */}
              <button
                type="button"
                onClick={onOpenEbookModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 self-start md:self-center"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'pt' ? 'E-book Oficial (140p)' : lang === 'en' ? 'Official Guide (140p)' : 'Guide E-book (140p)'}</span>
                <span className="px-1.5 py-0.5 bg-slate-950 text-amber-300 text-[10px] rounded font-bold">
                  $9.99 CAD
                </span>
              </button>
            </div>

            {/* Quick Live Barème Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 font-medium">RRQ Base + Supp:</span>
                <span className="font-black text-blue-700">6,40% + 4,0%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Abattement QC:</span>
                <span className="font-black text-emerald-700">-16,50% ARC</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 font-medium">RQAP Parental:</span>
                <span className="font-black text-purple-700">0,494%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Salário Mínimo QC:</span>
                <span className="font-black text-amber-700">$15,75/h</span>
              </div>
            </div>

            {/* Redesigned Search and Filter Controls */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              {/* Search Bar with Counter */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:max-w-lg">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      lang === 'pt'
                        ? 'Pesquisar por assunto, fórmula, holerite, CV ou lei...'
                        : lang === 'en'
                        ? 'Search topics, formulas, paystub, ATS or laws...'
                        : 'Rechercher un sujet, formule, talon, CV ou loi...'
                    }
                    className="w-full pl-9 pr-8 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-500 self-end sm:self-center flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>{filteredArticles.length} {lang === 'pt' ? 'artigos catalogados' : lang === 'en' ? 'articles' : 'articles'}</span>
                </div>
              </div>

              {/* Clean Active Filter Status Banner (Shown only when a category or search is active) */}
              {(selectedCategory !== 'all' || selectedAudience !== 'all' || searchQuery.trim()) && (
                <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-xs">
                  <div className="flex items-center gap-2 text-blue-950 font-medium flex-wrap">
                    <span className="p-1 rounded-lg bg-blue-600 text-white shrink-0">
                      <Filter className="w-3.5 h-3.5" />
                    </span>
                    <span>
                      {selectedCategory !== 'all' && (
                        <>
                          <span className="text-slate-500">{lang === 'pt' ? 'Categoria: ' : 'Catégorie : '}</span>
                          <strong className="text-blue-900 font-extrabold">
                            {categories.find((c) => c.id === selectedCategory)?.label || selectedCategory}
                          </strong>
                        </>
                      )}
                      {selectedAudience !== 'all' && (
                        <span className="ml-2 text-slate-500">
                          • {audiences.find((a) => a.id === selectedAudience)?.label}
                        </span>
                      )}
                      {searchQuery && (
                        <span className="ml-2 text-slate-600 font-semibold">
                          • {lang === 'pt' ? `Busca: "${searchQuery}"` : `Recherche: "${searchQuery}"`}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[11px] font-bold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-md">
                      {filteredArticles.length} {lang === 'pt' ? 'artigos' : 'articles'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedAudience('all');
                        setSearchQuery('');
                        onCategoryChange?.('all');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 font-extrabold text-xs transition-colors cursor-pointer shadow-2xs active:scale-95"
                    >
                      <span>✕ {lang === 'pt' ? 'Limpar Filtros & Ver Todos' : 'Effacer & Voir tout'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trending Topics Ribbon */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-black text-xs uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>{lang === 'pt' ? 'Em Alta Agora' : lang === 'en' ? 'Trending Now' : 'En Tendance'}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {trendingTopics.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(item.cat);
                    setSearchQuery('');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white font-bold transition-all cursor-pointer text-[11px] sm:text-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* EDITORIAL PORTAL SHOWCASE (WHEN BROWSING ALL WITHOUT SEARCH)   */}
          {/* ============================================================== */}
          {isBrowsingAll ? (
            <div className="space-y-10">
              {/* TOP HERO EDITORIAL GRID: LEAD STORY (8 cols) + TRENDING HOT LIST (4 cols) */}
              <div id="blog-mais-lidos" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Lead Hero Article (8 Cols) */}
                {heroArticle && (
                  <div
                    onClick={() => handleOpenArticle(heroArticle)}
                    className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between group p-6 sm:p-8 space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Panoramic Hero Visual */}
                      {renderArticleCover(heroArticle, true)}

                      {/* Header Kicker & Metadata */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <span className="font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-rose-600" />
                          <span>Dossiê da Semana</span>
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="font-extrabold text-blue-700">
                          {categories.find((c) => c.id === heroArticle.category)?.label || 'Impostos'}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 font-semibold">{heroArticle.readTime}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Auditado CPA 2026</span>
                        </span>
                      </div>

                      {/* High-Impact Headline */}
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
                        {heroArticle.title[lang] || heroArticle.title.pt}
                      </h2>

                      {/* Authoritative Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {heroArticle.excerpt[lang] || heroArticle.excerpt.pt}
                      </p>

                      {/* Key Points Preview Box */}
                      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1">
                        <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">O Que Você Vai Aprender:</span>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                          {lang === 'pt'
                            ? 'Fórmula oficial do Revenu Québec & ARC, RRQ base + suplementar, dedução de 16,5% e memória de cálculo passo a passo.'
                            : 'Formule officielle Revenu Québec & ARC, RRQ bonifié, abattement 16,5 % et calcul pas à pas.'}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-extrabold">
                      <span className="text-blue-600 group-hover:text-blue-700 flex items-center gap-1.5">
                        <span>{lang === 'pt' ? 'Ler Dossiê Completo' : 'Lire le dossier complet'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>

                      {heroArticle.ctaTool && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (heroArticle.ctaTool) onSelectTool(heroArticle.ctaTool);
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                        >
                          <Calculator className="w-3.5 h-3.5 text-blue-300" />
                          <span>{lang === 'pt' ? 'Abrir Calculador Oficial' : 'Ouvrir le calculateur'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Trending Hot Posts Sidebar (4 Cols) - Professional Portal Rank List */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                          <Flame className="w-4 h-4" />
                        </div>
                        <h3 className="font-black text-sm sm:text-base text-slate-900">
                          {lang === 'pt' ? 'Os Mais Lidos da Semana' : 'Les Plus Lus de la Semaine'}
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Ranking
                      </span>
                    </div>

                    <div className="space-y-3">
                      {hotArticles.map((art, idx) => (
                        <div
                          key={art.id}
                          onClick={() => handleOpenArticle(art)}
                          className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group flex items-start gap-3"
                        >
                          {/* Styled Big Numeric Indicator */}
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-blue-600 transition-colors">
                            {`0${idx + 1}`}
                          </div>

                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span className="font-bold text-blue-700 truncate max-w-[140px]">
                                {categories.find((c) => c.id === art.category)?.label || 'Destaque'}
                              </span>
                              <span>{art.readTime}</span>
                            </div>

                            <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                              {art.title[lang] || art.title.pt}
                            </h4>

                            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Verificado</span>
                              </span>
                              <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                                Ler →
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onSelectTool('ebook-store')}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:brightness-105 active:scale-95 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Baixar Guia Oficial em PDF (140p)' : 'Télécharger le Guide Officiel (140p)'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECONDARY EDITORIAL ROW: SUB-HERO STORIES (3 Cols) */}
              {subHeroArticles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'pt' ? 'Destaques Editoriais Recomendados' : 'À la Une de la Rédaction'}</span>
                    </h3>
                    <span className="text-xs text-slate-400">Análises de Mercado</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subHeroArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleOpenArticle(art)}
                        className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                      >
                        <div className="space-y-3">
                          {renderArticleCover(art, false)}
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                              {categories.find((c) => c.id === art.category)?.label || 'Dossiê'}
                            </span>
                            <span className="text-slate-400 text-[11px] font-semibold">{art.readTime}</span>
                          </div>
                          <h4 className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {art.title[lang] || art.title.pt}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {art.excerpt[lang] || art.excerpt.pt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                          <span>{lang === 'pt' ? 'Ver artigo completo' : 'Lire l’article'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Authority Bar Anchor */}
              <TrustAuthorityBar lang={lang} />

              {/* DEDICATED CATEGORY KNOWLEDGE HUB SHOWCASE COMPONENT */}
              {renderCategoryHub()}

              {/* MAGAZINE BLOCK 1: Cálculos Manuais & Memória de Cálculo Fiscais */}
              <div id="blog-todos-artigos" className="scroll-mt-24 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {lang === 'pt' ? 'Cálculos Manuais & Memória Governamental' : 'Calculs Manuels & Barèmes'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Entenda as fórmulas exatas de deduções do Québec e ARC com exemplos numéricos
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('calculos-manuais');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Ver todos desta categoria →' : 'Voir tout →'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {manualMathArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                    >
                      <div className="space-y-3">
                        {renderArticleCover(art, false)}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                            Fórmula Auditada
                          </span>
                          <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>{art.readTime}</span>
                          </span>
                        </div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                          {art.title[lang] || art.title.pt}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.excerpt[lang] || art.excerpt.pt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>{lang === 'pt' ? 'Ver passo a passo' : 'Consulter'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAGAZINE BLOCK 2: Carreira, Currículo ATS & Entrevistas STAR */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {lang === 'pt' ? 'Carreira, Currículo Canadense & Entrevistas STAR' : 'Carrière, CV Canadien & Entrevues STAR'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Normas de contratação no Québec, formatos sem foto e aprovação nos robôs ATS
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('curriculo-ats');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Ver todos desta categoria →' : 'Voir tout →'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {careerArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                    >
                      <div className="space-y-3">
                        {renderArticleCover(art, false)}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                            {categories.find((c) => c.id === art.category)?.label || 'Carreira'}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>{art.readTime}</span>
                          </span>
                        </div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                          {art.title[lang] || art.title.pt}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.excerpt[lang] || art.excerpt.pt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                        <span>{lang === 'pt' ? 'Ver guia de carreira' : 'Consulter'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAGAZINE BLOCK 3: Empresas & RH: Custos Patronais & Retenção */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {lang === 'pt' ? 'Gestão Salarial, RH & Custos Patronais' : 'Gestion de Paie, RH & Coûts Patronaux'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {lang === 'pt' ? 'Estratégias de compensação global, benefícios tributáveis e conformidade CNESST' : 'Rémunération globale, avantages imposables et conformité CNESST'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('empresas-rh');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Ver todos desta categoria →' : 'Voir tout →'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {b2bArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-purple-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                    >
                      <div className="space-y-3">
                        {renderArticleCover(art, false)}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/80">
                            B2B Empregador
                          </span>
                          <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>{art.readTime}</span>
                          </span>
                        </div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-purple-600 transition-colors leading-snug line-clamp-2">
                          {art.title[lang] || art.title.pt}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.excerpt[lang] || art.excerpt.pt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                        <span>{lang === 'pt' ? 'Acessar soluções B2B' : 'Consulter B2B'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAGAZINE BLOCK 4: Previdência, Aposentadoria & Finanças Práticas */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {lang === 'pt' ? 'Previdência, Aposentadoria & Finanças Práticas' : 'Retraite & Finances'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        RRQ, OAS, GIS, REER, CELIAPP e estratégias financeiras para o futuro
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('previdencia-financas');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Ver todos desta categoria →' : 'Voir tout →'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pensionFinanceArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-rose-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                    >
                      <div className="space-y-3">
                        {renderArticleCover(art, false)}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/80">
                            Previdência
                          </span>
                          <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>{art.readTime}</span>
                          </span>
                        </div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-rose-600 transition-colors leading-snug line-clamp-2">
                          {art.title[lang] || art.title.pt}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.excerpt[lang] || art.excerpt.pt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                        <span>{lang === 'pt' ? 'Ver planejamento' : 'Consulter'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAGAZINE BLOCK 5: Momentos de Vida: Imigrantes, Estudantes & Transições */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {lang === 'pt' ? 'Momentos de Vida: Imigrantes, Estudantes & Transição' : 'Moments de Vie & Transition'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Checklists para quem acabou de chegar, estuda no Québec ou prepara a saída do mercado
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('momentos-de-vida');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-amber-600 hover:text-amber-800 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Ver todos desta categoria →' : 'Voir tout →'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {lifeStagesArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                    >
                      <div className="space-y-3">
                        {renderArticleCover(art, false)}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                            Guia Prático
                          </span>
                          <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>{art.readTime}</span>
                          </span>
                        </div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                          {art.title[lang] || art.title.pt}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.excerpt[lang] || art.excerpt.pt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                        <span>{lang === 'pt' ? 'Ver checklist' : 'Consulter'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* FILTERED ARTICLES GRID (WHEN CATEGORY OR SEARCH IS ACTIVE)     */
            /* ============================================================== */
            <div id="blog-catalogo" className="scroll-mt-24 space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900">
                    {categories.find((c) => c.id === selectedCategory)?.label || 'Artigos'}
                  </span>
                  {searchQuery && (
                    <span className="text-slate-500">
                      • Busca: &quot;{searchQuery}&quot;
                    </span>
                  )}
                  <span className="text-blue-600 font-bold">
                    ({filteredArticles.length} resultados)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedAudience('all');
                    setSearchQuery('');
                    onCategoryChange?.('all');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  {lang === 'pt' ? 'Limpar Filtros ✕' : 'Effacer ✕'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => handleOpenArticle(art)}
                    className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
                  >
                    <div className="space-y-3.5">
                      {renderArticleCover(art, false)}

                      <div className="flex items-center justify-between text-xs flex-wrap gap-2 pt-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                            {categories.find((c) => c.id === art.category)?.label || 'Guia'}
                          </span>
                          {art.targetAudienceType && (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                              {art.targetAudienceType === 'b2b_employers'
                                ? 'B2B Empresas'
                                : art.targetAudienceType === 'b2c_newcomers'
                                ? 'Novos Imigrantes'
                                : 'Assalariados'}
                            </span>
                          )}
                        </div>

                        <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{art.readTime}</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {art.title[lang] || art.title.pt}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {art.excerpt[lang] || art.excerpt.pt}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span className="text-purple-700 font-semibold truncate max-w-[200px]">
                          🎙️ {art.communicationTone?.[lang] || art.communicationTone?.pt || 'Prático'}
                        </span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Auditado</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                      <span>
                        {lang === 'pt' ? 'Ler artigo completo' : lang === 'en' ? 'Read full article' : 'Lire l’article complet'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Also render the Category Hub below filtered results for easy exploration */}
              <div className="pt-6 border-t border-slate-200">
                {renderCategoryHub()}
              </div>
            </div>
          )}

          {/* Quick Tools Launch Bar at the Bottom of Blog Showcase */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Acesso Imediato sem Burocracia
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {lang === 'pt' ? 'Ferramentas Oficiais Integradas do PaieNet.qc' : 'Outils Officiels Intégrés'}
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                100% Gratuito · Cálculos Oficiais do Québec
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  onSelectTool('net-calc');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-blue-600 text-left transition-colors cursor-pointer group"
              >
                <Calculator className="w-4 h-4 text-blue-400 group-hover:text-white mb-1.5" />
                <span className="font-bold block text-white">Salário Líquido</span>
                <span className="text-[10px] text-slate-400 group-hover:text-blue-100">Contracheque completo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTool('overtime');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-amber-600 text-left transition-colors cursor-pointer group"
              >
                <Clock className="w-4 h-4 text-amber-400 group-hover:text-white mb-1.5" />
                <span className="font-bold block text-white">Horas Extras</span>
                <span className="text-[10px] text-slate-400 group-hover:text-amber-100">1.5x CNESST</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTool('salary-converter');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-purple-600 text-left transition-colors cursor-pointer group"
              >
                <TrendingUp className="w-4 h-4 text-purple-400 group-hover:text-white mb-1.5" />
                <span className="font-bold block text-white">Conversor</span>
                <span className="text-[10px] text-slate-400 group-hover:text-purple-100">Hora ⇄ Mês ⇄ Ano</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTool('resume-builder');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-emerald-600 text-left transition-colors cursor-pointer group"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400 group-hover:text-white mb-1.5" />
                <span className="font-bold block text-white">Currículo ATS</span>
                <span className="text-[10px] text-slate-400 group-hover:text-emerald-100">Canadá e Québec</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTool('interview-simulator');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-rose-600 text-left transition-colors cursor-pointer group"
              >
                <Target className="w-4 h-4 text-rose-400 group-hover:text-white mb-1.5" />
                <span className="font-bold block text-white">Simulador STAR</span>
                <span className="text-[10px] text-slate-400 group-hover:text-rose-100">Entrevistas Reais</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectTool('canada-provinces');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-indigo-600 text-left transition-colors cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-indigo-400 group-hover:text-white mb-1.5" />
                <span className="font-bold block text-white">13 Províncias</span>
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-100">Comparativo</span>
              </button>
            </div>
          </div>

          {/* Newsletter Box at Footer */}
          <div className="pt-2">
            <NewsletterBox lang={lang} variant="banner" />
          </div>
        </div>
      )}
    </div>
  );
};
