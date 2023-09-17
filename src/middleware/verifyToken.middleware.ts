import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: () => void) {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    if (!token) throw new UnauthorizedException('empty Token');

    try {
      this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      next();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
