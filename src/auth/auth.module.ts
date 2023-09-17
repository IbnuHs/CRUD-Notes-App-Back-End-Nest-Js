import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './strategy/verifyToken';
import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategy/verifyToken';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      global: true, // Gantilah dengan kunci rahasia Anda yang lebih aman
      signOptions: { expiresIn: '1h' }, // Atur masa berlaku token
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
