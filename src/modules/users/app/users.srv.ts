import { Injectable } from '../../../../deps.ts';
import { RedisService } from '../../../shared/infra/services/redis/redis.srv.ts';
import { User } from '../core/entities/user.ts';

@Injectable()
export class UsersService {
  private readonly USER_PREFIX = 'user:';
  constructor(private readonly redis: RedisService) {}

  async create(username: string): Promise<User> {
    const id = crypto.randomUUID();
    const user: User = { id, username };
    await this.redis.set(`${this.USER_PREFIX}${id}`, user);
    return user;
  }

  async update(id: string, username: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');
    user.username = username;
    await this.redis.set(`${this.USER_PREFIX}${id}`, user);
    return user;
  }

  async findAll(): Promise<User[]> {
    const keys: string[] = await this.redis.keys(`${this.USER_PREFIX}*`);
    return await Promise.all(keys.map((key) => this.redis.get(key)));
  }

  async findById(id: string): Promise<User> {
    return await this.redis.get(`${this.USER_PREFIX}${id}`);
  }

  async delete(id: string): Promise<boolean> {
    return await this.redis.del(`${this.USER_PREFIX}${id}`);
  }
}
