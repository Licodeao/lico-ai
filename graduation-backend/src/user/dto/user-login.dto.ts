import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty({ message: '邮箱验证码不能为空' })
  @Length(6, 6, { message: '邮箱验证码长度为6位' })
  validateCode: string;
}
