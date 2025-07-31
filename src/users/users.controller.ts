import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, ResponseUserDTO } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(200)
  async getAllUsers() {
    return await this.usersService.getAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseUserDTO> {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(ResponseUserDTO, user);
  }

  @Post('/')
  @HttpCode(201)
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<ResponseUserDTO> {
    const newUser = await this.usersService.create(createUserDTO);
    return plainToInstance(ResponseUserDTO, newUser);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: CreateUserDTO,
  ): Promise<ResponseUserDTO> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(ResponseUserDTO, updatedUser);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted = await this.usersService.delete(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
