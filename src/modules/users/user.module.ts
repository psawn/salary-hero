import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../companies/company.repository';
import { EmployeeRepository } from '../employees/employee.repository';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CompanyRepository,
    EmployeeRepository,
    UserRepository,
    UserService,
  ],
  exports: [],
})
export class UserModule {}
