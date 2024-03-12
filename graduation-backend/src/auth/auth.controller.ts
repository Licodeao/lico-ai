import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { OauthDto } from './dto/oatuh.dto';

type TwitterTokenResponse = {
  token_type: 'bearer';
  expires_in: 7200;
  access_token: string;
  scope: string;
};

interface TwiterUser {
  id: string;
  name: string;
  username: string;
}
@Controller('oauth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @Redirect('/', 301)
  async getGithubOAuth(@Query() query: OauthDto) {
    try {
      const { code } = query;
      const GITHUB_CLIENT_ID =
        this.configService.get<string>('GITHUB_CLIENT_ID');
      const GITHUB_CLIENT_SECRET = this.configService.get<string>(
        'GITHUB_CLIENT_SECRET',
      );
      const GITHUB_REDIRECT_URI = this.configService.get<string>(
        'GITHUB_REDIRECT_URI',
      );
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
        console.log(res);
      });
    } catch (e) {
      console.log('🚀 ~ AuthController ~ getGithubOAuth ~ e:', e);
    }

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

  @Get('twitter')
  @Redirect('/', 301)
  async getTwitterOAuth(@Query() query: OauthDto, @Res() res: Response) {
    const { code } = query;
    const TWITTER_CLIENT_ID =
      this.configService.get<string>('TWITTER_CLIENT_ID');
    const TWITTER_CLIENT_SECRET = this.configService.get<string>(
      'TWITTER_CLIENT_SECRET',
    );
    const TWITTER_REDIRECT_URI = this.configService.get<string>(
      'TWITTER_REDIRECT_URI',
    );
    console.log('🚀 ~ TWITTER_CLIENT_SECRET:', TWITTER_CLIENT_SECRET);
    console.log('🚀 ~ TWITTER_CLIENT_ID:', TWITTER_CLIENT_ID);

    const config = {
      client_id: `${TWITTER_CLIENT_ID}`,
      code_verifier: '8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA',
      redirect_uri: TWITTER_REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    const basicAuthToken = Buffer.from(
      `${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64');
    console.log('🚀 ~ basicAuthToken:', basicAuthToken);

    async function getTwitterOAuthToken(code: string) {
      try {
        const res = await axios.post<TwitterTokenResponse>(
          'https://api.twitter.com/2/oauth2/token',
          new URLSearchParams({ ...config, code }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${basicAuthToken}`,
            },
          },
        );
        return res.data;
      } catch (e) {
        // throw new Error(e);
        console.log(e);
      }
    }

    async function getTwitterUserInfo(
      accessToken: string,
    ): Promise<TwiterUser | null> {
      try {
        const res = await axios.get<{ data: TwiterUser }>(
          'https://api.twitter.com/2/users/me',
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        {
          return res.data.data ?? null;
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    const TwitterAccessToken = await getTwitterOAuthToken(code);
    console.log(
      '🚀 ~ AuthController ~ getTwitterOAuth ~ TwitterAccessToken:',
      TwitterAccessToken,
    );

    if (!TwitterAccessToken) {
      return res.redirect('http://localhost:5173');
    }

    const TwitterUserInfo = await getTwitterUserInfo(
      TwitterAccessToken.access_token,
    );
    console.log(
      '🚀 ~ AuthController ~ getTwitterOAuth ~ TwitterUserInfo:',
      TwitterUserInfo,
    );

    if (!TwitterUserInfo) {
      return res.redirect('http://localhost:5173');
    }
  }
}
