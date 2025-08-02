import { AppConfig } from './app.config';

export default {
  secure: true,
  httpOnly: true,
  sameSite: true,
  maxAge: AppConfig.JWT_COOKIES_TTL,
};
