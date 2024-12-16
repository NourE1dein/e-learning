import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './schemas/response.schema';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const response = new this.responseModel(createResponseDto);
    return response.save();
  }

  async findAll(): Promise<Response[]> {
    return this.responseModel.find().exec();
  }

  async findOne(id: string): Promise<Response> {
    const response = await this.responseModel.findById(id).exec();
    if (!response) throw new NotFoundException('Response not found');
    return response;
  }

  async update(
    id: string,
    updateResponseDto: UpdateResponseDto,
  ): Promise<Response> {
    const updated = await this.responseModel.findByIdAndUpdate(
      id,
      updateResponseDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Response not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.responseModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Response not found');
  }
}
