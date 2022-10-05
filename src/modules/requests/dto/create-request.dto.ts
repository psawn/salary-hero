import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Employee code',
    example: 'TEST01',
  })
  employeeCode: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Amount',
    example: 1000,
  })
  amount: number;
}
