import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ChangeEmailDto } from 'src/auth/dto/change-email.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RequestUser } from 'src/common/interfaces/user.interface';
import cookieConfig from 'src/config/cookie.config';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user account.
   *
   * @param {AuthDto} dto - The registration data transfer object containing the user's email and password.
   * @returns The created user entity.
   * @throws {ConflictException} If the provided email is already associated with an existing account.
   * @remarks
   * This endpoint is public and does not require authentication.
   * On success, returns the newly created user.
   */
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return await this.authService.signup(dto);
  }

  /**
   * User login
   * @param dto - {email: string, password: string}
   * * @returns JWT token in a cookie
   * @throws UnauthorizedException if the credentials are invalid
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('signin')
  signin(
    @CurrentUser() user: RequestUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.authService.signin(user);
    res.cookie('token', token, cookieConfig);
  }

  /**
   * Change user password (only by owner)
   * @param user - Current user
   * @param dto - {currentPassword: string, newPassword: string}
   * @returns Updated user
   * @throws UnauthorizedException if the current password is incorrect
   * @throws NotFoundException if the user with the given ID does not exist
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('change-password')
  async changePassword(
    @CurrentUser() user: RequestUser,
    @Body() dto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(user.id, dto);
  }

  /**
   * Change user email (only by owner)
   * @param user - Current user
   * @param dto - {currentEmail: string, newEmail: string}
   * @returns Updated user
   * @throws UnauthorizedException if the current email does not match
   * @throws NotFoundException if the user with the given ID does not exist
   * @throws ConflictException if the new email is already in use
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('change-email')
  async changeEmail(
    @CurrentUser() user: RequestUser,
    @Body() dto: ChangeEmailDto,
  ) {
    return await this.authService.changeEmail(user.id, dto);
  }

  /**
   * Change user role  (only by Admin)
   * @param id - User ID
   * @param role - New role for the user
   * @returns Updated user
   * @throws UnauthorizedException if the user is not an admin
   * @throws NotFoundException if the user with the given ID does not exist
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async changeRole(@Param('id') id: string, @Body('role') role: UserRole) {
    return await this.authService.assignRole(id, role);
  }
}
