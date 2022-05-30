import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  text: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  chatId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsOptional()
  @Field({ nullable: true })
  type?: number;
}
