import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RequestUser } from 'src/common/interfaces/user.interface';
import { compareIds } from 'src/common/utils/compare-ids.util';
import { User } from 'src/domains/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  public async findAll() {
    return await this.usersRepo.find();
  }

  public async findOne(id: string, currentUser: RequestUser) {
    if (currentUser.role !== UserRole.ADMIN) compareIds(currentUser.id, id);
    return await this.usersRepo.findOneOrFail({ where: { id } });
  }

  public async update(
    id: string,
    currentUser: RequestUser,
    dto: UpdateUserDto,
  ) {
    if (currentUser.role !== UserRole.ADMIN) compareIds(currentUser.id, id);

    const user = await this.usersRepo.preload({
      id,
      avatar: dto.avatar,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      bio: dto.bio,
      tmdbKey: dto.tmdbKey,
      traktKey: dto.traktKey,
      preferences: dto.preferences,
    });

    if (!user) throw new NotFoundException('User not found');
    return this.usersRepo.save(user);
  }

  public async remove(id: string, soft: boolean, currentUser: RequestUser) {
    if (currentUser.role !== UserRole.ADMIN) {
      compareIds(currentUser.id, id);
      if (!soft) throw new ForbiddenException('Forbidden resource');
    }

    const user = await this.findOne(id, currentUser);
    return soft ? this.usersRepo.softRemove(user) : this.usersRepo.remove(user);
  }

  public async recover(dto: AuthDto) {
    const { email, password } = dto;

    const user = await this.usersRepo.findOne({
      where: { email },
      withDeleted: true,
    });

    if (!user || !(await user.compare(password)))
      throw new UnauthorizedException('Invalid credentials!');

    if (!user.isDeleted) throw new ConflictException('User not deleted');
    return await this.usersRepo.recover(user);
  }
}
