import { Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from 'src/entities/notes.entities';
import { Repository } from 'typeorm';
import { CreateNotesDTO } from './dto/add.notes';
import { UpdateNotesDto } from './dto/update.notes.Dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class NotesServices {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepo: Repository<Notes>,
  ) {}

  // Controller
  async getAllNotes(): Promise<Notes[]> {
    return await this.notesRepo.find();
  }

  async AddNotes(data: CreateNotesDTO): Promise<Notes> {
    const notes = this.notesRepo.create(data);
    return this.notesRepo.save(notes);
  }

  async getNoteByid(id: string): Promise<object> {
    const notes = await this.notesRepo.findOne({
      where: {
        id: id,
      },
    });

    return notes;
  }

  async updateNotes(id: string, updateNoteDto: UpdateNotesDto): Promise<Notes> {
    const notes = await this.notesRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!notes) throw new NotFoundException('Notes Not Found');

    const updatedNotes = await this.notesRepo.save({
      id: notes.id,
      ...updateNoteDto,
    });

    return updatedNotes;
  }

  async deleteNotes(id: string) {
    const notes = await this.notesRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!notes) throw new NotFoundException('Notes is not Found');
    await this.notesRepo.remove(notes);

    return 'Delete Success';
  }
}
