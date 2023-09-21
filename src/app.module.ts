import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WhatsappOtpModule } from './whatsapp-otp/whatsapp-otp.module';
// import 'dotenv/config';

@Module({
  imports: [
    NotesModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    WhatsappOtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
