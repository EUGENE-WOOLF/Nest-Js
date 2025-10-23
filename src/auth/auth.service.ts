import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { first, last } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  //password hasing
  async signup(dto: AuthDto) {
    const hash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
        // store provided username in firstName field (or add a username field to your Prisma model)
        firstName: dto.username,
        lastName: 'firstPerson',
      },
    });

    return user;
  }
}
