import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: CreateUserDTO): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOneBy({ id });
    return user ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
