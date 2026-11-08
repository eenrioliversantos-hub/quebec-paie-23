'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/i18n';
import { CalculationResult, formatCurrency } from '@/lib/tax-engine';
import { DeductionsBreakdown } from '@/components/DeductionsBreakdown';
import { CascadeTable } from '@/components/CascadeTable';
import {
  ArrowLeft,
  Share2,
  Printer,
  Check,
  Sparkles,
} from 'lucide-react';

interface CalculatorResultsLayoutProps {
  calc: CalculationResult;
  lang: Language;
  toolBadge: string;
  toolTitle: string;
  onBackToWorkspace: () => void;
  // Custom tool-specific deep dive section
  toolSpecificSection?: React.ReactNode;
  // Optional custom hero metrics override
  customHeroNote?: string;
  onOpenScenarios?: () => void;
}

export const CalculatorResultsLayout: React.FC<CalculatorResultsLayoutProps> = ({
  calc,
  lang,
  toolBadge,
  toolTitle,
  onBackToWorkspace,
  toolSpecificSection,
  customHeroNote,
  onOpenScenarios: _onOpenScenarios,
}) => {
  const [copied, setCopied] = useState(false);
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const text = `📊 ${toolTitle} - PaieNet Québec 2026
Líquido: ${formatCurrency(calc.selectedPeriod.net, locale)} (${calc.selectedPeriod.label})
Líquido/Hora: ${formatCurrency(calc.effectiveHourlyRateNet, locale)}/h
Bruto: ${formatCurrency(calc.selectedPeriod.gross, locale)}
Retenções: ${formatCurrency(calc.selectedPeriod.totalDeductions, locale)} (${calc.effectiveTaxRate.toFixed(1)}%)
Província: ${calc.provinceInfo.flag} ${calc.provinceInfo.name[lang] || calc.provinceInfo.name.fr}
Calculado no PaieNet Québec 2026`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Action Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={onBackToWorkspace}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs sm:text-sm font-bold border border-slate-200 hover:border-blue-200 transition-all cursor-pointer group active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>
            {lang === 'pt'
              ? '← Voltar à Área de Preenchimento / Simulação'
              : lang === 'en'
              ? '← Back to Input Workspace'
              : '← Retour à l’espace de saisie'}
          </span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              {lang === 'pt' ? 'Dossiê' : 'Dossier'}:
            </span>
            <span className="text-blue-700 font-bold">{toolBadge}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">
                  {lang === 'pt' ? 'Copiado!' : lang === 'en' ? 'Copied!' : 'Copié !'}
                </span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>{lang === 'pt' ? 'Compartilhar' : lang === 'en' ? 'Share' : 'Partager'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{lang === 'pt' ? 'Imprimir / PDF' : lang === 'en' ? 'Print / PDF' : 'Imprimer'}</span>
          </button>
        </div>
      </div>

      {/* 2. Master Results Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl border border-slate-800 shadow-md p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{toolTitle}</span>
              <span className="text-slate-500">·</span>
              <span className="text-white">
                {calc.provinceInfo.flag} {calc.provinceInfo.name[lang] || calc.provinceInfo.name.fr} 2026
              </span>
            </div>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 tracking-tight tabular-nums">
              {formatCurrency(calc.selectedPeriod.net, locale)}
              <span className="text-lg sm:text-xl font-normal text-slate-300 ml-2">
                / {calc.selectedPeriod.label.toLowerCase()}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {customHeroNote ||
                (lang === 'pt'
                  ? `Seu rendimento líquido oficial após impostos provinciais e federais, com taxa efetiva de ${calc.effectiveTaxRate.toFixed(1)}%.`
                  : `Votre revenu net officiel après retenues d'impôt avec un taux effectif de ${calc.effectiveTaxRate.toFixed(1)} %.`)}
            </p>
          </div>

          {/* Quick Metrics Cluster */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                {lang === 'pt' ? 'Líquido / Hora' : 'Net / Heure'}
              </span>
              <span className="text-sm sm:text-base font-black text-emerald-400 tabular-nums">
                {formatCurrency(calc.effectiveHourlyRateNet, locale)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                {lang === 'pt' ? 'Líquido / Ano' : 'Net / An'}
              </span>
              <span className="text-sm sm:text-base font-black text-white tabular-nums">
                {formatCurrency(calc.annualNet, locale)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                {lang === 'pt' ? 'Taxa Efetiva' : 'Taux effectif'}
              </span>
              <span className="text-sm sm:text-base font-black text-rose-300 tabular-nums">
                {calc.effectiveTaxRate.toFixed(1)}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                {lang === 'pt' ? 'Retenção' : 'Vous gardez'}
              </span>
              <span className="text-sm sm:text-base font-black text-emerald-300 tabular-nums">
                {calc.takeHomePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tool-Specific Custom Deep-Dive Section */}
      {toolSpecificSection && (
        <div className="space-y-6">
          {toolSpecificSection}
        </div>
      )}

      {/* 4. Complete Deductions Breakdown */}
      <div className="space-y-2">
        <DeductionsBreakdown calc={calc} lang={lang} />
      </div>

      {/* 5. Complete 6-Cycle Official Cascade Table */}
      <div className="space-y-2">
        <CascadeTable calc={calc} lang={lang} />
      </div>
    </div>
  );
};
