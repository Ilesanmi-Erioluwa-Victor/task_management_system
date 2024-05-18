import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/task.dto';
import { UpdateTaskDto } from 'src/dto/task.dto';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  @SubscribeMessage('createTask')
  async handleCreateTask(
    @MessageBody() createTaskDto: CreateTaskDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const task = await this.taskService.createTask(createTaskDto, client.id);
    this.server.emit('taskCreated', task);
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(
    @MessageBody() updateTaskDto: UpdateTaskDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const task = await this.taskService.updateTask(
      updateTaskDto.id,
      updateTaskDto,
    );
    this.server.emit('taskUpdated', task);
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const task = await this.taskService.deleteTask(id);
    this.server.emit('taskDeleted', task);
  }
}
