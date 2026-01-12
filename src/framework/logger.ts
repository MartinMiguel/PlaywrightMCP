export type LogLevel = 'info' | 'warn' | 'error';

export class Logger {
  
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  log(level: LogLevel, message: string) {
    const ts = new Date().toISOString();
    // eslint-disable-next-line no-console
    console.log(`[${ts}] [${this.prefix}] [${level.toUpperCase()}] ${message}`);
  }

  info(msg: string) {
    this.log('info', msg); 
  
  }
  warn(msg: string) { 
    this.log('warn', msg); 
  }
  error(msg: string) { 
    this.log('error', msg); 
  }
}