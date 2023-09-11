import { IsNotEmpty } from 'class-validator';

export class UpdateNotesDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  notes: string;
}
