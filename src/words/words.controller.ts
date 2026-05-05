import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateWordDto } from './dto/create-word.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
@UseGuards(JwtAuthGuard)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  create(@CurrentUser('userId') userId: number, @Body() dto: CreateWordDto) {
    return this.wordsService.create(userId, dto);
  }

  @Get()
  findAll(@CurrentUser('userId') userId: number) {
    return this.wordsService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @CurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.wordsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWordDto,
  ) {
    return this.wordsService.update(userId, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.wordsService.remove(userId, id);
  }
  @Get('review/today')
  getToday(@CurrentUser('userId') userId: number) {
    return this.wordsService.getTodayReview(userId);
  }

  @Post(':id/review')
  review(
    @CurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.wordsService.review(userId, id);
  }
}
