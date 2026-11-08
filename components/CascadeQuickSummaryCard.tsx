'use client';

import React, { useState } from 'react';
import { CalculationResult, formatCurrency } from '@/lib/tax-engine';
import { Language } from '@/lib/i18n';
import {
  TableProperties,
  Star,
  ArrowRight,
  Copy,
  Check,
  TrendingDown,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface CascadeQuickSummaryCardProps {
  calc: CalculationResult;
  lang: Language;
  onViewFullResults?: () => void;
}

export const CascadeQuickSummaryCard: React.FC<CascadeQuickSummaryCardProps> = ({
  calc,
  lang,
  onViewFullResults,
}) => {
  const [copied, setCopied] = useState(false);
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-CA' : 'fr-CA';
  const { cascade } = calc;

  const rows = [
    {
      key: 'hourly',
      label: lang === 'pt' ? 'Por Hora' : lang === 'en' ? 'Hourly' : 'Par Heure',
      badge: '1h',
      period: cascade.hourly,
      isHighlight: false,
    },
    {
      key: 'biweekly',
      label: lang === 'pt' ? 'Quinzena' : lang === 'en' ? 'Bi-weekly' : 'Aux 2 sem.',
      sublabel: lang === 'pt' ? 'Padrão QC ⭐' : lang === 'en' ? 'QC Standard ⭐' : 'Norme QC ⭐',
      badge: '80h',
      period: cascade.biweekly,
      isHighlight: true,
    },
    {
      key: 'monthly',
      label: lang === 'pt' ? 'Mensal' : lang === 'en' ? 'Monthly' : 'Mensuel',
      badge: '~173h',
      period: cascade.monthly,
      isHighlight: false,
    },
    {
      key: 'annually',
      label: lang === 'pt' ? 'Anual' : lang === 'en' ? 'Annual' : 'Annuel',
      badge: '1 an',
      period: cascade.annually,
      isHighlight: false,
    },
  ];

  const handleCopyAll = () => {
    const text = rows
      .map(
        (r) =>
          `${r.label}: Brut = ${formatCurrency(r.period.gross, locale)} | Déductions = -${formatCurrency(
            r.period.totalDeductions,
            locale
          )} | Net = ${formatCurrency(r.period.net, locale)}`
      )
      .join('\n');

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-slate-300">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <TableProperties className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              {lang === 'pt'
                ? 'Tabela & Cascatas Oficiais 2026'
                : lang === 'en'
                ? 'Official 2026 Cascade Paystub'
                : 'Talon & Cascade Officielle 2026'}
            </h4>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
              <span>{lang === 'pt' ? 'QC 26 Paies' : '26 Paies QC'}</span>
            </span>

            <button
              type="button"
              onClick={handleCopyAll}
              title={lang === 'pt' ? 'Copiar cascatas' : 'Copier les cascades'}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          {lang === 'pt'
            ? 'Conversão em tempo real do seu salário bruto, retenções fiscais e líquido no bolso:'
            : 'Conversion en direct de votre salaire brut, retenues et net en poche :'}
        </p>

        {/* Live Mini-Table of Cascade Data */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 mb-3">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-100/70 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-1.5 px-2.5">{lang === 'pt' ? 'Período' : 'Période'}</th>
                <th className="py-1.5 px-2 text-right">{lang === 'pt' ? 'Bruto' : 'Brut'}</th>
                <th className="py-1.5 px-2 text-right text-rose-600">{lang === 'pt' ? 'Retenção' : 'Retenues'}</th>
                <th className="py-1.5 px-2.5 text-right text-emerald-700 font-extrabold">{lang === 'pt' ? 'Líquido' : 'Net'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 font-medium">
              {rows.map((r) => (
                <tr
                  key={r.key}
                  className={`transition-colors ${
                    r.isHighlight
                      ? 'bg-emerald-50/80 font-semibold'
                      : 'hover:bg-white'
                  }`}
                >
                  <td className="py-2 px-2.5">
                    <div className="flex items-center gap-1.5">
                      {r.isHighlight && (
                        <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
                      )}
                      <div>
                        <span className={`block leading-tight ${r.isHighlight ? 'text-emerald-950 font-bold' : 'text-slate-800'}`}>
                          {r.label}
                        </span>
                        {r.sublabel && (
                          <span className="text-[9px] text-emerald-700 block font-normal leading-tight">
                            {r.sublabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right text-slate-700 tabular-nums">
                    {formatCurrency(r.period.gross, locale)}
                  </td>
                  <td className="py-2 px-2 text-right text-rose-600 tabular-nums text-[11px]">
                    -{formatCurrency(r.period.totalDeductions, locale)}
                  </td>
                  <td className="py-2 px-2.5 text-right tabular-nums">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded ${
                        r.isHighlight
                          ? 'bg-emerald-600 text-white font-bold text-xs'
                          : 'text-emerald-700 font-bold'
                      }`}
                    >
                      {formatCurrency(r.period.net, locale)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Indicators Mini Strip */}
        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-100/70 border border-slate-200/60 text-center mb-3">
          <div>
            <span className="text-[10px] text-slate-500 block leading-tight">
              {lang === 'pt' ? 'Taxa Efetiva' : 'Taux Effectif'}
            </span>
            <span className="text-xs font-bold text-slate-800 font-mono">
              {calc.effectiveTaxRate.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block leading-tight">
              {lang === 'pt' ? 'Taxa Marginal' : 'Taux Marginal'}
            </span>
            <span className="text-xs font-bold text-amber-700 font-mono">
              {calc.marginalTaxRate.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-700 block leading-tight">
              {lang === 'pt' ? 'No Bolso' : 'En Poche'}
            </span>
            <span className="text-xs font-bold text-emerald-700 font-mono">
              {calc.takeHomePercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      {onViewFullResults && (
        <button
          type="button"
          onClick={onViewFullResults}
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <span>
            {lang === 'pt'
              ? 'Ver Memória de Cálculo & Contracheque Completo'
              : 'Consulter la mémoire de calcul détaillée'}
          </span>
          <ArrowRight className="w-4 h-4 text-blue-300" />
        </button>
      )}
    </div>
  );
};
