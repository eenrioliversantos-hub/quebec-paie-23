'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateQuebecPay,
  formatCurrency,
  CanadianProvince,
  CANADIAN_PROVINCES,
  SalaryEntryMode,
} from '@/lib/tax-engine';
import { Language } from '@/lib/i18n';
import {
  Repeat,
  DollarSign,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { CalculatorWorkspaceLayout } from '@/components/calculator-suite/CalculatorWorkspaceLayout';
import { CalculatorLivePreviewCard } from '@/components/calculator-suite/CalculatorLivePreviewCard';
import { CalculatorResultsLayout } from '@/components/calculator-suite/CalculatorResultsLayout';

interface SalaryConverterProps {
  lang: Language;
}

export const SalaryConverter: React.FC<SalaryConverterProps> = ({ lang }) => {
  const [baseType, setBaseType] = useState<SalaryEntryMode>('hourly');
  const [amount, setAmount] = useState<number>(25.0);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [province, setProvince] = useState<CanadianProvince>('QC');
  const [viewMode, setViewMode] = useState<'workspace' | 'results'>('workspace');

  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';
  const totalAnnualHours = Math.max(1, hoursPerWeek * weeksPerYear);

  // Derived Gross Calculations
  let derivedHourly = 25.0;
  let derivedAnnual = 52000;
  let derivedBiweekly = 2000;

  if (baseType === 'hourly') {
    derivedHourly = Math.max(0, amount);
    derivedAnnual = derivedHourly * totalAnnualHours;
    derivedBiweekly = (derivedAnnual / 52) * 2;
  } else if (baseType === 'annual') {
    derivedAnnual = Math.max(0, amount);
    derivedHourly = totalAnnualHours > 0 ? derivedAnnual / totalAnnualHours : 0;
    derivedBiweekly = (derivedAnnual / 52) * 2;
  } else {
    // biweekly
    derivedBiweekly = Math.max(0, amount);
    derivedAnnual = derivedBiweekly * 26;
    derivedHourly = hoursPerWeek * 2 > 0 ? derivedBiweekly / (hoursPerWeek * 2) : 0;
  }

  // Calculate full tax breakdown using the multi-jurisdiction engine
  const calculation = useMemo(() => {
    return calculateQuebecPay({
      province,
      entryMode: baseType,
      hourlyRate: Math.round(derivedHourly * 100) / 100,
      annualGrossSalary: Math.round(derivedAnnual),
      periodGrossSalary: Math.round(derivedBiweekly * 100) / 100,
      regularHoursPerWeek: hoursPerWeek,
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
  }, [province, baseType, derivedHourly, derivedAnnual, derivedBiweekly, hoursPerWeek]);

  const presets = [16.1, 20.0, 25.0, 30.0, 35.0, 42.0, 55.0];
  const currentProvinceInfo = CANADIAN_PROVINCES[province] || CANADIAN_PROVINCES.QC;

  // Custom tool-specific section for the Results Page
  const toolSpecificSection = (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Repeat className="w-5 h-5 text-blue-600" />
            <span>
              {lang === 'pt'
                ? 'Matriz Completa de Equivalência: Bruto vs Líquido em Todos os Ciclos'
                : lang === 'en'
                ? 'Complete Equivalency Matrix: Gross vs Net Across All Cycles'
                : 'Matrice Complète d’Équivalence : Brut vs Net sur tous les cycles'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'pt'
              ? `Jornada configurada: ${hoursPerWeek}h/semana (${totalAnnualHours}h/ano) em ${currentProvinceInfo.name[lang] || currentProvinceInfo.name.fr}.`
              : `Horaire configuré : ${hoursPerWeek}h/semaine (${totalAnnualHours}h/an) en ${currentProvinceInfo.name.fr}.`}
          </p>
        </div>

        <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full self-start sm:self-auto">
          {currentProvinceInfo.flag} {currentProvinceInfo.name[lang] || currentProvinceInfo.name.fr}
        </span>
      </div>

      {/* Grid of All Pay Cycles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: lang === 'pt' ? 'Por Hora' : 'Par Heure',
            subtitle: '1 hora trabalhada',
            gross: calculation.cascade.hourly.gross,
            net: calculation.cascade.hourly.net,
            tax: calculation.cascade.hourly.totalDeductions,
            highlight: false,
          },
          {
            title: lang === 'pt' ? 'Por Dia' : 'Par Jour',
            subtitle: `${(hoursPerWeek / 5).toFixed(1)}h normais / dia`,
            gross: calculation.cascade.daily.gross,
            net: calculation.cascade.daily.net,
            tax: calculation.cascade.daily.totalDeductions,
            highlight: false,
          },
          {
            title: lang === 'pt' ? 'Semanal' : 'Hebdomadaire',
            subtitle: `${hoursPerWeek}h · 52 paies/an`,
            gross: calculation.cascade.weekly.gross,
            net: calculation.cascade.weekly.net,
            tax: calculation.cascade.weekly.totalDeductions,
            highlight: false,
          },
          {
            title: lang === 'pt' ? 'Quinzena (Aux 2 semaines)' : 'Aux 2 semaines (Standard QC)',
            subtitle: `${hoursPerWeek * 2}h · 26 paies/an`,
            gross: calculation.cascade.biweekly.gross,
            net: calculation.cascade.biweekly.net,
            tax: calculation.cascade.biweekly.totalDeductions,
            highlight: true,
          },
          {
            title: lang === 'pt' ? 'Mensal' : 'Mensuel',
            subtitle: '12 paies / an',
            gross: calculation.cascade.monthly.gross,
            net: calculation.cascade.monthly.net,
            tax: calculation.cascade.monthly.totalDeductions,
            highlight: false,
          },
          {
            title: lang === 'pt' ? 'Anual' : 'Annuel',
            subtitle: `${totalAnnualHours}h remuneradas`,
            gross: calculation.annualGross,
            net: calculation.annualNet,
            tax: calculation.annualTotalDeductions,
            highlight: true,
          },
        ].map((cycle, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              cycle.highlight
                ? 'bg-blue-50/50 border-blue-200 shadow-2xs'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={`font-bold ${cycle.highlight ? 'text-blue-900' : 'text-slate-800'}`}>
                {cycle.title}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">{cycle.subtitle}</span>
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{lang === 'pt' ? 'Bruto:' : 'Brut :'}</span>
                <span className="font-bold text-slate-700 tabular-nums">
                  {formatCurrency(cycle.gross, locale)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-rose-500">
                <span>{lang === 'pt' ? 'Deduções:' : 'Retenues :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(cycle.tax, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {lang === 'pt' ? 'Líquido no Bolso:' : 'Net en poche :'}
                </span>
                <span
                  className={`text-base font-black tabular-nums ${
                    cycle.highlight ? 'text-blue-700' : 'text-emerald-700'
                  }`}
                >
                  {formatCurrency(cycle.net, locale)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // If user clicked to see full results:
  if (viewMode === 'results') {
    return (
      <CalculatorResultsLayout
        calc={calculation}
        lang={lang}
        toolBadge={lang === 'pt' ? 'Conversor de Salário' : 'Convertisseur de Salaire'}
        toolTitle={
          lang === 'pt'
            ? 'Dossiê Completo de Conversão Salarial (Bruto & Líquido)'
            : 'Relevé Complet de Conversion Salariale'
        }
        onBackToWorkspace={() => {
          setViewMode('workspace');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        toolSpecificSection={toolSpecificSection}
      />
    );
  }

  // Workspace Mode (Form Inputs + Attractive Live Preview Card)
  return (
    <CalculatorWorkspaceLayout
      lang={lang}
      icon={Repeat}
      iconColorClass="text-emerald-600 bg-emerald-50 border-emerald-200"
      categoryKicker={
        lang === 'pt'
          ? 'Conversão Instantânea Multi-Períodos'
          : lang === 'en'
          ? 'Instant Multi-Period Conversion'
          : 'Convertisseur multi-périodes instantané'
      }
      title={
        lang === 'pt'
          ? 'Conversor de Salário: Horista ⇄ Quinzenal ⇄ Mensal ⇄ Anual'
          : lang === 'en'
          ? 'Salary Converter: Hourly ⇄ Bi-weekly ⇄ Monthly ⇄ Annual'
          : 'Convertisseur de Salaire : Horaire ⇄ Quinzaine ⇄ Mensuel ⇄ Annuel'
      }
      description={
        lang === 'pt'
          ? 'Alterne facilmente entre taxa horária, valor por dia, semana, quinzena (aux 2 semaines) e salário anual com cálculo fiscal completo até o centavo.'
          : 'Convertissez instantanément entre taux horaire, paie par jour, semaine, aux deux semaines et salaire annuel brut et net.'
      }
      jurisdictionLabel={`${currentProvinceInfo.flag} ${currentProvinceInfo.name[lang] || currentProvinceInfo.name.fr} 2026`}
      previewCard={
        <CalculatorLivePreviewCard
          lang={lang}
          heroTitle={
            lang === 'pt'
              ? 'Salário Líquido no Seu Bolso'
              : lang === 'en'
              ? 'Net Take-Home Pay'
              : 'Salaire net dans vos poches'
          }
          heroAmount={calculation.cascade.biweekly.net}
          heroPeriodLabel={lang === 'pt' ? 'quinzena (padrão QC)' : 'quinzaine (standard QC)'}
          heroSubtext={`Equivalente a ${formatCurrency(calculation.cascade.monthly.net, locale)}/mês`}
          effectiveHourlyNet={calculation.effectiveHourlyRateNet}
          retentionPercent={calculation.takeHomePercentage}
          taxPercent={calculation.effectiveTaxRate}
          grossAmount={calculation.cascade.biweekly.gross}
          federalTax={calculation.cascade.biweekly.federalTax}
          provincialTax={calculation.cascade.biweekly.provincialTax}
          socialContributions={
            calculation.cascade.biweekly.rrq +
            calculation.cascade.biweekly.rqap +
            calculation.cascade.biweekly.ae
          }
          totalDeductions={calculation.cascade.biweekly.totalDeductions}
          customMetrics={[
            {
              label: lang === 'pt' ? 'Líquido Anual no Bolso:' : 'Net Annuel en Poche :',
              value: formatCurrency(calculation.annualNet, locale),
              highlight: true,
            },
            {
              label: lang === 'pt' ? 'Líquido Mensal Estimado:' : 'Net Mensuel Estimé :',
              value: formatCurrency(calculation.cascade.monthly.net, locale),
            },
          ]}
          onViewFullResults={() => {
            setViewMode('results');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      }
    >
      {/* LEFT COLUMN: Input form & presets */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-6 shadow-xs">
        {/* Conversion Base Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            {lang === 'pt' ? 'Base de Cálculo Inicial:' : 'Base du calcul :'}
          </label>
          <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {[
              { id: 'hourly' as SalaryEntryMode, label: lang === 'pt' ? 'Por Hora' : 'Horaire' },
              { id: 'biweekly' as SalaryEntryMode, label: lang === 'pt' ? 'Quinzena' : 'Quinzaine' },
              { id: 'annual' as SalaryEntryMode, label: lang === 'pt' ? 'Anual' : 'Annuel' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setBaseType(mode.id)}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  baseType === mode.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            {lang === 'pt' ? 'Valor Salarial Bruto:' : 'Montant brut :'}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
            <input
              type="number"
              step={baseType === 'hourly' ? '0.25' : '100'}
              min="0"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full pl-8 pr-16 py-3 text-xl font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none tabular-nums shadow-xs"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              {baseType === 'hourly' ? '/h' : baseType === 'annual' ? '/an' : '/paie'}
            </span>
          </div>

          {/* Quick Preset Buttons for Hourly */}
          {baseType === 'hourly' && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {presets.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setAmount(rate)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                    Math.abs(amount - rate) < 0.01
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ${rate.toFixed(2)}/h
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Schedule & Working Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'pt' ? 'Horas Normais / Semana:' : 'Heures / semaine :'}</span>
            </label>
            <input
              type="number"
              min="1"
              max="80"
              step="0.5"
              value={hoursPerWeek || ''}
              onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'pt' ? 'Semanas Pagas / Ano:' : 'Semaines / an :'}</span>
            </label>
            <input
              type="number"
              min="1"
              max="52"
              value={weeksPerYear || ''}
              onChange={(e) => setWeeksPerYear(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Province Selection */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'pt' ? 'Província Canadense (Regras Fiscais):' : 'Province fiscale :'}</span>
          </label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value as CanadianProvince)}
            className="w-full bg-slate-50 text-slate-900 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {Object.values(CANADIAN_PROVINCES).map((p) => (
              <option key={p.code} value={p.code}>
                {p.flag} {p.name[lang] || p.name.fr} ({p.code})
              </option>
            ))}
          </select>
        </div>

        {/* Live conversion summary badges */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'pt' ? 'Bruto Quinzenal' : 'Brut Quinzaine'}
            </span>
            <span className="text-base font-extrabold text-slate-900 block tabular-nums">
              {formatCurrency(derivedBiweekly, locale)}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {hoursPerWeek * 2}h pagas
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              {lang === 'pt' ? 'Líquido Quinzenal' : 'Net Quinzaine'}
            </span>
            <span className="text-base font-extrabold text-emerald-950 block tabular-nums">
              {formatCurrency(calculation.cascade.biweekly.net, locale)}
            </span>
            <span className="text-[11px] text-emerald-700 font-bold block">
              {calculation.takeHomePercentage.toFixed(1)}% no bolso
            </span>
          </div>
        </div>

        {/* Teaser prompt */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {lang === 'pt'
                ? 'Clique ao lado para abrir a matriz detalhada em todos os 6 períodos e contracheque.'
                : 'Cliquez à droite pour ouvrir la matrice détaillée sur tous les cycles et le relevé.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setViewMode('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-emerald-700 hover:text-emerald-800 font-bold shrink-0 cursor-pointer"
          >
            {lang === 'pt' ? 'Ver Tudo →' : 'Voir tout →'}
          </button>
        </div>
      </div>
    </CalculatorWorkspaceLayout>
  );
};
