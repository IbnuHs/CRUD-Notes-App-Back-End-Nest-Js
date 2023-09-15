import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesServices } from './notes.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from 'src/entities/notes.entities';
import { User } from 'src/entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, User])],
  controllers: [NotesController],
  providers: [NotesServices],
})
export class NotesModule {}
