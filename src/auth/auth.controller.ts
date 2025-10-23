import { Body, Controller, Get, Req, Post, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import type { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  login(@Body() dto: AuthDto) {
    console.log(dto);
    return 'Login Successful';
  }
}

//we don't use @Req for the parent library to keep it agnostic of the underlying platform (Express, Fastify, etc.)
//@Body() dto: AuthDto
//   @Body('email') email: string,
//     @Body('password', ParseIntPipe) password: string,
