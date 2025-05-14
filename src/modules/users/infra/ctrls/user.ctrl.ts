import { Controller, Post, Body } from '../../../../../deps.ts';

@Controller('/users')
export class UserController {
  @Post()
  create(@Body() body: { username: string }) {
    return { id: crypto.randomUUID(), username: body.username };
  }
}
