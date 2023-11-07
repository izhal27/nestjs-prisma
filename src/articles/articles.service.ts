import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createArticleDto: CreateArticleDto) {
    return this.prismaService.article.create({ data: createArticleDto });
  }

  findAll() {
    return this.prismaService.article.findMany({ include: { author: true } });
  }

  findDrafts() {
    return this.prismaService.article.findMany({ where: { published: false } });
  }

  findOne(id: number) {
    return this.prismaService.article.findUnique({ where: { id }, include: { author: true } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prismaService.article.update({ where: { id }, data: updateArticleDto });
  }

  remove(id: number) {
    return this.prismaService.article.delete({ where: { id } });
  }
}
