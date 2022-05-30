import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatsModule } from './chats/chats.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { MessageModule } from './message/message.module';
import { Context } from 'graphql-ws';
import { MESSAGE_ADDED } from './utils/pubSub.manager';
import { RelationshipsService } from './relationships/relationships.service';

interface ChatSubscription {
    chatId: string;
    userId: string;
}

interface ChatContext extends Context {
    extra: {
        req: {
            chatSubscription: ChatSubscription
        }
    }
}

@Module({
  imports: [
      ConfigModule.forRoot(),
      ChatsModule,
      RelationshipsModule,
      MessageModule,
      GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          inject: [RelationshipsService],
          imports: [RelationshipsModule],
          useFactory: (relationshipsService: RelationshipsService) => ({
              installSubscriptionHandlers: true,
              autoSchemaFile: 'schema.gql',
              subscriptions: {
                  "graphql-ws": {
                      onConnect: (context: ChatContext) => {
                          // validate user
                      },
                      onSubscribe: (ctx: ChatContext, msg) => {
                          const operationName = msg.payload.operationName

                          if (operationName === MESSAGE_ADDED) {
                              ctx.extra.req = {
                                  chatSubscription: {
                                      chatId: msg.payload.variables.chatId as string,
                                      userId: msg.payload.variables.userId as string
                                  }
                              }
                          }
                      },
                      onDisconnect: (ctx: ChatContext) => {
                          // Leave from chat on disconnect
                          if (ctx.extra.req?.chatSubscription) {
                              relationshipsService.leave(ctx.extra.req.chatSubscription);
                          }
                      }
                  },
              }
          })
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
