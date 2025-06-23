export type NodeEnv = 'production' | 'stage' | 'development';
export type Mode = 'AFL' | 'SDM' | 'PBD';

export interface AppConfig {
  readonly nodeEnv: NodeEnv;
  readonly mode: Mode;
  readonly boxname: string;
  readonly apiPrefix: string;
  readonly http: HttpConfig;
  readonly paths: PathsConfig;
  readonly network: NetworkConfig;
  readonly press: PressConfig;
}

export interface HttpConfig {
  readonly host: string;
  readonly port: number;
}

export interface PathsConfig {
  readonly inbox: string;
  readonly content: string;
  readonly public: string;
  readonly boxNetworkStorage: string;
  readonly logs: string;
  readonly data: string;
  readonly keys: string;
}

export interface NetworkConfig {
  readonly lookupTarget: string;
  readonly lookupInterval: number;
  readonly lookupAttempts: number;
  readonly isEnabled: boolean;
}

export interface PressConfig {
  readonly enabled: boolean;
  readonly url: string;
}