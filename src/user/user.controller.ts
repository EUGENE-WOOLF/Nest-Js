import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { JwtGaurd } from 'src/auth/gaurd';
import type { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('user')
export class UserController {
  @UseGuards(JwtGaurd)
  @Get('me')
  getUser(@GetUser() user: User) {
    return { user };
  }
}
