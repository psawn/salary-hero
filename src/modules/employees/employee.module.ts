import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../companies/company.repository';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeRepository, CompanyRepository, EmployeeService],
  exports: [],
})
export class EmployeeModule {}
