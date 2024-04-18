import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { parse } from 'json-bigint';
import { Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';

@Controller('copilot')
export class CopilotController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('text2video')
  async getVideo(@Body() body) {
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
      console.log('🚀 ~ CopilotController ~ response.subscribe ~ resp:', resp);

      const { access_token } = parse(resp.data);
      await this.cacheManager.set('access_token', access_token);
      console.log(
        '🚀 ~ CopilotController ~ response.subscribe ~ access_token:',
        access_token,
      );

      if (access_token) {
        const { textList, imageList, digitalHumanId, ttsPer, resolution } =
          body;
        console.log(body);

        const resolutionChanged = resolution.split('x');

        const respon = await this.httpService.post(
          'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material',
          {
            source: {
              structs: [
                {
                  type: 'text',
                  text: textList,
                },
                {
                  type: 'image',
                  mediaSource: {
                    type: 3,
                    url: imageList,
                  },
                },
              ],
            },
            config: {
              productType: 'video',
              duration: -1,
              ttsPer,
              digitalHumanId,
              resolution: [resolutionChanged[0], resolutionChanged[1]],
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
          console.log('🚀 ~ CopilotController ~ respon.subscribe ~ res:', res);
          const { jobId } = parse(res.data)['data'];
          await this.cacheManager.set('jobId', jobId);
          console.log(
            '🚀 ~ CopilotController ~ respon.subscribe ~ jobId:',
            jobId,
          );

          if (jobId) {
            setTimeout(async () => {
              const { data } = await firstValueFrom(
                this.httpService.post(
                  'https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/query',
                  {
                    jobId,
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
                ),
              );
              console.log(data);
              await this.cacheManager.set('data', data, 200000);
            }, 120000);
          }
        });
      }
    });
  }

  @Get('query')
  async query() {
    const data = await this.cacheManager.get('data');

    if (data) {
      console.log('有数据');
      return {
        code: 200,
        data,
      };
    }
  }
}
