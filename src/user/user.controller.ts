import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwtForSambhavi'))
  @Get('me')
  getUser() {
    return { message: 'hello user' };
  }
}
