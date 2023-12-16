import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async auth(@Body() body: any) {
    try {
      return this.userService.login(body.name, body.surname, body.password);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('/registration')
  async create(@Body() createUserDto: CreateUserDto, @Res() response) {
    try {
      await this.userService.create(createUserDto);
      return response
        .status(201)
        .json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Ошибка при регистрации пользователя' });
    }
  }
}
