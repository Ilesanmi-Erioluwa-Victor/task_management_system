import {
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/middlewares/authGuard';
import { TaskService } from 'src/modules/providers/task/task.service';
import { JwtPayload } from 'src/types/jwt';
import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/task.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description:
      'The task has been successfully created. Returned created data task',
  })
  async createTask(
    @Req() req: Request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const user = req.user as JwtPayload;
    return this.taskService.createTask(createTaskDto, user.id);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returned task data',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Tasks have been successfully retrieved.',
  })
  async getTasks(@Req() req: Request): Promise<Task[]> {
    const user = req.user as JwtPayload;
    return this.taskService.getTasks(user.id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
