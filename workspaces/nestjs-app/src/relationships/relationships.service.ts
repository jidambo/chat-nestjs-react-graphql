import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as _ from 'lodash';
import { MessageType } from '../enums/message.enums';
import { ChatsService } from '../chats/chats.service';
import { MessageService } from '../message/message.service';
import { Relationships } from './entities/relationships.entity';
import { chatUpdated } from '../utils/pubSub.manager';

@Injectable()
export class RelationshipsService {
    constructor(
        @Inject(forwardRef(() => ChatsService))
        private readonly chatService: ChatsService,
        private readonly messageService: MessageService
    ) {}

    private readonly relationships: Relationships[] = [];

    async join(input: Relationships) {
        const chat = await this.chatService.findById(input.chatId);
        if (!chat) {
            return;
        }

        const isAdded = await this.add(input);
        if (isAdded) {
            await this.messageService.create({
                chatId: chat.id,
                userId: chat.owner,
                type: MessageType.Notification,
                text: `${input.userId} joined`
            })
        }

        const participants = await this.getByChat(chat.id);
        await chatUpdated({
            ...chat,
            participants: participants
        })
    }

    async leave(input: Relationships) {
        const chat = await this.chatService.findById(input.chatId);
        if (!chat) {
            return;
        }

        const isRemoved = await this.remove(input);
        if (isRemoved) {
            await this.messageService.create({
                chatId: chat.id,
                userId: chat.owner,
                type: MessageType.Notification,
                text: `${input.userId} left`
            })
        }

        const participants = await this.getByChat(chat.id);
        await chatUpdated({
            ...chat,
            participants: participants
        })
    }

    async add(input: Relationships): Promise<Boolean> {
        const relationshipItem: Relationships = {
            userId: input.userId,
            chatId: input.chatId
        }
        const idx = _.findIndex(this.relationships, (r) =>
            r.chatId === relationshipItem.chatId &&
            r.userId === relationshipItem.userId
        );
        if (idx === -1) {
            this.relationships.push(relationshipItem);
        }

        return idx === -1;
    }

    async remove(input: Relationships): Promise<Boolean> {
        const idx = _.findIndex(this.relationships, (r) => r.chatId === input.chatId && r.userId === input.userId);
        if (idx > -1) {
            this.relationships.splice(idx, 1);
        }

        return idx > -1;
    }

    async getByChat(chatId): Promise<Relationships[]> {
        return _.filter(this.relationships, { chatId });
    }
}

