import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesServices } from './notes.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from 'src/entities/notes.entities';
import { User } from 'src/entities/user.entities';
import { AuthModule } from 'src/auth/auth.module';
// import { JwtStrategy } from 'src/auth/strategy/verifyToken';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthMiddleware } from 'src/middleware/verifyToken.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, User]), AuthModule],
  controllers: [NotesController],
  providers: [NotesServices, AuthService, JwtService],
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(NotesController);
  }
}
