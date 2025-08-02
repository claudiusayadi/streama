import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { PreferencesDto } from '../users/dto/user-preferences.dto';
import {
  TmdbApiResponse,
  TmdbMovie,
  TmdbMovieDetails,
  TmdbTvDetails,
  TmdbTvShow,
} from './dto/tmdb.dto';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);

  constructor(
    @Inject(AppConfig.TOKEN) private readonly config: typeof AppConfig,
    private readonly http: HttpService,
  ) {}

  // Movie Methods
  getTrendingMovies = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> => {
    return this.makeListRequest<TmdbMovie>(
      '/trending/movie/week',
      preferences,
      apiKey,
    );
  };

  getPopularMovies = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> => {
    return this.makeDiscoverRequest<TmdbMovie>(
      '/discover/movie',
      {},
      preferences,
      apiKey,
    );
  };

  getTopRatedMovies = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> => {
    const baseParams = {
      sort_by: 'vote_average.desc',
      without_genres: '99,10755', // Exclude Documentary and Talk Show
      'vote_count.gte': 200, // Minimum vote count for credibility
    };

    return this.makeDiscoverRequest<TmdbMovie>(
      '/discover/movie',
      baseParams,
      preferences,
      apiKey,
    );
  };

  getNowPlayingMovies = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> => {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    const diff = new Date(today.setMonth(today.getMonth() - 2));
    const minDate = diff.toISOString().split('T')[0];

    const baseParams = {
      with_release_type: '2|3', // Theatrical and Limited releases
      'release_date.gte': minDate,
      'release_date.lte': maxDate,
    };

    return this.makeDiscoverRequest<TmdbMovie>(
      '/discover/movie',
      baseParams,
      preferences,
      apiKey,
    );
  };

  getUpcomingMovies = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> => {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const diff = new Date(today.setMonth(today.getMonth() + 2));
    const maxDate = diff.toISOString().split('T')[0];

    const baseParams = {
      with_release_type: '2|3',
      'release_date.gte': minDate,
      'release_date.lte': maxDate,
    };

    return this.makeDiscoverRequest<TmdbMovie>(
      '/discover/movie',
      baseParams,
      preferences,
      apiKey,
    );
  };

  getMovieDetails = async (
    id: string,
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbMovieDetails> => {
    const queryParams = this.buildQueryParams(preferences);
    const options =
      Object.keys(queryParams).length > 0 ? { params: queryParams } : undefined;
    return this.makeRequest<TmdbMovieDetails>(`/movie/${id}`, options, apiKey);
  };

  // TV Methods
  getTrendingTv = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> => {
    return this.makeListRequest<TmdbTvShow>(
      '/trending/tv/week',
      preferences,
      apiKey,
    );
  };

  getPopularTv = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> => {
    return this.makeDiscoverRequest<TmdbTvShow>(
      '/discover/tv',
      {},
      preferences,
      apiKey,
    );
  };

  getTopRatedTv = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> => {
    const baseParams = {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 200, // Minimum vote count for credibility
    };

    return this.makeDiscoverRequest<TmdbTvShow>(
      '/discover/tv',
      baseParams,
      preferences,
      apiKey,
    );
  };

  getAiringTv = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> => {
    // Calculate date range for currently airing shows (last 30 days to next 7 days)
    const today = new Date();
    const maxDateObj = new Date(today);
    maxDateObj.setDate(today.getDate() + 7); // Next 7 days
    const maxDate = maxDateObj.toISOString().split('T')[0];

    const minDateObj = new Date(today);
    minDateObj.setDate(today.getDate() - 30); // Last 30 days
    const minDate = minDateObj.toISOString().split('T')[0];

    const baseParams = {
      'air_date.gte': minDate,
      'air_date.lte': maxDate,
    };

    return this.makeDiscoverRequest<TmdbTvShow>(
      '/discover/tv',
      baseParams,
      preferences,
      apiKey,
    );
  };

  getUpcomingTv = async (
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> => {
    const date = new Date().toISOString().split('T')[0];
    const baseParams = {
      'first_air_date.gte': date,
      sort_by: 'first_air_date.asc',
    };

    return this.makeDiscoverRequest<TmdbTvShow>(
      '/discover/tv',
      baseParams,
      preferences,
      apiKey,
    );
  };

  getTvDetails = async (
    id: string,
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbTvDetails> => {
    const queryParams = this.buildQueryParams(preferences);
    const options =
      Object.keys(queryParams).length > 0 ? { params: queryParams } : undefined;
    return this.makeRequest<TmdbTvDetails>(`/tv/${id}`, options, apiKey);
  };

  private makeRequest = async <T>(
    endpoint: string,
    options?: AxiosRequestConfig,
    apiKey?: string,
  ): Promise<T> => {
    try {
      const config: AxiosRequestConfig = {
        ...this.headers(apiKey),
        ...options,
      };

      const response: AxiosResponse<T> = await firstValueFrom(
        this.http.get<T>(endpoint, config),
      );

      return response.data;
    } catch (error) {
      return this.handleApiError(error, endpoint);
    }
  };

  private makeDiscoverRequest = async <T>(
    endpoint: string,
    baseParams: Record<string, any>,
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<T>> => {
    const userParams = this.buildQueryParams(preferences);
    const combinedParams = { ...baseParams, ...userParams };
    const options = { params: combinedParams };

    const response = await this.makeRequest<TmdbApiResponse<T>>(
      endpoint,
      options,
      apiKey,
    );
    return response;
  };

  private makeListRequest = async <T>(
    endpoint: string,
    preferences?: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<T>> => {
    const queryParams = this.buildQueryParams(preferences);
    const options =
      Object.keys(queryParams).length > 0 ? { params: queryParams } : undefined;

    const response = await this.makeRequest<TmdbApiResponse<T>>(
      endpoint,
      options,
      apiKey,
    );
    return response;
  };

  private headers = (apiKey?: string) => ({
    baseURL: this.config.TMDB_API_URL,
    headers: {
      Authorization: `Bearer ${apiKey || this.config.TMDB_API_KEY}`,
    },
  });
  private buildQueryParams = (
    preferences?: PreferencesDto,
  ): Record<string, any> => {
    if (!preferences) return {};

    const params: Record<string, any> = {};

    if (preferences.language) {
      params.language = preferences.language;
    }

    if (preferences.include_adult !== undefined) {
      params.include_adult = preferences.include_adult;
    }

    if (preferences.include_video !== undefined) {
      params.include_video = preferences.include_video;
    }

    if (preferences.page && preferences.page > 0) {
      params.page = preferences.page;
    }

    if (preferences.sort_by) {
      params.sort_by = preferences.sort_by;
    }

    if (preferences.region) {
      params.region = preferences.region;
    }

    return params;
  };

  private handleApiError = (error: any, endpoint: string): never => {
    this.logger.error(
      `TMDB API Error for ${endpoint}:`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.response?.data || error.message,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const statusCode = error.response?.status;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const message =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.response?.data?.status_message ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.message ||
      'Unknown TMDB API error';

    switch (statusCode) {
      case 404:
        throw new NotFoundException(`TMDB resource not found: ${endpoint}`);
      case 401:
        throw new UnauthorizedException(
          'Invalid TMDB API key or unauthorized access',
        );
      case 400:
        throw new BadRequestException(
          `Invalid request to TMDB API: ${message}`,
        );
      case 429:
        throw new ServiceUnavailableException('TMDB API rate limit exceeded');
      case 500:
      case 502:
      case 503:
        throw new ServiceUnavailableException(
          'TMDB service is currently unavailable',
        );
      default:
        throw new InternalServerErrorException(`TMDB API error: ${message}`);
    }
  };
}
