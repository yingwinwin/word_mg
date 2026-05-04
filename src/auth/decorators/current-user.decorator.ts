import { createParamDecorator } from '@nestjs/common';
import { JwtUser } from '../types/user.type';

export const CurrentUser = createParamDecorator((data: keyof JwtUser, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
});
