import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RemoveDto } from 'src/common/dto/remove.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RequestUser } from 'src/common/interfaces/user.interface';
import { CreateUserDto } from 'src/domains/users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user - only accessible by admin.
   * @param dto The data to create the user
   * @returns Returns the created user
   * @throws ConflictException if the email already exists
   */
  @HttpCode(HttpStatus.CREATED)
  // @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /**
   * Gets all users - only accessible by admin.
   * @returns Returns all users
   */
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Gets the current user by ID.
   * @param id The ID of the user to find
   * @param user The current user
   * @returns Returns the current user or the user with the specified ID(if queried by admin)
   * @throws NotFoundException if the user is not found
   * @throws ForbiddenException if the user does not have permission
   */
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.usersService.findOne(id, user);
  }

  /**
   * Updates the current user or the user with the specified ID (if queried by admin).
   * @param id The ID of the user to update
   * @param dto The update data
   * @param user The current user
   * @returns Returns the updated user
   * @throws NotFoundException if the user is not found
   * @throws ForbiddenException if the user does not have permission
   */
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.usersService.update(id, user, dto);
  }

  /**
   * Deactivates the current user or the user with the specified ID (if queried by admin).
   * @param id The ID of the user to remove
   * @param soft Whether to perform a soft delete
   * @param user The current user
   * @returns Returns the removed user
   * @throws NotFoundException if the user is not found
   * @throws ForbiddenException if the user does not have permission to remove the user
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query() { soft }: RemoveDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.usersService.remove(id, soft ?? false, user);
  }

  /**
   * Recovers a soft deleted user by email and password.
   * @param dto The recovery data containing email and password
   * @returns Returns the recovered user
   * @throws UnauthorizedException if the credentials are invalid
   * @throws ConflictException if the user is not deleted
   */
  @HttpCode(HttpStatus.CREATED)
  @Patch('recover')
  recover(@Body() dto: AuthDto) {
    return this.usersService.recover(dto);
  }
}
