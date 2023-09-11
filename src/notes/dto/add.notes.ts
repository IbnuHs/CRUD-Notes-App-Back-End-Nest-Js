import { IsNotEmpty } from 'class-validator';

export class CreateNotesDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  notes: string;
}
