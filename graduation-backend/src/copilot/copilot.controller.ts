import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AccessTokenDto } from './dto/access-token.dto';
import { Response } from 'express';
import { AxiosResponse } from 'axios';
import { Text2VideoDto } from './dto/text2video.dto';

@Controller('copilot')
export class CopilotController {
  constructor(private readonly httpService: HttpService) {}

  @Post('access_token')
  async getAuthAccessToken(
    @Query() query: AccessTokenDto,
    @Res() res: Response,
  ) {
    const { grant_type, client_id, client_secret } = query;

    try {
      const url = 'https://aip.baidubce.com/oauth/2.0/token';
      const response = await this.httpService.post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          params: {
            grant_type,
            client_id,
            client_secret,
          },
        },
      );

      response.subscribe((resp: AxiosResponse<{ access_token: string }>) => {
        const { access_token } = resp.data;

        res.status(200).json({
          code: 200,
          access_token,
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('text2video')
  async generateVideoFromText(
    @Body() body,
    @Query() query: Text2VideoDto,
    @Res() res: Response,
  ) {
    try {
      const { structs, config } = body;
      const { access_token } = query;

      const url =
        'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material';

      const response = await this.httpService.post(
        url,
        {
          source: {
            structs,
            config: {
              ...config,
            },
          },
          config: {
            ...config,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { access_token },
        },
      );

      response.subscribe((resp) => {
        res.status(200).json({
          code: 200,
          ...resp.data,
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('video_finished')
  async getFinishedVideo(
    @Body() body,
    @Query() query: Text2VideoDto,
    @Res() res: Response,
  ) {
    try {
      const { access_token } = query;
      const { jobId } = body;
      const url = 'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/query';

      const response = this.httpService.post(
        url,
        {
          jobId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            access_token,
          },
        },
      );

      response.subscribe((resp) => {
        res.status(200).json({
          code: 200,
          ...resp.data,
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
