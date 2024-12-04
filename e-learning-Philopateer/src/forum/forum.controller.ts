import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  createThread(@Body() body: { title: string; content: string }) {
    return this.forumService.createThread(body.title, body.content);
  }

  @Get()
  getThreads() {
    return this.forumService.getThreads();
  }

  @Post(':id/reply')
  addReply(@Param('id') id: string, @Body() body: { reply: string }) {
    return this.forumService.addReply(id, body.reply);
  }
}
