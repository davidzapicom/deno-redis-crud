import { load } from 'dotenv';
import { connect, Redis } from '../../../../../deps.ts';

await load({ export: true, allowEmptyValues: true });

export class RedisService {
  private client!: Redis;

  async connect() {
    const redisUrl = Deno.env.get('REDIS_URL')!;
    if (!redisUrl) throw new Error('REDIS_URL not defined in env');
    const url = new URL(redisUrl);

    this.client = await connect({
      hostname: url.hostname,
      port: parseInt(url.port),
      password: url.password || undefined,
      username: url.username,
    });
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: object | []) {
    const redisTtl = Deno.env.get('REDIS_TTL');
    if (redisTtl) {
      await this.client.set(key, JSON.stringify(value), {
        ex: Number(redisTtl),
      });
    } else await this.client.set(key, JSON.stringify(value));
  }

  async del(key: string) {
    return Boolean(await this.client.del(key));
  }

  async keys(pattern: string) {
    return await this.client.keys(pattern);
  }
}
