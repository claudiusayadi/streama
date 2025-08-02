import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import {
  TmdbMovie,
  TmdbMovieDetails,
  TmdbTvDetails,
  TmdbTvShow,
} from './tmdb.dto';

export class TmdbMovieListResponse {
  /**
   * Current page number
   * @example 1
   */
  @IsNumber()
  page: number;

  /**
   * Array of movie results for the current page
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbMovie)
  results: TmdbMovie[];

  /**
   * Total number of pages available
   * @example 500
   */
  @IsNumber()
  total_pages: number;

  /**
   * Total number of movie results across all pages
   * @example 10000
   */
  @IsNumber()
  total_results: number;
}

export class TmdbTvListResponse {
  /**
   * Current page number
   * @example 1
   */
  @IsNumber()
  page: number;

  /**
   * Array of TV show results for the current page
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbTvShow)
  results: TmdbTvShow[];

  /**
   * Total number of pages available
   * @example 500
   */
  @IsNumber()
  total_pages: number;

  /**
   * Total number of TV show results across all pages
   * @example 10000
   */
  @IsNumber()
  total_results: number;
}

/**
 * Detailed movie information response from TMDB API
 * Extends the basic movie information with additional details like budget, revenue, runtime, etc.
 */
export class TmdbMovieDetailsResponse extends TmdbMovieDetails {}

/**
 * Detailed TV show information response from TMDB API
 * Extends the basic TV show information with additional details like seasons, episodes, networks, etc.
 */
export class TmdbTvDetailsResponse extends TmdbTvDetails {}
