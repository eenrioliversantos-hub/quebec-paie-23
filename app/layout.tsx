import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'Remix PAYMENTNETS',
  description: 'Calculateur de salaire net au Québec 2026, déductions fiscales RRQ, RQAP, impôt provincial et fédéral, normes du travail CNESST et suite carrière.',
  keywords: [
    'salairepro quebec',
    'calculateur salaire net quebec',
    'talon de paie quebec',
    'impot quebec 2026',
    'taux horaire net',
    'rrq rqap deduction',
    'abattement du quebec 16.5',
    'normes cnesst heures supplementaires',
    'cv format canadien ats',
    'simulateur reer celiapp',
    'comparateur provinces canada',
  ],
  authors: [{ name: 'PaieNet Québec - Comité Fiscal & Salarial' }],
  creator: 'PaieNet Québec',
  publisher: 'PaieNet Québec',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Remix PAYMENTNETS',
    description: 'Calculateur de salaire net au Québec 2026, déductions fiscales RRQ, RQAP, impôt provincial et fédéral, normes du travail CNESST et suite carrière.',
    type: 'website',
    locale: 'fr_CA',
    alternateLocale: ['pt_BR', 'en_CA'],
    siteName: 'SalairePro Québec',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remix PAYMENTNETS',
    description: 'Calculateur de salaire net au Québec 2026, déductions fiscales RRQ, RQAP, impôt provincial et fédéral, normes du travail CNESST et suite carrière.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PaieNet Québec - Suite Fiscale & Carrière',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description:
          'Plateforme professionnelle de simulation salariale, fiscalité québécoise et canadienne, normes CNESST et suite d’accélération de carrière.',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'CAD',
        },
      },
      {
        '@type': 'Organization',
        name: 'SalairePro Québec',
        url: 'https://paienet.qc.ca',
        logo: 'https://paienet.qc.ca/logo.png',
        description: 'Portail indépendant d’intelligence salariale, fiscale et d’emploi au Québec.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'contato@paienet.qc.ca',
        },
      },
    ],
  };

  return (
    <html lang="fr" className="h-full bg-slate-50 text-slate-900 antialiased overflow-x-clip" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-clip w-full max-w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
