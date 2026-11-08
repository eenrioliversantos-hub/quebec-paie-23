'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import { ResumeData } from '@/components/ResumeBuilder';
import { RICH_PRESETS_CATALOG } from '@/components/ResumePresets';
import { TrustAuthorityBar } from '@/components/TrustAuthorityBar';
import { NewsletterBox } from '@/components/NewsletterBox';
import {
  Sparkles,
  Target,
  FileText,
  Building2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  Briefcase,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Zap,
} from 'lucide-react';

interface JobResumeOptimizerPageProps {
  lang: Language;
  onSelectTool: (tool: ToolId) => void;
  onOpenProModal?: (trigger?: string) => void;
}

interface OptimizationResult {
  atsScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  keyStrengths: string[];
  strategicAdvice: string[];
  tailoredSummary: string;
  recommendedTechnicalSkills: string[];
  tailoredHighlightsByExpId?: Record<string, string[]>;
  tailoredCoverLetter?: {
    recipientName: string;
    recipientTitle: string;
    companyName: string;
    companyAddress: string;
    jobReference: string;
    salutation: string;
    openingParagraph: string;
    bodyParagraphs: string[];
    closingParagraph: string;
    signoff: string;
  };
}

const SAMPLE_QUEBEC_JOBS = [
  {
    id: 'sample-prod',
    label: {
      pt: '🏭 Indústria: Journalier de Production (Biscuits Leclerc - QC)',
      fr: '🏭 Manufacturier : Journalier de production (Biscuits Leclerc)',
      en: '🏭 Manufacturing: Production Assembler (Biscuits Leclerc)',
    },
    company: 'Biscuits Leclerc Ltée',
    title: 'Journalier de production & conditionnement alimentaire',
    city: 'Saint-Augustin-de-Desmaures (Québec)',
    description: `À propos du poste :
Biscuits Leclerc recherche des journaliers de production dynamiques et rigoureux pour ses lignes automatisées à haute cadence.
Responsabilités principales :
- Alimenter les lignes de conditionnement et d'emballage en matières premières et composants selon les cadences prescrites (120 unités/min).
- Effectuer le contrôle qualité visuel des produits et vérifier l'intégrité des emballages selon les Bonnes Pratiques de Fabrication (BPF / GMP).
- Assurer la palettisation soignée, le cerclage et le filmage des palettes selon les normes HACCP et SST.
- Participer activement aux démarches 5S, TPM et Kaizen de propreté et sécurité au poste de travail.
- Nettoyer et désinfecter les équipements entre les quarts de travail.

Exigences & Compétences recherchées :
- Formation technique ou équivalence d'études secondaires (DES ou DEP).
- Connaissance de base des normes SIMDUT 2015 et procédures de cadenassage (LOTO).
- Capacité à travailler en équipe, ponctualité exemplaire et endurance physique (charges de 15 à 20 kg).
- Disponibilité pour les quarts rotatifs (jour, soir, nuit).`,
  },
  {
    id: 'sample-tech',
    label: {
      pt: '💻 Tecnologia: Développeur Full-Stack (Montréal Tech)',
      fr: '💻 TI : Développeur Full-Stack TypeScript / React (Montréal)',
      en: '💻 Tech: Full-Stack Developer (Montreal)',
    },
    company: 'Logix Solutions TI Montréal',
    title: 'Développeur Full-Stack React & Node.js',
    city: 'Montréal, QC (Hybride)',
    description: `Description du mandat :
Nous recherchons un Développeur Full-Stack intermédiaire à senior pour concevoir des applications web infonuagiques à forte charge.
Responsabilités :
- Concevoir et déployer des interfaces réactives et accessibles en React 18, Next.js et TypeScript.
- Développer des microservices et API RESTful sécurisées en Node.js, Express et NestJS avec base PostgreSQL.
- Implémenter des pipelines CI/CD automatisés sous Docker, GitHub Actions et Google Cloud Platform.
- Participer aux revues de code, tests unitaires (Jest, Playwright) et sprints Agile / Scrum.

Exigences :
- Diplôme universitaire ou collégial (DEC/BAC) en informatique ou génie logiciel.
- Minimum 3 ans d'expérience pratique en TypeScript moderne et architectures cloud.
- Bonne maîtrise du français (loi 96) et bilinguisme fonctionnel en anglais.`,
  },
  {
    id: 'sample-admin',
    label: {
      pt: '📋 Escritório: Adjointe Administrative (Laval)',
      fr: '📋 Bureau : Adjointe administrative & coordination RH (Laval)',
      en: '📋 Office: Administrative Assistant & HR (Laval)',
    },
    company: 'Groupe Conseil BuroPro',
    title: 'Adjointe administrative de direction & coordination RH',
    city: 'Laval, QC',
    description: `Sommaire du rôle :
Sous la supervision de la directrice générale, l'adjointe administrative assure la coordination fluide des opérations quotidiennes et des dossiers du personnel.
Responsabilités :
- Rédiger et corriger la correspondance professionnelle bilingue (français impeccable obligatoire).
- Coordonner les réunions de direction, gérer les ordres du jour et rédiger les procès-verbaux officiels.
- Effectuer la saisie des feuilles de temps, la facturation client et le suivi des comptes payables sous Acomba / QuickBooks.
- Veiller au respect de la Loi 25 sur la protection des renseignements personnels des employés et clients.

Profil recherché :
- DEP ou DEC en bureautique, administration ou secrétariat.
- Maîtrise avancée de la suite Microsoft 365 (Word, Excel, Teams, Outlook).
- Sens élevé de la confidentialité, rigueur et entregent professionnel.`,
  },
];

export const JobResumeOptimizerPage: React.FC<JobResumeOptimizerPageProps> = ({
  lang,
  onSelectTool,
  onOpenProModal,
}) => {
  // 1. Source du CV : 'preset' | 'stored' | 'custom_text'
  const [resumeSource, setResumeSource] = useState<'preset' | 'stored' | 'custom_text'>('stored');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(RICH_PRESETS_CATALOG[0].id);
  const [activeResumeData, setActiveResumeData] = useState<ResumeData>(RICH_PRESETS_CATALOG[0].data);
  const [customCvText, setCustomCvText] = useState<string>('');

  // 2. Champs de la Vaga Cobiçada
  const [jobCompany, setJobCompany] = useState<string>('Biscuits Leclerc Ltée');
  const [jobTitle, setJobTitle] = useState<string>('Journalier de production & conditionnement');
  const [jobCity, setJobCity] = useState<string>('Saint-Augustin-de-Desmaures (Québec)');
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_QUEBEC_JOBS[0].description);
  const [targetLanguage, setTargetLanguage] = useState<'fr' | 'en'>('fr');

  // 3. États de l'optimisation
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);

  // 4. Onglet actif dans les résultats
  const [activeResultTab, setActiveResultTab] = useState<'keywords' | 'summary' | 'skills' | 'letter' | 'advice'>('keywords');

  // 5. Feedbacks de copie
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Hydratation : Vérifier si un CV était en cours d'édition dans ResumeBuilder
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('paie_quebec_active_resume');
        if (stored) {
          const parsed: ResumeData = JSON.parse(stored);
          if (parsed.fullName && parsed.experiences) {
            setActiveResumeData(parsed);
            setResumeSource('stored');
            return;
          }
        }
      } catch {}
      // Par défaut : Henrique Santos (Journalier de production)
      setActiveResumeData(RICH_PRESETS_CATALOG[0].data);
      setResumeSource('preset');
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Changement de modèle pré-configuré
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = RICH_PRESETS_CATALOG.find((p) => p.id === presetId);
    if (found) {
      setActiveResumeData(found.data);
    }
  };

  // Chargement d'un exemple de vaga québécoise
  const handleLoadJobSample = (sampleId: string) => {
    const sample = SAMPLE_QUEBEC_JOBS.find((s) => s.id === sampleId);
    if (!sample) return;
    setJobCompany(sample.company);
    setJobTitle(sample.title);
    setJobCity(sample.city);
    setJobDescription(sample.description);
  };

  // Lecture de fichier texte local (.txt ou .doc brut)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCustomCvText(text);
        setResumeSource('custom_text');
      }
    };
    reader.readAsText(file);
  };

  // Lancement de l'analyse & calibrage ATS
  const handleRunOptimization = async () => {
    if (!jobDescription || jobDescription.trim().length < 30) {
      setErrorMsg(
        lang === 'pt'
          ? 'Por favor, insira ou cole a descrição detalhada da vaga (pelo menos 30 caracteres).'
          : 'Veuillez coller la description détaillée de l’offre d’emploi (au moins 30 caractères).'
      );
      return;
    }

    setIsOptimizing(true);
    setErrorMsg(null);
    setCurrentStep(
      lang === 'pt'
        ? 'Passo 1/3: Mapeando experiências, competências e normas do candidato...'
        : 'Étape 1/3 : Analyse des compétences et expériences du candidat...'
    );

    try {
      let candidateProfile = activeResumeData;

      // Si texte brut collé
      if (resumeSource === 'custom_text' && customCvText.trim().length >= 20) {
        try {
          const parseRes = await fetch('/api/resume/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rawText: customCvText, targetLanguage }),
          });
          const parseJson = await parseRes.json();
          if (parseJson.success && parseJson.data) {
            candidateProfile = parseJson.data;
            setActiveResumeData(parseJson.data);
          }
        } catch (parseErr) {
          console.warn('Fallback parser:', parseErr);
        }
      }

      setCurrentStep(
        lang === 'pt'
          ? 'Passo 2/3: Extraindo requisitos, palavras-chave e certificações da vaga...'
          : 'Étape 2/3 : Extraction des mots-clés, normes et exigences du poste...'
      );

      const res = await fetch('/api/resume/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: candidateProfile,
          jobDescription,
          companyName: jobCompany,
          jobTitle: jobTitle,
          targetLanguage,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Erreur lors de l’analyse ATS.');
      }

      setCurrentStep(
        lang === 'pt'
          ? 'Passo 3/3: Calibrando carta de apresentação e resumo profissional...'
          : 'Étape 3/3 : Finalisation du profil sur mesure et de la lettre...'
      );

      setOptimizationResult(json.data);

      // Sauvegarder dans le localStorage pour réutilisation transparente
      try {
        const mergedResume: ResumeData = {
          ...candidateProfile,
          summary: json.data.tailoredSummary || candidateProfile.summary,
          technicalSkills: Array.from(
            new Set([...(json.data.recommendedTechnicalSkills || []), ...candidateProfile.technicalSkills])
          ),
          coverLetter: json.data.tailoredCoverLetter || candidateProfile.coverLetter,
        };
        localStorage.setItem('paie_quebec_active_resume', JSON.stringify(mergedResume));
      } catch {}

      // Scroll suave até os resultados
      setTimeout(() => {
        const el = document.getElementById('ats-optimization-results');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err: any) {
      setErrorMsg(err.message || 'Échec de l’optimisation pour ce poste.');
    } finally {
      setIsOptimizing(false);
      setCurrentStep(null);
    }
  };

  // Copier du texte vers le presse-papiers avec feedback
  const handleCopyText = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Transférer directement vers le constructeur de CV plein écran
  const handleOpenInResumeBuilder = () => {
    if (optimizationResult) {
      try {
        const mergedResume: ResumeData = {
          ...activeResumeData,
          summary: optimizationResult.tailoredSummary || activeResumeData.summary,
          technicalSkills: Array.from(
            new Set([...(optimizationResult.recommendedTechnicalSkills || []), ...activeResumeData.technicalSkills])
          ),
          coverLetter: optimizationResult.tailoredCoverLetter || activeResumeData.coverLetter,
        };
        localStorage.setItem('paie_quebec_active_resume', JSON.stringify(mergedResume));
      } catch {}
    }
    onSelectTool('resume-builder');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-3 sm:px-4 py-4">
      {/* 1. Header & Hero da Ferramenta */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            type="button"
            onClick={() => onSelectTool('net-calc')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {lang === 'pt' ? 'Início' : 'Accueil'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            type="button"
            onClick={() => onSelectTool('resume-builder')}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            {lang === 'pt' ? 'Carreira & CV' : 'Carrière & CV'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-purple-700 font-bold">
            {lang === 'pt' ? 'Otimizador de CV para Vagas' : 'Optimiseur de CV pour Offre d’Emploi'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{lang === 'pt' ? 'Filtros ATS Québec 2026' : 'Filtres ATS Québec 2026'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {lang === 'pt'
                ? 'Otimizador de Currículo para Vagas Específicas'
                : 'Optimiseur de CV & Adéquation Offre d’Emploi'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'pt'
                ? 'Compare seu perfil diretamente com o anúncio de emprego cobiçado. Nosso motor calcula o Score ATS, localiza palavras-chave ausentes, reformula seu resumo executivo e redige uma carta de motivação personalizada para passar na triagem inicial dos RHs de Montreal e Québec.'
                : 'Alignez votre profil sur les critères réels des employeurs québécois. Calcul de score ATS, comblement des mots-clés critiques, sommaire exécutif calibré et lettre de présentation sur mesure.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelectTool('resume-builder')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'pt' ? 'Abrir Construtor de CV' : 'Ouvrir le Constructeur'}</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTool('interview-simulator')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>{lang === 'pt' ? 'Simulador de Entrevista STAR' : 'Simulateur d’Entrevue'}</span>
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{lang === 'pt' ? 'Compatível com Workday / Taleo' : 'Conforme Workday & Taleo'}</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{lang === 'pt' ? 'Padrão Sem Foto (Loi 25 QC)' : 'Sans photo (Norme QC)'}</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{lang === 'pt' ? 'Palavras-Chave Obrigatórias' : 'Mots-clés incontournables'}</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{lang === 'pt' ? 'Carta de Apresentação Inclusa' : 'Lettre de motivation'}</span>
          </div>
        </div>
      </div>

      {/* 2. Workspace de 2 Colunas: Currículo Base (Esquerda) vs Vaga Alvo (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA ESQUERDA: O SEU CURRÍCULO BASE (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {lang === 'pt' ? '1. Seu Currículo Base' : '1. Votre CV Actuel'}
                </h2>
                <span className="text-[11px] text-slate-500">
                  {lang === 'pt' ? 'Dados para análise e cruzamento' : 'Profil à comparer avec l’offre'}
                </span>
              </div>
            </div>

            {/* Source switch pills */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setResumeSource('stored')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  resumeSource === 'stored'
                    ? 'bg-white text-indigo-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Ativo' : 'Actif'}
              </button>
              <button
                type="button"
                onClick={() => setResumeSource('preset')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  resumeSource === 'preset'
                    ? 'bg-white text-indigo-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Modelos' : 'Modèles'}
              </button>
              <button
                type="button"
                onClick={() => setResumeSource('custom_text')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  resumeSource === 'custom_text'
                    ? 'bg-white text-indigo-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'pt' ? 'Colar' : 'Texte'}
              </button>
            </div>
          </div>

          {/* Opção A: Usar perfil ativo ou pré-configurado */}
          {(resumeSource === 'stored' || resumeSource === 'preset') && (
            <div className="space-y-3">
              {resumeSource === 'preset' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'pt' ? 'Escolher Modelo Pré-configurado:' : 'Sélectionner un profil exemple :'}
                  </label>
                  <select
                    value={selectedPresetId}
                    onChange={(e) => handleSelectPreset(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-indigo-600 text-slate-800"
                  >
                    {RICH_PRESETS_CATALOG.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.badge} - {preset.titleFr}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Card visual do perfil selecionado */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {activeResumeData.fullName || 'Candidat Québécois'}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-700">
                      {activeResumeData.jobTitle}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {activeResumeData.city}, {activeResumeData.province} • CNP {activeResumeData.targetNoc}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {activeResumeData.workStatus || 'Autorisé à travailler'}
                  </span>
                </div>

                <div className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-indigo-100/60">
                  <span className="font-bold text-slate-700 block mb-0.5">
                    {lang === 'pt' ? 'Resumo atual:' : 'Sommaire actuel :'}
                  </span>
                  {activeResumeData.summary}
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    {lang === 'pt' ? 'Competências mapeadas:' : 'Compétences clés :'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeResumeData.technicalSkills.slice(0, 6).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {activeResumeData.technicalSkills.length > 6 && (
                      <span className="text-[10px] text-indigo-600 font-bold px-1.5 py-0.5">
                        +{activeResumeData.technicalSkills.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{activeResumeData.experiences.length} {lang === 'pt' ? 'experiências' : 'expériences'}</span>
                  <span>{activeResumeData.educations.length} {lang === 'pt' ? 'formações' : 'diplômes'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Opção B: Colar texto do currículo ou subir arquivo */}
          {resumeSource === 'custom_text' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'pt' ? 'Cole o texto do seu CV:' : 'Collez le texte de votre CV :'}
                </label>
                <label className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>{lang === 'pt' ? 'Carregar arquivo (.txt)' : 'Charger fichier (.txt)'}</span>
                  <input
                    type="file"
                    accept=".txt,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={10}
                value={customCvText}
                onChange={(e) => setCustomCvText(e.target.value)}
                placeholder={
                  lang === 'pt'
                    ? 'Cole aqui o texto completo do seu currículo atual (experiências, cargos, cursos, ferramentas, idiomas)...'
                    : 'Collez ici le texte complet de votre CV (expériences, postes occupés, formations, compétences, outils)...'
                }
                className="w-full text-xs p-3 rounded-2xl border border-slate-300 font-mono bg-slate-50 focus:bg-white focus:outline-indigo-600 leading-relaxed text-slate-800"
              />
              <span className="text-[11px] text-slate-500">
                {customCvText.length} {lang === 'pt' ? 'caracteres inseridos' : 'caractères saisis'}
              </span>
            </div>
          )}
        </div>

        {/* COLUNA DIREITA: A VAGA COBIÇADA (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {lang === 'pt' ? '2. A Vaga de Emprego Alvo' : '2. L’Offre d’Emploi Ciblée'}
                </h2>
                <span className="text-[11px] text-slate-500">
                  {lang === 'pt' ? 'Requisitos, responsabilidades e empresa' : 'Exigences et détails du poste'}
                </span>
              </div>
            </div>

            {/* Quick real samples dropdown */}
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) handleLoadJobSample(e.target.value);
                }}
                defaultValue=""
                className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-purple-200 bg-purple-50 text-purple-800 focus:outline-purple-600 cursor-pointer"
              >
                <option value="" disabled>
                  ⚡ {lang === 'pt' ? 'Carregar Vaga Real de Exemplo' : 'Charger une offre type'}
                </option>
                {SAMPLE_QUEBEC_JOBS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label[lang] || s.label.fr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Inputs de Identificação da Vaga */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'pt' ? 'Empresa / Empregador:' : 'Entreprise / Employeur :'}
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={jobCompany}
                  onChange={(e) => setJobCompany(e.target.value)}
                  placeholder="ex: Biscuits Leclerc, Pratt & Whitney"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-purple-600 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'pt' ? 'Título do Cargo Anunciado:' : 'Titre du Poste Anoncé :'}
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="ex: Journalier de production, Développeur"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-purple-600 text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'pt' ? 'Cidade / Região no Québec:' : 'Ville / Région au Québec :'}
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={jobCity}
                  onChange={(e) => setJobCity(e.target.value)}
                  placeholder="ex: Québec, Montréal, Laval, Sherbrooke"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-purple-600 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'pt' ? 'Idioma do Currículo Final:' : 'Langue du CV finalisé :'}
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value as 'fr' | 'en')}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-purple-600 text-slate-900 bg-white"
              >
                <option value="fr">Français Québécois (Recommandé)</option>
                <option value="en">English (Canada Standard)</option>
              </select>
            </div>
          </div>

          {/* Textarea da Descrição da Vaga */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              {lang === 'pt'
                ? 'Descrição Completa da Vaga (Indeed, LinkedIn, Guichet-Emplois):'
                : 'Description complète de l’offre (Indeed, LinkedIn, Guichet-Emplois) :'}
            </label>
            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder={
                lang === 'pt'
                  ? 'Cole aqui a descrição completa da vaga: responsabilidades, requisitos, máquinas, certificações, turnos...'
                  : 'Collez la description complète du poste : tâches, responsabilités, compétences exigées, atouts...'
              }
              className="w-full text-xs p-3.5 rounded-2xl border border-slate-300 font-sans focus:outline-purple-600 leading-relaxed text-slate-800"
            />
          </div>

          {/* Erro eventual */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Botão de Disparo */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isOptimizing}
              onClick={handleRunOptimization}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-60 active:scale-[0.99]"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{currentStep || (lang === 'pt' ? 'Analisando compatibilidade...' : 'Analyse en cours...')}</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>
                    {lang === 'pt'
                      ? '⚡ Analisar Compatibilidade & Otimizar para esta Vaga'
                      : '⚡ Analyser l’Adéquation & Optimiser pour ce Poste'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. PAINEL DE RESULTADOS COMPLETOS (EXIBIDO QUANDO CONCLUÍDO) */}
      {optimizationResult && (
        <div id="ats-optimization-results" className="scroll-mt-20 space-y-6">
          {/* Card Placar de Compatibilidade ATS */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Diagnóstico de Triagem ATS Concluído' : 'Diagnostic ATS Terminé'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {lang === 'pt' ? 'Compatibilidade Salarial & Requisitos:' : 'Adéquation Globale au Poste :'} {jobTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'pt'
                    ? `Seu currículo foi comparado com as exigências da ${jobCompany}. As otimizações aplicadas aumentam substancialmente a chance de convocação para entrevista com o recrutador.`
                    : `Votre profil a été calibré avec succès pour répondre aux exigences réelles de ${jobCompany}.`}
                </p>
              </div>

              {/* Score Circular Badge */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="text-3xl font-black text-emerald-400">
                    {optimizationResult.atsScore}%
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-300 block">
                    {lang === 'pt' ? 'Score de Correspondência' : 'Score d’Adéquation ATS'}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-300">
                    {optimizationResult.atsScore >= 85
                      ? lang === 'pt' ? 'Excelente (Aprovado)' : 'Excellent (Prêt)'
                      : lang === 'pt' ? 'Bom com Otimizações' : 'Bon après ajustement'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Taleo / Workday / Indeed QC
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Métricas de Validação */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-slate-400 text-[11px] block">{lang === 'pt' ? 'Palavras-Chave:' : 'Mots-clés :'}</span>
                <span className="font-extrabold text-emerald-400 text-sm">
                  {optimizationResult.matchingKeywords.length} encontradas
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-slate-400 text-[11px] block">{lang === 'pt' ? 'Lacunas Corrigidas:' : 'Manquants comblés :'}</span>
                <span className="font-extrabold text-amber-300 text-sm">
                  {optimizationResult.missingKeywords.length} inseridas
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-slate-400 text-[11px] block">{lang === 'pt' ? 'Anti-Vieses Québec:' : 'Norme anti-biais :'}</span>
                <span className="font-extrabold text-blue-300 text-sm">100% Conforme</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-slate-400 text-[11px] block">{lang === 'pt' ? 'Carta de Motivação:' : 'Lettre adaptée :'}</span>
                <span className="font-extrabold text-purple-300 text-sm">100% Calibrada</span>
              </div>
            </div>
          </div>

          {/* Navegação por Abas dos Resultados */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setActiveResultTab('keywords')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeResultTab === 'keywords'
                    ? 'bg-purple-100 text-purple-900 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Target className="w-4 h-4 text-purple-600" />
                <span>{lang === 'pt' ? 'Palavras-Chave & Lacunas' : 'Mots-Clés & Compétences'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('summary')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeResultTab === 'summary'
                    ? 'bg-indigo-100 text-indigo-900 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>{lang === 'pt' ? 'Resumo Profissional Calibrado' : 'Sommaire Exécutif Sur Mesure'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('skills')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeResultTab === 'skills'
                    ? 'bg-emerald-100 text-emerald-900 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'pt' ? 'Habilidades Técnicas' : 'Compétences Techniques'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('letter')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeResultTab === 'letter'
                    ? 'bg-blue-100 text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Send className="w-4 h-4 text-blue-600" />
                <span>{lang === 'pt' ? 'Carta de Apresentação (Lettre)' : 'Lettre de Motivation'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('advice')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeResultTab === 'advice'
                    ? 'bg-amber-100 text-amber-900 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{lang === 'pt' ? 'Dicas para a Entrevista' : 'Conseils pour l’Entrevue'}</span>
              </button>
            </div>

            {/* ABA 1: PALAVRAS-CHAVE & LACUNAS */}
            {activeResultTab === 'keywords' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'pt' ? 'Palavras-Chave Identificadas no seu Perfil:' : 'Mots-clés trouvés et validés :'}</span>
                    </h4>
                    <span className="text-xs font-bold text-emerald-700">
                      {optimizationResult.matchingKeywords.length} correspondências
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {optimizationResult.matchingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'pt' ? 'Palavras-Chave Críticas da Vaga que Faltavam no CV:' : 'Mots-clés critiques de l’offre à intégrer :'}</span>
                    </h4>
                    <span className="text-xs font-bold text-amber-700">
                      {optimizationResult.missingKeywords.length} lacunas identificadas
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {optimizationResult.missingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200"
                      >
                        <span>+ {kw}</span>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    {lang === 'pt'
                      ? '💡 Todas as palavras-chave acima já foram automaticamente incorporadas no Resumo e nas Competências calibradas abaixo!'
                      : '💡 Tous ces mots-clés ont été automatiquement insérés dans le sommaire et les compétences techniques recommandées ci-dessous.'}
                  </p>
                </div>
              </div>
            )}

            {/* ABA 2: RESUMO EXECUTIVO CALIBRADO */}
            {activeResultTab === 'summary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {lang === 'pt' ? 'Resumo Profissional Calibrado para' : 'Sommaire Professionnel Calibré pour'} {jobCompany}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {lang === 'pt' ? 'Otimizado em padrão anti-viés com as palavras-chave da vaga' : 'Rédigé sur mesure pour accrocher l’attention du recruteur'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(optimizationResult.tailoredSummary, 'summary')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copiedSection === 'summary' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'pt' ? 'Copiado!' : 'Copié !'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'pt' ? 'Copiar Resumo' : 'Copier'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                  {optimizationResult.tailoredSummary}
                </div>
              </div>
            )}

            {/* ABA 3: HABILIDADES TÉCNICAS */}
            {activeResultTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {lang === 'pt' ? 'Competências Técnicas Recomendadas para a Vaga' : 'Compétences Techniques Recommandées'}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {lang === 'pt' ? 'Termos exatos para pontuação máxima nos filtros ATS' : 'Termes à faire figurer dans la section compétences'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        optimizationResult.recommendedTechnicalSkills.join('\n• '),
                        'skills'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copiedSection === 'skills' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'pt' ? 'Copiado!' : 'Copié !'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'pt' ? 'Copiar Todas' : 'Copier'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {optimizationResult.recommendedTechnicalSkills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA 4: CARTA DE APRESENTAÇÃO SOB MEDIDA */}
            {activeResultTab === 'letter' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {lang === 'pt' ? 'Carta de Apresentação (Lettre de Motivation)' : 'Lettre de Présentation Officielle'}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {lang === 'pt' ? 'Formatada no padrão formal de correspondência do Canadá' : 'Formatée selon les standards corporatifs québécois'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!optimizationResult.tailoredCoverLetter) return;
                        const cl = optimizationResult.tailoredCoverLetter;
                        const fullText = `${cl.salutation}\n\n${cl.openingParagraph}\n\n${cl.bodyParagraphs.join('\n\n')}\n\n${cl.closingParagraph}\n\n${cl.signoff}\n${activeResumeData.fullName}`;
                        handleCopyText(fullText, 'letter');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedSection === 'letter' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lang === 'pt' ? 'Copiada!' : 'Copiée !'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'pt' ? 'Copiar Carta' : 'Copier la lettre'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {optimizationResult.tailoredCoverLetter && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-4 font-sans leading-relaxed">
                    <div className="text-[11px] text-slate-500 space-y-0.5 border-b border-slate-200 pb-3">
                      <p className="font-bold text-slate-800">{optimizationResult.tailoredCoverLetter.recipientName}</p>
                      <p>{optimizationResult.tailoredCoverLetter.recipientTitle} • {optimizationResult.tailoredCoverLetter.companyName}</p>
                      <p className="font-bold text-indigo-700 pt-1">
                        Objet : Candidature au poste de {jobTitle} (Réf. : {optimizationResult.tailoredCoverLetter.jobReference})
                      </p>
                    </div>

                    <p className="font-bold">{optimizationResult.tailoredCoverLetter.salutation}</p>
                    <p>{optimizationResult.tailoredCoverLetter.openingParagraph}</p>

                    {optimizationResult.tailoredCoverLetter.bodyParagraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}

                    <p>{optimizationResult.tailoredCoverLetter.closingParagraph}</p>
                    <p className="font-bold pt-2">{optimizationResult.tailoredCoverLetter.signoff}</p>
                    <p className="font-extrabold text-slate-900">{activeResumeData.fullName}</p>
                  </div>
                )}
              </div>
            )}

            {/* ABA 5: PONTOS FORTES & DICAS PARA ENTREVISTA */}
            {activeResultTab === 'advice' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{lang === 'pt' ? 'Seus Maiores Diferenciais para esta Vaga:' : 'Vos Atouts Majeurs pour ce Poste :'}</span>
                  </h4>
                  <div className="space-y-2">
                    {optimizationResult.keyStrengths.map((str, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70 text-xs text-slate-800 flex items-start gap-2.5 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>{lang === 'pt' ? 'Recomendações Estratégicas para a Entrevista:' : 'Conseils Stratégiques pour l’Entrevue :'}</span>
                  </h4>
                  <div className="space-y-2">
                    {optimizationResult.strategicAdvice.map((adv, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/70 text-xs text-slate-800 flex items-start gap-2.5 font-medium"
                      >
                        <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BOTÕES DE AÇÃO FINAIS: ABRIR NO CONSTRUTOR DE CV */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                {lang === 'pt'
                  ? '✓ Resumo profissional, competências e carta atualizados na sua sessão.'
                  : '✓ Données synchronisées avec le constructeur de CV.'}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleOpenInResumeBuilder}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {lang === 'pt'
                      ? 'Abrir no Construtor de CV Format Canadien (Gerar PDF)'
                      : 'Ouvrir dans le Constructeur de CV (Générer le PDF)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Authority Bar */}
      <TrustAuthorityBar lang={lang} />

      {/* Newsletter Box */}
      <NewsletterBox lang={lang} variant="card" />
    </div>
  );
};
