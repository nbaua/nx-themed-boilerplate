import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AuthService) {}

  @Post()
  login(@Body('username') username, @Body('password') password) {
    return this.appService.login(username, password);
  }

  @Post()
  register(
    @Body('username') username,
    @Body('password') password,
    @Body('email') email
  ) {
    return this.appService.register(username, password, email);
  }
}
