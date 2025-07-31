import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

dotenvExpand.expand(dotenv.config());

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'staging']),
  PORT: z.coerce.number().min(1, 'PORT must be a positive number!'),
  API_PREFIX: z.string().min(1, 'API_PREFIX is required!'),

  DB_URL: z.string().min(1, 'DB_URL is required!'),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters!'),
  JWT_TTL: z.coerce.number().min(1, 'JWT_TTL is required!'),
  JWT_COOKIES_TTL: z.coerce.number().min(1, 'JWT_COOKIES_TTL is required!'),

  THROTTLER_TTL: z.coerce.number().min(1, 'THROTTLER_TTL is required!'),
  THROTTLER_LIMIT: z.coerce.number().min(1, 'THROTTLER_LIMIT is required!'),

  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().optional(),
  EMAIL_USERNAME: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_SENDER: z.string().optional(),

  SMTP_SERVER: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_LOGIN: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),

  // PAYMENT_SECRET_KEY: z.string().optional(),
  // PAYMENT_WEBHOOK_KEY: z.string().optional(),
});

export type ApiConfig = z.infer<typeof envSchema>;

export const parsedEnv = (): ApiConfig => {
  return envSchema.parse(process.env);
};

export const AppConfig = parsedEnv();
