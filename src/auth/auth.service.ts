import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  //password hasing
  async signup(dto: AuthDto) {
    const hash = await argon2.hash(dto.password);
    let user;

    try {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          // store provided username in firstName field (or add a username field to your Prisma model)
          firstName: dto.username,
          role: dto.role || 'STUDENT',
          lastName: 'firstPerson',
        },
        select: { id: true, email: true, firstName: true },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('User with this email already exists');
      }
      throw new Error('Error creating user');
    }

    return user;
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const pwMatches = await argon2.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new Error('Invalid password');
    }

    return this.signToken(user.id, user.email, user.role ?? 'STUDENT');
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email, role };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
    return { access_token: token };
  }
}
