import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Message } from './entities/message.entity';
import { MessageType } from '../enums/message.enums';

const gql = '/graphql';

describe('Message e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = await module.createNestApplication().init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('should create new chat', async () => {
        const res = await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'mutation { createMessage( createMessageInput: { userId: "test_user", chatId: "test_chat_1", text: "some text", type: 0 } ) { userId, chatId, text, type, createdAt } }',
                variables: {

                }
            })
            .expect(200);

        const createMessageData: Message = res.body.data.createMessage;

        expect(createMessageData.userId).toEqual('test_user');
        expect(createMessageData.chatId).toEqual('test_chat_1');
        expect(createMessageData.text).toEqual('some text');
        expect(createMessageData.type).toEqual(MessageType.Message);
        expect(createMessageData.createdAt).toBeDefined();
    });

    it('should get chat messages', async () => {
        await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'mutation { createMessage( createMessageInput: { userId: "test_user", chatId: "test_chat_1", text: "some text", type: 0 } ) { userId, chatId, text, type, createdAt } }',
            })


        const res = await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'query { message( chatId: "test_chat_1" ) { chatId, userId, text, type, createdAt } }',
            });

        const messages: Message[] = res.body.data.message;

        expect(messages.length).toEqual(1);
        const message = messages[0];
        expect(message.userId).toEqual('test_user');
        expect(message.chatId).toEqual('test_chat_1');
        expect(message.text).toEqual('some text');
        expect(message.type).toEqual(MessageType.Message);
        expect(message.createdAt).toBeDefined();
    });
});
