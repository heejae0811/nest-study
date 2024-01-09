import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  let testMovie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    // 테스트에 사용될 영화 객체 생성
    testMovie = {
      title: 'Test Movie',
      year: 2024,
      genres: ['Test'],
    };
  });

  describe('getAll', () => {
    it('should return an array', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create(testMovie);

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create(testMovie);

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);

      const afterDelete = service.getAll().length;
      expect(beforeDelete).toBeLessThan(afterDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create(testMovie);

      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should throw a NotFoundException', () => {
      service.create(testMovie);

      service.update(1, { title: 'Updated Test' });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');

      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
