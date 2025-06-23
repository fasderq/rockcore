import { AppConfig, HttpConfig, Mode, NetworkConfig, NodeEnv, PathsConfig, PressConfig } from './interfaces';
import { render } from 'ejs';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export class Config {
  private static readonly CONFIG_PATH: string = './config/config.yml';
  private static readonly BOXNAME_PATH: string = 'boxname.txt';

  private static instance?: Config;
  private static config: AppConfig;

  constructor() {
    if (Config.instance) {
      throw new Error(
        'Error: Instantiation failed: Use Config.initialize() instead of new.',
      );
    }

    Config.instance = this;
  }

  public static print(): void {
    console.log(JSON.stringify(this.config, null, 2));
  }

  public static initialize(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
      this.loadConfigSync();
    }
    return Config.instance;
  }

  protected static loadConfigSync(): void {
    this.config = load(
      render(readFileSync(Config.CONFIG_PATH, { encoding: 'utf8' }), {
        env: process.env,
      }),
    ) as AppConfig;

    if (!this.config.boxname) {
      this.config = {
        ...this.config,
        boxname: readFileSync(this.BOXNAME_PATH, { encoding: 'utf8' }).trim()
      };
    }
  }

  public static get nodeEnv(): NodeEnv {
    return this.config.nodeEnv;
  }

  public static get mode(): Mode {
    return this.config.mode;
  }

  public static get boxname(): string {
    return this.config.boxname;
  }

  public static get apiPrefix(): string {
    return this.config.apiPrefix;
  }

  public static get http(): HttpConfig {
    return this.config.http;
  }

  public static get paths(): PathsConfig {
    return this.config.paths;
  }

  public static get network(): NetworkConfig {
    return this.config.network;
  }

  public static get press(): PressConfig {
    return this.config.press;
  }

  public static get pino() {
    return {
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
            // {
            //   target: 'pino/file',
            //   options: {
            //     destination: `${Config.paths.logs}/system.log`
            //   }
            // }
          ]
        },
      },
    };
  }

  public static isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}
