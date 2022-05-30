import { PubSub } from 'graphql-subscriptions';
import { Chat } from '../chats/entities/chats.entity';
import { Message } from '../message/entities/message.entity';

const pubSub = new PubSub();

export const CHAT_ADDED = 'chatAdded';
export const CHAT_UPDATED = 'chatUpdated';
export const MESSAGE_ADDED = 'messageAdded';

export const getAsyncIterator = (type: string) => {
    return pubSub.asyncIterator(type);
};

export const chatAdded = (chat: Chat) => {
    return pubSub.publish(CHAT_ADDED, {
        [CHAT_ADDED]: chat
    })
}

export const chatUpdated = (chat: Chat) => {
    return pubSub.publish(CHAT_UPDATED, {
        [CHAT_UPDATED]: chat
    })
}

export const messageAdded = (message: Message) => {
    return pubSub.publish(MESSAGE_ADDED, {
        [MESSAGE_ADDED]: message
    })
}
