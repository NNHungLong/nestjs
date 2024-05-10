import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard('jwt')) // from 'src/auth/strategy/jwt.strategy.ts'
  @Get('getMe')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('update')
  update(@GetUser('id') userId: number, @Body('data') dto: UpdateUserDto) {
    return this.userService.update(userId, dto);
  }
}
