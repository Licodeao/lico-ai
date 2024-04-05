import { IsNotEmpty } from 'class-validator';

export class AccessTokenDto {
  @IsNotEmpty({ message: 'grantType不能为空' })
  grant_type: string = 'client_credentials';

  @IsNotEmpty({ message: 'apiKey不能为空' })
  client_id: string;

  @IsNotEmpty({ message: 'secretKey不能为空' })
  client_secret: string;
}
