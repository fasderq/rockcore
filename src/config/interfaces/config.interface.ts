export type NodeEnv = 'production' | 'stage' | 'development';

export interface AppConfig {
  readonly nodeEnv: NodeEnv;
  readonly apiPrefix: string;
  readonly http: HttpConfig;
}

export interface HttpConfig {
  readonly host: string;
  readonly port: number;
}
