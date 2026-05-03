import { Request } from 'express';
import { JwtUser } from './user.type';

export interface RequestWithUser extends Request {
  user: JwtUser;
}
