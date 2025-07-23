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
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create New User. Takes name, email, password as a JSON Body.',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns User "${newUser.name}" Created Successfully',
  })
  @ApiResponse({ status: 403, description: 'Returns User Already Exist' })
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @HttpCode(200)
  @Post('signin')
  @ApiOperation({
    summary: 'Login User. Takes email, password as a JSON Body.',
  })
  @ApiResponse({ status: 200, description: 'Returns Login successful' })
  @ApiResponse({ status: 401, description: 'Returns Invalid credentials' })
  async signin(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.signin(body);
    res.cookie(process.env.COOKIE_NAME || 'accesss_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 1440, // 1d
    });

    return { message: 'Login successful' };
  }

  @ApiCookieAuth('a_t')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('me')
  @ApiOperation({
    summary:
      'For User auth check. Takes Nothing. Request wouild already have the http-only cookie with the token we need to check.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns User data as JSON (id, email, name)',
  })
  @ApiResponse({
    status: 401,
    description: 'Returns No access token found, incase no token was sent.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Returns Invalid or expired token, incase token exist but jwt verify fails.',
  })
  async me(@Req() req: Request) {
    return this.authService.me(req);
  }

  @ApiCookieAuth('a_t')
  @HttpCode(200)
  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      'For User Logout. Takes Nothing. Request wouild already have the http-only cookie with the token we need to check. and the cookie will be removed by this request.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns success true after removing the cookie.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Returns unauthorized, incase the authguard failed to validate token or finding it.',
  })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.COOKIE_NAME || 'accesss_token');
    return { success: true };
  }
}
