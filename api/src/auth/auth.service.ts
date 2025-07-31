import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeEmailDto } from 'src/auth/dto/change-email.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password';
import { UserRole } from 'src/common/enums/user-role.enum';
import { JwtPayload, RequestUser } from 'src/common/interfaces/user.interface';
import { User } from 'src/domains/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(dto: AuthDto): Promise<RequestUser | undefined> {
    const { email, password } = dto;
    const user = await this.usersRepo.findOne({
      where: { email },
      select: { id: true, password: true },
    });

    if (user && (await user.compare(password))) {
      return this.createUserPayload(user);
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async validateJwt(payload: JwtPayload): Promise<RequestUser> {
    const user = await this.usersRepo.findOneBy({ id: payload.sub });
    if (!user) throw new UnauthorizedException('Invalid token');

    return this.createUserPayload(user);
  }

  async signin(user: RequestUser) {
    const payload = { sub: user.id } as JwtPayload;
    await this.usersRepo.update(payload, { lastLoginAt: new Date() });
    return this.jwtService.sign(payload);
  }

  async signup(dto: AuthDto): Promise<User> {
    const user = this.usersRepo.create(dto);
    return await this.usersRepo.save(user);
  }

  async changePassword(id: string, dto: ChangePasswordDto) {
    const { currentPassword, newPassword } = dto;

    const user = await this.usersRepo.findOne({
      where: { id },
      select: { id: true, password: true },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!(await user.compare(currentPassword)))
      throw new UnauthorizedException('Invalid current password!');

    user.password = newPassword;
    return this.usersRepo.save(user);
  }

  async changeEmail(id: string, dto: ChangeEmailDto) {
    const { currentEmail, newEmail } = dto;

    if (currentEmail === newEmail)
      throw new UnauthorizedException(
        'New email cannot be the same as current',
      );

    // Checking if new email is already in use or user with current email does not exist
    const [existingUser, user] = await Promise.all([
      this.usersRepo.findOne({
        where: { email: newEmail },
        select: { id: true },
      }),
      this.usersRepo.findOne({
        where: { id, email: currentEmail },
        select: { id: true },
      }),
    ]);

    if (existingUser) throw new ConflictException('Email already in use');
    if (!user) throw new NotFoundException('User not found');

    user.email = newEmail;
    return this.usersRepo.save(user);
  }

  async assignRole(id: string, role: UserRole) {
    const user = await this.usersRepo.preload({ id, role });
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepo.save(user);
  }

  private createUserPayload(user: User): RequestUser {
    const { id, role } = user;
    return { id, role };
  }
}
