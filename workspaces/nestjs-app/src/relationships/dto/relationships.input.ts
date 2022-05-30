import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RelationshipsInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    chatId: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    userId: string;
}
