import { Injectable } from '@nestjs/common';
import { PaginationConstants } from 'src/common/constants/pagination.enum';
import { TypeORMRepository } from 'src/database/typeorm.repository';
import { EntityManager, ILike } from 'typeorm';
import { FilterEmployeeDto } from './dto';
import { Employee } from './employee.entity';
import { omit } from 'lodash';

@Injectable()
export class EmployeeRepository extends TypeORMRepository<Employee> {
  constructor(manager: EntityManager) {
    super(Employee, manager);
  }

  async getAll(filterEmployeeDto: FilterEmployeeDto) {
    const {
      page = PaginationConstants.DEFAULT_PAGE,
      limit = PaginationConstants.DEFAULT_LIMIT_ITEM,
      name,
      email,
    } = filterEmployeeDto;
    const offset = (page - 1) * limit;

    const query = this.createQueryBuilder('employee').take(limit).skip(offset);

    if (name) {
      query.andWhere({ name: ILike(`%${name}%`) });
    }

    if (email) {
      query.andWhere({ email: ILike(`%${email}%`) });
    }

    const [items, totalItems] = await query.getManyAndCount();

    return {
      items,
      pagination: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: +limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: +page,
      },
    };
  }

  async upsertEmployee(employee: Employee) {
    const { code, email } = employee;

    const existEmployee = await this.findOne({
      where: [{ code }, { email }],
    });

    if (!existEmployee) {
      return await this.save(employee);
    } else {
      return await this.update(
        { code: existEmployee.code },
        { ...omit(employee, ['code', 'email']) },
      );
    }
  }
}
