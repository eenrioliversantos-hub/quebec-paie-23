'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import { ComplianceTab } from '@/components/SiteCompliancePages';
import {
  Search,
  X,
  Calculator,
  Briefcase,
  BookOpen,
  Building2,
  Scale,
  Map,
  FileText,
  Lock,
  Cookie,
  Mail,
  Timer,
  Palmtree,
  PiggyBank,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectTool: (tool: ToolId) => void;
  onSelectComplianceTab?: (tab: ComplianceTab) => void;
  onSelectBlogCategory?: (category: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectTool,
  onSelectComplianceTab,
  onSelectBlogCategory,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchItems: SearchItem[] = [
    // 1. Calculators
    {
      id: 'net-calc',
      title: lang === 'pt' ? 'Calculadora de Salário Líquido 2026' : lang === 'fr' ? 'Calculateur de Salaire Net 2026' : 'Net Salary Calculator 2026',
      category: lang === 'pt' ? 'Calculadoras' : 'Calculateurs',
      keywords: ['salario', 'liquido', 'bruto', 'imposto', 'rrq', 'rqap', 'net', 'pay', 'calculator', 'quebec', 'talon', 'paie'],
      icon: Calculator,
      action: () => {
        onSelectTool('net-calc');
        onClose();
      },
    },
    {
      id: 'converter',
      title: lang === 'pt' ? 'Conversor de Salário (Hora ⇄ Ano ⇄ Quinzena)' : lang === 'fr' ? 'Convertisseur de Salaire' : 'Salary Converter',
      category: lang === 'pt' ? 'Calculadoras' : 'Calculateurs',
      keywords: ['conversor', 'periodo', 'hora', 'ano', 'mes', 'quinzena', 'convertisseur', 'hourly', 'annual'],
      icon: TrendingUp,
      action: () => {
        onSelectTool('converter');
        onClose();
      },
    },
    {
      id: 'raise',
      title: lang === 'pt' ? 'Simulador de Aumento & Ganho Real' : lang === 'fr' ? 'Simulateur d’Augmentation' : 'Pay Raise Simulator',
      category: lang === 'pt' ? 'Calculadoras' : 'Calculateurs',
      keywords: ['aumento', 'promocao', 'ganho', 'bolso', 'raise', 'promotion', 'augmentation'],
      icon: TrendingUp,
      action: () => {
        onSelectTool('raise');
        onClose();
      },
    },
    {
      id: 'overtime',
      title: lang === 'pt' ? 'Horas Extras CNESST (1,5× e 2,0×)' : lang === 'fr' ? 'Heures Supplémentaires CNESST' : 'Overtime Pay CNESST',
      category: lang === 'pt' ? 'Calculadoras' : 'Calculateurs',
      keywords: ['horas extras', 'cnesst', 'tempo e meio', '40h', 'overtime', 'heures supplementaires'],
      icon: Timer,
      action: () => {
        onSelectTool('overtime');
        onClose();
      },
    },
    {
      id: 'vacation-holidays',
      title: lang === 'pt' ? 'Férias (4%/6%) & 8 Feriados Oficiais' : lang === 'fr' ? 'Vacances (4%/6%) & 8 Fériés' : 'Vacation & 8 Stat Holidays',
      category: lang === 'pt' ? 'Normas CNESST' : 'Normes CNESST',
      keywords: ['ferias', 'feriados', 'cnesst', '4%', '6%', 'indemnité', 'vacances', 'feries', 'holidays'],
      icon: Palmtree,
      action: () => {
        onSelectTool('vacation-holidays');
        onClose();
      },
    },
    {
      id: 'compare-jobs',
      title: lang === 'pt' ? 'Comparador de 2 Propostas de Emprego' : lang === 'fr' ? 'Comparateur d’Offres d’Emploi' : 'Job Offer Comparator',
      category: lang === 'pt' ? 'Calculadoras' : 'Calculateurs',
      keywords: ['comparar', 'vagas', 'ofertas', 'propostas', 'compare', 'jobs', 'offers'],
      icon: Scale,
      action: () => {
        onSelectTool('compare-jobs');
        onClose();
      },
    },
    {
      id: 'canada-provinces',
      title: lang === 'pt' ? 'Salário nas 13 Províncias do Canadá' : lang === 'fr' ? 'Salaires dans les 13 Provinces' : 'Salaries in 13 Canadian Provinces',
      category: lang === 'pt' ? 'Calculadoras' : 'Calculateurs',
      keywords: ['provincias', 'ontario', 'alberta', 'bc', 'comparador', 'provinces', 'canada'],
      icon: MapPin,
      action: () => {
        onSelectTool('canada-provinces');
        onClose();
      },
    },
    {
      id: 'rrsp-savings',
      title: lang === 'pt' ? 'Simulador REER, CELIAPP & Match Empregador' : lang === 'fr' ? 'Simulateur REER, CELIAPP & Match' : 'RRSP & FHSA Match Simulator',
      category: lang === 'pt' ? 'Poupança & Imposto' : 'Épargne & Fiscalité',
      keywords: ['reer', 'celiapp', 'rrsp', 'fhsa', 'aposentadoria', 'retraite', 'match', 'retorno de imposto'],
      icon: PiggyBank,
      action: () => {
        onSelectTool('rrsp-savings');
        onClose();
      },
    },
    {
      id: 'scenarios',
      title: lang === 'pt' ? 'Estudo de Caso: Biscuits Leclerc ($31.51/h)' : lang === 'fr' ? 'Étude Réelle : Biscuits Leclerc' : 'Real Case Study: Leclerc',
      category: lang === 'pt' ? 'Estudos de Caso' : 'Études de Cas',
      keywords: ['leclerc', 'fabrica', 'industrial', 'holerite', 'caso real', 'biscuits', 'scenarios'],
      icon: Calculator,
      action: () => {
        onSelectTool('scenarios');
        onClose();
      },
    },

    // 2. Career & Employment
    {
      id: 'resume-builder',
      title: lang === 'pt' ? 'Construtor de CV Québec (Padrão ATS sem Foto)' : lang === 'fr' ? 'Créateur de CV Format QC (Normes ATS)' : 'Quebec Resume Builder (ATS)',
      category: lang === 'pt' ? 'Carreira & RH' : 'Carrière & Embauche',
      keywords: ['curriculo', 'cv', 'ats', 'quebec', 'emprego', 'vaga', 'resume', 'builder'],
      icon: FileText,
      action: () => {
        onSelectTool('resume-builder');
        onClose();
      },
    },
    {
      id: 'interview-simulator',
      title: lang === 'pt' ? 'Simulador de Entrevista STAR com IA' : lang === 'fr' ? 'Simulateur d’Entrevues STAR' : 'STAR Interview Simulator',
      category: lang === 'pt' ? 'Carreira & RH' : 'Carrière & Embauche',
      keywords: ['entrevista', 'star', 'perguntas', 'ia', 'recrutamento', 'interview', 'simulator'],
      icon: Briefcase,
      action: () => {
        onSelectTool('interview-simulator');
        onClose();
      },
    },
    {
      id: 'tech-tests',
      title: lang === 'pt' ? 'Testes Técnicos & Segurança SIMDUT CNESST' : lang === 'fr' ? 'Tests Techniques & Sécurité SST' : 'Technical & Safety WHMIS Tests',
      category: lang === 'pt' ? 'Carreira & RH' : 'Carrière & Embauche',
      keywords: ['testes', 'tecnicos', 'simdut', 'cnesst', 'seguranca', 'sst', 'whmis'],
      icon: Scale,
      action: () => {
        onSelectTool('tech-tests');
        onClose();
      },
    },
    {
      id: 'pro-plans',
      title: lang === 'pt' ? 'Pass Carrière Pro (Acesso Ilimitado)' : lang === 'fr' ? 'Pass Carrière Pro (Accès Illimité)' : 'Pass Carrière Pro (Full Pass)',
      category: lang === 'pt' ? 'Carreira & RH' : 'Carrière & Embauche',
      keywords: ['pro', 'planos', 'pass', 'vip', 'premium', 'preco', 'assinar'],
      icon: Sparkles,
      action: () => {
        onSelectTool('pro-plans');
        onClose();
      },
    },

    // 3. Guides & Knowledge
    {
      id: 'ebook-store',
      title: lang === 'pt' ? 'Guia Definitivo do Salário & Emprego (140p PDF)' : lang === 'fr' ? 'Guide Ultime de la Paie (140p PDF)' : 'Tax & Payroll Guide (140p PDF)',
      category: lang === 'pt' ? 'Guias & E-books' : 'Guides & Livres',
      keywords: ['ebook', 'guia', 'pdf', 'livro', 'manual', '140p', 'sobrevivencia fiscal', 'book'],
      icon: BookOpen,
      action: () => {
        onSelectTool('ebook-store');
        onClose();
      },
    },
    {
      id: 'blog',
      title: lang === 'pt' ? 'Blog & Artigos Fiscais Especializados' : lang === 'fr' ? 'Blog & Dossiers Fiscaux Pratiques' : 'Blog & Practical Guides',
      category: lang === 'pt' ? 'Conteúdo & Notícias' : 'Contenu & Actualités',
      keywords: ['blog', 'artigos', 'noticias', 'dossie', 'posts', 'guias', 'articles'],
      icon: BookOpen,
      action: () => {
        onSelectTool('blog');
        onClose();
      },
    },

    // 4. Institutional & Compliance
    {
      id: 'sitemap',
      title: lang === 'pt' ? 'Mapa do Site & Diretório' : lang === 'fr' ? 'Plan du Site & Répertoire' : 'Sitemap & Directory',
      category: lang === 'pt' ? 'Institucional' : 'Institutionnel',
      keywords: ['mapa do site', 'sitemap', 'diretorio', 'indice', 'paginas', 'plan du site'],
      icon: Map,
      action: () => {
        onSelectComplianceTab?.('sitemap');
        onSelectTool('sitemap');
        onClose();
      },
    },
    {
      id: 'about',
      title: lang === 'pt' ? 'Sobre Nós & Metodologia E-E-A-T' : lang === 'fr' ? 'À Propos & Équipe' : 'About Us & Methodology',
      category: lang === 'pt' ? 'Institucional' : 'Institutionnel',
      keywords: ['sobre', 'equipe', 'autoridade', 'eeat', 'quem somos', 'about', 'a propos'],
      icon: Building2,
      action: () => {
        onSelectComplianceTab?.('about');
        onSelectTool('sitemap');
        onClose();
      },
    },
    {
      id: 'terms',
      title: lang === 'pt' ? 'Termos de Uso & Licença' : lang === 'fr' ? 'Conditions d’Utilisation' : 'Terms of Use',
      category: lang === 'pt' ? 'Institucional' : 'Institutionnel',
      keywords: ['termos', 'uso', 'condicoes', 'legal', 'licenca', 'terms', 'conditions'],
      icon: FileText,
      action: () => {
        onSelectComplianceTab?.('terms');
        onSelectTool('sitemap');
        onClose();
      },
    },
    {
      id: 'privacy',
      title: lang === 'pt' ? 'Política de Privacidade (Lei 25 do Québec)' : lang === 'fr' ? 'Politique de Confidentialité (Loi 25)' : 'Privacy Policy (Law 25 QC)',
      category: lang === 'pt' ? 'Institucional' : 'Institutionnel',
      keywords: ['privacidade', 'lei 25', 'dados', 'confidencialidade', 'lgpd', 'gdpr', 'privacy'],
      icon: Lock,
      action: () => {
        onSelectComplianceTab?.('privacy');
        onSelectTool('sitemap');
        onClose();
      },
    },
    {
      id: 'cookies',
      title: lang === 'pt' ? 'Política de Cookies & Rastreamento' : lang === 'fr' ? 'Gestion des Témoins (Cookies)' : 'Cookie Policy & Tracking',
      category: lang === 'pt' ? 'Institucional' : 'Institutionnel',
      keywords: ['cookies', 'temoins', 'rastreamento', 'consentimento', 'consent'],
      icon: Cookie,
      action: () => {
        onSelectComplianceTab?.('cookies');
        onSelectTool('sitemap');
        onClose();
      },
    },
    {
      id: 'contact',
      title: lang === 'pt' ? 'Fale Conosco & Suporte' : lang === 'fr' ? 'Nous Joindre & Support' : 'Contact Us & Support',
      category: lang === 'pt' ? 'Institucional' : 'Institutionnel',
      keywords: ['contato', 'fale conosco', 'suporte', 'email', 'ajuda', 'contact', 'nous joindre'],
      icon: Mail,
      action: () => {
        onSelectComplianceTab?.('contact');
        onSelectTool('sitemap');
        onClose();
      },
    },
  ];

  // Filter items based on query
  const filteredItems = searchItems.filter((item) => {
    if (!query.trim()) return true;
    const cleanQ = query.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(cleanQ) ||
      item.category.toLowerCase().includes(cleanQ) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(cleanQ))
    );
  });

  // Handle arrow keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Busca Rápida de Ferramentas"
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200/90 bg-white">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              lang === 'pt'
                ? 'Buscar calculadoras, normas, guias ou termos...'
                : lang === 'fr'
                ? 'Rechercher un calculateur, norme, guide...'
                : 'Search calculators, standards, guides...'
            }
            className="flex-1 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 bg-transparent outline-none border-none min-w-0"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100/60 max-h-[60vh] custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">
                {lang === 'pt' ? 'Nenhuma ferramenta encontrada' : 'Aucun résultat trouvé'}
              </p>
              <p className="text-xs text-slate-500">
                {lang === 'pt'
                  ? 'Tente termos como "salário", "horas extras", "cv" ou "leclerc".'
                  : 'Essayez avec "salaire", "heures", "cv" ou "reer".'}
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer min-h-[46px] group ${
                    isSelected
                      ? 'bg-blue-50 text-blue-900 border border-blue-200/80 shadow-2xs'
                      : 'hover:bg-slate-50 text-slate-800 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-semibold block truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium block truncate">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 ml-2">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                        <span>{lang === 'pt' ? 'Abrir' : 'Ouvrir'}</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{filteredItems.length}</span>
            <span>{lang === 'pt' ? 'opções disponíveis' : 'résultats'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <span>↑↓ para navegar</span>
            <span>·</span>
            <span>↵ para selecionar</span>
            <span>·</span>
            <span>ESC para fechar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
