import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { getNextReviewDate } from './review.util';
import { Word } from '@prisma/client';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateWordDto) {
    return this.prisma.word.create({
      data: {
        ...dto,
        userId,
        reviewCount: 0,
        nextReviewAt: getNextReviewDate(0), // ⭐ 第一次复习
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.word.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: number, id: number): Promise<Word> {
    const word = await this.prisma.word.findUnique({
      where: { id },
    });

    if (!word) {
      throw new NotFoundException('单词不存在');
    }

    if (userId !== word.userId) {
      throw new ForbiddenException('无权限访问');
    }

    return word;
  }

  async update(userId: number, id: number, dto: UpdateWordDto) {
    const word = await this.findOne(userId, id);

    return this.prisma.word.update({
      where: { id: word.id },
      data: dto,
    });
  }

  async remove(userId: number, id: number) {
    const word = await this.findOne(userId, id);
    return this.prisma.word.delete({
      where: { id: word.id },
    });
  }
  async getTodayReview(userId: number) {
    return this.prisma.word.findMany({
      where: {
        userId,
        nextReviewAt: {
          lte: new Date(),
        },
      },
      orderBy: {
        nextReviewAt: 'asc',
      },
    });
  }

  async review(userId: number, id: number) {
    const word = await this.findOne(userId, id);

    const newCount = word.reviewCount + 1;

    return this.prisma.word.update({
      where: { id },
      data: {
        reviewCount: newCount,
        status: 'REVIEW',
        nextReviewAt: getNextReviewDate(newCount),
      },
    });
  }
}
