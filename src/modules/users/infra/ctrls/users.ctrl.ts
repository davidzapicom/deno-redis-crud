import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Patch,
} from '../../../../../deps.ts';
import { UsersService } from '../../app/users.srv.ts';
import { ROUTES } from '../../../../constants.ts';
import { User } from '../../core/entities/user.ts';

@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private readonly srv: UsersService) {}

  @Post()
  create(@Body() body: { username: string }): Promise<User> {
    return this.srv.create(body.username);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.srv.findAll();
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: { username: string }
  ): Promise<User> {
    return this.srv.update(id, body.username);
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<User> {
    return this.srv.findById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.srv.delete(id);
  }
}
