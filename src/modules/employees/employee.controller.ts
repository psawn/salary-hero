import { Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEmployeeDto, FilterEmployeeDto, UpdateEmployeeDto } from './dto';
import { EmployeeService } from './employee.service';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create employee successfully.',
  })
  @ApiOperation({ summary: 'Create employee' })
  async createEmployee(
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto,
  ) {
    const employee = await this.employeeService.createEmployee(
      createEmployeeDto,
    );
    return { data: employee.code };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get employees successfully.',
  })
  @ApiOperation({ summary: 'Get employees' })
  async getAll(@Query() filterEmployeeDto: FilterEmployeeDto) {
    const { items, pagination } = await this.employeeService.getAll(
      filterEmployeeDto,
    );
    return { data: items, pagination };
  }

  @Get('/:code')
  @ApiResponse({
    status: 200,
    description: 'Get employee successfully.',
  })
  @ApiOperation({ summary: 'Get employee' })
  async get(@Param('code') code: string) {
    const employee = await this.employeeService.get(code);
    return { data: employee };
  }

  @Patch('/:code')
  @ApiResponse({
    status: 200,
    description: 'Update employee successfully.',
  })
  @ApiOperation({ summary: 'Update employee' })
  async update(
    @Param('code') code: string,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    await this.employeeService.update(code, updateEmployeeDto);
    return { data: null };
  }

  @Delete('/:code')
  @ApiResponse({
    status: 200,
    description: 'Delete employee successfully.',
  })
  @ApiOperation({ summary: 'Soft delete employee' })
  async delete(@Param('code') code: string) {
    await this.employeeService.delete(code);
    return { data: null };
  }

  @Post('/:employeeCode/import-employee')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Import employee by excel' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 200,
    description: 'Import employee successfully.',
  })
  async importEmployee(
    @Param('employeeCode') employeeCode: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.employeeService.importEmployee(employeeCode, file);
    return { data: null };
  }
}
