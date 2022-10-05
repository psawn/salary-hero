import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmployeeRepository } from '../employees/employee.repository';
import { Summary } from '../summary/summary.entity';
import { SummaryRepository } from '../summary/summary.repository';
import { CreateRequestDto } from './dto';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly summaryRepository: SummaryRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createRequest(createRequestDto: CreateRequestDto) {
    const { employeeCode, amount } = createRequestDto;
    const current = new Date();

    const existEmployee = await this.employeeRepository.findOne({
      where: { code: employeeCode },
    });

    if (!existEmployee) {
      throw new NotFoundException('Employee not found');
    }

    if (amount > existEmployee.salary / 2) {
      throw new BadRequestException(
        'Amount not must be greater than 50% salary',
      );
    }

    const existSummary = await this.summaryRepository.findOne({
      where: {
        employeeCode,
        month: current.getUTCMonth() + 1,
        year: current.getUTCFullYear(),
      },
    });

    return await this.entityManager.transaction(async (transaction) => {
      if (!existSummary) {
        const summary = transaction.create(Summary, {
          employeeCode,
          companyCode: existEmployee.companyCode,
          currentAmount: amount,
          maxAmount: existEmployee.salary / 2,
          month: current.getUTCMonth() + 1,
          year: current.getUTCFullYear(),
        });

        await transaction.save(Summary, summary);
      } else {
        if (existSummary.currentAmount + amount > existSummary.maxAmount) {
          throw new BadRequestException(
            'Total amount not must be greater than 50% salary',
          );
        }

        existSummary.currentAmount = existSummary.currentAmount + amount;
        await transaction.save(Summary, existSummary);
      }

      const request = transaction.create(Request, {
        employeeCode: existEmployee.code,
        companyCode: existEmployee.companyCode,
        amount,
      });

      return await transaction.save(Request, request);
    });
  }
}
