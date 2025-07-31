import { IsString, IsNumber, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateBookDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  publishedYear: number;
}

export class ResponseBookDTO {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  author: string;

  @IsNumber()
  @Expose()
  publishedYear: number;
}
