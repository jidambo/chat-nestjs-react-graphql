import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { MessageService } from '../message/message.service';
import { RelationshipsService } from '../relationships/relationships.service';
import { CreateChatInput } from './dto/create-chat.input';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatsService, MessageService, RelationshipsService],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new chat', async () => {
    const chatDTO: CreateChatInput = {
      title: 'Test chat1',
      owner: 'test_user'
    };

    const response = await service.create(chatDTO);

    expect(response.id).toBeDefined();
    expect(response.title).toEqual(chatDTO.title);
    expect(response.owner).toEqual(chatDTO.owner);
    expect(response.createdAt).toBeDefined();
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

    const firstChat = await service.create(firstChatDTO);
    const secondChat = await service.create(secondChatDTO);
    const chats = await service.findAll();

    expect(chats.length).toEqual(2);
    expect(chats).toContainEqual(firstChat);
    expect(chats).toContainEqual(secondChat);
  });

  it('should return chat by id', async () => {
    const chatDTO: CreateChatInput = {
      title: 'Test chat1',
      owner: 'test_user'
    };

    const response = await service.create(chatDTO);
    const chat = await service.findById(response.id);

    expect(chat.id).toEqual(response.id);
    expect(chat.title).toEqual(chatDTO.title);
    expect(chat.owner).toEqual(chatDTO.owner);
  });
});
