import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  // let access_token: string;
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
    await app.listen(3334);
    prisma = await app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3334');
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    const dto = {
      email: 'vlad@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('Should sign up', () => {
        return (
          pactum
            .spec()
            // .post('http://localhost:3334/auth/signup')
            .post('/auth/signup')
            .withBody(dto)
            .expectStatus(201)
        );
      });
    });
    describe('Signin', () => {
      it('Should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
      it('Should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            ...dto,
            email: '',
          })
          .expectStatus(400);
      });
      it('Should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            ...dto,
            password: '',
          })
          .expectStatus(400);
      });
      it('Should throw if body is not provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
  });
  describe('User', () => {
    describe('Get Me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/getMe')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      const dto = { firstName: 'Edna', lastName: 'Mode' };
      it('Should update current user', () => {
        return pactum
          .spec()
          .patch('/users/update')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            data: dto,
          })
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });
  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {
      it.todo('Should Create Bookmark');
    });
    describe('Get Bookmark', () => {
      it.todo('Should Create Bookmark');
    });
    describe('Get Bookmark by Id', () => {
      it.todo('Should Create Bookmark');
    });
    describe('Edit Bookmark by Id', () => {
      it.todo('Should Create Bookmark');
    });
    describe('Delete Bookmark by Id', () => {
      it.todo('Should Create Bookmark');
    });
  });
});
