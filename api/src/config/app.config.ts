import { z } from 'zod';

// DO NOT TOUCH
// if (process.env.NODE_ENV !== 'production') {
//   dotenvExpand.expand(dotenv.config());
// }

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'staging']),
  API_PORT: z.coerce.number().min(1, 'API_PORT must be a positive number!'),
  APP_PORT: z.coerce.number().min(1, 'APP_PORT must be a positive number!'),
  API_PREFIX: z.string().min(1, 'API_PREFIX is required!'),
  API_URL: z.string().min(1, 'API_URL is required!'),
  APP_URL: z.string().min(1, 'APP_URL is required!'),

  DB_URL: z.string().min(1, 'DB_URL is required!'),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters!'),
  JWT_TTL: z.coerce.number().min(1, 'JWT_TTL is required!'),

  THROTTLER_TTL: z.coerce.number().min(1, 'THROTTLER_TTL is required!'),
  THROTTLER_LIMIT: z.coerce.number().min(1, 'THROTTLER_LIMIT is required!'),

  HTTP_TIMEOUT: z.coerce.number().min(1, 'HTTP_TIMEOUT is required!'),
  HTTP_MAX_REDIRECTS: z.coerce
    .number()
    .min(1, 'HTTP_MAX_REDIRECTS is required!'),

  TMDB_API_KEY: z.string().min(1, 'TMDB_API_KEY is required!'),
  TMDB_API_URL: z.string().min(1, 'TMDB_API_URL is required!'),
  TMDB_IMAGE_URL: z.string().min(1, 'TMDB_IMAGE_URL is required!'),

  TRAKT_API_URL: z.string().min(1, 'TRAKT_API_URL is required!'),
  TRAKT_CLIENT_ID: z.string().min(1, 'TRAKT_CLIENT_ID is required!'),
  TRAKT_CLIENT_SECRET: z.string().min(1, 'TRAKT_CLIENT_SECRET is required!'),

  EMAIL_FROM: z.string().optional(),
  EMAIL_SENDER: z.string().optional(),

  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().optional(),
  EMAIL_USERNAME: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),

  SMTP_SERVER: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_LOGIN: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),

  // PAYMENT_SECRET_KEY: z.string().optional(),
  // PAYMENT_WEBHOOK_KEY: z.string().optional(),
});

export type ApiConfig = z.infer<typeof envSchema>;

export const parsedEnv = (): ApiConfig => {
  const result = envSchema.safeParse(process.env);
  if (!result.success)
    throw new Error(`Environment validation failed: ${result.error.message}`);

  return result.data;
};

const configValues = parsedEnv();

export const AppConfig = {
  TOKEN: 'AppConfig' as const,
  ...configValues,
};
