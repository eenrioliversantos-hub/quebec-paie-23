'use client';

import React, { useSyncExternalStore } from 'react';
import { Language, translations } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import { adminStore } from '@/lib/admin-store';
import { ComplianceTab } from '@/components/SiteCompliancePages';
import {
  Calculator,
  Briefcase,
  BookOpen,
  Building2,
  ShieldCheck,
  FileText,
  Lock,
  Cookie,
  Scale,
  Mail,
  ExternalLink,
  ArrowUp,
  Sparkles,
  Crown,
  Map,
  Users,
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  onSelectTool?: (tool: ToolId) => void;
  onOpenEbookModal?: () => void;
  onSelectComplianceTab?: (tab: ComplianceTab) => void;
}

const FOOTER_I18N = {
  tagline: {
    pt: 'O portal independente de referência no Québec para cálculo oficial do salário líquido 2026, normas CNESST, empregabilidade e finanças.',
    fr: 'Le portail québécois de référence pour le calcul officiel du salaire net 2026, les normes CNESST, la carrière et les finances.',
    en: 'The benchmark Quebec independent portal for official 2026 net pay calculations, CNESST standards, careers, and personal finance.',
  },
  backToTop: {
    pt: 'Voltar ao topo',
    fr: 'Haut de page',
    en: 'Back to top',
  },
  sections: {
    calculators: {
      pt: 'Calculadoras & Salário',
      fr: 'Calculateurs & Salaire',
      en: 'Calculators & Pay',
    },
    career: {
      pt: 'Carreira & Empregabilidade',
      fr: 'Carrière & Embauche',
      en: 'Career & Employment',
    },
    content: {
      pt: 'Conteúdo & Conhecimento',
      fr: 'Guides & Ressources',
      en: 'Guides & Knowledge',
    },
    compliance: {
      pt: 'Conformidade & Suporte',
      fr: 'Conformité & Support',
      en: 'Compliance & Support',
    },
    institutional: {
      pt: 'Conformidade, Transparência & Links Institucionais',
      fr: 'Conformité, Transparence & Mentions Légales',
      en: 'Compliance, Transparency & Legal Directory',
    },
  },
  links: {
    netCalc: {
      pt: 'Salário Líquido Québec 2026',
      fr: 'Salaire Net Québec 2026',
      en: 'Quebec Net Pay 2026',
    },
    converter: {
      pt: 'Conversor de Períodos (Hora ⇄ Ano)',
      fr: 'Convertisseur de Périodes (Heure ⇄ An)',
      en: 'Period Converter (Hourly ⇄ Annual)',
    },
    overtime: {
      pt: 'Horas Extras CNESST (1.5× / 2.0×)',
      fr: 'Heures Supplémentaires (1,5× / 2,0×)',
      en: 'Overtime Pay CNESST (1.5× / 2.0×)',
    },
    compareJobs: {
      pt: 'Comparador de Propostas (A vs B)',
      fr: 'Comparateur d’Emplois (A vs B)',
      en: 'Job Offer Comparator (A vs B)',
    },
    caseStudy: {
      pt: 'Estudo de Caso: Biscuits Leclerc ($31.51/h)',
      fr: 'Étude de Cas : Biscuits Leclerc (31,51 $/h)',
      en: 'Case Study: Biscuits Leclerc ($31.51/h)',
    },
    proPlans: {
      pt: 'Pass Carrière Pro (Acesso Total)',
      fr: 'Pass Carrière Pro (Accès Intégral)',
      en: 'Pass Carrière Pro (Full Access)',
    },
    resumeBuilder: {
      pt: 'Construtor de CV Québec (Padrão ATS)',
      fr: 'Créateur de CV Québec (Format ATS)',
      en: 'Quebec Resume Builder (ATS Format)',
    },
    interview: {
      pt: 'Simulador de Entrevistas STAR',
      fr: 'Simulateur d’Entrevues STAR',
      en: 'STAR Interview Simulator',
    },
    techTests: {
      pt: 'Testes Técnicos & SIMDUT / CNESST',
      fr: 'Tests Techniques & SIMDUT / CNESST',
      en: 'Technical & WHMIS / CNESST Tests',
    },
    ebookStore: {
      pt: 'Guia de Sobrevivência Fiscal (140p PDF)',
      fr: 'Guide Ultime de la Paie (140p PDF)',
      en: 'Tax & Employment Guide (140p PDF)',
    },
    blog: {
      pt: 'Blog & Artigos Fiscais Especializados',
      fr: 'Blog & Dossiers Fiscaux Pratiques',
      en: 'Blog & Specialized Tax Articles',
    },
    vacation: {
      pt: 'Normas CNESST: Férias (4%/6%) & 8 Feriados',
      fr: 'Normes CNESST : Vacances (4%/6%) & Fériés',
      en: 'CNESST Standards: Vacation (4%/6%) & Holidays',
    },
    editorialPolicy: {
      pt: 'Transparência Editorial 100% Auditada',
      fr: 'Transparence Éditoriale 100% Auditée',
      en: '100% Audited Editorial Transparency',
    },
  },
  complianceTabs: {
    sitemap: {
      label: {
        pt: 'Mapa do Site',
        fr: 'Plan du Site',
        en: 'Sitemap',
      },
      desc: {
        pt: 'Índice de páginas e recursos',
        fr: 'Index de navigation complet',
        en: 'Complete directory index',
      },
    },
    about: {
      label: {
        pt: 'Sobre Nós (E-E-A-T)',
        fr: 'À Propos (E-E-A-T)',
        en: 'About Us (E-E-A-T)',
      },
      desc: {
        pt: 'Equipe e metodologia editorial',
        fr: 'Équipe et méthodologie',
        en: 'Team and methodology',
      },
    },
    terms: {
      label: {
        pt: 'Termos de Uso',
        fr: 'Conditions d’Utilisation',
        en: 'Terms of Use',
      },
      desc: {
        pt: 'Condições de serviço e licença',
        fr: 'Conditions générales',
        en: 'Service terms and license',
      },
    },
    privacy: {
      label: {
        pt: 'Privacidade (Lei 25 QC)',
        fr: 'Confidentialité (Loi 25)',
        en: 'Privacy Policy (Law 25)',
      },
      desc: {
        pt: 'Proteção de dados do Québec',
        fr: 'Protection des données QC',
        en: 'Quebec data protection',
      },
    },
    cookies: {
      label: {
        pt: 'Política de Cookies',
        fr: 'Gestion des Témoins',
        en: 'Cookie Policy',
      },
      desc: {
        pt: 'Preferências e rastreamento',
        fr: 'Préférences et suivi',
        en: 'Preferences and tracking',
      },
    },
    affiliates: {
      label: {
        pt: 'Transparência de Afiliados',
        fr: 'Transparence Affiliés',
        en: 'Affiliate Disclosure',
      },
      desc: {
        pt: 'Divulgação comercial (FTC / AdSense)',
        fr: 'Divulgation commerciale',
        en: 'Commercial disclosure',
      },
    },
    contact: {
      label: {
        pt: 'Fale Conosco & Suporte',
        fr: 'Nous Joindre & Support',
        en: 'Contact Us & Support',
      },
      desc: {
        pt: 'Atendimento e canal editorial',
        fr: 'Service aux utilisateurs',
        en: 'Customer and editorial channel',
      },
    },
  },
  disclaimer: {
    title: {
      pt: 'Aviso Legal & Fontes Governamentais Oficiais',
      fr: 'Avertissement Légal & Sources Officielles',
      en: 'Legal Disclaimer & Official Government Sources',
    },
    text: {
      pt: 'Este portal fornece simulações salariais de alta precisão calibradas rigorosamente com base nas tabelas oficiais do Revenu Québec (TP-1015.3) e da Agência de Renda do Canada / CRA (Guia T4127). Nossos cálculos contemplam as deduções do RRQ (Régime de rentes du Québec), RRQ suplementar, RQAP, Seguro-Emprego e o Abatimento do Québec de 16,5%. Os valores gerados têm finalidade informativa e de orientação profissional.',
      fr: 'Ce portail fournit des estimations salariales fiables basées rigoureusement sur les tables d’imposition de Revenu Québec (TP-1015.3) et de l’Agence du revenu du Canada (Guide T4127). Nos calculs intègrent les déductions au RRQ, RQAP, AE ainsi que l’abattement du Québec de 16,5 %. Les montants présentés ont une visée informative et d’orientation professionnelle.',
      en: 'This portal provides accurate wage simulations aligned with official Revenu Québec (TP-1015.3) and Canada Revenue Agency (Guide T4127) tax withholding tables. All calculations reflect QPP, QPIP, EI, and the 16.5% Quebec Abatement. Results are provided for informational and career planning purposes.',
    },
  },
  bottom: {
    rights: {
      pt: 'Todos os direitos reservados. Portal salarial independente desenvolvido para trabalhadores e empresas do Québec.',
      fr: 'Tous droits réservés. Portail salarial indépendant conçu pour les travailleurs et entreprises du Québec.',
      en: 'All rights reserved. Independent salary portal built for Quebec workers and employers.',
    },
    ratesBadge: {
      pt: 'Tabelas Fiscais 2026 Auditadas',
      fr: 'Barèmes Fiscaux 2026 Vérifiés',
      en: '2026 Tax Tables Audited',
    },
    privacyBadge: {
      pt: 'Zero Coleta de Dados Pessoais',
      fr: 'Aucune Donnée Personnelle Collectée',
      en: 'Zero Personal Data Collection',
    },
    adminLink: {
      pt: 'Área Restrita / Admin',
      fr: 'Espace Restreint / Admin',
      en: 'Restricted Backoffice / Admin',
    },
  },
};

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectTool,
  onOpenEbookModal,
  onSelectComplianceTab,
}) => {
  const t = translations[lang];

  const handleComplianceClick = (tab: ComplianceTab) => {
    if (onSelectComplianceTab) {
      onSelectComplianceTab(tab);
    } else if (onSelectTool) {
      onSelectTool('sitemap');
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 sm:mt-16 border-t border-slate-200/90 bg-white text-slate-500 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* ========================================================= */}
        {/* 1. TOP BRAND, MISSION & BACK-TO-TOP ROW                    */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  PaieNet<span className="text-blue-600">.qc</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-normal">
                  Québec
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {FOOTER_I18N.tagline[lang]}
            </p>
          </div>

          {/* Quick Back to Top Touch Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 min-h-[44px]"
            aria-label={FOOTER_I18N.backToTop[lang]}
          >
            <ArrowUp className="w-4 h-4 text-blue-600" />
            <span>{FOOTER_I18N.backToTop[lang]}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. RESPONSIVE NAVIGATION COLUMNS (2-Col Mobile / 4-Col Desktop) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-xs">
          {/* Column 1: Calculadoras */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
              <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{FOOTER_I18N.sections.calculators[lang]}</span>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('net-calc')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.netCalc[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('converter')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.converter[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('overtime')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.overtime[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('compare-jobs')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.compareJobs[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('scenarios')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-blue-700 font-semibold hover:text-blue-800 hover:bg-blue-50/50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.caseStudy[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Carreira & Empregabilidade */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold uppercase tracking-wider text-[11px]">
              <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{FOOTER_I18N.sections.career[lang]}</span>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('pro-plans')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-indigo-700 font-bold hover:text-indigo-800 hover:bg-indigo-50/60 transition-colors cursor-pointer text-xs leading-snug flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{FOOTER_I18N.links.proPlans[lang]}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('resume-builder')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.resumeBuilder[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('interview-simulator')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.interview[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('tech-tests')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.techTests[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Guias & Recursos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold uppercase tracking-wider text-[11px]">
              <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{FOOTER_I18N.sections.content[lang]}</span>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenEbookModal) onOpenEbookModal();
                    else onSelectTool?.('ebook-store');
                  }}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-amber-900 font-bold hover:text-amber-950 hover:bg-amber-50/70 transition-colors cursor-pointer text-xs leading-snug flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{FOOTER_I18N.links.ebookStore[lang]}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('blog')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-amber-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.blog[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool?.('vacation-holidays')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-amber-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.links.vacation[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Conformidade & Informações Legais */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-800 font-bold uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{FOOTER_I18N.sections.compliance[lang]}</span>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleComplianceClick('sitemap')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.complianceTabs.sitemap.label[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleComplianceClick('about')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.complianceTabs.about.label[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleComplianceClick('terms')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.complianceTabs.terms.label[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleComplianceClick('privacy')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.complianceTabs.privacy.label[lang]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleComplianceClick('contact')}
                  className="w-full text-left py-1.5 px-1 rounded-lg text-slate-600 hover:text-indigo-800 hover:bg-slate-50 transition-colors cursor-pointer text-xs leading-snug"
                >
                  {FOOTER_I18N.complianceTabs.contact.label[lang]}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. OFFICIAL SOURCES & GOVERNMENT DISCLOSURE BOX           */}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-600 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-700 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                {FOOTER_I18N.disclaimer.title[lang]}
              </h4>
              <p className="text-[11px] sm:text-xs leading-relaxed text-slate-600">
                {FOOTER_I18N.disclaimer.text[lang]}
              </p>
            </div>
          </div>

          {/* Touch-Friendly Responsive Government Source Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/60">
            <a
              href="https://www.revenuquebec.ca/fr/entreprises/retenues-et-cotisations/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 text-slate-700 hover:text-slate-950 text-[11px] font-semibold transition-all min-h-[40px] shadow-2xs group"
            >
              <span className="truncate">Revenu Québec (TP-1015.3)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 ml-1.5" />
            </a>

            <a
              href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/retenues-paie.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 text-slate-700 hover:text-slate-950 text-[11px] font-semibold transition-all min-h-[40px] shadow-2xs group"
            >
              <span className="truncate">Agence du revenu du Canada (T4127)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 ml-1.5" />
            </a>

            <a
              href="https://www.cnesst.gouv.qc.ca/fr/normes-travail"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60 text-slate-700 hover:text-slate-950 text-[11px] font-semibold transition-all min-h-[40px] shadow-2xs group"
            >
              <span className="truncate">CNESST (Normes du travail)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 ml-1.5" />
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. INSTITUTIONAL & COMPLIANCE SECTION (USER'S MAIN FOCUS) */}
        {/* Mobile-first, centered, clean touch tiles with icons     */}
        {/* ========================================================= */}
        <div className="pt-6 pb-2 border-t border-slate-200/80 space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {FOOTER_I18N.sections.institutional[lang]}
            </span>
          </div>

          {/* Symmetrical, perfectly centered responsive touch grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 max-w-5xl mx-auto">
            {/* 1. Sitemap */}
            <button
              type="button"
              onClick={() => handleComplianceClick('sitemap')}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <Map className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.sitemap.label[lang]}
              </span>
            </button>

            {/* 2. About Us */}
            <button
              type="button"
              onClick={() => handleComplianceClick('about')}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.about.label[lang]}
              </span>
            </button>

            {/* 3. Terms of Use */}
            <button
              type="button"
              onClick={() => handleComplianceClick('terms')}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.terms.label[lang]}
              </span>
            </button>

            {/* 4. Privacy */}
            <button
              type="button"
              onClick={() => handleComplianceClick('privacy')}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.privacy.label[lang]}
              </span>
            </button>

            {/* 5. Cookies */}
            <button
              type="button"
              onClick={() => handleComplianceClick('cookies')}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <Cookie className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.cookies.label[lang]}
              </span>
            </button>

            {/* 6. Affiliates */}
            <button
              type="button"
              onClick={() => handleComplianceClick('affiliates')}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <Scale className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.affiliates.label[lang]}
              </span>
            </button>

            {/* 7. Contact Us */}
            <button
              type="button"
              onClick={() => handleComplianceClick('contact')}
              className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all cursor-pointer min-h-[44px] text-center active:scale-95 shadow-2xs group"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {FOOTER_I18N.complianceTabs.contact.label[lang]}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 5. BOTTOM COPYRIGHT & TRUST STATUS METADATA               */}
        {/* Generous bottom padding to account for MobileBottomNav    */}
        {/* ========================================================= */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-[11px] pb-10 sm:pb-2">
          {/* Copyright notice */}
          <div className="text-center md:text-left text-slate-500">
            <span className="font-semibold text-slate-700">
              © {new Date().getFullYear()} PaieNet.qc
            </span>{' '}
            · {FOOTER_I18N.bottom.rights[lang]}
          </div>

          {/* Trust points & Admin restricted access */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{FOOTER_I18N.bottom.ratesBadge[lang]}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-medium">
              {FOOTER_I18N.bottom.privacyBadge[lang]}
            </span>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => onSelectTool?.('admin')}
              className="hover:text-blue-600 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium p-1 rounded hover:bg-slate-100"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{FOOTER_I18N.bottom.adminLink[lang]}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
