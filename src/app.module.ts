import { Module } from '@nestjs/common';
import { AuthService } from './modules/providers/auth/auth.service';
import { AuthController } from './modules/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth.constant';
import { UserService } from './modules/providers/user/user.service';
import { UsersController } from './modules/controllers/user/user.controller';
import { TaskService } from './modules/providers/task/task.service';
import { TaskController } from './modules/controllers/task/task.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UserService, TaskService],
  controllers: [AuthController, UsersController, TaskController],
  exports: [AuthService],
})
export class AppModule {}
