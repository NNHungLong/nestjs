import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          // url: config.get('DATABASE_URL'),
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
