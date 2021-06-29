import { TasksRespository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRespository)
    private tasksRespository: TasksRespository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRespository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRespository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRespository.CreateTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRespository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRespository.save(task);
    return task;
  }
}
