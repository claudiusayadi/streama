import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  /**
   * Current email of the user
   * @example 'carelesspender@gmail.com'
   */
  @IsString()
  @IsNotEmpty()
  currentEmail: string;

  /**
   * New email for the user
   * @example 'newleafspender@gmail.com'
   * */
  @IsString()
  @IsNotEmpty()
  newEmail: string;
}
