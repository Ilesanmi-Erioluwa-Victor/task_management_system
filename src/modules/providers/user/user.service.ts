import { Injectable } from '@nestjs/common';
import prisma from 'src/configurations/prisma-clients';
import { NotFoundError } from 'src/errors/errors';
import { JwtPayload } from 'src/types/jwt';

@Injectable()
export class UserService {
  async profile(data: JwtPayload): Promise<any> {
    const user = data;
    if (!user) {
      throw new NotFoundError('No user found, try again');
    }
    return await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        password: false,
        username: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });
  }
}
