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
import { BooksService } from './books.service';
import { CreateBookDTO, ResponseBookDTO } from './dto/book.dto';
import { plainToInstance } from 'class-transformer';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/')
  @HttpCode(200)
  async getAllBooks() {
    return await this.booksService.getAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getBookById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseBookDTO> {
    const book = await this.booksService.getById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return plainToInstance(ResponseBookDTO, book);
  }

  @Post('/')
  @HttpCode(201)
  async createBook(
    @Body() createBookDTO: CreateBookDTO,
  ): Promise<ResponseBookDTO> {
    const newBook = await this.booksService.create(createBookDTO);
    return plainToInstance(ResponseBookDTO, newBook);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    createBookDto: CreateBookDTO,
  ): Promise<ResponseBookDTO> {
    const updatedBook = await this.booksService.update(id, createBookDto);
    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }
    return plainToInstance(ResponseBookDTO, updatedBook);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBook(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted = await this.booksService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Book not found');
    }
  }
}
