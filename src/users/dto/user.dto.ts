import { IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class ResponseUserDTO {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  username: string;

  @IsString()
  @Expose()
  email: string;
}
