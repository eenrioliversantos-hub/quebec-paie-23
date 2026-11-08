'use client';

import React, { useState, useMemo } from 'react';
import {
  CanadianProvince,
  CANADIAN_PROVINCES,
  calculateQuebecPay,
  formatCurrency,
  TaxInput,
} from '@/lib/tax-engine';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import {
  MapPin,
  Building2,
  Lock,
  Crown,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { CalculatorWorkspaceLayout } from '@/components/calculator-suite/CalculatorWorkspaceLayout';
import { CalculatorLivePreviewCard } from '@/components/calculator-suite/CalculatorLivePreviewCard';
import { CalculatorResultsLayout } from '@/components/calculator-suite/CalculatorResultsLayout';

interface InterprovincialSalaryComparatorProps {
  lang: Language;
  onSelectTool?: (tool: ToolId) => void;
  onLoadProvinceToMainCalc?: (prov: CanadianProvince, rate: number, hours: number) => void;
  isPro?: boolean;
  onOpenProModal?: (msg?: string) => void;
}

export const InterprovincialSalaryComparator: React.FC<InterprovincialSalaryComparatorProps> = ({
  lang,
  onSelectTool,
  onLoadProvinceToMainCalc,
  isPro = false,
  onOpenProModal,
}) => {
  // Input parameters
  const [hourlyWage, setHourlyWage] = useState<number>(25.0);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);
  const [inputMode, setInputMode] = useState<'hourly' | 'annual'>('hourly');
  const [annualSalaryInput, setAnnualSalaryInput] = useState<number>(52000);

  // Provinces comparison selection (Head to head)
  const [originProv, setOriginProv] = useState<CanadianProvince>('QC');
  const [targetProv, setTargetProv] = useState<CanadianProvince>('ON');

  // View Mode: 'workspace' (inputs + live preview) vs 'results' (detailed results dossier)
  const [viewMode, setViewMode] = useState<'workspace' | 'results'>('workspace');

  // Filter or sort on the full provinces table
  const [tableSortBy, setTableSortBy] = useState<'netAnnual' | 'netHourly' | 'purchasingPower' | 'taxRate'>('netAnnual');

  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  // Resolved annual gross
  const resolvedHourly = inputMode === 'hourly' ? hourlyWage : annualSalaryInput / (weeklyHours * 52);
  const resolvedAnnualGross = inputMode === 'hourly' ? hourlyWage * weeklyHours * 52 : annualSalaryInput;

  // Compute calculation for all 13 provinces and territories
  const allProvincesData = useMemo(() => {
    const list = Object.keys(CANADIAN_PROVINCES) as CanadianProvince[];
    return list.map((pCode) => {
      const pInfo = CANADIAN_PROVINCES[pCode];
      const baseInput: TaxInput = {
        province: pCode,
        entryMode: 'hourly',
        hourlyRate: resolvedHourly,
        regularHoursPerWeek: weeklyHours,
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
      };

      const result = calculateQuebecPay(baseInput);

      // Cost of living adjusted net (Purchasing Power):
      // Index base = 100 (Montreal benchmark is ~96, Toronto ~114, Vancouver ~116, Calgary ~98)
      // Real Purchasing Power = (Annual Net / (CostOfLivingIndex / 100))
      const colIndex = pInfo.costOfLivingIndex || 100;
      const realPurchasingPower = Math.round((result.annualNet / (colIndex / 100)));
      const purchasingPowerHourly = Math.round((realPurchasingPower / (weeklyHours * 52)) * 100) / 100;

      // Minimum wage check
      const isBelowMinWage = resolvedHourly < pInfo.minWageHourly;

      return {
        code: pCode,
        info: pInfo,
        result,
        annualGross: result.annualGross,
        annualNet: result.annualNet,
        biweeklyNet: result.selectedPeriod.net,
        effectiveHourlyNet: result.effectiveHourlyRateNet,
        totalDeductions: result.annualTotalDeductions,
        provincialTax: result.annualProvincialTax,
        federalTax: result.annualFederalTax,
        pensionContribution: result.annualRRQ, // RRQ in QC, CPP elsewhere
        eiContribution: result.annualAE,
        rqapContribution: result.annualRQAP,
        effectiveTaxRate: result.effectiveTaxRate,
        marginalTaxRate: result.marginalTaxRate,
        costOfLivingIndex: colIndex,
        realPurchasingPower,
        purchasingPowerHourly,
        isBelowMinWage,
      };
    });
  }, [resolvedHourly, weeklyHours]);

  // Sorted list for table
  const sortedProvinces = useMemo(() => {
    return [...allProvincesData].sort((a, b) => {
      if (tableSortBy === 'netAnnual') return b.annualNet - a.annualNet;
      if (tableSortBy === 'netHourly') return b.effectiveHourlyNet - a.effectiveHourlyNet;
      if (tableSortBy === 'purchasingPower') return b.realPurchasingPower - a.realPurchasingPower;
      if (tableSortBy === 'taxRate') return a.effectiveTaxRate - b.effectiveTaxRate;
      return 0;
    });
  }, [allProvincesData, tableSortBy]);

  // Head-to-Head Comparison (Origin vs Target)
  const originData = useMemo(() => {
    return allProvincesData.find((p) => p.code === originProv) || allProvincesData[0];
  }, [allProvincesData, originProv]);

  const targetData = useMemo(() => {
    return allProvincesData.find((p) => p.code === targetProv) || allProvincesData[1];
  }, [allProvincesData, targetProv]);

  const netDiffAnnual = targetData.annualNet - originData.annualNet;
  const netDiffBiweekly = targetData.biweeklyNet - originData.biweeklyNet;
  const purchasingPowerDiff = targetData.realPurchasingPower - originData.realPurchasingPower;

  // Localized dictionary
  const t = useMemo(() => {
    return {
      pt: {
        title: 'Comparador de Salários & Custo de Vida Interprovincial',
        subtitle: 'Descubra como o mesmo valor bruto (ex: $25/h ou $65.000/ano) se transforma em salários líquidos e poderes de compra totalmente diferentes conforme a província canadense.',
        hourlyTab: 'Por Hora ($/h)',
        annualTab: 'Salário Anual ($/ano)',
        hoursLabel: 'Horas trabalhadas por semana',
        originLabel: 'Província de Origem',
        targetLabel: 'Província de Destino',
        headToHeadTitle: 'Comparativo Direto (Frente a Frente)',
        annualNet: 'Salário Líquido Anual',
        biweeklyNet: 'Líquido por Quinzena',
        hourlyNet: 'Líquido Real por Hora',
        colIndex: 'Índice de Custo de Vida',
        realPower: 'Poder de Compra Real Ajustado',
        taxRate: 'Taxa Efetiva de Dedução',
        diffLabel: 'Diferença Líquida em Relação à Origem',
        tableTitle: 'Ranking Salarial & Fiscal em Todas as 13 Províncias e Territórios',
        tableSubtitle: 'Classificação oficial 2025/2026 com barèmes provinciais, CPP/RRQ, seguro-desemprego, alíquotas e ponderação de custo de moradia.',
        sortByLabel: 'Ordenar por:',
        colProv: 'Província / Território',
        colGross: 'Salário Bruto',
        colProvTax: 'Imp. Provincial',
        colFedTax: 'Imp. Federal',
        colPension: 'Previdência (CPP/RRQ)',
        colNetAnnual: 'Líquido Anual',
        colNetHourly: 'Líquido/Hora',
        colPower: 'Poder de Compra',
        colRate: 'Alíquota Total',
        actionLoad: 'Carregar nesta Província',
        minWageNotice: 'Salário Mínimo Oficial',
        otThreshold: 'Horas p/ Hora Extra (1.5x)',
        quebecNoteTitle: 'Por que o Québec é Diferente?',
        quebecNoteText: 'O Québec é a única província que recolhe seu próprio imposto de renda provincial de forma totalmente separada do governo federal (Revenu Québec), possui o Abatimento de 16,5% no imposto federal, e regimes próprios de aposentadoria (RRQ) e licença parental (RQAP). Por outro lado, o custo de moradia e creches públicas subsidiadas ($9,10/dia) conferem alto poder de compra real.',
      },
      fr: {
        title: 'Comparateur Interprovincial de Salaires & Pouvoir d’Achat',
        subtitle: 'Découvrez comment un même salaire brut (ex: 25 $/h ou 65 000 $/an) se traduit par des montants nets et des pouvoirs d’achat très variables selon les provinces et territoires du Canada.',
        hourlyTab: 'Taux Horaire ($/h)',
        annualTab: 'Salaire Annuel ($/an)',
        hoursLabel: 'Heures travaillées par semaine',
        originLabel: 'Province d’Origine',
        targetLabel: 'Province de Destination',
        headToHeadTitle: 'Comparatif Direct (Côte à Côte)',
        annualNet: 'Salaire Net Annuel',
        biweeklyNet: 'Net aux 2 semaines',
        hourlyNet: 'Net Réel par Heure',
        colIndex: 'Indice du Coût de la Vie',
        realPower: 'Pouvoir d’Achat Réel Ajusté',
        taxRate: 'Taux Effectif de Retenue',
        diffLabel: 'Différence Nette par rapport à l’Origine',
        tableTitle: 'Classement Fiscal des 13 Provinces et Territoires',
        tableSubtitle: 'Barèmes officiels 2025/2026 avec RPC/RRQ, AE, impôts provinciaux et pondération du coût du logement.',
        sortByLabel: 'Trier par :',
        colProv: 'Province / Territoire',
        colGross: 'Salaire Brut',
        colProvTax: 'Impôt Prov.',
        colFedTax: 'Impôt Féd.',
        colPension: 'Régime Retraite',
        colNetAnnual: 'Net Annuel',
        colNetHourly: 'Net / Heure',
        colPower: 'Pouvoir d’Achat',
        colRate: 'Taux Effectif',
        actionLoad: 'Calculer pour cette province',
        minWageNotice: 'Salaire Minimum Légal',
        otThreshold: 'Seuil Heures Supplémentaires',
        quebecNoteTitle: 'Pourquoi le Québec est-il différent ?',
        quebecNoteText: 'Le Québec bénéficie d’un abattement fédéral spécial de 16,5 %, administre son propre régime de rentes (RRQ) et son assurance parentale (RQAP). Ses loyers modérés et son réseau de garderies à 9,10 $/jour préservent un pouvoir d’achat compétitif.',
      },
      en: {
        title: 'Interprovincial Salary & Cost of Living Comparator',
        subtitle: 'Explore how the same gross wage translates into vastly different take-home pay and real purchasing power across Canadian provinces.',
        hourlyTab: 'Hourly Wage ($/h)',
        annualTab: 'Annual Salary ($/yr)',
        hoursLabel: 'Weekly hours worked',
        originLabel: 'Origin Province',
        targetLabel: 'Target Province',
        headToHeadTitle: 'Head-to-Head Relocation Comparison',
        annualNet: 'Annual Net Take-Home',
        biweeklyNet: 'Bi-weekly Net Pay',
        hourlyNet: 'Net Pocket Rate / Hour',
        colIndex: 'Cost of Living Index',
        realPower: 'Adjusted Purchasing Power',
        taxRate: 'Effective Total Tax Rate',
        diffLabel: 'Net Difference vs Origin',
        tableTitle: 'Tax & Salary Ranking across All 13 Provinces and Territories',
        tableSubtitle: 'Official 2025/2026 brackets with CPP/QPP, EI, provincial surtaxes and housing cost adjustments.',
        sortByLabel: 'Sort by:',
        colProv: 'Province / Territory',
        colGross: 'Gross Salary',
        colProvTax: 'Prov. Tax',
        colFedTax: 'Fed. Tax',
        colPension: 'Pension (CPP/QPP)',
        colNetAnnual: 'Annual Net',
        colNetHourly: 'Net / Hour',
        colPower: 'Purchasing Power',
        colRate: 'Effective Rate',
        actionLoad: 'Load in Main Calculator',
        minWageNotice: 'Statutory Minimum Wage',
        otThreshold: 'Overtime Threshold (1.5x)',
        quebecNoteTitle: 'Why is Quebec unique in Canadian payroll?',
        quebecNoteText: 'Quebec residents receive a 16.5% federal tax abatement, independent QPP/QPIP contributions, and provincial worker deductions, balanced by subsidized childcare ($9.10/day) and lower average rents than Ontario and British Columbia.',
      },
    }[lang];
  }, [lang]);

  // Tool Specific Deep-Dive Section for Results View
  const toolSpecificSection = (
    <div className="space-y-6">
      {/* 1. Head-to-Head Detailed Comparison Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 block mb-1">
              {t.headToHeadTitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {originData.info.flag} {originData.info.name[lang] || originData.info.name.fr} vs {targetData.info.flag} {targetData.info.name[lang] || targetData.info.name.fr}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={originProv}
              onChange={(e) => setOriginProv(e.target.value as CanadianProvince)}
              className="bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(CANADIAN_PROVINCES).map((p) => (
                <option key={`orig-${p.code}`} value={p.code}>
                  {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                </option>
              ))}
            </select>

            <span className="text-slate-400 font-bold">⇄</span>

            <select
              value={targetProv}
              onChange={(e) => setTargetProv(e.target.value as CanadianProvince)}
              className="bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(CANADIAN_PROVINCES).map((p) => (
                <option key={`target-${p.code}`} value={p.code}>
                  {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by side metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Origin Card */}
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {lang === 'pt' ? 'Origem' : 'Origine'}
              </span>
              <span className="text-base font-black text-white flex items-center gap-1.5">
                <span>{originData.info.flag}</span>
                <span>{originData.info.name[lang] || originData.info.name.fr}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">{t.annualNet}</span>
              <span className="text-2xl sm:text-3xl font-black text-white block">
                {formatCurrency(originData.annualNet, locale)}
              </span>
              <span className="text-xs text-blue-400 font-semibold block">
                {formatCurrency(originData.biweeklyNet, locale)} / 2 {lang === 'pt' ? 'semanas' : 'sem'} · {formatCurrency(originData.effectiveHourlyNet, locale)}/h {lang === 'pt' ? 'líquido' : 'net'}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">{t.colIndex}</span>
                <span className="font-bold text-slate-200">
                  {originData.costOfLivingIndex} <span className="text-[10px] text-slate-400">(Base 100)</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.realPower}</span>
                <span className="font-bold text-emerald-400">
                  {formatCurrency(originData.realPurchasingPower, locale)}/an
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>{t.taxRate}:</span>
              <span className="font-bold text-rose-300">{originData.effectiveTaxRate.toFixed(1)}%</span>
            </div>
          </div>

          {/* Target Card */}
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                {lang === 'pt' ? 'Destino' : 'Destination'}
              </span>
              <span className="text-base font-black text-white flex items-center gap-1.5">
                <span>{targetData.info.flag}</span>
                <span>{targetData.info.name[lang] || targetData.info.name.fr}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">{t.annualNet}</span>
              <span className="text-2xl sm:text-3xl font-black text-white block">
                {formatCurrency(targetData.annualNet, locale)}
              </span>
              <span className="text-xs text-blue-400 font-semibold block">
                {formatCurrency(targetData.biweeklyNet, locale)} / 2 {lang === 'pt' ? 'semanas' : 'sem'} · {formatCurrency(targetData.effectiveHourlyNet, locale)}/h {lang === 'pt' ? 'líquido' : 'net'}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">{t.colIndex}</span>
                <span className="font-bold text-slate-200">
                  {targetData.costOfLivingIndex} <span className="text-[10px] text-slate-400">(Base 100)</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.realPower}</span>
                <span className="font-bold text-emerald-400">
                  {formatCurrency(targetData.realPurchasingPower, locale)}/an
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>{t.taxRate}:</span>
              <span className="font-bold text-rose-300">{targetData.effectiveTaxRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Delta Verdict Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 border border-blue-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-300 block">{t.diffLabel}</span>
            <div className="text-lg sm:text-xl font-black flex items-center gap-2">
              <span className={netDiffAnnual >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {netDiffAnnual >= 0 ? '+' : ''}{formatCurrency(netDiffAnnual, locale)} / an
              </span>
              <span className="text-slate-400 font-normal text-sm">
                ({netDiffBiweekly >= 0 ? '+' : ''}{formatCurrency(netDiffBiweekly, locale)} / quinzena)
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold text-slate-400 block">Poder de Compra Real:</span>
            <span className={`text-sm font-black ${purchasingPowerDiff >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {purchasingPowerDiff >= 0 ? '+' : ''}{formatCurrency(purchasingPowerDiff, locale)}/ano
            </span>
          </div>
        </div>
      </div>

      {/* 2. Full 13 Provinces and Territories Ranking Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>{t.tableTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              {t.tableSubtitle}
            </p>
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 shrink-0">{t.sortByLabel}</span>
            <select
              value={tableSortBy}
              onChange={(e) => setTableSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="netAnnual">Líquido Anual</option>
              <option value="netHourly">Líquido / Hora</option>
              <option value="purchasingPower">Poder de Compra Real</option>
              <option value="taxRate">Menor Alíquota Total</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 font-extrabold">{t.colProv}</th>
                <th className="py-3 px-3 font-extrabold">{t.colGross}</th>
                <th className="py-3 px-3 font-extrabold text-rose-600">{t.colProvTax}</th>
                <th className="py-3 px-3 font-extrabold text-rose-600">{t.colFedTax}</th>
                <th className="py-3 px-3 font-extrabold">{t.colPension}</th>
                <th className="py-3 px-3 font-black text-slate-900">{t.colNetAnnual}</th>
                <th className="py-3 px-3 font-black text-emerald-600">{t.colNetHourly}</th>
                <th className="py-3 px-3 font-black text-blue-600">{t.colPower}</th>
                <th className="py-3 px-3 font-extrabold">{t.colRate}</th>
                <th className="py-3 px-3 font-extrabold text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedProvinces.map((item, index) => {
                const isOrigin = item.code === originProv;
                const isTarget = item.code === targetProv;
                const isBlurred = !isPro && index >= 4;

                return (
                  <tr
                    key={item.code}
                    className={`transition-colors ${
                      isTarget
                        ? 'bg-blue-50/80 font-semibold'
                        : isOrigin
                        ? 'bg-slate-50/80'
                        : 'hover:bg-slate-50/50'
                    } ${isBlurred ? 'filter blur-[3.5px] select-none opacity-40' : ''}`}
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.info.flag}</span>
                        <div>
                          <span className="font-extrabold text-slate-900 block">
                            {item.info.name[lang] || item.info.name.fr}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">
                            {item.code} {item.isBelowMinWage && '⚠️ Abaixo do Min'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-700 tabular-nums">
                      {formatCurrency(item.annualGross, locale)}
                    </td>
                    <td className="py-3.5 px-3 text-rose-600 font-semibold tabular-nums">
                      -{formatCurrency(item.provincialTax, locale)}
                    </td>
                    <td className="py-3.5 px-3 text-rose-600 font-semibold tabular-nums">
                      -{formatCurrency(item.federalTax, locale)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-semibold tabular-nums">
                      -{formatCurrency(item.pensionContribution, locale)}
                    </td>
                    <td className="py-3.5 px-3 font-black text-slate-900 tabular-nums text-sm">
                      {formatCurrency(item.annualNet, locale)}
                    </td>
                    <td className="py-3.5 px-3 font-black text-emerald-600 tabular-nums">
                      {formatCurrency(item.effectiveHourlyNet, locale)}/h
                    </td>
                    <td className="py-3.5 px-3 font-bold text-blue-700 tabular-nums">
                      {formatCurrency(item.realPurchasingPower, locale)}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700 tabular-nums">
                      {item.effectiveTaxRate.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {!isBlurred && (
                        <button
                          type="button"
                          onClick={() => {
                            if (onLoadProvinceToMainCalc) {
                              onLoadProvinceToMainCalc(item.code, resolvedHourly, weeklyHours);
                            } else if (onSelectTool) {
                              onSelectTool('net-calc');
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title={`Carregar detalhes para ${item.info.name[lang] || item.info.name.fr}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Premium Paywall Blur Overlay */}
          {!isPro && (
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent flex flex-col items-center justify-center text-center p-4 text-white z-10 rounded-b-2xl">
              <div className="flex items-center gap-1.5 mb-1 bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Premium Feature</span>
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm tracking-tight text-white mb-0.5">
                {lang === 'pt' ? 'Desbloqueie todas as 13 Províncias e Territórios' : 'Débloquez les 13 provinces et territoires'}
              </h4>
              <p className="text-[10px] text-slate-300 max-w-md leading-tight mb-2">
                {lang === 'pt'
                  ? 'Veja custo de vida e poder de compra para todo o Canadá com o Pass Carrière Pro.'
                  : 'Comparez le coût de la vie et le pouvoir d’achat pour tout le Canada.'}
              </p>
              <button
                type="button"
                onClick={() => onOpenProModal?.('canada-provinces')}
                className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>{lang === 'pt' ? 'Desbloquear Pass Pro por $12.99 CAD' : 'Débloquer le Pass Pro à 12,99 $'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Informative Guidance Card on Quebec & Provincial Particularities */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <span>{t.quebecNoteTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          {t.quebecNoteText}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 block">Abattement Fédéral QC (16,5%)</span>
            <span className="text-xs text-slate-700 block">
              Redução direta de 16,5% no imposto federal que compensa a administração própria da província do Québec.
            </span>
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 block">Surtaxe & Saúde em Ontário</span>
            <span className="text-xs text-slate-700 block">
              Ontário aplica Surtaxa de 20%/36% e Ontario Health Premium (até $900), além de horas extras após 44h.
            </span>
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 block">Alberta Sem TVP (0% Sales Tax)</span>
            <span className="text-xs text-slate-700 block">
              Apenas 5% de GST federal sobre compras, sem taxa provincial e com o maior BPA pessoal ($21.885).
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // If in Results View:
  if (viewMode === 'results') {
    return (
      <CalculatorResultsLayout
        calc={targetData.result}
        lang={lang}
        toolBadge={lang === 'pt' ? 'Comparador Interprovincial' : 'Comparateur Interprovincial'}
        toolTitle={
          lang === 'pt'
            ? `Dossiê Salarial: ${originData.info.name[lang] || originData.info.name.fr} vs ${targetData.info.name[lang] || targetData.info.name.fr}`
            : `Dossier Salarial : ${originData.info.name.fr} vs ${targetData.info.name.fr}`
        }
        customHeroNote={
          lang === 'pt'
            ? `Em ${targetData.info.name[lang] || targetData.info.name.fr}, seu rendimento líquido oficial é de ${formatCurrency(targetData.biweeklyNet, locale)} / quinzena (${netDiffBiweekly >= 0 ? '+' : ''}${formatCurrency(netDiffBiweekly, locale)} em relação a ${originData.info.name[lang] || originData.info.name.fr}).`
            : `En ${targetData.info.name.fr}, votre revenu net est de ${formatCurrency(targetData.biweeklyNet, locale)} / deux semaines (${netDiffBiweekly >= 0 ? '+' : ''}${formatCurrency(netDiffBiweekly, locale)} par rapport au ${originData.info.name.fr}).`
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
      icon={MapPin}
      iconColorClass="text-blue-600 bg-blue-50 border-blue-200"
      categoryKicker={
        lang === 'pt'
          ? 'Mobilidade & Fiscalidade Interprovincial'
          : lang === 'en'
          ? 'Interprovincial Tax & Relocation'
          : 'Fiscalité & Mobilité Interprovinciale'
      }
      title={
        lang === 'pt'
          ? 'Comparador de Salários & Poder de Compra no Canadá'
          : lang === 'en'
          ? 'Interprovincial Salary & Cost of Living Comparator'
          : 'Comparateur Interprovincial de Salaires & Pouvoir d’Achat'
      }
      description={
        lang === 'pt'
          ? 'Compare como o mesmo salário bruto rende valores líquidos e poderes de compra reais diferentes entre o Québec e as outras 12 províncias e territórios do Canadá.'
          : 'Découvrez comment un même salaire brut se traduit par des montants nets et des pouvoirs d’achat très variables selon les provinces et territoires.'
      }
      jurisdictionLabel="🍁 10 Provinces & 3 Territoires 2026"
      previewCard={
        <CalculatorLivePreviewCard
          lang={lang}
          heroTitle={
            lang === 'pt'
              ? `Líquido em ${targetData.info.name[lang] || targetData.info.name.fr}`
              : lang === 'en'
              ? `Take-Home Pay in ${targetData.info.name.en}`
              : `Revenu Net en ${targetData.info.name.fr}`
          }
          heroAmount={targetData.biweeklyNet}
          heroPeriodLabel={targetData.result.cascade.biweekly.label}
          heroSubtext={
            lang === 'pt'
              ? `Poder de compra real: ${formatCurrency(targetData.realPurchasingPower, locale)}/ano (índice ${targetData.costOfLivingIndex})`
              : `Pouvoir d’achat réel : ${formatCurrency(targetData.realPurchasingPower, locale)}/an (indice ${targetData.costOfLivingIndex})`
          }
          effectiveHourlyNet={targetData.effectiveHourlyNet}
          retentionPercent={targetData.result.takeHomePercentage}
          taxPercent={targetData.result.effectiveTaxRate}
          grossAmount={targetData.result.cascade.biweekly.gross}
          federalTax={targetData.result.cascade.biweekly.federalTax}
          provincialTax={targetData.result.cascade.biweekly.provincialTax}
          socialContributions={
            targetData.pensionContribution +
            targetData.eiContribution +
            targetData.rqapContribution
          }
          totalDeductions={targetData.result.cascade.biweekly.totalDeductions}
          customMetrics={[
            {
              label: lang === 'pt' ? 'Líquido Anual Target:' : 'Net Annuel Cible :',
              value: formatCurrency(targetData.annualNet, locale),
              highlight: true,
            },
            {
              label: lang === 'pt' ? 'Diferença vs Origem:' : 'Différence vs Origine :',
              value: `${netDiffBiweekly >= 0 ? '+' : ''}${formatCurrency(netDiffBiweekly, locale)} / 2 sem`,
              isNegative: netDiffBiweekly < 0,
            },
            {
              label: lang === 'pt' ? 'Poder de Compra Real:' : 'Pouvoir d’Achat Réel :',
              value: `${formatCurrency(targetData.realPurchasingPower, locale)}/an`,
            },
            {
              label: lang === 'pt' ? 'Alíquota Efetiva:' : 'Taux Effectif :',
              value: `${targetData.effectiveTaxRate.toFixed(1)}%`,
            },
          ]}
          ctaTitle={
            lang === 'pt'
              ? 'Ver Comparativo Completo & Ranking'
              : lang === 'en'
              ? 'View Full Interprovincial Report'
              : 'Voir le rapport comparatif complet'
          }
          ctaSubtitle={
            lang === 'pt'
              ? 'Ranking das 13 províncias, poder de compra, deduções e cascade'
              : 'Classement des 13 provinces, pouvoir d’achat et cascade'
          }
          onViewFullResults={() => {
            setViewMode('results');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          copyTextSummary={`📊 Comparativo Salarial Canadá 2026:
Origem: ${originData.info.name[lang] || originData.info.name.fr} - Líquido: ${formatCurrency(originData.biweeklyNet, locale)} / 2 sem
Destino: ${targetData.info.name[lang] || targetData.info.name.fr} - Líquido: ${formatCurrency(targetData.biweeklyNet, locale)} / 2 sem
Diferença: ${netDiffBiweekly >= 0 ? '+' : ''}${formatCurrency(netDiffBiweekly, locale)} / 2 sem
Calculado no PaieNet Québec`}
        />
      }
    >
      {/* LEFT COLUMN: Controls & Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-6 shadow-xs">
        {/* Mode Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Modo de Entrada</label>
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setInputMode('hourly')}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                inputMode === 'hourly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.hourlyTab}
            </button>
            <button
              type="button"
              onClick={() => setInputMode('annual')}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                inputMode === 'annual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.annualTab}
            </button>
          </div>
        </div>

        {/* Primary Salary Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            {inputMode === 'hourly' ? 'Taxa Horária Bruta' : 'Salário Anual Bruto'}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
            <input
              type="number"
              step={inputMode === 'hourly' ? '0.50' : '1000'}
              min="10"
              value={inputMode === 'hourly' ? hourlyWage : annualSalaryInput}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                if (inputMode === 'hourly') {
                  setHourlyWage(val);
                  setAnnualSalaryInput(Math.round(val * weeklyHours * 52));
                } else {
                  setAnnualSalaryInput(val);
                  setHourlyWage(Math.round((val / (weeklyHours * 52)) * 100) / 100);
                }
              }}
              className="w-full pl-8 pr-16 py-3 text-xl font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none tabular-nums shadow-xs"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              {inputMode === 'hourly' ? '/h' : '/an'}
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {[20, 25, 30, 35, 45].map((presetRate) => (
              <button
                key={presetRate}
                type="button"
                onClick={() => {
                  setHourlyWage(presetRate);
                  setAnnualSalaryInput(presetRate * weeklyHours * 52);
                  setInputMode('hourly');
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                  hourlyWage === presetRate && inputMode === 'hourly'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${presetRate}/h
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Hours Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">{t.hoursLabel}</label>
          <input
            type="number"
            min="15"
            max="60"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Dual Province Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">{t.originLabel}</label>
            <select
              value={originProv}
              onChange={(e) => setOriginProv(e.target.value as CanadianProvince)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(CANADIAN_PROVINCES).map((p) => (
                <option key={`orig-${p.code}`} value={p.code}>
                  {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">{t.targetLabel}</label>
            <select
              value={targetProv}
              onChange={(e) => setTargetProv(e.target.value as CanadianProvince)}
              className="w-full bg-blue-50/60 text-blue-950 font-bold text-xs py-2.5 px-3 rounded-xl border border-blue-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(CANADIAN_PROVINCES).map((p) => (
                <option key={`target-${p.code}`} value={p.code}>
                  {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Head-to-Head Overview Cards */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Origem ({originData.info.code})
            </span>
            <span className="text-base font-extrabold text-slate-900 block tabular-nums">
              {formatCurrency(originData.biweeklyNet, locale)}
            </span>
            <span className="text-[11px] text-slate-500 block">/ quinzena</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
              Destino ({targetData.info.code})
            </span>
            <span className="text-base font-extrabold text-blue-950 block tabular-nums">
              {formatCurrency(targetData.biweeklyNet, locale)}
            </span>
            <span className="text-[11px] text-blue-700 font-bold block">
              {netDiffBiweekly >= 0 ? '+' : ''}{formatCurrency(netDiffBiweekly, locale)}
            </span>
          </div>
        </div>

        {/* Teaser prompt */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {lang === 'pt'
                ? 'Clique ao lado para ver o ranking completo das 13 províncias e a memória de cálculo.'
                : 'Cliquez à droite pour consulter le classement complet des 13 provinces et le relevé.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setViewMode('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-blue-600 hover:text-blue-800 font-bold shrink-0 cursor-pointer"
          >
            {lang === 'pt' ? 'Ver Tudo →' : 'Voir tout →'}
          </button>
        </div>
      </div>
    </CalculatorWorkspaceLayout>
  );
};
