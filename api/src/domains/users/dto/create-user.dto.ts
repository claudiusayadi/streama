import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { PreferencesDto } from './user-preferences.dto';

export class CreateUserDto {
  /**
   * User email
   * @example "carelessspender@gmail.com"
   */
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  /**
   * Password must meet the following criteria:
   * - at least 8 characters long
   * - at least one lowercase letter
   * - at least one uppercase letter
   * - at least one number
   * - at least one symbol
   * @example "Alpha123$!@"
   */
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
    },
  )
  password: string;

  /**
   * User first name
   * @example "Owolabi"
   */
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * User last name
   * @example "Omoninakuna"
   */
  @IsString()
  @IsOptional()
  lastName?: string;

  /**
   * User phone number
   * @example "+2349012345678"
   */
  @IsPhoneNumber('NG', {
    message: 'Phone number must be a valid Nigerian phone number.',
  })
  @IsOptional()
  phone?: string;

  /**
   * User bio
   * @example "A passionate software developer."
   */
  @IsString()
  @IsOptional()
  bio?: string;

  /**
   * User avatar filename
   * @example "avatar.jpg"
   */
  @IsString()
  @IsOptional()
  avatar?: string;

  /**
   * User role
   * @example "user"
   */
  @IsString()
  @IsEnum(() => UserRole, { message: 'Role must be either "admin" or "user".' })
  role: UserRole = UserRole.USER;

  /**
   * User's TMDB API key
   * @example "your_tmdb_api_key"
   */
  @IsString()
  @IsOptional()
  tmdbKey?: string;

  /**
   * User's Trakt.tv API key
   * @example "your_trakt_api_key"
   */
  @IsString()
  @IsOptional()
  traktKey?: string;

  /**
   * User's last login date and time
   * @example "2023-10-01T12:00:00Z"
   */
  @IsOptional()
  lastLoginAt?: Date;

  /**
   *  User's app preferences
   *  @example { theme: 'dark', language: 'en-NG', include_adult: true }
   */
  @ValidateNested()
  @Type(() => PreferencesDto)
  @IsOptional()
  preferences?: PreferencesDto;
}
