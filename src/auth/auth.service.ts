import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    // 1. 查用户
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    // 2. 校验密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('密码错误');
    }

    // 3. 生成 token
    const payload = { userId: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: number) {
    return this.usersService.findById(userId);
  }
}
