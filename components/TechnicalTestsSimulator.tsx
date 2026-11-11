'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '@/lib/i18n';
import {
  FileCheck2,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Crown,
  ShieldCheck,
  Table,
  Cpu,
  ArrowRight,
  HelpCircle,
  Lock,
  Timer,
  Building2,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Target,
  Compass,
  Check,
  Briefcase,
  Layers,
  Flame,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export type TestCategoryKey =
  | 'ccat-logic'
  | 'french-bill96'
  | 'sjt-situational'
  | 'cnesst-safety'
  | 'excel-business';

export interface TestQuestion {
  id: number;
  category: TestCategoryKey;
  employerReference: string;
  scenario: Record<Language, string>;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
  explanation: Record<Language, string>;
  canadianRule: Record<Language, string>;
  commonPitfall: Record<Language, string>;
}

export interface CategoryMeta {
  key: TestCategoryKey;
  icon: React.ElementType;
  badge: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  employers: string[];
  durationMinutes: number;
  passingScore: number;
  freeCount: number;
}

interface TechnicalTestsSimulatorProps {
  lang: Language;
  isPro: boolean;
  onOpenProModal: (trigger?: string) => void;
  onNavigateToInterview?: () => void;
  onSelectTool?: (tool: any) => void;
}

export const CATEGORIES_META: CategoryMeta[] = [
  {
    key: 'ccat-logic',
    icon: Cpu,
    badge: {
      pt: 'Wonderlic / CCAT',
      fr: 'CCAT & Cognitif',
      en: 'Wonderlic / CCAT',
    },
    title: {
      pt: 'Raciocínio Lógico & Velocidade Cognitiva (CCAT)',
      fr: 'Raisonnement Logique & Vitesse Cognitive (CCAT)',
      en: 'Cognitive Speed & Deductive Logic (CCAT)',
    },
    description: {
      pt: 'Simulado dos testes de velocidade, séries numéricas, engrenagens e raciocínio dedutivo aplicados na triagem inicial de grandes corporações.',
      fr: 'Test éliminatoire chronométré portant sur les suites logiques, déductions et calculs opérationnels appliqués par les employeurs canadiens.',
      en: 'Screening timed tests evaluating numerical patterns, gear mechanics, and inductive problem-solving widely used in Canada.',
    },
    employers: ['Desjardins', 'Banque Nationale', 'CGI', 'Bell Canada', 'Bombardier'],
    durationMinutes: 10,
    passingScore: 75,
    freeCount: 3,
  },
  {
    key: 'french-bill96',
    icon: BookOpen,
    badge: {
      pt: 'OQLF & Loi 96',
      fr: 'Loi 96 & Affaires',
      en: 'Quebec Business French',
    },
    title: {
      pt: 'Francês Corporativo & Conformidade Lei 96',
      fr: 'Français Professionnel & Normes Loi 96 (OQLF)',
      en: 'Quebec Corporate French & Bill 96 Compliance',
    },
    description: {
      pt: 'Vocabulário oficial do trabalho québécois, redação de courriels formais, fórmulas de cortesia e direitos linguísticos no ambiente de trabalho.',
      fr: 'Maîtrise du vocabulaire du travail québécois, courriels formels, formules d’usage et obligations linguistiques de la Charte.',
      en: 'Mastery of authentic Quebec workplace vocabulary, formal email standards, business etiquette, and language rights.',
    },
    employers: ['Hydro-Québec', 'Ville de Montréal', 'SAQ', 'Gouvernement du Québec', 'Desjardins'],
    durationMinutes: 12,
    passingScore: 80,
    freeCount: 3,
  },
  {
    key: 'sjt-situational',
    icon: Compass,
    badge: {
      pt: 'SJT Canadense',
      fr: 'Test Jugement SJT',
      en: 'Canadian SJT',
    },
    title: {
      pt: 'Julgamento Situacional (SJT) & Diplomacia de Equipe',
      fr: 'Jugement Situationnel (SJT) & Climat de Travail',
      en: 'Situational Judgement Test (SJT) & Canadian Workplace Culture',
    },
    description: {
      pt: 'Cenários reais de resolução pacífica de conflitos, cultura não-confrontacional, trabalho colaborativo e dilemas éticos no ambiente corporativo canadense.',
      fr: 'Mises en situation évaluant la diplomatie, la gestion constructive des désaccords et l’éthique selon les standards canadiens.',
      en: 'Realistic scenarios testing diplomacy, non-confrontational communication, diversity inclusion, and team mediation.',
    },
    employers: ['Service Canada', 'Pratt & Whitney', 'Alimentation Couche-Tard', 'Metro', 'BMO'],
    durationMinutes: 15,
    passingScore: 80,
    freeCount: 3,
  },
  {
    key: 'cnesst-safety',
    icon: ShieldCheck,
    badge: {
      pt: 'CNESST & SIMDUT',
      fr: 'CNESST & SIMDUT 2015',
      en: 'CNESST & WHMIS',
    },
    title: {
      pt: 'Saúde, Segurança (CNESST) & SIMDUT 2015',
      fr: 'Santé, Sécurité du Travail (CNESST) & SIMDUT 2015',
      en: 'Occupational Health & Safety (CNESST) & WHMIS 2015',
    },
    description: {
      pt: 'Direito de recusa (art. 12 LSST), bloqueio de energias perigosas (cadenassage), fichas FDS e responsabilidades legais de segurança no Québec.',
      fr: 'Droit de refus (art. 12 LSST), cadenassage obligatoire, fiches de données de sécurité (FDS) et normes préventives québécoises.',
      en: 'Right of Refusal (sec. 12 LSST), machinery lockout procedures, chemical hazard pictograms, and prevention standards.',
    },
    employers: ['Biscuits Leclerc', 'Agropur', 'Hydro-Québec', 'Rio Tinto', 'ArcelorMittal'],
    durationMinutes: 10,
    passingScore: 85,
    freeCount: 3,
  },
  {
    key: 'excel-business',
    icon: Table,
    badge: {
      pt: 'Excel para Escritório',
      fr: 'Excel & Bureautique',
      en: 'Excel for Business',
    },
    title: {
      pt: 'Excel Prático, Funções Modernas & Relatórios',
      fr: 'Excel Appliqué, Formules & Tableaux de Bord',
      en: 'Applied Excel, Modern Formulas & Reporting',
    },
    description: {
      pt: 'Funções mais cobradas em provas práticas: RECHERCHEX (XLOOKUP), referências absolutas com $, SIERREUR, tratamento de bases e tabelas dinâmicas.',
      fr: 'Formules indispensables aux tests de pré-sélection : RECHERCHEX (XLOOKUP), références absolues ($), SIERREUR et tableaux croisés.',
      en: 'Core spreadsheet skills tested in Canadian pre-employment assessments: XLOOKUP, absolute references, error handling, and pivot tables.',
    },
    employers: ['KPMG Montréal', 'Banque Laurentienne', 'Saputo', 'WSP Canada', 'Air Canada'],
    durationMinutes: 12,
    passingScore: 75,
    freeCount: 3,
  },
];

export const TEST_QUESTIONS_DATABASE: TestQuestion[] = [
  // --- 1. CCAT / WONDERLIC LOGIC & COGNITIVE ---
  {
    id: 101,
    category: 'ccat-logic',
    employerReference: 'Desjardins & CGI (Screening Cognitif CCAT)',
    scenario: {
      pt: 'Uma fábrica da Grande Montréal possui 3 linhas de montagem. A linha A produz 40 caixas por hora. A linha B produz 25% a mais que a linha A. A linha C produz o equivalente à média de A e B. Quantas caixas as 3 linhas juntas produzem em um turno de 8 horas contínuas?',
      fr: 'Une usine de Montréal possède 3 lignes d’assemblage. La ligne A produit 40 caisses/heure. La ligne B produit 25% de plus que la ligne A. La ligne C produit la moyenne de A et B. Combien de caisses les 3 lignes produisent-elles ensemble en 8 heures de production ?',
      en: 'A Montreal plant has 3 assembly lines. Line A produces 40 boxes/hour. Line B produces 25% more than line A. Line C produces the average of A and B. How many boxes do all 3 lines produce in an 8-hour continuous shift?',
    },
    question: {
      pt: 'Qual é o volume total produzido pelas três linhas ao final das 8 horas?',
      fr: 'Quel est le volume total produit par les trois lignes au terme des 8 heures ?',
      en: 'What is the total output produced by all three lines after 8 hours?',
    },
    options: {
      pt: [
        '960 caixas',
        '1.080 caixas (40 + 50 + 45 = 135/h × 8h)',
        '1.200 caixas',
        '840 caixas',
      ],
      fr: [
        '960 caisses',
        '1 080 caisses (40 + 50 + 45 = 135/h × 8h)',
        '1 200 caisses',
        '840 caisses',
      ],
      en: [
        '960 boxes',
        '1,080 boxes (40 + 50 + 45 = 135/h × 8h)',
        '1,200 boxes',
        '840 boxes',
      ],
    },
    correctIndex: 1,
    explanation: {
      pt: 'Linha A = 40. Linha B = 40 + (25% de 40 = 10) = 50. Linha C = (40 + 50) / 2 = 45. Produção horária total = 40 + 50 + 45 = 135 caixas/hora. Em 8 horas: 135 × 8 = 1.080 caixas.',
      fr: 'Ligne A = 40. Ligne B = 40 + (25% de 40 = 10) = 50. Ligne C = (40 + 50) / 2 = 45. Débit horaire combiné = 40 + 50 + 45 = 135 caisses/heure. Pour 8 heures : 135 × 8 = 1 080 caisses.',
      en: 'Line A = 40. Line B = 40 + 10 = 50. Line C = (40 + 50) / 2 = 45. Combined hourly output = 135 boxes/hr. In 8 hours: 135 × 8 = 1,080 boxes.',
    },
    canadianRule: {
      pt: 'No teste CCAT, os cálculos mentais de proporções e porcentagens fracionadas (25%, 33.3%, 50%) devem ser feitos em menos de 45 segundos por questão.',
      fr: 'Dans le test CCAT canadien, les résolutions rapides de cadences opérationnelles doivent être complétées en moins de 45 secondes.',
      en: 'On the Canadian CCAT, rapid mental rate calculations must be solved in under 45 seconds without a calculator.',
    },
    commonPitfall: {
      pt: 'Calcular a linha B como 40 + 25 = 65 em vez de calcular 25% de 40 (que resulta em 10).',
      fr: 'Confondre le pourcentage avec une valeur absolue (+25 au lieu de +25%).',
      en: 'Adding 25 as an absolute number instead of computing 25% of 40.',
    },
  },
  {
    id: 102,
    category: 'ccat-logic',
    employerReference: 'Bell Canada & Bombardier (Logique Mécanique & Spatiale)',
    scenario: {
      pt: 'Um sistema de transmissão mecânico é composto por 4 engrenagens circulares (1, 2, 3 e 4) alinhadas e diretamente acopladas em série. A engrenagem 1 gira no sentido horário. A engrenagem 4 está conectada por uma correia reta (sem cruzamento) a uma polia externa 5.',
      fr: 'Un système d’entraînement mécanique comporte 4 engrenages droits (1, 2, 3 et 4) engrenés en ligne droite. L’engrenage 1 tourne dans le sens horaire. L’engrenage 4 entraîne par une courroie droite (non croisée) une poulie externe 5.',
      en: 'A mechanical train consists of 4 circular spur gears (1, 2, 3, and 4) meshed in a straight line. Gear 1 rotates clockwise. Gear 4 drives an external pulley 5 via an open straight belt.',
    },
    question: {
      pt: 'Em qual sentido gira a polia externa 5?',
      fr: 'Dans quel sens tourne la poulie externe 5 ?',
      en: 'In which direction does the external pulley 5 rotate?',
    },
    options: {
      pt: [
        'Sentido anti-horário.',
        'Sentido horário.',
        'Permanece estática devido ao amortecimento.',
        'Oscila alternadamente para a esquerda e para a direita.',
      ],
      fr: [
        'Dans le sens antihoraire.',
        'Dans le sens horaire.',
        'Elle demeure immobile en raison du rapport de réduction.',
        'Elle oscille de façon intermittente.',
      ],
      en: [
        'Counter-clockwise (anti-clockwise).',
        'Clockwise.',
        'It remains stationary due to damping.',
        'It oscillates back and forth.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'Engrenagens acopladas invertem o sentido de rotação a cada contato: Engrenagem 1 = Horário; Engrenagem 2 = Anti-horário; Engrenagem 3 = Horário; Engrenagem 4 = Anti-horário. Como a correia para a polia 5 é reta (não cruzada), ela preserva o sentido da engrenagem 4: portanto, a polia 5 gira no sentido Anti-horário.',
      fr: 'Des engrenages droits successifs alternent le sens de rotation : 1 = Horaire -> 2 = Antihoraire -> 3 = Horaire -> 4 = Antihoraire. La courroie droite conserve le sens de l’élément menant : la poulie 5 tourne donc dans le sens Antihoraire.',
      en: 'Meshed spur gears alternate direction: 1 = Clockwise -> 2 = Counter-clockwise -> 3 = Clockwise -> 4 = Counter-clockwise. A straight belt preserves the drive direction, so pulley 5 rotates Counter-clockwise.',
    },
    canadianRule: {
      pt: 'Testes de aptidão técnica canadenses (Ramsay / Bennett Mechanical) avaliam princípios físicos intuitivos sem exigir cálculos avançados de engenharia.',
      fr: 'Les tests d’aptitude mécanique québécois (type Ramsay/Bennett) vérifient la compréhension intuitive de la cinématique industrielle.',
      en: 'Canadian technical screening tests (Ramsay/Bennett style) assess practical physics intuition without complex formulas.',
    },
    commonPitfall: {
      pt: 'Achar que a correia inverte a rotação. Correias retas mantêm o mesmo sentido; apenas correias cruzadas em "8" invertem o sentido.',
      fr: 'Croire qu’une courroie inverse toujours le sens : seule une courroie croisée en huit l’inverse.',
      en: 'Assuming a straight belt reverses direction; only crossed figure-eight belts reverse rotation.',
    },
  },
  {
    id: 103,
    category: 'ccat-logic',
    employerReference: 'Banque Nationale & Desjardins (Séries Numériques)',
    scenario: {
      pt: 'Considere a seguinte sequência lógica observada nos registros financeiros de um projeto canadense: [4, 7, 12, 19, 28, ?].',
      fr: 'Observez la séquence logique suivante issue de relevés opérationnels : [4, 7, 12, 19, 28, ?].',
      en: 'Observe the following number sequence found in project records: [4, 7, 12, 19, 28, ?].',
    },
    question: {
      pt: 'Qual número substitui logicamente o ponto de interrogação (?)?',
      fr: 'Quel nombre remplace logiquement le point d’interrogation (?) ?',
      en: 'Which number logically replaces the question mark (?)?',
    },
    options: {
      pt: [
        '37',
        '39 (+11 na sequência de números ímpares: +3, +5, +7, +9, +11)',
        '41',
        '35',
      ],
      fr: [
        '37',
        '39 (+11 selon la suite des entiers impairs : +3, +5, +7, +9, +11)',
        '41',
        '35',
      ],
      en: [
        '37',
        '39 (+11 in the consecutive odd increment series: +3, +5, +7, +9, +11)',
        '41',
        '35',
      ],
    },
    correctIndex: 1,
    explanation: {
      pt: 'A diferença entre os termos sucessivos aumenta de 2 em 2 (números ímpares consecutivos): 7 - 4 = +3; 12 - 7 = +5; 19 - 12 = +7; 28 - 19 = +9. O próximo incremento deve ser +11. Portanto: 28 + 11 = 39.',
      fr: 'L’écart entre chaque terme augmente de 2 (série des nombres impairs) : +3, +5, +7, +9. Le pas suivant est +11. Donc 28 + 11 = 39.',
      en: 'The difference increases by 2 each step (odd numbers): +3, +5, +7, +9. The next increment is +11, making 28 + 11 = 39.',
    },
    canadianRule: {
      pt: 'Sequências aritméticas de segunda ordem são o tipo de questão mais recorrente no Wonderlic Personnel Test canadense.',
      fr: 'Les progressions différentielles de second ordre représentent 20 % des tests de raisonnement quantitatif au Canada.',
      en: 'Second-order arithmetic progressions represent nearly a fifth of Canadian quantitative pre-screening questions.',
    },
    commonPitfall: {
      pt: 'Tentar aplicar multiplicação linear (+3, ×2) sem calcular as diferenças de primeira ordem entre os termos.',
      fr: 'Tenter des multiplications sans calculer d’abord les écarts linéaires successifs.',
      en: 'Attempting complex multiplication factors before verifying the first-order differences.',
    },
  },

  // --- 2. FRENCH CORPORATE & BILL 96 ---
  {
    id: 201,
    category: 'french-bill96',
    employerReference: 'Hydro-Québec & Gouvernement du Québec (Charte de la langue française)',
    scenario: {
      pt: 'Você precisa enviar um e-mail formal a um diretor de departamento da Hydro-Québec chamado Marc Tremblay, solicitando uma reunião para revisar o cronograma de implantação.',
      fr: 'Vous devez rédiger un courriel professionnel adressé à un directeur de direction chez Hydro-Québec, M. Marc Tremblay, pour convenir d’une rencontre de suivi.',
      en: 'You need to write a formal business email to a department director at Hydro-Québec, Marc Tremblay, requesting a follow-up meeting.',
    },
    question: {
      pt: 'Qual abertura e fórmula de cortesia representam o padrão formal recomendado no Québec corporativo contemporâneo?',
      fr: 'Quelle formule d’appel et de salutation correspond au standard professionnel recommandé dans le milieu des affaires québécois ?',
      en: 'Which salutation and sign-off represents the standard formal business practice in Quebec?',
    },
    options: {
      pt: [
        'Abertura: "Bonjour M. Tremblay," / Fechamento: "Salutations distinguées," ou "Cordialement,"',
        'Abertura: "Salut Marc !" / Fechamento: "Bye bye,"',
        'Abertura: "Cher ami Marc," / Fechamento: "Je vous embrasse,"',
        'Abertura: "Dear Mr. Tremblay," / Fechamento: "Best regards," (o inglês é preferido no Québec corporativo)',
      ],
      fr: [
        'Appel : « Bonjour M. Tremblay, » / Clôture : « Salutations distinguées, » ou « Cordialement, »',
        'Appel : « Salut Marc ! » / Clôture : « Bye bye, »',
        'Appel : « Cher ami Marc, » / Clôture : « Je vous embrasse bien fort, »',
        'Appel : « Dear Mr. Tremblay, » / Clôture : « Best regards, » (l’anglais est la langue par défaut des affaires)',
      ],
      en: [
        'Salutation: "Bonjour M. Tremblay," / Sign-off: "Salutations distinguées," or "Cordialement,"',
        'Salutation: "Salut Marc !" / Sign-off: "Bye bye,"',
        'Salutation: "Cher ami Marc," / Sign-off: "Je vous embrasse,"',
        'Salutation: "Dear Mr. Tremblay," / Sign-off: "Best regards," (English is preferred by default in Quebec)',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'No Québec corporativo, a fórmula de abertura formal padrão é "Bonjour M. [Sobrenome]," ou "Madame [Sobrenome],". As fórmulas de encerramento consagradas pelo OQLF (Office québécois de la langue française) são "Cordialement,", "Sincères salutations," ou "Salutations distinguées,". Em comunicações com órgãos públicos e empresas com mais de 25 funcionários, o francês é a língua de trabalho legal obrigatória (Lei 96).',
      fr: 'Au Québec, la formule consacrée par l’OQLF pour un premier échange d’affaires est « Bonjour M. [Nom], » ou « Madame [Nom], » suivie d’une formule de clôture respectueuse comme « Cordialement, » ou « Salutations distinguées, ». La Loi 96 consacre le français comme langue normale et habituelle du travail.',
      en: 'In Quebec business communication, the standard respectful opening is "Bonjour M. [Lastname]," and official sign-offs approved by OQLF include "Cordialement," or "Salutations distinguées,". Under Bill 96, French is the legally established language of work.',
    },
    canadianRule: {
      pt: 'Ao contrário da França onde se usa fórmulas muito longas como "Veuillez agréer, Monsieur, l\'expression de mes sentiments les plus distingués", o Québec prefere fórmulas corteses, diretas e profissionais.',
      fr: 'Le style québécois d’affaires évite la lourdeur des formules protocolaires françaises du XIXe siècle sans jamais basculer dans la familiarité prématurée.',
      en: 'Quebec professional correspondence favors polite, direct phrasing over archaic lengthy European formulas while avoiding premature familiarity.',
    },
    commonPitfall: {
      pt: 'Tratar o diretor por "tu" ou "salut" no primeiro contato profissional sem que ele tenha explicitamente convidado ao tutoiement.',
      fr: 'Tutoyer spontanément un supérieur ou un client dès le premier message sans y avoir été convié.',
      en: 'Using informal "tu" or casual greetings before a professional relationship has been established.',
    },
  },
  {
    id: 202,
    category: 'french-bill96',
    employerReference: 'Office québécois de la langue française (OQLF) & SAQ',
    scenario: {
      pt: 'Você está redigindo um relatório técnico e precisa se referir a ferramentas cotidianas de TI e trabalho no escritório québécois.',
      fr: 'Vous rédigez un guide d’accueil et des procédures de travail pour une entreprise québécoise assujettie à la Charte de la langue française.',
      en: 'You are writing an onboarding procedure for a Quebec business subject to the Charter of the French Language.',
    },
    question: {
      pt: 'Quais são os termos oficiais em francês preconizados pelo OQLF para substituir os anglicismos "e-mail", "chat", "feedback" e "open space"?',
      fr: 'Quels sont les termes officiels prescrits par l’OQLF pour désigner respectivement « e-mail », « chat », « feedback » et « open space » ?',
      en: 'Which official terms are recommended by the OQLF to replace "e-mail", "chat", "feedback", and "open space"?',
    },
    options: {
      pt: [
        'Courriel, clavardage, rétroaction (ou retour), aire ouverte.',
        'Mél, texto rápido, reportagem, sala comum.',
        'Lettre électronique, salon de bavardage, critique, espace sans mur.',
        'Podem ser mantidos os termos em inglês, pois o OQLF não regula termos de escritório.',
      ],
      fr: [
        'Courriel, clavardage, rétroaction (ou retour d’information), aire ouverte.',
        'Mél, texto rapide, reportage, salle commune.',
        'Message informatique, bavardage en ligne, critique, espace partagé.',
        'Les termes anglais sont acceptés sans réserve dans les rapports formels.',
      ],
      en: [
        'Courriel, clavardage, rétroaction, aire ouverte.',
        'Mél, texto rapide, reportage, salle commune.',
        'Lettre électronique, babillard, critique, espace sans mur.',
        'English terms can be kept as is because OQLF does not regulate office terminology.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'O Québec é pioneiro na defesa da terminologia tecnológica em língua francesa: "courriel" substitui "e-mail", "clavardage" (clavier + bavardage) substitui "chat", "rétroaction" substitui "feedback", e "aire ouverte" substitui "open space". O uso desses termos em testes escritos e entrevistas demonstra domínio e respeito à cultura québécoise.',
      fr: 'Le Grand Dictionnaire Terminologique de l’OQLF a officialisé « courriel », « clavardage », « rétroaction » et « aire ouverte ». Ces termes font partie du lexique professionnel quotidien au Québec.',
      en: 'Quebec’s OQLF coined "courriel" for e-mail, "clavardage" for chat, "rétroaction" for feedback, and "aire ouverte" for open plan offices.',
    },
    canadianRule: {
      pt: 'Com a Lei 96 (Loi sur la langue officielle et commune du Québec), o direito de trabalhar em francês e ter ferramentas e documentação em francês é um direito fundamental do empregado.',
      fr: 'En vertu de la Loi 96, les employeurs doivent veiller à ce que les communications internes, directives et logiciels soient disponibles en français.',
      en: 'Under Bill 96, employees have the legally protected right to carry out their duties in French with French documentation.',
    },
    commonPitfall: {
      pt: 'Usar "mél" (abreviação francesa da França) que não é utilizada no Québec, ou anglicismos como "feedback" em provas formais.',
      fr: 'Utiliser l’acronyme « mél » utilisé en France métropolitaine mais étranger aux normes de rédaction du Québec.',
      en: 'Using France-specific terms like "mél" or untranslated English tech jargon in official evaluations.',
    },
  },
  {
    id: 203,
    category: 'french-bill96',
    employerReference: 'Ville de Montréal & Desjardins (Orthographe & Accords)',
    scenario: {
      pt: 'Em uma comunicação interna sobre o encerramento do exercício fiscal, você precisa escolher a frase gramaticalmente correta em francês profissional.',
      fr: 'Dans un rapport budgétaire annuel transmis à la direction générale, vous devez sélectionner la phrase présentant l’accord grammatical et la syntaxe parfaits.',
      en: 'In an annual financial report sent to executive management, identify the sentence with impeccable French business grammar.',
    },
    question: {
      pt: 'Qual das alternativas apresenta concordância e ortografia 100% corretas no francês corporativo?',
      fr: 'Laquelle des phrases suivantes est exempte de toute faute d’accord et d’orthographe ?',
      en: 'Which of the following sentences is free of grammatical and spelling errors?',
    },
    options: {
      pt: [
        '« Les factures que nous avons reçues hier ont toutes été vérifiées et approuvées par la comptabilité. »',
        '« Les factures que nous avons reçu hier ont toute été vérifier et approuver par la comptabilité. »',
        '« Les factures qui nous avons reçu hier ont toutes étés vérifiées par la comptabilité. »',
        '« Les factures que nous sommes reçus hier ont été vérifier par la comptabilité. »',
      ],
      fr: [
        '« Les factures que nous avons reçues hier ont toutes été vérifiées et approuvées par la comptabilité. »',
        '« Les factures que nous avons reçu hier ont toute été vérifier et approuver par la comptabilité. »',
        '« Les factures qui nous avons reçu hier ont toutes étés vérifiées par la comptabilité. »',
        '« Les factures que nous sommes reçus hier ont été vérifier par la comptabilité. »',
      ],
      en: [
        '« Les factures que nous avons reçues hier ont toutes été vérifiées et approuvées par la comptabilité. »',
        '« Les factures que nous avons reçu hier ont toute été vérifier et approuver par la comptabilité. »',
        '« Les factures qui nous avons reçu hier ont toutes étés vérifiées par la comptabilité. »',
        '« Les factures que nous sommes reçus hier ont été vérifier par la comptabilité. »',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'Regra do particípio passado com o auxiliar "avoir": quando o complemento direto (COD) precede o verbo ("les factures que", feminino plural), o particípio concorda em gênero e número: "reçues". Na voz passiva ("ont été vérifiées"), o particípio "été" é invariável, mas "vérifiées" concorda com o sujeito "Les factures" (feminino plural).',
      fr: 'Avec l’auxiliaire avoir, le participe s’accorde avec le COD placé avant (« que » mis pour les factures, fém. pluriel -> reçues). Au passif, « été » est invariable et les participes s’accordent avec le sujet factures (vérifiées, approuvées).',
      en: 'Past participle with auxiliary "avoir" agrees with preceding direct object "les factures" (fem. plural -> "reçues"). In passive voice, "été" is invariant and "vérifiées/approuvées" agree with the subject.',
    },
    canadianRule: {
      pt: 'Erros de concordância em participes passados e confusão entre infinitivo (-er) e particípio (-é) são o principal motivo de eliminação em testes escritos de redação no Québec.',
      fr: 'La confusion entre terminaisons en -é et -er constitue la première cause d’échec aux examens écrits de la fonction publique québécoise.',
      en: 'Confusing past participle (-é) with the infinitive (-er) is the number one cause of failure on Quebec civil service exams.',
    },
    commonPitfall: {
      pt: 'Escrever o infinitivo "vérifier" em vez do particípio passado "vérifiées" em construções passivas.',
      fr: 'Écrire « été vérifier » au lieu du participe passé « été vérifié(es) ».',
      en: 'Using the bare infinitive ending "-er" instead of the agreed past participle.',
    },
  },

  // --- 3. SITUATIONAL JUDGEMENT TEST (SJT) ---
  {
    id: 301,
    category: 'sjt-situational',
    employerReference: 'Service Canada & Pratt & Whitney (Culture & Climat de Travail)',
    scenario: {
      pt: 'Você é novo na empresa e percebe que seu colega de equipe sênior, Jean-François, esqueceu de incluir dados importantes em uma apresentação que será mostrada aos clientes em 2 horas. Seu gerente direto está na sala de reuniões ao lado.',
      fr: 'Nouvellement embauché, vous remarquez que votre collègue senior, Jean-François, a omis des données financières critiques dans la présentation client prévue dans 2 heures. Votre gestionnaire est dans le bureau voisin.',
      en: 'You are new to the company and notice that your senior team member, Jean-François, forgot critical financial figures in a client deck scheduled in 2 hours.',
    },
    question: {
      pt: 'Qual é a atitude mais alinhada com a cultura corporativa canadense e que demonstra diplomacia e espírito de equipe?',
      fr: 'Quelle intervention reflète au mieux la culture d’entreprise canadienne axée sur la diplomatie et la solidarité d’équipe ?',
      en: 'Which approach best reflects Canadian corporate values of tact, non-confrontation, and team collaboration?',
    },
    options: {
      pt: [
        'Abordar Jean-François em particular, com respeito e tom colaborativo ("JF, vi que os números do Q3 não estão no slide 4; quer que eu prepare rapidinho para você incluir antes da reunião?").',
        'Ir imediatamente à sala do gerente para avisar que Jean-François cometeu um erro grave e que você pode assumir a apresentação.',
        'Esperar a reunião com o cliente começar e apontar o erro na frente de todos para demonstrar sua atenção aos detalhes.',
        'Não fazer nada, pois você é novo na empresa e não deve interferir no trabalho de um colega mais antigo.',
      ],
      fr: [
        'Aborder Jean-François en privé avec bienveillance (« JF, j’ai remarqué que les chiffres du T3 manquent au slide 4 ; veux-tu que je te prépare la synthèse pour qu’on soit prêts ? »).',
        'Alerter sur-le-champ le gestionnaire pour signaler l’erreur de Jean-François et proposer de faire la présentation à sa place.',
        'Attendre la présentation devant le client pour souligner publiquement la coquille et prouver votre vigilance.',
        'Rester silencieux car vous êtes en période de probation et ne voulez pas vous mêler du dossier d’un collègue senior.',
      ],
      en: [
        'Approach Jean-François privately in a supportive tone ("JF, I noticed Q3 figures are missing from slide 4; would you like me to pull them together so we are ready?").',
        'Immediately report to the manager that Jean-François made a serious mistake and offer to take over the presentation.',
        'Wait until the client meeting starts and publicly point out the missing data to show how detail-oriented you are.',
        'Do nothing because you are new and should not interfere with a senior peer’s responsibility.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'A cultura corporativa canadense valoriza imensamente a abordagem "non-confrontational" (não-confrontacional), a discrição e a solidariedade entre pares ("back-up culture"). Interpelar o colega em particular, oferecendo ajuda concreta sem julgamento, preserva o relacionamento interpessoal e garante o sucesso da empresa perante o cliente.',
      fr: 'Au Canada, la culture du travail valorise l’entraide, la discrétion et le tact (« face-saving »). Régler la situation de pair à pair en privé en offrant son aide immédiate protège l’équipe sans créer de friction inutile.',
      en: 'Canadian workplace culture emphasizes peer support, tact, and private constructive problem solving over public embarrassment or hierarchical tattling.',
    },
    canadianRule: {
      pt: 'Em testes de Julgamento Situacional no Canadá (SJT), qualquer resposta que humilhe um colega publicamente ou recorra ao chefe sem antes tentar o alinhamento direto recebe pontuação mínima (ou zero).',
      fr: 'Dans les tests de jugement situationnel canadiens, contourner un collègue pour aller directement dénoncer une erreur mineure au patron est pénalisé sévèrement.',
      en: 'In Canadian SJTs, escalating directly to management without attempting courteous peer-to-peer resolution results in the lowest rating.',
    },
    commonPitfall: {
      pt: 'Acreditar que ser "competitivo" e delatar o erro do colega para o gestor demonstrará iniciativa; no Canadá, isso é visto como falta de espírito de equipe.',
      fr: 'Penser que dénoncer l’erreur valorisera votre profil ; cela démontre en réalité un déficit marqué de compétences relationnelles.',
      en: 'Thinking that exposing a peer’s oversight will make you look competent; it actually flags poor emotional intelligence.',
    },
  },
  {
    id: 302,
    category: 'sjt-situational',
    employerReference: 'Metro & Couche-Tard (Service Client & Gestion des Conflits)',
    scenario: {
      pt: 'Um cliente entra na loja visivelmente irritado, levantando a voz no balcão porque um item anunciado com desconto no folheto semanal foi cobrado pelo preço integral na caixa registradora.',
      fr: 'Un client entre en magasin visiblement en colère et haussant le ton au comptoir parce qu’un article annoncé en promotion dans la circulaire a été facturé au prix régulier.',
      en: 'A customer enters the store visibly upset and raising their voice because an item advertised on sale in the flyer was charged at full regular price at checkout.',
    },
    question: {
      pt: 'Qual é o protocolo de desescalada (de-escalation) e aplicação da política de exatidão de preços do Québec (Politique d’exactitude des prix de l’OPC)?',
      fr: 'Quel est le protocole de désescalade et d’application de la Politique d’exactitude des prix de l’Office de la protection du consommateur (OPC) du Québec ?',
      en: 'What is the correct de-escalation protocol and application of Quebec’s Price Accuracy Policy (OPC)?',
    },
    options: {
      pt: [
        'Manter a calma, escutar ativamente sem interromper, validar a frustração do cliente, conferir o folheto e aplicar a política da OPC (item grátis até $10 ou desconto de $10 se for superior a $10).',
        'Pedir para o cliente parar de gritar imediatamente ou você chamará os seguranças da loja.',
        'Dizer que a culpa é do departamento de etiquetagem e que você não tem permissão para alterar preços na caixa.',
        'Ignorar a reclamação e sugerir que ele faça uma reclamação por formulário web no site matriz da empresa.',
      ],
      fr: [
        'Rester calme, écouter sans interrompre, valider la frustration, vérifier la circulaire et appliquer la Politique d’exactitude de l’OPC (gratuité jusqu’à 10 $ ou rabais de 10 $ si supérieur à 10 $).',
        'Exiger que le client baisse immédiatement d’un ton sous peine d’expulsion immédiate par la sécurité.',
        'Décliner toute responsabilité en imputant l’erreur à l’équipe de nuit chargée des étiquettes de rayon.',
        'Renvoyer le client vers le formulaire de réclamation en ligne du siège social sans chercher à résoudre l’incident sur place.',
      ],
      en: [
        'Stay calm, listen actively without interrupting, validate their frustration, verify the flyer and apply the Quebec OPC Price Accuracy Policy (free up to $10 or $10 discount if over $10).',
        'Tell the customer to stop shouting immediately or you will call security.',
        'Blame the night shift stocking team and say you are not authorized to adjust prices.',
        'Dismiss the issue and tell them to file a formal complaint online through the corporate website.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'No Québec, a Política de Exatidão de Preços (Politique d’exactitude des prix da OPC) determina que se o preço na caixa for superior ao anunciado, o comerciante deve fornecer o item gratuitamente se custar até $10, ou conceder o preço corrigido menos $10 de desconto se custar mais de $10. Aliado a isso, o atendimento canadense exige escuta empática e desescalada pacífica.',
      fr: 'Au Québec, la Politique d’exactitude des prix de l’OPC s’applique : si le prix enregistré est plus élevé que le prix affiché, l’article est remis gratuitement s’il coûte 10 $ ou moins, ou fait l’objet d’un rabais de 10 $ sur le prix corrigé s’il dépasse 10 $.',
      en: 'In Quebec, under the Consumer Protection Bureau (OPC), if a price scans higher than advertised, the merchant must give it for free up to $10, or deduct $10 from the corrected price if over $10.',
    },
    canadianRule: {
      pt: 'O conhecimento dos direitos do consumidor e das normas de atendimento ao cliente do Québec é um diferencial eliminatório para cargos em varejo, bancos e hotelaria.',
      fr: 'La maîtrise de la réglementation québécoise de protection du consommateur est une compétence clé testée pour les postes en contact direct avec la clientèle.',
      en: 'Understanding provincial consumer protection laws and calm conflict de-escalation are core testing benchmarks in retail and customer service.',
    },
    commonPitfall: {
      pt: 'Entrar em debate defensivo com o cliente ou recusar-se a aplicar a compensação prevista na lei de proteção ao consumidor.',
      fr: 'Adopter une posture défensive ou refuser d’appliquer la compensation réglementaire de l’OPC.',
      en: 'Becoming defensive or arguing over the flyer error rather than applying official remediation.',
    },
  },
  {
    id: 303,
    category: 'sjt-situational',
    employerReference: 'Alimentation Couche-Tard & BMO (Diversité & Inclusion)',
    scenario: {
      pt: 'Durante um almoço de equipe na cafeteria da empresa, um colega faz um comentário depreciativo ou uma piada estereotipada a respeito do sotaque de um recém-chegado imigrante que ingressou no departamento.',
      fr: 'Durant la pause du midi à la cafétéria, un collègue fait une remarque moqueuse sur l’accent et les origines d’un nouvel employé immigrant récemment arrivé dans l’équipe.',
      en: 'During lunch in the staff breakroom, a coworker makes a mocking remark about the accent and background of a newly arrived immigrant employee.',
    },
    question: {
      pt: 'Qual é o comportamento esperado segundo os códigos de conduta canadenses e a política de tolerância zero ao assédio discriminatório?',
      fr: 'Quelle est la réaction attendue selon les codes de conduite canadiens et les politiques de respect et d’inclusion en milieu de travail ?',
      en: 'What is the expected conduct under Canadian corporate diversity policies and workplace anti-harassment standards?',
    },
    options: {
      pt: [
        'Não participar da brincadeira, intervir de maneira serena e firme lembrando que comentários sobre sotaques não têm lugar na empresa ("Aqui valorizamos as competências e a diversidade da equipe"), e oferecer acolhimento ao colega.',
        'Rir junto para não parecer "chato" ou desmancha-prazeres perante os colegas mais populares.',
        'Gritar furiosamente na cafeteria e ameaçar o colega de agressão física imediata.',
        'Ignorar completamente e pensar "isso não é problema meu, não vou me expor".',
      ],
      fr: [
        'Ne pas cautionner la plaisanterie, recadrer calmement mais fermement en rappelant l’importance du respect mutuel, et manifester un soutien bienveillant au nouvel arrivant.',
        'Rire pour ne pas créer de malaise et s’intégrer au groupe de collègues établis.',
        'Provoquer un esclandre violent et menacer le collègue d’une plainte pénale immédiate.',
        'Garder le silence complet en considérant que la situation ne vous concerne pas personnellement.',
      ],
      en: [
        'Do not participate, intervene calmly and firmly reiterating that comments about accents do not belong in the workplace, and offer supportive welcoming to the newcomer.',
        'Laugh along to avoid awkwardness and fit in with the established group.',
        'Cause an aggressive confrontation and threaten the colleague physically.',
        'Ignore it completely and stay detached because it does not affect you directly.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'No Canadá e no Québec, a Lei sobre Normas do Trabalho (LNT art. 81.18) e a Carta dos Direitos e Liberdades garantem um ambiente de trabalho livre de assédio psicológico e discriminação baseada em origem, língua ou etnia. O papel do profissional é atuar como "ally" (aliado), desestimulando condutas discriminatórias com maturidade.',
      fr: 'Au Québec, la LNT (art. 81.18) et la Charte québécoise imposent un milieu de travail exempt de harcèlement psychologique ou discriminatoire. Les entreprises appliquent une tolérance zéro et recherchent des candidats capables de promouvoir activement un climat inclusif.',
      en: 'Canadian corporate and labour standards enforce zero tolerance against discrimination and psychological harassment. Employees are expected to act as responsible allies.',
    },
    canadianRule: {
      pt: 'As políticas EDI (Équité, Diversité, Inclusion) são centrais em praticamente todas as médias e grandes organizações no Canadá.',
      fr: 'Les compétences liées à l’ÉDI (Équité, Diversité, Inclusion) font l’objet d’évaluations comportementales explicites dans les entreprises canadiennes.',
      en: 'EDI (Equity, Diversity, Inclusion) principles are actively assessed in all major Canadian corporate interviews and behavioral tests.',
    },
    commonPitfall: {
      pt: 'Subestimar a gravidade de "microagressões" ou rir por pressão social, o que reprova o candidato em testes comportamentais de RH.',
      fr: 'Tolérer les micro-agressions sous couvert d’humour, ce qui est strictement proscrit par les comités de sélection.',
      en: 'Tolerating discriminatory microaggressions as banter; this is a severe disqualifier in modern hiring assessments.',
    },
  },

  // --- 4. CNESST, SAFETY & SIMDUT 2015 ---
  {
    id: 401,
    category: 'cnesst-safety',
    employerReference: 'CNESST & Biscuits Leclerc (Loi sur la santé et la sécurité du travail - LSST)',
    scenario: {
      pt: 'Você é operário em uma linha de produção industrial no Québec. Seu supervisor pede que você limpe com um pano os rolos compressores de uma máquina que está ligada e girando em alta velocidade, pois parar a linha atrasaria a meta de entrega do dia.',
      fr: 'Vous travaillez sur une ligne d’ensachage industriel au Québec. Votre chef d’équipe vous demande de nettoyer au chiffon les rouleaux d’un convoyeur en marche pour éviter d’interrompre la cadence de production.',
      en: 'You are an operator on an industrial packaging line in Quebec. Your lead hand asks you to wipe the rollers of a moving conveyor belt with a rag because stopping the line would miss the daily quota.',
    },
    question: {
      pt: 'De acordo com o artigo 12 da LSST do Québec (Droit de refus), qual é a sua obrigação e direito legal imediato?',
      fr: 'En vertu de l’article 12 de la Loi sur la santé et la sécurité du travail (LSST), quel est votre droit et obligation légale immédiate ?',
      en: 'Under Section 12 of the Quebec Act Respecting Occupational Health and Safety (LSST), what is your legal right and duty?',
    },
    options: {
      pt: [
        'Exercer imediatamente seu "Droit de refus" (Direito de recusa), parar antes de tocar na máquina, avisar o supervisor sobre o risco grave e aguardar a paralisação e cadenassage (bloqueio de energia).',
        'Obedecer à ordem primeiro para não levar advertência, e depois do turno registrar uma reclamação anônima no sindicato.',
        'Colocar duas luvas de couro sobrepostas e tentar limpar muito rápido enquanto ninguém estiver olhando.',
        'O direito de recusa não existe no Québec para trabalhadores em período probatório ou imigrantes.',
      ],
      fr: [
        'Exercer immédiatement votre « Droit de refus » (art. 12 LSST), refuser d’exécuter la tâche tant que la machine n’est pas arrêtée et cadenassée, et aviser le superviseur du danger.',
        'Exécuter l’ordre pour préserver votre emploi, puis déposer un grief syndical la semaine suivante.',
        'Mettre des gants renforcés et tenter de nettoyer rapidement par à-coups.',
        'Le droit de refus ne s’applique pas aux employés embauchés depuis moins de 3 mois au Québec.',
      ],
      en: [
        'Immediately exercise your "Right of Refusal" (Section 12 LSST), refuse to touch the running machine, notify the supervisor of the imminent hazard, and require lockout.',
        'Obey the order first to protect your job, then file a grievance next week.',
        'Wear double leather gloves and try to wipe the rollers quickly when no one is watching.',
        'The Right of Refusal does not apply to employees on probation or temporary permits.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'O Artigo 12 da LSST (Loi sur la santé et la sécurité du travail) consagra que todo trabalhador tem o direito e o dever de recusar executar um trabalho se tiver motivos razoáveis para crer que tal trabalho o expõe a um perigo para sua integridade física ou de outrem. Limpar máquinas em movimento sem cadenassage (bloqueio) viola o Regulamento de SST do Québec.',
      fr: 'L’article 12 de la LSST protège formellement le travailleur qui refuse un travail dangereux. Aucune sanction disciplinaire ne peut être infligée pour avoir légitimement exercé son droit de refus. Le nettoyage de pièces en mouvement sans cadenassage est strictement illégal.',
      en: 'Section 12 of the LSST grants workers the unconditional right to refuse hazardous work without reprisal. Intervening on moving machinery without lockout is illegal under Quebec safety regulations.',
    },
    canadianRule: {
      pt: 'A CNESST pune severamente empresas e gerentes que forçam funcionários a violar procedimentos de cadenassage (art. 185 do RSST), com multas pesadas e responsabilização criminal sob a Lei Westray.',
      fr: 'Au Canada, la loi Westray (Code criminel) peut engager la responsabilité criminelle des superviseurs qui imposent un travail mettant la vie d’autrui en danger.',
      en: 'Under the Canadian Westray Law (Bill C-45), supervisors who negligently demand unsafe work can face personal criminal charges.',
    },
    commonPitfall: {
      pt: 'Achar que dizer "não" ao supervisor em situação de perigo iminente causará demissão justa; a lei protege explicitamente o trabalhador contra represálias.',
      fr: 'Craindre d’être congédié en disant non : la loi québécoise interdit formellement toute mesure de représailles pour motif de sécurité.',
      en: 'Believing that refusing unsafe work will lead to lawful dismissal; the law strictly shields workers from retaliation.',
    },
  },
  {
    id: 402,
    category: 'cnesst-safety',
    employerReference: 'SIMDUT 2015 / WHMIS (Norme pancanadienne des produits chimiques)',
    scenario: {
      pt: 'Você precisa utilizar um solvente de limpeza de peças metálicas na oficina. No tambor há um pictograma com uma chama preta dentro de um losango vermelho com fundo branco, e a menção de advertência "DANGER".',
      fr: 'Vous devez manipuler un solvant de dégraissage en atelier. Le bidon affiche un losange à bordure rouge contenant une flamme noire sur fond blanc, accompagné du mot indicateur « DANGER ».',
      en: 'You are handling an industrial degreasing solvent. The drum displays a red diamond pictogram with a black flame symbol and the signal word "DANGER".',
    },
    question: {
      pt: 'Qual é a classe de perigo indicada pelo pictograma e qual precaução primária obrigatória deve constar na Ficha de Dados de Segurança (FDS / SDS)?',
      fr: 'Quelle est la signification de ce pictogramme SIMDUT 2015 et quelle précaution élémentaire s’impose ?',
      en: 'What hazard does this WHMIS 2015 pictogram communicate, and what mandatory precaution applies?',
    },
    options: {
      pt: [
        'Líquido inflamável (categoria 1 ou 2) - Manter estritamente afastado do calor, faíscas, chamas abertas e superfícies quentes, utilizar aterramento antiestático e EPIs adequados.',
        'Substância corrosiva para a pele e metais; o risco é apenas de queimadura química leve.',
        'Gás sob pressão não-inflamável; risco apenas de asfixia em ambiente confinado.',
        'Produto inerte e inofensivo; a chama é apenas ilustrativa da velocidade de evaporação.',
      ],
      fr: [
        'Matière inflammable (catégories 1 ou 2) - Tenir à l’écart de la chaleur, des étincelles, des flammes nues et des surfaces chaudes, avec mise à la terre antistatique.',
        'Matière corrosive pour la peau ; il n’y a aucun danger d’incendie.',
        'Gaz sous pression ininflammable.',
        'Produit d’entretien sans risque particulier ; le pictogramme est purement indicatif.',
      ],
      en: [
        'Flammable liquid (category 1 or 2) - Keep strictly away from heat, sparks, open flames, and hot surfaces; ensure grounding and proper ventilation.',
        'Corrosive material; skin hazard only with zero fire risk.',
        'Non-flammable gas under pressure.',
        'Mild chemical with no hazardous implications.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'O pictograma da chama do SIMDUT 2015 (Sistema Globalmente Harmonizado - GHS) identifica produtos inflamáveis, pirofóricos ou que emitem gases inflamáveis. A palavra de sinalização "DANGER" indica nível de gravidade mais alto que "ATTENTION" (Warning). Deve-se consultar a Ficha de Dados de Segurança (FDS) antes do manuseio.',
      fr: 'Le pictogramme de flamme du SIMDUT 2015 identifie les matières inflammables. La mention « DANGER » indique un niveau de risque plus sévère qu’« ATTENTION ». La consultation de la Fiche de données de sécurité (FDS) est légalement requise avant usage.',
      en: 'The flame pictogram under WHMIS 2015 denotes flammable liquids/solids/gases. "DANGER" denotes a higher severity than "WARNING". Checking the Safety Data Sheet (SDS/FDS) is mandatory.',
    },
    canadianRule: {
      pt: 'Em qualquer empresa no Canadá, todo funcionário que manipule ou fique exposto a produtos químicos deve receber treinamento certificado de SIMDUT 2015 pago pelo empregador.',
      fr: 'Au Québec, la formation SIMDUT 2015 est une obligation patronale préalable pour tout travailleur exposé à des produits dangereux.',
      en: 'Employers across Canada are legally obligated to provide paid WHMIS 2015 training before handling hazardous materials.',
    },
    commonPitfall: {
      pt: 'Confundir o pictograma da chama com o da chama sobre círculo (que indica substância comburente/oxidante).',
      fr: 'Confondre la flamme simple (matière inflammable) avec la flamme au-dessus d’un cercle (matière comburante).',
      en: 'Confusing the flame symbol with flame-over-circle (which denotes oxidizing agents).',
    },
  },
  {
    id: 403,
    category: 'cnesst-safety',
    employerReference: 'Hydro-Québec & ArcelorMittal (Procédure de Cadenassage)',
    scenario: {
      pt: 'Um técnico de manutenção no Québec vai trocar o rolamento de uma esteira industrial. Ele desliga a chave geral no painel elétrico principal.',
      fr: 'Un technicien de maintenance au Québec doit remplacer le roulement à billes d’un convoyeur industriel. Il abaisse l’interrupteur général au tableau électrique principal.',
    },
    question: {
      pt: 'Para que a intervenção seja 100% legal e segura segundo o regulamento de cadenassage (art. 185 do RSST), qual etapa é indispensável antes de tocar no equipamento mecânico?',
      fr: 'Selon l’art. 185 du Règlement sur la santé et la sécurité du travail (RSST), quelle étape est rigoureusement obligatoire avant de toucher à l’équipement ?',
      en: 'According to Section 185 of the RSST (Lockout Regulation), which step is mandatory before touching the mechanical assembly?',
    },
    options: {
      pt: [
        'Fixar seu próprio cadeado individual com chave única, colocar a etiqueta de aviso (fiche de cadenassage), dissipar energias residuais e realizar o "teste de partida zero" (essai de démarrage / test de vérification d’absence d’énergie).',
        'Pedir para o operador da máquina ficar vigiando o painel enquanto o técnico faz o reparo rápido.',
        'Colocar uma fita adesiva amarela na chave do disjuntor com os dizeres "Não ligar".',
        'Apenas desligar o disjuntor é suficiente, desde que o trabalho dure menos de 15 minutos.',
      ],
      fr: [
        'Apposer son cadenas personnel à clé unique, fixer la fiche d’avertissement, dissiper les énergies résiduelles et effectuer le test de vérification d’énergie zéro (essai de démarrage infructueux).',
        'Demander à un collègue de surveiller visuellement l’interrupteur pendant la durée de la réparation.',
        'Poser un ruban adhésif sur le disjoncteur avec la mention manuscrite « Ne pas réenclencher ».',
        'La simple coupure au disjoncteur suffit si l’intervention dure moins de 15 minutes.',
      ],
      en: [
        'Apply an individual padlock with a single key, affix the lockout tag, dissipate residual stored energy, and perform the zero-energy verification test (try-start test).',
        'Ask a buddy to keep watch over the breaker box while you do the quick swap.',
        'Tape the switch in the off position with warning tape.',
        'Flipping the breaker off is sufficient as long as work takes under 15 minutes.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'A regra de ouro do cadenassage no Québec exige: 1. Isolar; 2. Bloquear fisicamente com cadeado pessoal; 3. Etiquetar; 4. Dissipar energias residuais (pneumática, hidráulica, gravitacional); 5. Testar a ausência de energia tentando religar o equipamento (essai de démarrage). Jamais confie em vigilância humana ou fitas.',
      fr: 'La méthode québécoise de cadenassage comporte les 5 étapes fondamentales : Coupure, Cadenassage individuel, Étiquetage, Dissipation des énergies résiduelles et Essai de démarrage à blanc pour vérifier l’absence d’énergie.',
      en: 'The lockout/tagout protocol requires isolating, locking with an individual key, tagging, bleeding residual forces, and testing for zero energy state before entering the hazard zone.',
    },
    canadianRule: {
      pt: 'Cada trabalhador que entra na zona de perigo DEVE ter seu próprio cadeado. É estritamente proibido que um supervisor coloque um cadeado "para todo o grupo" sem dispositivo de fecho múltiplo (macho de bloqueio).',
      fr: 'Chaque personne exposée doit obligatoirement poser son propre cadenas. Les cadenas partagés sont illégaux au Québec.',
      en: 'Every individual worker inside the machine envelope must hold their own unique personal padlock on the multi-lock hasp.',
    },
    commonPitfall: {
      pt: 'Pular a etapa de "teste de ausência de energia" (tentar ligar o botão de partida no painel local para constatar que a máquina não se move).',
      fr: 'Omettre le test de vérification d’absence d’énergie (essai de démarrage) après avoir posé le cadenas.',
      en: 'Skipping the zero-energy verification step to confirm the machine actually cannot restart.',
    },
  },

  // --- 5. EXCEL & BUSINESS SPREADSHEETS ---
  {
    id: 501,
    category: 'excel-business',
    employerReference: 'KPMG Montréal & Desjardins (Test de Bureautique Appliquée)',
    scenario: {
      pt: 'Você tem uma planilha com a folha de pagamento de 200 funcionários do Québec. Na coluna A está o ID do funcionário, na coluna B o nome, e na coluna C o salário bruto. Em outra planilha, você tem apenas o nome do funcionário e precisa buscar o salário bruto correspondente.',
      fr: 'Vous disposez d’une feuille de paie de 200 employés québécois. La colonne A contient le numéro d’employé, la colonne B le nom et la colonne C le salaire brut. Dans un second tableau, vous devez extraire automatiquement le salaire brut à partir du nom.',
      en: 'You have a payroll sheet of 200 Quebec employees. Column A has the employee ID, column B the name, and column C the gross salary. In a second table, you need to look up the gross salary based on the name.',
    },
    question: {
      pt: 'Qual fórmula moderna do Microsoft Excel (em francês e inglês) é a mais robusta para fazer essa busca direta sem quebrar caso colunas sejam inseridas?',
      fr: 'Quelle formule moderne d’Excel (disponible en version française et anglaise) constitue la méthode recommandée évitant les erreurs de décalage de colonnes ?',
      en: 'Which modern Excel formula is the most resilient to return the matching salary without breaking if columns are moved?',
    },
    options: {
      pt: [
        '=RECHERCHEX(B2; Feuille1!B:B; Feuille1!C:C; "Non trouvé") [em inglês: =XLOOKUP(B2, Sheet1!B:B, Sheet1!C:C, "Not found")]',
        '=SOMME(Feuille1!C:C) / 2',
        '=SI(B2="Oui"; 50000; 0)',
        '=CONCATENER(Feuille1!B2; Feuille1!C2)',
      ],
      fr: [
        '=RECHERCHEX(B2; Feuil1!B:B; Feuil1!C:C; "Non trouvé") [en anglais : =XLOOKUP(B2, Sheet1!B:B, Sheet1!C:C, "Not found")]',
        '=SOMME(Feuil1!C:C) / 2',
        '=SI(B2="Oui"; 50000; 0)',
        '=CONCATENER(Feuil1!B2; Feuil1!C2)',
      ],
      en: [
        '=XLOOKUP(B2, Sheet1!B:B, Sheet1!C:C, "Not found") [in French: =RECHERCHEX(B2; Feuil1!B:B; Feuil1!C:C; "Non trouvé")]',
        '=SUM(Sheet1!C:C) / 2',
        '=IF(B2="Yes", 50000, 0)',
        '=CONCATENATE(Sheet1!B2, Sheet1!C2)',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'A função RECHERCHEX (XLOOKUP) substitui RECHERCHEV (VLOOKUP). Ela permite buscar da direita para a esquerda ou vice-versa, busca valores exatos por padrão (sem risco de falso positivo), permite retornar uma mensagem amigável caso não encontre ("Non trouvé"), e não quebra se uma coluna for adicionada entre B e C.',
      fr: 'RECHERCHEX (XLOOKUP) est la formule privilégiée des recruteurs en finance et bureautique. Elle surpasse RECHERCHEV en éliminant l’obligation de numéro d’index fixe et en gérant directement l’argument de valeur absente.',
      en: 'XLOOKUP (RECHERCHEX in French) is the modern gold standard. It handles left/right lookups natively, defaults to exact match, and does not break when columns are inserted.',
    },
    canadianRule: {
      pt: 'No Québec, empresas com faturamento ou matriz anglófona podem usar Excel em inglês, enquanto órgãos públicos e PMEs usam Excel em francês com fórmulas separadas por ponto e vírgula (;). Conhecer os nomes em ambos os idiomas é vital.',
      fr: 'Dans les entreprises québécoises bilingues, la maîtrise des équivalences de formules (VLOOKUP = RECHERCHEV, XLOOKUP = RECHERCHEX, IF = SI) est fréquemment testée en entrevue.',
      en: 'In bilingual Canadian workplaces, knowing both French and English Excel formula syntax (including comma vs semicolon argument separators) is a major asset.',
    },
    commonPitfall: {
      pt: 'Esquecer o 4º argumento de valor padrão ou usar índices numéricos fixos antigos que geram erros #REF! após manutenções na planilha.',
      fr: 'Continuer d’utiliser des RECHERCHEV rigides avec des index de colonnes fixes fragiles lors des modifications de structure.',
      en: 'Relying on legacy rigid VLOOKUP column index numbers that produce #REF! errors when columns are added.',
    },
  },
  {
    id: 502,
    category: 'excel-business',
    employerReference: 'Banque Laurentienne & Saputo (Références Absolues & Relatives)',
    scenario: {
      pt: 'Você precisa calcular a contribuição patronale ao RRQ para 500 linhas de funcionários. A taxa oficial está fixada na célula isolada E2 (ex: 6.40%). Na célula D5, você escreveu a fórmula =C5*E2 para o primeiro empregado.',
      fr: 'Vous devez calculer la cotisation de chaque employé au RRQ. Le taux applicable est renseigné dans la cellule isolée E2 (ex : 6,40 %). Dans la cellule D5, vous écrivez =C5*E2 pour le premier salarié.',
      en: 'You are calculating pension deductions for 500 employees. The statutory tax rate is located in cell E2 (e.g., 6.40%). In cell D5, you entered =C5*E2 for the first employee.',
    },
    question: {
      pt: 'O que você deve alterar na fórmula antes de arrastá-la para as 499 linhas seguintes para evitar erros de multiplicação por células vazias?',
      fr: 'Que devez-vous modifier dans la formule avant de l’étirer vers le bas sur 500 lignes pour éviter que la référence au taux ne glisse vers des cellules vides ?',
      en: 'What change must you make to the formula before dragging it down 500 rows to prevent the rate reference from sliding to empty cells?',
    },
    options: {
      pt: [
        'Transformar a célula em referência absoluta usando a tecla F4: =C5*$E$2',
        'Digitar a fórmula manualmente nas 500 linhas uma a uma.',
        'Colocar a fórmula entre parênteses: =(C5*E2)',
        'Mudar a cor da fonte da célula E2 para verde.',
      ],
      fr: [
        'Figer la cellule avec des références absolues via la touche F4 : =C5*$E$2',
        'Réécrire la formule manuellement dans chaque cellule jusqu’à la ligne 500.',
        'Mettre la formule en majuscules : =C5*MAJUSCULE(E2)',
        'Verrouiller la feuille de calcul avec un mot de passe avant d’étirer.',
      ],
      en: [
        'Lock the rate cell with absolute reference using the F4 key: =C5*$E$2',
        'Manually retype the formula 500 times.',
        'Enclose the formula in parentheses: =(C5*E2)',
        'Color code cell E2 green.',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'Ao arrastar uma fórmula para baixo, o Excel incrementa as linhas relativamente: C5 vira C6, C7... e E2 viraria E3, E4 (células vazias que dariam zero). Ao adicionar os cifrões ($E$2), a referência à taxa de retenção permanece rigorosamente congelada.',
      fr: 'Le raccourci F4 ajoute les symboles $ ($E$2) qui verrouillent à la fois la colonne et la ligne lors de la duplication verticale. C’est la compétence de base testée sur toute épreuve bureautique.',
      en: 'The F4 shortcut inserts dollar signs ($E$2) to lock both row and column so dragging the formula retains the fixed statutory percentage.',
    },
    canadianRule: {
      pt: 'Em testes de seleção técnica para analistas e escriturários no Canadá, o domínio rápido do teclado e do atalho F4 poupa minutos valiosos da prova cronometrada.',
      fr: 'Dans les tests minutés de 15 minutes, l’utilisation des raccourcis clavier (F4, Ctrl+Z, Ctrl+D) est observée par les évaluateurs.',
      en: 'Speed in using keyboard shortcuts like F4 and Ctrl+D is closely monitored in timed Canadian administrative assessments.',
    },
    commonPitfall: {
      pt: 'Copiar a fórmula sem fixar com $ e obter uma coluna inteira de zeros a partir da linha 2.',
      fr: 'Oublier le symbole $ et constater des colonnes remplies de 0 ou de messages d’erreur #VALEUR!.',
      en: 'Dragging a formula without freezing references, resulting in rows populated by zeros or #VALUE! errors.',
    },
  },
  {
    id: 503,
    category: 'excel-business',
    employerReference: 'WSP Canada & Air Canada (Nettoyage de Données & SIERREUR)',
    scenario: {
      pt: 'Você construiu uma planilha para consolidar horas extras e prêmios que será apresentada à diretoria de RH. Algumas divisões ou buscas geram o código feio "#N/A" ou "#DIV/0!" quando um funcionário não possui horas naquele período.',
      fr: 'Vous préparez un tableau de synthèse des heures supplémentaires pour la direction. Certaines formules renvoient les messages d’erreur inesthétiques « #N/A » ou « #DIV/0! » pour les employés sans heures.',
      en: 'You prepared an overtime summary workbook for HR executives. Some rows display unsightly "#N/A" or "#DIV/0!" errors when an employee has no logged hours.',
    },
    question: {
      pt: 'Qual função elegante de encapsulamento deve ser aplicada à fórmula para substituir qualquer código de erro por um zero limpo ou traço comercial ("-")?',
      fr: 'Quelle fonction d’encapsulation permet de substituer élégamment ces messages d’erreur par un zéro ou une valeur neutre ?',
      en: 'Which clean wrapping function should be applied to replace any calculation error with a clean zero or dash ("-")?',
    },
    options: {
      pt: [
        '=SIERREUR(ma_formule; 0) [em inglês: =IFERROR(my_formula, 0)]',
        '=SUPPRESPACE(ma_formule)',
        '=EFFACER(ma_formule)',
        '=ALEA()',
      ],
      fr: [
        '=SIERREUR(ma_formule; 0) [en anglais : =IFERROR(my_formula, 0)]',
        '=SUPPRESPACE(ma_formule)',
        '=MASQUER_ERREUR(ma_formule)',
        '=ARRONDI(ma_formule; 2)',
      ],
      en: [
        '=IFERROR(my_formula, 0) [in French: =SIERREUR(ma_formule; 0)]',
        '=TRIM(my_formula)',
        '=HIDE_ERROR(my_formula)',
        '=ROUND(my_formula, 2)',
      ],
    },
    correctIndex: 0,
    explanation: {
      pt: 'A função SIERREUR (IFERROR) intercepta qualquer erro no primeiro argumento (como #N/A, #DIV/0!, #VALEUR!, #REF!) e retorna o valor alternativo especificado (neste caso, 0 ou "-"). Isso garante que somas no rodapé continuem funcionando sem quebrar.',
      fr: 'La fonction SIERREUR (IFERROR) capture les anomalies de calcul et renvoie un substitut propre, empêchant ainsi les formules dépendantes de se propager en cascade d’erreurs.',
      en: 'The IFERROR (SIERREUR) function catches all calculation exceptions and produces a tidy fallback (e.g. 0), ensuring downstream sum totals calculate properly.',
    },
    canadianRule: {
      pt: 'Planilhas corporativas no Canadá devem sempre estar preparadas para visualização executiva sem códigos de depuração expostos.',
      fr: 'La présentation de classeurs de données propres, dépourvus d’artefacts d’erreurs, est une exigência standard chez les employeurs canadiens.',
      en: 'Delivering executive-ready spreadsheets without exposed debugging artifacts is an entry requirement for Canadian business roles.',
    },
    commonPitfall: {
      pt: 'Tentar ocultar os erros mudando a cor da fonte para branco em vez de tratar com função matemática.',
      fr: 'Changer manuellement la couleur du texte en blanc pour camoufler les erreurs au lieu de les gérer via SIERREUR.',
      en: 'Changing font color to white to hide errors instead of handling them programmatically.',
    },
  },
];

export const TechnicalTestsSimulator: React.FC<TechnicalTestsSimulatorProps> = ({
  lang,
  isPro,
  onOpenProModal,
  onNavigateToInterview,
  onSelectTool,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TestCategoryKey>('ccat-logic');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<
    Array<{ qId: number; userChoice: number; isCorrect: boolean }>
  >([]);
  const [timerSeconds, setTimerSeconds] = useState(600);
  const [timerActive, setTimerActive] = useState(true);

  // Filter current questions
  const currentCategoryMeta = useMemo(() => {
    return CATEGORIES_META.find((c) => c.key === selectedCategory) || CATEGORIES_META[0];
  }, [selectedCategory]);

  const activeQuestions = useMemo(() => {
    return TEST_QUESTIONS_DATABASE.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isFinished && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isFinished, timerSeconds]);

  // Restart when switching category
  const handleSwitchCategory = (catKey: TestCategoryKey) => {
    setSelectedCategory(catKey);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setUserAnswersHistory([]);
    const meta = CATEGORIES_META.find((c) => c.key === catKey);
    setTimerSeconds((meta?.durationMinutes || 10) * 60);
    setTimerActive(true);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswersHistory((prev) => [
      ...prev,
      {
        qId: currentQ.id,
        userChoice: idx,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      setTimerActive(false);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setUserAnswersHistory([]);
    setTimerSeconds(currentCategoryMeta.durationMinutes * 60);
    setTimerActive(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scorePct = activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0;
  const isPassed = scorePct >= currentCategoryMeta.passingScore;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Context */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {lang === 'pt'
                    ? 'Bateria de Testes Pré-Emprego Oficiais no Canadá'
                    : lang === 'en'
                    ? 'Official Canadian Pre-Employment Screening Battery'
                    : 'Batterie Officielle de Tests Pré-Embauche au Canada'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === 'pt'
                  ? 'Simulador de Testes Técnicos, Lógica & Aptidão Canadá'
                  : lang === 'en'
                  ? 'Canadian Technical, Logic & Aptitude Testing Hub'
                  : 'Simulateur de Tests Techniques, Logique & Aptitude Québec'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {lang === 'pt'
                  ? 'Pratique os exames eliminatórios mais aplicados pelas grandes corporações do Québec e Canadá (Desjardins, Hydro-Québec, Bell, CGI, Bombardier, Couche-Tard). Testes com cronômetro, pegadinhas frequentes e fundamentação oficial.'
                  : 'Entraînez-vous aux tests éliminatoires chronométrés des employeurs canadiens majeurs : logique CCAT, français des affaires Loi 96, jugement situationnel SJT, santé-sécurité CNESST et Excel appliqué.'}
              </p>
            </div>
          </div>

          {/* Action Header Pill & Interview Bridge */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateToInterview && (
              <button
                type="button"
                onClick={onNavigateToInterview}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer active:scale-95 border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>
                  {lang === 'pt'
                    ? 'Simulador de Entrevistas STAR'
                    : 'Simulateur d’Entrevues STAR'}
                </span>
              </button>
            )}

            {!isPro && (
              <button
                type="button"
                onClick={() =>
                  onOpenProModal(
                    'Débloquez les 50+ épreuves corrigées pas à pas et le rapport d’aptitude complet.'
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                <Crown className="w-4 h-4 text-slate-950" />
                <span>Pass Pro (50+ Tests Corrigés)</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Category Selector Cards */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
            {lang === 'pt'
              ? 'Selecione o Módulo de Avaliação Técnica:'
              : 'Sélectionnez le Module d’Évaluation :'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {CATEGORIES_META.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleSwitchCategory(cat.key)}
                  className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between gap-3 relative ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {cat.durationMinutes} min
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 leading-snug line-clamp-2">
                      {cat.title[lang]}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                      {cat.employers.slice(0, 2).join(', ')}...
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 absolute bottom-2 right-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Real Canadian Employer Context Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
              {lang === 'pt' ? 'Empresas Reais que Aplicam este Teste:' : 'Employeurs Cibles :'}
            </div>
            <div className="text-xs sm:text-sm font-black text-white mt-0.5 flex flex-wrap items-center gap-1.5">
              {currentCategoryMeta.employers.map((emp, i) => (
                <span
                  key={emp}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px]"
                >
                  {emp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Timer Pill */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs font-black">
            <Timer className={`w-4 h-4 ${timerSeconds < 120 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
            <span>{formatTime(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* 4. Main Question Card or Finished Screen */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {!isFinished && currentQ ? (
          <>
            {/* Question Progress Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {lang === 'pt' ? 'Questão' : 'Question'} {currentQIndex + 1} / {activeQuestions.length}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-600">
                  {currentQ.employerReference}
                </span>
              </div>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Score: {score} / {activeQuestions.length}
              </span>
            </div>

            {/* Scenario / Case Study Context */}
            {currentQ.scenario && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                  <span>
                    {lang === 'pt'
                      ? 'Cenário da Situação de Trabalho:'
                      : 'Mise en Situation Professionnelle :'}
                  </span>
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {currentQ.scenario[lang]}
                </p>
              </div>
            )}

            {/* Question Heading */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentQ.question[lang]}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options[lang].map((optText, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyles =
                  'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 text-slate-800 hover:border-slate-300';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyles =
                      'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs';
                  } else if (isChosen) {
                    btnStyles =
                      'bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-500/20 shadow-xs';
                  } else {
                    btnStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyles}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        selectedOption !== null && isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : selectedOption !== null && isChosen && !isCorrect
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{optText}</span>
                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {selectedOption !== null && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation, Law and Pitfalls Breakdown */}
            {showExplanation && (
              <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                {/* 1. Official Technical Explanation */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1.5">
                  <span className="font-extrabold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-700" />
                    <span>
                      {lang === 'pt'
                        ? 'Explicação & Fundamentação Técnica:'
                        : 'Explication & Justification Technique :'}
                    </span>
                  </span>
                  <p className="leading-relaxed text-justify text-slate-800">
                    {currentQ.explanation[lang]}
                  </p>
                </div>

                {/* 2. Official Canadian Standard & Law */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>
                      {lang === 'pt'
                        ? 'Padrão Oficial & Legislação Canadense Aplicada:'
                        : 'Norme Canadienne & Base Légale :'}
                    </span>
                  </span>
                  <p className="leading-relaxed text-slate-800">
                    {currentQ.canadianRule[lang]}
                  </p>
                </div>

                {/* 3. The Common Pitfall to Avoid */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-1">
                  <span className="font-extrabold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>
                      {lang === 'pt'
                        ? 'Pegadinha Frequente dos Candidatos Estrangeiros:'
                        : 'Piège Fréquent à Éviter :'}
                    </span>
                  </span>
                  <p className="leading-relaxed text-slate-800">
                    {currentQ.commonPitfall[lang]}
                  </p>
                </div>
              </div>
            )}

            {/* Next Button */}
            {selectedOption !== null && (
              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <span>
                    {currentQIndex === activeQuestions.length - 1
                      ? lang === 'pt'
                        ? 'Ver Relatório de Aptidão & Resultados'
                        : 'Voir le Rapport de Résultats'
                      : lang === 'pt'
                      ? 'Próxima Questão'
                      : 'Question Suivante'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Finished Scorecard & Next Steps */
          <div className="py-4 space-y-6">
            <div className="text-center space-y-3">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${
                    isPassed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {isPassed
                    ? lang === 'pt'
                      ? '✓ Aprovado para o Mercado Canadense'
                      : '✓ Niveau Validé pour Embauche'
                    : lang === 'pt'
                    ? '⚠ Necessita Revisão Prévia'
                    : '⚠ Révision Recommandée'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === 'pt'
                    ? `Resultado do Módulo: ${currentCategoryMeta.title.pt}`
                    : `Bilan : ${currentCategoryMeta.title.fr}`}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {lang === 'pt' ? 'Sua pontuação final:' : 'Votre résultat :'}{' '}
                  <strong className="text-slate-900 text-lg">
                    {score} / {activeQuestions.length}
                  </strong>{' '}
                  ({scorePct}%) • {lang === 'pt' ? 'Média de corte exigida:' : 'Seuil d’embauche :'}{' '}
                  {currentCategoryMeta.passingScore}%
                </p>
              </div>
            </div>

            {/* Diagnostic Box */}
            <div className="p-5 max-w-2xl mx-auto rounded-3xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>
                  {lang === 'pt'
                    ? 'Diagnóstico dos Recrutadores do Québec:'
                    : 'Avis des Évaluateurs & Prochaines Étapes :'}
                </span>
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {isPassed
                  ? lang === 'pt'
                    ? `Parabéns! Sua pontuação de ${scorePct}% demonstra domínio das normas, linguagem e lógica operacional exigidas por empresas como ${currentCategoryMeta.employers.slice(0, 3).join(', ')}. Você está no patamar superior de candidatos para a fase de testes técnicos.`
                    : `Félicitations ! Votre score de ${scorePct}% confirme votre aptitude aux exigences d’entreprises telles que ${currentCategoryMeta.employers.slice(0, 3).join(', ')}. Vous répondez aux critères des processus d’embauche québécois.`
                  : lang === 'pt'
                  ? `Seu score de ${scorePct}% indica que é prudente revisar as pegadinhas e regras específicas da legislação do Québec antes de prestar o exame real de recrutamento. Releia as explicações de cada questão acima.`
                  : `Votre résultat (${scorePct}%) suggère de consolider vos connaissances avant le test réel d’embauche. Prenez le temps de revoir les justifications légales et les calculs détaillés.`}
              </p>
            </div>

            {/* Interconnected Career Navigation Bridge */}
            <div className="p-5 max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-indigo-950">
                    {lang === 'pt'
                      ? 'Treinar a Entrevista Comportamental (STAR)'
                      : 'Passer à l’Entrevue Comportementale STAR'}
                  </h5>
                  <p className="text-[11px] text-indigo-700">
                    {lang === 'pt'
                      ? 'Após passar nos testes técnicos, os recrutadores conduzem a entrevista situacional.'
                      : 'Validez votre discours d’entrevue auprès des gestionnaires québécois.'}
                  </p>
                </div>
              </div>

              {onNavigateToInterview && (
                <button
                  type="button"
                  onClick={onNavigateToInterview}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>
                    {lang === 'pt' ? 'Ir para Entrevistas' : 'Ouvrir les Entrevues'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>
                  {lang === 'pt' ? 'Refazer este Módulo' : 'Recommencer ce Test'}
                </span>
              </button>

              {/* Try another category */}
              <button
                type="button"
                onClick={() => {
                  const nextIndex =
                    (CATEGORIES_META.findIndex((c) => c.key === selectedCategory) + 1) %
                    CATEGORIES_META.length;
                  handleSwitchCategory(CATEGORIES_META[nextIndex].key);
                }}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>
                  {lang === 'pt' ? 'Testar Próxima Categoria' : 'Tester le Module Suivant'}
                </span>
              </button>

              {!isPro && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenProModal('Débloquez la banque de 50+ épreuves écrites et orales complètes.')
                  }
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Crown className="w-4 h-4 text-slate-950" />
                  <span>Pass Pro (50+ Tests Corrigés)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
