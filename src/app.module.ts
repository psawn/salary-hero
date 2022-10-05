import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { CompanyModule } from './modules/companies/company.module';
import { EmployeeModule } from './modules/employees/employee.module';
import { RequestModule } from './modules/requests/request.module';
import { UserModule } from './modules/users/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    DataBaseModule,
    SharedModule,
    UserModule,
    CompanyModule,
    EmployeeModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
