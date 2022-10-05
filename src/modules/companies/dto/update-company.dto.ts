import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
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
