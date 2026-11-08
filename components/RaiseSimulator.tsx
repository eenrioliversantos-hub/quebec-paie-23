'use client';

import React, { useState, useMemo } from 'react';
import {
  TaxInput,
  calculateQuebecPay,
  formatCurrency,
  CANADIAN_PROVINCES,
  CanadianProvince,
} from '@/lib/tax-engine';
import { Language, translations } from '@/lib/i18n';
import {
  TrendingUp,
  Check,
  Edit2,
  CheckCircle2,
  Scale,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { CalculatorWorkspaceLayout } from '@/components/calculator-suite/CalculatorWorkspaceLayout';
import { CalculatorLivePreviewCard } from '@/components/calculator-suite/CalculatorLivePreviewCard';
import { CalculatorResultsLayout } from '@/components/calculator-suite/CalculatorResultsLayout';

export type RaiseInputType = 'desired_rate' | 'bump_dollar' | 'bump_percent';

interface RaiseSimulatorProps {
  input: TaxInput;
  lang: Language;
  onApplyRaise?: (newHourlyRate: number) => void;
}

export const RaiseSimulator: React.FC<RaiseSimulatorProps> = ({
  input,
  lang,
  onApplyRaise,
}) => {
  const t = translations[lang];
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  // --- BASE VALUES (BENCHMARK REFERENCE) ---
  const [baseHourlyRate, setBaseHourlyRate] = useState<number>(() => input.hourlyRate || 25.0);
  const [baseHoursPerWeek, setBaseHoursPerWeek] = useState<number>(() => input.regularHoursPerWeek || 40);
  const [baseProvince, setBaseProvince] = useState<CanadianProvince>(() => input.province || 'QC');
  const [isEditingBase, setIsEditingBase] = useState<boolean>(false);

  // --- DESIRED VALUES / INCREASE ---
  const [inputType, setInputType] = useState<RaiseInputType>('desired_rate');
  const [desiredHourlyRate, setDesiredHourlyRate] = useState<number>(() =>
    Math.round(((input.hourlyRate || 25.0) + 3.0) * 100) / 100
  );
  const [bumpDollar, setBumpDollar] = useState<number>(3.0);
  const [bumpPercent, setBumpPercent] = useState<number>(10.0);

  // --- VIEW MODE (Workspace vs Full Results) ---
  const [viewMode, setViewMode] = useState<'workspace' | 'results'>('workspace');
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // Quick preset chips
  const quickDollarPresets = [1.5, 2.5, 3.5, 5.0, 7.5];
  const quickPercentPresets = [5.0, 8.0, 10.0, 12.5, 15.0];

  // Synchronized calculation handlers
  const handleDesiredRateChange = (newTargetRate: number) => {
    const validTarget = Math.max(0, newTargetRate);
    setDesiredHourlyRate(validTarget);
    const diff = Math.round((validTarget - baseHourlyRate) * 100) / 100;
    setBumpDollar(diff > 0 ? diff : 0);
    const pct = baseHourlyRate > 0 ? Math.round(((diff / baseHourlyRate) * 100) * 10) / 10 : 0;
    setBumpPercent(pct > 0 ? pct : 0);
  };

  const handleBumpDollarChange = (diffDollar: number) => {
    const validDiff = Math.max(0, diffDollar);
    setBumpDollar(validDiff);
    const target = Math.round((baseHourlyRate + validDiff) * 100) / 100;
    setDesiredHourlyRate(target);
    const pct = baseHourlyRate > 0 ? Math.round(((validDiff / baseHourlyRate) * 100) * 10) / 10 : 0;
    setBumpPercent(pct);
  };

  const handleBumpPercentChange = (pct: number) => {
    const validPct = Math.max(0, pct);
    setBumpPercent(validPct);
    const diff = Math.round(((baseHourlyRate * validPct) / 100) * 100) / 100;
    setBumpDollar(diff);
    setDesiredHourlyRate(Math.round((baseHourlyRate + diff) * 100) / 100);
  };

  // --- CALCULATIONS FOR BASE & SIMULATED ---
  const baselineInput: TaxInput = useMemo(
    () => ({
      ...input,
      province: baseProvince,
      hourlyRate: baseHourlyRate,
      regularHoursPerWeek: baseHoursPerWeek,
      annualGrossSalary: Math.round(baseHourlyRate * baseHoursPerWeek * 52),
      periodGrossSalary: Math.round(baseHourlyRate * baseHoursPerWeek * 2 * 100) / 100,
    }),
    [input, baseProvince, baseHourlyRate, baseHoursPerWeek]
  );

  const simulatedInput: TaxInput = useMemo(
    () => ({
      ...baselineInput,
      hourlyRate: desiredHourlyRate,
      annualGrossSalary: Math.round(desiredHourlyRate * baseHoursPerWeek * 52),
      periodGrossSalary: Math.round(desiredHourlyRate * baseHoursPerWeek * 2 * 100) / 100,
    }),
    [baselineInput, desiredHourlyRate, baseHoursPerWeek]
  );

  const baseResult = useMemo(() => calculateQuebecPay(baselineInput), [baselineInput]);
  const simulatedResult = useMemo(() => calculateQuebecPay(simulatedInput), [simulatedInput]);

  // Net gain across intervals
  const extraHourlyNet = simulatedResult.effectiveHourlyRateNet - baseResult.effectiveHourlyRateNet;
  const extraBiweeklyNet = simulatedResult.cascade.biweekly.net - baseResult.cascade.biweekly.net;
  const extraAnnualNet = simulatedResult.annualNet - baseResult.annualNet;

  const grossDiffAnnual = simulatedResult.annualGross - baseResult.annualGross;
  const grossDiffBiweekly = simulatedResult.cascade.biweekly.gross - baseResult.cascade.biweekly.gross;
  const totalTaxDiffBiweekly = simulatedResult.cascade.biweekly.totalDeductions - baseResult.cascade.biweekly.totalDeductions;

  // Real pocket retention of the raise
  const retentionPercent =
    grossDiffAnnual > 0 ? (extraAnnualNet / grossDiffAnnual) * 100 : 70;
  const slippagePercent = Math.max(0, 100 - retentionPercent);

  const provinceInfo = CANADIAN_PROVINCES[baseProvince] || CANADIAN_PROVINCES.QC;

  const handleApplyToMain = () => {
    if (onApplyRaise) {
      onApplyRaise(desiredHourlyRate);
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 3000);
    }
  };

  // Tool-specific section for Results View
  const toolSpecificSection = (
    <div className="space-y-6">
      {/* 1. Before vs After Comparison Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>
                {lang === 'pt'
                  ? 'Comparativo Detalhado: Salário Base vs Novo Salário com Aumento'
                  : 'Comparaison Détaillée : Salaire de Base vs Après Augmentation'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'pt'
                ? `De ${formatCurrency(baseHourlyRate, locale)}/h para ${formatCurrency(desiredHourlyRate, locale)}/h (+${formatCurrency(bumpDollar, locale)}/h · +${bumpPercent.toFixed(1)}%) em ${provinceInfo.name[lang] || provinceInfo.name.fr}.`
                : `De ${formatCurrency(baseHourlyRate, locale)}/h à ${formatCurrency(desiredHourlyRate, locale)}/h (+${formatCurrency(bumpDollar, locale)}/h) en ${provinceInfo.name.fr}.`}
            </p>
          </div>

          {onApplyRaise && (
            <button
              type="button"
              onClick={handleApplyToMain}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer self-start sm:self-auto"
            >
              {appliedNotice ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              <span>{appliedNotice ? 'Aplicado com sucesso!' : 'Aplicar à Calculadora Principal'}</span>
            </button>
          )}
        </div>

        {/* 3-Column Comparative Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Base */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'pt' ? '1. Salário Atual (Antes)' : '1. Salaire Actuel (Avant)'}
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'pt' ? 'Taxa Horária:' : 'Taux horaire :'}</span>
                <span className="font-bold text-slate-800">{formatCurrency(baseHourlyRate, locale)}/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'pt' ? 'Bruto Quinzenal:' : 'Brut quinzaine :'}</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  {formatCurrency(baseResult.cascade.biweekly.gross, locale)}
                </span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>{lang === 'pt' ? 'Retenções Fiscais:' : 'Retenues :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(baseResult.cascade.biweekly.totalDeductions, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
                <span className="text-slate-800">{lang === 'pt' ? 'Líquido Quinzenal:' : 'Net quinzaine :'}</span>
                <span className="text-slate-900 text-sm tabular-nums">
                  {formatCurrency(baseResult.cascade.biweekly.net, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* Delta / Increase */}
          <div className="p-4 rounded-xl bg-indigo-50/80 border-2 border-indigo-300 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                {lang === 'pt' ? '2. O Aumento (Acréscimo)' : '2. L’Augmentation (Gain)'}
              </span>
              <span className="text-[10px] font-bold text-indigo-800 bg-indigo-200/80 px-2 py-0.5 rounded-full">
                +{bumpPercent.toFixed(1)}%
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-indigo-800">{lang === 'pt' ? 'Acréscimo Horário:' : 'Hausse horaire :'}</span>
                <span className="font-extrabold text-indigo-950">+{formatCurrency(bumpDollar, locale)}/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-800">{lang === 'pt' ? 'Bruto Adicional / 2 sem:' : 'Brut additionnel :'}</span>
                <span className="font-extrabold text-indigo-950 tabular-nums">
                  +{formatCurrency(grossDiffBiweekly, locale)}
                </span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>{lang === 'pt' ? 'Impostos do Aumento:' : 'Impôts sur la hausse :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(totalTaxDiffBiweekly, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-indigo-200 flex justify-between font-bold">
                <span className="text-indigo-950">{lang === 'pt' ? 'Ganho Líquido no Bolso:' : 'Net en poche :'}</span>
                <span className="text-emerald-700 text-base font-black tabular-nums">
                  +{formatCurrency(extraBiweeklyNet, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* New Simulated */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
              {lang === 'pt' ? '3. Novo Salário Total (Depois)' : '3. Nouveau Salaire (Après)'}
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-800">{lang === 'pt' ? 'Nova Taxa Horária:' : 'Nouveau taux :'}</span>
                <span className="font-bold text-emerald-950">{formatCurrency(desiredHourlyRate, locale)}/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800">{lang === 'pt' ? 'Novo Bruto Quinzenal:' : 'Nouveau brut :'}</span>
                <span className="font-bold text-emerald-950 tabular-nums">
                  {formatCurrency(simulatedResult.cascade.biweekly.gross, locale)}
                </span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>{lang === 'pt' ? 'Novas Retenções:' : 'Nouvelles retenues :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(simulatedResult.cascade.biweekly.totalDeductions, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold">
                <span className="text-emerald-950">{lang === 'pt' ? 'Novo Líquido Quinzenal:' : 'Nouveau net :'}</span>
                <span className="text-emerald-700 text-base font-black tabular-nums">
                  {formatCurrency(simulatedResult.cascade.biweekly.net, locale)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Slippage Fiscal & Negotiation Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Slippage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Scale className="w-4 h-4" />
            <span>
              {lang === 'pt'
                ? 'Índice de Retenção do Aumento (Slippage Fiscal)'
                : 'Indice de Rétention Réel de l’Augmentation'}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'pt'
              ? `Para cada $1,00 a mais de aumento bruto que você negocia, aproximadamente $${(retentionPercent / 100).toFixed(2)} fica com você no seu bolso líquido e $${(slippagePercent / 100).toFixed(2)} é retido pelo governo em imposto marginal e contribuições sociais (RRQ, RQAP).`
              : `Pour chaque 1,00 $ d'augmentation négociée, environ ${(retentionPercent / 100).toFixed(2)} $ reste dans vos poches et ${(slippagePercent / 100).toFixed(2)} $ est retenu à la source.`}
          </p>
        </div>

        {/* Tactical Negotiation Guide */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {lang === 'pt'
                ? 'Dicas Táticas para Negociação Salarial no Canadá'
                : 'Conseils pour Négocier une Augmentation'}
            </span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>
              {lang === 'pt'
                ? 'Foque em metas alcançadas e valor agregado à empresa no último ciclo.'
                : 'Mettez en avant vos réalisations concrètes et votre impact.'}
            </li>
            <li>
              {lang === 'pt'
                ? 'Se houver teto salarial, negocie dias de férias adicionais (congés payés) ou match maior de REER.'
                : 'Négociez des congés supplémentaires ou une bonification du REER collectif si le budget est serré.'}
            </li>
            <li>
              {lang === 'pt'
                ? 'Conheça a média de mercado do seu código CNP (Classificação Nacional de Profissões).'
                : 'Consultez les échelles salariales officielles de votre code CNP.'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // If in Results View:
  if (viewMode === 'results') {
    return (
      <CalculatorResultsLayout
        calc={simulatedResult}
        lang={lang}
        toolBadge={lang === 'pt' ? 'Simulador de Aumento' : 'Simulateur d’Augmentation'}
        toolTitle={
          lang === 'pt'
            ? 'Dossiê Completo de Aumento Salarial & Impacto Fiscal'
            : 'Relevé Officiel d’Augmentation Salariale'
        }
        customHeroNote={
          lang === 'pt'
            ? `Seu novo rendimento líquido simulado atinge ${formatCurrency(simulatedResult.cascade.biweekly.net, locale)} / quinzena (+${formatCurrency(extraBiweeklyNet, locale)} a mais no bolso).`
            : `Votre nouveau revenu net simulé atteint ${formatCurrency(simulatedResult.cascade.biweekly.net, locale)} / deux semaines (+${formatCurrency(extraBiweeklyNet, locale)} dans vos poches).`
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
      icon={TrendingUp}
      iconColorClass="text-indigo-600 bg-indigo-50 border-indigo-200"
      categoryKicker={
        lang === 'pt'
          ? 'Simulador de Aumento Salarial & Negociação'
          : lang === 'en'
          ? 'Wage Bump & Salary Raise Simulator'
          : 'Simulateur d’augmentation de salaire'
      }
      title={
        lang === 'pt'
          ? 'Simulador de Aumento Salarial: Ganho Líquido Real'
          : lang === 'en'
          ? 'Salary Raise Simulator: Real Take-Home Gains'
          : 'Simulateur d’Augmentation : Gain Net Réel en Poche'
      }
      description={
        lang === 'pt'
          ? 'Defina o seu ponto base de partida fixo, simule o salário desejado e visualize o ganho líquido real no bolso após imposto marginal.'
          : 'Définissez votre salaire de référence, simulez l’augmentation souhaitée et découvrez le montant net réel qui atterrira dans vos poches.'
      }
      jurisdictionLabel={`${provinceInfo.flag} ${provinceInfo.name[lang] || provinceInfo.name.fr} 2026`}
      previewCard={
        <CalculatorLivePreviewCard
          lang={lang}
          heroTitle={
            lang === 'pt'
              ? 'Novo Líquido Estimado no Bolso'
              : lang === 'en'
              ? 'New Net Take-Home Pay'
              : 'Nouveau salaire net estimé'
          }
          heroAmount={simulatedResult.cascade.biweekly.net}
          heroPeriodLabel={lang === 'pt' ? 'quinzena' : 'quinzaine'}
          heroSubtext={`+${formatCurrency(extraBiweeklyNet, locale)} a mais / quinzena`}
          effectiveHourlyNet={simulatedResult.effectiveHourlyRateNet}
          retentionPercent={simulatedResult.takeHomePercentage}
          taxPercent={simulatedResult.effectiveTaxRate}
          grossAmount={simulatedResult.cascade.biweekly.gross}
          federalTax={simulatedResult.cascade.biweekly.federalTax}
          provincialTax={simulatedResult.cascade.biweekly.provincialTax}
          socialContributions={
            simulatedResult.cascade.biweekly.rrq +
            simulatedResult.cascade.biweekly.rqap +
            simulatedResult.cascade.biweekly.ae
          }
          totalDeductions={simulatedResult.cascade.biweekly.totalDeductions}
          customMetrics={[
            {
              label: lang === 'pt' ? 'Aumento Líquido por Quinzena:' : 'Hausse nette par paie :',
              value: `+${formatCurrency(extraBiweeklyNet, locale)}`,
              highlight: true,
            },
            {
              label: lang === 'pt' ? 'Aumento Líquido Anual:' : 'Hausse nette annuelle :',
              value: `+${formatCurrency(extraAnnualNet, locale)}`,
            },
            {
              label: lang === 'pt' ? 'Ganho Líquido por Hora:' : 'Gain net par heure :',
              value: `+${formatCurrency(extraHourlyNet, locale)}/h`,
            },
          ]}
          onViewFullResults={() => {
            setViewMode('results');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          ctaTitle={
            lang === 'pt'
              ? 'Ver Impacto Fiscal Completo do Aumento'
              : 'Voir l’impact fiscal complet'
          }
          ctaSubtitle={
            lang === 'pt'
              ? 'Comparativo antes vs depois, cascata e retenção líquida'
              : 'Comparatif avant/après, cascade et rétention nette'
          }
        />
      }
    >
      {/* Left Column Controls */}
      <div className="space-y-5">
        {/* Baseline Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'pt' ? 'Ponto de Partida (Salário Base Atual)' : 'Salaire de Base Actuel'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingBase(!isEditingBase)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditingBase ? (lang === 'pt' ? 'Travar Base' : 'Verrouiller') : (lang === 'pt' ? 'Editar Base' : 'Modifier')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {lang === 'pt' ? 'Taxa Horária Atual' : 'Taux horaire actuel'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  disabled={!isEditingBase}
                  step="0.25"
                  value={baseHourlyRate}
                  onChange={(e) => setBaseHourlyRate(parseFloat(e.target.value) || 0)}
                  className={`w-full pl-7 pr-3 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    isEditingBase
                      ? 'border-blue-400 bg-blue-50/20 text-slate-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {lang === 'pt' ? 'Horas / Semana' : 'Heures / semaine'}
              </label>
              <input
                type="number"
                disabled={!isEditingBase}
                step="0.5"
                value={baseHoursPerWeek}
                onChange={(e) => setBaseHoursPerWeek(parseFloat(e.target.value) || 40)}
                className={`w-full px-3 py-2 rounded-xl text-sm font-bold border transition-colors ${
                  isEditingBase
                    ? 'border-blue-400 bg-blue-50/20 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {lang === 'pt' ? 'Província' : 'Province'}
              </label>
              <select
                disabled={!isEditingBase}
                value={baseProvince}
                onChange={(e) => setBaseProvince(e.target.value as CanadianProvince)}
                className={`w-full px-3 py-2 rounded-xl text-sm font-bold border transition-colors ${
                  isEditingBase
                    ? 'border-blue-400 bg-blue-50/20 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                }`}
              >
                {Object.values(CANADIAN_PROVINCES).map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Raise Simulation Card */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'pt' ? 'Como deseja simular o aumento?' : 'Comment simuler la hausse ?'}
            </label>
            <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200/80 gap-1">
              <button
                type="button"
                onClick={() => setInputType('desired_rate')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  inputType === 'desired_rate'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Taxa Alvo ($/h)' : 'Nouveau taux'}
              </button>
              <button
                type="button"
                onClick={() => setInputType('bump_dollar')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  inputType === 'bump_dollar'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Acréscimo (+$)' : 'Montant (+ $)'}
              </button>
              <button
                type="button"
                onClick={() => setInputType('bump_percent')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  inputType === 'bump_percent'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Percentual (+%)' : 'Pourcentage (+ %)'}
              </button>
            </div>
          </div>

          {/* Dynamic Input based on selection */}
          {inputType === 'desired_rate' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{lang === 'pt' ? 'Nova Taxa Horária Desejada:' : 'Nouveau taux horaire souhaité :'}</span>
                <span className="text-indigo-600 font-bold">
                  +{formatCurrency(bumpDollar, locale)}/h (+{bumpPercent.toFixed(1)}%)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-black text-2xl">$</span>
                <input
                  type="number"
                  step="0.25"
                  value={desiredHourlyRate || ''}
                  onChange={(e) => handleDesiredRateChange(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-16 py-3 text-2xl sm:text-3xl font-black text-slate-900 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 tabular-nums shadow-xs"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 font-bold text-sm">/ h</span>
              </div>
            </div>
          )}

          {inputType === 'bump_dollar' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{lang === 'pt' ? 'Acréscimo por hora ($/h):' : 'Hausse par heure ($/h) :'}</span>
                <span className="text-indigo-600 font-bold">
                  = ${desiredHourlyRate.toFixed(2)}/h final
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-black text-2xl">+$</span>
                <input
                  type="number"
                  step="0.25"
                  value={bumpDollar || ''}
                  onChange={(e) => handleBumpDollarChange(parseFloat(e.target.value) || 0)}
                  className="w-full pl-12 pr-16 py-3 text-2xl sm:text-3xl font-black text-slate-900 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 tabular-nums shadow-xs"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 font-bold text-sm">/ h</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickDollarPresets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleBumpDollarChange(val)}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    +${val.toFixed(2)}/h
                  </button>
                ))}
              </div>
            </div>
          )}

          {inputType === 'bump_percent' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{lang === 'pt' ? 'Aumento percentual (%):' : 'Hausse en pourcentage (%) :'}</span>
                <span className="text-indigo-600 font-bold">
                  = +${bumpDollar.toFixed(2)}/h (${desiredHourlyRate.toFixed(2)}/h)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-black text-2xl">+</span>
                <input
                  type="number"
                  step="0.5"
                  value={bumpPercent || ''}
                  onChange={(e) => handleBumpPercentChange(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-16 py-3 text-2xl sm:text-3xl font-black text-slate-900 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 tabular-nums shadow-xs"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 font-bold text-sm">%</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickPercentPresets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleBumpPercentChange(val)}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    +{val}%
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorWorkspaceLayout>
  );
};
