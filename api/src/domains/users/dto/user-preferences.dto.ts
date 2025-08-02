import { IsOptional, IsString } from 'class-validator';
import { IsBoolean } from 'src/common/decorators/is-boolean.decorator';

export class PreferencesDto {
  /**
   * User's preferred theme
   * @example "dark"
   */
  @IsString()
  @IsOptional()
  theme?: string;

  /**
   * User's preferred adult content filter
   * @example true
   */
  @IsBoolean()
  @IsOptional()
  include_adult?: boolean = false;

  /**
   * User's preferred video content filter
   * @example true
   */
  @IsBoolean()
  @IsOptional()
  include_video?: boolean = false;

  /**
   * User's preferred language - defaults to 'en-US'
   * @example "en-NG"
   */
  @IsString()
  @IsOptional()
  language?: string = 'en-US';

  /**
   * Page number for pagination
   * @example 1
   */
  @IsOptional()
  page?: number = 1;

  /**
   * Sort order for results
   * @example "popularity.desc"
   */
  @IsString()
  @IsOptional()
  sort_by?: string = 'popularity.desc';

  /**
   * Region for content filtering
   * @example "NG"
   */
  @IsString()
  @IsOptional()
  region?: string = 'NG';
}
