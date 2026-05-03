export class UserResponseDto {
  id: number;
  email: string;

  constructor(user: { id: number; email: string }) {
    this.id = user.id;
    this.email = user.email;
  }
}
