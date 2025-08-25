import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  /**
   * Current password of the user
   * @example 'currentPassword.123'
   */
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  /**
   * New password for the user
   * @example 'newPassword.456'
   */
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
