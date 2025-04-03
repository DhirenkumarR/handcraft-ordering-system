import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO, SignUpDTO } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() body:SignUpDTO,
  ) {
    return this.usersService.register(body);
  }

  @Post('login')
  async login(
    @Body() body : LoginDTO,
  ) {
    return this.usersService.login(body);
  }
}
