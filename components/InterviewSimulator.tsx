'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '@/lib/i18n';
import {
  Mic,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Crown,
  ChevronRight,
  ChevronLeft,
  Timer,
  Award,
  HelpCircle,
  Briefcase,
  Layers,
  ArrowRight,
  Search,
  Check,
  Target,
  FileCheck2,
  Cpu,
  ShieldCheck,
  Compass,
  MessageSquare,
  Flame,
} from 'lucide-react';

export type QuestionCategory =
  | 'all'
  | 'icebreaker'
  | 'star-conflict'
  | 'star-pressure'
  | 'star-leadership'
  | 'mistakes-learning'
  | 'salary-benefits'
  | 'culture-safety';

export type QuestionSector = 'all' | 'industrial' | 'tech' | 'corporate' | 'service';

export interface InterviewQuestionItem {
  id: number;
  categoryKey: QuestionCategory;
  categoryLabel: Record<Language, string>;
  sector: QuestionSector;
  sectorLabel: Record<Language, string>;
  question: Record<Language, string>;
  recruiterIntent: Record<Language, string>;
  modelAnswer: Record<Language, string>;
  tipsToSucceed: Record<Language, string[]>;
  mistakesToAvoid: Record<Language, string[]>;
  impactKeywords: string[];
  starFormula: {
    situation: Record<Language, string>;
    task: Record<Language, string>;
    action: Record<Language, string>;
    result: Record<Language, string>;
  };
}

interface InterviewSimulatorProps {
  lang: Language;
  isPro: boolean;
  onOpenProModal: (trigger?: string) => void;
  onNavigateToTests?: () => void;
}

export const INTERVIEW_QUESTIONS: InterviewQuestionItem[] = [
  // 1. ICEBREAKER & CULTURAL FIT
  {
    id: 1,
    categoryKey: 'icebreaker',
    categoryLabel: {
      pt: 'Apresentação & Fit Cultural',
      fr: 'Présentation & Accroche',
      en: 'Introduction & Cultural Fit',
    },
    sector: 'all',
    sectorLabel: { pt: 'Todos os Setores', fr: 'Tous secteurs', en: 'All sectors' },
    question: {
      pt: 'Fale-me sobre você e o que o motivou a se candidatar a esta vaga aqui no Québec.',
      fr: 'Parlez-moi de vous et de ce qui vous amène aujourd’hui à postuler chez nous au Québec.',
      en: 'Tell me about yourself and what brought you to apply for this position here in Quebec.',
    },
    recruiterIntent: {
      pt: 'O recrutador québécois quer uma resposta concisa de no máximo 2 minutos. Ele avalia sua capacidade de síntese, clareza profissional e se você pesquisou sobre a empresa, sem desviar para detalhes da vida pessoal ou apelar para justificativas puramente migratórias.',
      fr: 'Les recruteurs québécois veulent une réponse concise de 2 minutes chrono, orientée valeur ajoutée et culture d’équipe, sans réciter toute votre enfance ni parler uniquement de vos démarches d’immigration.',
      en: 'The Canadian hiring manager expects a crisp 2-minute pitch focusing on professional achievements, teamwork, and genuine interest in the company, avoiding purely immigration-driven motivations.',
    },
    modelAnswer: {
      pt: '« Olá! Em resumo, somo mais de 5 anos de experiência técnica em ambientes dinâmicos de produção e processos. Ao longo da minha carreira, desenvolvi sólida competência em diagnóstico rápido de falhas, otimização de cadências operacionais e rigorosa aplicação de normas de qualidade e segurança. O que me atraiu particularmente na empresa de vocês é a cultura de inovação contínua e a comunicação horizontal entre as equipes. Busco exatamente um ambiente colaborativo onde possa aplicar minha autonomia, compromisso com a melhoria contínua e construir uma trajetória sólida aqui no Québec. »',
      fr: '« Bonjour ! En résumé, je cumule plus de 5 ans d’expérience technique en milieu de production et d’optimisation des cadences. Au cours de mon parcours, j’ai développé une solide expertise dans le diagnostic rapide des pannes et le respect scrupuleux des normes de sécurité de la CNESST. Ce qui m’attire particulièrement chez vous, c’est votre culture axée sur l’innovation continue et la collaboration transparente d’équipe. Je cherche un environnement dynamique où mettre à profit mon autonomie et mon souci du travail bien fait. »',
      en: '« Hello! In summary, I bring over 5 years of hands-on technical experience in fast-paced production and process optimization. Throughout my journey, I developed expertise in root-cause troubleshooting and maintaining strict compliance with safety regulations. What specifically drew me to your organization is your culture of continuous improvement and transparent team collaboration. I am looking for a dynamic workplace where my autonomy and commitment to quality can add measurable value. »',
    },
    tipsToSucceed: {
      pt: [
        'Adote um tom caloroso, direto e humilde (a modéstia positiva é extremamente valorizada no Québec).',
        'Estruture a fórmula: Passado (sua força central) → Presente (competência chave aplicada) → Futuro (o valor que você entregará à empresa).',
        'Mencione um valor real ou projeto recente da empresa encontrado no site ou LinkedIn oficial.',
      ],
      fr: [
        'Adoptez un ton chaleureux, direct et humble (très apprécié au Québec).',
        'Structurez : Passé (votre force principale) → Présent (votre compétence clé) → Futur (ce que vous apportez à l’entreprise).',
        'Mentionnez une valeur de l’entreprise vue sur leur site web ou rapport public.',
      ],
      en: [
        'Use an approachable, humble, and positive tone (corporate modesty is highly prized in Quebec).',
        'Structure: Past strength → Present core skill → Future impact on the employer.',
        'Reference a company project or core value found on their official site.',
      ],
    },
    mistakesToAvoid: {
      pt: [
        'Recitar o currículo linha por linha desde o ensino médio.',
        'Falar que você quer o emprego "apenas para renovar visto de trabalho ou conseguir a residência permanente".',
        'Adotar postura arrogante do tipo "eu sou o melhor do mercado".',
      ],
      fr: [
        'Réciter mot pour mot votre CV chronologique depuis vos études secondaires.',
        'Parler uniquement de votre besoin de visa ou de points d’immigration au lieu de vos compétences.',
        'Adopter un ton arrogant ou autoritaire.',
      ],
      en: [
        'Reading your resume line-by-line starting from high school.',
        'Stating you only want the job for visa sponsorship or immigration points.',
        'Bragging or appearing overly aggressive.',
      ],
    },
    impactKeywords: ['collaboration', 'autonomie', 'amélioration continue', 'CNESST', 'valeur ajoutée'],
    starFormula: {
      situation: {
        pt: 'Trajetória profissional resumida com 5 anos de experiência no setor.',
        fr: 'Parcours ciblé de 5 ans en production et diagnostic technique.',
        en: 'Targeted 5-year background in technical operations and troubleshooting.',
      },
      task: {
        pt: 'Apresentar meu domínio de competências e compatibilidade com a cultura.',
        fr: 'Montrer mon adéquation culturelle avec l’entreprise québécoise.',
        en: 'Demonstrate alignment with the company’s mission and team culture.',
      },
      action: {
        pt: 'Comunicação direta, foco em segurança e iniciativa em melhoria contínua.',
        fr: 'Mise en avant de l’écoute, du respect des normes et de l’autonomie.',
        en: 'Highlight proactive troubleshooting, safety first, and cross-team communication.',
      },
      result: {
        pt: 'Conectar minhas forças diretamente aos desafios atuais da vaga.',
        fr: 'Prouver que je suis opérationnel immédiatement et engagé dans la durée.',
        en: 'Establish immediate readiness to contribute to team objectives.',
      },
    },
  },

  // 2. STAR CONFLICT & WORKPLACE HARMONY
  {
    id: 2,
    categoryKey: 'star-conflict',
    categoryLabel: {
      pt: 'Conflitos & Diplomacia Québécoise',
      fr: 'Climat de Travail & Relations Interpersonnelles',
      en: 'Conflict Resolution & Diplomacy',
    },
    sector: 'all',
    sectorLabel: { pt: 'Todos os Setores', fr: 'Tous secteurs', en: 'All sectors' },
    question: {
      pt: 'Como você reage quando discorda abertamente do método de trabalho de um colega ou de uma instrução em um projeto?',
      fr: 'Comment réagissez-vous si vous êtes en désaccord avec la méthode d’un collègue sur un projet ?',
      en: 'How do you handle a situation where you disagree with a colleague’s method on a project?',
    },
    recruiterIntent: {
      pt: 'A cultura corporativa no Québec prioriza a harmonia interpessoal, a escuta ativa e o consenso. Confrontos agressivos, elevar a voz ou recorrer a joguinhos de poder hierárquico são fatais. O recrutador quer ver sua diplomacia e respeito ao clima de equipe.',
      fr: 'La culture québécoise valorise l’harmonie, la diplomatie et le consensus. Les confrontations directes agressives ou les jeux de pouvoir hiérarchiques sont éliminatoires.',
      en: 'Canadian and Quebec work cultures deeply value collaborative harmony and diplomatic communication. The interviewer wants to test active listening and emotional intelligence.',
    },
    modelAnswer: {
      pt: '« Em primeiro lugar, busco praticar a escuta ativa: peço para o colega me explicar o raciocínio por trás do método dele, pois muitas vezes há restrições ou aprendizados que eu ainda não havia percebido. Em seguida, converso com ele reservadamente, com calma e respeito, propondo uma abordagem colaborativa: "O que você acha de testarmos essa alternativa em uma amostra para comparar o tempo e a segurança?". Se a divergência persistir, nós nos apoiamos juntos nas normas de qualidade ou consultamos o supervisor de forma neutra, com foco total no objetivo do projeto e sem levar nada para o lado pessoal. »',
      fr: '« Dans un premier temps, j’écoute activement son point de vue pour comprendre la logique derrière sa méthode : souvent, il y a des contraintes que je n’avais pas perçues. Ensuite, j’échange avec lui en privé, dans le respect et le calme, en proposant mon approche sous forme de suggestion : "Est-ce qu’on pourrait tester ceci sur un lot pilote pour voir si on gagne en cadence ?". Si le désaccord persiste, on se réfère ensemble aux standards de qualité ou on demande un éclairage neutre au superviseur, toujours dans l’optique du bien commun. »',
      en: '« First, I practice active listening to fully understand the rationale behind their approach, as there might be constraints I had not considered. Then, I discuss it one-on-one in private calmly and respectfully, proposing an empirical comparison: "Could we test both approaches on a small sample to evaluate quality and safety?". If the disagreement remains, we refer together to established quality standards or consult our team lead neutrally, keeping the team’s common goal at the center without personal ego. »',
    },
    tipsToSucceed: {
      pt: [
        'Destaque que a conversa é sempre em particular (tête-à-tête), nunca na frente dos outros ou na reunião geral.',
        'Use expressões colaborativas como "sugestão", "testar juntos" e "padrões de qualidade".',
        'Mostre que você não guarda ressentimentos e preserva o bom humor no ambiente de trabalho.',
      ],
      fr: [
        'Précisez que vous discutez toujours en privé, jamais en public devant les autres.',
        'Utilisez des termes axés sur les faits et les normes de qualité plutôt que sur les opinions.',
        'Montrez votre sens de la diplomatie et du respect du climat de travail.',
      ],
      en: [
        'Always specify having the conversation privately, never in front of others.',
        'Rely on objective benchmarks and safety/quality standards rather than personal opinions.',
        'Emphasize emotional stability and maintaining a positive work atmosphere.',
      ],
    },
    mistakesToAvoid: {
      pt: [
        'Dizer "eu imponho o meu jeito porque sou o mais experiente e estou certo".',
        'Correr para reclamar com o chefe antes de conversar abertamente com o colega.',
        'Fazer fofoca ou criar panelas na empresa.',
      ],
      fr: [
        'Dire « j’impose ma façon de faire parce que j’ai raison ».',
        'Courir voir le superviseur au moindre désaccord sans avoir parlé avec le collègue d’abord.',
        'Alimenter des tensions dans l’équipe.',
      ],
      en: [
        'Saying "I force my way because I have more experience".',
        'Escalating to management immediately without talking to the colleague first.',
        'Talking behind colleagues’ backs.',
      ],
    },
    impactKeywords: ['écoute active', 'échange en privé', 'diplomatie', 'consensus', 'standards de qualité'],
    starFormula: {
      situation: {
        pt: 'Divergência de métodos técnicos entre dois profissionais.',
        fr: 'Différence de méthode entre deux techniciens sur un livrable.',
        en: 'Disagreement on technical implementation between peers.',
      },
      task: {
        pt: 'Encontrar a solução mais eficiente sem gerar atrito na equipe.',
        fr: 'Trouver la solution la plus sûre sans dégrader le climat d’équipe.',
        en: 'Find the safest and most efficient path forward while preserving trust.',
      },
      action: {
        pt: 'Diálogo calmo em privado, validação mútua e teste comparativo.',
        fr: 'Discussion privée, écoute active et test sur un échantillon pilote.',
        en: 'Private one-on-one discussion, active listening, and objective pilot test.',
      },
      result: {
        pt: 'Melhor método adotado com aprendizado mútuo e relação fortalecida.',
        fr: 'Meilleure méthode adoptée d’un commun accord dans un climat serein.',
        en: 'Optimal solution chosen collaboratively with strengthened peer relationship.',
      },
    },
  },

  // 3. STAR PRESSURE & AUTONOMY
  {
    id: 3,
    categoryKey: 'star-pressure',
    categoryLabel: {
      pt: 'Autonomia & Resolução de Problemas',
      fr: 'Autonomie & Gestion des Imprévus',
      en: 'Autonomy & Problem Solving',
    },
    sector: 'industrial',
    sectorLabel: { pt: 'Indústria & Operações', fr: 'Industrie & Opérations', en: 'Manufacturing & Operations' },
    question: {
      pt: 'Descreva uma situação imprevista onde uma máquina ou sistema parou criticamente e você teve que tomar uma decisão rápida sem ter seu supervisor por perto.',
      fr: 'Décrivez une situation imprévue où vous avez dû prendre une décision rapide sans avoir votre superviseur sous la main.',
      en: 'Describe an unexpected situation where a critical system failed and you had to act quickly without your supervisor present.',
    },
    recruiterIntent: {
      pt: 'No Québec, as empresas possuem hierarquias muito horizontais. Os gestores detestam microgerenciamento e buscam candidatos com bom senso, iniciativa própria e que coloquem a segurança (CNESST) e os procedimentos acima do desespero.',
      fr: 'Au Québec, la hiérarchie est très plate. Les gestionnaires détestent le micro-management et cherchent des candidats autonomes capables d’agir avec bon sens et sécurité (CNESST).',
      en: 'Canadian companies operate with flat hierarchies. Leaders avoid micromanagement and prize resourceful team members who act safely and calmly under pressure.',
    },
    modelAnswer: {
      pt: '« Durante um turno da noite no ano passado, uma das esteiras de embalagem parou repentinamente por superaquecimento de sensor enquanto o líder de equipe estava atendendo a uma emergência em outro prédio. A prioridade era evitar que a linha anterior travasse sem colocar ninguém em perigo. Imediatamente apliquei o protocolo de bloqueio seguro (cadenassage), desviei o fluxo temporariamente para a linha de espera e identifiquei que o sensor estava apenas obstruído por poeira residual. Realizei a limpeza, fiz o teste em vazio e reativei a produção em menos de 15 minutos, evitando a perda de produtos perecíveis estimada em $3.500 CAD. Em seguida, registrei o incidente detalhado no livro de turno para o supervisor matinal. »',
      fr: '« (Situation) Lors d’un quart de soir l’an dernier, un convoyeur principal s’est arrêté suite à une surchauffe de capteur alors que le chef d’équipe était en réunion d’urgence ailleurs. (Tâche) Il fallait éviter l’engorgement de la chaîne sans compromettre la sécurité. (Action) J’ai immédiatement enclenché le protocole de cadenassage sécurisé (CNESST), dévié le flux secondaire et nettoyé le capteur encrassé avant de tester à vide. (Résultat) La ligne est repartie en 14 minutes, évitant environ 3 500 $ de pertes de matières. J’ai ensuite consigné l’intervention dans le rapport de quart pour le superviseur. »',
      en: '« (Situation) During an evening shift last year, a main conveyor tripped due to a thermal sensor alert while the supervisor was occupied at another facility. (Task) I needed to prevent upstream backlog without taking any safety shortcuts. (Action) I immediately initiated lock-out tag-out (LOTO) protocols, rerouted production to an overflow buffer, cleaned the obstructed optical sensor, and completed a cold test run. (Result) The line was back online within 14 minutes, saving approximately $3,500 CAD in perishable inventory, followed by a full entry in the shift handover log. »',
    },
    tipsToSucceed: {
      pt: [
        'Mencione protocolos de segurança oficiais (cadenassage, isolamento de risco, EPIs) antes de falar de velocidade.',
        'Quantifique o resultado: minutos economizados, dólares poupados ou índice de retrabalho evitado.',
        'Enfatize que documentou tudo no relatório para o líder no final do turno.',
      ],
      fr: [
        'Mentionnez la sécurité (cadenassage CNESST) avant toute notion de vitesse.',
        'Donnez des résultats chiffrés : minutes d’arrêt évitées, dollars préservés.',
        'Soulignez la traçabilité en consignant l’incident dans le rapport de quart.',
      ],
      en: [
        'Always prioritize safety protocol (LOTO, hazard control) before mentioning speed.',
        'Provide quantifiable results: downtime avoided, cost savings, zero safety incidents.',
        'Highlight communication follow-through via comprehensive shift logs.',
      ],
    },
    mistakesToAvoid: {
      pt: [
        'Dizer "eu dei um jeitinho sem desligar a máquina para não atrasar a produção".',
        'Afirmar que ficou de braços cruzados esperando o chefe voltar.',
        'Esconder o problema sem documentar no relatório de turno.',
      ],
      fr: [
        'Dire « j’ai contourné les règles de sécurité pour aller plus vite » (éliminatoire !).',
        'Dire « je n’ai rien fait car ce n’était pas sur ma fiche de poste ».',
        'Ne pas laisser de trace écrite de l’incident.',
      ],
      en: [
        'Bypassing safety guards to rush production (instant rejection!).',
        'Saying you waited idly for someone else to tell you what to do.',
        'Failing to log the incident in official documentation.',
      ],
    },
    impactKeywords: ['cadenassage', 'sécurité d’abord', 'rapport de quart', 'autonomie', 'décision mesurée'],
    starFormula: {
      situation: {
        pt: 'Parada súbita de equipamento crítico durante turno da noite com líder ausente.',
        fr: 'Arrêt imprévu d’un convoyeur critique avec superviseur indisponible.',
        en: 'Unscheduled critical machine failure during night shift without supervisor on-site.',
      },
      task: {
        pt: 'Prevenir perda de matéria-prima mantendo conformidade integral de segurança.',
        fr: 'Rétablir le flux rapidement sans aucune dérogation aux règles de sécurité.',
        en: 'Restore operational throughput safely while adhering strictly to safety standards.',
      },
      action: {
        pt: 'Bloqueio seguro (cadenassage), isolamento, limpeza de sensor e teste a vazio.',
        fr: 'Cadenassage officiel, dérivation du flux, nettoyage et vérification à vide.',
        en: 'Followed LOTO procedure, diverted overflow, repaired sensor, and validated test.',
      },
      result: {
        pt: 'Retomada em 14 minutos, economia de $3.500 CAD e registro oficial de turno.',
        fr: 'Relance en 14 minutes, économie de 3 500 $ et consignation dans le journal.',
        en: 'Production restarted in 14 minutes, prevented $3,500 in scrap, logged report.',
      },
    },
  },

  // 4. MISTAKES & HUMILITY
  {
    id: 4,
    categoryKey: 'mistakes-learning',
    categoryLabel: {
      pt: 'Gestão de Erros & Humildade',
      fr: 'Droit à l’Erreur & Rétroaction',
      en: 'Ownership of Mistakes & Growth',
    },
    sector: 'all',
    sectorLabel: { pt: 'Todos os Setores', fr: 'Tous secteurs', en: 'All sectors' },
    question: {
      pt: 'Conte-me sobre um erro profissional que você cometeu no passado. Como você reagiu e o que aprendeu com isso?',
      fr: 'Parlez-moi d’une erreur professionnelle que vous avez commise. Comment avez-vous réagi et qu’en avez-vous tiré ?',
      en: 'Tell me about a professional mistake you made in the past. How did you handle it and what did you learn?',
    },
    recruiterIntent: {
      pt: 'O recrutador quer testar sua maturidade emocional e transparência (humilité québécoise). Quem diz que "nunca errou" ou culpa os colegas é reprovado. Eles querem ver se você assume a responsabilidade imediatamente e cria barreiras para o erro não se repetir.',
      fr: 'Le recruteur évalue votre honnêteté intellectuelle et votre capacité d’apprentissage. Les candidats qui prétendent n’avoir jamais fait d’erreur ou qui blâment autrui sont immédiatement disqualifiés.',
      en: 'Employers test integrity, transparency, and psychological maturity. Candidates who claim perfection or deflect blame onto others fail immediately. Ownership and corrective action are what count.',
    },
    modelAnswer: {
      pt: '« Há cerca de dois anos, ao emitir uma lista de componentes para montagem de um pedido urgente, selecionei um código de peça desatualizado por não ter conferido a última revisão técnica da pasta compartilhada. Percebi o equívoco cerca de duas horas depois, durante a pré-montagem. Em vez de tentar camuflar, fui imediatamente até o líder de projeto, assumi a falha com total transparência e apresentei a solução: contatei o estoque central, substituímos as peças em 40 minutos e compensei o tempo para entregar o lote no mesmo dia. Como aprendizado, propus a criação de uma checklist simples de verificação cruzada de versão que a equipe adotou oficialmente, reduzindo erros de código a zero nos meses seguintes. »',
      fr: '« Il y a deux ans, lors de la préparation d’une commande prioritaire, j’ai validé une référence de pièce obsolète par manque de vérification de l’indice de révision. Dès que je m’en suis rendu compte, je suis allé directement voir mon chef d’équipe pour lui expliquer la situation sans faux-fuyant et avec une solution : j’ai vérifié l’inventaire, réapprovisionné les bonnes pièces en 45 minutes et réajusté le planning pour livrer à l’heure. Suite à cela, j’ai mis en place une checklist de vérification des versions que tout le département a adoptée, éliminant totalement ce type d’erreur par la suite. »',
      en: '« Two years ago, while ordering components for an expedited build, I pulled an outdated part SKU because I did not double-check the latest drawing revision in the shared drive. The moment I caught the discrepancy, I approached my team lead directly, took full ownership, and brought an immediate corrective plan: I expedited stock from central inventory, swapped the units within 45 minutes, and adjusted my shift to deliver on time. Following this incident, I implemented a simple two-point version verification checklist that our department standardized, driving repeat errors to zero. »',
    },
    tipsToSucceed: {
      pt: [
        'Escolha um erro real, mas não fatal (evite falar de erros graves de segurança ou conduta ética).',
        'Enfatize a velocidade com que você avisou o líder (transparência imediata).',
        'Termine mostrando a melhoria contínua que você criou para evitar a reincidência.',
      ],
      fr: [
        'Choisissez une erreur réelle et surmontable (jamais une faute délibérée ou de sécurité grave).',
        'Montrez que vous avez assumé immédiatement sans chercher de bouc émissaire.',
        'Expliquez le processus ou la checklist mise en place pour que cela ne se reproduise plus.',
      ],
      en: [
        'Pick a genuine operational mistake, never a major ethical or safety violation.',
        'Highlight immediate proactive disclosure to management without hesitation.',
        'Showcase the lasting system or checklist you built to prevent recurrence.',
      ],
    },
    mistakesToAvoid: {
      pt: [
        'Responder "eu sou perfeccionista demais, esse é meu único erro" (resposta clichê desastrosa).',
        'Culpar colegas, o sistema antigo ou a falta de treinamento da empresa anterior.',
        'Dizer que nunca cometeu erros na vida.',
      ],
      fr: [
        'Répondre « je suis trop perfectionniste » (le pire cliché en entrevue !).',
        'Accuser un ancien collègue ou la mauvaise organisation de votre ancien employeur.',
        'Prétendre n’avoir jamais commis la moindre faute professionnelle.',
      ],
      en: [
        'Answering "I am too much of a perfectionist" (widely recognized cliché).',
        'Blaming team members or former employer management.',
        'Pretending you have never experienced setbacks.',
      ],
    },
    impactKeywords: ['transparence', 'responsabilité', 'mesures correctives', 'checklist', 'apprentissage'],
    starFormula: {
      situation: {
        pt: 'Seleção de código de peça desatualizado em pedido urgente.',
        fr: 'Sélection d’une référence technique obsolète lors d’une commande.',
        en: 'Pulling an outdated SKU during an expedited assembly order.',
      },
      task: {
        pt: 'Corrigir o lote sem comprometer o prazo final de entrega ao cliente.',
        fr: 'Corriger l’écart sans retarder la livraison finale promise.',
        en: 'Rectify components without violating customer dispatch SLA.',
      },
      action: {
        pt: 'Comunicação imediata e transparente ao líder, troca de estoque e horas extras.',
        fr: 'Alerte immédiate du superviseur, réapprovisionnement rapide et rattrapage.',
        en: 'Immediate disclosure to team lead, expedited inventory swap, and extra shift focus.',
      },
      result: {
        pt: 'Entrega pontual mantida e criação de checklist oficial adotada por todos.',
        fr: 'Livraison réussie à temps et création d’une checklist adoptée par l’équipe.',
        en: 'Zero customer delay and created team-wide checklist preventing future errors.',
      },
    },
  },

  // 5. SALARY & TOTAL COMPENSATION
  {
    id: 5,
    categoryKey: 'salary-benefits',
    categoryLabel: {
      pt: 'Negociação Salarial & Benefícios',
      fr: 'Rémunération Globale & Négociation',
      en: 'Compensation & Benefits Negotiation',
    },
    sector: 'all',
    sectorLabel: { pt: 'Todos os Setores', fr: 'Tous secteurs', en: 'All sectors' },
    question: {
      pt: 'Quais são suas pretensões salariais para esta oportunidade e como você avalia o pacote de benefícios da nossa empresa?',
      fr: 'Quelles sont vos prétentions salariales pour ce poste et comment considérez-vous notre offre globale ?',
      en: 'What are your salary expectations for this position and how do you evaluate our total benefits package?',
    },
    recruiterIntent: {
      pt: 'Pergunta crucial! Dar um número muito baixo desvaloriza seu perfil; pedir um valor fora da realidade do mercado canadense elimina sua candidatura. O recrutador quer ver se você pesquisou as referências locais (Guichet-Emploi, PaieNet) e se compreende a "remuneração global" (seguro coletivo, férias e REER).',
      fr: 'Les recruteurs québécois veulent vérifier si vous connaissez la valeur réelle du marché local et si vous comprenez la rémunération globale (assurances collectives, primes, vacances et REER).',
      en: 'Interviewers verify whether you researched local Quebec salary benchmarks and understand total compensation beyond base wage, including employer RRSP match, group insurance, and paid time off.',
    },
    modelAnswer: {
      pt: '« Com base em pesquisas de mercado para funções equivalentes na região metropolitana de Montreal/Québec e considerando meus 5 anos de experiência prática e autonomia comprovada, minha expectativa situa-se em uma faixa entre $28,00 e $32,00 por hora (ou aproximadamente $58.000 a $66.000 anuais). No entanto, para mim a remuneração global é essencial: levo muito em conta a cobertura do seguro coletivo de saúde e odontológico, a contrapartida da empresa no REER (match) e as oportunidades de desenvolvimento profissional contínuo. Estou plenamente aberto a discutir o pacote como um todo. »',
      fr: '« D’après mes recherches sur les échelles salariales actuelles pour ce type de rôle dans la région et compte tenu de mes 5 années d’expérience concrète, je vise une fourchette entre 28 $ et 32 $ de l’heure. Cela dit, j’accorde une grande importance à la rémunération globale : la part employeur dans l’assurance collective, le match REER et les semaines de congés font partie intégrante de mon évaluation. Je suis tout à fait ouvert à échanger sur l’ensemble de votre offre. »',
      en: '« Based on current compensation benchmarks for similar roles in the region and considering my 5 years of proven hands-on experience, I am targeting a range between $28 and $32 per hour (roughly $58,000 to $66,000 annually). That being said, total compensation is paramount to me: employer contributions to group health coverage, retirement matching (RRSP), and paid vacation are vital components. I am very open to reviewing the complete package collaboratively. »',
    },
    tipsToSucceed: {
      pt: [
        'Apresente sempre uma faixa salarial (ex: $28 a $32) em vez de um valor único engessado.',
        'Use o termo "remuneração global": demonstra que você entende a realidade trabalhista canadense.',
        'Mostre flexibilidade condicionada aos benefícios oferecidos.',
      ],
      fr: [
        'Donnez toujours une fourchette réaliste plutôt qu’un chiffre fixe.',
        'Mentionnez la notion de « rémunération globale » (assurances, vacances, REER).',
        'Montrez que vous êtes ouvert à la négociation en fonction de l’ensemble des avantages.',
      ],
      en: [
        'Always frame expectations within a reasonable range (e.g. $28 - $32/hr).',
        'Explicitly mention "total compensation" to signal Canadian workplace literacy.',
        'Stay constructive and open to overall package flexibility.',
      ],
    },
    mistakesToAvoid: {
      pt: [
        'Responder "não sei, paguem o que acharem justo" (desvalorização total).',
        'Chutar um valor sem ter verificado o salário médio no PaieNet ou Guichet-Emploi.',
        'Exigir apenas dinheiro bruto sem se importar com seguros ou previdência.',
      ],
      fr: [
        'Dire « je ne sais pas, payez ce que vous voulez ».',
        'Demander un chiffre exorbitant sans avoir vérifié les données du marché québécois.',
        'Ignorer complètement les assurances et le régime de retraite.',
      ],
      en: [
        'Saying "I don’t know, whatever you think is fair" (destroys professional leverage).',
        'Quoting an unrealistic rate without checking Quebec provincial wage data.',
        'Focusing strictly on gross cash while ignoring health benefits and pension matching.',
      ],
    },
    impactKeywords: ['fourchette salariale', 'rémunération globale', 'assurance collective', 'match REER', 'marché québécois'],
    starFormula: {
      situation: {
        pt: 'Pergunta salarial direta realizada pelo recrutador na entrevista.',
        fr: 'Question directe du recruteur sur les attentes financières.',
        en: 'Direct salary question posed by the hiring manager or recruiter.',
      },
      task: {
        pt: 'Fixar o valor de mercado de forma justa e diplomática.',
        fr: 'Poser sa valeur marchande avec tact et réalisme.',
        en: 'Anchor market value professionally while maintaining positive rapport.',
      },
      action: {
        pt: 'Apresentar faixa fundamentada em dados do mercado e vincular aos benefícios globais.',
        fr: 'Formuler une fourchette basée sur les études salariales et ouvrir sur les avantages.',
        en: 'Deliver benchmarked bracket while tying directly to total rewards package.',
      },
      result: {
        pt: 'Abertura para negociação transparente e respeito mútuo.',
        fr: 'Discussion ouverte et constructive sur l’offre globale d’embauche.',
        en: 'Constructive foundation set for mutual offer alignment.',
      },
    },
  },

  // 6. SAFETY CNESST & ETHICS
  {
    id: 6,
    categoryKey: 'culture-safety',
    categoryLabel: {
      pt: 'Segurança CNESST & Ética no Trabalho',
      fr: 'Sécurité CNESST & Éthique Professionnelle',
      en: 'Workplace Safety (CNESST) & Ethics',
    },
    sector: 'industrial',
    sectorLabel: { pt: 'Indústria, Manufatura & Logística', fr: 'Industrie & Logistique', en: 'Manufacturing & Logistics' },
    question: {
      pt: 'Se em um dia de muita pressão na produção um colega ou supervisor sugerisse pular um procedimento de segurança (como o bloqueio/cadenassage) para "ganhar 20 minutos", o que você faria?',
      fr: 'Si lors d’un coup de bourre en production, on vous demandait de contourner une procédure de cadenassage pour "gagner 20 minutes", que feriez-vous ?',
      en: 'If during a peak production rush, someone asked you to bypass a safety lock-out procedure to "save 20 minutes", what would you do?',
    },
    recruiterIntent: {
      pt: 'Esta é uma "pergunta armadilha clássica" na indústria e manufatura do Québec. Se o candidato disser que aceitaria a violação para cumprir a meta da empresa, é REPROVADO NA HORA. No Québec, a CNESST impõe responsabilidade penal severa para acidentes. A segurança física é inegociável.',
      fr: 'Question test absolue ! Tout candidat qui répond qu’il contournerait la règle pour faire plaisir à la production est RECALÉ IMMÉDIATEMENT. Au Québec, la santé et sécurité (LSST/CNESST) prime sur toute cadence.',
      en: 'A decisive litmus test question in Canadian industrial, logistics, and engineering hiring. Anyone who compromises safety for speed is disqualified on the spot. Legal liabilities under CNESST are paramount.',
    },
    modelAnswer: {
      pt: '« Minha resposta é categórica e tranquila: eu me recuso a contornar qualquer procedimento de segurança, e a lei do Québec (artigo 12 da LSST) garante expressamente esse direito de recusa para proteger a integridade de todos. No entanto, eu não fico apenas no "não": eu explico de forma cortês ao colega ou supervisor que 20 minutos economizados nunca compensam o risco de um acidente grave ou a paralisação da fábrica pela CNESST. Em seguida, proponho alternativas seguras para acelerar o processo sem violar o cadenassage (como organizar as ferramentas com antecedência ou dividir tarefas paralelas de preparação). A segurança é o alicerce da produtividade sustentável. »',
      fr: '« Ma réponse est claire et non négociable : je refuse poliment mais fermement de contourner la procédure de cadenassage. Au Québec, l’article 12 de la LSST consacre le droit de refus lorsqu’il y a danger. Cela dit, j’adopte une posture constructive : j’explique avec calme que le risque d’accident et les sanctions CNESST coûteraient bien plus cher que 20 minutes. Je propose ensuite une solution parallèle pour optimiser la préparation et regagner du temps de manière 100 % sécurisée. La sécurité ne se négocie jamais. »',
      en: '« My stance is unequivocal and respectful: I refuse to bypass lock-out or safety procedures under any circumstance. Under Section 12 of Quebec’s Act respecting occupational health and safety (LSST), every worker has a protected right to refuse dangerous work. However, I remain solution-driven: I calmly explain that avoiding injury and regulatory shutdown is worth far more than 20 minutes. I then offer safe alternatives—such as staging replacement components in advance to recover time legitimately. Workplace safety is non-negotiable. »',
    },
    tipsToSucceed: {
      pt: [
        'Demonstre firmeza absoluta com diplomacia: a segurança nunca cede diante da pressa.',
        'Cite o termo "Droit de refus" (Artigo 12 da LSST/CNESST).',
        'Apresente uma alternativa proativa para compensar o tempo de forma segura.',
      ],
      fr: [
        'Fermeté totale sur la sécurité combinée avec de la diplomatie dans le ton.',
        'Mentionnez le droit de refus (article 12 de la LSST).',
        'Proposez une solution alternative constructive pour regagner du temps en toute sécurité.',
      ],
      en: [
        'Absolute adherence to safety standards combined with polite, calm assertiveness.',
        'Reference the statutory "Right of Refusal" (LSST / Occupational Health and Safety Act).',
        'Propose positive process alternatives to optimize staging without safety shortcuts.',
      ],
    },
    mistakesToAvoid: {
      pt: [
        'Dizer "se o chefe mandar por escrito, eu faço" (eliminação imediata).',
        'Achar que a produção vem antes da vida e saúde dos trabalhadores.',
        'Ser agressivo ao dizer "não" em vez de explicar com calma e profissionalismo.',
      ],
      fr: [
        'Dire « si mon patron insiste, je le fais quand même » (élimination immédiate).',
        'Hésiter ou minimiser l’importance du cadenassage.',
        'Se montrer agressif plutôt que pédagogique et professionnel.',
      ],
      en: [
        'Saying "if management insists, I will do it anyway" (immediate failure).',
        'Hesitating or treating safety as secondary to production goals.',
        'Becoming confrontational instead of offering professional, calm rationale.',
      ],
    },
    impactKeywords: ['droit de refus', 'LSST article 12', 'cadenassage obligatoire', 'sécurité inconditionnelle', 'CNESST'],
    starFormula: {
      situation: {
        pt: 'Pressão de produção para pular protocolo de segurança e poupar tempo.',
        fr: 'Pression de cadence pour contourner une mesure de sécurité obligatoire.',
        en: 'Schedule pressure urging shortcuts around mandatory safety protocols.',
      },
      task: {
        pt: 'Manter a conformidade legal intransigente e evitar riscos de acidentes graves.',
        fr: 'Protéger l’intégrité physique de l’équipe tout en trouvant des gains de temps sûrs.',
        en: 'Protect worker safety unconditionally while identifying compliant process optimizations.',
      },
      action: {
        pt: 'Recusa polida e firme amparada na LSST, diálogo construtivo e otimização paralela.',
        fr: 'Exercice serein du droit de refus, explication factuelle et réorganisation des tâches.',
        en: 'Firm yet polite refusal anchored in health & safety law, paired with smart staging.',
      },
      result: {
        pt: 'Zero acidentes, conformidade preservada e respeito conquistado na equipe.',
        fr: 'Opération 100 % sécurisée, zéro accident et respect renforcé des standards.',
        en: 'Zero safety incidents, full regulatory compliance, and reinforced culture of trust.',
      },
    },
  },
];

export const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({
  lang,
  isPro,
  onOpenProModal,
  onNavigateToTests,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('all');
  const [selectedSector, setSelectedSector] = useState<QuestionSector>('all');
  const [currentId, setCurrentId] = useState<number>(INTERVIEW_QUESTIONS[0].id);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // User Interactive Workspace
  const [userDraftMode, setUserDraftMode] = useState<'free' | 'star'>('free');
  const [userFreeResponse, setUserFreeResponse] = useState('');
  const [starInput, setStarInput] = useState({
    situation: '',
    task: '',
    action: '',
    result: '',
  });
  const [evaluatedScore, setEvaluatedScore] = useState<{
    score: number;
    feedback: string[];
    strengths: string[];
    wordCount: number;
  } | null>(null);

  // Completed questions tracker
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  // Filtered Questions List
  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter((q) => {
      const matchCat = selectedCategory === 'all' || q.categoryKey === selectedCategory;
      const matchSec = selectedSector === 'all' || q.sector === 'all' || q.sector === selectedSector;
      return matchCat && matchSec;
    });
  }, [selectedCategory, selectedSector]);

  const currentQ = useMemo(() => {
    const found = filteredQuestions.find((q) => q.id === currentId);
    return found || filteredQuestions[0] || INTERVIEW_QUESTIONS[0];
  }, [filteredQuestions, currentId]);

  const currentIndex = useMemo(() => {
    const idx = filteredQuestions.findIndex((q) => q.id === currentQ.id);
    return idx >= 0 ? idx : 0;
  }, [filteredQuestions, currentQ]);

  // Reset answer states when switching question
  const handleSelectQuestion = (id: number) => {
    setCurrentId(id);
    setShowAnswer(false);
    setTimerSeconds(120);
    setIsTimerRunning(false);
    setUserFreeResponse('');
    setStarInput({ situation: '', task: '', action: '', result: '' });
    setEvaluatedScore(null);
  };

  // Timer Countdown
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Analyze User's Response
  const handleEvaluateResponse = () => {
    const textToCheck =
      userDraftMode === 'free'
        ? userFreeResponse
        : `${starInput.situation} ${starInput.task} ${starInput.action} ${starInput.result}`;

    const words = textToCheck.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const strengths: string[] = [];
    const feedback: string[] = [];
    let score = 50;

    if (wordCount < 25) {
      feedback.push(
        lang === 'pt'
          ? 'Sua resposta está muito curta. Em entrevistas no Québec, uma boa resposta comportamental dura entre 1 e 2 minutos (~120 a 180 palavras).'
          : 'Votre réponse est trop brève. Développez davantage vos actions et résultats concrets.'
      );
    } else if (wordCount >= 25 && wordCount <= 220) {
      score += 20;
      strengths.push(
        lang === 'pt'
          ? 'Extensão de fala excelente e equilibrada para o formato canadense.'
          : 'Durée de prise de parole équilibrée et concise.'
      );
    } else {
      feedback.push(
        lang === 'pt'
          ? 'Cuidado para não se estender demais. Respostas com mais de 3 minutos cansam o entrevistador.'
          : 'Attention à ne pas trop déborder : restez sous les 2 minutes 30.'
      );
    }

    // Check STAR components
    const lowerText = textToCheck.toLowerCase();
    const hasNumbers = /\d+/.test(textToCheck);
    if (hasNumbers) {
      score += 15;
      strengths.push(
        lang === 'pt'
          ? 'Ótimo uso de números ou métricas para quantificar resultados.'
          : 'Très bonne utilisation de chiffres pour appuyer vos réalisations.'
      );
    } else {
      feedback.push(
        lang === 'pt'
          ? 'Tente incluir uma métrica ou estimativa (ex: minutos economizados, % de satisfação, $ de perda evitada).'
          : 'Ajoutez une donnée chiffrée pour donner plus d’impact à votre résultat.'
      );
    }

    // Check impact keywords
    let matchedKeywords = 0;
    currentQ.impactKeywords.forEach((kw) => {
      if (lowerText.includes(kw.toLowerCase())) matchedKeywords++;
    });

    if (matchedKeywords > 0) {
      score += 15;
      strengths.push(
        lang === 'pt'
          ? `Excelente! Você utilizou termos corporativos valorizados no Québec.`
          : `Bravo ! Vous avez intégré du vocabulaire valorisé au Québec.`
      );
    } else {
      feedback.push(
        lang === 'pt'
          ? `Considere usar termos chave como: ${currentQ.impactKeywords.slice(0, 3).join(', ')}.`
          : `Intégrez des mots-clés valorisés comme : ${currentQ.impactKeywords.slice(0, 3).join(', ')}.`
      );
    }

    score = Math.min(100, Math.max(35, score));

    setEvaluatedScore({
      score,
      strengths: strengths.length ? strengths : [lang === 'pt' ? 'Boa iniciativa em rascunhar sua resposta antes de ver o gabarito.' : 'Bonne démarche de préparation.'],
      feedback: feedback.length ? feedback : [lang === 'pt' ? 'Sua resposta atende aos critérios com clareza!' : 'Votre réponse est bien alignée avec les attentes !'],
      wordCount,
    });

    setShowAnswer(true);

    // Mark as completed
    setCompletedQuestions((prev) => new Set(prev).add(currentQ.id));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      handleSelectQuestion(filteredQuestions[currentIndex + 1].id);
    } else if (!isPro) {
      onOpenProModal('Débloquez la banque complète de 30+ entrevues québécoises et tests de recrutement.');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleSelectQuestion(filteredQuestions[currentIndex - 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. HERO HEADER WITH STATS & TESTS BRIDGE */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Mic className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[11px] font-black border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Método STAR Canadense · Cultura do Québec 2026</span>
                </span>
                <span className="text-[11px] text-slate-400 font-bold">
                  {completedQuestions.size} de {INTERVIEW_QUESTIONS.length} praticadas
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === 'pt'
                  ? 'Simulador Inteligente de Entrevistas de Emprego no Québec'
                  : lang === 'en'
                  ? 'Quebec & Canada Smart Job Interview Simulator (STAR)'
                  : 'Simulateur d’Entrevue d’Emploi au Québec (Méthode STAR)'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {lang === 'pt'
                  ? 'Descubra a intenção oculta do recrutador, o que evitar na cultura local, pratique suas respostas com feedback e passe em seguida para a bateria de testes técnicos mais aplicados em grandes empresas canadenses.'
                  : 'Découvrez les attentes réelles des recruteurs québécois, évitez les pièges culturels, perfectionnez vos réponses STAR avec diagnostic et enchaînez avec les tests d’évaluation les plus fréquents au Québec.'}
              </p>
            </div>
          </div>

          {/* Quick Access to the Tests Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {onNavigateToTests && (
              <button
                type="button"
                onClick={onNavigateToTests}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                title="Ir diretamente para a Área de Testes Técnicos, Lógicos e Francês"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-200" />
                <span>{lang === 'pt' ? 'Área de Testes & Simulados Québécois →' : 'Passer aux Tests d’Évaluation →'}</span>
              </button>
            )}

            {!isPro && (
              <button
                type="button"
                onClick={() => onOpenProModal('Acesso ilimitado ao simulador de entrevistas e testes.')}
                className="px-3.5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Passaporte Pro</span>
              </button>
            )}
          </div>
        </div>

        {/* Categories and Filters Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Categoria:</span>
            {[
              { id: 'all' as QuestionCategory, label: 'Todas as Perguntas' },
              { id: 'icebreaker' as QuestionCategory, label: 'Fit Cultural & Apresentação' },
              { id: 'star-conflict' as QuestionCategory, label: 'Conflitos & Diplomacia' },
              { id: 'star-pressure' as QuestionCategory, label: 'Autonomia & Imprevistos' },
              { id: 'mistakes-learning' as QuestionCategory, label: 'Erros & Aprendizado' },
              { id: 'salary-benefits' as QuestionCategory, label: 'Negociação Salarial' },
              { id: 'culture-safety' as QuestionCategory, label: 'Segurança CNESST' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstOfCat = INTERVIEW_QUESTIONS.find(
                    (q) => cat.id === 'all' || q.categoryKey === cat.id
                  );
                  if (firstOfCat) handleSelectQuestion(firstOfCat.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sector Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-[11px] font-bold text-slate-400">Setor:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as QuestionSector)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 focus:outline-blue-600 cursor-pointer"
            >
              <option value="all">🌐 Todos os Setores</option>
              <option value="industrial">🏭 Indústria & Manufatura</option>
              <option value="tech">💻 TI & Tecnologia</option>
              <option value="corporate">📊 Finanças & Gestão</option>
              <option value="service">🤝 Atendimento & Saúde</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. MAIN SIMULATION ARENA */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Question Header & Category Badge */}
        <div className="space-y-3 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {currentQ.categoryLabel[lang] || currentQ.categoryLabel.pt}
              </span>
              <span className="text-xs text-slate-400 font-semibold">•</span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                {currentQ.sectorLabel[lang] || currentQ.sectorLabel.pt}
              </span>
              {completedQuestions.has(currentQ.id) && (
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Praticada</span>
                </span>
              )}
            </div>

            {/* Timer Controller */}
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${
                  timerSeconds < 30
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(timerSeconds / 60)}:{timerSeconds % 60 < 10 ? '0' : ''}
                  {timerSeconds % 60}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                {isTimerRunning ? 'Pausar' : 'Chronométrer 2 min'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerSeconds(120);
                  setIsTimerRunning(false);
                }}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Reiniciar tempo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Question Text in Primary Language & French Reference */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pergunta do Entrevistador Québécois:
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              « {currentQ.question[lang] || currentQ.question.pt} »
            </h2>
            {lang !== 'fr' && (
              <p className="text-xs text-slate-500 italic font-medium">
                🇫🇷 <strong>Formulação original em francês:</strong> « {currentQ.question.fr} »
              </p>
            )}
          </div>

          {/* RECRUITER INTENT: DEEP CULTURAL REVEAL */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-slate-50 border border-blue-200/90 text-xs sm:text-sm text-slate-800 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-blue-900 font-black">
              <Target className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {lang === 'pt'
                  ? '🎯 O Que o Recrutador Realmente Avalia (Intenção da Pergunta):'
                  : '🎯 Ce que cherche réellement le recruteur québécois :'}
              </span>
            </div>
            <p className="leading-relaxed text-slate-700 pl-6 text-xs sm:text-sm">
              {currentQ.recruiterIntent[lang] || currentQ.recruiterIntent.pt}
            </p>
          </div>
        </div>

        {/* 3. USER INTERACTIVE PRACTICE WORKSPACE */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-600" />
              <label className="text-xs sm:text-sm font-extrabold text-slate-900">
                {lang === 'pt' ? 'Sua Resposta Prática (Simulação Oral ou Escrita):' : 'Votre Réponse d’Entraînement :'}
              </label>
            </div>

            {/* Mode Toggle: Free Form vs Guided STAR */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
              <button
                type="button"
                onClick={() => setUserDraftMode('free')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  userDraftMode === 'free' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Texto Corrido
              </button>
              <button
                type="button"
                onClick={() => setUserDraftMode('star')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  userDraftMode === 'star' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Estruturado em 4 Blocos STAR
              </button>
            </div>
          </div>

          {userDraftMode === 'free' ? (
            <textarea
              rows={4}
              value={userFreeResponse}
              onChange={(e) => setUserFreeResponse(e.target.value)}
              placeholder={
                lang === 'pt'
                  ? 'Digite aqui o que você falaria na entrevista em francês ou português. Ex: "Bonjour! En résumé, dans mon dernier poste chez..." Dica: tente incluir situação, ação e resultados quantificados.'
                  : 'Rédigez ici ce que vous diriez à l’oral devant le recruteur...'
              }
              className="w-full p-4 text-xs sm:text-sm leading-relaxed text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-blue-700 block">S - Situação (Contexto em 2 frases):</span>
                <textarea
                  rows={2}
                  value={starInput.situation}
                  onChange={(e) => setStarInput((p) => ({ ...p, situation: e.target.value }))}
                  placeholder="Qual era o cenário ou desafio inicial..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600"
                />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-indigo-700 block">T - Tarefa (Sua responsabilidade):</span>
                <textarea
                  rows={2}
                  value={starInput.task}
                  onChange={(e) => setStarInput((p) => ({ ...p, task: e.target.value }))}
                  placeholder="O que você precisava entregar ou resolver..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600"
                />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-emerald-700 block">A - Ação (O que VOCÊ fez concretamente):</span>
                <textarea
                  rows={2}
                  value={starInput.action}
                  onChange={(e) => setStarInput((p) => ({ ...p, action: e.target.value }))}
                  placeholder="Quais protocolos seguiu, ferramentas usou, como conversou..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600"
                />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-amber-700 block">R - Resultado (Métrica e aprendizado):</span>
                <textarea
                  rows={2}
                  value={starInput.result}
                  onChange={(e) => setStarInput((p) => ({ ...p, result: e.target.value }))}
                  placeholder="Minutos poupados, satisfação do cliente, aprendizado final..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600"
                />
              </div>
            </div>
          )}

          {/* Action Row: Evaluate & Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleEvaluateResponse}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>
                {lang === 'pt'
                  ? '🔍 Avaliar Minha Resposta & Ver Modelo Recomendado'
                  : '🔍 Évaluer ma réponse & Afficher le modèle'}
              </span>
            </button>

            {/* Prev / Next Pagination */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
              <span className="text-xs font-bold text-slate-400 px-1">
                {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <span>{currentIndex === filteredQuestions.length - 1 ? 'Concluir' : 'Próxima'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. DIAGNOSTIC SCORE & PERSONALIZED FEEDBACK */}
        {evaluatedScore && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white border border-blue-400/30 space-y-3.5 animate-in fade-in duration-200 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm border border-blue-400/30">
                  {evaluatedScore.score}%
                </div>
                <div>
                  <span className="text-[10px] text-blue-300 uppercase tracking-widest font-black block">
                    Diagnóstico de Prontidão
                  </span>
                  <h4 className="text-sm font-black text-white">
                    {evaluatedScore.score >= 80
                      ? 'Excelente Alinhamento com Padrões Canadenses'
                      : evaluatedScore.score >= 60
                      ? 'Bom Começo! Ajuste as métricas e o vocabulário'
                      : 'Necessita Mais Estrutura e Prática'}
                  </h4>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {evaluatedScore.wordCount} palavras analisadas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 text-emerald-200">
                <span className="font-extrabold flex items-center gap-1 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pontos Fortes da Sua Resposta:</span>
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                  {evaluatedScore.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-amber-200">
                <span className="font-extrabold flex items-center gap-1 text-amber-300">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sugestões Práticas de Melhoria:</span>
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                  {evaluatedScore.feedback.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 5. REVEALED MODEL ANSWER & STAR DECOMPOSITION */}
        {showAnswer && (
          <div className="space-y-5 pt-4 border-t border-slate-200 animate-in fade-in duration-200">
            {/* Model Response Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/80 border border-blue-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  <span>
                    {lang === 'pt'
                      ? 'Modelo de Resposta Recomendada (Padrão Québec):'
                      : 'Exemple de réponse réussie (Modèle recommandé) :'}
                  </span>
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Fórmula STAR Oficial
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif text-justify bg-white/90 p-4 rounded-xl border border-blue-100 shadow-2xs">
                {currentQ.modelAnswer[lang] || currentQ.modelAnswer.pt}
              </p>
              {lang !== 'fr' && (
                <p className="text-xs text-slate-500 italic bg-white/60 p-3 rounded-xl border border-blue-50">
                  🇫🇷 <strong>Versão em Francês:</strong> {currentQ.modelAnswer.fr}
                </p>
              )}
            </div>

            {/* STAR Breakdown Grid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-900 block uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Decomposição Passo a Passo nos 4 Pilares STAR:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-black text-blue-700 block text-[11px] uppercase">S - Situação</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {currentQ.starFormula.situation[lang] || currentQ.starFormula.situation.pt}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-black text-indigo-700 block text-[11px] uppercase">T - Tarefa</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {currentQ.starFormula.task[lang] || currentQ.starFormula.task.pt}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-black text-emerald-700 block text-[11px] uppercase">A - Ação</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {currentQ.starFormula.action[lang] || currentQ.starFormula.action.pt}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-black text-amber-700 block text-[11px] uppercase">R - Resultado</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {currentQ.starFormula.result[lang] || currentQ.starFormula.result.pt}
                  </p>
                </div>
              </div>
            </div>

            {/* Dos and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 shadow-2xs">
                <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>O que faz ganhar pontos no Québec:</span>
                </span>
                <ul className="list-disc list-inside text-emerald-950 space-y-1.5 pl-1 leading-relaxed">
                  {(currentQ.tipsToSucceed[lang] || currentQ.tipsToSucceed.pt).map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2 shadow-2xs">
                <span className="font-extrabold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Armadilhas culturais que eliminam candidatos:</span>
                </span>
                <ul className="list-disc list-inside text-rose-950 space-y-1.5 pl-1 leading-relaxed">
                  {(currentQ.mistakesToAvoid[lang] || currentQ.mistakesToAvoid.pt).map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. PERMANENT BRIDGE TO TECHNICAL & LOGICAL TESTS AREA */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Próxima Etapa do Processo Seletivo</span>
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              {lang === 'pt'
                ? 'Pronto para os Testes Técnicos, Lógicos e de Francês Aplicados no Québec?'
                : 'Prêt pour les tests techniques, logiques et de français professionnel ?'}
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {lang === 'pt'
                ? 'Grandes empregadores como Desjardins, Hydro-Québec, Bell, CGI, Bombardier e o setor público aplicam baterias de testes psicométricos (Wonderlic/CCAT), testes de conformidade da Lei 96 de francês corporativo e julgamento situacional.'
                : 'Passez aux évaluations réelles utilisées par les grandes entreprises québécoises : tests de logique Wonderlic, français d’affaires et normes CNESST.'}
            </p>
          </div>

          {onNavigateToTests && (
            <button
              type="button"
              onClick={onNavigateToTests}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <span>{lang === 'pt' ? 'Iniciar Simulados de Testes Oficiais' : 'Lancer les Tests Québécois'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
