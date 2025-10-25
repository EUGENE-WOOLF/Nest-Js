import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { after, before } from 'node:test';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('app e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
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
    await app.listen(0); // 0 = pick a random free port
    pactum.request.setBaseUrl(
      `http://localhost:${app.getHttpServer().address().port}`,
    );

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@example.com',
      password: 'strongPassword123',
      username: 'testuser',
      role: 'STUDENT',
    };
    describe('Signup', () => {
      it('user Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
      it('the user has not given the boddy', () => {
        return pactum.spec().post('/auth/login').withBody({}).expectStatus(400);
      });
    });
    describe('Login', () => {
      it('is the user able to login,', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('getCurrUser', () => {});
    describe('Edit User', () => {});
  });
  describe('Bookmark', () => {
    describe('Create Bookmark', () => {});
    describe('Get Bookmarks by Id', () => {});
    describe('Get All Bookmarks', () => {});
    describe('Edit Bookmark', () => {});
    describe('Delete Bookmark', () => {});
  });

  it.todo('completing the first test');
});
