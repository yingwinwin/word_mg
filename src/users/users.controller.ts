import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ResponseDto } from '../common/dto/response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async create(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return new ResponseDto(new UserResponseDto(user));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    return new ResponseDto(users.map((u) => new UserResponseDto(u)));
  }
}
