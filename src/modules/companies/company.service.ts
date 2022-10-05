import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { FilterCompanyDto } from './dto/filter-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const existCompany = await this.companyRepository.findOne({
      where: { code: createCompanyDto.code },
      withDeleted: true,
    });

    if (existCompany) {
      throw new ConflictException('Company already exist');
    }

    const company = this.companyRepository.create({
      ...createCompanyDto,
    });

    return await company.save();
  }

  async getAll(filterCompanyDto: FilterCompanyDto) {
    return await this.companyRepository.getAll(filterCompanyDto);
  }

  async get(code: string) {
    const existCompany = await this.companyRepository.findOne({
      where: { code },
    });

    if (!existCompany) {
      throw new NotFoundException('Company not found');
    }

    return existCompany;
  }

  async update(code: string, updateCompanyDto: UpdateCompanyDto) {
    const existCompany = await this.companyRepository.findOne({
      where: { code },
    });

    if (!existCompany) {
      throw new NotFoundException('Company not found');
    }

    await this.companyRepository.update({ code }, { ...updateCompanyDto });
  }

  async delete(code: string) {
    await this.companyRepository.softDelete({ code });
  }
}
