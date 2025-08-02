import { AppConfig } from 'src/config/app.config';

export default {
  timeout: AppConfig.HTTP_TIMEOUT,
  maxRedirect: AppConfig.HTTP_MAX_REDIRECT,
};
