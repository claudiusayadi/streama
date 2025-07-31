import { AppConfig } from './env.config';

export default {
  secure: true,
  httpOnly: true,
  sameSite: true,
  maxAge: AppConfig.JWT_COOKIES_TTL,
};
