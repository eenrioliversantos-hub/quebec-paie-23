// lib/telemetry-logger.ts
// Structured JSON Logger supporting Elastic Common Schema (ECS) and MDC correlation IDs

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface StructuredLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: string;
  logger: string;
  message: string;
  traceId: string;
  spanId?: string;
  durationMs?: number;
  mdc: {
    userId?: string;
    userEmail?: string;
    roles?: string[];
    clientIp?: string;
    endpoint?: string;
    httpMethod?: string;
    statusCode?: number;
    calculationMode?: string;
    [key: string]: any;
  };
  payload?: Record<string, any>;
  exception?: {
    className: string;
    message: string;
    stackTrace: string[];
  };
}

class TelemetryLogger {
  private logs: StructuredLog[] = [];
  private listeners: ((logs: StructuredLog[]) => void)[] = [];
  private serviceName = 'salary-security-service';

  constructor() {
    this.seedBootstrapLogs();
  }

  private generateId(): string {
    return 'log_' + Math.random().toString(36).substring(2, 11);
  }

  public generateTraceId(): string {
    return 'trace-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
  }

  private seedBootstrapLogs() {
    const now = Date.now();
    const seeds: Partial<StructuredLog>[] = [
      {
        level: 'INFO',
        logger: 'qc.paienet.engine.TaxCalculationEngine',
        message: 'Barèmes fiscaux 2026 du Québec et du Fédéral initialisés (Revenu Québec & ARC). Abattement du Québec 16.5% actif.',
        durationMs: 12,
        mdc: { engine: 'TAX_ENGINE_2026', province: 'QC', bracketsLoaded: 10 },
        timestamp: new Date(now - 120000).toISOString(),
      },
      {
        level: 'INFO',
        logger: 'qc.paienet.standards.CnesstLabourStandards',
        message: 'Normes du travail CNESST 2026 chargées : seuil supplémentaire 40h/semaine, majoration 150%, 8 jours fériés chômés et payés.',
        durationMs: 8,
        mdc: { module: 'CNESST_STANDARDS', version: '2026.1' },
        timestamp: new Date(now - 90000).toISOString(),
      },
      {
        level: 'INFO',
        logger: 'qc.paienet.security.ClientSessionVault',
        message: 'Espace sécurisé initialisé. Sauvegarde chiffrée des simulations salariales et conformité locale activée.',
        durationMs: 5,
        mdc: { security: 'AES-256', sessionType: 'LOCAL_SECURE' },
        timestamp: new Date(now - 60000).toISOString(),
      },
    ];

    seeds.forEach((s) => {
      this.logs.unshift({
        id: this.generateId(),
        timestamp: s.timestamp || new Date().toISOString(),
        level: s.level || 'INFO',
        service: this.serviceName,
        logger: s.logger || 'com.salary.api',
        message: s.message || '',
        traceId: this.generateTraceId(),
        durationMs: s.durationMs || 5,
        mdc: s.mdc || {},
        payload: s.payload,
      });
    });
  }

  public log(
    level: LogLevel,
    logger: string,
    message: string,
    options?: {
      traceId?: string;
      durationMs?: number;
      mdc?: Record<string, any>;
      payload?: Record<string, any>;
      exception?: { className: string; message: string; stackTrace: string[] };
    }
  ): StructuredLog {
    const entry: StructuredLog = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      logger,
      message,
      traceId: options?.traceId || this.generateTraceId(),
      durationMs: options?.durationMs,
      mdc: options?.mdc || {},
      payload: options?.payload,
      exception: options?.exception,
    };

    this.logs.unshift(entry);
    if (this.logs.length > 300) {
      this.logs.pop();
    }

    this.notify();
    return entry;
  }

  public info(logger: string, message: string, options?: any) {
    return this.log('INFO', logger, message, options);
  }

  public warn(logger: string, message: string, options?: any) {
    return this.log('WARN', logger, message, options);
  }

  public error(logger: string, message: string, options?: any) {
    return this.log('ERROR', logger, message, options);
  }

  public debug(logger: string, message: string, options?: any) {
    return this.log('DEBUG', logger, message, options);
  }

  public getLogs(): StructuredLog[] {
    return [...this.logs];
  }

  public clear() {
    this.logs = [];
    this.seedBootstrapLogs();
    this.notify();
  }

  public subscribe(listener: (logs: StructuredLog[]) => void): () => void {
    this.listeners.push(listener);
    listener([...this.logs]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const current = [...this.logs];
    this.listeners.forEach((l) => l(current));
  }
}

export const telemetryLogger = new TelemetryLogger();
