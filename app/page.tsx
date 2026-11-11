'use client';

import React, { useState, useMemo, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TaxInput,
  calculateQuebecPay,
  formatCurrency,
  PayFrequency,
  SalaryEntryMode,
} from '@/lib/tax-engine';
import { Language, translations } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { SalaryInputs } from '@/components/SalaryInputs';
import { WorkspaceQuickSummary } from '@/components/WorkspaceQuickSummary';
import { MainResultCard } from '@/components/MainResultCard';
import { CascadeTable } from '@/components/CascadeTable';
import { CascadeQuickSummaryCard } from '@/components/CascadeQuickSummaryCard';
import { DeductionsBreakdown } from '@/components/DeductionsBreakdown';
import { QuebecBenefitsTools } from '@/components/QuebecBenefitsTools';
import { RaiseSimulator } from '@/components/RaiseSimulator';
import { PrecisionCard } from '@/components/PrecisionCard';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { ToolboxGrid, ToolId } from '@/components/ToolboxGrid';
import { SalaryConverter } from '@/components/SalaryConverter';
import { OvertimeCalculator } from '@/components/OvertimeCalculator';
import { JobOfferComparator } from '@/components/JobOfferComparator';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { JobResumeOptimizerPage } from '@/components/JobResumeOptimizerPage';
import { InterviewSimulator } from '@/components/InterviewSimulator';
import { TechnicalTestsSimulator } from '@/components/TechnicalTestsSimulator';
import { BlogSection } from '@/components/BlogSection';
import { SiteCompliancePages, ComplianceTab } from '@/components/SiteCompliancePages';
import { EbookStorePage } from '@/components/EbookStorePage';
import { ProPlansPage } from '@/components/ProPlansPage';
import { ScenariosPage } from '@/components/ScenariosPage';
import { NewsletterBox } from '@/components/NewsletterBox';
import { AdminPanel } from '@/components/AdminPanel';
import { UnifiedSalaryCalculator } from '@/components/UnifiedSalaryCalculator';
import { InterprovincialSalaryComparator } from '@/components/InterprovincialSalaryComparator';
import { ResourceHubSection } from '@/components/ResourceHubSection';
import { GuidesAndResources } from '@/components/GuidesAndResources';
import { AuthModal } from '@/components/AuthModal';
import { BreadcrumbsNav } from '@/components/BreadcrumbsNav';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { CommandPalette } from '@/components/CommandPalette';
import { adminStore } from '@/lib/admin-store';
import {
  Calculator,
  Repeat,
  TrendingUp,
  Timer,
  Scale,
  Palmtree,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  Printer,
  CheckCircle2,
  FileText,
  Mic,
  FileCheck2,
  Crown,
} from 'lucide-react';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('pt'); // Default Portuguese as requested
  const [activeTool, setActiveTool] = useState<ToolId>('net-calc');
  const [netCalcView, setNetCalcView] = useState<'workspace' | 'results'>('workspace');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedEbookAssetId, setSelectedEbookAssetId] = useState<string | undefined>(undefined);
  const [selectedBlogArticleId, setSelectedBlogArticleId] = useState<string | null>(null);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('all');
  const [complianceTab, setComplianceTab] = useState<ComplianceTab>('sitemap');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenEbookModal = (assetId?: string) => {
    if (assetId) setSelectedEbookAssetId(assetId);
    handleSelectTool('ebook-store');
  };

  // Monetization & Pro features (reactive & SSR hydration safe)
  const isPro = useSyncExternalStore(
    (cb) => adminStore.subscribe(cb),
    () => adminStore.isProUser(),
    () => false
  );
  const [_monetizationTrigger, setMonetizationTrigger] = useState<string | undefined>(undefined);

  const handleUnlockPro = () => {
    adminStore.setProUser(true);
    setToastMessage('🎉 Pass PaieNet Carrière Pro débloqué !');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenProModal = (triggerMsg?: string) => {
    if (triggerMsg) setMonetizationTrigger(triggerMsg);
    handleSelectTool('pro-plans');
  };

  // Default parameters for standard Quebec hourly worker
  const [input, setInput] = useState<TaxInput>({
    entryMode: 'hourly',
    annualGrossSalary: 52000,
    periodGrossSalary: 2000,
    hourlyRate: 25.0,
    regularHoursPerWeek: 40,
    overtime15HoursPerWeek: 0,
    overtime20HoursPerWeek: 0,
    frequency: 'biweekly',
    mode: 'simple',
    shiftPremiumType: 'fixed',
    shiftPremiumAmount: 0,
    healthInsuranceEmployee: 0,
    lifeAndDisabilityInsuranceEmployee: 0,
    dentalInsuranceEmployee: 0,
    employerTaxableBenefits: 0,
    groupRrspType: 'percent',
    groupRrspValue: 0,
    unionDuesType: 'percent',
    unionDuesValue: 0,
    otherDeductionsPerPay: 0,
  });

  // Calculation memoized
  const calculation = useMemo(() => {
    return calculateQuebecPay(input);
  }, [input]);

  const t = translations[lang];
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  const handleEntryModeChange = (mode: SalaryEntryMode) => {
    const regHours = Math.max(0.5, input.regularHoursPerWeek || 40);
    const updated = { ...input, entryMode: mode };
    if (mode === 'annual') {
      const annual = input.annualGrossSalary || input.hourlyRate * regHours * 52;
      updated.annualGrossSalary = Math.round(annual);
      updated.hourlyRate = Math.round((annual / (regHours * 52)) * 100) / 100;
    } else if (mode === 'biweekly') {
      const biweekly = input.periodGrossSalary || input.hourlyRate * regHours * 2;
      updated.periodGrossSalary = Math.round(biweekly);
      updated.hourlyRate = Math.round((biweekly / (regHours * 2)) * 100) / 100;
    }
    setInput(updated);
  };

  const handleFrequencyChange = (freq: PayFrequency) => {
    setInput((prev) => ({ ...prev, frequency: freq }));
  };

  // 1-Click Loader for the real paystub from Biscuits Leclerc
  const handleLoadLeclercExample = () => {
    setInput({
      entryMode: 'hourly',
      annualGrossSalary: 64800,
      periodGrossSalary: 2520.8,
      hourlyRate: 31.51,
      regularHoursPerWeek: 36, // 72 hours per 2-week pay period (36h/week)
      overtime15HoursPerWeek: 0,
      overtime20HoursPerWeek: 0,
      frequency: 'biweekly',
      mode: 'advanced',
      shiftPremiumType: 'fixed',
      shiftPremiumAmount: 252.08, // Prime 36/40
      healthInsuranceEmployee: 74.28, // Assurance médicale
      lifeAndDisabilityInsuranceEmployee: 16.3, // Ass. vie base 13.68 + accident 1.06 + charge 1.56
      dentalInsuranceEmployee: 0,
      employerTaxableBenefits: 56.13, // Avantages imposables
      groupRrspType: 'percent',
      groupRrspValue: 0,
      unionDuesType: 'percent',
      unionDuesValue: 0,
      otherDeductionsPerPay: 9.0, // 3 repas cafétéria à $3
    });

    setActiveTool('net-calc');
    setNetCalcView('workspace');
    setToastMessage(t.loadedExampleSuccess);
    setTimeout(() => setToastMessage(null), 3500);

    adminStore.logEvent({
      id: `evt-${Date.now()}`,
      timestamp: 'Agora mesmo',
      type: 'salary_calc',
      summary: 'Carregamento do Holerite Real (Biscuits Leclerc - $31.51/h)',
      location: 'Québec City, QC',
      details: 'Contracheque industrial com adicionais e retenções exatas',
    });
  };

  const handleSelectTool = (tool: ToolId) => {
    setIsMobileMenuOpen(false);
    if (tool === 'factory-stub') {
      handleLoadLeclercExample();
      return;
    }
    setActiveTool(tool);
    if (tool === 'net-calc') {
      setNetCalcView('workspace');
    }
    if (typeof window !== 'undefined') {
      window.location.hash = tool;
    }
    if (tool !== 'admin') {
      adminStore.logEvent({
        id: `evt-${Date.now()}`,
        timestamp: 'Agora mesmo',
        type: 'tool_view',
        summary: `Navegação para a ferramenta: ${tool}`,
        location: 'Québec, Canada',
      });
    }
  };

  // Sync hash on initial load & popstate/hashchange
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.replace('#', '') as ToolId;
        const validTools: ToolId[] = [
          'net-calc',
          'converter',
          'raise',
          'overtime',
          'compare-jobs',
          'canada-provinces',
          'resources',
          'vacation-holidays',
          'rrsp-savings',
          'factory-stub',
          'resume-builder',
          'optimize-resume',
          'interview-simulator',
          'tech-tests',
          'blog',
          'sitemap',
          'admin',
          'ebook-store',
          'pro-plans',
          'scenarios',
        ];
        if (validTools.includes(hash)) {
          if (hash === 'factory-stub') {
            handleLoadLeclercExample();
          } else {
            setActiveTool(hash);
          }
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleApplyRaise = (newRate: number) => {
    const regHours = Math.max(0.5, input.regularHoursPerWeek || 40);
    setInput((prev) => ({
      ...prev,
      hourlyRate: newRate,
      annualGrossSalary: Math.round(newRate * regHours * 52),
      periodGrossSalary: Math.round(newRate * regHours * 2 * 100) / 100,
    }));
    setToastMessage(`Salário base atualizado para $${newRate.toFixed(2)}/h!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopySummary = () => {
    const text = `📊 PaieNet Québec - Resumo de Salário
----------------------------------
Taxa Horária Base: $${input.hourlyRate.toFixed(2)}/h (${calculation.totalHoursPerWeek}h/sem)
${input.mode === 'advanced' && input.shiftPremiumAmount > 0 ? `Adicional de Turno / Prime: $${input.shiftPremiumAmount.toFixed(2)}\n` : ''}Fréquence: ${calculation.selectedPeriod.label}
Bruto: ${formatCurrency(calculation.selectedPeriod.gross, locale)}
Retenções Totais: ${formatCurrency(calculation.selectedPeriod.totalDeductions, locale)} (${calculation.selectedPeriod.effectiveTaxRate}%)
👉 LÍQUIDO NO BOLSO: ${formatCurrency(calculation.selectedPeriod.net, locale)}
Líquido real por hora: ${formatCurrency(calculation.effectiveHourlyRateNet, locale)}/h
Grau de Precisão: ${calculation.precision.score.toFixed(0)}% (${calculation.precision.label})
----------------------------------
Calculado no PaieNet Québec (Barèmes 2025/2026)`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Dedicated Admin & Monetization Backoffice View
  if (activeTool === 'admin') {
    return (
      <AdminPanel
        onBackToPortal={() => {
          setActiveTool('net-calc');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToBlogArticle={(articleId) => {
          setSelectedBlogArticleId(articleId);
          setActiveTool('blog');
          window.scrollTo({ top: 120, behavior: 'smooth' });
        }}
        lang={lang}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-950 pb-28 sm:pb-16 overflow-x-clip w-full max-w-full">
      {/* 1. Header with Centralized Tools Menu, Language and Pro Pass */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onCopySummary={handleCopySummary}
        copied={copied}
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
        hourlyRate={input.hourlyRate}
        netAmount={calculation.selectedPeriod.net}
        locale={locale}
        onOpenScenarios={() => handleSelectTool('scenarios')}
        frequencyLabel={calculation.selectedPeriod.label}
        totalHoursPerWeek={calculation.totalHoursPerWeek}
        onLoadLeclercExample={handleLoadLeclercExample}
        isPro={isPro}
        onOpenProModal={handleOpenProModal}
        onOpenEbookModal={handleOpenEbookModal}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectBlogCategory={(category) => {
          setIsMobileMenuOpen(false);
          setSelectedBlogCategory(category);
          setActiveTool('blog');
        }}
        onScrollToBlogSection={(sectionId) => {
          setIsMobileMenuOpen(false);
          setActiveTool('blog');
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 120);
        }}
      />

      {/* 2. Main Focused Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Universal Breadcrumbs Navigation Path for All Tools & Pages */}
        <BreadcrumbsNav
          lang={lang}
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          netCalcView={netCalcView}
          onNetCalcViewChange={setNetCalcView}
          selectedBlogCategory={selectedBlogCategory}
          onSelectBlogCategory={setSelectedBlogCategory}
          selectedBlogArticleId={selectedBlogArticleId}
          onClearBlogArticle={() => setSelectedBlogArticleId(null)}
          complianceTab={complianceTab}
          onSelectComplianceTab={setComplianceTab}
        />

        {/* Render Active Tool Workspace */}
        <AnimatePresence mode="wait">
          {/* TOOL 1: NET PAY CALCULATOR */}
          {activeTool === 'net-calc' && (
            <motion.div
              key="net-calc-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {netCalcView === 'workspace' ? (
                /* FUSED UNIFIED SALARY CALCULATOR (INPUTS + LIVE PREVIEW FUSED IN ONE MASTER COMPONENT) */
                <div className="space-y-6">
                  <UnifiedSalaryCalculator
                    input={input}
                    onChange={setInput}
                    calculation={calculation}
                    onLoadLeclercExample={handleLoadLeclercExample}
                    onViewFullResults={() => {
                      setNetCalcView('results');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onFrequencyChange={handleFrequencyChange}
                    lang={lang}
                    onOpenScenarios={() => handleSelectTool('scenarios')}
                  />

                  {/* Complementary Precision & Guarantee Hub */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PrecisionCard
                      precision={calculation.precision}
                      lang={lang}
                      onOpenScenariosModal={() => handleSelectTool('scenarios')}
                    />

                    <CascadeQuickSummaryCard
                      calc={calculation}
                      lang={lang}
                      onViewFullResults={() => {
                        setNetCalcView('results');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>

                  {/* Full Detailed Cascade Table across all 6 cycles right on the workspace */}
                  <CascadeTable calc={calculation} lang={lang} />
                </div>
              ) : (
                /* CONTRACHEQUE COMPLETO & TABELA MÁGICA EM CASCATA */
                <div className="space-y-6">
                  {/* Top Back Navigation Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setNetCalcView('workspace')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs sm:text-sm font-bold border border-slate-200 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>
                        {lang === 'pt'
                          ? '← Voltar à Área de Preenchimento'
                          : lang === 'en'
                          ? '← Back to Input Workspace'
                          : '← Retour à l’espace de saisie'}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-xs transition-colors cursor-pointer"
                      >
                        <Share2 className="w-4 h-4 text-blue-600" />
                        <span>{copied ? t.copiedSuccess : t.shareCopyBtn}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-xs transition-colors cursor-pointer"
                      >
                        <Printer className="w-4 h-4 text-slate-600" />
                        <span>{t.printBtn}</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlight Result Card */}
                  <MainResultCard
                    calc={calculation}
                    lang={lang}
                    currentFrequency={input.frequency}
                    onFrequencyChange={handleFrequencyChange}
                    currentEntryMode={input.entryMode || 'hourly'}
                    onEntryModeChange={handleEntryModeChange}
                  />

                  {/* Deductions Breakdown */}
                  <DeductionsBreakdown calc={calculation} lang={lang} />

                  {/* Cascade Table across all 6 cycles */}
                  <CascadeTable calc={calculation} lang={lang} />
                </div>
              )}
            </motion.div>
          )}

          {/* TOOL 2: SALARY CONVERTER */}
          {activeTool === 'converter' && (
            <motion.div
              key="converter-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <SalaryConverter lang={lang} />
            </motion.div>
          )}

          {/* TOOL 3: RAISE SIMULATOR */}
          {activeTool === 'raise' && (
            <motion.div
              key="raise-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <RaiseSimulator
                input={input}
                lang={lang}
                onApplyRaise={handleApplyRaise}
              />
            </motion.div>
          )}

          {/* TOOL 4: OVERTIME CALCULATOR */}
          {activeTool === 'overtime' && (
            <motion.div
              key="overtime-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <OvertimeCalculator lang={lang} />
            </motion.div>
          )}

          {/* TOOL 5: JOB OFFER COMPARATOR */}
          {activeTool === 'compare-jobs' && (
            <motion.div
              key="compare-jobs-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <JobOfferComparator lang={lang} />
            </motion.div>
          )}

          {/* TOOL 5.1: INTERPROVINCIAL SALARY & PURCHASING POWER COMPARATOR */}
          {activeTool === 'canada-provinces' && (
            <motion.div
              key="canada-provinces-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <InterprovincialSalaryComparator
                lang={lang}
                onSelectTool={handleSelectTool}
                isPro={isPro}
                onOpenProModal={handleOpenProModal}
                onLoadProvinceToMainCalc={(prov, rate, hours) => {
                  setInput((prev) => ({
                    ...prev,
                    province: prov,
                    hourlyRate: rate,
                    regularHoursPerWeek: hours,
                    annualGrossSalary: Math.round(rate * hours * 52),
                    periodGrossSalary: Math.round(rate * hours * 2 * 100) / 100,
                  }));
                  setActiveTool('net-calc');
                  setNetCalcView('workspace');
                  setToastMessage(
                    lang === 'pt'
                      ? `Província alterada para ${prov} ($${rate.toFixed(2)}/h) no calculador principal!`
                      : `Province mise à jour vers ${prov} (${rate.toFixed(2)}$/h) !`
                  );
                  setTimeout(() => setToastMessage(null), 3500);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {/* TOOL 5.2: DEDICATED RESOURCE & KNOWLEDGE HUB */}
          {activeTool === 'resources' && (
            <motion.div
              key="resources-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <ResourceHubSection
                lang={lang}
                onSelectTool={handleSelectTool}
                onOpenEbookModal={handleOpenEbookModal}
                onOpenProModal={handleOpenProModal}
              />
            </motion.div>
          )}

          {/* TOOL 5.3: FREE LIBRARY AND DOWNLOADS HUB */}
          {activeTool === 'guides' && (
            <motion.div
              key="guides-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <GuidesAndResources
                lang={lang}
              />
            </motion.div>
          )}

          {/* TOOL 6: VACATION & HOLIDAYS */}
          {activeTool === 'vacation-holidays' && (
            <motion.div
              key="vacation-holidays-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <QuebecBenefitsTools calc={calculation} lang={lang} initialTab="vacation" />
            </motion.div>
          )}

          {/* TOOL 7: RRSP & TAX SAVINGS */}
          {activeTool === 'rrsp-savings' && (
            <motion.div
              key="rrsp-savings-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <QuebecBenefitsTools calc={calculation} lang={lang} initialTab="rrsp" />
            </motion.div>
          )}

          {/* TOOL 8: RESUME BUILDER (NOVO!) */}
          {activeTool === 'resume-builder' && (
            <motion.div
              key="resume-builder-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <ResumeBuilder
                lang={lang}
                isPro={isPro}
                onOpenProModal={handleOpenProModal}
                onSelectTool={handleSelectTool}
              />
            </motion.div>
          )}

          {/* TOOL: JOB-TAILORED ATS RESUME OPTIMIZER (PÁGINA COMPLETA) */}
          {activeTool === 'optimize-resume' && (
            <motion.div
              key="optimize-resume-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <JobResumeOptimizerPage
                lang={lang}
                onSelectTool={handleSelectTool}
                onOpenProModal={handleOpenProModal}
              />
            </motion.div>
          )}

          {/* TOOL 9: INTERVIEW SIMULATOR (NOVO!) */}
          {activeTool === 'interview-simulator' && (
            <motion.div
              key="interview-simulator-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <InterviewSimulator
                lang={lang}
                isPro={isPro}
                onOpenProModal={handleOpenProModal}
                onNavigateToTests={() => handleSelectTool('tech-tests')}
              />
            </motion.div>
          )}

          {/* TOOL 10: TECHNICAL TESTS (NOVO!) */}
          {activeTool === 'tech-tests' && (
            <motion.div
              key="tech-tests-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <TechnicalTestsSimulator
                lang={lang}
                isPro={isPro}
                onOpenProModal={handleOpenProModal}
                onNavigateToInterview={() => handleSelectTool('interview-simulator')}
                onSelectTool={handleSelectTool}
              />
            </motion.div>
          )}

          {/* TOOL 11: BLOG & PRATICAL GUIDES (ARTIGOS, AFILIADOS & SOLUÇÕES MAPEADAS) */}
          {activeTool === 'blog' && (
            <motion.div
              key="blog-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <BlogSection
                lang={lang}
                onSelectTool={handleSelectTool}
                onOpenEbookModal={handleOpenEbookModal}
                initialArticleId={selectedBlogArticleId}
                activeCategory={selectedBlogCategory}
                onCategoryChange={setSelectedBlogCategory}
              />
            </motion.div>
          )}

          {/* TOOL 13: SITEMAP & INSTITUTIONAL COMPLIANCE PAGES */}
          {activeTool === 'sitemap' && (
            <motion.div
              key="sitemap-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <SiteCompliancePages
                key={`compliance-${complianceTab}`}
                lang={lang}
                initialTab={complianceTab}
                onSelectTool={handleSelectTool}
                onNavigateToArticle={(articleId) => {
                  setSelectedBlogArticleId(articleId);
                  handleSelectTool('blog');
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {/* TOOL 14: GUIA DEFINITIVO & E-BOOK STORE (PÁGINA COMPLETA) */}
          {activeTool === 'ebook-store' && (
            <motion.div
              key="ebook-store-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <EbookStorePage
                lang={lang}
                onSelectTool={handleSelectTool}
                initialAssetId={selectedEbookAssetId}
              />
            </motion.div>
          )}

          {/* TOOL 15: CARRIÈRE PRO & PLANOS (PÁGINA COMPLETA) */}
          {activeTool === 'pro-plans' && (
            <motion.div
              key="pro-plans-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <ProPlansPage
                lang={lang}
                onSelectTool={handleSelectTool}
                onUnlockPro={handleUnlockPro}
              />
            </motion.div>
          )}

          {/* TOOL 16: CENÁRIOS & ESTUDO DE CASO LECLERC (PÁGINA COMPLETA) */}
          {activeTool === 'scenarios' && (
            <motion.div
              key="scenarios-workspace"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <ScenariosPage
                lang={lang}
                onSelectTool={handleSelectTool}
                onLoadLeclercExample={handleLoadLeclercExample}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. iLovePDF-Style Toolbox Grid (All Tools Showcase) */}
        <div id="toolbox-section" className="pt-8 border-t border-slate-200/80">
          <ToolboxGrid
            lang={lang}
            activeTool={activeTool}
            onSelectTool={handleSelectTool}
          />
        </div>

        {/* 4. Newsletter & Lead Magnet Callout */}
        <div className="pt-2">
          <NewsletterBox lang={lang} variant="banner" />
        </div>

        {/* 5. FAQ Section */}
        <div className="pt-6 border-t border-slate-200/80">
          <FaqSection lang={lang} />
        </div>
      </main>

      {/* Footer with Tools, Blog, Ebook and Compliance links */}
      <Footer
        lang={lang}
        onSelectTool={handleSelectTool}
        onOpenEbookModal={handleOpenEbookModal}
        onSelectComplianceTab={(tab) => {
          setComplianceTab(tab);
          handleSelectTool('sitemap');
          window.scrollTo({ top: 100, behavior: 'smooth' });
        }}
      />

      {/* Mobile Sticky Quick Summary Bar (Positioned ergonomically right above the bottom tab bar) */}
      {activeTool === 'net-calc' && netCalcView === 'workspace' && (
        <div className="lg:hidden fixed bottom-[58px] inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3.5 py-2 shadow-md flex items-center justify-between gap-3">
          <div className="text-left shrink-0">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">
              {lang === 'pt' ? 'Líquido Estimado' : lang === 'fr' ? 'Net Estimé' : 'Estimated Net'}
            </span>
            <span className="text-sm font-extrabold text-emerald-600 tabular-nums">
              {formatCurrency(calculation.selectedPeriod.net, locale)}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                  try {
                    navigator.vibrate(25);
                  } catch (_) {}
                }
                handleCopySummary();
              }}
              className="py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 min-h-[38px]"
              title={lang === 'pt' ? 'Copiar Resumo' : 'Copier'}
            >
              {copied ? '✓' : lang === 'pt' ? 'Copiar' : 'Copier'}
            </button>

            <button
              type="button"
              onClick={() => {
                setNetCalcView('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 min-h-[38px]"
            >
              <span>{lang === 'pt' ? 'Ver Contracheque' : lang === 'fr' ? 'Voir le talon' : 'View Paystub'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Ergonomic Mobile Bottom Navigation Bar (Natural Thumb Zone for Pixel 7 & Touch Viewports) */}
      <MobileBottomNav
        lang={lang}
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Floating Toast Notification */}
      {(copied || toastMessage) && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMessage || t.copiedSuccess}</span>
        </div>
      )}

      {/* Spring Security JWT Authentication & Session Inspector Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
      />

      {/* Universal Command Palette / Spotlight Search (Cmd+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectTool={handleSelectTool}
        onSelectComplianceTab={(tab) => {
          setComplianceTab(tab);
          handleSelectTool('sitemap');
          window.scrollTo({ top: 100, behavior: 'smooth' });
        }}
        onSelectBlogCategory={(cat) => {
          setSelectedBlogCategory(cat);
          handleSelectTool('blog');
          window.scrollTo({ top: 100, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
