import {
  Body,
  Controller,
  Post,
  HttpCode,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @HttpCode(200)
  @Post('signin')
  async signin(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.signin(body);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true, // 🔐 set to true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    return { message: 'Login successful' };
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req: Request) {
    return this.authService.me(req);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token'); // Match your cookie name
    return { success: true };
  }
}
