import { Body, Controller, Post } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}
  @Post()
  async login(@Body() loginDto: loginDto) {
    return this.authServices.login(loginDto);
  }
}
