import * as argon from 'argon2';
import { Exclude } from 'class-transformer';
import { RegistryDates } from 'src/common/entities/registry.entity';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserPreferencesDto } from 'src/domains/users/dto/user-preferences.dto';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  public email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  public password: string;

  @Column({ type: 'varchar', length: 255, name: 'first_name', nullable: true })
  public firstName?: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name', nullable: true })
  public lastName?: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  public phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public bio?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: 'avatar.jpg',
  })
  public avatar?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'user_role',
    default: UserRole.USER,
  })
  public role: UserRole;

  @Column({ name: 'tmdb_key', type: 'varchar', length: 255, nullable: true })
  public tmdbKey?: string;

  @Column({ name: 'trakt_key', type: 'varchar', length: 255, nullable: true })
  public traktKey?: string;

  @Column({ type: 'timestamp', name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  @Column({ type: 'jsonb', nullable: true })
  public preferences?: UserPreferencesDto;

  @Column(() => RegistryDates, { prefix: false })
  public registry: RegistryDates;

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (this.password) {
      this.password = await argon.hash(this.password);
    }
  }

  public async compare(password: string): Promise<boolean> {
    if (!this.password) throw new Error('User password hash is missing');
    if (!password) throw new Error('Password to compare is missing');
    return await argon.verify(this.password, password);
  }

  public get isDeleted(): boolean {
    return !!this.registry.deletedAt;
  }
}
