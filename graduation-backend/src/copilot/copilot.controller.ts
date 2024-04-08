import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

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

    const response = await this.httpService.post(
      'https://aip.baidubce.com/oauth/2.0/token',
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

    response.subscribe(async (resp) => {
      const { access_token } = resp.data;
      console.log(
        '🚀 ~ CopilotController ~ response.subscribe ~ access_token:',
        access_token,
      );

      if (access_token) {
        const respon = await this.httpService.post(
          'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material',
          {
            source: {
              structs: [
                {
                  type: 'text',
                  text: '大婶大婶大婶大婶大婶大婶的',
                },
                {
                  type: 'image',
                  mediaSource: {
                    type: 3,
                    url: 'https://7gugu.com/wp-content/uploads/2024/03/IMG_0749-1200x1600.jpeg',
                  },
                },
                {
                  type: 'text',
                  text: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻',
                },
                {
                  type: 'image',
                  mediaSource: {
                    type: 3,
                    url: 'https://7gugu.com/wp-content/uploads/2024/03/IMG_0749-1200x1600.jpeg',
                  },
                },
              ],
            },
            config: {
              productType: 'video',
              duration: -1,
              resolution: [1280, 720],
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            params: { access_token },
          },
        );

        respon.subscribe(async (res) => {
          const { jobId } = res.data.data;
          console.log(
            '🚀 ~ CopilotController ~ respon.subscribe ~ jobId:',
            jobId,
            typeof jobId,
            String(jobId),
          );

          const changeJobId = String(jobId);

          if (jobId) {
            setTimeout(async () => {
              const responses = await this.httpService.post(
                'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/query',
                {
                  jobId: changeJobId,
                  includeTimeline: false,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  params: {
                    access_token,
                  },
                },
              );

              responses.subscribe((resp) => {
                // res.status(200).json({
                //   code: 200,
                //   ...resp.data,
                // });
                console.log(resp);
              });
            }, 5000);
          }
        });
      }
    });
  }
}
