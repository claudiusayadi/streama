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
import { TraktSearchResult } from './dto/trakt.dto';

@Injectable()
export class TraktService {
  private readonly logger = new Logger(TraktService.name);

  constructor(
    @Inject(AppConfig.TOKEN) private readonly config: typeof AppConfig,
    private readonly http: HttpService,
  ) {}

  // Scrobble Methods - Real-time tracking
  scrobbleStart = async (
    item: { type: 'movie' | 'episode'; ids: any },
    progress: number,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/scrobble/start', {
      method: 'POST',
      data: { ...item, progress },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  scrobblePause = async (
    item: { type: 'movie' | 'episode'; ids: any },
    progress: number,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/scrobble/pause', {
      method: 'POST',
      data: { ...item, progress },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  scrobbleStop = async (
    item: { type: 'movie' | 'episode'; ids: any },
    progress: number,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/scrobble/stop', {
      method: 'POST',
      data: { ...item, progress },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // Check-in Methods - Social sharing
  checkinMovie = async (
    movie: { ids: any },
    message?: string,
    sharing?: Record<string, boolean>,
    accessToken?: string,
  ): Promise<any> => {
    const data: Record<string, any> = { movie };
    if (message) data.message = message;
    if (sharing) data.sharing = sharing;

    return this.makeRequest<any>('/checkin', {
      method: 'POST',
      data,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  checkinEpisode = async (
    episode: { ids: any },
    show: { ids: any },
    message?: string,
    sharing?: Record<string, boolean>,
    accessToken?: string,
  ): Promise<any> => {
    const data: Record<string, any> = { episode, show };
    if (message) data.message = message;
    if (sharing) data.sharing = sharing;

    return this.makeRequest<any>('/checkin', {
      method: 'POST',
      data,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  deleteCheckin = async (accessToken: string): Promise<any> => {
    return this.makeRequest<any>('/checkin', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // History Methods - Track watched content
  addToHistory = async (
    items: Array<{
      watched_at?: string;
      movie?: { ids: any };
      show?: { ids: any };
      seasons?: Array<{
        number: number;
        episodes: Array<{ number: number; watched_at?: string }>;
      }>;
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/history', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  removeFromHistory = async (
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
      seasons?: Array<{
        number: number;
        episodes: Array<{ number: number }>;
      }>;
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/history/remove', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getHistory = async (
    type: 'movies' | 'shows' | 'seasons' | 'episodes',
    accessToken: string,
    itemId?: string,
  ): Promise<any[]> => {
    let endpoint = `/sync/history/${type}`;
    if (itemId) endpoint += `/${itemId}`;

    return this.makeRequest<any[]>(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // Collection Methods - Owned content
  addToCollection = async (
    items: Array<{
      collected_at?: string;
      movie?: { ids: any };
      show?: { ids: any };
      seasons?: Array<{
        number: number;
        episodes: Array<{ number: number; collected_at?: string }>;
      }>;
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/collection', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  removeFromCollection = async (
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
      seasons?: Array<{
        number: number;
        episodes: Array<{ number: number }>;
      }>;
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/collection/remove', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getCollection = async (
    type: 'movies' | 'shows',
    accessToken: string,
  ): Promise<any[]> => {
    return this.makeRequest<any[]>(`/sync/collection/${type}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // Watchlist Methods - Want to watch
  addToWatchlist = async (
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
      season?: { ids: any };
      episode?: { ids: any };
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/watchlist', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
        seasons: items.filter((i) => i.season),
        episodes: items.filter((i) => i.episode),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  removeFromWatchlist = async (
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
      season?: { ids: any };
      episode?: { ids: any };
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/watchlist/remove', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
        seasons: items.filter((i) => i.season),
        episodes: items.filter((i) => i.episode),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getWatchlist = async (
    type: 'movies' | 'shows' | 'seasons' | 'episodes',
    accessToken: string,
  ): Promise<any[]> => {
    return this.makeRequest<any[]>(`/sync/watchlist/${type}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // Custom Lists Methods
  createList = async (
    listData: {
      name: string;
      description?: string;
      privacy: 'private' | 'friends' | 'public';
      display_numbers?: boolean;
      allow_comments?: boolean;
      sort_by?: string;
      sort_how?: 'asc' | 'desc';
    },
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/users/me/lists', {
      method: 'POST',
      data: listData,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getUserLists = async (accessToken: string): Promise<any[]> => {
    return this.makeRequest<any[]>('/users/me/lists', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getListItems = async (
    listId: string,
    accessToken: string,
  ): Promise<any[]> => {
    return this.makeRequest<any[]>(`/users/me/lists/${listId}/items`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  addToList = async (
    listId: string,
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
      season?: { ids: any };
      episode?: { ids: any };
      person?: { ids: any };
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>(`/users/me/lists/${listId}/items`, {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
        seasons: items.filter((i) => i.season),
        episodes: items.filter((i) => i.episode),
        people: items.filter((i) => i.person),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  removeFromList = async (
    listId: string,
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
      season?: { ids: any };
      episode?: { ids: any };
      person?: { ids: any };
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>(`/users/me/lists/${listId}/items/remove`, {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
        seasons: items.filter((i) => i.season),
        episodes: items.filter((i) => i.episode),
        people: items.filter((i) => i.person),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  deleteList = async (listId: string, accessToken: string): Promise<any> => {
    return this.makeRequest<any>(`/users/me/lists/${listId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // Favorites Methods - Liked content
  addToFavorites = async (
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/ratings', {
      method: 'POST',
      data: {
        movies: items
          .filter((i) => i.movie)
          .map((i) => ({ ...i.movie, rating: 10 })),
        shows: items
          .filter((i) => i.show)
          .map((i) => ({ ...i.show, rating: 10 })),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  removeFromFavorites = async (
    items: Array<{
      movie?: { ids: any };
      show?: { ids: any };
    }>,
    accessToken: string,
  ): Promise<any> => {
    return this.makeRequest<any>('/sync/ratings/remove', {
      method: 'POST',
      data: {
        movies: items.filter((i) => i.movie),
        shows: items.filter((i) => i.show),
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getFavorites = async (
    type: 'movies' | 'shows',
    accessToken: string,
  ): Promise<any[]> => {
    return this.makeRequest<any[]>(`/sync/ratings/${type}/10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // User Stats and Analytics
  getUserStats = async (accessToken: string): Promise<any> => {
    return this.makeRequest<any>('/users/me/stats', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  getUserWatching = async (accessToken: string): Promise<any[]> => {
    return this.makeRequest<any[]>('/users/me/watching', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  // Search (for analytics and list management)
  search = async (
    query: string,
    type?: 'movie' | 'show' | 'episode' | 'person' | 'list',
    preferences?: PreferencesDto,
  ): Promise<TraktSearchResult[]> => {
    const queryParams = this.buildQueryParams(preferences);
    queryParams.query = encodeURIComponent(query);
    if (type) queryParams.type = type;

    return this.makeRequest<TraktSearchResult[]>('/search', {
      params: queryParams,
    });
  };

  // Private helper methods
  private makeRequest = async <T>(
    endpoint: string,
    options?: AxiosRequestConfig,
  ): Promise<T> => {
    try {
      const config: AxiosRequestConfig = {
        ...this.headers(),
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

  private headers = () => ({
    baseURL: this.config.TRAKT_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': this.config.TRAKT_CLIENT_ID,
    },
  });

  private buildQueryParams = (
    preferences?: PreferencesDto,
  ): Record<string, any> => {
    if (!preferences) return {};

    const params: Record<string, any> = {};

    // Map page parameter
    if (preferences.page && preferences.page > 0) {
      params.page = preferences.page;
    }

    // Trakt doesn't use language parameter like TMDB, but we can add other filters here
    // if needed based on the preferences

    return params;
  };

  private handleApiError = (error: any, endpoint: string): never => {
    this.logger.error(
      `Trakt API Error for ${endpoint}:`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.response?.data || error.message,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const statusCode = error.response?.status;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const message =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.response?.data?.error ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.message ||
      'Unknown Trakt API error';

    switch (statusCode) {
      case 404:
        throw new NotFoundException(`Trakt resource not found: ${endpoint}`);
      case 401:
        throw new UnauthorizedException(
          'Invalid Trakt API key or unauthorized access',
        );
      case 400:
        throw new BadRequestException(
          `Invalid request to Trakt API: ${message}`,
        );
      case 429:
        throw new ServiceUnavailableException('Trakt API rate limit exceeded');
      case 500:
      case 502:
      case 503:
        throw new ServiceUnavailableException(
          'Trakt service is currently unavailable',
        );
      default:
        throw new InternalServerErrorException(`Trakt API error: ${message}`);
    }
  };
}
