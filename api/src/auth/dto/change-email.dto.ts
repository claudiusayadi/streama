import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  /**
   * Current email of the user
   * @example 'ilovemovies@gmail.com'
   */
  @IsString()
  @IsNotEmpty()
  currentEmail: string;

  /**
   * New email for the user
   * @example 'ilovestreama@gmail.com'
   * */
  @IsString()
  @IsNotEmpty()
  newEmail: string;
}
