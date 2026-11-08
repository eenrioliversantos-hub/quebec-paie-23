# SalairePro & Career Engine — Enterprise Spring Security & ELK Suite

Plateforme de pointe de simulation salariale, fiscalité progressive québécoise et canadienne, et suite carrière complète adossée à une architecture d'entreprise **Spring Boot 3 + PostgreSQL**, sécurisée par **Spring Security & JWT**, orchestrée avec **Flyway**, documentée via **Swagger OpenAPI 3.0**, testée avec **JUnit 5**, et monitorée en temps réel via l'**ELK Stack** (Elasticsearch, Logstash, Kibana).

---

## 🚀 Fonctionnalités Clés & Améliorations Apportées

1. **Authentification Robuste avec Spring Security 6 & JWT** :
   - Architecture sans état (*Stateless*) basée sur des jetons signés HMAC-SHA256.
   - Gestion fine des rôles (RBAC) : `ROLE_ADMIN`, `ROLE_FINANCIAL_ANALYST`, `ROLE_USER`.
   - Chiffrement fort des mots de passe avec **BCrypt** (coût de salage : 12 rounds).
   - Filtre d'interception `JwtAuthenticationFilter` avec propagation du contexte de sécurité et d'observabilité (`X-Trace-Id`, MDC).
   - Mode Démo rapide permettant de basculer instantanément entre comptes (Admin, Analyste fiscal CPA, Candidat).

2. **Base de Données Relationnelle PostgreSQL & Migrations Flyway** :
   - Schéma relationnel normalisé avec clés primaires, contraintes d'unicité et clés étrangères en cascade (`ON DELETE CASCADE`).
   - Gestion stricte du cycle de vie de la base avec **Flyway** :
     - `V1__init_schema.sql` : Tables `users`, `roles`, `user_roles`.
     - `V2__seed_demo_users.sql` : Amorçage des comptes entreprise démo.
     - `V3__create_calculations_and_profiles.sql` : Table `salary_calculations` avec ventilation fiscale complète.
     - `V4__add_audit_and_telemetry.sql` : Table `audit_logs` pour traçabilité et détection d'anomalies.

3. **Documentation Interactive de l'API avec Swagger / OpenAPI 3.0** :
   - Spécification OpenAPI 3.0.3 complète disponible sur `/api/docs/openapi.json`.
   - Interface interactive **Swagger UI** intégrée directement au frontend pour tester les endpoints (`Try it out`) en injectant automatiquement le jeton JWT actif.
   - Commandes `cURL` générées à la volée avec en-têtes `Authorization: Bearer <token>`.

4. **Observabilité Centralisée & Journalisation Structurée ELK Stack** :
   - Logs conformes au schéma **Elastic Common Schema (ECS)** intégrant `trace_id`, `user_id`, `clientIp`, `operation` et `durationMs`.
   - Appender Logback TCP vers Logstash (port 5000) et indexation automatique dans Elasticsearch (`salary-logs-%{+YYYY.MM.dd}`).
   - Tableau de bord de télémétrie en direct dans l'application avec calcul de débit, latence P95, taux d'erreurs et recherche par identifiant de trace.

5. **Suite de Tests Unitaires et d'Intégration Complète avec JUnit 5 & Mockito** :
   - Tests exhaustifs du moteur fiscal québécois : plafonds RRQ (MGA 2025 à 71 300$), exemptions de base (3 500$), RQAP (449.12$), crédits canadiens pour emploi et abattement fédéral du Québec (16.5%).
   - Tests de sécurité : intégrité des jetons JWT, détection de signatures falsifiées, rejet de jetons expirés.
   - Tests Spring MVC avec `@WebMvcTest` simulant requêtes et codes de statut HTTP (200, 201, 401).

6. **Conteneurisation Complète avec Docker Compose** :
   - Fichier `docker-compose.yml` multi-services orchestrant :
     - `postgres` (PostgreSQL 16 Alpine)
     - `flyway` (exécution automatique des migrations SQL)
     - `spring-backend` (Spring Boot 3 sur Java 21)
     - `nextjs-frontend` (Next.js 15 SSR)
     - `elasticsearch` (v8.13.0)
     - `logstash` (pipeline TCP JSON)
     - `kibana` (tableaux de bord visuels)

---

## 📦 Structure du Projet

```text
├── app/                              # Next.js 15 App Router
│   ├── api/                          # Endpoints REST compatibles Spring Boot
│   │   ├── auth/                     # login, register, me, refresh
│   │   ├── calculations/             # CRUD calculs salariaux PostgreSQL
│   │   ├── docs/openapi.json/        # Spécification OpenAPI 3.0
│   │   └── telemetry/logs/           # Pipeline de logs structurés ELK
│   ├── layout.tsx                    # Root Layout Next.js avec AuthProvider
│   └── page.tsx                      # Page d'accueil avec intégration complète
├── backend/
│   └── spring-salary-api/            # Code source du backend Spring Boot 3
│       ├── Dockerfile                # Dockerfile multi-stage Temurin 21
│       ├── pom.xml                   # Dépendances Maven (Security, JPA, Flyway, JJWT)
│       └── src/
│           ├── main/java/com/salary/api/
│           │   ├── config/           # SecurityConfig, OpenApiConfig
│           │   ├── controller/       # AuthController, SalaryCalculationController
│           │   ├── dto/              # LoginRequest, RegisterRequest, JwtAuthResponse
│           │   ├── model/            # User, Role, SalaryCalculation, AuditLog
│           │   ├── repository/       # Interfaces Spring Data JPA
│           │   ├── security/         # JwtTokenProvider, JwtAuthenticationFilter
│           │   └── service/          # TaxCalculationEngineService, AuthService
│           ├── main/resources/
│           │   ├── application.yml   # Configuration PostgreSQL, Flyway, JWT
│           │   ├── logback-spring.xml# Configuration des logs JSON Logstash
│           │   └── db/migration/     # Scripts SQL Flyway (V1 à V4)
│           └── test/                 # Tests unitaires JUnit 5 & Mockito
├── components/                       # Composants UI
│   ├── AuthModal.tsx                 # Modal d'authentification et inspecteur JWT
│   ├── ElkTelemetryHub.tsx           # Dashboard ELK et visualisateur de logs en temps réel
│   ├── EnterpriseArchitectureHub.tsx # Hub d'architecture, Flyway, JUnit et Docker
│   ├── SwaggerApiExplorer.tsx        # Explorer interactif OpenAPI 3.0
│   ├── Header.tsx                    # Barre de navigation avec déclencheurs Enterprise
│   └── ...                           # Composants du calculateur et outils carrière
├── lib/
│   ├── auth-context.tsx              # Contexte React d'authentification et gestion JWT
│   ├── telemetry-logger.ts           # Enregistreur de télémétrie structurée
│   └── tax-engine.ts                 # Moteur fiscal Québec / Canada haute précision
├── docker-compose.yml                # Orchestration des conteneurs
└── logstash/logstash.conf            # Configuration du pipeline Logstash
```

---

## 🛠️ Démarrage Local et avec Docker

### Option 1 : Démarrage avec Docker Compose (Recommandé)
```bash
# Lancer l'ensemble de la suite (PostgreSQL, Flyway, Spring Boot, Next.js, ELK)
docker-compose up -d

# Vérifier l'état des conteneurs
docker-compose ps

# Consulter les logs du backend Spring Boot
docker-compose logs -f spring-backend
```

### Option 2 : Exécution des Tests JUnit 5 du Backend
```bash
cd backend/spring-salary-api
mvn test
```

### Option 3 : Développement Frontend (Next.js)
```bash
npm run dev
# L'application est accessible sur http://localhost:3000
```
