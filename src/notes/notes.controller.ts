import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { NotesServices } from './notes.services';
import { CreateNotesDTO } from './dto/add.notes';
import { Notes } from 'src/entities/notes.entities';
import { UpdateNotesDto } from './dto/update.notes.Dto';
import { JwtStrategy } from 'src/auth/strategy/verifyToken';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesServices: NotesServices) {}

  @UseGuards(JwtStrategy)
  @Get('mynotes/:user_id')
  async getAllNotes(@Param('user_id') user_id: string) {
    JwtStrategy;
    return this.notesServices.getAllNotes(user_id);
  }

  @Get('getNote/:id')
  async getNoteById(@Param('id') id: string) {
    return this.notesServices.getNoteByid(id);
  }

  @Post(':user_id')
  async AddNotes(
    @Param('user_id') user_id: string,
    @Body() createNotesDto: CreateNotesDTO,
  ): Promise<Notes> {
    return this.notesServices.AddNotes(user_id, createNotesDto);
  }

  @Put('update/:id')
  async updateNotes(
    @Param('id') id: string,
    @Body() updatenotesDto: UpdateNotesDto,
  ) {
    return this.notesServices.updateNotes(id, updatenotesDto);
    // console.log('tes');
  }

  @Delete('delete/:id')
  async deleteNotes(@Param('id') id: string) {
    return this.notesServices.deleteNotes(id);
  }

  @Get('header')
  getAllHeaders(@Headers() headers: Record<string, any>) {
    console.log('All Headers:', headers);
    // Lakukan sesuatu dengan semua header
    return `All Headers: ${JSON.stringify(headers)}`;
  }
}
