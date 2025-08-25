import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  TmdbApiResponse,
  TmdbMovie,
  TmdbMovieDetails,
} from 'src/domains/tmdb/dto/tmdb.dto';
import { TmdbService } from 'src/domains/tmdb/tmdb.service';
import { PreferencesDto } from 'src/domains/users/dto/user-preferences.dto';

@Public()
@Controller('movies')
export class MoviesController {
  constructor(private readonly tmdb: TmdbService) {}

  /**
   * Fetch trending movies from TMDB
   * @param {PreferencesDto} preferences  - User's media preferences
   * @param {string} [apiKey] - Optional API key for TMDB
   * @example GET /movies/trending?page=1&language=en-US&include_adult=false&include_video=false
   * @returns {Promise<TmdbApiResponse<TmdbMovie>>} - Paginated list of trending movies
   */
  @Get('trending')
  async getTrendingMovies(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> {
    return await this.tmdb.getTrendingMovies(preferences, apiKey);
  }

  /**
   * Fetch popular movies from TMDB using discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences
   * @param {string} [apiKey] - Optional API key for TMDB
   * @example GET /movies/popular?page=1&language=en-US&sort_by=popularity.desc
   * @returns {Promise<TmdbApiResponse<TmdbMovie>>} - Paginated list of popular movies
   */
  @Get('popular')
  async getPopularMovies(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> {
    return await this.tmdb.getPopularMovies(preferences, apiKey);
  }

  /**
   * Fetch top-rated movies from TMDB using discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences
   * @param {string} [apiKey] - Optional API key for TMDB
   * @example GET /movies/top-rated?page=1&language=en-US&sort_by=vote_average.desc
   * @returns {Promise<TmdbApiResponse<TmdbMovie>>} - Paginated list of top-rated movies
   */
  @Get('top-rated')
  async getTopRatedMovies(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> {
    return await this.tmdb.getTopRatedMovies(preferences, apiKey);
  }

  /**
   * Fetch now playing movies from TMDB using discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences
   * @param {string} [apiKey] - Optional API key for TMDB
   * @example GET /movies/new?page=1&language=en-US&region=NG
   * @returns {Promise<TmdbApiResponse<TmdbMovie>>} - Paginated list of now playing movies
   */
  @Get('new')
  async getNowPlayingMovies(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> {
    return await this.tmdb.getNowPlayingMovies(preferences, apiKey);
  }

  /**
   * Fetch upcoming movies from TMDB using discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences
   * @param {string} [apiKey] - Optional API key for TMDB
   * @example GET /movies/upcoming?page=1&language=en-US&sort_by=release_date.asc
   * @returns {Promise<TmdbApiResponse<TmdbMovie>>} - Paginated list of upcoming movies
   */
  @Get('upcoming')
  async getUpcomingMovies(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbMovie>> {
    return await this.tmdb.getUpcomingMovies(preferences, apiKey);
  }

  /**
   * Fetch detailed information for a specific movie
   * @param {string} id - The TMDB movie ID
   * @param {PreferencesDto} preferences - User's media preferences
   * @param {string} [apiKey] - Optional API key for TMDB
   * @example GET /movies/details?id=550&language=en-US
   * @returns {Promise<TmdbMovieDetails>} - Detailed movie information
   */
  @Get('details')
  async getMovieDetails(
    @Query('id') id: string,
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbMovieDetails> {
    return await this.tmdb.getMovieDetails(id, preferences, apiKey);
  }
}
