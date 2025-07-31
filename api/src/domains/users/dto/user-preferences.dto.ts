import { IsOptional, IsString } from 'class-validator';

export class UserPreferencesDto {
  /**
   * User's preferred theme
   * @example "dark"
   */
  @IsString()
  @IsOptional()
  theme?: string;

  /**
   * User's preferred language
   * @example "en"
   */
  @IsString()
  @IsOptional()
  language?: string;
}
