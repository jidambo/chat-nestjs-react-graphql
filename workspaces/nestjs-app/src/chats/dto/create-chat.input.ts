import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    readonly owner: string;
}
