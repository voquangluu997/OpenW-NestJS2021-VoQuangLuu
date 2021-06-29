import { TasksRespository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports : [TypeOrmModule.forFeature([TasksRespository])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
