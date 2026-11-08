// components/AuthModal.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  KeyRound,
  UserCheck,
  User,
  Mail,
  Lock,
  Building,
  Copy,
  Check,
  Database,
  Clock,
  Sparkles,
  LogOut,
  Trash2,
  ExternalLink,
  Code2,
  RefreshCw,
  AlertTriangle,
  BadgeAlert,
} from 'lucide-react';
import { useAuth, UserRole, SavedCalculationRecord } from '@/lib/auth-context';
import { Language } from '@/lib/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoadCalculation?: (calc: SavedCalculationRecord) => void;
  initialTab?: 'login' | 'register' | 'session' | 'history';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoadCalculation,
  initialTab = 'login',
}) => {
  const {
    user,
    jwtToken,
    decodedJwt,
    isAuthenticated,
    savedCalculations,
    login,
    register,
    logout,
    refreshAccessToken,
    deleteCalculation,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'session' | 'history'>(
    isAuthenticated ? 'session' : initialTab
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('ROLE_USER');

  const [copiedToken, setCopiedToken] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setErrorMsg(null);
        if (isAuthenticated && (activeTab === 'login' || activeTab === 'register')) {
          setActiveTab('session');
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAuthenticated, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Erreur lors de la connexion');
    } else {
      setActiveTab('session');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    const res = await register(regName, regEmail, regPassword, regRole);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Erreur lors de la création du compte');
    } else {
      setActiveTab('session');
    }
  };

  const handleCopyToken = () => {
    if (jwtToken) {
      navigator.clipboard.writeText(jwtToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 backdrop-blur-sm rounded-xl">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight">Authentification Sécurisée & Session JWT</h3>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  Spring Security 6 + PostgreSQL
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                Gestion des identités, jetons signés HMAC-SHA256 et persistance des simulations fiscales
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-2 overflow-x-auto">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setActiveTab('login');
                  setErrorMsg(null);
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'login'
                    ? 'border-blue-500 text-blue-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Connexion
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setErrorMsg(null);
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'register'
                    ? 'border-blue-500 text-blue-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Créer un compte
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('session')}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'session'
                    ? 'border-blue-500 text-blue-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                Mon Profil & Jeton JWT
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-4 h-4" />
                Calculs Sauvegardés ({savedCalculations.length})
              </button>
            </>
          )}
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
              <BadgeAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Échec de la validation Spring Security</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {activeTab === 'login' && !isAuthenticated && (
            <div className="space-y-6">

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Adresse Courriel Professionnelle
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@entreprise.ca"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Chiffrement BCrypt salt 12 rounds
                  </span>
                  <span>Sécurisé par JWT Stateless</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Authentification Spring Security en cours...
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      Se Connecter & Émettre le Jeton JWT
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'register' && !isAuthenticated && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Nom Complet</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Marc Tremblay"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Rôle Système</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="ROLE_USER">Utilisateur Standard (ROLE_USER)</option>
                    <option value="ROLE_FINANCIAL_ANALYST">Analyste Financier / RH</option>
                    <option value="ROLE_ADMIN">Administrateur Système</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Adresse Courriel</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="marc.tremblay@societe.ca"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Mot de passe (minimum 6 caractères)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Schéma relationnel PostgreSQL :</p>
                <p>
                  Les données sont persistées dans la table relationnelle <code className="text-blue-400">users</code> avec table de jointure <code className="text-blue-400">user_roles</code> (Many-to-Many).
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Création en base PostgreSQL...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Créer le compte & Générer la Session JWT
                  </>
                )}
              </button>
            </form>
          )}

          {activeTab === 'session' && isAuthenticated && user && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-100">{user.name}</h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {user.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                    {user.company && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Building className="w-3.5 h-3.5" /> {user.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={refreshAccessToken}
                    className="flex-1 sm:flex-initial px-3 py-2 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Rafraîchir JWT
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex-1 sm:flex-initial px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Déconnexion
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                    Jeton Bearer JWT Actif (Spring Security)
                  </span>
                  <button
                    onClick={handleCopyToken}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                  >
                    {copiedToken ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copié dans le presse-papier!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copier le jeton
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-400 break-all select-all max-h-20 overflow-y-auto">
                  {jwtToken}
                </div>

                {decodedJwt && (
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Revendications JWT Décodées (Claims Payload) :</span>
                      <span className="font-mono text-[11px] text-emerald-400">Algorithme: HMAC-SHA256</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">subject (sub)</span>
                        <span className="text-blue-400 truncate block">{decodedJwt.sub}</span>
                      </div>
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">roles</span>
                        <span className="text-emerald-400 truncate block">[{decodedJwt.roles.join(', ')}]</span>
                      </div>
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">issuedAt (iat)</span>
                        <span className="text-slate-300">{new Date(decodedJwt.iat * 1000).toLocaleTimeString()}</span>
                      </div>
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">expiresAt (exp)</span>
                        <span className="text-amber-300">{new Date(decodedJwt.exp * 1000).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && isAuthenticated && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">
                    Historique Persisté en Base PostgreSQL
                  </h4>
                  <p className="text-xs text-slate-400">
                    Calculs enregistrés dans la table relationnelle <code className="text-blue-400">salary_calculations</code>
                  </p>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {savedCalculations.length} enregistrements
                </span>
              </div>

              {savedCalculations.length === 0 ? (
                <div className="text-center py-10 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                  <Database className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-medium">Aucun calcul sauvegardé pour l&apos;instant.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Effectuez une simulation sur la page principale et cliquez sur &quot;Sauvegarder dans mon profil&quot;.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedCalculations.map((calc) => (
                    <div
                      key={calc.id}
                      className="p-4 bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 rounded-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-200">{calc.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {calc.province} - {calc.taxYear}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span>
                            Brut: <strong className="text-slate-200">{calc.grossAmount.toLocaleString()}$</strong>
                          </span>
                          <span>
                            Net: <strong className="text-emerald-400">{calc.netAnnual.toLocaleString()}$/an</strong>
                          </span>
                          <span>
                            Taux effectif: <strong className="text-blue-400">{calc.effectiveTaxRate.toFixed(1)}%</strong>
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            {new Date(calc.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {calc.notes && <p className="text-xs text-slate-400 italic">{calc.notes}</p>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onLoadCalculation && (
                          <button
                            type="button"
                            onClick={() => {
                              onLoadCalculation(calc);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            Charger
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteCalculation(calc.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Supprimer de la base"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />{' '}
            {lang === 'pt'
              ? 'Criptografia AES-256 & Dados Protegidos'
              : 'Chiffrement AES-256 & Données Sécurisées'}
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />{' '}
            {lang === 'pt' ? 'Sessão Local Segura' : 'Session Locale Sécurisée'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
