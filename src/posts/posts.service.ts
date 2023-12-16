import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postRepository
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([{ ...createPostDto }])
      .execute();
  }

  async findOne(id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .select()
      .where({
        id,
      })
      .execute();
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        ...updatePostDto,
      })
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.postRepository
      .createQueryBuilder('posts')
      .delete()
      .from(Post)
      .where('id = :id', { id })
      .execute();
  }
}
