import { IsNotEmpty } from 'class-validator';

export class FindMediaDto {
  @IsNotEmpty({ message: '分组名不能为空' })
  albumName: string;
}
