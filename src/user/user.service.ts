import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import { registerDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}
  async Register(
    registerDto: registerDto,
  ): Promise<User | { message: string }> {
    try {
      const { name, email, password } = registerDto;
      const userExist = await this.userRespository.findOne({
        where: {
          email: email,
        },
      });
      if (userExist) throw new BadRequestException('Email Already Used');
      let salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.userRespository.create({
        name: name,
        email: email,
        password: hashPassword,
        salt: salt,
      });
      return this.userRespository.save(user);
    } catch (error) {
      return { message: error };
    }
  }

  async GetUserById(id: string): Promise<object | string> {
    const user = await this.userRespository.findOne({
      where: {
        id: id,
      },
    });
    console.log(id);
    // if (!user) throw new NotFoundException('User Not Found');

    return user;
  }
}
