import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
    client.join(data.room);
    this.server.to(data.room).emit('notification', `${client.id} joined the room`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { room: string; message: string }, @ConnectedSocket() client: Socket) {
    this.server.to(data.room).emit('receiveMessage', {
      sender: client.id,
      message: data.message,
    });
  }
}
