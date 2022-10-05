import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { FilterCompanyDto } from './dto/filter-company.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create company successfully.',
  })
  @ApiOperation({ summary: 'Create company' })
  async create(@Body(ValidationPipe) createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.create(createCompanyDto);
    return { data: company };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get companies successfully.',
  })
  @ApiOperation({ summary: 'Get companies' })
  async getAll(@Query() filterCompanyDto: FilterCompanyDto) {
    const { items, pagination } = await this.companyService.getAll(
      filterCompanyDto,
    );
    return { data: items, pagination };
  }

  @Get('/:code')
  @ApiResponse({
    status: 200,
    description: 'Get companies successfully.',
  })
  @ApiOperation({ summary: 'Get company' })
  async get(@Param('code') code: string) {
    const company = await this.companyService.get(code);
    return { data: company };
  }

  @Patch('/:code')
  @ApiResponse({
    status: 200,
    description: 'Update company successfully.',
  })
  @ApiOperation({ summary: 'Update company' })
  async update(
    @Param('code') code: string,
    @Body(ValidationPipe) updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.companyService.update(code, updateCompanyDto);
    return { data: null };
  }

  @Delete('/:code')
  @ApiResponse({
    status: 200,
    description: 'Update company successfully.',
  })
  @ApiOperation({ summary: 'Soft delete company' })
  async delete(@Param('code') code: string) {
    await this.companyService.delete(code);
    return { data: null };
  }
}
