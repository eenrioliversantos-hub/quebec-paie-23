'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import {
  BlogArticleData,
  BlogCategory,
  TargetAudienceType,
  OfficialSource,
  FormulaBox,
  AuthorInfo,
  RecommendedToolItem,
} from '@/lib/admin-store';
import {
  Save,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  Layers,
  Calculator,
  Compass,
  Target,
  FileText,
  DollarSign,
  Briefcase,
  HelpCircle,
  Copy,
  Check,
  Globe,
  UserCheck,
  ShieldCheck,
  RotateCcw,
  Wrench,
  Clock,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
} from 'lucide-react';

export const QUEBEC_PHOTO_PRESETS = [
  {
    id: 'tax-calc',
    title: 'Contracheque & Impostos no Québec',
    category: 'calculos-manuais',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cálculo e conciliação de retenções na fonte no contracheque canadense.',
  },
  {
    id: 'manufacturing',
    title: 'Indústria Manufatureira & Linha de Produção',
    category: 'calculos-manuais',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    caption: 'Linha de produção industrial a alta cadência e normas de segurança SST.',
  },
  {
    id: 'interview',
    title: 'Entrevista de Emprego (Método STAR)',
    category: 'entrevistas-carreira',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    caption: 'Entrevista estruturada com gestores de recursos humanos no Québec.',
  },
  {
    id: 'resume',
    title: 'Currículo Canadense & Triagem ATS',
    category: 'curriculo-ats',
    url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Formatação de CV sem foto, otimização anti-viés e palavras-chave ATS.',
  },
  {
    id: 'tech-montreal',
    title: 'Tecnologia & TI em Montreal',
    category: 'carriere',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Ambiente tecnológico de startups e corporações de TI em Montreal.',
  },
  {
    id: 'finance-reer',
    title: 'Investimentos, REER & Poupança',
    category: 'previdencia-financas',
    url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Planejamento financeiro, dedução fiscal de REER e aposentadoria.',
  },
  {
    id: 'banking-cad',
    title: 'Dólares Canadenses (CAD) & Câmbio',
    category: 'finances',
    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Câmbio comercial real e transferência de fundos sem spread oculto.',
  },
  {
    id: 'cnesst-law',
    title: 'Normas do Trabalho CNESST & Direitos',
    category: 'cnesst',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Código do trabalho, horas extras a 1,5x e direitos do empregado.',
  },
  {
    id: 'montreal-skyline',
    title: 'Montreal & Centros Financeiros',
    category: 'momentos-de-vida',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    caption: 'Panorama urbano e mercado corporativo da Grande Montreal e Québec.',
  },
  {
    id: 'office-team',
    title: 'Equipe de Escritório & RH',
    category: 'empresas-rh',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gestão de pessoas, benefícios e clima organizacional.',
  },
];

export interface BlogArticleInPageEditorProps {
  article: BlogArticleData;
  lang: Language;
  onSave: (updated: BlogArticleData) => void;
  onCancel: () => void;
  onSelectTool: (tool: ToolId) => void;
  onToggleViewMode: () => void;
}

export const BlogArticleInPageEditor: React.FC<BlogArticleInPageEditorProps> = ({
  article,
  lang,
  onSave,
  onCancel,
  onSelectTool,
  onToggleViewMode,
}) => {
  const [draft, setDraft] = useState<BlogArticleData>(() => JSON.parse(JSON.stringify(article)));
  const [editLang, setEditLang] = useState<Language>(lang);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number>(0);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState<'imageUrl' | 'detailImageUrl'>('imageUrl');
  const [customImageUrlInput, setCustomImageUrlInput] = useState('');
  const [newTakeawayInput, setNewTakeawayInput] = useState('');
  const [showFormulaEditor, setShowFormulaEditor] = useState<boolean>(Boolean(draft.formulaBox));
  const [showTableEditor, setShowTableEditor] = useState<boolean>(Boolean(draft.tableData));
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const categories: { id: BlogCategory; label: string }[] = [
    { id: 'calculos-manuais', label: 'Cálculos Manuais & Fórmulas' },
    { id: 'tutoriais-ferramentas', label: 'Tutoriais das Ferramentas' },
    { id: 'curriculo-ats', label: 'Currículo Canadense & ATS' },
    { id: 'entrevistas-carreira', label: 'Entrevistas STAR & Testes' },
    { id: 'empresas-rh', label: 'Empresas, RH & Retenção' },
    { id: 'previdencia-financas', label: 'Previdência, REER & Finanças' },
    { id: 'momentos-de-vida', label: 'Fases de Vida & Transição' },
    { id: 'impots', label: 'Salário & Impostos' },
    { id: 'carriere', label: 'Carreira & Emprego' },
    { id: 'finances', label: 'Finanças & Bancos' },
    { id: 'cnesst', label: 'CNESST & Direitos do Trabalho' },
  ];

  const availableTools: { id: ToolId; name: string }[] = [
    { id: 'net-calc', name: 'Calculador de Salário Líquido' },
    { id: 'overtime', name: 'Calculador de Horas Extras' },
    { id: 'converter', name: 'Conversor Salarial' },
    { id: 'vacation-holidays', name: 'Simulador de Férias e Feriados' },
    { id: 'comparator', name: 'Comparador de Ofertas' },
    { id: 'canada-provinces', name: 'Comparativo 13 Províncias' },
    { id: 'resume-builder', name: 'Gerador de CV Canadense ATS' },
    { id: 'job-optimizer', name: 'Otimizador de Vagas ATS' },
    { id: 'interview-simulator', name: 'Simulador de Entrevista STAR' },
    { id: 'technical-tests', name: 'Testes Técnicos de Admissão' },
  ];

  // Current values for active editing language with safe fallbacks
  const currentTitle = draft.title?.[editLang] ?? draft.title?.pt ?? '';
  const currentExcerpt = draft.excerpt?.[editLang] ?? draft.excerpt?.pt ?? '';
  const currentParagraphs = draft.content?.[editLang] ?? draft.content?.pt ?? [''];
  const currentAuditBadge = draft.auditBadge?.[editLang] ?? draft.auditBadge?.pt ?? 'Revisão Contábil 2026';
  const currentTargetAudienceLabel = draft.targetAudienceLabel?.[editLang] ?? draft.targetAudienceLabel?.pt ?? 'Consumidores B2C';
  const currentCommunicationTone = draft.communicationTone?.[editLang] ?? draft.communicationTone?.pt ?? 'Didático, Acolhedor & Prático';
  const currentFunnelStageLabel = draft.funnelStageLabel?.[editLang] ?? draft.funnelStageLabel?.pt ?? 'Topo de Funil (Educação & Atração)';
  
  const currentAuthor: AuthorInfo = draft.author ?? {
    initials: 'JP',
    name: 'Jean-Philippe Beaulieu, CPA auditeur',
    role: 'Pôle d’Expertise Comptable & Fiscale PaieNet.qc · Membre de l’Ordre des CPA',
    complianceSeal: 'Conforme aux barèmes ARC & Revenu Québec 2026',
  };

  const currentToolsStripTitle = draft.toolsStripTitle?.[editLang] ?? draft.toolsStripTitle?.pt ?? '⚡ Ferramentas Oficiais Recomendadas no PaieNet:';
  
  const currentRecommendedTools: RecommendedToolItem[] = draft.recommendedTools && draft.recommendedTools.length === 4
    ? draft.recommendedTools
    : [
        { toolId: 'net-calc', title: 'Salário Líquido', subtitle: 'Cálculo oficial' },
        { toolId: 'overtime', title: 'Horas Extras', subtitle: '1.5× CNESST' },
        { toolId: 'canada-provinces', title: '13 Províncias', subtitle: 'Comparativo' },
        { toolId: 'resume-builder', title: 'Gerador de CV', subtitle: 'ATS Canadá' },
      ];

  const currentCtaHeadline = draft.ctaHeadline?.[editLang] ?? draft.ctaHeadline?.pt ?? '⚡ Ferramenta Prática Recomendada para este Caso:';
  const currentCtaToolLabel = draft.ctaToolLabel?.[editLang] ?? draft.ctaToolLabel?.pt ?? 'Ver na Calculadora';
  const currentCtaButtonText = draft.ctaButtonText?.[editLang] ?? draft.ctaButtonText?.pt ?? 'Abrir Ferramenta Grátis';

  // Updaters
  const handleUpdateTitle = (text: string) => {
    setDraft((prev) => ({
      ...prev,
      title: { ...prev.title, [editLang]: text },
    }));
  };

  const handleUpdateExcerpt = (text: string) => {
    setDraft((prev) => ({
      ...prev,
      excerpt: { ...prev.excerpt, [editLang]: text },
    }));
  };

  const handleUpdateParagraph = (index: number, text: string) => {
    const list = [...currentParagraphs];
    list[index] = text;
    setDraft((prev) => ({
      ...prev,
      content: { ...prev.content, [editLang]: list },
    }));
  };

  const handleAddParagraph = () => {
    const list = [...currentParagraphs, ''];
    setDraft((prev) => ({
      ...prev,
      content: { ...prev.content, [editLang]: list },
    }));
    setActiveParagraphIndex(list.length - 1);
  };

  const handleRemoveParagraph = (index: number) => {
    if (currentParagraphs.length <= 1) return;
    const list = currentParagraphs.filter((_, idx) => idx !== index);
    setDraft((prev) => ({
      ...prev,
      content: { ...prev.content, [editLang]: list },
    }));
    setActiveParagraphIndex((prev) => Math.max(0, prev - 1));
  };

  const handleMoveParagraph = (index: number, direction: 'up' | 'down') => {
    const list = [...currentParagraphs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    setDraft((prev) => ({
      ...prev,
      content: { ...prev.content, [editLang]: list },
    }));
    setActiveParagraphIndex(targetIndex);
  };

  // Insert text into a specific paragraph index
  const handleInsertTextIntoTargetParagraph = (targetIdx: number, snippet: string) => {
    const list = [...currentParagraphs];
    const target = list[targetIdx] !== undefined ? targetIdx : activeParagraphIndex;
    const p = list[target] || '';
    list[target] = p ? `${p} ${snippet}` : snippet;
    setDraft((prev) => ({
      ...prev,
      content: { ...prev.content, [editLang]: list },
    }));
    setActiveParagraphIndex(target);
  };

  const handleInsertToolLinkAt = (targetIdx: number, toolId: string, label: string) => {
    handleInsertTextIntoTargetParagraph(targetIdx, `[${label}](#${toolId})`);
  };

  const handleInsertExternalLinkPromptAt = (targetIdx: number, presetUrl?: string, presetLabel?: string) => {
    const url = presetUrl || prompt('Digite ou cole a URL externa completa (ex: https://www.revenuquebec.ca):', 'https://');
    if (!url) return;
    const label = presetLabel || prompt('Digite o texto clicável do link (ex: Portal Oficial Revenu Québec):', 'Link de Referência');
    if (!label) return;
    handleInsertTextIntoTargetParagraph(targetIdx, `[${label}](${url})`);
  };

  // Toggle WordPress-like block formatting (H2, H3, Bullets, Callouts, Bold)
  const handleToggleBlockFormatAt = (
    targetIdx: number,
    formatType: 'h2' | 'h3' | 'bullet' | 'tip' | 'alert' | 'info' | 'bold' | 'italic'
  ) => {
    const list = [...currentParagraphs];
    const target = list[targetIdx] !== undefined ? targetIdx : activeParagraphIndex;
    let text = list[target] || '';

    switch (formatType) {
      case 'h2':
        text = text.startsWith('## ') ? text.replace(/^##\s*/, '') : `## ${text.replace(/^#+\s*/, '')}`;
        break;
      case 'h3':
        text = text.startsWith('### ') ? text.replace(/^###\s*/, '') : `### ${text.replace(/^#+\s*/, '')}`;
        break;
      case 'bullet':
        text = text.startsWith('• ') ? text.replace(/^•\s*/, '') : `• ${text}`;
        break;
      case 'tip':
        text = text.startsWith('> 💡 [DICA] ') ? text.replace(/^>\s*💡\s*\[DICA\]\s*/, '') : `> 💡 [DICA] ${text}`;
        break;
      case 'alert':
        text = text.startsWith('> ⚠️ [ATENÇÃO] ') ? text.replace(/^>\s*⚠️\s*\[ATENÇÃO\]\s*/, '') : `> ⚠️ [ATENÇÃO] ${text}`;
        break;
      case 'info':
        text = text.startsWith('> ℹ️ [INFO] ') ? text.replace(/^>\s*ℹ️\s*\[INFO\]\s*/, '') : `> ℹ️ [INFO] ${text}`;
        break;
      case 'bold':
        text = text ? `${text} **termo em destaque**` : '**termo em destaque**';
        break;
      case 'italic':
        text = text ? `${text} *termo em itálico*` : '*termo em itálico*';
        break;
    }

    list[target] = text;
    setDraft((prev) => ({
      ...prev,
      content: { ...prev.content, [editLang]: list },
    }));
    setActiveParagraphIndex(target);
  };

  // Inline miniature preview of markdown blocks, tool pills, external links, etc.
  const renderInlinePreview = (text: string) => {
    if (!text || !text.trim()) {
      return (
        <span className="text-slate-400 italic text-[11px]">
          (Parágrafo vazio. Comece a digitar ou insira blocos/links acima)
        </span>
      );
    }

    const isH2 = text.startsWith('## ');
    const isH3 = text.startsWith('### ');
    const isTip = text.startsWith('> 💡') || text.startsWith('> [DICA]');
    const isAlert = text.startsWith('> ⚠️') || text.startsWith('> [ATENÇÃO]');
    const isBullet = text.startsWith('•') || text.startsWith('- ');

    let clean = text;
    if (isH2) clean = text.replace(/^##\s*/, '');
    else if (isH3) clean = text.replace(/^###\s*/, '');
    else if (isTip) clean = text.replace(/^>\s*(💡|\[DICA\])\s*/i, '');
    else if (isAlert) clean = text.replace(/^>\s*(⚠️|\[ATENÇÃO\])\s*/i, '');
    else if (isBullet) clean = text.replace(/^[•-]\s*/, '');

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactNode)[] = [];
    let last = 0;
    let match;

    while ((match = linkRegex.exec(clean)) !== null) {
      if (match.index > last) {
        parts.push(clean.substring(last, match.index));
      }
      const label = match[1];
      const href = match[2];
      const isInternal = href.startsWith('#');

      if (isInternal) {
        parts.push(
          <span
            key={match.index}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-blue-100 text-blue-900 border border-blue-300 font-extrabold text-[11px]"
          >
            <Sparkles className="w-2.5 h-2.5 text-blue-600" />
            <span>{label}</span>
          </span>
        );
      } else {
        parts.push(
          <span
            key={match.index}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-[11px]"
          >
            <span>{label}</span>
            <ExternalLink className="w-2.5 h-2.5 text-emerald-600" />
          </span>
        );
      }
      last = linkRegex.lastIndex;
    }

    if (last < clean.length) {
      parts.push(clean.substring(last));
    }

    const content = parts.length > 0 ? parts : clean;

    if (isH2) {
      return (
        <span className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>{content}</span>
        </span>
      );
    }
    if (isH3) {
      return (
        <span className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>{content}</span>
        </span>
      );
    }
    if (isTip) {
      return (
        <span className="p-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-1.5 font-medium">
          <span>💡</span>
          <span>{content}</span>
        </span>
      );
    }
    if (isAlert) {
      return (
        <span className="p-2 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-1.5 font-medium">
          <span>⚠️</span>
          <span>{content}</span>
        </span>
      );
    }
    if (isBullet) {
      return (
        <span className="flex items-center gap-1.5 text-xs text-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span>{content}</span>
        </span>
      );
    }
    return <span className="text-xs text-slate-700 leading-relaxed">{content}</span>;
  };

  const handleReplicateLanguages = () => {
    const sourceTitle = currentTitle;
    const sourceExcerpt = currentExcerpt;
    const sourceParas = currentParagraphs;

    if (!sourceTitle) {
      alert('Preencha ao menos o título antes de replicar.');
      return;
    }

    setDraft((prev) => {
      const updatedTitle = { ...prev.title };
      const updatedExcerpt = { ...prev.excerpt };
      const updatedContent = { ...prev.content };
      const updatedAuditBadge = { ...(prev.auditBadge || {}) };
      const updatedAudience = { ...(prev.targetAudienceLabel || {}) };
      const updatedTone = { ...(prev.communicationTone || {}) };
      const updatedFunnel = { ...(prev.funnelStageLabel || {}) };
      const updatedCtaHeadline = { ...(prev.ctaHeadline || {}) };
      const updatedCtaLabel = { ...(prev.ctaToolLabel || {}) };
      const updatedCtaButton = { ...(prev.ctaButtonText || {}) };
      const updatedToolsStripTitle = { ...(prev.toolsStripTitle || {}) };

      (['pt', 'fr', 'en'] as Language[]).forEach((l) => {
        if (!updatedTitle[l]) updatedTitle[l] = sourceTitle;
        if (!updatedExcerpt[l]) updatedExcerpt[l] = sourceExcerpt;
        if (!updatedContent[l] || updatedContent[l].length === 0) updatedContent[l] = [...sourceParas];
        if (!updatedAuditBadge[l]) updatedAuditBadge[l] = currentAuditBadge;
        if (!updatedAudience[l]) updatedAudience[l] = currentTargetAudienceLabel;
        if (!updatedTone[l]) updatedTone[l] = currentCommunicationTone;
        if (!updatedFunnel[l]) updatedFunnel[l] = currentFunnelStageLabel;
        if (!updatedCtaHeadline[l]) updatedCtaHeadline[l] = currentCtaHeadline;
        if (!updatedCtaLabel[l]) updatedCtaLabel[l] = currentCtaToolLabel;
        if (!updatedCtaButton[l]) updatedCtaButton[l] = currentCtaButtonText;
        if (!updatedToolsStripTitle[l]) updatedToolsStripTitle[l] = currentToolsStripTitle;
      });

      return {
        ...prev,
        title: updatedTitle,
        excerpt: updatedExcerpt,
        content: updatedContent,
        auditBadge: updatedAuditBadge,
        targetAudienceLabel: updatedAudience,
        communicationTone: updatedTone,
        funnelStageLabel: updatedFunnel,
        ctaHeadline: updatedCtaHeadline,
        ctaToolLabel: updatedCtaLabel,
        ctaButtonText: updatedCtaButton,
        toolsStripTitle: updatedToolsStripTitle,
      };
    });
    setSaveToast('✨ Conteúdo e metadados replicados para Francês e Inglês!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setDraft((prev) => ({
          ...prev,
          [imagePickerTarget]: dataUrl,
        }));
        setIsImagePickerOpen(false);
        setSaveToast('📷 Imagem local carregada com sucesso!');
        setTimeout(() => setSaveToast(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetPhoto = (url: string) => {
    setDraft((prev) => ({
      ...prev,
      [imagePickerTarget]: url,
    }));
    setIsImagePickerOpen(false);
    setSaveToast('📷 Foto do Québec aplicada!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleApplyCustomUrl = () => {
    if (!customImageUrlInput.trim()) return;
    setDraft((prev) => ({
      ...prev,
      [imagePickerTarget]: customImageUrlInput.trim(),
    }));
    setCustomImageUrlInput('');
    setIsImagePickerOpen(false);
    setSaveToast('🌐 URL da foto aplicada!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleAddOfficialSource = () => {
    const title = prompt('Título da Fonte (ex: Barème des retenues à la source 2026):');
    if (!title) return;
    const url = prompt('URL oficial (ex: https://www.revenuquebec.ca):', 'https://');
    if (!url) return;
    const authority = prompt('Autoridade (ex: Revenu Québec, ARC, CNESST):', 'Revenu Québec') || 'Revenu Québec';

    setDraft((prev) => ({
      ...prev,
      officialSources: [
        ...(prev.officialSources || []),
        { title, url, authority },
      ],
    }));
  };

  const handleRemoveOfficialSource = (idx: number) => {
    setDraft((prev) => {
      const list = [...(prev.officialSources || [])];
      list.splice(idx, 1);
      return { ...prev, officialSources: list };
    });
  };

  const handleSaveAll = () => {
    const titlePt = draft.title?.pt || draft.title?.fr || draft.title?.en || 'Novo Artigo';
    const titleFr = draft.title?.fr || titlePt;
    const titleEn = draft.title?.en || titlePt;

    const finalArt: BlogArticleData = {
      ...draft,
      title: { pt: titlePt, fr: titleFr, en: titleEn },
      excerpt: {
        pt: draft.excerpt?.pt || draft.excerpt?.fr || draft.excerpt?.en || '',
        fr: draft.excerpt?.fr || draft.excerpt?.pt || '',
        en: draft.excerpt?.en || draft.excerpt?.pt || '',
      },
      content: {
        pt: draft.content?.pt?.length ? draft.content.pt : draft.content?.fr || [''],
        fr: draft.content?.fr?.length ? draft.content.fr : draft.content?.pt || [''],
        en: draft.content?.en?.length ? draft.content.en : draft.content?.pt || [''],
      },
      author: draft.author || currentAuthor,
      recommendedTools: draft.recommendedTools || currentRecommendedTools,
      ctaHeadline: {
        ...draft.ctaHeadline,
        [editLang]: currentCtaHeadline,
      },
      ctaToolLabel: {
        ...draft.ctaToolLabel,
        [editLang]: currentCtaToolLabel,
      },
      ctaButtonText: {
        ...draft.ctaButtonText,
        [editLang]: currentCtaButtonText,
      },
      toolsStripTitle: {
        ...draft.toolsStripTitle,
        [editLang]: currentToolsStripTitle,
      },
      auditBadge: {
        ...draft.auditBadge,
        [editLang]: currentAuditBadge,
      },
      targetAudienceLabel: {
        ...draft.targetAudienceLabel,
        [editLang]: currentTargetAudienceLabel,
      },
      communicationTone: {
        ...draft.communicationTone,
        [editLang]: currentCommunicationTone,
      },
      funnelStageLabel: {
        ...draft.funnelStageLabel,
        [editLang]: currentFunnelStageLabel,
      },
    };

    onSave(finalArt);
    setSaveToast('🎉 Artigo salvo com sucesso!');
    setTimeout(() => setSaveToast(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOP STICKY CONTROL DOCK */}
      <div className="sticky top-4 z-40 bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-blue-500/30 shadow-2xl text-white space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 block">
                Painel de Edição Direta na Página
              </span>
              <h2 className="text-sm sm:text-base font-black truncate max-w-md">
                {currentTitle || 'Edição do Artigo em Tempo Real'}
              </h2>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Published vs Draft */}
            <button
              type="button"
              onClick={() => setDraft((p) => ({ ...p, published: !p.published }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                draft.published
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${draft.published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{draft.published ? '🟢 Publicado no Blog' : '🟡 Rascunho (Privado)'}</span>
            </button>

            {/* Toggle Preview Button */}
            <button
              type="button"
              onClick={onToggleViewMode}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Ver como Leitor</span>
            </button>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-600/30 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={onCancel}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer border border-slate-700"
              title="Fechar editor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Sub-Bar: Language Selector & Auto-Replicate */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">Idioma em Edição:</span>
            {(['pt', 'fr', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setEditLang(l)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  editLang === l
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {l === 'pt' ? '🇧🇷 Português' : l === 'fr' ? '🇫🇷 Français' : '🇨🇦 English'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplicateLanguages}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 text-[11px] font-bold transition-all border border-indigo-500/30 cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Replicar p/ Francês & Inglês</span>
            </button>
          </div>
        </div>

        {saveToast && (
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}
      </div>

      {/* 2. COVER IMAGE & EDITORIAL ART MANAGER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                1. Imagem de Capa do Artigo
              </h3>
              <p className="text-[11px] text-slate-500">
                Escolha uma foto curada do Québec, cole qualquer URL externa ou envie uma foto do seu computador.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setImagePickerTarget('imageUrl');
              setIsImagePickerOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all border border-purple-200 cursor-pointer flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Alterar Foto de Capa</span>
          </button>
        </div>

        {/* Live Preview of the Hero Canvas */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-900 border border-slate-200">
          <img
            src={draft.imageUrl || `https://picsum.photos/seed/${draft.id}/1200/600`}
            alt={currentTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-black/70 text-white backdrop-blur-md">
              {categories.find((c) => c.id === draft.category)?.label || 'Categoria'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
              {draft.readTime || '5 min'}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-xs text-slate-300 font-mono">
              Foto ativa: {draft.imageUrl ? draft.imageUrl.slice(0, 70) + '...' : `Placeholder padrão (seed: ${draft.id})`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. TITLE, SUBTITLE & TOP ROW (CATEGORIA, DATA, SELO DE REVISÃO) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>2. Título, Subtítulo & Linha de Publicação ({editLang.toUpperCase()})</span>
        </h3>

        {/* Title Input */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">
            Título Principal da Matéria:
          </label>
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => handleUpdateTitle(e.target.value)}
            placeholder="Ex: Como Calcular o Salário Líquido no Québec Manualmente (Barèmes 2026)"
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-base sm:text-lg font-black focus:outline-blue-600 text-slate-900 bg-slate-50/50"
          />
        </div>

        {/* Excerpt / Subheading */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">
            Subtítulo & Resumo Executivo:
          </label>
          <textarea
            rows={3}
            value={currentExcerpt}
            onChange={(e) => handleUpdateExcerpt(e.target.value)}
            placeholder="Ex: Aprenda o passo a passo matemático exato para calcular seu salário líquido: faixas provinciais e federais, RRQ e o abatimento federal de 16,5%..."
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-blue-600 text-slate-800 bg-slate-50/50"
          />
        </div>

        {/* Live Preview of Header Metadata Row */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Pré-visualização da Linha de Publicação no Topo do Artigo:
          </span>
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              {categories.find((c) => c.id === draft.category)?.label || 'Guia'}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">{draft.date || 'Édition 2026'}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentAuditBadge}</span>
            </span>
          </div>
        </div>

        {/* Inputs for Category, Date, Audit Badge and Read Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Categoria:</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value as BlogCategory }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Data / Edição:</label>
            <input
              type="text"
              value={draft.date || ''}
              onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))}
              placeholder="ex: Nova Publicação ou Édition 2026"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Selo de Revisão / Auditoria ({editLang}):</label>
            <input
              type="text"
              value={currentAuditBadge}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  auditBadge: {
                    ...p.auditBadge,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="ex: Revisão Contábil 2026"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Tempo de Leitura:</label>
            <input
              type="text"
              value={draft.readTime || ''}
              onChange={(e) => setDraft((p) => ({ ...p, readTime: e.target.value }))}
              placeholder="ex: 7 min"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>
        </div>
      </div>

      {/* 4. TARGET AUDIENCE, EDITORIAL TONE & FUNNEL STAGE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Compass className="w-4 h-4 text-purple-600" />
          <span>3. Segmentação: Público-Alvo, Tom Editorial & Funil ({editLang.toUpperCase()})</span>
        </h3>

        {/* Live Reader Preview of Badges Strip */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Público-Alvo</span>
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                {currentTargetAudienceLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Tom Editorial</span>
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                {currentCommunicationTone}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Funil de Intenção</span>
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                {currentFunnelStageLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Inputs for Audience, Tone and Funnel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-700">Rótulo do Público-Alvo:</label>
            <input
              type="text"
              value={currentTargetAudienceLabel}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  targetAudienceLabel: {
                    ...p.targetAudienceLabel,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="ex: Consumidores B2C"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
            <div className="flex gap-1 flex-wrap">
              {['Consumidores B2C', 'Empresas & RH B2B', 'Novos Imigrantes', 'Estudantes'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      targetAudienceLabel: { ...p.targetAudienceLabel, [editLang]: preset },
                    }))
                  }
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-700">Tom Editorial:</label>
            <input
              type="text"
              value={currentCommunicationTone}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  communicationTone: {
                    ...p.communicationTone,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="ex: Didático, Acolhedor & Prático"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
            <div className="flex gap-1 flex-wrap">
              {['Didático & Prático', 'Técnico & Focado em ROI', 'Direto & Jurídico'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      communicationTone: { ...p.communicationTone, [editLang]: preset },
                    }))
                  }
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-700">Rótulo do Funil de Intenção:</label>
            <input
              type="text"
              value={currentFunnelStageLabel}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  funnelStageLabel: {
                    ...p.funnelStageLabel,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="ex: Topo de Funil (Educação & Atração)"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
            <div className="flex gap-1 flex-wrap">
              {[
                { stage: 'topo' as const, label: 'Topo de Funil (Educação & Atração)' },
                { stage: 'meio' as const, label: 'Meio de Funil (Consideração Técnica)' },
                { stage: 'fundo' as const, label: 'Fundo de Funil (Ação & Conversão)' },
              ].map((f) => (
                <button
                  key={f.stage}
                  type="button"
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      funnelStage: f.stage,
                      funnelStageLabel: { ...p.funnelStageLabel, [editLang]: f.label },
                    }))
                  }
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 cursor-pointer"
                >
                  {f.stage.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. AUTHOR & EXPERT CREDIBILITY BOX (E-E-A-T) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>4. Caixa do Autor / Especialista (E-E-A-T & Autoridade)</span>
          </h3>

          <button
            type="button"
            onClick={() =>
              setDraft((p) => ({
                ...p,
                author: {
                  initials: 'JP',
                  name: 'Jean-Philippe Beaulieu, CPA auditeur',
                  role: 'Pôle d’Expertise Comptable & Fiscale PaieNet.qc · Membre de l’Ordre des CPA',
                  complianceSeal: 'Conforme aux barèmes ARC & Revenu Québec 2026',
                },
              }))
            }
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Autor Padrão (CPA)</span>
          </button>
        </div>

        {/* Live Reader Preview of Author Card */}
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              {currentAuthor.initials || 'JP'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900">{currentAuthor.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-[11px] text-slate-500 block">
                {currentAuthor.role}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 sm:text-right font-medium">
            {currentAuthor.complianceSeal}
          </div>
        </div>

        {/* Author Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Iniciais / Avatar:</label>
            <input
              type="text"
              maxLength={4}
              value={currentAuthor.initials}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  author: { ...currentAuthor, initials: e.target.value.toUpperCase() },
                }))
              }
              placeholder="JP"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome Completo & Título:</label>
            <input
              type="text"
              value={currentAuthor.name}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  author: { ...currentAuthor, name: e.target.value },
                }))
              }
              placeholder="ex: Jean-Philippe Beaulieu, CPA auditeur"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Cargo / Credencial Oficial:</label>
            <input
              type="text"
              value={currentAuthor.role}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  author: { ...currentAuthor, role: e.target.value },
                }))
              }
              placeholder="ex: Pôle d’Expertise Comptable & Fiscale PaieNet.qc · Membre de l’Ordre des CPA"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Selo de Conformidade:</label>
            <input
              type="text"
              value={currentAuthor.complianceSeal}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  author: { ...currentAuthor, complianceSeal: e.target.value },
                }))
              }
              placeholder="ex: Conforme aux barèmes ARC & Revenu Québec 2026"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>
        </div>
      </div>

      {/* 6. KEY TAKEAWAYS (DESTAQUES PRÁTICOS) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>5. Destaques Práticos (Key Takeaways no Topo do Artigo)</span>
          </h3>
          <span className="text-[11px] text-slate-500">
            Resumo executivo em tópicos
          </span>
        </div>

        <div className="space-y-2">
          {((draft.keyTakeaways?.[editLang] || draft.keyTakeaways?.pt) || [
            'Aplicação exata das retenções no holerite (RRQ, RQAP, AE e Impostos).',
            'Como aplicar o abatimento federal de 16,5% do Québec.',
            'Simuladores gratuitos disponíveis para calcular na prática.',
          ]).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updatedList = [...((draft.keyTakeaways?.[editLang] || draft.keyTakeaways?.pt) || [])];
                  updatedList[idx] = e.target.value;
                  setDraft((prev) => ({
                    ...prev,
                    keyTakeaways: {
                      ...prev.keyTakeaways,
                      [editLang]: updatedList,
                    },
                  }));
                }}
                className="w-full bg-transparent text-xs text-slate-800 font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedList = [...((draft.keyTakeaways?.[editLang] || draft.keyTakeaways?.pt) || [])];
                  updatedList.splice(idx, 1);
                  setDraft((prev) => ({
                    ...prev,
                    keyTakeaways: {
                      ...prev.keyTakeaways,
                      [editLang]: updatedList,
                    },
                  }));
                }}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Remover ponto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add Takeaway */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newTakeawayInput}
              onChange={(e) => setNewTakeawayInput(e.target.value)}
              placeholder="Adicionar novo ponto de destaque..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-blue-600"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTakeawayInput.trim()) {
                  const currentList = (draft.keyTakeaways?.[editLang] || draft.keyTakeaways?.pt) || [];
                  setDraft((prev) => ({
                    ...prev,
                    keyTakeaways: {
                      ...prev.keyTakeaways,
                      [editLang]: [...currentList, newTakeawayInput.trim()],
                    },
                  }));
                  setNewTakeawayInput('');
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (!newTakeawayInput.trim()) return;
                const currentList = (draft.keyTakeaways?.[editLang] || draft.keyTakeaways?.pt) || [];
                setDraft((prev) => ({
                  ...prev,
                  keyTakeaways: {
                    ...prev.keyTakeaways,
                    [editLang]: [...currentList, newTakeawayInput.trim()],
                  },
                }));
                setNewTakeawayInput('');
              }}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. ADVANCED WORDPRESS-STYLE PARAGRAPHS & RICH INLINE LINK INSERTION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>6. Parágrafos do Conteúdo & Inserção de Blocos ({editLang.toUpperCase()})</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Editor avançado estilo WordPress: escolha em qual parágrafo inserir elementos, formate títulos e caixas de destaque, e diferencie links de ferramentas (azul) de links externos (verde).
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddParagraph}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Novo Parágrafo</span>
          </button>
        </div>

        {/* Master WordPress Command Dock */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-md">
          {/* Paragraph Target Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-black text-slate-200">
                🎯 Parágrafo Alvo para Inserções:
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-slate-400">Escolha o parágrafo:</span>
              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                {currentParagraphs.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setActiveParagraphIndex(pIdx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeParagraphIndex === pIdx
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    #{pIdx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Block Formatting Buttons (WordPress Style) */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              1. Formatação de Texto & Blocos no Parágrafo #{activeParagraphIndex + 1}:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'bold')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
                title="Inserir texto em negrito"
              >
                <Bold className="w-3.5 h-3.5 text-amber-400" />
                <span>Negrito</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'italic')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
                title="Inserir texto em itálico"
              >
                <Italic className="w-3.5 h-3.5 text-purple-400" />
                <span>Itálico</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'h2')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
                title="Alternar subtítulo H2 (## )"
              >
                <Heading2 className="w-3.5 h-3.5 text-blue-400" />
                <span>H2 Subtítulo</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'h3')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
                title="Alternar subtópico H3 (### )"
              >
                <Heading3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>H3 Subtítulo</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'bullet')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
                title="Alternar item de lista (• )"
              >
                <List className="w-3.5 h-3.5 text-emerald-400" />
                <span>• Item de Lista</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'tip')}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/30 cursor-pointer flex items-center gap-1 transition-colors"
                title="Criar caixa de dica do especialista"
              >
                <span>💡</span>
                <span>Caixa Dica</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'alert')}
                className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold border border-rose-500/30 cursor-pointer flex items-center gap-1 transition-colors"
                title="Criar caixa de alerta fiscal"
              >
                <span>⚠️</span>
                <span>Caixa Alerta</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleBlockFormatAt(activeParagraphIndex, 'info')}
                className="px-2.5 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-bold border border-blue-500/30 cursor-pointer flex items-center gap-1 transition-colors"
                title="Criar caixa de informação oficial"
              >
                <span>ℹ️</span>
                <span>Caixa Info</span>
              </button>
            </div>
          </div>

          {/* 10 Internal Portal Tools - DISTINCT BLUE PILL BUTTONS */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>2. Ferramentas Integradas (Links Azuis Interativos) no Parágrafo #{activeParagraphIndex + 1}:</span>
              </span>
              <span className="text-[10px] text-slate-400">Abrem diretamente no portal</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
              {[
                { id: 'net-calc', label: 'Salário Líquido', desc: 'Contracheque' },
                { id: 'overtime', label: 'Horas Extras', desc: '1.5× CNESST' },
                { id: 'canada-provinces', label: '13 Províncias', desc: 'Comparativo' },
                { id: 'resume-builder', label: 'Currículo ATS', desc: 'Padrão Canadá' },
                { id: 'job-comparator', label: 'Comparar Vagas', desc: 'Ofertas' },
                { id: 'raise-simulator', label: 'Simular Aumento', desc: 'Margem Líquida' },
                { id: 'quebec-benefits', label: 'Benefícios QC', desc: 'RRQ & RQAP' },
                { id: 'resume-optimizer', label: 'Otimizar CV', desc: 'IA Compatibilidade' },
                { id: 'interview-simulator', label: 'Entrevistas', desc: 'Simulação AI' },
                { id: 'tech-tests', label: 'Testes Tech', desc: 'Desafios Práticos' },
              ].map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleInsertToolLinkAt(activeParagraphIndex, tool.id, tool.label)}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white font-bold text-xs border border-blue-500/40 text-left transition-all cursor-pointer flex flex-col group shadow-2xs"
                >
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-400 group-hover:text-white" />
                    <span className="truncate">{tool.label}</span>
                  </span>
                  <span className="text-[9px] text-blue-300/80 group-hover:text-blue-100 font-normal">
                    {tool.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Official External References - DISTINCT EMERALD GREEN PILL BUTTONS */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                <span>3. Referências Externas Oficiais (Links Verdes Esmeralda) no Parágrafo #{activeParagraphIndex + 1}:</span>
              </span>
              <span className="text-[10px] text-slate-400">Links para fontes oficiais</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleInsertExternalLinkPromptAt(
                    activeParagraphIndex,
                    'https://www.revenuquebec.ca/fr/entreprises/retenues-a-la-source-et-cotisations-de-lemployeur/',
                    'Revenu Québec - Barèmes Officiels'
                  )
                }
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white font-bold text-xs border border-emerald-500/40 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>🏛️</span>
                <span>+ Revenu Québec</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleInsertExternalLinkPromptAt(
                    activeParagraphIndex,
                    'https://www.canada.ca/fr/agence-revenu.html',
                    'Agence du revenu du Canada (ARC)'
                  )
                }
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white font-bold text-xs border border-emerald-500/40 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>🇨🇦</span>
                <span>+ ARC / CRA</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleInsertExternalLinkPromptAt(
                    activeParagraphIndex,
                    'https://www.cnesst.gouv.qc.ca/fr/conditions-travail/salaire-paie/salaire/heures-supplementaires',
                    'CNESST - Normes du travail'
                  )
                }
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white font-bold text-xs border border-emerald-500/40 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>🛡️</span>
                <span>+ CNESST Normas</span>
              </button>

              <button
                type="button"
                onClick={() => handleInsertExternalLinkPromptAt(activeParagraphIndex)}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Qualquer Outro Link Externo (URL)...</span>
              </button>
            </div>
          </div>
        </div>

        {/* List of Paragraph Cards with In-Card Action Bars and Real-Time Previews */}
        <div className="space-y-4 pt-1">
          {currentParagraphs.map((para, idx) => {
            const isTarget = activeParagraphIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveParagraphIndex(idx)}
                className={`p-4 sm:p-5 rounded-3xl border transition-all ${
                  isTarget
                    ? 'bg-blue-50/40 border-blue-400 shadow-md ring-2 ring-blue-400/40'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Paragraph Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg font-mono text-xs font-black flex items-center justify-center ${
                        isTarget ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-slate-800">
                      Parágrafo #{idx + 1}
                    </span>
                    {isTarget && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                        🎯 Alvo Selecionado
                      </span>
                    )}
                  </div>

                  {/* Per-Paragraph Actions: In-Card Quick Tools and Reordering */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Quick Tool Inserter Dropdown for THIS specific paragraph */}
                    <div className="relative inline-block">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            const [toolId, label] = e.target.value.split('|');
                            handleInsertToolLinkAt(idx, toolId, label);
                            e.target.value = '';
                          }
                        }}
                        defaultValue=""
                        className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-[11px] font-bold cursor-pointer transition-colors"
                        title="Inserir ferramenta diretamente neste parágrafo"
                      >
                        <option value="" disabled>
                          ⚡ + Ferramenta...
                        </option>
                        <option value="net-calc|Salário Líquido">Salário Líquido</option>
                        <option value="overtime|Horas Extras CNESST">Horas Extras</option>
                        <option value="canada-provinces|13 Províncias">13 Províncias</option>
                        <option value="resume-builder|Currículo ATS">Currículo ATS</option>
                        <option value="job-comparator|Comparador Ofertas">Comparador Ofertas</option>
                        <option value="raise-simulator|Simular Aumento">Simular Aumento</option>
                        <option value="quebec-benefits|Benefícios QC">Benefícios QC</option>
                        <option value="resume-optimizer|Otimizador CV">Otimizador CV</option>
                        <option value="interview-simulator|Simulador Entrevista">Simulador Entrevista</option>
                        <option value="tech-tests|Testes Tech">Testes Tech</option>
                      </select>
                    </div>

                    {/* Quick External Link for THIS specific paragraph */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInsertExternalLinkPromptAt(idx);
                      }}
                      className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                      title="Inserir link externo neste parágrafo"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>+ Link Ext</span>
                    </button>

                    {/* Quick formatting buttons for THIS paragraph */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBlockFormatAt(idx, 'bold');
                      }}
                      className="p-1 rounded-md text-slate-600 hover:bg-slate-100 cursor-pointer font-bold"
                      title="Inserir termo em negrito"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBlockFormatAt(idx, 'bullet');
                      }}
                      className="p-1 rounded-md text-slate-600 hover:bg-slate-100 cursor-pointer"
                      title="Alternar marcador de lista"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBlockFormatAt(idx, 'tip');
                      }}
                      className="p-1 rounded-md text-amber-600 hover:bg-amber-50 cursor-pointer text-xs"
                      title="Alternar caixa de dica"
                    >
                      💡
                    </button>

                    <span className="text-slate-200 mx-0.5">|</span>

                    {/* Move Up */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveParagraph(idx, 'up');
                      }}
                      disabled={idx === 0}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer hover:bg-slate-100"
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveParagraph(idx, 'down');
                      }}
                      disabled={idx === currentParagraphs.length - 1}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer hover:bg-slate-100"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveParagraph(idx);
                      }}
                      disabled={currentParagraphs.length <= 1}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 disabled:opacity-30 cursor-pointer hover:bg-rose-50"
                      title="Remover parágrafo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Textarea for Editing the Paragraph */}
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                  placeholder="Escreva o texto deste parágrafo... Dica: use ## para subtítulos, • para tópicos ou [Nome do Link](#ferramenta) para links."
                  className="w-full text-xs sm:text-sm text-slate-800 leading-relaxed font-normal bg-transparent focus:outline-none resize-y py-1"
                />

                {/* Real-time Rendered Visual Preview of this Block */}
                <div className="mt-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1">
                    <span className="font-semibold uppercase tracking-wider">
                      Pré-visualização em tempo real (como o leitor verá):
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Azul = Ferramenta · Verde = Link Externo
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 min-h-[32px] flex items-center">
                    {renderInlinePreview(para)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. IN-ARTICLE DETAIL IMAGE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                7. Imagem Ilustrativa no Meio do Artigo
              </h3>
              <p className="text-[11px] text-slate-500">
                Foto ou gráfico explicativo posicionado estrategicamente entre os tópicos.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setImagePickerTarget('detailImageUrl');
              setIsImagePickerOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all border border-blue-200 cursor-pointer flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Alterar Imagem do Meio</span>
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-72 bg-slate-100 border border-slate-200 relative">
          <img
            src={draft.detailImageUrl || `https://picsum.photos/seed/${draft.id}-detail/1000/500`}
            alt="Ilustração do artigo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 9. RECOMMENDED TOOLS STRIP (⚡ FERRAMENTAS OFICIAIS RECOMENDADAS NO PAIENET) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                8. Faixa de Ferramentas Oficiais Recomendadas no PaieNet
              </h3>
              <p className="text-[11px] text-slate-500">
                A faixa escura que apresenta 4 ferramentas práticas diretamente para o leitor.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setDraft((p) => ({
                ...p,
                recommendedTools: [
                  { toolId: 'net-calc', title: 'Salário Líquido', subtitle: 'Cálculo oficial' },
                  { toolId: 'overtime', title: 'Horas Extras', subtitle: '1.5× CNESST' },
                  { toolId: 'canada-provinces', title: '13 Províncias', subtitle: 'Comparativo' },
                  { toolId: 'resume-builder', title: 'Gerador de CV', subtitle: 'ATS Canadá' },
                ],
              }))
            }
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar 4 Ferramentas Padrão</span>
          </button>
        </div>

        {/* Live Reader Preview of the Tools Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span className="font-extrabold text-xs sm:text-sm">
                {currentToolsStripTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
              100% Gratuito
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            {currentRecommendedTools.map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-800 text-left">
                <span className="font-bold block text-white">{t.title}</span>
                <span className="text-[10px] text-slate-400">{t.subtitle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Strip Title Input */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Título da Faixa de Ferramentas ({editLang}):</label>
          <input
            type="text"
            value={currentToolsStripTitle}
            onChange={(e) =>
              setDraft((p) => ({
                ...p,
                toolsStripTitle: {
                  ...p.toolsStripTitle,
                  [editLang]: e.target.value,
                },
              }))
            }
            placeholder="⚡ Ferramentas Oficiais Recomendadas no PaieNet:"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
          />
        </div>

        {/* Edit Each of the 4 Tool Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {currentRecommendedTools.map((toolSlot, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider block">
                Ferramenta #{idx + 1}
              </span>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-600">Ferramenta:</label>
                <select
                  value={toolSlot.toolId}
                  onChange={(e) => {
                    const list = [...currentRecommendedTools];
                    list[idx] = { ...list[idx], toolId: e.target.value as ToolId };
                    setDraft((p) => ({ ...p, recommendedTools: list }));
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                >
                  {availableTools.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Título no Botão:</label>
                  <input
                    type="text"
                    value={toolSlot.title}
                    onChange={(e) => {
                      const list = [...currentRecommendedTools];
                      list[idx] = { ...list[idx], title: e.target.value };
                      setDraft((p) => ({ ...p, recommendedTools: list }));
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Subtítulo no Botão:</label>
                  <input
                    type="text"
                    value={toolSlot.subtitle}
                    onChange={(e) => {
                      const list = [...currentRecommendedTools];
                      list[idx] = { ...list[idx], subtitle: e.target.value };
                      setDraft((p) => ({ ...p, recommendedTools: list }));
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. CONTEXTUAL CALL TO ACTION (CTA) BOX */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span>9. Caixa de Chamada para Ação (CTA) Contextual ({editLang.toUpperCase()})</span>
        </h3>

        {/* Live Reader Preview of CTA Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentCtaHeadline}</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              {currentCtaToolLabel}
            </h4>
          </div>

          <div className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-sm flex items-center gap-2 shrink-0">
            <span>{currentCtaButtonText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* CTA Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Headline / Kicker:</label>
            <input
              type="text"
              value={currentCtaHeadline}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  ctaHeadline: {
                    ...p.ctaHeadline,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="⚡ Ferramenta Prática Recomendada para este Caso:"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Título da Oferta / Chamada:</label>
            <input
              type="text"
              value={currentCtaToolLabel}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  ctaToolLabel: {
                    ...p.ctaToolLabel,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="ex: Ver na Calculadora ou Testar meu Salário"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Ferramenta de Destino:</label>
            <select
              value={draft.ctaTool || 'net-calc'}
              onChange={(e) => setDraft((p) => ({ ...p, ctaTool: e.target.value as ToolId }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            >
              {availableTools.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Texto do Botão:</label>
            <input
              type="text"
              value={currentCtaButtonText}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  ctaButtonText: {
                    ...p.ctaButtonText,
                    [editLang]: e.target.value,
                  },
                }))
              }
              placeholder="ex: Abrir Ferramenta Grátis"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Big Final Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {draft.published ? '✓ O artigo ficará visível publicamente no portal.' : '✓ O artigo ficará salvo como rascunho privado.'}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Artigo Agora</span>
            </button>
          </div>
        </div>
      </div>

      {/* 11. IMAGE PICKER & MANAGER MODAL */}
      {isImagePickerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Seletor de Foto & Imagens do Québec
                  </h3>
                  <p className="text-xs text-slate-500">
                    Escolha de onde virá a imagem: presets curados, URL externa ou upload local.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImagePickerOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option A: Upload Local Image from Device */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
              <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-purple-600" />
                <span>Opção 1: Fazer Upload do Seu Computador</span>
              </span>
              <p className="text-[11px] text-slate-600">
                Selecione um arquivo PNG ou JPG do seu dispositivo. Ele será salvo diretamente no artigo.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalImageUpload}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer"
              />
            </div>

            {/* Option B: Enter Direct Web URL */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Opção 2: Colar URL de Imagem da Web</span>
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrlInput}
                  onChange={(e) => setCustomImageUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0"
                >
                  Aplicar URL
                </button>
              </div>
            </div>

            {/* Option C: Curated 10 Quebec Stock Photos Gallery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Opção 3: Galeria Curada de Fotos de Montréal & Québec</span>
                </span>
                <span className="text-[10px] text-slate-400">10 Presets HD</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUEBEC_PHOTO_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPresetPhoto(preset.url)}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-purple-500 cursor-pointer transition-all shadow-2xs hover:shadow-md aspect-[16/10]"
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                      <span className="text-[10px] font-bold line-clamp-1 block leading-tight">
                        {preset.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
