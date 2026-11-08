'use client';

import React, { useState } from 'react';
import {
  CalculationResult,
  formatCurrency,
  calculateQuebecVacation,
  calculateQuebecStatutoryHolidays,
  calculateQuebecRrspMatch,
} from '@/lib/tax-engine';
import { Language, translations } from '@/lib/i18n';
import {
  Palmtree,
  CalendarDays,
  PiggyBank,
} from 'lucide-react';
import { CalculatorWorkspaceLayout } from '@/components/calculator-suite/CalculatorWorkspaceLayout';
import { CalculatorLivePreviewCard } from '@/components/calculator-suite/CalculatorLivePreviewCard';
import { CalculatorResultsLayout } from '@/components/calculator-suite/CalculatorResultsLayout';

interface QuebecBenefitsToolsProps {
  calc: CalculationResult;
  lang: Language;
  initialTab?: 'vacation' | 'holidays' | 'rrsp';
}

export const QuebecBenefitsTools: React.FC<QuebecBenefitsToolsProps> = ({
  calc,
  lang,
  initialTab = 'vacation',
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'vacation' | 'holidays' | 'rrsp'>(initialTab);
  const [yearsOfService, setYearsOfService] = useState<number>(1);
  const [employeeRrspPct, setEmployeeRrspPct] = useState<number>(3);
  const [employerMatchPct, setEmployerMatchPct] = useState<number>(3);
  const [viewMode, setViewMode] = useState<'workspace' | 'results'>('workspace');

  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';
  const annualGross = calc.annualGross || 52000;
  const biweeklyGross = calc.cascade.biweekly.gross || 2000;

  // Calculators
  const vacation = calculateQuebecVacation(annualGross, yearsOfService);
  const holidays = calculateQuebecStatutoryHolidays(biweeklyGross);
  const rrsp = calculateQuebecRrspMatch(
    annualGross,
    employeeRrspPct,
    employerMatchPct,
    calc.marginalTaxRate || 28
  );

  // Active hero metric for preview card
  let heroTitle = lang === 'pt' ? 'Indenização Legal de Férias' : 'Indemnité Légale de Vacances';
  let heroAmount = vacation.indemnity;
  let heroSubtext = `${vacation.percent}% (${vacation.weeks} semanas remuneradas)`;

  if (activeTab === 'holidays') {
    heroTitle = lang === 'pt' ? 'Indenização dos 8 Feriados Oficiais' : 'Indemnité des 8 Jours Fériés';
    heroAmount = holidays.totalAnnualHolidaysPay;
    heroSubtext = `${formatCurrency(holidays.payPerHoliday, locale)} por feriado (regra 1/20)`;
  } else if (activeTab === 'rrsp') {
    heroTitle = lang === 'pt' ? 'Aporte Gratuito do Empregador (Match)' : 'Contribution Gratuite Employeur';
    heroAmount = rrsp.employerAnnualContribution;
    heroSubtext = `+${formatCurrency(rrsp.taxSavingsAtSource, locale)} de economia fiscal na fonte`;
  }

  // Tool-specific section for Results View
  const toolSpecificSection = (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Palmtree className="w-5 h-5 text-teal-600" />
            <span>
              {lang === 'pt'
                ? 'Dossiê Detalhado: Férias, Feriados e Previdência Coletiva'
                : 'Dossier Détaillé : Vacances, Fériés et Avantages CNESST'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'pt'
              ? 'Conforme a Lei de Normas do Trabalho do Québec (Loi sur les normes du travail - LNT).'
              : 'Conforme à la Loi sur les normes du travail du Québec (CNESST).'}
          </p>
        </div>

        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full self-start sm:self-auto">
          CNESST Québec 2026
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vacation */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2">
          <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
            {lang === 'pt' ? '1. Férias Remuneradas' : '1. Congés Payés'}
          </span>
          <div className="text-xl font-extrabold text-teal-950 tabular-nums">
            {formatCurrency(vacation.indemnity, locale)}
          </div>
          <p className="text-xs text-teal-800">
            {vacation.percent}% ({vacation.weeks} sem.) sobre o total bruto anual de {formatCurrency(annualGross, locale)}.
          </p>
        </div>

        {/* Holidays */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
            {lang === 'pt' ? '2. 8 Feriados Oficiais (1/20)' : '2. 8 Jours Fériés (1/20)'}
          </span>
          <div className="text-xl font-extrabold text-blue-950 tabular-nums">
            {formatCurrency(holidays.totalAnnualHolidaysPay, locale)}
          </div>
          <p className="text-xs text-blue-800">
            {formatCurrency(holidays.payPerHoliday, locale)} por feriado com base em 1/20 da quinzena anterior.
          </p>
        </div>

        {/* RRSP Match */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
            {lang === 'pt' ? '3. Match REER & Poupança' : '3. Match REER Collectif'}
          </span>
          <div className="text-xl font-extrabold text-indigo-950 tabular-nums">
            +{formatCurrency(rrsp.employerAnnualContribution, locale)}
          </div>
          <p className="text-xs text-indigo-800">
            Dinheiro gratuito aportado pela empresa ({employerMatchPct}%) gerando {formatCurrency(rrsp.totalAnnualWealthCreated, locale)}/ano.
          </p>
        </div>
      </div>
    </div>
  );

  // If in Results View:
  if (viewMode === 'results') {
    return (
      <CalculatorResultsLayout
        calc={calc}
        lang={lang}
        toolBadge={lang === 'pt' ? 'Benefícios & CNESST' : 'Avantages CNESST'}
        toolTitle={
          lang === 'pt'
            ? 'Demonstrativo Completo de Férias e Benefícios CNESST'
            : 'Relevé Officiel des Vacances et Avantages Sociaux'
        }
        customHeroNote={
          lang === 'pt'
            ? `Seu valor estimado de indenização é de ${formatCurrency(heroAmount, locale)} com direitos assegurados pela legislação do Québec.`
            : `Votre indemnité légale estimée est de ${formatCurrency(heroAmount, locale)} selon les normes CNESST.`
        }
        onBackToWorkspace={() => {
          setViewMode('workspace');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        toolSpecificSection={toolSpecificSection}
      />
    );
  }

  // Workspace Mode
  return (
    <CalculatorWorkspaceLayout
      lang={lang}
      icon={Palmtree}
      iconColorClass="text-teal-600 bg-teal-50 border-teal-200"
      categoryKicker={
        lang === 'pt'
          ? 'Normas do Trabalho CNESST'
          : 'Normes du travail CNESST'
      }
      title={
        lang === 'pt'
          ? 'Calculadora de Férias (4%/6%), 8 Feriados e Match REER'
          : 'Calculateur de Vacances (4%/6%), 8 Fériés et Match REER'
      }
      description={
        lang === 'pt'
          ? 'Calcule o valor exato da sua indenização de férias pela antiguidade, os 8 feriados pagos pelo cálculo de 1/20 e a contribuição gratuita do empregador ao REER.'
          : 'Calculez votre indemnité de congés payés (4 % ou 6 %), le paiement des 8 jours fériés légaux (règle du 1/20) et la cotisation REER de l’employeur.'
      }
      jurisdictionLabel="⚜️ Québec CNESST 2026"
      previewCard={
        <CalculatorLivePreviewCard
          lang={lang}
          heroTitle={heroTitle}
          heroAmount={heroAmount}
          heroSubtext={heroSubtext}
          effectiveHourlyNet={calc.effectiveHourlyRateNet}
          retentionPercent={calc.takeHomePercentage}
          taxPercent={calc.effectiveTaxRate}
          grossAmount={calc.cascade.biweekly.gross}
          federalTax={calc.cascade.biweekly.federalTax}
          provincialTax={calc.cascade.biweekly.provincialTax}
          totalDeductions={calc.cascade.biweekly.totalDeductions}
          customMetrics={[
            {
              label: lang === 'pt' ? 'Férias Acumuladas no Ano:' : 'Indemnité de Vacances :',
              value: formatCurrency(vacation.indemnity, locale),
              highlight: activeTab === 'vacation',
            },
            {
              label: lang === 'pt' ? 'Total dos 8 Feriados:' : 'Total des 8 Fériés :',
              value: formatCurrency(holidays.totalAnnualHolidaysPay, locale),
              highlight: activeTab === 'holidays',
            },
            {
              label: lang === 'pt' ? 'Aporte Gratuito REER Empresa:' : 'Match REER Employeur :',
              value: `+${formatCurrency(rrsp.employerAnnualContribution, locale)}`,
              highlight: activeTab === 'rrsp',
            },
          ]}
          onViewFullResults={() => {
            setViewMode('results');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          ctaTitle={
            lang === 'pt'
              ? 'Ver Demonstrativo Completo de Férias'
              : 'Voir le relevé officiel de congés'
          }
          ctaSubtitle={
            lang === 'pt'
              ? 'Auditoria completa, cascata em 6 ciclos e regras CNESST'
              : 'Audit complet, cascade sur 6 cycles et normes CNESST'
          }
          trustBadgeText="Normas CNESST Art. 68-74"
        />
      }
    >
      {/* Left Column Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveTab('vacation')}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'vacation'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palmtree className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.tabVacation}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('holidays')}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'holidays'
                ? 'bg-white text-blue-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.tabHolidays}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rrsp')}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'rrsp'
                ? 'bg-white text-indigo-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PiggyBank className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.tabRrspMatch}</span>
          </button>
        </div>

        {/* Tab 1: Vacation */}
        {activeTab === 'vacation' && (
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === 'pt'
                  ? 'Tempo de serviço contínuo na mesma empresa:'
                  : 'Ancienneté / Service continu chez l’employeur :'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setYearsOfService(1)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    yearsOfService < 3
                      ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">
                    {lang === 'pt' ? 'Menos de 3 anos (< 3 ans)' : 'Moins de 3 ans (< 3 ans)'}
                  </span>
                  <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">
                    4% (2 semanas de férias remuneradas)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setYearsOfService(3)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    yearsOfService >= 3
                      ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">
                    {lang === 'pt' ? '3 anos ou mais (≥ 3 ans)' : '3 ans et plus (≥ 3 ans)'}
                  </span>
                  <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">
                    6% (3 semanas de férias remuneradas)
                  </span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'pt' ? 'Salário Bruto Anual de Referência:' : 'Salaire brut annuel :'}</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(annualGross, locale)}</span>
              </div>
              <div className="flex justify-between text-teal-800 font-bold">
                <span>{lang === 'pt' ? 'Indenização Legal de Férias:' : 'Indemnité légale de vacances :'}</span>
                <span className="text-sm font-black tabular-nums">{formatCurrency(vacation.indemnity, locale)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Holidays */}
        {activeTab === 'holidays' && (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-2">
              <span className="font-bold text-blue-950 block text-sm">
                {lang === 'pt' ? 'A Regra Oficial de 1/20 da CNESST' : 'La règle légale du 1/20'}
              </span>
              <p className="text-blue-800 leading-relaxed">
                {lang === 'pt'
                  ? 'Cada um dos 8 feriados oficiais é pago com base em 1/20 do salário bruto recebido nas 4 semanas anteriores ao feriado.'
                  : 'Chacun des 8 jours fériés est rémunéré sur la base de 1/20 du salaire brut gagné au cours des 4 semaines de paie précédentes.'}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'pt' ? 'Salário bruto por quinzena:' : 'Brut par quinzaine :'}</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatCurrency(biweeklyGross, locale)}</span>
              </div>
              <div className="flex justify-between text-blue-900 font-bold text-sm">
                <span>{lang === 'pt' ? 'Pagamento por cada feriado:' : 'Paiement par férié (1/20) :'}</span>
                <span className="tabular-nums font-black">{formatCurrency(holidays.payPerHoliday, locale)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>{lang === 'pt' ? 'Total dos 8 feriados no ano:' : 'Total 8 fériés par an :'}</span>
                <span className="tabular-nums">{formatCurrency(holidays.totalAnnualHolidaysPay, locale)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: RRSP */}
        {activeTab === 'rrsp' && (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {lang === 'pt' ? 'Seu Aporte (%)' : 'Votre cotisation (%)'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={employeeRrspPct}
                  onChange={(e) => setEmployeeRrspPct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {lang === 'pt' ? 'Match da Empresa (%)' : 'Match employeur (%)'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={employerMatchPct}
                  onChange={(e) => setEmployerMatchPct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-2">
              <div className="flex justify-between text-indigo-900">
                <span>{lang === 'pt' ? 'Aporte gratuito anual do patrão:' : 'Cotisation gratuite employeur :'}</span>
                <span className="font-black text-sm tabular-nums">+{formatCurrency(rrsp.employerAnnualContribution, locale)}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>{lang === 'pt' ? 'Economia de imposto imediata:' : 'Économie d’impôt à la source :'}</span>
                <span className="tabular-nums">+{formatCurrency(rrsp.taxSavingsAtSource, locale)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorWorkspaceLayout>
  );
};
