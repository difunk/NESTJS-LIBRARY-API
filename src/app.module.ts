import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entity/book.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Book],
      synchronize: true,
      migrations: [__dirname + '/../database/migrations/*.{js,ts}'], // Path to your migration files
      migrationsRun: false, // Set to true if you want migrations to run on app start (careful in prod!)
      logging: ['query', 'error'],
    }),
  ],
})
export class AppModule {}
