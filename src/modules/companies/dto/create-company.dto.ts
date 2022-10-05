import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Code',
    example: 'COM001',
  })
  @Transform(({ value }) => value.toUpperCase())
  code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name',
    example: 'Company INC',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Address',
    example: 'Ha noi',
  })
  address: string;
}
