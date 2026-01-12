import 'dotenv/config';
import { z } from 'zod';

export type EnvName = 'dev' | 'qa' | 'prod';

const ConfigSchema = z.object({
  BASE_URL: z.string().default('http://www.automationpractice.pl/index.php'),
  ENV: z.enum(['dev', 'qa', 'prod']).default('dev'),
  API_BASE_URL: z.string().default('https://api.restful-api.dev'),
  JSONPLACEHOLDER_BASE_URL: z.string().default('https://jsonplaceholder.typicode.com'),
});

export type AppConfig = {
  baseURL: string;
  env: EnvName;
  apiBaseUrl: string;
  jsonPlaceholderBaseUrl: string;
};

/**
 * Load main application configuration
 */
export function loadConfig(): AppConfig {
  //.env must follow ConfigSchema structure
  const parsed = ConfigSchema.parse(process.env);
  return {
    baseURL: parsed.BASE_URL,
    env: parsed.ENV,
    apiBaseUrl: parsed.API_BASE_URL,
    jsonPlaceholderBaseUrl: parsed.JSONPLACEHOLDER_BASE_URL,
  };
}
