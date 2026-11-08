'use client';

import React, { useState, useMemo } from 'react';
import {
  formatCurrency,
  calculateQuebecPay,
  CanadianProvince,
  CANADIAN_PROVINCES,
} from '@/lib/tax-engine';
import { Language } from '@/lib/i18n';
import {
  Timer,
  Flame,
  Clock,
  DollarSign,
  ShieldCheck,
  MapPin,
  Scale,
  Sparkles,
} from 'lucide-react';
import { CalculatorWorkspaceLayout } from '@/components/calculator-suite/CalculatorWorkspaceLayout';
import { CalculatorLivePreviewCard } from '@/components/calculator-suite/CalculatorLivePreviewCard';
import { CalculatorResultsLayout } from '@/components/calculator-suite/CalculatorResultsLayout';

interface OvertimeCalculatorProps {
  lang: Language;
}

export const OvertimeCalculator: React.FC<OvertimeCalculatorProps> = ({ lang }) => {
  const [hourlyRate, setHourlyRate] = useState<number>(25.0);
  const [regularHours, setRegularHours] = useState<number>(40);
  const [ot15Hours, setOt15Hours] = useState<number>(5);
  const [ot20Hours, setOt20Hours] = useState<number>(0);
  const [province, setProvince] = useState<CanadianProvince>('QC');
  const [viewMode, setViewMode] = useState<'workspace' | 'results'>('workspace');

  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';
  const currentProvinceInfo = CANADIAN_PROVINCES[province] || CANADIAN_PROVINCES.QC;

  // Base Pay without overtime
  const baseCalc = useMemo(() => {
    return calculateQuebecPay({
      province,
      entryMode: 'hourly',
      hourlyRate,
      regularHoursPerWeek: regularHours,
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
  }, [province, hourlyRate, regularHours]);

  // With Overtime
  const withOtCalc = useMemo(() => {
    return calculateQuebecPay({
      province,
      entryMode: 'hourly',
      hourlyRate,
      regularHoursPerWeek: regularHours,
      overtime15HoursPerWeek: ot15Hours,
      overtime20HoursPerWeek: ot20Hours,
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
  }, [province, hourlyRate, regularHours, ot15Hours, ot20Hours]);

  // Bi-weekly overtime impact
  const biweeklyGrossDiff = withOtCalc.cascade.biweekly.gross - baseCalc.cascade.biweekly.gross;
  const biweeklyNetDiff = withOtCalc.cascade.biweekly.net - baseCalc.cascade.biweekly.net;
  const biweeklyTaxDiff = Math.max(0, biweeklyGrossDiff - biweeklyNetDiff);
  const totalOtHoursBiweekly = (ot15Hours + ot20Hours) * 2;
  const netPerHourOfOt = totalOtHoursBiweekly > 0 ? biweeklyNetDiff / totalOtHoursBiweekly : 0;
  const otRetentionRatio =
    biweeklyGrossDiff > 0 ? (biweeklyNetDiff / biweeklyGrossDiff) * 100 : 70;
  const otTaxRatio =
    biweeklyGrossDiff > 0 ? (biweeklyTaxDiff / biweeklyGrossDiff) * 100 : 30;

  const ot15Rate = hourlyRate * 1.5;
  const ot20Rate = hourlyRate * 2.0;

  // Custom tool-specific section for Results View
  const toolSpecificSection = (
    <div className="space-y-6">
      {/* 1. Comparative Overtime Audit Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              <span>
                {lang === 'pt'
                  ? 'Auditoria de Impacto das Horas Extras: Contracheque Base vs Com Extras'
                  : 'Impact des Heures Supplémentaires : Paie de Base vs Avec Extras'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'pt'
                ? `Simulação baseada em ${regularHours}h normais + ${totalOtHoursBiweekly}h extras por quinzena (${ot15Hours * 2}h a 1.5×, ${ot20Hours * 2}h a 2.0×).`
                : `Basé sur ${regularHours}h régulières + ${totalOtHoursBiweekly}h supplémentaires par paie aux deux semaines.`}
            </p>
          </div>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full self-start sm:self-auto">
            CNESST Art. 55
          </span>
        </div>

        {/* Head-to-Head Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Base Pay */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'pt' ? '1. Sem Horas Extras (Base)' : '1. Sans Heures Sup (Base)'}
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'pt' ? 'Bruto Quinzenal:' : 'Brut :'}</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  {formatCurrency(baseCalc.cascade.biweekly.gross, locale)}
                </span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>{lang === 'pt' ? 'Impostos & Deduções:' : 'Retenues :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(baseCalc.cascade.biweekly.totalDeductions, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
                <span className="text-slate-800">{lang === 'pt' ? 'Líquido no Bolso:' : 'Net en poche :'}</span>
                <span className="text-slate-900 text-sm tabular-nums">
                  {formatCurrency(baseCalc.cascade.biweekly.net, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* Overtime Slice Only */}
          <div className="p-4 rounded-xl bg-amber-50/70 border-2 border-amber-300 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                {lang === 'pt' ? '2. Apenas a Parcela Extra' : '2. Portion Heures Sup'}
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                {totalOtHoursBiweekly}h
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-amber-800">{lang === 'pt' ? 'Bruto Gerado:' : 'Brut généré :'}</span>
                <span className="font-extrabold text-amber-950 tabular-nums">
                  +{formatCurrency(biweeklyGrossDiff, locale)}
                </span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>{lang === 'pt' ? 'Impostos Retidos:' : 'Impôts retenus :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(biweeklyTaxDiff, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-amber-200 flex justify-between font-bold">
                <span className="text-amber-950">{lang === 'pt' ? 'Ganho Líquido no Bolso:' : 'Net additionnel :'}</span>
                <span className="text-emerald-700 text-base font-black tabular-nums">
                  +{formatCurrency(biweeklyNetDiff, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* Total Combined */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
              {lang === 'pt' ? '3. Contracheque Total (Com Extras)' : '3. Total Avec Heures Sup'}
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-800">{lang === 'pt' ? 'Novo Bruto Quinzenal:' : 'Nouveau brut :'}</span>
                <span className="font-bold text-emerald-950 tabular-nums">
                  {formatCurrency(withOtCalc.cascade.biweekly.gross, locale)}
                </span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>{lang === 'pt' ? 'Total Retido na Fonte:' : 'Total retenu :'}</span>
                <span className="font-semibold tabular-nums">
                  -{formatCurrency(withOtCalc.cascade.biweekly.totalDeductions, locale)}
                </span>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold">
                <span className="text-emerald-950">{lang === 'pt' ? 'Total Líquido Recebido:' : 'Nouveau net :'}</span>
                <span className="text-emerald-700 text-base font-black tabular-nums">
                  {formatCurrency(withOtCalc.cascade.biweekly.net, locale)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Real Take-Home Reality Check */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Scale className="w-4 h-4" />
            <span>
              {lang === 'pt' ? 'Valor Líquido Real por Hora Extra Trabalhada' : 'Valeur Nette par Heure Supplémentaire'}
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatCurrency(netPerHourOfOt, locale)} <span className="text-xs font-normal text-slate-500">/ hora líquida</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'pt'
              ? `Mesmo com a taxa nominal de 1.5× ($${ot15Rate.toFixed(2)}/h bruta), após impostos marginais você recebe efetivamente ${formatCurrency(netPerHourOfOt, locale)} limpos em dinheiro no bolso para cada hora extra.`
              : `Même à taux 1,5× (${ot15Rate.toFixed(2)}$/h brut), après retenues fiscales effectives vous recevez concrètement ${formatCurrency(netPerHourOfOt, locale)} net par heure supplémentaire travaillée.`}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {lang === 'pt' ? 'Legislação CNESST (Normas do Trabalho do Québec)' : 'Normes du travail CNESST'}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'pt'
              ? 'No Québec, horas trabalhadas acima de 40h semanais devem ser pagas com adicional de 50% (tempo e meio = 1.5×), exceto em regime de horário estendido autorizado ou acordos sindicais com banco de horas.'
              : 'Au Québec, toute heure travaillée au-delà de 40 heures par semaine doit être majorée d’au moins 50 % (taux et demi), sauf conventions particulières ou ententes de modulation d’horaire.'}
          </p>
        </div>
      </div>
    </div>
  );

  // If in Results View:
  if (viewMode === 'results') {
    return (
      <CalculatorResultsLayout
        calc={withOtCalc}
        lang={lang}
        toolBadge={lang === 'pt' ? 'Horas Extras CNESST' : 'Heures Supplémentaires'}
        toolTitle={
          lang === 'pt'
            ? 'Demonstrativo Oficial com Horas Extras (1.5× & 2.0×)'
            : 'Relevé de Paie avec Heures Supplémentaires'
        }
        customHeroNote={
          lang === 'pt'
            ? `Seu contracheque total com as ${totalOtHoursBiweekly}h extras atinge ${formatCurrency(withOtCalc.cascade.biweekly.net, locale)} / quinzena (+${formatCurrency(biweeklyNetDiff, locale)} líquidos adicionais).`
            : `Votre paie totale incluant les ${totalOtHoursBiweekly}h supplémentaires atteint ${formatCurrency(withOtCalc.cascade.biweekly.net, locale)} / 2 semaines (+${formatCurrency(biweeklyNetDiff, locale)} net additionnel).`
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
      icon={Timer}
      iconColorClass="text-amber-600 bg-amber-50 border-amber-200"
      categoryKicker={
        lang === 'pt'
          ? 'Normas do Trabalho & Overtime CNESST'
          : lang === 'en'
          ? 'CNESST Overtime Standards'
          : 'Normes CNESST & Heures supplémentaires'
      }
      title={
        lang === 'pt'
          ? 'Calculadora de Horas Extras: Tempo e Meio (1.5×) e Dobro (2.0×)'
          : lang === 'en'
          ? 'Overtime Pay Calculator: Time-and-a-half (1.5×) & Double (2.0×)'
          : 'Calculateur d’Heures Supplémentaires : Majoration 1,5× et 2,0×'
      }
      description={
        lang === 'pt'
          ? 'Descubra quanto dinheiro líquido realmente sobra no seu bolso após impostos federais e provinciais para cada hora extra trabalhada.'
          : 'Calculez le montant net réel qui entre dans vos poches après impôt provincial et fédéral pour chaque heure supplémentaire travaillée.'
      }
      jurisdictionLabel={`${currentProvinceInfo.flag} ${currentProvinceInfo.name[lang] || currentProvinceInfo.name.fr} 2026`}
      previewCard={
        <CalculatorLivePreviewCard
          lang={lang}
          heroTitle={
            lang === 'pt'
              ? 'Ganho Líquido Extra no Bolso'
              : lang === 'en'
              ? 'Net Extra Overtime Take-Home'
              : 'Gain net heures sup dans vos poches'
          }
          heroAmount={biweeklyNetDiff}
          heroPeriodLabel={lang === 'pt' ? 'quinzena' : 'deux semaines'}
          heroSubtext={`= ${formatCurrency(netPerHourOfOt, locale)}/h líquida limpa`}
          effectiveHourlyNet={withOtCalc.effectiveHourlyRateNet}
          retentionPercent={otRetentionRatio}
          taxPercent={otTaxRatio}
          grossAmount={biweeklyGrossDiff}
          federalTax={withOtCalc.cascade.biweekly.federalTax - baseCalc.cascade.biweekly.federalTax}
          provincialTax={withOtCalc.cascade.biweekly.provincialTax - baseCalc.cascade.biweekly.provincialTax}
          totalDeductions={biweeklyTaxDiff}
          customMetrics={[
            {
              label: lang === 'pt' ? 'Contracheque Total com Extras:' : 'Paie Totale Avec Extras :',
              value: formatCurrency(withOtCalc.cascade.biweekly.net, locale),
              highlight: true,
            },
            {
              label: lang === 'pt' ? 'Salário Sem Extras (Base):' : 'Paie de Base Sans Extras :',
              value: formatCurrency(baseCalc.cascade.biweekly.net, locale),
            },
            {
              label: lang === 'pt' ? 'Total Horas Extras no Período:' : 'Heures Sup sur la Paie :',
              value: `${totalOtHoursBiweekly}h extras`,
            },
          ]}
          ctaTitle={
            lang === 'pt'
              ? 'Ver Resultado Completo & Demonstrativo'
              : lang === 'en'
              ? 'View Full Results & Paystub'
              : 'Voir le résultat complet & relevé'
          }
          ctaSubtitle={
            lang === 'pt'
              ? 'Auditoria completa, alíquotas marginais e tabela em cascata'
              : 'Audit complet, impôt marginal et cascade sur 6 cycles'
          }
          onViewFullResults={() => {
            setViewMode('results');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      }
    >
      {/* LEFT COLUMN: Controls & Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-6 shadow-xs">
        {/* Hourly Base Rate */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
            <span>{lang === 'pt' ? 'Sua Taxa Horária Base Normal:' : 'Taux horaire de base :'}</span>
            <span className="text-amber-700 font-bold">
              1.5× = ${ot15Rate.toFixed(2)}/h · 2.0× = ${ot20Rate.toFixed(2)}/h
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
            <input
              type="number"
              step="0.25"
              min="10"
              value={hourlyRate || ''}
              onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
              className="w-full pl-8 pr-16 py-3 text-xl font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none tabular-nums shadow-xs"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">/ h</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {[20, 25, 30, 35, 42].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setHourlyRate(val)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                  hourlyRate === val
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${val.toFixed(2)}/h
              </button>
            ))}
          </div>
        </div>

        {/* Regular Normal Hours */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'pt' ? 'Horas Normais por Semana:' : 'Heures normales par semaine :'}</span>
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={regularHours || ''}
            onChange={(e) => setRegularHours(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Overtime Sliders & Inputs */}
        <div className="pt-2 border-t border-slate-100 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{lang === 'pt' ? 'Horas a 1.5× (Tempo e Meio) por Semana:' : 'Heures à 1,5× par semaine :'}</span>
              </label>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                ${ot15Rate.toFixed(2)}/h bruta
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={ot15Hours}
                onChange={(e) => setOt15Hours(parseFloat(e.target.value) || 0)}
                className="flex-1 accent-amber-600 cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                value={ot15Hours}
                onChange={(e) => setOt15Hours(parseFloat(e.target.value) || 0)}
                className="w-20 px-2.5 py-1.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg text-center"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>{lang === 'pt' ? 'Horas a 2.0× (Dobro / Feriados) por Semana:' : 'Heures à 2,0× par semaine :'}</span>
              </label>
              <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                ${ot20Rate.toFixed(2)}/h bruta
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={ot20Hours}
                onChange={(e) => setOt20Hours(parseFloat(e.target.value) || 0)}
                className="flex-1 accent-rose-600 cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max="25"
                step="0.5"
                value={ot20Hours}
                onChange={(e) => setOt20Hours(parseFloat(e.target.value) || 0)}
                className="w-20 px-2.5 py-1.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg text-center"
              />
            </div>
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
            className="w-full bg-slate-50 text-slate-900 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {Object.values(CANADIAN_PROVINCES).map((p) => (
              <option key={p.code} value={p.code}>
                {p.flag} {p.name[lang] || p.name.fr} ({p.code})
              </option>
            ))}
          </select>
        </div>

        {/* Live Overtime Summary Cards */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'pt' ? 'Bruto Adicional' : 'Brut Additionnel'}
            </span>
            <span className="text-base font-extrabold text-slate-900 block tabular-nums">
              +{formatCurrency(biweeklyGrossDiff, locale)}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {totalOtHoursBiweekly}h extras / quinzena
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              {lang === 'pt' ? 'Líquido Extra no Bolso' : 'Net Extra en Poche'}
            </span>
            <span className="text-base font-extrabold text-amber-950 block tabular-nums">
              +{formatCurrency(biweeklyNetDiff, locale)}
            </span>
            <span className="text-[11px] text-amber-700 font-bold block">
              {formatCurrency(netPerHourOfOt, locale)}/h líquida
            </span>
          </div>
        </div>

        {/* Teaser prompt */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {lang === 'pt'
                ? 'Clique ao lado para ver a auditoria completa de retenções e o holerite oficial.'
                : 'Cliquez à droite pour consulter l’audit fiscal complet et le relevé officiel.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setViewMode('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-amber-700 hover:text-amber-800 font-bold shrink-0 cursor-pointer"
          >
            {lang === 'pt' ? 'Ver Tudo →' : 'Voir tout →'}
          </button>
        </div>
      </div>
    </CalculatorWorkspaceLayout>
  );
};
