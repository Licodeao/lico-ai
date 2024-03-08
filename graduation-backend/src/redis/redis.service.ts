import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getList(key: string) {
    return this.redisClient.lRange(key, 0, -1);
  }

  async setList(key: string, list: Array<string>, ttl?: number) {
    for (let i = 0; i < list.length; i++) {
      await this.redisClient.lPush(key, list[i]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
