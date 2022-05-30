import { ObjectType, ID, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Relationships } from '../../relationships/entities/relationships.entity';

@ObjectType()
export class Chat {
    @Field(() => ID)
    readonly id?: string;

    @Field()
    readonly title: string;

    @Field()
    readonly owner: string;

    @Field(() => GraphQLISODateTime)
    readonly createdAt: Date;

    @Field(() => [Relationships])
    participants?: Relationships[]
}
