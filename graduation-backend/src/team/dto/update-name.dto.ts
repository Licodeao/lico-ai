import { IsNotEmpty } from 'class-validator';

export class UpdateNameDto {
  @IsNotEmpty({ message: '工作空间不能为空' })
  workspaceName: string;

  @IsNotEmpty({ message: '团队ID不能为空' })
  id: string;
}
