import { Injectable } from '@nestjs/common';
import prisma from 'src/configurations/prisma-clients';
import { registerI } from '../../../types/register';
import { hashedPassword } from 'src/util/utils';
import { Response } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  AlreadyExistError,
  NotFoundError,
  BadRequestError,
} from 'src/errors/errors';

import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto, AuthCredentialsSignUpDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async register(user: AuthCredentialsSignUpDto): Promise<Response> {
    try {
      const existing_user = await prisma.user.findUnique({
        where: {
          email: user.email.toLowerCase(),
        },
      });

      if (existing_user) {
        throw new AlreadyExistError('Email already exists');
      }

      const newUser = await prisma.user.create({
        data: {
          email: user.email.toLowerCase(),
          password: await hashedPassword(user.password),
          username: user.username,
        },
      });
      return {
        id: '',
        data: {
          message: 'you have successfully created your account',
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(data: AuthCredentialsDto): Promise<Response> {
    const user = await prisma.user.findUnique({
      where: {
        email: data?.email?.toLowerCase(),
      },
    });

    if (!user) {
      throw new NotFoundError('No email found.. try again');
    }

    const isPasswordValid = await bcrypt.compare(data?.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError('Password not correct, try again');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      id: '',
      data: {
        token: await this.jwtService.signAsync(payload),
        id: user?.id,
      },
    };
  }
}
