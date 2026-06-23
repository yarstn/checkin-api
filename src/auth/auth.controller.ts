import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() body: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
    );
  }
  @Post('login')
login(
  @Body() body: {
    email: string;
    password: string;
  },
) {
  return this.authService.login(
    body.email,
    body.password,
  );
}
@UseGuards(JwtAuthGuard)
@Get('/me')
me(@Req() req: any) {
  return req.user;
}
@UseGuards(JwtAuthGuard)
@Get('qr-code')
getQrCode(
  @Req() req: any,
) {
  return this.authService.getQrCode(
    req.user.userId,
  );
}
}