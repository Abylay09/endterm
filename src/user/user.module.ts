import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEnd } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'webdev',
    }),
    TypeOrmModule.forFeature([UserEnd]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
