import { Inject, forwardRef } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chats.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { getAsyncIterator, CHAT_ADDED, CHAT_UPDATED } from '../utils/pubSub.manager';
import { RelationshipsService } from '../relationships/relationships.service';
import { RelationshipsInput } from '../relationships/dto/relationships.input';


@Resolver(() => Chat)
export class ChatsResolver {
    constructor(
        private readonly chatService: ChatsService,
        @Inject(forwardRef(() => RelationshipsService))
        private readonly relationshipsService: RelationshipsService
    ) {}

    @Query(() => [Chat], { description: 'get all chats' })
    async getChats(): Promise<Chat[]> {
        return this.chatService.findAll();
    }

    @Mutation(() => Chat, { description: 'create a new chat' })
    async createChat(
        @Args('input') createChatInput: CreateChatInput
    ): Promise<Chat> {
        return await this.chatService.create(createChatInput);
    }

    @Mutation(() => Boolean, { description: 'enter the chat' })
    async joinChat(
        @Args('input') joinChatInput: RelationshipsInput
    ): Promise<Boolean> {
        await this.relationshipsService.join(joinChatInput);
        return true;
    }

    @Mutation(() => Boolean, { description: 'leave the chat' })
    async leaveChat(
        @Args('input') leaveChatInput: RelationshipsInput
    ): Promise<Boolean> {
        await this.relationshipsService.leave(leaveChatInput);
        return true;
    }

    @Subscription(() => Chat)
    async chatAdded() {
        return getAsyncIterator(CHAT_ADDED);
    }

    @Subscription(() => Chat)
    async chatUpdated() {
        return getAsyncIterator(CHAT_UPDATED);
    }
}
