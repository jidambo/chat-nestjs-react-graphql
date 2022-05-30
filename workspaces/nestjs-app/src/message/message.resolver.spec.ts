import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { ChatsService } from '../chats/chats.service';
import { RelationshipsService } from '../relationships/relationships.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { MessageType } from '../enums/message.enums';

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        MessageService,
        ChatsService,
        RelationshipsService,
        {
          provide: MessageService,
          useFactory: () => ({
            create: jest.fn((createMessageInput): CreateMessageInput => ({
              ...createMessageInput,
              createdAt: new Date('2022-05-15')
            })),
            findChatMessages: jest.fn((): Message[] => ([
              {
                chatId: '1234',
                userId: 'user1',
                text: 'hey from test1',
                createdAt: new Date('2022-05-15')
              },
              {
                chatId: '1234',
                userId: 'user2',
                text: 'hey from test2',
                createdAt: new Date('2022-05-16')
              }
            ]))
          }),
        }
      ]
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create new message', async () => {
    const messageDTO: CreateMessageInput = {
      userId: 'test_user',
      chatId: '1234',
      text: 'Some test message',
      type: MessageType.Message
    };

    const message = await resolver.createMessage(messageDTO);

    expect(messageService.create).toBeCalledWith(messageDTO);
    expect(messageService.create).toBeCalledTimes(1);


    expect(message).toEqual({
      userId: 'test_user',
      chatId: '1234',
      text: 'Some test message',
      type: MessageType.Message,
      createdAt: new Date('2022-05-15')
    });
  });

  it('should get chat messages', async () => {
    const chatId = '1234';
    const messages = await resolver.findChatMessages(chatId);

    expect(messageService.findChatMessages).toBeCalledWith(chatId);
    expect(messageService.findChatMessages).toBeCalledTimes(1);

    expect(messages.length).toBe(2);
    expect(messages).toContainEqual({
      chatId: '1234',
      userId: 'user1',
      text: 'hey from test1',
      createdAt: new Date('2022-05-15')
    });
    expect(messages).toContainEqual({
      chatId: '1234',
      userId: 'user2',
      text: 'hey from test2',
      createdAt: new Date('2022-05-16')
    });
  });

  it('', async () => {

  })
});
