import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isEmail, isNumber } from 'class-validator';
import { RoleCodeEnum } from 'src/common/constants/role.enum';
import { read, utils } from 'xlsx';
import { CompanyRepository } from '../companies/company.repository';
import { CreateEmployeeDto, FilterEmployeeDto, UpdateEmployeeDto } from './dto';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const { email, code, companyCode } = createEmployeeDto;
    const existEmployee = await this.employeeRepository.findOne({
      where: [{ code }, { email }],
      withDeleted: true,
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

    const employee = this.employeeRepository.create({ ...createEmployeeDto });

    return await employee.save();
  }

  async getAll(filterEmployeeDto: FilterEmployeeDto) {
    return await this.employeeRepository.getAll(filterEmployeeDto);
  }

  async get(code: string) {
    const existEmployee = await this.employeeRepository.findOne({
      where: { code },
    });

    if (!existEmployee) {
      throw new NotFoundException('Eployee not found');
    }

    return existEmployee;
  }

  async update(code: string, updateEmployeeDto: UpdateEmployeeDto) {
    const existEmployee = await this.employeeRepository.findOne({
      where: { code },
    });

    if (!existEmployee) {
      throw new NotFoundException('Employee not found');
    }

    await this.employeeRepository.update({ code }, { ...updateEmployeeDto });
  }

  async delete(code: string) {
    await this.employeeRepository.softDelete({ code });
  }

  async importEmployee(employeeCode: string, file: Express.Multer.File) {
    const existAdmin = await this.employeeRepository.findOne({
      where: { code: employeeCode, role: RoleCodeEnum.CLIENT_ADMIN },
    });

    if (!existAdmin) {
      throw new ForbiddenException('Unauthorization');
    }

    const workbook = read(file.buffer, { cellDates: true });
    const ws = workbook.Sheets.Sheet1;
    const data: any[] = utils.sheet_to_json(ws);
    const headerTemplate = ['code', 'email', 'name', 'salary'];
    const headerArray: any = utils.sheet_to_json(ws, { header: 1 });

    if (JSON.stringify(headerTemplate) !== JSON.stringify(headerArray[0])) {
      throw new BadRequestException('File header is not match');
    }

    for (const item of data) {
      if (!isEmail(item.email) || !isNumber(item.salary)) {
        continue;
      }

      const employee: Employee = {
        companyCode: existAdmin.companyCode,
        ...item,
      };

      await this.employeeRepository.upsertEmployee(employee);
    }
  }
}
