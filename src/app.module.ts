import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entity/book.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'mysecretpassword',
            database: 'nestjs-library-api-db',
          }),
      entities: [Book, User],
      synchronize: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      migrations: [__dirname + '/../database/migrations/*.{js,ts}'], // Path to your migration files
      migrationsRun: false, // Set to true if you want migrations to run on app start (careful in prod!)
      logging: ['query', 'error'],
    }),
    UsersModule,
  ],
})
export class AppModule {}
