import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import request from 'request';

@Controller('copilot')
export class CopilotController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  // @Get('access_token')
  // async getAuthAccessToken(@Res() res: Response) {
  //   const grant_type = await this.configService.get<string>('BAIDU_GRANT_TYPE');
  //   const client_id = await this.configService.get<string>('BAIDU_API_KEY');
  //   const client_secret =
  //     await this.configService.get<string>('BAIDU_SECRET_KEY');

  //   try {
  //     const url = 'https://aip.baidubce.com/oauth/2.0/token';
  //     const response = await this.httpService.post(
  //       url,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //         params: {
  //           grant_type,
  //           client_id,
  //           client_secret,
  //         },
  //       },
  //     );

  //     response.subscribe(
  //       async (resp: AxiosResponse<{ access_token: string }>) => {
  //         const { access_token } = resp.data;
  //         console.log(
  //           '🚀 ~ CopilotController ~ response.subscribe ~ access_token:',
  //           access_token,
  //         );

  //         await this.cacheManager.set('access_token', access_token);

  //         res.status(200).json({
  //           code: 200,
  //           message: '获取access_token成功',
  //         });
  //       },
  //     );
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // @Post('text2video')
  // async generateVideoFromText(@Body() body, @Res() res: Response) {
  //   try {
  //     const { structs, config } = body;
  //     const access_token = await this.cacheManager.get('access_token');
  //     console.log(
  //       '🚀 ~ CopilotController ~ generateVideoFromText ~ access_token:',
  //       access_token,
  //     );

  //     const url =
  //       'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material';

  //     const response = await this.httpService.post(
  //       url,
  //       {
  //         source: {
  //           structs,
  //         },
  //         config: {
  //           ...config,
  //         },
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //         params: { access_token },
  //       },
  //     );

  //     response.subscribe((resp) => {
  //       res.status(200).json({
  //         code: 200,
  //         ...resp.data,
  //       });
  //       console.log(resp);
  //     });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // @Post('video_finished')
  // async getFinishedVideo(@Body() body, @Res() res: Response) {
  //   try {
  //     const access_token = await this.cacheManager.get('access_token');
  //     console.log('🚀 ~ CopilotController ~ access_token:', access_token);
  //     const { jobId } = body;
  //     const url = 'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/query';

  //     const response = this.httpService.post(
  //       url,
  //       {
  //         jobId,
  //         includeTimeline: false,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //         params: {
  //           access_token,
  //         },
  //       },
  //     );

  //     response.subscribe((resp) => {
  //       res.status(200).json({
  //         code: 200,
  //         ...resp.data,
  //       });
  //     });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  @Get('all')
  async getVideo() {
    const grant_type = await this.configService.get<string>('BAIDU_GRANT_TYPE');
    const client_id = await this.configService.get<string>('BAIDU_API_KEY');
    const client_secret =
      await this.configService.get<string>('BAIDU_SECRET_KEY');

    function getAccessToken() {
      const options = {
        method: 'POST',
        url:
          'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
          client_id +
          '&client_secret=' +
          client_secret,
      };
      return new Promise(async (resolve, reject) => {
        await request(options, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(response.body).access_token);
          }
        });
      });
    }

    const options = {
      method: 'POST',
      url:
        'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/query?access_token=' +
        (await getAccessToken()),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jobId: '1777264568786052161',
        includeTimeline: false,
      }),
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }
}
