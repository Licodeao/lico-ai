import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty({ message: '分组名不能为空' })
  name: string;
}
