import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/signup
  @Post('signup')
  // signup(@Req() req: Request) { // bad pattern because we just want the body of the request, sometimes we would want to switch to another Request object instead of Express
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  // POST /auth/signin
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
