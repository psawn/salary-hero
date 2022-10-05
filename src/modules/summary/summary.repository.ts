import { Injectable } from '@nestjs/common';
import { TypeORMRepository } from 'src/database/typeorm.repository';
import { EntityManager } from 'typeorm';
import { Summary } from './summary.entity';

@Injectable()
export class SummaryRepository extends TypeORMRepository<Summary> {
  constructor(manager: EntityManager) {
    super(Summary, manager);
  }
}
