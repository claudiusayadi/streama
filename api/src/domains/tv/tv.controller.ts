import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import {
  TmdbApiResponse,
  TmdbTvDetails,
  TmdbTvShow,
} from 'src/domains/tmdb/dto/tmdb.dto';
import { TmdbService } from 'src/domains/tmdb/tmdb.service';
import { PreferencesDto } from 'src/domains/users/dto/user-preferences.dto';

@Public()
@Controller('tv')
export class TvController {
  constructor(private readonly tmdb: TmdbService) {}

  /**
   * Fetch trending TV shows from TMDB
   * @param {PreferencesDto} preferences - User's media preferences including language, region, page, etc.
   * @param {string} [apiKey] - Optional API key for TMDB authentication
   * @example GET /tv/trending?page=1&language=en-US&include_adult=false&region=NG
   * @returns {Promise<TmdbApiResponse<TmdbTvShow>>} - Paginated list of trending TV shows for the current week
   */
  @Get('trending')
  async getTrendingTv(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> {
    return await this.tmdb.getTrendingTv(preferences, apiKey);
  }

  /**
   * Fetch popular TV shows using TMDB discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences with sort_by defaulting to popularity.desc
   * @param {string} [apiKey] - Optional API key for TMDB authentication
   * @example GET /tv/popular?page=1&language=en-US&sort_by=popularity.desc&region=NG
   * @returns {Promise<TmdbApiResponse<TmdbTvShow>>} - Paginated list of popular TV shows sorted by popularity
   */
  @Get('popular')
  async getPopularTv(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> {
    return await this.tmdb.getPopularTv(preferences, apiKey);
  }

  /**
   * Fetch top-rated TV shows using TMDB discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences with filtering applied
   * @param {string} [apiKey] - Optional API key for TMDB authentication
   * @example GET /tv/top-rated?page=1&language=en-US&sort_by=vote_average.desc
   * @returns {Promise<TmdbApiResponse<TmdbTvShow>>} - Paginated list of top-rated TV shows with minimum 200 votes
   */
  @Get('top-rated')
  async getTopRatedTv(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> {
    return await this.tmdb.getTopRatedTv(preferences, apiKey);
  }

  /**
   * Fetch currently airing TV shows using TMDB discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences including region for local broadcasts
   * @param {string} [apiKey] - Optional API key for TMDB authentication
   * @example GET /tv/new?page=1&language=en-US&region=NG
   * @returns {Promise<TmdbApiResponse<TmdbTvShow>>} - Paginated list of TV shows airing in the last 30 days to next 7 days
   */
  @Get('new')
  async getAiringTv(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> {
    return await this.tmdb.getAiringTv(preferences, apiKey);
  }

  /**
   * Fetch upcoming TV shows using TMDB discover endpoint
   * @param {PreferencesDto} preferences - User's media preferences with date filtering
   * @param {string} [apiKey] - Optional API key for TMDB authentication
   * @example GET /tv/upcoming?page=1&language=en-US&sort_by=first_air_date.asc
   * @returns {Promise<TmdbApiResponse<TmdbTvShow>>} - Paginated list of upcoming TV shows sorted by first air date
   */
  @Get('upcoming')
  async getUpcomingTv(
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbApiResponse<TmdbTvShow>> {
    return await this.tmdb.getUpcomingTv(preferences, apiKey);
  }

  /**
   * Fetch detailed information for a specific TV show
   * @param {string} id - The TMDB TV show ID
   * @param {PreferencesDto} preferences - User's media preferences for language and additional details
   * @param {string} [apiKey] - Optional API key for TMDB authentication
   * @example GET /tv/details?id=1399&language=en-US
   * @returns {Promise<TmdbTvDetails>} - Detailed TV show information including cast, crew, and metadata
   */
  @Get('details')
  async getTvDetails(
    @Query('id') id: string,
    @Query() preferences: PreferencesDto,
    apiKey?: string,
  ): Promise<TmdbTvDetails> {
    return await this.tmdb.getTvDetails(id, preferences, apiKey);
  }
}
