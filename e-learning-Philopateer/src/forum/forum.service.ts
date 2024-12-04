import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread } from './forum.schema';

@Injectable()
export class ForumService {
  constructor(@InjectModel(Thread.name) private threadModel: Model<Thread>) {}

  async createThread(title: string, content: string): Promise<Thread> {
    const newThread = new this.threadModel({ title, content, replies: [] });
    return newThread.save();
  }

  async getThreads(): Promise<Thread[]> {
    return this.threadModel.find().exec();
  }

  async addReply(threadId: string, reply: string): Promise<Thread> {
    return this.threadModel.findByIdAndUpdate(
      threadId,
      { $push: { replies: reply } },
      { new: true }
    );
  }
}
