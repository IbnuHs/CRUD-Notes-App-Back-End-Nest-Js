import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesServices } from './notes.services';
import { CreateNotesDTO } from './dto/add.notes';
import { Notes } from 'src/entities/notes.entities';
import { UpdateNotesDto } from './dto/update.notes.Dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesServices: NotesServices) {}
  @Get()
  async getAllNotes() {
    return this.notesServices.getAllNotes();
  }

  @Get('getNote/:id')
  async getNoteById(@Param('id') id: string) {
    return this.notesServices.getNoteByid(id);
  }

  @Post()
  async AddNotes(@Body() createNotesDto: CreateNotesDTO): Promise<Notes> {
    return this.notesServices.AddNotes(createNotesDto);
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
}
