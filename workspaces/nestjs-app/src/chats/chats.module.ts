import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { MessageModule } from '../message/message.module';
import { RelationshipsModule } from '../relationships/relationships.module';

@Module({
  imports: [
      MessageModule,
      forwardRef(() => RelationshipsModule)
  ],
  providers: [ChatsService, ChatsResolver],
  exports: [ChatsService]
})
export class ChatsModule {}
