import { Injectable } from '@nestjs/common';
import prisma from 'src/configurations/prisma-clients';
import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/task.dto';
import { NotFoundError } from 'src/errors/errors';

@Injectable()
export class TaskService {
  async createTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    return prisma.task.create({
      data: {
        ...createTaskDto,
        user: { connect: { id: userId } },
      },
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    const data = prisma.task.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundError('Task not found.');
    }
    return data;
  }

  async getTasks(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: { userId },
    });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const data = prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    if (!data) {
      throw new NotFoundError('Task not found.');
    }
    return data;
  }

  async deleteTask(id: string): Promise<Task> {
    const data = prisma.task.delete({
      where: { id },
    });
    if (!data) {
      throw new NotFoundError('Task not found.');
    }
    return data;
  }
}
