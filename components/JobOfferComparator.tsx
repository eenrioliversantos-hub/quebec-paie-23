'use client';

import React, { useState } from 'react';
import {
  JobOfferInput,
  compareJobOffers,
  formatCurrency,
  CanadianProvince,
  CANADIAN_PROVINCES,
} from '@/lib/tax-engine';
import { Language } from '@/lib/i18n';
import {
  Scale,
  Trophy,
} from 'lucide-react';
import { CalculatorWorkspaceLayout } from '@/components/calculator-suite/CalculatorWorkspaceLayout';
import { CalculatorLivePreviewCard } from '@/components/calculator-suite/CalculatorLivePreviewCard';
import { CalculatorResultsLayout } from '@/components/calculator-suite/CalculatorResultsLayout';

interface JobOfferComparatorProps {
  lang: Language;
}

export const JobOfferComparator: React.FC<JobOfferComparatorProps> = ({ lang }) => {
  const [offerA, setOfferA] = useState<JobOfferInput>({
    title: lang === 'pt' ? 'Oferta A (Montréal, QC)' : 'Offre A (Montréal, QC)',
    province: 'QC',
    hourlyRate: 25.0,
    hoursPerWeek: 40,
    shiftPremiumPerHour: 0,
    biweeklyHealthInsurance: 0,
    employerRrspMatchPct: 0,
  });

  const [offerB, setOfferB] = useState<JobOfferInput>({
    title: lang === 'pt' ? 'Oferta B (Toronto, ON)' : 'Offre B (Toronto, ON)',
    province: 'ON',
    hourlyRate: 28.5,
    hoursPerWeek: 37.5,
    shiftPremiumPerHour: 1.5,
    biweeklyHealthInsurance: 45.0,
    employerRrspMatchPct: 3.0,
  });

  const [viewMode, setViewMode] = useState<'workspace' | 'results'>('workspace');

  const comparison = compareJobOffers(offerA, offerB);
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  const winningOffer = comparison.winner === 'B' ? offerB : offerA;
  const winningCalc = comparison.winner === 'B' ? comparison.offerB.calc : comparison.offerA.calc;
  const netDiffAnnual = Math.abs(comparison.netDifferenceAnnual ?? comparison.annualNetDiff ?? 0);
  const netDiffBiweekly = Math.abs(comparison.netDifferenceBiweekly ?? comparison.biweeklyNetDiff ?? 0);

  // Custom tool-specific section for Results View
  const toolSpecificSection = (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>
              {lang === 'pt'
                ? `Veredito Fiscal: ${winningOffer.title} Vence por ${formatCurrency(netDiffBiweekly, locale)} / quinzena`
                : `Verdict Fiscal : ${winningOffer.title} l'emporte de ${formatCurrency(netDiffBiweekly, locale)} / paie`}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'pt'
              ? `Vantagem acumulada de +${formatCurrency(netDiffAnnual, locale)} no bolso em um ano completo de trabalho.`
              : `Gain net cumulé de +${formatCurrency(netDiffAnnual, locale)} dans vos poches par année.`}
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
          {comparison.winner === 'A' ? 'Oferta A Venceu' : 'Oferta B Venceu'}
        </span>
      </div>

      {/* Side-by-side Detailed Breakdown Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Offer A */}
        <div
          className={`p-5 rounded-2xl border transition-all space-y-3 ${
            comparison.winner === 'A'
              ? 'bg-blue-50/60 border-2 border-blue-400 shadow-sm'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-sm">{offerA.title}</span>
            {comparison.winner === 'A' && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {lang === 'pt' ? 'Vencedora' : 'Gagnante'}
              </span>
            )}
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'pt' ? 'Província:' : 'Province :'}</span>
              <span className="font-bold text-slate-800">
                {CANADIAN_PROVINCES[offerA.province || 'QC'].flag} {CANADIAN_PROVINCES[offerA.province || 'QC'].name[lang] || CANADIAN_PROVINCES[offerA.province || 'QC'].name.fr}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'pt' ? 'Taxa Horária:' : 'Taux horaire :'}</span>
              <span className="font-bold text-slate-800">${offerA.hourlyRate.toFixed(2)}/h ({offerA.hoursPerWeek}h/sem)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'pt' ? 'Bruto Quinzenal:' : 'Brut quinzaine :'}</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {formatCurrency(comparison.offerA.calc.cascade.biweekly.gross, locale)}
              </span>
            </div>
            <div className="flex justify-between text-rose-500">
              <span>{lang === 'pt' ? 'Retenções Fiscais:' : 'Retenues :'}</span>
              <span className="font-semibold tabular-nums">
                -{formatCurrency(comparison.offerA.calc.cascade.biweekly.totalDeductions, locale)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
              <span className="text-slate-800">{lang === 'pt' ? 'Líquido Quinzenal:' : 'Net quinzaine :'}</span>
              <span className="text-slate-900 text-sm font-black tabular-nums">
                {formatCurrency(comparison.offerA.calc.cascade.biweekly.net, locale)}
              </span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>{lang === 'pt' ? 'Líquido Anual:' : 'Net annuel :'}</span>
              <span className="tabular-nums">{formatCurrency(comparison.offerA.calc.annualNet, locale)}</span>
            </div>
          </div>
        </div>

        {/* Offer B */}
        <div
          className={`p-5 rounded-2xl border transition-all space-y-3 ${
            comparison.winner === 'B'
              ? 'bg-emerald-50/60 border-2 border-emerald-400 shadow-sm'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-sm">{offerB.title}</span>
            {comparison.winner === 'B' && (
              <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                {lang === 'pt' ? 'Vencedora' : 'Gagnante'}
              </span>
            )}
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'pt' ? 'Província:' : 'Province :'}</span>
              <span className="font-bold text-slate-800">
                {CANADIAN_PROVINCES[offerB.province || 'ON'].flag} {CANADIAN_PROVINCES[offerB.province || 'ON'].name[lang] || CANADIAN_PROVINCES[offerB.province || 'ON'].name.fr}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'pt' ? 'Taxa Horária:' : 'Taux horaire :'}</span>
              <span className="font-bold text-slate-800">${offerB.hourlyRate.toFixed(2)}/h ({offerB.hoursPerWeek}h/sem)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'pt' ? 'Bruto Quinzenal:' : 'Brut quinzaine :'}</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {formatCurrency(comparison.offerB.calc.cascade.biweekly.gross, locale)}
              </span>
            </div>
            <div className="flex justify-between text-rose-500">
              <span>{lang === 'pt' ? 'Retenções Fiscais:' : 'Retenues :'}</span>
              <span className="font-semibold tabular-nums">
                -{formatCurrency(comparison.offerB.calc.cascade.biweekly.totalDeductions, locale)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
              <span className="text-slate-800">{lang === 'pt' ? 'Líquido Quinzenal:' : 'Net quinzaine :'}</span>
              <span className="text-slate-900 text-sm font-black tabular-nums">
                {formatCurrency(comparison.offerB.calc.cascade.biweekly.net, locale)}
              </span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>{lang === 'pt' ? 'Líquido Anual:' : 'Net annuel :'}</span>
              <span className="tabular-nums">{formatCurrency(comparison.offerB.calc.annualNet, locale)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If in Results View:
  if (viewMode === 'results') {
    return (
      <CalculatorResultsLayout
        calc={winningCalc}
        lang={lang}
        toolBadge={lang === 'pt' ? 'Comparador de Vagas' : 'Comparateur d’Emplois'}
        toolTitle={
          lang === 'pt'
            ? `Auditoria Salarial: ${winningOffer.title} (Oferta Vencedora)`
            : `Audit Salarial : ${winningOffer.title} (Offre Gagnante)`
        }
        customHeroNote={
          lang === 'pt'
            ? `A proposta ${winningOffer.title} entrega ${formatCurrency(winningCalc?.cascade?.biweekly?.net ?? 0, locale)} / quinzena (+${formatCurrency(netDiffBiweekly, locale)} a mais no bolso em relação à outra oferta).`
            : `L'offre ${winningOffer.title} génère ${formatCurrency(winningCalc?.cascade?.biweekly?.net ?? 0, locale)} / deux semaines (+${formatCurrency(netDiffBiweekly, locale)} net de plus).`
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
      icon={Scale}
      iconColorClass="text-violet-600 bg-violet-50 border-violet-200"
      categoryKicker={
        lang === 'pt'
          ? 'Comparador de Remuneração Real (Multi-Províncias)'
          : 'Comparateur d’offres d’emploi (Multi-Provinces)'
      }
      title={
        lang === 'pt'
          ? 'Comparar 2 Propostas de Emprego (Oferta A vs B)'
          : 'Comparer 2 offres d’emploi (Offre A vs B)'
      }
      description={
        lang === 'pt'
          ? 'Nem sempre o maior valor bruto por hora resulta em mais dinheiro no bolso. Compare taxas horárias, províncias diferentes, adicionais de turno e benefícios.'
          : 'Un taux horaire brut plus élevé ne donne pas toujours plus de net. Comparez taux, provinces, primes et avantages pour voir la gagnante.'
      }
      jurisdictionLabel="Canada 2026"
      previewCard={
        <CalculatorLivePreviewCard
          lang={lang}
          heroTitle={
            lang === 'pt'
              ? `Vantagem da ${winningOffer.title}`
              : `Avantage de ${winningOffer.title}`
          }
          heroAmount={winningCalc?.cascade?.biweekly?.net ?? 0}
          heroPeriodLabel={lang === 'pt' ? 'quinzena' : 'quinzaine'}
          heroSubtext={`+${formatCurrency(netDiffBiweekly, locale)} a mais que a outra oferta`}
          effectiveHourlyNet={winningCalc?.effectiveHourlyRateNet ?? 0}
          retentionPercent={winningCalc?.takeHomePercentage ?? 0}
          taxPercent={winningCalc?.effectiveTaxRate ?? 0}
          grossAmount={winningCalc?.cascade?.biweekly?.gross ?? 0}
          federalTax={winningCalc?.cascade?.biweekly?.federalTax ?? 0}
          provincialTax={winningCalc?.cascade?.biweekly?.provincialTax ?? 0}
          totalDeductions={winningCalc?.cascade?.biweekly?.totalDeductions ?? 0}
          customMetrics={[
            {
              label: lang === 'pt' ? 'Vencedora Real no Bolso:' : 'Offre Gagnante :',
              value: winningOffer.title,
              highlight: true,
            },
            {
              label: lang === 'pt' ? 'Diferença Líquida por Quinzena:' : 'Écart net par paie :',
              value: `+${formatCurrency(netDiffBiweekly, locale)}`,
            },
            {
              label: lang === 'pt' ? 'Vantagem Líquida Anual:' : 'Avantage net annuel :',
              value: `+${formatCurrency(netDiffAnnual, locale)}`,
            },
          ]}
          onViewFullResults={() => {
            setViewMode('results');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          ctaTitle={
            lang === 'pt'
              ? 'Ver Auditoria Completa das 2 Vagas'
              : 'Voir l’audit complet des 2 offres'
          }
          ctaSubtitle={
            lang === 'pt'
              ? 'Comparativo lado a lado, holerite e cascata em 6 ciclos'
              : 'Comparatif côte à côte, relevé officiel et cascade'
          }
        />
      }
    >
      {/* Left Column Controls */}
      <div className="space-y-5">
        {/* Offer A Form Card */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-extrabold text-blue-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>{offerA.title}</span>
            </span>
            <select
              value={offerA.province || 'QC'}
              onChange={(e) => setOfferA({ ...offerA, province: e.target.value as CanadianProvince })}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
            >
              {Object.values(CANADIAN_PROVINCES).map((p) => (
                <option key={p.code} value={p.code}>
                  {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {lang === 'pt' ? 'Taxa Horária ($/h)' : 'Taux horaire ($/h)'}
              </label>
              <input
                type="number"
                step="0.25"
                value={offerA.hourlyRate}
                onChange={(e) => setOfferA({ ...offerA, hourlyRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {lang === 'pt' ? 'Horas / Semana' : 'Heures / semaine'}
              </label>
              <input
                type="number"
                step="0.5"
                value={offerA.hoursPerWeek}
                onChange={(e) => setOfferA({ ...offerA, hoursPerWeek: parseFloat(e.target.value) || 40 })}
                className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Offer B Form Card */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-extrabold text-emerald-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>{offerB.title}</span>
            </span>
            <select
              value={offerB.province || 'ON'}
              onChange={(e) => setOfferB({ ...offerB, province: e.target.value as CanadianProvince })}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
            >
              {Object.values(CANADIAN_PROVINCES).map((p) => (
                <option key={p.code} value={p.code}>
                  {p.flag} {p.name[lang] || p.name.fr} ({p.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {lang === 'pt' ? 'Taxa Horária ($/h)' : 'Taux horaire ($/h)'}
              </label>
              <input
                type="number"
                step="0.25"
                value={offerB.hourlyRate}
                onChange={(e) => setOfferB({ ...offerB, hourlyRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {lang === 'pt' ? 'Horas / Semana' : 'Heures / semaine'}
              </label>
              <input
                type="number"
                step="0.5"
                value={offerB.hoursPerWeek}
                onChange={(e) => setOfferB({ ...offerB, hoursPerWeek: parseFloat(e.target.value) || 40 })}
                className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </CalculatorWorkspaceLayout>
  );
};
