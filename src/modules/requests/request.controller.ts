import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dto';
import { RequestService } from './request.service';

@ApiTags('Requests')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create request successfully.',
  })
  @ApiOperation({ summary: 'Create request' })
  async createEmployee(
    @Body(ValidationPipe) createRequestDto: CreateRequestDto,
  ) {
    const request = await this.requestService.createRequest(createRequestDto);
    return { data: request };
  }
}
