import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { email, password } = data;

    // ✅ 1. 检查邮箱是否已存在
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('邮箱已被注册');
    }

    // ✅ 2. 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 3. 存入数据库
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
