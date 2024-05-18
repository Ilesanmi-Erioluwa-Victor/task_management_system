import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateTaskDto {
  @ApiProperty({ description: 'ID of the task' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional({ description: 'Title of the task' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Completion status of the task' })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class GetIdTaskDto {
  @ApiProperty({ description: 'ID of the task' })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeleteTaskDto {
  @ApiProperty({ description: 'ID of the task to be deleted' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
