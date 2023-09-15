import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Notes } from 'src/entities/notes.entities';
import { User } from 'src/entities/user.entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest_notes_API',
  // entities: [Notes, User],
  autoLoadEntities: true,
  // synchronize: true,
};
