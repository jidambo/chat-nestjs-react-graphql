import { Test, TestingModule } from '@nestjs/testing';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { RelationshipsService } from '../relationships/relationships.service';
import { MessageService } from '../message/message.service';
import { CreateChatInput } from './dto/create-chat.input';

describe('ChatsResolver', () => {
  let resolver: ChatsResolver;
  let chatService: ChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsResolver,
        ChatsService,
        RelationshipsService,
        MessageService,
        {
          provide: ChatsService,
          useFactory: () => ({
            create: jest.fn((input: CreateChatInput) => ({
              ...input,
              id: '1234',
              createdAt: new Date('2022-05-15')
            })),
            findAll: jest.fn(() => ([
              {
                id: '1234',
                createdAt: new Date('2022-05-15'),
                title: 'Test chat1',
                owner: 'test_user'
              }
            ]))
          })
        }
      ],
    }).compile();

    resolver = module.get<ChatsResolver>(ChatsResolver);
    chatService = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all chats', async () => {
    const chats = await resolver.getChats();

    expect(chatService.findAll).toBeCalledWith();
    expect(chatService.findAll).toBeCalledTimes(1);
    expect(chats.length).toEqual(1);
    expect(chats).toContainEqual({
      id: '1234',
      createdAt: new Date('2022-05-15'),
      title: 'Test chat1',
      owner: 'test_user'
    })
  });

  it('should return created chat', async () => {
    const chatDTO: CreateChatInput = {
      title: 'Test chat1',
      owner: 'test_user'
    };
    const chat = await resolver.createChat(chatDTO);

    expect(chatService.create).toBeCalledWith(chatDTO);
    expect(chatService.create).toBeCalledTimes(1);
    expect(chat).toEqual({
      id: '1234',
      createdAt: new Date('2022-05-15'),
      title: 'Test chat1',
      owner: 'test_user'
    });
  });
});
