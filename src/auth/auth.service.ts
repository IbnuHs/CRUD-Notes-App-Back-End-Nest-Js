import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { User } from 'src/entities/user.entities';
import { Repository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(loginDto: loginDto): Promise<Object> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new NotFoundException('Email Not Found');
    const salt = user.salt;
    const passwordUser = user.password;
    const hashingPassword = await bcrypt.hash(password, salt);

    if (passwordUser !== hashingPassword)
      throw new UnauthorizedException('Password Wrong');

    const payload = { id: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '60s',
    });

    const resfreshToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '1d',
    });
    this.userRepository.save({ id: user.id, refresh_token: resfreshToken });

    return {
      accessToken: accessToken,
      refreshToken: resfreshToken,
    };
  }
  async resfreshToken(refreshTokenDto: RefreshTokenDto): Promise<Object> {
    const { refresh_token } = refreshTokenDto;
    const user = await this.userRepository.findOne({
      where: {
        refresh_token,
      },
    });
    if (!user) throw new NotFoundException('User Not Found');

    const payload = { id: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '1d',
    });
    this.userRepository.save({ id: user.id, refresh_token: accessToken });

    return { refresh_Token: accessToken };
  }

  async validateByid(id: string) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) return null;
    return user;
  }

  async Logout(id: string) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found');

    const deleteToken = await this.userRepository.save({
      id: id,
      refresh_token: null,
    });

    return deleteToken;
  }
}
