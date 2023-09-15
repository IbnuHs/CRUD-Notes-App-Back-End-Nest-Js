import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
