import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Relationships {
    @Field()
    chatId: string;

    @Field()
    userId: string;
}
