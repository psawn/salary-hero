import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export interface DBConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;
  private readonly validationScheme = {
    PORT: Joi.number().default(3000),

    DB_TYPE: Joi.string().required(),
    DB_PORT: Joi.number().required().default(3000),
    DB_DATABASE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_SYNCHRONIZE: Joi.boolean().default(true),
  };

  constructor() {
    const configs: dotenv.DotenvParseOutput[] = [];

    const defaultEnvConfigPath = '.env';
    const defaultEnvConfig = dotenv.config({ path: defaultEnvConfigPath });

    if (defaultEnvConfig.error) {
      console.log(`No config file at path: ${defaultEnvConfigPath}`);
    } else {
      configs.push(defaultEnvConfig.parsed);
    }

    if (configs.length) {
      console.log(`Loaded config file at path: ${defaultEnvConfigPath}`);
    }

    configs.push(process.env as dotenv.DotenvParseOutput);
    this.envConfig = this.validateInput(...configs);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get db(): DBConfig {
    return {
      type: this.envConfig.DB_TYPE,
      host: this.envConfig.DB_HOST,
      port: Number(this.envConfig.DB_PORT),
      username: this.envConfig.DB_USER,
      password: this.envConfig.DB_PASS,
      database: this.envConfig.DB_DATABASE,
    };
  }

  private validateInput(
    ...envConfig: dotenv.DotenvParseOutput[]
  ): dotenv.DotenvParseOutput {
    const mergedConfig: dotenv.DotenvParseOutput = {};

    envConfig.forEach((config) => {
      Object.assign(mergedConfig, config);
    });

    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const result = envVarsSchema.validate(mergedConfig, { allowUnknown: true });

    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }

    return result.value;
  }
}
