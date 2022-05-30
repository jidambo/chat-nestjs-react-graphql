import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageResolver, MessageService],
  exports: [MessageService]
})
export class MessageModule {}
