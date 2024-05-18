import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto, AuthCredentialsSignUpDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/modules/providers/auth/auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'email already exist' })
  signUp(
    @Body() AuthCredentialsSignUpDto: AuthCredentialsSignUpDto,
  ): Promise<{ id: string; data: any }> {
    return this.AuthService.register(AuthCredentialsSignUpDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
  })
  @ApiResponse({ status: 400, description: 'Password not correct, try again' })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ id: string; data: any }> {
    return this.AuthService.login(authCredentialsDto);
  }
}
