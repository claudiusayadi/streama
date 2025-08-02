import { AppConfig } from 'src/config/app.config';

export default {
  timeout: AppConfig.HTTP_TIMEOUT,
  maxRedirects: AppConfig.HTTP_MAX_REDIRECTS,
};
