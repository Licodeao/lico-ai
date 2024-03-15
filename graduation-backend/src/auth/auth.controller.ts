import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { OauthDto } from './dto/oatuh.dto';
import { UserService } from 'src/user/user.service';

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
    private readonly userService: UserService,
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

      async function getGithubAccessToken(code: string) {
        try {
          const res = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
              client_id: GITHUB_CLIENT_ID,
              client_secret: GITHUB_CLIENT_SECRET,
              redirect_uri: GITHUB_REDIRECT_URI,
              code,
            },
            {
              headers: {
                Accept: 'application/json',
              },
            },
          );
          return res.data;
        } catch (e) {
          throw new Error(e);
        }
      }

      async function getGithubUserInfo(accessToken: string) {
        const res = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return res.data;
      }

      const GithubAccessToken = await getGithubAccessToken(code);
      const GithubUserInfo = await getGithubUserInfo(
        GithubAccessToken.access_token,
      );

      if (GithubUserInfo) {
        const { name, email } = GithubUserInfo;
        this.userService.create({
          username: name,
          email,
          type: 'github',
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('gitee')
  @Redirect('/', 301)
  async getGiteeOAuth(@Query() query: OauthDto) {
    const { code } = query;

    const GITEE_CLIENT_ID = this.configService.get<string>('GITEE_CLIENT_ID');
    const GITEE_CLIENT_SECRET = this.configService.get<string>(
      'GITEE_CLIENT_SECRET',
    );
    const GITEE_REDIRECT_URI =
      this.configService.get<string>('GITEE_REDIRECT_URI');

    async function getGiteeAccessToken(code: string) {
      try {
        const res = await axios.post(
          `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${GITEE_CLIENT_ID}&redirect_uri=${GITEE_REDIRECT_URI}&client_secret=${GITEE_CLIENT_SECRET}
        `,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          },
        );
        return res.data;
      } catch (e) {
        throw new Error(e);
      }
    }

    async function getGiteeUserInfo(accessToken: string) {
      try {
        const res = await axios.get(`https://gitee.com/api/v5/user`, {
          headers: {
            accept: 'application/json',
          },
          params: {
            access_token: accessToken,
          },
        });
        return res.data;
      } catch (e) {
        throw new Error(e);
      }
    }

    const GiteeAccessToken = await getGiteeAccessToken(code);

    const GiteeUserInfo = await getGiteeUserInfo(GiteeAccessToken.access_token);

    if (GiteeUserInfo) {
      const { name, email } = GiteeUserInfo;
      this.userService.create({
        username: name,
        email,
        type: 'gitee',
      });
    }
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
        throw new Error(e);
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

    if (!TwitterAccessToken) {
      return res.redirect('http://localhost:5173');
    }

    const TwitterUserInfo = await getTwitterUserInfo(
      TwitterAccessToken.access_token,
    );

    /**
     * note:
     *  Oauth2.0 API in Twitter doesn't provide user email. So, use 'null@twitter.com' instead.
     */
    if (TwitterUserInfo) {
      const { username } = TwitterUserInfo;
      this.userService.create({
        username,
        email: 'null@twitter.com',
        type: 'twitter',
      });
    }

    if (!TwitterUserInfo) {
      return res.redirect('http://localhost:5173');
    }
  }
}
