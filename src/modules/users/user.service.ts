import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleCodeEnum } from 'src/common/constants/role.enum';
import { CompanyRepository } from '../companies/company.repository';
import { CreateEmployeeDto } from '../employees/dto';
import { EmployeeRepository } from '../employees/employee.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createAdmin(createEmployeeDto: CreateEmployeeDto) {
    const { code, email, companyCode } = createEmployeeDto;
    const existEmployee = await this.employeeRepository.findOne({
      where: [{ code }, { email }],
    });

    if (existEmployee) {
      throw new ConflictException('Employee already exists');
    }

    const existCompany = await this.companyRepository.findOne({
      where: { code: companyCode },
    });

    if (!existCompany) {
      throw new NotFoundException('Company not found');
    }

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      role: RoleCodeEnum.CLIENT_ADMIN,
    });

    return await employee.save();
  }
}
