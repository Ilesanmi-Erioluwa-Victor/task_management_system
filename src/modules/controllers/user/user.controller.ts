import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../../providers/user/user.service';
import { Request } from 'express';
import { AuthGuard } from 'src/middlewares/authGuard';
import { JwtPayload } from 'src/types/jwt';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'user profile' })
  @ApiResponse({
    status: 201,
    description:
      'The user profile has been successfully retrieved. Returned user data',
  })
  async getProfile(@Req() req: Request): Promise<any> {
    return this.userService.profile(req.user as JwtPayload);
  }
}
