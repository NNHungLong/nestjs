import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt')) // from 'src/auth/strategy/jwt.strategy.ts'
  @UseGuards(JwtGuard)
  @Get('getMe')
  getMe(@GetUser() user: User) {
    console.log('user', user);
    return user;
  }
}
