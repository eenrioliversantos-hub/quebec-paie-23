'use client';

import React from 'react';
import { Language } from '@/lib/i18n';
import { LucideIcon, Sparkles } from 'lucide-react';

interface CalculatorWorkspaceLayoutProps {
  lang: Language;
  icon: LucideIcon;
  iconColorClass?: string;
  categoryKicker: string;
  title: string;
  description: string;
  jurisdictionLabel?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode; // Left column: Form inputs & parameters
  previewCard: React.ReactNode; // Right column: Live attractive preview card
  bottomContent?: React.ReactNode;
}

export const CalculatorWorkspaceLayout: React.FC<CalculatorWorkspaceLayoutProps> = ({
  lang: _lang,
  icon: Icon,
  iconColorClass = 'text-blue-600 bg-blue-50 border-blue-200',
  categoryKicker,
  title,
  description,
  jurisdictionLabel = '⚜️ Québec & Canada 2026',
  headerAction,
  children,
  previewCard,
  bottomContent,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Standardized Hero Header Card */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${iconColorClass}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
                <span className="flex items-center gap-1 text-blue-700 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{categoryKicker}</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500">{jurisdictionLabel}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {headerAction && (
            <div className="shrink-0 flex items-center gap-2">
              {headerAction}
            </div>
          )}
        </div>
      </div>

      {/* 2. Main 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Controls & Custom Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {children}
        </div>

        {/* Right Column: Enticing Live Preview Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          {previewCard}
        </div>
      </div>

      {/* 3. Bottom Complementary Info Slot */}
      {bottomContent && (
        <div className="pt-2">
          {bottomContent}
        </div>
      )}
    </div>
  );
};
