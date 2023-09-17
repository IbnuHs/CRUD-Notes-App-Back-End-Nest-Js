import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { registerDto } from './dto/user.dto';
import { register } from 'module';
import { AuthService } from 'src/auth/auth.service';
import { loginDto } from 'src/auth/dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async Register(@Body() registerDto: registerDto) {
    return this.userService.Register(registerDto);
  }

  @Get('getUser/:id')
  async GetUserById(@Param('id') id: string) {
    return this.userService.GetUserById(id);
  }
}
