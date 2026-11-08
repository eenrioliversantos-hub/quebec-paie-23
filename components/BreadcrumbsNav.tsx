'use client';

import React from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import { adminStore } from '@/lib/admin-store';
import { ComplianceTab } from '@/components/SiteCompliancePages';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Calculator,
  Briefcase,
  BookOpen,
  FolderOpen,
  Building2,
  Scale,
  ShieldCheck,
  Map,
  FileText,
  Lock,
  Cookie,
  Mail,
  Crown,
  Sparkles,
  Timer,
  Palmtree,
  PiggyBank,
  TrendingUp,
  MapPin,
  Mic,
  FileCheck2,
} from 'lucide-react';

interface BreadcrumbsNavProps {
  lang: Language;
  activeTool: ToolId;
  onSelectTool: (tool: ToolId) => void;
  netCalcView?: 'workspace' | 'results';
  onNetCalcViewChange?: (view: 'workspace' | 'results') => void;
  selectedBlogCategory?: string;
  onSelectBlogCategory?: (cat: string) => void;
  selectedBlogArticleId?: string | null;
  onClearBlogArticle?: () => void;
  complianceTab?: ComplianceTab;
  onSelectComplianceTab?: (tab: ComplianceTab) => void;
}

interface BreadcrumbSegment {
  label: string;
  onClick?: () => void;
  isCurrent?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({
  lang,
  activeTool,
  onSelectTool,
  netCalcView = 'workspace',
  onNetCalcViewChange,
  selectedBlogCategory,
  onSelectBlogCategory,
  selectedBlogArticleId,
  onClearBlogArticle,
  complianceTab = 'sitemap',
  onSelectComplianceTab,
}) => {
  // Multilingual dictionary for breadcrumbs
  const i18n = {
    ariaNav: {
      pt: 'Caminho de Navegação',
      fr: 'Fil d’Ariane',
      en: 'Breadcrumb Navigation',
    },
    home: {
      pt: 'Início',
      fr: 'Accueil',
      en: 'Home',
    },
    back: {
      pt: 'Voltar',
      fr: 'Retour',
      en: 'Back',
    },
    backTo: {
      pt: 'Voltar para',
      fr: 'Retour à',
      en: 'Back to',
    },
    officialBadge: {
      pt: 'Barèmes Oficiais 2026',
      fr: 'Barèmes Officiels 2026',
      en: 'Official 2026 Tables',
    },
    groups: {
      calculators: {
        pt: 'Calculadoras',
        fr: 'Calculateurs',
        en: 'Calculators',
      },
      career: {
        pt: 'Carreira & RH',
        fr: 'Carrière & Embauche',
        en: 'Career & HR',
      },
      blog: {
        pt: 'Blog & Artigos',
        fr: 'Blog & Guides',
        en: 'Blog & Articles',
      },
      content: {
        pt: 'Acervo & E-books',
        fr: 'Ressources & Guides',
        en: 'Resources & E-books',
      },
      standards: {
        pt: 'Normas Trabalhistas',
        fr: 'Normes du Travail',
        en: 'Labour Standards',
      },
      institutional: {
        pt: 'Mapa do Site & Políticas',
        fr: 'Plan du Site & Politiques',
        en: 'Sitemap & Policies',
      },
      admin: {
        pt: 'Administração',
        fr: 'Administration',
        en: 'Administration',
      },
    },
    tools: {
      'net-calc': {
        pt: 'Calculadora de Salário Líquido',
        fr: 'Calculateur de Salaire Net',
        en: 'Net Salary Calculator',
      },
      'net-calc-cascade': {
        pt: 'Memória de Cálculo & Cascata Completa',
        fr: 'Mémoire de Calcul & Talon en Cascade',
        en: 'Full Breakdown & Cascade Paystub',
      },
      converter: {
        pt: 'Conversor de Salário (Hora ⇄ Ano)',
        fr: 'Convertisseur de Salaire (Heure ⇄ An)',
        en: 'Salary Converter (Hourly ⇄ Annual)',
      },
      raise: {
        pt: 'Simulador de Aumento Salarial',
        fr: 'Simulateur d’Augmentation',
        en: 'Wage Raise Simulator',
      },
      overtime: {
        pt: 'Horas Extras CNESST (1,5× / 2,0×)',
        fr: 'Heures Supplémentaires (1,5× / 2,0×)',
        en: 'Overtime Pay CNESST (1.5× / 2.0×)',
      },
      'compare-jobs': {
        pt: 'Comparador de Ofertas (A vs B)',
        fr: 'Comparateur d’Emplois (A vs B)',
        en: 'Job Offer Comparator (A vs B)',
      },
      'canada-provinces': {
        pt: 'Salários nas 13 Províncias',
        fr: 'Salaires dans les 13 Provinces',
        en: 'Salaries in All 13 Provinces',
      },
      resources: {
        pt: 'Hub de Recursos & Modelos',
        fr: 'Centre de Ressources & Modèles',
        en: 'Resource Hub & Templates',
      },
      guides: {
        pt: 'Biblioteca de Guias Fiscais',
        fr: 'Bibliothèque de Guides Fiscaux',
        en: 'Tax & Employment Guides',
      },
      'vacation-holidays': {
        pt: 'Férias (4%/6%) & 8 Feriados CNESST',
        fr: 'Vacances (4%/6%) & 8 Fériés Légaux',
        en: 'Vacation (4%/6%) & 8 Stat Holidays',
      },
      'rrsp-savings': {
        pt: 'Match REER, CELIAPP & Poupança',
        fr: 'Match REER, CELIAPP & Épargne',
        en: 'RRSP Match, FHSA & Savings',
      },
      'factory-stub': {
        pt: 'Holerite Real: Biscuits Leclerc',
        fr: 'Talon Réel : Biscuits Leclerc',
        en: 'Real Case: Biscuits Leclerc',
      },
      'resume-builder': {
        pt: 'Gerador de CV Québec (ATS)',
        fr: 'Générateur de CV Québec (ATS)',
        en: 'Quebec Resume Builder (ATS)',
      },
      'optimize-resume': {
        pt: 'Otimizador de CV para Vagas',
        fr: 'Optimiseur de CV pour Offre',
        en: 'Job-Tailored Resume Optimizer',
      },
      'interview-simulator': {
        pt: 'Simulador de Entrevistas STAR',
        fr: 'Simulateur d’Entrevues STAR',
        en: 'STAR Interview Simulator',
      },
      'tech-tests': {
        pt: 'Testes Técnicos & SIMDUT CNESST',
        fr: 'Tests Techniques & SIMDUT CNESST',
        en: 'Technical Screening & WHMIS Tests',
      },
      blog: {
        pt: 'Portal Editorial & Artigos',
        fr: 'Portail Éditorial & Analyses',
        en: 'Editorial Blog & Guides',
      },
      sitemap: {
        pt: 'Mapa do Portal & Diretório',
        fr: 'Plan du Site & Répertoire',
        en: 'Sitemap & Directory',
      },
      compliance: {
        pt: 'Conformidade Legal & Aviso Fiscal',
        fr: 'Conformité & Mentions Légales',
        en: 'Legal Compliance & Disclaimer',
      },
      admin: {
        pt: 'Painel Administrativo',
        fr: 'Tableau de Bord Administratif',
        en: 'Administrative Control Panel',
      },
      'ebook-store': {
        pt: 'Guia de Sobrevivência Fiscal (140p)',
        fr: 'Guide Ultime de la Paie (140p)',
        en: 'Tax & Employment Guide (140p)',
      },
      'pro-plans': {
        pt: 'Pass PaieNet Carrière Pro',
        fr: 'Pass Carrière Pro',
        en: 'Carrière Pro Pass',
      },
      scenarios: {
        pt: 'Estudos de Caso & Cenários',
        fr: 'Études de Cas & Scénarios',
        en: 'Paycheck Scenarios',
      },
    },
    blogCategories: {
      'calculos-manuais': {
        pt: 'Cálculos Manuais & Fórmulas',
        fr: 'Calculs Manuels & Formules',
        en: 'Manual Math & Formulas',
      },
      'curriculo-ats': {
        pt: 'Currículo Canadense & ATS',
        fr: 'CV Canadien & Normes ATS',
        en: 'Canadian Resume & ATS',
      },
      'entrevistas-carreira': {
        pt: 'Entrevistas STAR & Testes',
        fr: 'Entretiens STAR & Tests RH',
        en: 'STAR Interviews & Tests',
      },
      'previdencia-financas': {
        pt: 'Previdência & Finanças',
        fr: 'Retraite & Finances',
        en: 'Pensions & Wealth',
      },
      'empresas-rh': {
        pt: 'Empresas, RH & Retenção',
        fr: 'Employeurs & Rétention RH',
        en: 'B2B Employers & Retention',
      },
      'momentos-de-vida': {
        pt: 'Fases de Vida & Transição',
        fr: 'Étapes de Vie & Transition',
        en: 'Life Stages & Transition',
      },
      cnesst: {
        pt: 'Normas CNESST & Direitos',
        fr: 'Normes CNESST & Droits',
        en: 'Labour Standards & Rights',
      },
      'tutoriais-ferramentas': {
        pt: 'Tutoriais dos Simuladores',
        fr: 'Tutoriels des Simulateurs',
        en: 'Tool Tutorials',
      },
      impots: {
        pt: 'Salário & Impostos',
        fr: 'Impôts & Salaire',
        en: 'Taxes & Payroll',
      },
      carriere: {
        pt: 'Carreira & Emprego',
        fr: 'Carrière & Embauche',
        en: 'Career & Hiring',
      },
      finances: {
        pt: 'Finanças & Bancos',
        fr: 'Banques & Virements',
        en: 'Finance & Banking',
      },
    },
    complianceTabs: {
      sitemap: {
        pt: 'Mapa do Site',
        fr: 'Plan du Site',
        en: 'Sitemap',
        icon: Map,
      },
      about: {
        pt: 'Sobre Nós (E-E-A-T)',
        fr: 'À Propos',
        en: 'About Us',
        icon: Building2,
      },
      terms: {
        pt: 'Termos de Uso',
        fr: 'Conditions d’Utilisation',
        en: 'Terms of Use',
        icon: FileText,
      },
      privacy: {
        pt: 'Privacidade (Lei 25 QC)',
        fr: 'Confidentialité (Loi 25)',
        en: 'Privacy Policy (Law 25)',
        icon: Lock,
      },
      cookies: {
        pt: 'Política de Cookies',
        fr: 'Gestion des Témoins',
        en: 'Cookie Policy',
        icon: Cookie,
      },
      affiliates: {
        pt: 'Transparência de Afiliados',
        fr: 'Transparence Affiliés',
        en: 'Affiliate Disclosure',
        icon: Scale,
      },
      contact: {
        pt: 'Fale Conosco & Suporte',
        fr: 'Nous Joindre & Support',
        en: 'Contact Us & Support',
        icon: Mail,
      },
    },
  };

  // Determine group metadata based on active tool
  const getToolGroup = (tool: ToolId): {
    label: string;
    targetTool: ToolId;
    icon: React.ComponentType<{ className?: string }>;
  } => {
    switch (tool) {
      case 'net-calc':
      case 'converter':
      case 'raise':
      case 'overtime':
      case 'compare-jobs':
      case 'canada-provinces':
      case 'scenarios':
      case 'factory-stub':
        return {
          label: i18n.groups.calculators[lang],
          targetTool: 'net-calc',
          icon: Calculator,
        };
      case 'resume-builder':
      case 'optimize-resume':
      case 'interview-simulator':
      case 'tech-tests':
      case 'pro-plans':
        return {
          label: i18n.groups.career[lang],
          targetTool: 'resume-builder',
          icon: Briefcase,
        };
      case 'blog':
        return {
          label: i18n.groups.blog[lang],
          targetTool: 'blog',
          icon: BookOpen,
        };
      case 'ebook-store':
      case 'resources':
      case 'guides':
        return {
          label: i18n.groups.content[lang],
          targetTool: 'ebook-store',
          icon: FolderOpen,
        };
      case 'vacation-holidays':
      case 'rrsp-savings':
        return {
          label: i18n.groups.standards[lang],
          targetTool: 'vacation-holidays',
          icon: Scale,
        };
      case 'sitemap':
      case 'compliance':
        return {
          label: i18n.groups.institutional[lang],
          targetTool: 'sitemap',
          icon: Map,
        };
      case 'admin':
        return {
          label: i18n.groups.admin[lang],
          targetTool: 'admin',
          icon: ShieldCheck,
        };
      default:
        return {
          label: i18n.groups.calculators[lang],
          targetTool: 'net-calc',
          icon: Calculator,
        };
    }
  };

  const groupInfo = getToolGroup(activeTool);
  const isHomeWorkspace = activeTool === 'net-calc' && netCalcView === 'workspace';

  // Build the hierarchical segments array
  const segments: BreadcrumbSegment[] = [
    {
      label: i18n.home[lang],
      icon: Home,
      onClick: () => {
        onSelectTool('net-calc');
        onNetCalcViewChange?.('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  // If not on net-calc workspace, append group
  if (!isHomeWorkspace) {
    segments.push({
      label: groupInfo.label,
      icon: groupInfo.icon,
      onClick: () => {
        onSelectTool(groupInfo.targetTool);
        onNetCalcViewChange?.('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  }

  // Handle specific tool sub-states
  let parentLabelForBack = groupInfo.label;
  let handleBackAction = () => {
    if (activeTool !== 'net-calc') {
      onSelectTool('net-calc');
      onNetCalcViewChange?.('workspace');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (activeTool === 'net-calc') {
    if (netCalcView === 'results') {
      parentLabelForBack = i18n.tools['net-calc'][lang];
      handleBackAction = () => {
        onNetCalcViewChange?.('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      segments.push({
        label: i18n.tools['net-calc-cascade'][lang],
        icon: Calculator,
        isCurrent: true,
      });
    } else {
      segments.push({
        label: i18n.tools['net-calc'][lang],
        icon: Calculator,
        isCurrent: true,
      });
    }
  } else if (activeTool === 'blog') {
    const allArticles = adminStore.getArticles();
    const currentArticle = selectedBlogArticleId
      ? allArticles.find((a) => a.id === selectedBlogArticleId)
      : null;

    if (currentArticle) {
      const catKey = currentArticle.category as keyof typeof i18n.blogCategories;
      const catLabel = i18n.blogCategories[catKey]?.[lang] || currentArticle.category;

      parentLabelForBack = catLabel;
      handleBackAction = () => {
        onClearBlogArticle?.();
        onSelectBlogCategory?.(currentArticle.category);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      };

      segments.push({
        label: catLabel,
        icon: BookOpen,
        onClick: () => {
          onClearBlogArticle?.();
          onSelectBlogCategory?.(currentArticle.category);
          window.scrollTo({ top: 100, behavior: 'smooth' });
        },
      });

      segments.push({
        label: currentArticle.title[lang] || currentArticle.title.pt,
        isCurrent: true,
      });
    } else if (selectedBlogCategory && selectedBlogCategory !== 'all') {
      const catKey = selectedBlogCategory as keyof typeof i18n.blogCategories;
      const catLabel = i18n.blogCategories[catKey]?.[lang] || selectedBlogCategory;

      parentLabelForBack = i18n.tools.blog[lang];
      handleBackAction = () => {
        onSelectBlogCategory?.('all');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      segments.push({
        label: catLabel,
        icon: BookOpen,
        isCurrent: true,
      });
    } else {
      parentLabelForBack = i18n.home[lang];
      handleBackAction = () => {
        onSelectTool('net-calc');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      segments.push({
        label: i18n.tools.blog[lang],
        icon: BookOpen,
        isCurrent: true,
      });
    }
  } else if (activeTool === 'sitemap') {
    if (complianceTab && complianceTab !== 'sitemap') {
      const tabInfo = i18n.complianceTabs[complianceTab];
      parentLabelForBack = i18n.complianceTabs.sitemap[lang];
      handleBackAction = () => {
        onSelectComplianceTab?.('sitemap');
        window.scrollTo({ top: 100, behavior: 'smooth' });
      };

      segments.push({
        label: i18n.complianceTabs.sitemap[lang],
        icon: Map,
        onClick: () => {
          onSelectComplianceTab?.('sitemap');
          window.scrollTo({ top: 100, behavior: 'smooth' });
        },
      });

      segments.push({
        label: tabInfo ? tabInfo[lang] : complianceTab,
        icon: tabInfo?.icon || FileText,
        isCurrent: true,
      });
    } else {
      parentLabelForBack = i18n.home[lang];
      handleBackAction = () => {
        onSelectTool('net-calc');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      segments.push({
        label: i18n.tools.sitemap[lang],
        icon: Map,
        isCurrent: true,
      });
    }
  } else {
    // Normal tool leaf
    const toolLabel = i18n.tools[activeTool]?.[lang] || activeTool;
    parentLabelForBack = groupInfo.label;
    handleBackAction = () => {
      onSelectTool(groupInfo.targetTool);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    segments.push({
      label: toolLabel,
      icon: groupInfo.icon,
      isCurrent: true,
    });
  }

  const showBackButton = !isHomeWorkspace;
  const currentSegment = segments[segments.length - 1];
  const CurrentIcon = currentSegment?.icon || Calculator;

  return (
    <nav
      aria-label={i18n.ariaNav[lang]}
      className="w-full bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 sm:px-4 sm:py-3 shadow-2xs transition-all select-none"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {/* ======================================================== */}
      {/* MOBILE-FIRST VIEWPORT (< sm, e.g. Pixel 7 ~412px)         */}
      {/* Clear thumb-friendly back trigger + readable page trail */}
      {/* ======================================================== */}
      <div className="flex flex-col gap-2 sm:hidden">
        {showBackButton ? (
          <div className="flex items-center justify-between gap-2">
            {/* Prominent Back to Parent Action Button */}
            <button
              type="button"
              onClick={handleBackAction}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100/90 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 text-xs font-bold transition-all cursor-pointer border border-slate-200 min-h-[42px] active:scale-[0.98] shadow-2xs max-w-[calc(100%-52px)] truncate"
              aria-label={`${i18n.backTo[lang]} ${parentLabelForBack}`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">
                {i18n.back[lang]}: <span className="text-slate-600 font-semibold">{parentLabelForBack}</span>
              </span>
            </button>

            {/* Direct Home Shortcut Touch Button */}
            <button
              type="button"
              onClick={() => {
                onSelectTool('net-calc');
                onNetCalcViewChange?.('workspace');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 min-h-[42px] min-w-[42px] transition-colors cursor-pointer shrink-0"
              title={i18n.home[lang]}
              aria-label={i18n.home[lang]}
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        ) : null}

        {/* Current Location Badge & Breadcrumb Path on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
            <CurrentIcon className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 min-w-0 whitespace-nowrap">
            {segments.map((segment, idx) => {
              const isLast = idx === segments.length - 1;
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {idx > 0 && (
                    <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 select-none" />
                  )}
                  {segment.onClick && !isLast ? (
                    <button
                      type="button"
                      onClick={segment.onClick}
                      className="text-slate-500 hover:text-blue-600 transition-colors cursor-pointer py-1 truncate max-w-[120px]"
                      itemProp="item"
                    >
                      <span itemProp="name">{segment.label}</span>
                    </button>
                  ) : (
                    <span
                      className={`truncate max-w-[200px] ${
                        isLast ? 'font-bold text-slate-900' : 'text-slate-600'
                      }`}
                      aria-current={isLast ? 'page' : undefined}
                      itemProp="name"
                    >
                      {segment.label}
                    </span>
                  )}
                  <meta itemProp="position" content={String(idx + 1)} />
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TABLET & DESKTOP VIEWPORT (>= sm)                         */}
      {/* Full horizontal trail with microdata and official marker */}
      {/* ======================================================== */}
      <div className="hidden sm:flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto no-scrollbar py-0.5">
          {/* Back button if not at home */}
          {showBackButton && (
            <button
              type="button"
              onClick={handleBackAction}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all cursor-pointer shrink-0 border border-slate-200 active:scale-95 min-h-[36px]"
              title={`${i18n.backTo[lang]} ${parentLabelForBack}`}
              aria-label={`${i18n.backTo[lang]} ${parentLabelForBack}`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
              <span>{i18n.back[lang]}</span>
            </button>
          )}

          {/* Breadcrumb Segments List */}
          <ol className="flex items-center gap-2 text-xs font-medium text-slate-500 whitespace-nowrap min-w-0">
            {segments.map((segment, idx) => {
              const isLast = idx === segments.length - 1;
              const IconComp = segment.icon;

              return (
                <li
                  key={idx}
                  className="inline-flex items-center gap-2 min-w-0"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {idx > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 select-none" />
                  )}

                  {segment.onClick && !isLast ? (
                    <button
                      type="button"
                      onClick={segment.onClick}
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 py-1 px-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                      itemProp="item"
                    >
                      {IconComp && (
                        <IconComp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span
                        className="max-w-[140px] md:max-w-[200px] lg:max-w-none truncate"
                        itemProp="name"
                      >
                        {segment.label}
                      </span>
                    </button>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1.5 py-1 px-2 rounded-lg ${
                        isLast
                          ? 'font-extrabold text-slate-900 bg-slate-100/60'
                          : 'text-slate-600'
                      }`}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {IconComp && (
                        <IconComp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                      <span
                        className="max-w-[180px] md:max-w-[320px] lg:max-w-none truncate"
                        itemProp="name"
                      >
                        {segment.label}
                      </span>
                    </span>
                  )}
                  <meta itemProp="position" content={String(idx + 1)} />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Quiet Official Verification Marker (Constitution compliant: No decorative dots) */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 shrink-0 border-l border-slate-200 pl-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-slate-700">{i18n.officialBadge[lang]}</span>
        </div>
      </div>
    </nav>
  );
};
