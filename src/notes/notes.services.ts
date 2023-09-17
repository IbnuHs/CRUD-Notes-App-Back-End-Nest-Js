import { Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from 'src/entities/notes.entities';
import { Repository } from 'typeorm';
import { CreateNotesDTO } from './dto/add.notes';
import { UpdateNotesDto } from './dto/update.notes.Dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { User } from 'src/entities/user.entities';

@Injectable()
export class NotesServices {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepo: Repository<Notes>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Controller
  async getAllNotes(user_id: string): Promise<string | object> {
    const user = await this.userRepository.find({
      where: {
        id: user_id,
      },
    });

    const notes = await this.notesRepo.find({
      where: {
        user: { id: user_id },
      },
    });
    // return await this.notesRepo.find();

    return notes;
  }

  async AddNotes(user_id: string, data: CreateNotesDTO): Promise<Notes> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });
    const notes = this.notesRepo.create({ ...data, user: user });
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
