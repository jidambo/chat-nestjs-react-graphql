import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { messageAdded } from '../utils/pubSub.manager';

@Injectable()
export class MessageService {
  private readonly messages: Message[] = [];

  create(createMessageInput: CreateMessageInput) {
    const message: Message = {
      userId: createMessageInput.userId,
      chatId: createMessageInput.chatId,
      text: createMessageInput.text,
      type: createMessageInput.type,
      createdAt: new Date()
    };

    this.messages.push(message);
    messageAdded(message);

    return message;
  }

  findChatMessages(chatId: string) {
    return _.filter(this.messages, { chatId });
  }
}
