import { Controller, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { parse } from 'json-bigint';

@Controller('copilot')
export class CopilotController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post('text2video')
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
      console.log('🚀 ~ CopilotController ~ response.subscribe ~ resp:', resp);

      const { access_token } = parse(resp.data);
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
          console.log('🚀 ~ CopilotController ~ respon.subscribe ~ res:', res);
          const { jobId } = parse(res.data)['data'];
          console.log(
            '🚀 ~ CopilotController ~ respon.subscribe ~ jobId:',
            jobId,
          );

          if (jobId) {
            const responses = await this.httpService.post(
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
            );

            responses.subscribe((resp) => {
              // res.status(200).json({
              //   code: 200,
              //   ...resp.data,
              // });
              console.log(resp.data);
            });
          }
        });
      }
    });
  }
}
