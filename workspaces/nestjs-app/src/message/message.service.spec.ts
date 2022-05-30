import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageType } from '../enums/message.enums';
import { CreateMessageInput } from './dto/create-message.input';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create message', async () => {
    const messageDTO: CreateMessageInput = {
      userId: 'test_user',
      chatId: '1234',
      text: 'Some test message',
      type: MessageType.Message
    };
    const message = await service.create(messageDTO);

    expect(message.chatId).toEqual(messageDTO.chatId);
    expect(message.userId).toEqual(messageDTO.userId);
    expect(message.text).toEqual(messageDTO.text);
    expect(message.type).toEqual(messageDTO.type);
    expect(message.createdAt).toBeDefined();
  });

  it('should find messages by chatId', async () => {
    const chatId = '1234';

    const firstMessageDTO: CreateMessageInput = {
      userId: 'test_user',
      chatId: '1234',
      text: 'Some test message',
      type: MessageType.Message
    };

    const secondMessageDTO: CreateMessageInput = {
      userId: 'test_user',
      chatId: '1234',
      text: 'Some test message',
      type: MessageType.Message
    };

    const wrongMessageDTO: CreateMessageInput = {
      userId: 'test_user',
      chatId: '4321',
      text: 'Some test message',
      type: MessageType.Message
    };

    const firstMessage = await service.create(firstMessageDTO);
    const secondMessage = await service.create(secondMessageDTO);
    const wrongMessage = await service.create(wrongMessageDTO);

    const messages = await service.findChatMessages(chatId);

    expect(messages.length).toEqual(2);
    expect(messages).toContainEqual(firstMessage);
    expect(messages).toContainEqual(secondMessage);
    expect(messages).not.toContainEqual(wrongMessage);
  });
});
