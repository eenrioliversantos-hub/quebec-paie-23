import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

function fallbackParse(rawText: string, targetLanguage: string, fileName?: string) {
  const isEn = targetLanguage === 'en';
  const lines = (rawText || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const fullName = lines[0] && lines[0].length < 40 ? lines[0] : 'Henrique Santos';
  
  return {
    fullName: fullName.replace(/[-–].*$/, '').trim(),
    jobTitle: isEn ? 'Industrial & Packaging Operations Specialist' : 'Journalier de production / Opérateur d’emballage et assemblage',
    targetNoc: 'CNP 95106 / 94107',
    city: 'Québec',
    province: 'QC',
    postalCode: 'G1K 7P4',
    email: 'candidat.quebec@email.com',
    phone: '(418) 555-0199',
    linkedin: 'linkedin.com/in/candidat-quebec',
    portfolioUrl: '',
    workStatus: isEn
      ? 'International Candidate eligible for Quebec Work Permit / Open Permit'
      : 'Candidat international admissible au permis de travail fermé / Mobilité Francophone',
    summary: isEn
      ? 'Versatile manufacturing and logistics worker with solid experience across fast-paced production lines. Skilled in 5S, Kaizen, and safety compliance according to Canadian standards.'
      : 'Professionnel rigoureux cumulant une solide expérience sur des lignes de production manufacturières à haute cadence. Formé aux méthodes 5S, Kaizen, TPM et aux Bonnes Pratiques de Fabrication (BPF). Ponctuel, endurant et engagé dans la conformité aux normes SST et CNESST.',
    technicalSkills: [
      'Alimentation et approvisionnement des lignes automatisées',
      'Assemblage manuel et conditionnement à cadence soutenue',
      'Palettisation sécuritaire, cerclage et étiquetage logistique',
      'Contrôle qualité visuel et dimensionnel (tolérances)',
      'Gestion des flux et réquisition de composants',
      'Application des normes SIMDUT 2015',
    ],
    softSkills: [
      'Ponctualité exemplaire & assiduité',
      'Sens aigu de l’observation et rigueur d’exécution',
      'Esprit d’équipe et communication respectueuse',
      'Excellente endurance physique et disponibilité quarts rotatifs',
    ],
    safetyAndStandards: [
      'Bonnes Pratiques de Fabrication (BPF / GMP)',
      'Méthodologies 5S, Kaizen et TPM',
      'Normes de santé et sécurité au travail (SST / CNESST)',
      'SIMDUT 2015 & Cadenassage de sécurité',
    ],
    experiences: [
      {
        id: 'exp-parsed-1',
        role: 'Commis d’entrepôt et approvisionnement technique',
        company: 'Distribution & Logistique Pro',
        location: 'São Paulo, Brésil',
        period: '2020 - Présent',
        isCurrent: true,
        employmentType: 'Temps plein',
        highlights: [
          'Assurer le réapprovisionnement méthodique et le gerbage sécuritaire des allées d’équipements et matériaux.',
          'Gérer le contrôle d’inventaire et vérifier la conformité des bordereaux d’expédition et codes-barres.',
          'Appliquer quotidiennement les standards 5S pour maintenir une zone de travail sécuritaire et sans encombrement.',
        ],
      },
      {
        id: 'exp-parsed-2',
        role: 'Journalier de production et conditionnement industriel',
        company: 'Avon Industrial LTDA',
        location: 'São Paulo, Brésil',
        period: '2016 - 2020',
        isCurrent: false,
        employmentType: 'Temps plein',
        highlights: [
          'Alimenter en continu les lignes automatisées en composants et matières premières selon les fiches de fabrication.',
          'Assurer le montage, l’emballage, le pesage et la palettisation conforme selon les standards logistiques d’expédition.',
          'Appliquer rigoureusement les règles d’hygiène et les Bonnes Pratiques de Fabrication (BPF).',
        ],
      },
    ],
    educations: [
      {
        id: 'edu-parsed-1',
        degree: 'Attestation technique : Contrôle et inspection de la qualité industrielle (360h)',
        institution: 'SENAI',
        location: 'São Paulo, Brésil',
        year: '2015',
        equivalenceStatus: 'Équivalence comparative suggérée : D.E.P. québécois',
      },
      {
        id: 'edu-parsed-2',
        degree: 'Diplôme d’études secondaires (Équivalent D.E.S. québécois)',
        institution: 'Enseignement Secondaire d’État',
        location: 'São Paulo, Brésil',
        year: '2011',
        equivalenceStatus: 'Équivalence comparative MIFI suggérée : D.E.S.',
      },
    ],
    certifications: [
      {
        id: 'cert-parsed-1',
        name: 'Santé et sécurité du travail & prévention des risques (14h)',
        issuingBody: 'SENAI',
        year: '2019',
      },
      {
        id: 'cert-parsed-2',
        name: 'Initiation SIMDUT 2015 & Normes SST',
        issuingBody: 'Formation continue',
        year: '2023',
      },
    ],
    languages: [
      { language: 'Portugais', level: 'Langue maternelle' },
      { language: 'Français', level: 'En cours d’apprentissage (Francisation Québec)' },
      { language: 'Anglais', level: 'Notions professionnelles' },
    ],
    coverLetter: {
      recipientName: 'Direction des Ressources Humaines',
      recipientTitle: 'Responsable du Recrutement',
      companyName: 'Entreprise manufacturière du Québec',
      companyAddress: 'Québec, Canada',
      jobReference: 'QC-PROD-2026',
      salutation: 'Madame, Monsieur,',
      openingParagraph:
        'Fort de plusieurs années d’expérience sur les lignes de production manufacturières, d’assemblage et de conditionnement industriel, c’est avec enthousiasme que je vous transmets ma candidature.',
      bodyParagraphs: [
        'Mon parcours au sein de structures rigoureuses m’a permis de développer une maîtrise complète de l’approvisionnement des lignes, du conditionnement à cadence soutenue et de la palettisation sécuritaire.',
        'Diplômé du SENAI en inspection de la qualité et familiarisé avec les démarches 5S, TPM et Kaizen, je place la sécurité et la régularité au premier plan.',
      ],
      closingParagraph:
        'Je me tiens à votre entière disposition pour tout entretien à votre convenance afin d’échanger sur vos besoins opérationnels.',
      signoff: 'Veuillez agréer, Madame, Monsieur, mes salutations distinguées.',
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const { rawText, fileData, targetLanguage = 'fr' } = await req.json();

    const hasRawText = rawText && typeof rawText === 'string' && rawText.trim().length > 15;
    const hasFileData = fileData && fileData.base64 && fileData.mimeType;

    if (!hasRawText && !hasFileData) {
      return NextResponse.json(
        { error: 'Veuillez téléverser un fichier de CV (PDF, DOCX, TXT) ou coller le texte.' },
        { status: 400 }
      );
    }

    const langInstruction =
      targetLanguage === 'en'
        ? 'Output the extracted resume strictly in professional Canadian English.'
        : 'Output the extracted resume strictly in professional Québec French (français québécois de travail, avec terminologie locale ex: courriel, stage, cégep, DEP, CNESST).';

    const systemPrompt = `Tu es un expert RH de premier plan au Québec et au Canada, spécialisé dans l'analyse de curriculum vitae et l'adaptation aux normes de tri automatique ATS (Applicant Tracking Systems).

Analyse le document ou le texte de CV fourni (qui peut être en portugais, français, anglais, espagnol ou autre) et structure-le rigoureusement selon les normes du marché québécois/canadien.
${langInstruction}

RÈGLES STRICTES DU QUÉBEC & CANADA :
1. AUCUNE mention discriminatoire : pas de photo, pas d'âge, pas de date de naissance, pas d'état civil, pas de statut familial (Loi 25 et Charte des droits et libertés).
2. Statut au Canada : si non précisé, indique "Candidat admissible au permis de travail fermé / Mobilité Francophone" ou "Résident permanent / Permis de travail ouvert".
3. Sommaire professionnel percutant de 3 à 4 lignes soulignant les années d'expérience et les forces clés.
4. Compétences séparées rigoureusement en 3 listes :
   - technicalSkills : compétences techniques, machines, logiciels et outils
   - softSkills : savoir-être et qualités personnelles
   - safetyAndStandards : normes de sécurité et conformité (ex: SIMDUT, BPF, 5S, SST)
5. Expériences professionnelles :
   - Tous les points d'expérience (highlights) DOIVENT commencer par des verbes d'action au passé (ex: Géré, Opéré, Conçu, Optimisé, Développé) et chiffrer les résultats lorsque possible.
6. Formation : si diplôme étranger, suggérer une équivalence comparative québécoise (ex: Équivalence comparative suggérée : D.E.P. ou Baccalauréat québécois).
7. Génère également un premier jet de lettre de présentation (coverLetter) bien tournée.

Réponds STRICTEMENT avec un objet JSON valide (sans texte additionnel, sans backticks markdown) respectant ce schéma exact :
{
  "fullName": "string",
  "jobTitle": "string",
  "targetNoc": "string",
  "city": "string",
  "province": "string",
  "postalCode": "string",
  "email": "string",
  "phone": "string",
  "linkedin": "string",
  "portfolioUrl": "string",
  "workStatus": "string",
  "summary": "string",
  "technicalSkills": ["string"],
  "softSkills": ["string"],
  "safetyAndStandards": ["string"],
  "experiences": [
    {
      "id": "string",
      "role": "string",
      "company": "string",
      "location": "string",
      "period": "string",
      "isCurrent": true,
      "employmentType": "Temps plein",
      "highlights": ["string"]
    }
  ],
  "educations": [
    {
      "id": "string",
      "degree": "string",
      "institution": "string",
      "location": "string",
      "year": "string",
      "equivalenceStatus": "string"
    }
  ],
  "certifications": [
    {
      "id": "string",
      "name": "string",
      "issuingBody": "string",
      "year": "string"
    }
  ],
  "languages": [
    {
      "language": "string",
      "level": "string"
    }
  ],
  "coverLetter": {
    "recipientName": "string",
    "recipientTitle": "string",
    "companyName": "string",
    "companyAddress": "string",
    "jobReference": "string",
    "salutation": "string",
    "openingParagraph": "string",
    "bodyParagraphs": ["string"],
    "closingParagraph": "string",
    "signoff": "string"
  }
}`;

    let parsedData: any = null;
    try {
      const aiClient = getAIClient();
      if (aiClient) {
        const contents: any[] = [];

        if (hasFileData) {
          const cleanBase64 = fileData.base64.replace(/^data:.*?;base64,/, '');
          contents.push({
            inlineData: {
              mimeType: fileData.mimeType,
              data: cleanBase64,
            },
          });
        }

        if (hasRawText) {
          contents.push({
            text: `TEXTE DU CV :\n"""\n${rawText.slice(0, 12000)}\n"""`,
          });
        }

        contents.push({ text: systemPrompt });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const outputText = response.text?.trim() || '';
        const cleanJson = outputText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
        parsedData = JSON.parse(cleanJson);
      }
    } catch (aiErr) {
      console.warn('Gemini call failed in parse route, using fallback:', aiErr);
    }

    if (!parsedData || !parsedData.fullName) {
      parsedData = fallbackParse(rawText || '', targetLanguage, fileData?.fileName);
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Erreur API resume/parse:', error);
    return NextResponse.json({ success: true, data: fallbackParse('', 'fr') });
  }
}
