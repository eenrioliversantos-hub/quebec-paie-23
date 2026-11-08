'use client';

import React, { useState, useEffect } from 'react';
import {
  TaxInput,
  CanadianProvince,
  CANADIAN_PROVINCES,
  SalaryEntryMode,
  CalculationResult,
  calculateQuebecPay,
  formatCurrency,
  PayFrequency,
} from '@/lib/tax-engine';
import { Language, translations } from '@/lib/i18n';
import {
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCcw,
  ShieldPlus,
  ArrowRight,
  Calculator,
  MapPin,
  CheckCircle2,
  FileText,
  Share2,
  Check,
  TrendingDown,
  Zap,
  Printer,
  ShieldCheck,
  Building2,
  Wallet,
  Scale,
  TrendingUp,
} from 'lucide-react';

interface UnifiedSalaryCalculatorProps {
  input: TaxInput;
  onChange: (newInput: TaxInput) => void;
  calculation: CalculationResult;
  onLoadLeclercExample: () => void;
  onViewFullResults: () => void;
  onFrequencyChange: (freq: PayFrequency) => void;
  lang: Language;
  onOpenScenarios?: () => void;
  onOpenRaiseSimulator?: () => void;
}

export const UnifiedSalaryCalculator: React.FC<UnifiedSalaryCalculatorProps> = ({
  input,
  onChange,
  calculation,
  onLoadLeclercExample,
  onViewFullResults,
  onFrequencyChange,
  lang,
  onOpenScenarios,
  onOpenRaiseSimulator,
}) => {
  const t = translations[lang];
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  // Local state for expandable sections
  const [showOvertime, setShowOvertime] = useState(
    input.overtime15HoursPerWeek > 0 || input.overtime20HoursPerWeek > 0
  );
  const [showBenefits, setShowBenefits] = useState(input.mode === 'advanced');
  const [copied, setCopied] = useState(false);

  // Selected period inside preview
  const [userSelectedFrequency, setUserSelectedFrequency] = useState<PayFrequency | null>(null);

  const activeFrequency =
    userSelectedFrequency ?? calculation.selectedPeriod.frequency;

  const activePeriod =
    calculation.cascade[activeFrequency as keyof typeof calculation.cascade] ||
    calculation.selectedPeriod;

  const currentProvinceInfo =
    CANADIAN_PROVINCES[input.province || 'QC'] || CANADIAN_PROVINCES.QC;
  const currentEntryMode: SalaryEntryMode = input.entryMode || 'hourly';
  const regHours = Math.max(0.5, input.regularHoursPerWeek || 40);

  // Frequency options
  const frequencies: { id: PayFrequency; label: string; fullLabel: string }[] = [
    {
      id: 'biweekly',
      label: lang === 'pt' ? 'Quinzena' : lang === 'en' ? 'Bi-weekly' : 'Aux 2 sem.',
      fullLabel: lang === 'pt' ? 'A cada duas semanas (Padrão QC)' : 'Aux deux semaines (Standard QC)',
    },
    {
      id: 'monthly',
      label: lang === 'pt' ? 'Mês' : lang === 'en' ? 'Monthly' : 'Mois',
      fullLabel: lang === 'pt' ? 'Por mês' : 'Par mois',
    },
    {
      id: 'annually',
      label: lang === 'pt' ? 'Ano' : lang === 'en' ? 'Annual' : 'Année',
      fullLabel: lang === 'pt' ? 'Por ano' : 'Par an',
    },
    {
      id: 'weekly',
      label: lang === 'pt' ? 'Semana' : lang === 'en' ? 'Weekly' : 'Semaine',
      fullLabel: lang === 'pt' ? 'Por semana' : 'Par semaine',
    },
  ];

  const handlePeriodChange = (freq: PayFrequency) => {
    setUserSelectedFrequency(freq);
    onFrequencyChange(freq);
  };

  // Salary Mode Switches
  const handleRateChange = (val: number) => {
    const safeRate = Math.max(0, val);
    onChange({
      ...input,
      hourlyRate: safeRate,
      annualGrossSalary: Math.round(safeRate * regHours * 52),
      periodGrossSalary: Math.round(safeRate * regHours * 2 * 100) / 100,
    });
  };

  const handleAnnualGrossChange = (val: number) => {
    const safeAnnual = Math.max(0, val);
    const derivedHourly = Math.round((safeAnnual / (regHours * 52)) * 100) / 100;
    onChange({
      ...input,
      annualGrossSalary: safeAnnual,
      hourlyRate: derivedHourly,
      periodGrossSalary: Math.round((safeAnnual / 26) * 100) / 100,
    });
  };

  const handlePeriodGrossChange = (val: number) => {
    const safePeriod = Math.max(0, val);
    const derivedHourly = Math.round((safePeriod / (regHours * 2)) * 100) / 100;
    onChange({
      ...input,
      periodGrossSalary: safePeriod,
      hourlyRate: derivedHourly,
      annualGrossSalary: Math.round(safePeriod * 26),
    });
  };

  const handleEntryModeToggle = (mode: SalaryEntryMode) => {
    if (mode === 'annual' && !input.annualGrossSalary) {
      onChange({
        ...input,
        entryMode: mode,
        annualGrossSalary: Math.round(input.hourlyRate * regHours * 52),
      });
    } else if (mode === 'biweekly' && !input.periodGrossSalary) {
      onChange({
        ...input,
        entryMode: mode,
        periodGrossSalary: Math.round(input.hourlyRate * regHours * 2 * 100) / 100,
      });
    } else {
      onChange({
        ...input,
        entryMode: mode,
      });
    }
  };

  const handleResetDefaults = () => {
    onChange({
      province: 'QC',
      entryMode: 'hourly',
      hourlyRate: 25.0,
      annualGrossSalary: 52000,
      periodGrossSalary: 2000,
      regularHoursPerWeek: 40,
      overtime15HoursPerWeek: 0,
      overtime20HoursPerWeek: 0,
      frequency: 'biweekly',
      mode: 'simple',
      shiftPremiumType: 'hourly',
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
  };

  const handleCopySummary = () => {
    const text = `💰 ${lang === 'pt' ? 'Simulação de Salário no Québec / Canadá (2026)' : 'Simulation Salaire Net Québec (2026)'}
💵 ${lang === 'pt' ? 'Líquido no Bolso' : 'Net dans vos poches'}: ${formatCurrency(activePeriod.net, locale)} / ${activePeriod.label.toLowerCase()} (${formatCurrency(calculation.effectiveHourlyRateNet, locale)}/h)
📊 ${lang === 'pt' ? 'Salário Bruto' : 'Salaire Brut'}: ${formatCurrency(activePeriod.gross, locale)}
⚖️ ${lang === 'pt' ? 'Retenções Totais' : 'Total Retenues'}: -${formatCurrency(activePeriod.totalDeductions, locale)} (${activePeriod.effectiveTaxRate.toFixed(1)}%)
🏛️ ${lang === 'pt' ? 'Imposto Federal (ARC)' : 'Impôt Fédéral (ARC)'}: ${formatCurrency(activePeriod.federalTax, locale)}
⚜️ ${lang === 'pt' ? 'Imposto Provincial (Revenu QC)' : 'Impôt Québec'}: ${formatCurrency(activePeriod.provincialTax, locale)}
🛡️ ${currentProvinceInfo.pensionPlan}: ${formatCurrency(activePeriod.rrq, locale)} | RQAP: ${formatCurrency(activePeriod.rqap, locale)} | AE: ${formatCurrency(activePeriod.ae, locale)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
      {/* 1. Cockpit Header Bar (Modern Executive Fintech Header) */}
      <div className="bg-white px-6 sm:px-8 py-6 border-b border-slate-100 text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-1.5">
            <span className="text-sm">⚜️</span>
            <span className="font-bold text-slate-800">{currentProvinceInfo.name[lang] || 'Québec'} & Canada</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Revenu Québec & ARC (2026)</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-emerald-700 font-semibold">{lang === 'pt' ? 'Tabelas Oficiais Atualizadas' : 'Barèmes Officiels'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {lang === 'pt'
              ? 'Calculadora de Salário Líquido no Québec'
              : lang === 'en'
              ? 'Quebec Net Salary Calculator'
              : 'Calculateur de Salaire Net du Québec'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {lang === 'pt'
              ? 'Ajuste seus valores na esquerda e veja o cálculo oficial do seu rendimento líquido em tempo real.'
              : lang === 'en'
              ? 'Adjust your earnings on the left to see your live take-home pay on the right in real time.'
              : 'Ajustez vos gains à gauche et observez votre salaire net réel à droite en temps réel.'}
          </p>
        </div>

        {/* Quick Example Presets */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={onLoadLeclercExample}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Carregar exemplo prático com turno noturno e benefícios"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'pt' ? 'Exemplo Prático (Turno / Benefícios)' : 'Exemple Pratique'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Restaurar valores padrão"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'Restaurar' : 'Réinitialiser'}</span>
          </button>
        </div>
      </div>

      {/* 2. Unified Two-Zone Cockpit (Inputs + Live Preview Fused Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* LEFT ZONE: Salary Input Controls (7 cols on desktop) */}
        <div className="lg:col-span-7 p-5 sm:p-7 space-y-6 lg:border-r border-slate-100 bg-white">
          {/* Province Selector Header */}
          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <label htmlFor="cockpit-province" className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>
                  {lang === 'pt'
                    ? 'Província / Território Fiscal'
                    : 'Province / Territoire'}
                </span>
              </label>
              <span className="text-slate-500 font-semibold text-[11px]">
                {lang === 'pt' ? 'Salário Mínimo: ' : 'Salaire Min: '}
                <strong className="text-slate-900 font-bold">
                  ${currentProvinceInfo.minWageHourly.toFixed(2)}/h
                </strong>
              </span>
            </div>

            <select
              id="cockpit-province"
              value={input.province || 'QC'}
              onChange={(e) => {
                const newProv = e.target.value as CanadianProvince;
                const pInfo = CANADIAN_PROVINCES[newProv] || CANADIAN_PROVINCES.QC;
                onChange({
                  ...input,
                  province: newProv,
                  regularHoursPerWeek:
                    input.regularHoursPerWeek === 40 || input.regularHoursPerWeek === 44
                      ? pInfo.standardOvertimeThresholdHours
                      : input.regularHoursPerWeek,
                });
              }}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
            >
              {Object.values(CANADIAN_PROVINCES).map((prov) => (
                <option key={prov.code} value={prov.code}>
                  {prov.flag} {prov.name[lang]} ({prov.code}) — {prov.pensionPlan === 'RRQ' ? 'RRQ / RQAP' : 'CPP / EI'} · Base {prov.standardOvertimeThresholdHours}h/sem
                </option>
              ))}
            </select>
          </div>

          {/* Remuneration Format Selector (Segmented) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600 uppercase tracking-wider text-[11px]">
                {lang === 'pt' ? 'Como você recebe seu salário?' : 'Comment êtes-vous payé ?'}
              </span>
              <span className="text-blue-700 font-medium text-[11px]">
                {currentEntryMode === 'hourly'
                  ? (lang === 'pt' ? 'Base por hora' : 'Taux horaire')
                  : currentEntryMode === 'annual'
                  ? (lang === 'pt' ? 'Salário anual' : 'Salaire annuel')
                  : (lang === 'pt' ? 'Por quinzena' : 'Par paie')}
              </span>
            </div>

            <div className="grid grid-cols-3 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 gap-1 text-center">
              <button
                type="button"
                onClick={() => handleEntryModeToggle('hourly')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentEntryMode === 'hourly'
                    ? 'bg-white text-slate-950 shadow-2xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Por Hora ($/h)' : 'Par Heure ($/h)'}
              </button>
              <button
                type="button"
                onClick={() => handleEntryModeToggle('annual')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentEntryMode === 'annual'
                    ? 'bg-white text-slate-950 shadow-2xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Anual ($/ano)' : 'Annuel ($/an)'}
              </button>
              <button
                type="button"
                onClick={() => handleEntryModeToggle('biweekly')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentEntryMode === 'biweekly'
                    ? 'bg-white text-slate-950 shadow-2xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Quinzena ($/quinzena)' : 'Aux 2 sem. ($/paie)'}
              </button>
            </div>
          </div>

          {/* Primary Wage Hero Input */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-blue-50/50 to-slate-50 border border-blue-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="primary-wage-input" className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span>
                  {currentEntryMode === 'hourly'
                    ? (lang === 'pt' ? 'Taxa Horária Bruta' : 'Taux horaire brut de base')
                    : currentEntryMode === 'annual'
                    ? (lang === 'pt' ? 'Salário Anual Bruto' : 'Salaire annuel brut')
                    : (lang === 'pt' ? 'Salário Bruto por Quinzena' : 'Salaire brut aux 2 semaines')}
                </span>
              </label>

              {currentEntryMode === 'hourly' && (
                <span className="text-[11px] text-slate-500 font-semibold">
                  {lang === 'pt' ? 'Equivale a ' : 'Équivaut à '}
                  <strong className="text-slate-900 font-bold">
                    ${Math.round(input.hourlyRate * regHours * 52).toLocaleString(locale)}/ano
                  </strong>
                </span>
              )}
            </div>

            {/* Input Row with Large Numbers and Adjuster Buttons */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold text-lg sm:text-xl">
                  $
                </span>
                {currentEntryMode === 'hourly' && (
                  <input
                    id="primary-wage-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.25"
                    value={input.hourlyRate || ''}
                    onChange={(e) => handleRateChange(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-14 py-3 text-xl sm:text-2xl font-black text-slate-900 bg-white border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-600 focus:outline-none tabular-nums"
                    placeholder="25.00"
                  />
                )}
                {currentEntryMode === 'annual' && (
                  <input
                    id="primary-wage-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="500"
                    value={input.annualGrossSalary || ''}
                    onChange={(e) => handleAnnualGrossChange(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-14 py-3 text-xl sm:text-2xl font-black text-slate-900 bg-white border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-600 focus:outline-none tabular-nums"
                    placeholder="52000"
                  />
                )}
                {currentEntryMode === 'biweekly' && (
                  <input
                    id="primary-wage-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="50"
                    value={input.periodGrossSalary || ''}
                    onChange={(e) => handlePeriodGrossChange(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-14 py-3 text-xl sm:text-2xl font-black text-slate-900 bg-white border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-600 focus:outline-none tabular-nums"
                    placeholder="2000"
                  />
                )}
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 font-semibold text-xs sm:text-sm">
                  {currentEntryMode === 'hourly' ? '/h' : currentEntryMode === 'annual' ? '/an' : '/paie'}
                </span>
              </div>

              {/* Quick Stepper Buttons for Hourly */}
              {currentEntryMode === 'hourly' && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleRateChange(Math.max(0, input.hourlyRate - 1))}
                    className="h-12 px-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors cursor-pointer shadow-2xs active:scale-95"
                    title="-1 $/h"
                  >
                    -1$
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRateChange(Math.round((input.hourlyRate + 0.5) * 100) / 100)}
                    className="h-12 px-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors cursor-pointer shadow-2xs active:scale-95"
                    title="+0.50 $/h"
                  >
                    +0.5$
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRateChange(input.hourlyRate + 1)}
                    className="h-12 px-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors cursor-pointer shadow-2xs active:scale-95"
                    title="+1 $/h"
                  >
                    +1$
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRateChange(input.hourlyRate + 2)}
                    className="h-12 px-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors cursor-pointer shadow-2xs active:scale-95"
                    title="+2 $/h"
                  >
                    +2$
                  </button>
                </div>
              )}
            </div>

            {/* Quick Benchmark Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 mr-1">
                {lang === 'pt' ? 'Atalhos:' : 'Repères :'}
              </span>
              {[
                { label: `$${currentProvinceInfo.minWageHourly.toFixed(2)} (Min)`, val: currentProvinceInfo.minWageHourly },
                { label: '$22.00', val: 22.0 },
                { label: '$28.50', val: 28.5 },
                { label: '$35.00', val: 35.0 },
                { label: '$50.00', val: 50.0 },
              ].map((bench) => (
                <button
                  key={bench.val}
                  type="button"
                  onClick={() => handleRateChange(bench.val)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    Math.abs(input.hourlyRate - bench.val) < 0.05 && currentEntryMode === 'hourly'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  {bench.label}
                </button>
              ))}
            </div>
          </div>

          {/* Work Hours per Week */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="reg-hours-input" className="font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{lang === 'pt' ? 'Horas Normais por Semana' : 'Heures normales par semaine'}</span>
              </label>
              <span className="text-slate-500 font-medium">
                {lang === 'pt' ? 'Normal no QC: 40h' : 'Normale au QC : 40h'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="reg-hours-input"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  max="80"
                  step="0.5"
                  value={input.regularHoursPerWeek || ''}
                  onChange={(e) =>
                    onChange({
                      ...input,
                      regularHoursPerWeek: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-4 pr-16 py-2.5 text-sm sm:text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="40"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 font-semibold text-xs">
                  h/sem
                </span>
              </div>

              {/* Standard presets: 35h, 37.5h, 40h */}
              {[35, 37.5, 40].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => onChange({ ...input, regularHoursPerWeek: hours })}
                  className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    input.regularHoursPerWeek === hours
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {hours}h
                </button>
              ))}
            </div>
          </div>

          {/* Expandable 1: Overtime / Heures supplémentaires */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => setShowOvertime(!showOvertime)}
              className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{lang === 'pt' ? 'Horas Extras (1.5x / 2.0x)' : 'Heures supplémentaires (1.5x / 2.0x)'}</span>
                {(input.overtime15HoursPerWeek > 0 || input.overtime20HoursPerWeek > 0) && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Ativo ({input.overtime15HoursPerWeek + input.overtime20HoursPerWeek}h)
                  </span>
                )}
              </div>
              {showOvertime ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {showOvertime && (
              <div className="p-4 bg-white border-t border-slate-200 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <label htmlFor="overtime-15-input">{lang === 'pt' ? 'Horas a 1.5x (Majoradas em 50%)' : 'Heures sup. à taux et demi (1.5x)'}</label>
                    <span className="text-blue-700 font-bold tabular-nums">
                      ${(input.hourlyRate * 1.5).toFixed(2)}/h
                    </span>
                  </div>
                  <input
                    id="overtime-15-input"
                    type="number"
                    min="0"
                    step="0.5"
                    value={input.overtime15HoursPerWeek || ''}
                    onChange={(e) => onChange({ ...input, overtime15HoursPerWeek: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl"
                    placeholder="ex: 5h por semana"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <label htmlFor="overtime-20-input">{lang === 'pt' ? 'Horas a 2.0x (Domingos / Feriados)' : 'Heures sup. à taux double (2.0x)'}</label>
                    <span className="text-blue-700 font-bold tabular-nums">
                      ${(input.hourlyRate * 2.0).toFixed(2)}/h
                    </span>
                  </div>
                  <input
                    id="overtime-20-input"
                    type="number"
                    min="0"
                    step="0.5"
                    value={input.overtime20HoursPerWeek || ''}
                    onChange={(e) => onChange({ ...input, overtime20HoursPerWeek: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl"
                    placeholder="0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Expandable 2: Shift Premiums & Group Insurance */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => setShowBenefits(!showBenefits)}
              className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldPlus className="w-4 h-4 text-blue-600" />
                <span>
                  {lang === 'pt'
                    ? 'Adicional Noturno (Prime de Quart) & Benefícios'
                    : 'Primes de quart & Avantages sociaux'}
                </span>
                {(input.shiftPremiumAmount > 0 || input.healthInsuranceEmployee > 0) && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Ativo
                  </span>
                )}
              </div>
              {showBenefits ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {showBenefits && (
              <div className="p-4 bg-white border-t border-slate-200 space-y-4">
                {/* Prime de Quart */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="shift-premium-input" className="text-xs font-bold text-slate-800">
                      {lang === 'pt' ? 'Adicional de Turno / Noturno (Prime de Quart)' : 'Prime de quart (soir / nuit)'}
                    </label>
                    <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => onChange({ ...input, shiftPremiumType: 'hourly' })}
                        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                          input.shiftPremiumType === 'hourly' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                        }`}
                      >
                        $/h
                      </button>
                      <button
                        type="button"
                        onClick={() => onChange({ ...input, shiftPremiumType: 'fixed' })}
                        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                          input.shiftPremiumType === 'fixed' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                        }`}
                      >
                        $ fixo
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">$</span>
                    <input
                      id="shift-premium-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={input.shiftPremiumAmount || ''}
                      onChange={(e) => onChange({ ...input, shiftPremiumAmount: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl"
                      placeholder="ex: 3.50 $/h"
                    />
                  </div>
                </div>

                {/* Plano de Saúde Empregado */}
                <div className="space-y-1">
                  <label htmlFor="health-ins-input" className="text-xs font-bold text-slate-800 block">
                    {lang === 'pt' ? 'Plano de Saúde Coletivo (Parte do Empregado, $/quinzena)' : 'Assurance collective maladie ($/paie)'}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">$</span>
                    <input
                      id="health-ins-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={input.healthInsuranceEmployee || ''}
                      onChange={(e) => onChange({ ...input, healthInsuranceEmployee: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl"
                      placeholder="74.28"
                    />
                  </div>
                </div>

                {/* Benefícios Tributáveis do Empregador (Case J Relevé 1) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="taxable-benefits-input" className="text-xs font-bold text-slate-800">
                      {lang === 'pt' ? 'Benefício Tributável Empregador (Case J Relevé 1)' : 'Avantages imposables (Case J)'}
                    </label>
                    <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                      Revenu QC
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">$</span>
                    <input
                      id="taxable-benefits-input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={input.employerTaxableBenefits || ''}
                      onChange={(e) => onChange({ ...input, employerTaxableBenefits: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl"
                      placeholder="56.13"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT ZONE: Live Calculation & Executive Take-Home Pay Panel */}
        <div className="lg:col-span-5 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 lg:border-l border-slate-100">
          {/* Top Status & Confidence Indicator */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'pt' ? 'Barèmes Fiscais 2026' : 'Barèmes Fiscaux 2026'}</span>
              </span>

              <span className="text-slate-500 font-mono text-[11px]">
                {calculation.precision.score.toFixed(0)}% {lang === 'pt' ? 'precisão legal' : 'précision'}
              </span>
            </div>

            {/* Master Hero Net Pay Display (Clean Executive Take-Home Pay Card) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'pt'
                    ? 'Salário Líquido no Seu Bolso'
                    : lang === 'en'
                    ? 'Net Take-Home Pay'
                    : 'Salaire net dans vos poches'}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                  {lang === 'pt' ? 'Líquido Estimado' : 'Net Estimé'}
                </span>
              </div>

              {/* Big Currency Number */}
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight tabular-nums">
                  {formatCurrency(activePeriod.net, locale)}
                </div>

                {/* Sub-label */}
                <div className="text-xs sm:text-sm text-slate-500 mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-700">/ {activePeriod.label.toLowerCase()}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-emerald-700 font-bold tabular-nums">
                    {formatCurrency(calculation.effectiveHourlyRateNet, locale)}/h {lang === 'pt' ? 'líquido' : 'net'}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-600 font-medium tabular-nums">
                    {formatCurrency(calculation.annualNet, locale)}/ano
                  </span>
                </div>
              </div>

              {/* Interactive Period Switcher (Apple/Stripe Segmented Controls) */}
              <div className="pt-3 border-t border-slate-100">
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100/90 rounded-xl text-center">
                  {frequencies.map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => handlePeriodChange(freq.id)}
                      className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer truncate ${
                        activeFrequency === freq.id
                          ? 'bg-white text-slate-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Retention Progress Gauge & Fast Deduction Ledger */}
          <div className="space-y-4">
            {/* 4-Segment Proportional Payroll Impact Bar */}
            {(() => {
              const grossVal = Math.max(1, activePeriod.gross);
              const netRatio = Math.max(0, Math.min(100, (activePeriod.net / grossVal) * 100));
              const incomeTaxRatio = Math.max(0, Math.min(100, ((activePeriod.federalTax + activePeriod.provincialTax) / grossVal) * 100));
              const socialSecurityRatio = Math.max(0, Math.min(100, ((activePeriod.rrq + activePeriod.rqap + activePeriod.ae) / grossVal) * 100));
              const otherRatio = Math.max(0, 100 - netRatio - incomeTaxRatio - socialSecurityRatio);

              return (
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                    <span>{lang === 'pt' ? 'Distribuição da Renda Bruta' : 'Ventilation du Salaire Brut'}</span>
                    <span className="text-emerald-700 font-bold tabular-nums">
                      {netRatio.toFixed(1)}% {lang === 'pt' ? 'no bolso' : 'en poche'}
                    </span>
                  </div>

                  {/* 4-Segment Visual Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex gap-0.5 border border-slate-200/40">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300 rounded-l-full"
                      style={{ width: `${netRatio}%` }}
                      title={`Líquido: ${netRatio.toFixed(1)}%`}
                    />
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${incomeTaxRatio}%` }}
                      title={`Impostos: ${incomeTaxRatio.toFixed(1)}%`}
                    />
                    <div
                      className="bg-indigo-500 h-full transition-all duration-300"
                      style={{ width: `${socialSecurityRatio}%` }}
                      title={`Previdência: ${socialSecurityRatio.toFixed(1)}%`}
                    />
                    {otherRatio > 0.5 && (
                      <div
                        className="bg-amber-500 h-full transition-all duration-300 rounded-r-full"
                        style={{ width: `${otherRatio}%` }}
                        title={`Benefícios: ${otherRatio.toFixed(1)}%`}
                      />
                    )}
                  </div>

                  {/* Clean unboxed legend */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>{lang === 'pt' ? 'Líquido' : 'Net'} <strong className="text-slate-900 tabular-nums">{netRatio.toFixed(0)}%</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>{lang === 'pt' ? 'Impostos' : 'Impôts'} <strong className="text-slate-900 tabular-nums">{incomeTaxRatio.toFixed(0)}%</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <span>{lang === 'pt' ? 'Previdência' : 'Cotisations'} <strong className="text-slate-900 tabular-nums">{socialSecurityRatio.toFixed(0)}%</strong></span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Compact Executive Summary Table */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>{lang === 'pt' ? 'Salário Bruto:' : 'Salaire brut :'}</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {formatCurrency(activePeriod.gross, locale)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>{lang === 'pt' ? 'Imposto Federal (ARC):' : 'Impôt Fédéral (ARC) :'}</span>
                <span className="font-semibold text-slate-700 tabular-nums">
                  -{formatCurrency(activePeriod.federalTax, locale)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>
                  {lang === 'pt'
                    ? `Imposto Provincial (${currentProvinceInfo.name[lang]}):`
                    : 'Impôt Provincial :'}
                </span>
                <span className="font-semibold text-slate-700 tabular-nums">
                  -{formatCurrency(activePeriod.provincialTax, locale)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>
                  {currentProvinceInfo.pensionPlan === 'RRQ'
                    ? 'RRQ + RQAP + AE:'
                    : 'CPP + EI:'}
                </span>
                <span className="font-semibold text-slate-700 tabular-nums">
                  -{formatCurrency(activePeriod.rrq + activePeriod.rqap + activePeriod.ae, locale)}
                </span>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between font-bold text-slate-900">
                <span className="text-slate-700">{lang === 'pt' ? 'Total Retido na Fonte:' : 'Total retenu :'}</span>
                <span className="text-rose-600 tabular-nums">
                  -{formatCurrency(activePeriod.totalDeductions, locale)} ({activePeriod.effectiveTaxRate.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* High-Converting Action Center */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={onViewFullResults}
              className="w-full py-4 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-between shadow-sm hover:shadow transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5 text-left">
                <FileText className="w-5 h-5 text-blue-100 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block font-bold">
                    {lang === 'pt'
                      ? 'Ver Contracheque Oficial Completo'
                      : lang === 'en'
                      ? 'View Detailed Official Paystub'
                      : 'Voir le relevé de paie officiel complet'}
                  </span>
                  <span className="text-[11px] text-blue-100 font-normal hidden sm:block">
                    {lang === 'pt'
                      ? 'Tabela cascata com 6 períodos, holerite e regras fiscais'
                      : 'Cascade sur 6 cycles, fiche imprimable et règles fiscales'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white group-hover:bg-white/30 transition-colors">
                <span>{lang === 'pt' ? 'Abrir' : 'Ouvrir'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Quick Share / Copy Helper */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                <span>
                  {copied
                    ? (lang === 'pt' ? 'Copiado para a área de transferência!' : 'Copié dans le presse-papier !')
                    : (lang === 'pt' ? 'Copiar resumo' : 'Copier le résumé')}
                </span>
              </button>

              <div className="flex items-center gap-3">
                {onOpenRaiseSimulator && (
                  <button
                    type="button"
                    onClick={onOpenRaiseSimulator}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer inline-flex items-center gap-1 transition-colors"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{lang === 'pt' ? 'Simular Aumento' : 'Simuler Augmentation'}</span>
                  </button>
                )}

                {onOpenScenarios && (
                  <button
                    type="button"
                    onClick={onOpenScenarios}
                    className="text-blue-700 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    {lang === 'pt' ? 'Comparar cenários' : 'Comparer scénarios'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Cockpit Trust & Legal Guarantee Strip (Bottom of Unified Card) */}
      <div className="bg-white border-t border-slate-100 px-6 sm:px-8 py-4 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {lang === 'pt'
                ? 'Conformidade legal com Revenu Québec & Agence du Revenu du Canada (ARC)'
                : 'Conformité fiscale Revenu Québec & Agence du revenu du Canada'}
            </span>
          </span>
          <span className="text-slate-300 hidden md:inline">·</span>
          <span className="font-medium text-slate-600">
            {lang === 'pt' ? '100% Gratuito & Sem Cadastro' : '100% Gratuit & Privé'}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400">
          <span>{lang === 'pt' ? 'Ano Fiscal: 2026' : 'Année fiscale : 2026'}</span>
        </div>
      </div>
    </section>
  );
};
