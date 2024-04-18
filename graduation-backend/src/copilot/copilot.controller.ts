import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { parse } from 'json-bigint';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { CopilotService } from './copilot.service';

@Controller('copilot')
export class CopilotController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly copilotService: CopilotService,
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

  @Get('export')
  async export(@Query('url') url: string, @Query('email') email: string) {
    try {
      const response = await axios.get(url, { responseType: 'stream' });

      const fileStream = fs.createWriteStream(
        path.join(__dirname, '../../public/video/video.mp4'),
      );
      response.data.pipe(fileStream);

      await new Promise((resolve, reject) => {
        fileStream.on('finish', async () => {
          console.log(`File downloaded to '/public/video'`);

          await this.copilotService.reduceUserExportCount(email);
        });

        fileStream.on('error', (err) => {
          reject(err);
        });
      });
      return {
        code: 200,
        message: '导出成功!',
      };
    } catch (error) {
      throw error;
    }
  }
}
