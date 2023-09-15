import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

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
    });
    return {
      accessToken: accessToken,
    };
  }
}
