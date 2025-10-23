import { Body, Controller, Get, Req, Post, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    console.log(user);
  }
}

//we don't use @Req for the parent library to keep it agnostic of the underlying platform (Express, Fastify, etc.)
//@Body() dto: AuthDto
//   @Body('email') email: string,
//     @Body('password', ParseIntPipe) password: string,
