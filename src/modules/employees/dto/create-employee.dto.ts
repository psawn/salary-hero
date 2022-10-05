import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'test01@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name',
    example: 'Jones',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Code',
    example: 'TEST01',
  })
  @Transform(({ value }) => value.toUpperCase())
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Company code',
    example: 'COM001',
  })
  @Transform(({ value }) => value.toUpperCase())
  companyCode: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Salary',
    example: 1000,
  })
  salary: number;
}
