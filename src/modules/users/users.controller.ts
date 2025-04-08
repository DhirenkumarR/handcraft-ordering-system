import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO, SignUpDTO } from './dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authGuards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/authGuards/roles.guards';

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
  // @Roles('user')
  @Get('user-profile')
  async getUserProfile(@GetUser() user: any) {
    console.log(user);
    return this.usersService.getUserProfile(user);
  }
}
