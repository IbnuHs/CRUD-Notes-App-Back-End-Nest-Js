import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import 'dotenv/config';

@Module({
  imports: [
    NotesModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
