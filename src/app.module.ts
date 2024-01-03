import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';

@Module({
  imports: [],
  controllers: [MoviesController, TestController],
  providers: [MoviesService, TestService],
})
export class AppModule {}
