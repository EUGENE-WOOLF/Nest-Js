import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { after, before } from 'node:test';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('app e2e', () => {
  let app: INestApplication;
  let primsa: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    primsa = app.get(PrismaService);
    await primsa.cleanDb();
  });

  afterAll(async () => {
    await app.close();
  });

  it.todo('completing the first test');
});
