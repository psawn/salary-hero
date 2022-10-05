import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'summaries' })
export class Summary extends AbstractEntity {
  @Column({ name: 'employee_code' })
  employeeCode: string;

  @Column({ name: 'company_code' })
  companyCode: string;

  @Column({ name: 'current_amount', type: 'float4' })
  currentAmount: number;

  @Column({ name: 'max_amount', type: 'float4' })
  maxAmount: number;

  @Column({ name: 'month', type: 'int2' })
  month: number;

  @Column({ name: 'year', type: 'int2' })
  year: number;
}
