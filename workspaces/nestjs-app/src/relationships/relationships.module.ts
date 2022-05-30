import { Module, forwardRef } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { ChatsModule } from '../chats/chats.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
      MessageModule,
      forwardRef(() => ChatsModule)
  ],
  providers: [RelationshipsService],
  exports: [RelationshipsService]
})
export class RelationshipsModule {}
