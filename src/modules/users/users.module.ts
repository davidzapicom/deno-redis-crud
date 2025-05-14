import { Area } from 'alosaur';
import { UsersController } from './infra/ctrls/users.ctrl.ts';
import { UsersService } from './app/users.srv.ts';
import { RedisService } from '../../shared/infra/services/redis/redis.srv.ts';

const redisService = new RedisService();
await redisService.connect();

@Area({
  controllers: [UsersController],
  providers: [
    { token: UsersService, useClass: UsersService },
    { token: RedisService, useValue: redisService },
  ],
})
export class UserModule {}
