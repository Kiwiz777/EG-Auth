import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpassword123@' })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'jhon' })
  @IsString()
  name: string;
}
