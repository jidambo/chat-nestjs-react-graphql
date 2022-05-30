import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  text: string;

  @Field()
  chatId: string;

  @Field()
  userId: string;

  @Field(() => Int, { nullable: true })
  type?: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date
}
