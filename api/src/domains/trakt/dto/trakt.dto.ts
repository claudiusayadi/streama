import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsBoolean } from 'src/common/decorators/is-boolean.decorator';

// Base Trakt classes for analytics
export class TraktIds {
  /**
   * Trakt.tv ID
   * @example 922
   */
  @IsNumber()
  trakt: number;

  /**
   * Trakt.tv slug
   * @example "fight-club-1999"
   */
  @IsString()
  slug: string;

  /**
   * TVDB ID (optional)
   * @example 81189
   */
  @IsOptional()
  @IsNumber()
  tvdb?: number;

  /**
   * IMDb ID (optional)
   * @example "tt0137523"
   */
  @IsOptional()
  @IsString()
  imdb?: string;

  /**
   * TMDB ID (optional)
   * @example 550
   */
  @IsOptional()
  @IsNumber()
  tmdb?: number;
}

export class TraktStats {
  /**
   * Number of watchers
   * @example 1234
   */
  @IsNumber()
  watchers: number;

  /**
   * Number of plays
   * @example 5678
   */
  @IsNumber()
  plays: number;

  /**
   * Number of collectors
   * @example 910
   */
  @IsNumber()
  collectors: number;

  /**
   * Number of comments
   * @example 45
   */
  @IsNumber()
  comments: number;

  /**
   * Number of lists
   * @example 12
   */
  @IsNumber()
  lists: number;

  /**
   * Number of votes
   * @example 890
   */
  @IsNumber()
  votes: number;
}

export class TraktRating {
  /**
   * Rating value (1-10)
   * @example 8.5
   */
  @IsNumber()
  rating: number;

  /**
   * Number of votes
   * @example 12345
   */
  @IsNumber()
  votes: number;

  /**
   * Rating distribution
   * @example {"1": 78, "2": 45, "3": 123}
   */
  distribution: Record<string, number>;
}

// Scrobble DTOs
export class TraktMovieScrobble {
  /**
   * Movie IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;

  /**
   * Movie title (optional)
   * @example "Fight Club"
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * Movie year (optional)
   * @example 1999
   */
  @IsOptional()
  @IsNumber()
  year?: number;
}

export class TraktEpisodeScrobble {
  /**
   * Episode IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;

  /**
   * Episode title (optional)
   * @example "Pilot"
   */
  @IsOptional()
  @IsString()
  title?: string;
}

export class TraktShowScrobble {
  /**
   * Show IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;

  /**
   * Show title (optional)
   * @example "Breaking Bad"
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * Show year (optional)
   * @example 2008
   */
  @IsOptional()
  @IsNumber()
  year?: number;
}

export class TraktScrobbleRequest {
  /**
   * Movie information (for movie scrobbling)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktMovieScrobble)
  movie?: TraktMovieScrobble;

  /**
   * Episode information (for episode scrobbling)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktEpisodeScrobble)
  episode?: TraktEpisodeScrobble;

  /**
   * Show information (for episode scrobbling)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktShowScrobble)
  show?: TraktShowScrobble;

  /**
   * Viewing progress percentage (0-100)
   * @example 65.5
   */
  @IsNumber()
  progress: number;

  /**
   * App version (optional)
   * @example "1.0.0"
   */
  @IsOptional()
  @IsString()
  app_version?: string;

  /**
   * App date (optional)
   * @example "2024-01-01"
   */
  @IsOptional()
  @IsString()
  app_date?: string;
}

export class TraktSharingOptions {
  /**
   * Share to Facebook
   * @example true
   */
  @IsBoolean()
  facebook: boolean;

  /**
   * Share to Twitter
   * @example false
   */
  @IsBoolean()
  twitter: boolean;

  /**
   * Share to Tumblr
   * @example false
   */
  @IsBoolean()
  tumblr: boolean;
}

export class TraktScrobbleResponse {
  /**
   * Scrobble ID
   * @example 123456
   */
  @IsNumber()
  id: number;

  /**
   * Scrobble action
   * @example "start"
   */
  @IsString()
  action: 'start' | 'pause' | 'scrobble' | 'stop';

  /**
   * Progress percentage at time of scrobble
   * @example 65.5
   */
  @IsNumber()
  progress: number;

  /**
   * Sharing configuration (optional)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktSharingOptions)
  sharing?: TraktSharingOptions;

  /**
   * Movie data (if scrobbling a movie)
   */
  @IsOptional()
  movie?: any;

  /**
   * Episode data (if scrobbling an episode)
   */
  @IsOptional()
  episode?: any;

  /**
   * Show data (if scrobbling an episode)
   */
  @IsOptional()
  show?: any;
}

// Check-in DTOs
export class TraktCheckinSharingOptions {
  /**
   * Share to Facebook (optional)
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  facebook?: boolean;

  /**
   * Share to Twitter (optional)
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  twitter?: boolean;

  /**
   * Share to Tumblr (optional)
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  tumblr?: boolean;
}

export class TraktCheckinRequest {
  /**
   * Movie information (for movie check-in)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktMovieScrobble)
  movie?: TraktMovieScrobble;

  /**
   * Episode information (for episode check-in)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktEpisodeScrobble)
  episode?: TraktEpisodeScrobble;

  /**
   * Show information (for episode check-in)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktShowScrobble)
  show?: TraktShowScrobble;

  /**
   * Check-in message (optional)
   * @example "Watching this amazing movie!"
   */
  @IsOptional()
  @IsString()
  message?: string;

  /**
   * Social sharing options (optional)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktCheckinSharingOptions)
  sharing?: TraktCheckinSharingOptions;

  /**
   * Foursquare venue ID (optional)
   * @example "4bf58dd8d48988d182941735"
   */
  @IsOptional()
  @IsString()
  foursquare_venue_id?: string;

  /**
   * Foursquare venue name (optional)
   * @example "Movie Theater"
   */
  @IsOptional()
  @IsString()
  foursquare_venue_name?: string;

  /**
   * App version (optional)
   * @example "1.0.0"
   */
  @IsOptional()
  @IsString()
  app_version?: string;

  /**
   * App date (optional)
   * @example "2024-01-01"
   */
  @IsOptional()
  @IsString()
  app_date?: string;
}

// Sync DTOs for History, Collection, Watchlist
export class TraktSyncEpisode {
  /**
   * Episode number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * Collection date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @IsString()
  collected_at?: string;

  /**
   * Watch date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @IsString()
  watched_at?: string;

  /**
   * Rating (1-10, optional)
   * @example 8
   */
  @IsOptional()
  @IsNumber()
  rating?: number;

  /**
   * Rating date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @IsString()
  rated_at?: string;
}

export class TraktSyncSeason {
  /**
   * Season number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * Episodes in this season (optional)
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncEpisode)
  episodes?: TraktSyncEpisode[];
}

export class TraktSyncMovieItem {
  /**
   * Movie IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;

  /**
   * Collection date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @IsString()
  collected_at?: string;

  /**
   * Watch date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @IsString()
  watched_at?: string;

  /**
   * Rating (1-10, optional)
   * @example 8
   */
  @IsOptional()
  @IsNumber()
  rating?: number;

  /**
   * Rating date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsOptional()
  @IsString()
  rated_at?: string;
}

export class TraktSyncShowItem {
  /**
   * Show IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;

  /**
   * Seasons (optional)
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncSeason)
  seasons?: TraktSyncSeason[];
}

export class TraktSyncRequest {
  /**
   * Movies to sync (optional)
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncMovieItem)
  movies?: TraktSyncMovieItem[];

  /**
   * Shows to sync (optional)
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncShowItem)
  shows?: TraktSyncShowItem[];
}

export class TraktSyncNotFoundItem {
  /**
   * IDs of not found item
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktSyncAddedCounts {
  /**
   * Number of movies added
   * @example 5
   */
  @IsNumber()
  movies: number;

  /**
   * Number of episodes added
   * @example 12
   */
  @IsNumber()
  episodes: number;
}

export class TraktSyncExistingCounts {
  /**
   * Number of movies already existing
   * @example 2
   */
  @IsNumber()
  movies: number;

  /**
   * Number of episodes already existing
   * @example 3
   */
  @IsNumber()
  episodes: number;
}

export class TraktSyncNotFoundItems {
  /**
   * Movies not found
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncNotFoundItem)
  movies: TraktSyncNotFoundItem[];

  /**
   * Shows not found
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncNotFoundItem)
  shows: TraktSyncNotFoundItem[];

  /**
   * Episodes not found
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktSyncNotFoundItem)
  episodes: TraktSyncNotFoundItem[];
}

export class TraktSyncResponse {
  /**
   * Added items count
   */
  @ValidateNested()
  @Type(() => TraktSyncAddedCounts)
  added: TraktSyncAddedCounts;

  /**
   * Existing items count
   */
  @ValidateNested()
  @Type(() => TraktSyncExistingCounts)
  existing: TraktSyncExistingCounts;

  /**
   * Not found items
   */
  @ValidateNested()
  @Type(() => TraktSyncNotFoundItems)
  not_found: TraktSyncNotFoundItems;
}

// History DTOs
export class TraktHistoryMovie {
  /**
   * Movie title
   * @example "Fight Club"
   */
  @IsString()
  title: string;

  /**
   * Movie year
   * @example 1999
   */
  @IsNumber()
  year: number;

  /**
   * Movie IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktHistoryEpisode {
  /**
   * Episode title
   * @example "Pilot"
   */
  @IsString()
  title: string;

  /**
   * Episode IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktHistoryShow {
  /**
   * Show title
   * @example "Breaking Bad"
   */
  @IsString()
  title: string;

  /**
   * Show year
   * @example 2008
   */
  @IsNumber()
  year: number;

  /**
   * Show IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktHistoryItem {
  /**
   * History item ID
   * @example 12345
   */
  @IsNumber()
  id: number;

  /**
   * When the item was watched
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  watched_at: string;

  /**
   * Action type
   * @example "scrobble"
   */
  @IsString()
  action: 'scrobble' | 'checkin' | 'watch';

  /**
   * Item type
   * @example "movie"
   */
  @IsString()
  type: 'movie' | 'episode';

  /**
   * Movie information (if type is movie)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktHistoryMovie)
  movie?: TraktHistoryMovie;

  /**
   * Episode information (if type is episode)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktHistoryEpisode)
  episode?: TraktHistoryEpisode;

  /**
   * Show information (if type is episode)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktHistoryShow)
  show?: TraktHistoryShow;
}

// Collection DTOs
export class TraktCollectionEpisode {
  /**
   * Episode number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * When the episode was collected
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  collected_at: string;
}

export class TraktCollectionSeason {
  /**
   * Season number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * Episodes in this season
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktCollectionEpisode)
  episodes: TraktCollectionEpisode[];
}

export class TraktCollectionMovie {
  /**
   * Movie title
   * @example "Fight Club"
   */
  @IsString()
  title: string;

  /**
   * Movie year
   * @example 1999
   */
  @IsNumber()
  year: number;

  /**
   * Movie IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktCollectionShow {
  /**
   * Show title
   * @example "Breaking Bad"
   */
  @IsString()
  title: string;

  /**
   * Show year
   * @example 2008
   */
  @IsNumber()
  year: number;

  /**
   * Show IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;

  /**
   * Seasons in the collection
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraktCollectionSeason)
  seasons: TraktCollectionSeason[];
}

export class TraktCollectionItem {
  /**
   * When the item was collected
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  collected_at: string;

  /**
   * Movie information (if collecting a movie)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktCollectionMovie)
  movie?: TraktCollectionMovie;

  /**
   * Show information (if collecting a show)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktCollectionShow)
  show?: TraktCollectionShow;
}

// Watchlist DTOs
export class TraktWatchlistMovie {
  /**
   * Movie title
   * @example "Fight Club"
   */
  @IsString()
  title: string;

  /**
   * Movie year
   * @example 1999
   */
  @IsNumber()
  year: number;

  /**
   * Movie IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktWatchlistShow {
  /**
   * Show title
   * @example "Breaking Bad"
   */
  @IsString()
  title: string;

  /**
   * Show year
   * @example 2008
   */
  @IsNumber()
  year: number;

  /**
   * Show IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktWatchlistSeason {
  /**
   * Season number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * Season IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktWatchlistEpisode {
  /**
   * Episode title
   * @example "Pilot"
   */
  @IsString()
  title: string;

  /**
   * Episode number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * Episode IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktWatchlistItem {
  /**
   * Item rank in watchlist
   * @example 1
   */
  @IsNumber()
  rank: number;

  /**
   * When the item was added to watchlist
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  listed_at: string;

  /**
   * Item type
   * @example "movie"
   */
  @IsString()
  type: 'movie' | 'show' | 'season' | 'episode';

  /**
   * Movie information (if type is movie)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktWatchlistMovie)
  movie?: TraktWatchlistMovie;

  /**
   * Show information (if type is show)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktWatchlistShow)
  show?: TraktWatchlistShow;

  /**
   * Season information (if type is season)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktWatchlistSeason)
  season?: TraktWatchlistSeason;

  /**
   * Episode information (if type is episode)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktWatchlistEpisode)
  episode?: TraktWatchlistEpisode;
}

// List DTOs
export class TraktListIds {
  /**
   * Trakt list ID
   * @example 123456
   */
  @IsNumber()
  trakt: number;

  /**
   * List slug
   * @example "my-favorite-movies"
   */
  @IsString()
  slug: string;
}

export class TraktUserIds {
  /**
   * User slug
   * @example "john-doe"
   */
  @IsString()
  slug: string;
}

export class TraktListUser {
  /**
   * Username
   * @example "john_doe"
   */
  @IsString()
  username: string;

  /**
   * Is user profile private
   * @example false
   */
  @IsBoolean()
  private: boolean;

  /**
   * User display name
   * @example "John Doe"
   */
  @IsString()
  name: string;

  /**
   * Is user VIP
   * @example false
   */
  @IsBoolean()
  vip: boolean;

  /**
   * Is user VIP EP
   * @example false
   */
  @IsBoolean()
  vip_ep: boolean;

  /**
   * User IDs
   */
  @ValidateNested()
  @Type(() => TraktUserIds)
  ids: TraktUserIds;
}

export class TraktList {
  /**
   * List name
   * @example "My Favorite Movies"
   */
  @IsString()
  name: string;

  /**
   * List description
   * @example "A collection of my all-time favorite movies"
   */
  @IsString()
  description: string;

  /**
   * List privacy setting
   * @example "public"
   */
  @IsString()
  privacy: 'private' | 'friends' | 'public';

  /**
   * Display item numbers
   * @example true
   */
  @IsBoolean()
  display_numbers: boolean;

  /**
   * Allow comments on list
   * @example true
   */
  @IsBoolean()
  allow_comments: boolean;

  /**
   * Sort by field
   * @example "rank"
   */
  @IsString()
  sort_by: string;

  /**
   * Sort direction
   * @example "asc"
   */
  @IsString()
  sort_how: 'asc' | 'desc';

  /**
   * When the list was created
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  created_at: string;

  /**
   * When the list was last updated
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  updated_at: string;

  /**
   * Number of items in the list
   * @example 25
   */
  @IsNumber()
  item_count: number;

  /**
   * Number of comments on the list
   * @example 5
   */
  @IsNumber()
  comment_count: number;

  /**
   * Number of likes on the list
   * @example 12
   */
  @IsNumber()
  like_count: number;

  /**
   * List IDs
   */
  @ValidateNested()
  @Type(() => TraktListIds)
  ids: TraktListIds;

  /**
   * List owner information
   */
  @ValidateNested()
  @Type(() => TraktListUser)
  user: TraktListUser;
}

export class TraktListItem {
  /**
   * Item rank in list
   * @example 1
   */
  @IsNumber()
  rank: number;

  /**
   * When the item was added to list
   * @example "2023-01-01T00:00:00.000Z"
   */
  @IsString()
  listed_at: string;

  /**
   * Item type
   * @example "movie"
   */
  @IsString()
  type: 'movie' | 'show' | 'season' | 'episode' | 'person';

  /**
   * Movie data (if type is movie)
   */
  @IsOptional()
  movie?: any;

  /**
   * Show data (if type is show)
   */
  @IsOptional()
  show?: any;

  /**
   * Season data (if type is season)
   */
  @IsOptional()
  season?: any;

  /**
   * Episode data (if type is episode)
   */
  @IsOptional()
  episode?: any;

  /**
   * Person data (if type is person)
   */
  @IsOptional()
  person?: any;
}

// User Stats DTOs
export class TraktMovieStats {
  /**
   * Number of movie plays
   * @example 456
   */
  @IsNumber()
  plays: number;

  /**
   * Number of movies watched
   * @example 123
   */
  @IsNumber()
  watched: number;

  /**
   * Minutes spent watching movies
   * @example 12345
   */
  @IsNumber()
  minutes: number;

  /**
   * Number of movies collected
   * @example 89
   */
  @IsNumber()
  collected: number;

  /**
   * Number of movie ratings given
   * @example 67
   */
  @IsNumber()
  ratings: number;

  /**
   * Number of movie comments made
   * @example 23
   */
  @IsNumber()
  comments: number;
}

export class TraktShowStats {
  /**
   * Number of shows watched
   * @example 45
   */
  @IsNumber()
  watched: number;

  /**
   * Number of shows collected
   * @example 34
   */
  @IsNumber()
  collected: number;

  /**
   * Number of show ratings given
   * @example 23
   */
  @IsNumber()
  ratings: number;

  /**
   * Number of show comments made
   * @example 12
   */
  @IsNumber()
  comments: number;
}

export class TraktSeasonStats {
  /**
   * Number of season ratings given
   * @example 15
   */
  @IsNumber()
  ratings: number;

  /**
   * Number of season comments made
   * @example 8
   */
  @IsNumber()
  comments: number;
}

export class TraktEpisodeStats {
  /**
   * Number of episode plays
   * @example 789
   */
  @IsNumber()
  plays: number;

  /**
   * Number of episodes watched
   * @example 567
   */
  @IsNumber()
  watched: number;

  /**
   * Minutes spent watching episodes
   * @example 23456
   */
  @IsNumber()
  minutes: number;

  /**
   * Number of episodes collected
   * @example 234
   */
  @IsNumber()
  collected: number;

  /**
   * Number of episode ratings given
   * @example 123
   */
  @IsNumber()
  ratings: number;

  /**
   * Number of episode comments made
   * @example 45
   */
  @IsNumber()
  comments: number;
}

export class TraktNetworkStats {
  /**
   * Number of friends
   * @example 25
   */
  @IsNumber()
  friends: number;

  /**
   * Number of followers
   * @example 67
   */
  @IsNumber()
  followers: number;

  /**
   * Number of users following
   * @example 34
   */
  @IsNumber()
  following: number;
}

export class TraktRatingStats {
  /**
   * Total number of ratings given
   * @example 456
   */
  @IsNumber()
  total: number;

  /**
   * Rating distribution
   * @example {"1": 5, "2": 8, "3": 12}
   */
  distribution: Record<string, number>;
}

export class TraktUserStats {
  /**
   * Movie statistics
   */
  @ValidateNested()
  @Type(() => TraktMovieStats)
  movies: TraktMovieStats;

  /**
   * Show statistics
   */
  @ValidateNested()
  @Type(() => TraktShowStats)
  shows: TraktShowStats;

  /**
   * Season statistics
   */
  @ValidateNested()
  @Type(() => TraktSeasonStats)
  seasons: TraktSeasonStats;

  /**
   * Episode statistics
   */
  @ValidateNested()
  @Type(() => TraktEpisodeStats)
  episodes: TraktEpisodeStats;

  /**
   * Network statistics
   */
  @ValidateNested()
  @Type(() => TraktNetworkStats)
  network: TraktNetworkStats;

  /**
   * Rating statistics
   */
  @ValidateNested()
  @Type(() => TraktRatingStats)
  ratings: TraktRatingStats;
}

// Search DTOs (for finding content to add to lists/collections)
export class TraktSearchMovie {
  /**
   * Movie title
   * @example "Fight Club"
   */
  @IsString()
  title: string;

  /**
   * Movie year
   * @example 1999
   */
  @IsNumber()
  year: number;

  /**
   * Movie IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktSearchShow {
  /**
   * Show title
   * @example "Breaking Bad"
   */
  @IsString()
  title: string;

  /**
   * Show year
   * @example 2008
   */
  @IsNumber()
  year: number;

  /**
   * Show IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktSearchEpisode {
  /**
   * Episode title
   * @example "Pilot"
   */
  @IsString()
  title: string;

  /**
   * Episode number
   * @example 1
   */
  @IsNumber()
  number: number;

  /**
   * Episode IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktSearchPerson {
  /**
   * Person name
   * @example "Bryan Cranston"
   */
  @IsString()
  name: string;

  /**
   * Person IDs
   */
  @ValidateNested()
  @Type(() => TraktIds)
  ids: TraktIds;
}

export class TraktSearchResult {
  /**
   * Search result type
   * @example "movie"
   */
  @IsString()
  type: 'movie' | 'show' | 'episode' | 'person' | 'list';

  /**
   * Search relevance score
   * @example 98.5
   */
  @IsNumber()
  score: number;

  /**
   * Movie data (if type is movie)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktSearchMovie)
  movie?: TraktSearchMovie;

  /**
   * Show data (if type is show)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktSearchShow)
  show?: TraktSearchShow;

  /**
   * Episode data (if type is episode)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktSearchEpisode)
  episode?: TraktSearchEpisode;

  /**
   * Person data (if type is person)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktSearchPerson)
  person?: TraktSearchPerson;

  /**
   * List data (if type is list)
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => TraktList)
  list?: TraktList;
}
