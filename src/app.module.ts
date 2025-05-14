import { Area } from '../deps.ts';
import { UserController } from './modules/users/infra/ctrls/user.ctrl.ts';

@Area({
  // baseRoute: '/api',
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
