import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { TokenPayload } from './dto/token-payload.interface';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(body: SignupDto): Promise<string> {
    const user = await this.usersService.findByEmail(body.email);
    if (user) {
      throw new ForbiddenException('User already exists');
    }
    const hashedPassword: string = await bcrypt.hash(body.password, 10);
    const newUser = await this.usersService.create({
      ...body,
      password: hashedPassword,
    });
    return `User "${newUser.name}" Created Successfully`;
  }

  async signin(body: LoginDto) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: TokenPayload = {
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  private readonly cookieName = process.env.COOKIE_NAME || 'accesss_token';
  async me(req: Request) {
    const token = (req.cookies as Record<string, string> | undefined)?.[
      this.cookieName
    ];
    if (!token) {
      throw new UnauthorizedException('No access token found');
    }
    let payload: TokenPayload;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Invalid or expired token');
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
