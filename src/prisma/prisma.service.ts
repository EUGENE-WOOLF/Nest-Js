import { Global, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://user:password@127.0.0.1:5431/lovingEyesDatabase?schema=public',
        },
      },
    });
  }
}

//max verstappen is going to win the 2025 world championship
