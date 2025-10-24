import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwtForSambhavi'))
  @Get('me')
  getUser(@Req() req: any) {
    return { message: 'hello user', user: req.user };
  }
}
