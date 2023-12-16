import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnd } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEnd)
    private userRepository: Repository<UserEnd>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEnd)
      .values([{ ...createUserDto }])
      .execute();
  }

  async login(name: string, surname: string, password: string) {
    const user = await this.findOneByName(name);
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOneByName(name: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name })
      .getOne();
  }
}
