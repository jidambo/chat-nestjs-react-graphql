import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipsService } from './relationships.service';
import { ChatsService } from '../chats/chats.service';
import { MessageService } from '../message/message.service';
import { Chat } from '../chats/entities/chats.entity';
import { Relationships } from './entities/relationships.entity';

describe('RelationshipsService', () => {
  let service: RelationshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationshipsService,
        ChatsService,
        MessageService,
        {
          provide: ChatsService,
          useFactory: () => ({
            create: (): Chat => ({
              owner: 'test_user',
              id: '1234',
              createdAt: new Date('2022-05-15'),
              participants: [],
              title: 'Test chat'
            }),
            findById: () => ({
              owner: 'test_user',
              id: '1234',
              createdAt: new Date('2022-05-15'),
              participants: [],
              title: 'Test chat'
            })
          })
        }
      ],
    }).compile();

    service = module.get<RelationshipsService>(RelationshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should join to chat', async () => {
    const relationshipDTO: Relationships = {
      chatId: '1234',
      userId: 'some_user'
    };
    await service.join(relationshipDTO);
  });

  it('should leave from chat', async () => {
    const relationshipDTO: Relationships = {
      chatId: '1234',
      userId: 'some_user'
    };
    await service.join(relationshipDTO);
    await service.leave(relationshipDTO);
  });

  it('should get relationships from chat', async () => {
    const chatId = '1234';
    const firstRelationshipDTO: Relationships = {
      chatId: '1234',
      userId: 'some_user'
    };
    const secondRelationshipDTO: Relationships = {
      chatId: '1234',
      userId: 'test_user'
    };
    const invalidChatRelationshipDTO: Relationships = {
      chatId: '4321',
      userId: 'some_user'
    }

    await service.join(firstRelationshipDTO);
    await service.join(secondRelationshipDTO);
    await service.join(invalidChatRelationshipDTO);

    const relationships = await service.getByChat(chatId);

    expect(relationships.length).toBe(2);
    expect(relationships).toContainEqual(firstRelationshipDTO);
    expect(relationships).toContainEqual(secondRelationshipDTO);
    expect(relationships).not.toContainEqual(invalidChatRelationshipDTO);
  });
});
