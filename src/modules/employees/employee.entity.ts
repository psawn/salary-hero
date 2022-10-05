import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { RoleCodeEnum } from 'src/common/constants/role.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee extends AbstractEntity {
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'role', default: RoleCodeEnum.EMPLOYEE })
  role: string;

  @Column({ name: 'company_code' })
  companyCode: string;

  @Column({ name: 'password', nullable: true, select: false })
  password: string;

  @Column({ name: 'salary', type: 'float4', default: 0 })
  salary: number;
}
