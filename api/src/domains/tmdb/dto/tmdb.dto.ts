import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsBoolean } from 'src/common/decorators/is-boolean.decorator';

export class TmdbGenre {
  /**
   * Genre ID from TMDB
   * @example 28
   */
  @IsNumber()
  id: number;

  /**
   * Genre name
   * @example "Action"
   */
  @IsString()
  name: string;
}

export class TmdbProductionCompany {
  /**
   * Production company ID from TMDB
   * @example 420
   */
  @IsNumber()
  id: number;

  /**
   * Production company logo path (can be null)
   * @example "/marvel-studios.png"
   */
  @IsOptional()
  @IsString()
  logo_path: string | null;

  /**
   * Production company name
   * @example "Marvel Studios"
   */
  @IsString()
  name: string;

  /**
   * Origin country code
   * @example "NG"
   */
  @IsString()
  origin_country: string;
}

export class TmdbProductionCountry {
  /**
   * ISO 3166-1 country code
   * @example "NG"
   */
  @IsString()
  iso_3166_1: string;

  /**
   * Country name
   * @example "Nigeria"
   */
  @IsString()
  name: string;
}

export class TmdbSpokenLanguage {
  /**
   * English name of the language
   * @example "English"
   */
  @IsString()
  english_name: string;

  /**
   * ISO 639-1 language code
   * @example "en"
   */
  @IsString()
  iso_639_1: string;

  /**
   * Native name of the language
   * @example "English"
   */
  @IsString()
  name: string;
}

export class TmdbMovie {
  /**
   * TMDB movie ID
   * @example 550
   */
  @IsNumber()
  id: number;

  /**
   * Movie title
   * @example "Fight Club"
   */
  @IsString()
  title: string;

  /**
   * Movie overview/synopsis
   * @example "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy."
   */
  @IsString()
  overview: string;

  /**
   * Poster image path (can be null)
   * @example "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
   */
  @IsOptional()
  @IsString()
  poster_path: string | null;

  /**
   * Backdrop image path (can be null)
   * @example "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg"
   */
  @IsOptional()
  @IsString()
  backdrop_path: string | null;

  /**
   * Movie release date in YYYY-MM-DD format
   * @example "1999-10-15"
   */
  @IsString()
  release_date: string;

  /**
   * Average vote rating (0-10)
   * @example 8.433
   */
  @IsNumber()
  vote_average: number;

  /**
   * Total number of votes
   * @example 26280
   */
  @IsNumber()
  vote_count: number;

  /**
   * Array of genre IDs
   * @example [18, 53, 35]
   */
  @IsArray()
  @IsNumber({}, { each: true })
  genre_ids: number[];

  /**
   * Whether the movie is adult content
   * @example false
   */
  @IsBoolean()
  adult: boolean;

  /**
   * Original language code
   * @example "en"
   */
  @IsString()
  original_language: string;

  /**
   * Original movie title
   * @example "Fight Club"
   */
  @IsString()
  original_title: string;

  /**
   * Popularity score
   * @example 61.416
   */
  @IsNumber()
  popularity: number;

  /**
   * Whether the movie has video content
   * @example false
   */
  @IsBoolean()
  video: boolean;
}

export class TmdbTvShow {
  /**
   * TMDB TV show ID
   * @example 1399
   */
  @IsNumber()
  id: number;

  /**
   * TV show name
   * @example "Game of Thrones"
   */
  @IsString()
  name: string;

  /**
   * TV show overview/synopsis
   * @example "Seven noble families fight for control of the mythical land of Westeros."
   */
  @IsString()
  overview: string;

  /**
   * Poster image path (can be null)
   * @example "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
   */
  @IsOptional()
  @IsString()
  poster_path: string | null;

  /**
   * Backdrop image path (can be null)
   * @example "/suopoADq0k8YZr4dQXcU6pToj6s.jpg"
   */
  @IsOptional()
  @IsString()
  backdrop_path: string | null;

  /**
   * First air date in YYYY-MM-DD format
   * @example "2011-04-17"
   */
  @IsString()
  first_air_date: string;

  /**
   * Average vote rating (0-10)
   * @example 8.453
   */
  @IsNumber()
  vote_average: number;

  /**
   * Total number of votes
   * @example 21661
   */
  @IsNumber()
  vote_count: number;

  /**
   * Array of genre IDs
   * @example [10765, 18, 10759]
   */
  @IsArray()
  @IsNumber({}, { each: true })
  genre_ids: number[];

  /**
   * Array of origin countries
   * @example ["US"]
   */
  @IsArray()
  @IsString({ each: true })
  origin_country: string[];

  /**
   * Original language code
   * @example "en"
   */
  @IsString()
  original_language: string;

  /**
   * Original TV show name
   * @example "Game of Thrones"
   */
  @IsString()
  original_name: string;

  /**
   * Popularity score
   * @example 369.594
   */
  @IsNumber()
  popularity: number;
}

export class TmdbCreatedBy {
  /**
   * Creator ID from TMDB
   * @example 9813
   */
  @IsNumber()
  id: number;

  /**
   * Creator credit ID
   * @example "5256c8c219c2956ff604858a"
   */
  @IsString()
  credit_id: string;

  /**
   * Creator name
   * @example "David Benioff"
   */
  @IsString()
  name: string;

  /**
   * Creator gender (0=Not specified, 1=Female, 2=Male, 3=Non-binary)
   * @example 2
   */
  @IsNumber()
  gender: number;

  /**
   * Creator profile image path (can be null)
   * @example "/xvNN98s8h6D7TOMtn1RN1aW5kf9.jpg"
   */
  @IsOptional()
  @IsString()
  profile_path: string | null;
}

export class TmdbLastEpisode {
  /**
   * Episode ID from TMDB
   * @example 63056
   */
  @IsNumber()
  id: number;

  /**
   * Episode name
   * @example "The Iron Throne"
   */
  @IsString()
  name: string;

  /**
   * Episode overview/synopsis
   * @example "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors."
   */
  @IsString()
  overview: string;

  /**
   * Episode vote average (0-10)
   * @example 4.8
   */
  @IsNumber()
  vote_average: number;

  /**
   * Episode vote count
   * @example 106
   */
  @IsNumber()
  vote_count: number;

  /**
   * Episode air date in YYYY-MM-DD format
   * @example "2019-05-19"
   */
  @IsString()
  air_date: string;

  /**
   * Episode number within the season
   * @example 6
   */
  @IsNumber()
  episode_number: number;

  /**
   * Production code
   * @example ""
   */
  @IsString()
  production_code: string;

  /**
   * Episode runtime in minutes
   * @example 80
   */
  @IsNumber()
  runtime: number;

  /**
   * Season number
   * @example 8
   */
  @IsNumber()
  season_number: number;

  /**
   * TV show ID
   * @example 1399
   */
  @IsNumber()
  show_id: number;

  /**
   * Episode still image path (can be null)
   * @example "/3OhkVyKSzXvE9bHJ0bhHYgHzxFb.jpg"
   */
  @IsOptional()
  @IsString()
  still_path: string | null;
}

export class TmdbNetwork {
  /**
   * Network ID from TMDB
   * @example 49
   */
  @IsNumber()
  id: number;

  /**
   * Network logo path (can be null)
   * @example "/tuomPhY2UuLiA7L9iUNz6gTKKmR.png"
   */
  @IsOptional()
  @IsString()
  logo_path: string | null;

  /**
   * Network name
   * @example "HBO"
   */
  @IsString()
  name: string;

  /**
   * Network origin country
   * @example "US"
   */
  @IsString()
  origin_country: string;
}

export class TmdbSeason {
  /**
   * Season air date in YYYY-MM-DD format
   * @example "2011-04-17"
   */
  @IsString()
  air_date: string;

  /**
   * Number of episodes in the season
   * @example 10
   */
  @IsNumber()
  episode_count: number;

  /**
   * Season ID from TMDB
   * @example 3624
   */
  @IsNumber()
  id: number;

  /**
   * Season name
   * @example "Season 1"
   */
  @IsString()
  name: string;

  /**
   * Season overview/description
   * @example "Trouble is brewing in the Seven Kingdoms of Westeros."
   */
  @IsString()
  overview: string;

  /**
   * Season poster image path (can be null)
   * @example "/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg"
   */
  @IsOptional()
  @IsString()
  poster_path: string | null;

  /**
   * Season number
   * @example 1
   */
  @IsNumber()
  season_number: number;
}

export class TmdbMovieDetails extends TmdbMovie {
  /**
   * Movie budget in USD
   * @example 63000000
   */
  @IsNumber()
  budget: number;

  /**
   * Array of movie genres
   * @example [{"id": 18, "name": "Drama"}, {"id": 53, "name": "Thriller"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbGenre)
  genres: TmdbGenre[];

  /**
   * Official movie homepage URL
   * @example "http://www.foxmovies.com/movies/fight-club"
   */
  @IsString()
  homepage: string;

  /**
   * IMDb ID
   * @example "tt0137523"
   */
  @IsString()
  imdb_id: string;

  /**
   * Array of production companies
   * @example [{"id": 508, "name": "Regency Enterprises", "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png", "origin_country": "US"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbProductionCompany)
  production_companies: TmdbProductionCompany[];

  /**
   * Array of production countries
   * @example [{"iso_3166_1": "US", "name": "United States of America"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbProductionCountry)
  production_countries: TmdbProductionCountry[];

  /**
   * Movie revenue in USD
   * @example 100853753
   */
  @IsNumber()
  revenue: number;

  /**
   * Movie runtime in minutes
   * @example 139
   */
  @IsNumber()
  runtime: number;

  /**
   * Array of spoken languages
   * @example [{"english_name": "English", "iso_639_1": "en", "name": "English"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbSpokenLanguage)
  spoken_languages: TmdbSpokenLanguage[];

  /**
   * Movie status
   * @example "Released"
   */
  @IsString()
  status: string;

  /**
   * Movie tagline
   * @example "Mischief. Mayhem. Soap."
   */
  @IsString()
  tagline: string;
}

export class TmdbTvDetails extends TmdbTvShow {
  /**
   * Array of TV show creators
   * @example [{"id": 9813, "credit_id": "5256c8c219c2956ff604858a", "name": "David Benioff", "gender": 2, "profile_path": "/xvNN98s8h6D7TOMtn1RN1aW5kf9.jpg"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbCreatedBy)
  created_by: TmdbCreatedBy[];

  /**
   * Array of typical episode runtimes in minutes
   * @example [60]
   */
  @IsArray()
  @IsNumber({}, { each: true })
  episode_run_time: number[];

  /**
   * Array of TV show genres
   * @example [{"id": 10765, "name": "Sci-Fi & Fantasy"}, {"id": 18, "name": "Drama"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbGenre)
  genres: TmdbGenre[];

  /**
   * Official TV show homepage URL
   * @example "http://www.hbo.com/game-of-thrones"
   */
  @IsString()
  homepage: string;

  /**
   * Whether the show is currently in production
   * @example false
   */
  @IsBoolean()
  in_production: boolean;

  /**
   * Array of languages used in the show
   * @example ["en"]
   */
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  /**
   * Last air date in YYYY-MM-DD format
   * @example "2019-05-19"
   */
  @IsString()
  last_air_date: string;

  /**
   * Information about the last episode that aired
   */
  @ValidateNested()
  @Type(() => TmdbLastEpisode)
  last_episode_to_air: TmdbLastEpisode;

  /**
   * Array of networks that aired the show
   * @example [{"id": 49, "name": "HBO", "logo_path": "/tuomPhY2UuLiA7L9iUNz6gTKKmR.png", "origin_country": "US"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbNetwork)
  networks: TmdbNetwork[];

  /**
   * Total number of episodes across all seasons
   * @example 73
   */
  @IsNumber()
  number_of_episodes: number;

  /**
   * Total number of seasons
   * @example 8
   */
  @IsNumber()
  number_of_seasons: number;

  /**
   * Array of production companies
   * @example [{"id": 76043, "name": "Revolution Sun Studios", "logo_path": null, "origin_country": "US"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbProductionCompany)
  production_companies: TmdbProductionCompany[];

  /**
   * Array of production countries
   * @example [{"iso_3166_1": "US", "name": "United States of America"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbProductionCountry)
  production_countries: TmdbProductionCountry[];

  /**
   * Array of all seasons
   * @example [{"air_date": "2011-04-17", "episode_count": 10, "id": 3624, "name": "Season 1", "overview": "Trouble is brewing...", "poster_path": "/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg", "season_number": 1}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbSeason)
  seasons: TmdbSeason[];

  /**
   * Array of spoken languages
   * @example [{"english_name": "English", "iso_639_1": "en", "name": "English"}]
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TmdbSpokenLanguage)
  spoken_languages: TmdbSpokenLanguage[];

  /**
   * TV show status
   * @example "Ended"
   */
  @IsString()
  status: string;

  /**
   * TV show tagline
   * @example "Winter Is Coming"
   */
  @IsString()
  tagline: string;

  /**
   * Type of TV show
   * @example "Scripted"
   */
  @IsString()
  type: string;
}

export class TmdbApiResponse<T> {
  /**
   * Current page number
   * @example 1
   */
  @IsNumber()
  page: number;

  /**
   * Array of results for the current page
   */
  @IsArray()
  results: T[];

  /**
   * Total number of pages available
   * @example 500
   */
  @IsNumber()
  total_pages: number;

  /**
   * Total number of results across all pages
   * @example 10000
   */
  @IsNumber()
  total_results: number;
}
