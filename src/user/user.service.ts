import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
    delete user.hash;
    return user;
  }
}
