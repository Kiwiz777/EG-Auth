import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('auth')
  @ApiCookieAuth('a_t')
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary:
      'Home. Takes Nothing. Request wouild already have the http-only cookie with the token we need to check.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns Welcome to the application.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Returns unauthorized, incase the authguard failed to validate token or finding it.',
  })
  Welcome(): string {
    return this.appService.Welcome();
  }
}
