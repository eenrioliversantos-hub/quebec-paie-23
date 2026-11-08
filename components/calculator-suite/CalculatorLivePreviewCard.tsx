'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/i18n';
import { formatCurrency, PayFrequency } from '@/lib/tax-engine';
import {
  FileText,
  ArrowRight,
  Share2,
  Check,
  ShieldCheck,
} from 'lucide-react';

export interface SummaryMetricItem {
  label: string;
  value: string;
  isNegative?: boolean;
  highlight?: boolean;
  note?: string;
}

interface CalculatorLivePreviewCardProps {
  lang: Language;
  heroTitle: string;
  heroAmount: number;
  heroPeriodLabel?: string;
  heroSubtext?: string;
  effectiveHourlyNet?: number;
  // Visual retention gauge
  retentionPercent?: number; // e.g. 72.5%
  taxPercent?: number; // e.g. 27.5%
  // Summary items
  grossAmount?: number;
  federalTax?: number;
  provincialTax?: number;
  socialContributions?: number; // RRQ + RQAP + AE
  totalDeductions?: number;
  customMetrics?: SummaryMetricItem[];
  // Interactive period switcher
  currentFrequency?: PayFrequency;
  onFrequencyChange?: (freq: PayFrequency) => void;
  // Primary CTA action
  onViewFullResults: () => void;
  ctaTitle?: string;
  ctaSubtitle?: string;
  // Text for summary copy
  copyTextSummary?: string;
  trustBadgeText?: string;
}

export const CalculatorLivePreviewCard: React.FC<CalculatorLivePreviewCardProps> = ({
  lang,
  heroTitle,
  heroAmount,
  heroPeriodLabel,
  heroSubtext,
  effectiveHourlyNet,
  retentionPercent = 70,
  taxPercent = 30,
  grossAmount,
  federalTax,
  provincialTax,
  socialContributions,
  totalDeductions,
  customMetrics,
  currentFrequency,
  onFrequencyChange,
  onViewFullResults,
  ctaTitle,
  ctaSubtitle,
  copyTextSummary,
  trustBadgeText,
}) => {
  const [copied, setCopied] = useState(false);
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';

  const frequencies: { id: PayFrequency; label: string }[] = [
    {
      id: 'biweekly',
      label: lang === 'pt' ? 'Quinzena' : lang === 'en' ? 'Bi-weekly' : 'Aux 2 sem.',
    },
    {
      id: 'monthly',
      label: lang === 'pt' ? 'Mês' : lang === 'en' ? 'Monthly' : 'Mois',
    },
    {
      id: 'annually',
      label: lang === 'pt' ? 'Ano' : lang === 'en' ? 'Annual' : 'Année',
    },
    {
      id: 'weekly',
      label: lang === 'pt' ? 'Semana' : lang === 'en' ? 'Weekly' : 'Semaine',
    },
  ];

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const textToCopy =
        copyTextSummary ||
        `${heroTitle}: ${formatCurrency(heroAmount, locale)} ${heroPeriodLabel ? `(${heroPeriodLabel})` : ''}\nCalculado no PaieNet Québec 2026`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resolvedCtaTitle =
    ctaTitle ||
    (lang === 'pt'
      ? 'Ver Resultado Completo & Demonstrativo'
      : lang === 'en'
      ? 'View Full Results & Paystub'
      : 'Voir le résultat complet & relevé');

  const resolvedCtaSubtitle =
    ctaSubtitle ||
    (lang === 'pt'
      ? 'Tabela em cascata em 6 ciclos, holerite e regras fiscais'
      : lang === 'en'
      ? 'Cascade across 6 pay cycles, tax deductions & breakdown'
      : 'Cascade sur 6 cycles, fiche imprimable et déductions');

  return (
    <div className="bg-slate-50/60 p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
      {/* 1. Status Indicator & Trust Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {lang === 'pt' ? 'Cálculo Oficial em Tempo Real' : lang === 'en' ? 'Live Official Calculation' : 'Calcul officiel en temps réel'}
            </span>
          </span>

          <span className="text-slate-500 font-mono text-[11px]">
            2025/2026
          </span>
        </div>

        {/* 2. Hero Net Display Card (Clean Executive Card) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {heroTitle}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
              {lang === 'pt' ? 'Líquido Estimado' : 'Net Estimé'}
            </span>
          </div>

          {/* Master Currency Amount */}
          <div>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums">
              {formatCurrency(heroAmount, locale)}
            </div>

            {/* Subtext and Hourly rate */}
            <div className="text-xs sm:text-sm text-slate-500 mt-2 flex flex-wrap items-center gap-2">
              {heroPeriodLabel && (
                <span className="font-semibold text-slate-700">/ {heroPeriodLabel.toLowerCase()}</span>
              )}
              {effectiveHourlyNet !== undefined && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-emerald-700 font-bold tabular-nums">
                    {formatCurrency(effectiveHourlyNet, locale)}/h {lang === 'pt' ? 'líquido' : 'net'}
                  </span>
                </>
              )}
              {heroSubtext && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-600 font-medium">{heroSubtext}</span>
                </>
              )}
            </div>
          </div>

          {/* Interactive Period Switcher Pills (If enabled) */}
          {onFrequencyChange && (
            <div className="pt-3 border-t border-slate-100">
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100/90 rounded-xl text-center">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => onFrequencyChange(freq.id)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer truncate ${
                      currentFrequency === freq.id
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Retention Progress Gauge & Breakdown Ledger */}
      <div className="space-y-4">
        {/* Visual Retention Bar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
            <span>
              {lang === 'pt' ? 'Você recebe (Líquido)' : 'Vous gardez (Net)'}:{' '}
              <strong className="text-emerald-700 font-bold tabular-nums">
                {retentionPercent.toFixed(1)}%
              </strong>
            </span>
            <span>
              {lang === 'pt' ? 'Retenções Fiscais' : 'Retenues'}:{' '}
              <strong className="text-rose-600 font-bold tabular-nums">
                {taxPercent.toFixed(1)}%
              </strong>
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex gap-0.5 border border-slate-200/40">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 rounded-l-full"
              style={{ width: `${Math.min(100, Math.max(0, retentionPercent))}%` }}
            />
            <div
              className="bg-rose-500/80 h-full transition-all duration-300 rounded-r-full"
              style={{ width: `${Math.min(100, Math.max(0, taxPercent))}%` }}
            />
          </div>
        </div>

        {/* Compact Ledger Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 text-xs sm:text-sm">
          {grossAmount !== undefined && (
            <div className="flex items-center justify-between text-slate-600">
              <span>{lang === 'pt' ? 'Salário Bruto:' : 'Salaire brut :'}</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatCurrency(grossAmount, locale)}
              </span>
            </div>
          )}

          {federalTax !== undefined && (
            <div className="flex items-center justify-between text-slate-500">
              <span>{lang === 'pt' ? 'Imposto Federal (ARC):' : 'Impôt Fédéral (ARC) :'}</span>
              <span className="font-semibold text-slate-700 tabular-nums">
                -{formatCurrency(federalTax, locale)}
              </span>
            </div>
          )}

          {provincialTax !== undefined && (
            <div className="flex items-center justify-between text-slate-500">
              <span>{lang === 'pt' ? 'Imposto Provincial:' : 'Impôt Provincial :'}</span>
              <span className="font-semibold text-slate-700 tabular-nums">
                -{formatCurrency(provincialTax, locale)}
              </span>
            </div>
          )}

          {socialContributions !== undefined && (
            <div className="flex items-center justify-between text-slate-500">
              <span>{lang === 'pt' ? 'Previdência & Seguros (RRQ/CPP/AE):' : 'Cotisations (RRQ/RPC/AE) :'}</span>
              <span className="font-semibold text-slate-700 tabular-nums">
                -{formatCurrency(socialContributions, locale)}
              </span>
            </div>
          )}

          {totalDeductions !== undefined && (
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between font-bold text-slate-900">
              <span className="text-slate-700">{lang === 'pt' ? 'Total Retido na Fonte:' : 'Total retenu :'}</span>
              <span className="text-rose-600 tabular-nums">
                -{formatCurrency(totalDeductions, locale)}
              </span>
            </div>
          )}

          {/* Custom Metrics */}
          {customMetrics && customMetrics.length > 0 && (
            <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
              {customMetrics.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className={item.highlight ? 'text-amber-800 font-bold' : 'text-slate-600'}>
                    {item.label}
                  </span>
                  <span
                    className={`font-bold tabular-nums ${
                      item.highlight
                        ? 'text-amber-700 text-sm'
                        : item.isNegative
                        ? 'text-rose-600'
                        : 'text-slate-900'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. High-Converting Action Center CTA */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={onViewFullResults}
          className="w-full py-4 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-between shadow-sm hover:shadow transition-all cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 text-left">
            <FileText className="w-5 h-5 text-blue-100 group-hover:scale-110 transition-transform shrink-0" />
            <div>
              <span className="block font-bold">{resolvedCtaTitle}</span>
              <span className="text-[11px] text-blue-100 font-normal hidden sm:block">
                {resolvedCtaSubtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white group-hover:bg-white/30 transition-colors">
            <span>{lang === 'pt' ? 'Abrir' : lang === 'en' ? 'Open' : 'Ouvrir'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Quick Share / Copy Helper */}
        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">
                  {lang === 'pt' ? 'Copiado!' : lang === 'en' ? 'Copied!' : 'Copié !'}
                </span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {lang === 'pt' ? 'Copiar Resumo Salarial' : lang === 'en' ? 'Copy Summary' : 'Copier le résumé'}
                </span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{trustBadgeText || (lang === 'pt' ? 'Normas Oficiais 2026' : 'Normes officielles 2026')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
