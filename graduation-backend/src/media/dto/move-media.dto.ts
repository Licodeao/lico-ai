import { IsNotEmpty } from 'class-validator';

export class MoveMediaDto {
  @IsNotEmpty({ message: '分组名不能为空' })
  albumName: string;

  @IsNotEmpty({ message: '媒体资源名不能为空' })
  name: string;
}
