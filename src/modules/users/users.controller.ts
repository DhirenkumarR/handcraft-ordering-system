import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO, SignUpDTO } from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

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


  @UseGuards(JwtAuthGuard)
  @Get('user-profile')
  async getUserProfile(@GetUser() user: any) {
    console.log(user);
    return this.usersService.getUserProfile(user);
  }
}
