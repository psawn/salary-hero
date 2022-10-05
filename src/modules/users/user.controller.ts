import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from '../employees/dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin')
  @ApiResponse({
    status: 200,
    description: 'Create admin successfully.',
  })
  @ApiOperation({ summary: 'Create client admin' })
  async createAdmin(
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto,
  ) {
    const admin = await this.userService.createAdmin(createEmployeeDto);
    return { data: admin.code };
  }
}
