import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: loginDto) {
    return this.authServices.login(loginDto);
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshtokenDto: RefreshTokenDto) {
    return this.authServices.resfreshToken(refreshtokenDto);
  }

  @Delete('logout/:id')
  async Logout(@Param('id') id: string) {
    return this.authServices.Logout(id);
  }
}
