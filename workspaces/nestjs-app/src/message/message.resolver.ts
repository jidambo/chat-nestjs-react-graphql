import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { getAsyncIterator, MESSAGE_ADDED } from '../utils/pubSub.manager';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'message' })
  findChatMessages(@Args('chatId') chatId: string) {
    return this.messageService.findChatMessages(chatId);
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageAdded.chatId === variables.chatId
  })
  messageAdded(@Args('chatId') chatId: string, @Args('userId') userId: string) {
    return getAsyncIterator(MESSAGE_ADDED);
  }
}
