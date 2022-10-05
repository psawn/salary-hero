import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageLimitDto } from 'src/common/dto/page-limit.dto';

export class FilterEmployeeDto extends PageLimitDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name',
    example: 'Company INC',
    required: false,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name',
    example: 'Company INC',
    required: false,
  })
  email: string;
}
