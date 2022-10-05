import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from '../employees/employee.repository';
import { SummaryRepository } from '../summary/summary.repository';
import { RequestController } from './request.controller';
import { RequestRepository } from './request.repository';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestModule])],
  controllers: [RequestController],
  providers: [
    SummaryRepository,
    EmployeeRepository,
    RequestRepository,
    RequestService,
  ],
  exports: [],
})
export class RequestModule {}
