import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { Chat } from './entities/chats.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { MessageService } from '../message/message.service';
import { RelationshipsService } from '../relationships/relationships.service';
import { chatAdded } from '../utils/pubSub.manager';

@Injectable()
export class ChatsService {
    constructor(
        private readonly messageService: MessageService,
        @Inject(forwardRef(() => RelationshipsService))
        private readonly relationshipService: RelationshipsService
    ) {}

    private readonly chats: Chat[] = [];

    async findAll(): Promise<Chat[]> {
        const chats = []

        for (let c of this.chats) {
            const participants = await this.relationshipService.getByChat(c.id);
            chats.push({
                ...c,
                participants
            })
        }

        return chats;
    }

    async findById(chatId): Promise<Chat> {
        const chat = _.find(this.chats, {id: chatId});

        if (!chat) {
            return null;
        }

        const participants = await this.relationshipService.getByChat(chat.id);

        return {
            ...chat,
            participants
        }
    }

    async create(chatInput: CreateChatInput): Promise<Chat> {
        const chatItem: Chat = {
            id: uuidv4(),
            title: chatInput.title,
            owner: chatInput.owner,
            createdAt: new Date(),
        }

        this.chats.push(chatItem);
        chatItem.participants = [];
        await chatAdded(chatItem);

        return chatItem;
    }
}
