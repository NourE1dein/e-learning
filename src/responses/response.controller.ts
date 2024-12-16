import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { Response } from './schemas/response.schema';

@Controller('responses')
export class ResponseController {
  constructor(private responseService: ResponseService) {}

  @Post()
  async create(
    @Body() createResponseDto: CreateResponseDto,
  ): Promise<Response> {
    return this.responseService.create(createResponseDto);
  }

  @Get()
  async findAll(): Promise<Response[]> {
    return this.responseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Response> {
    return this.responseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
  ): Promise<Response> {
    return this.responseService.update(id, updateResponseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.responseService.delete(id);
  }
}
