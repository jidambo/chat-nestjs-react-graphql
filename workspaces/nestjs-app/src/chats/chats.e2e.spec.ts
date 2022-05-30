import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import {Chat} from './entities/chats.entity';
import {CreateChatInput} from './dto/create-chat.input';

const gql = '/graphql';

describe('Chats e2e', () => {
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
        const chatDTO: CreateChatInput = {
            title: 'Test chat1',
            owner: 'test_user'
        };
        const res = await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'mutation CreateChat($owner: String!, $title: String!) { createChat( input: { owner: $owner, title: $title } ){ id, owner, title, participants{ userId } } }',
                variables: chatDTO
            })
            .expect(200);

        const createChatData: Chat = res.body.data.createChat;

        expect(createChatData.id).toBeDefined();
        expect(createChatData.owner).toEqual(chatDTO.owner);
        expect(createChatData.title).toEqual(chatDTO.title);
        expect(createChatData.participants).toBeDefined();
    });

    it('should return all chats', async () => {
        const firstChatDTO: CreateChatInput = {
            title: 'Test chat1',
            owner: 'test_user_1'
        };
        const secondChatDTO: CreateChatInput = {
            title: 'Test chat2',
            owner: 'test_user_2'
        };

        const firstChatRes = await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'mutation CreateChat($owner: String!, $title: String!) { createChat( input: { owner: $owner, title: $title } ){ id, owner, title, participants{ userId } } }',
                variables: firstChatDTO
            })
            .expect(200);
        const secondChatRes = await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'mutation CreateChat($owner: String!, $title: String!) { createChat( input: { owner: $owner, title: $title } ){ id, owner, title, participants{ userId } } }',
                variables: secondChatDTO
            })
            .expect(200);

        const firstChat = firstChatRes.body.data.createChat;
        const secondChat = secondChatRes.body.data.createChat;

        const chatsRes = await request(app.getHttpServer())
            .post(gql)
            .send({
                query:
                    'query GetChats { getChats{ id, title, owner, participants{ userId } } }'
            })
            .expect(200);

        const chats = chatsRes.body.data.getChats;

        expect(chats.length).toEqual(2);
        expect(chats).toContainEqual(firstChat);
        expect(chats).toContainEqual(secondChat);
    });
});
