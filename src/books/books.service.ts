import { Get, Injectable, Param, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDTO } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async create(createBookDto: CreateBookDTO): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Book | null> {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: CreateBookDTO): Promise<Book | null> {
    await this.bookRepository.update(id, updateData);
    const book = this.bookRepository.findOneBy({ id });
    return book ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
