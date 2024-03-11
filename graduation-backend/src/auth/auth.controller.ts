import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OauthDto } from './dto/oatuh.dto';
import axios from 'axios';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @Redirect('/', 301)
  async getGithubOAuth(@Query() query: OauthDto) {
    const { code } = query;
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI } =
      process.env;
    console.log(code, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
    const config = {
      method: 'POST',
      url: `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&
      client_secret=${GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${GITHUB_REDIRECT_URI}`,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    return axios.request(config).then((res) => {
      console.log(res.data);
    });

    // return this.authService.validateAuth();
  }
}
