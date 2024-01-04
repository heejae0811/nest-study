import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesDto } from './create-movies.dto';

export class UpdateMoviesDto extends PartialType(CreateMoviesDto) {
  // @IsString()
  // readonly title?: string;
  //
  // @IsNumber()
  // readonly year?: number;
  //
  // @IsString({ each: true })
  // readonly genres?: string[];
}
