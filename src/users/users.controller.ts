import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.UsersService.create(body);
  }

  @Get()
  findAll() {
    return this.UsersService.findAll();
  }
}
