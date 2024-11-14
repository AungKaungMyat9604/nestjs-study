import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { BcryptEnum } from 'src/resources/enum/bcrypt.enum';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const item = this.userRepository.create(createUserDto);

    //hash password
    const hashPassword = await hash(item.password, BcryptEnum.SALT_ROUNDS);
    item.password = hashPassword;
    return this.userRepository.save(item);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
