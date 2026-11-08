'use client';

import React from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import {
  Calculator,
  Briefcase,
  BookOpen,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

interface MobileBottomNavProps {
  lang: Language;
  activeTool: ToolId;
  onSelectTool: (tool: ToolId) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  activeTool,
  onSelectTool,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) => {
  const labels = {
    calc: {
      pt: 'Calculadora',
      fr: 'Calculateur',
      en: 'Calculator',
    },
    career: {
      pt: 'Carreira',
      fr: 'Carrière',
      en: 'Career',
    },
    blog: {
      pt: 'Blog & Guias',
      fr: 'Blog & Guides',
      en: 'Blog & Articles',
    },
    ebooks: {
      pt: 'E-books',
      fr: 'E-books',
      en: 'E-books',
    },
    menu: {
      pt: 'Menu',
      fr: 'Menu',
      en: 'Menu',
    },
    close: {
      pt: 'Fechar',
      fr: 'Fermer',
      en: 'Close',
    },
  };

  const isCalcActive = [
    'net-calc',
    'converter',
    'raise',
    'overtime',
    'compare-jobs',
    'canada-provinces',
    'scenarios',
  ].includes(activeTool);

  const isCareerActive = [
    'resume-builder',
    'interview-simulator',
    'tech-tests',
    'pro-plans',
  ].includes(activeTool);

  const isBlogActive = activeTool === 'blog';

  const isEbookActive = [
    'ebook-store',
    'resources',
    'guides',
  ].includes(activeTool);

  return (
    <nav
      aria-label="Navegação Inferior Mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] px-2 pt-1.5 pb-2 transition-all select-none"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* Tab 1: Calculadora */}
        <button
          type="button"
          onClick={() => {
            onCloseMobileMenu?.();
            onSelectTool('net-calc');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
            isCalcActive && !isMobileMenuOpen
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-label={labels.calc[lang]}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isCalcActive && !isMobileMenuOpen ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {labels.calc[lang]}
          </span>
        </button>

        {/* Tab 2: Carreira & RH */}
        <button
          type="button"
          onClick={() => {
            onCloseMobileMenu?.();
            onSelectTool('resume-builder');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
            isCareerActive && !isMobileMenuOpen
              ? 'text-indigo-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-label={labels.career[lang]}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isCareerActive && !isMobileMenuOpen ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {labels.career[lang]}
          </span>
        </button>

        {/* Tab 3: Blog */}
        <button
          type="button"
          onClick={() => {
            onCloseMobileMenu?.();
            onSelectTool('blog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
            isBlogActive && !isMobileMenuOpen
              ? 'text-rose-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-label={labels.blog[lang]}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isBlogActive && !isMobileMenuOpen ? 'bg-rose-50 text-rose-600' : ''
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {labels.blog[lang]}
          </span>
        </button>

        {/* Tab 4: E-books / Acervo */}
        <button
          type="button"
          onClick={() => {
            onCloseMobileMenu?.();
            onSelectTool('ebook-store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
            isEbookActive && !isMobileMenuOpen
              ? 'text-amber-600 font-bold'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
          aria-label={labels.ebooks[lang]}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isEbookActive && !isMobileMenuOpen ? 'bg-amber-50 text-amber-600' : ''
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {labels.ebooks[lang]}
          </span>
        </button>

        {/* Tab 5: Menu Completo (Hamburguer Drawer Trigger) */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
            isMobileMenuOpen
              ? 'text-blue-700 font-bold bg-blue-50/80 ring-1 ring-blue-300'
              : 'text-slate-700 hover:text-slate-900 font-medium'
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? labels.close[lang] : labels.menu[lang]}
        >
          <div className="p-1 rounded-lg">
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-blue-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {isMobileMenuOpen ? labels.close[lang] : labels.menu[lang]}
          </span>
        </button>
      </div>
    </nav>
  );
};
