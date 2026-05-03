export class ResponseDto<T> {
  code: number;
  message: string;
  data: T;

  constructor(data: T, message = 'success', code = 0) {
    this.data = data;
    this.message = message;
    this.code = code;
  }
}
