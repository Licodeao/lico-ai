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

  @Get('gitee')
  @Redirect('/', 301)
  async getGiteeOAuth(@Query() query: OauthDto) {
    const { code } = query;
    const { GITEE_CLIENT_ID, GITEE_CLIENT_SECRET, GITEE_REDIRECT_URI } =
      process.env;

    const config = {
      method: 'POST',
      url: `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${GITEE_CLIENT_ID}&redirect_uri=${GITEE_REDIRECT_URI}&client_secret=${GITEE_CLIENT_SECRET}
      `,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const userConfig = {
      method: 'GET',
      url: 'https://gitee.com/api/v5/user?access_token',
      headers: {
        accept: 'application/json',
      },
    };

    axios.request(config).then((res) => {
      console.log(res.data);
      const { access_token } = res.data;
      axios
        .request({
          ...userConfig,
          url: `https://gitee.com/api/v5/user?access_token=${access_token}`,
        })
        .then((res) => {
          console.log(res.data);
        });
    });
  }
}
