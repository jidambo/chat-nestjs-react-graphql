import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  owner: Scalars['String'];
  participants: Array<Relationships>;
  title: Scalars['String'];
};

export type CreateChatInput = {
  owner: Scalars['String'];
  title: Scalars['String'];
};

export type CreateMessageInput = {
  chatId: Scalars['String'];
  text: Scalars['String'];
  type?: InputMaybe<Scalars['Float']>;
  userId: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  text: Scalars['String'];
  type?: Maybe<Scalars['Int']>;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** create a new chat */
  createChat: Chat;
  createMessage: Message;
  /** enter the chat */
  joinChat: Scalars['Boolean'];
  /** leave the chat */
  leaveChat: Scalars['Boolean'];
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationJoinChatArgs = {
  input: RelationshipsInput;
};


export type MutationLeaveChatArgs = {
  input: RelationshipsInput;
};

export type Query = {
  __typename?: 'Query';
  /** get all chats */
  getChats: Array<Chat>;
  message: Array<Message>;
};


export type QueryMessageArgs = {
  chatId: Scalars['String'];
};

export type Relationships = {
  __typename?: 'Relationships';
  chatId: Scalars['String'];
  userId: Scalars['String'];
};

export type RelationshipsInput = {
  chatId: Scalars['String'];
  userId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatAdded: Chat;
  chatUpdated: Chat;
  messageAdded: Message;
};


export type SubscriptionMessageAddedArgs = {
  chatId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateChatMutationVariables = Exact<{
  owner: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, owner: string, title: string, participants: Array<{ __typename?: 'Relationships', userId: string }> } };

export type CreateMessageMutationVariables = Exact<{
  text: Scalars['String'];
  chatId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', userId: string, chatId: string, text: string, type?: number | null, createdAt: any } };

export type JoinChatMutationVariables = Exact<{
  userId: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type JoinChatMutation = { __typename?: 'Mutation', joinChat: boolean };

export type LeaveChatMutationVariables = Exact<{
  userId: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type LeaveChatMutation = { __typename?: 'Mutation', leaveChat: boolean };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', getChats: Array<{ __typename?: 'Chat', id: string, title: string, owner: string, participants: Array<{ __typename?: 'Relationships', userId: string }> }> };

export type GetMessageQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type GetMessageQuery = { __typename?: 'Query', message: Array<{ __typename?: 'Message', chatId: string, userId: string, text: string, type?: number | null, createdAt: any }> };

export type ChatAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatAddedSubscription = { __typename?: 'Subscription', chatAdded: { __typename?: 'Chat', id: string, title: string, owner: string, participants: Array<{ __typename?: 'Relationships', userId: string }> } };

export type ChatUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatUpdatedSubscription = { __typename?: 'Subscription', chatUpdated: { __typename?: 'Chat', id: string, title: string, owner: string, participants: Array<{ __typename?: 'Relationships', userId: string }> } };

export type MessageAddedSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', userId: string, chatId: string, text: string, type?: number | null, createdAt: any } };


export const CreateChatDocument = gql`
    mutation CreateChat($owner: String!, $title: String!) {
  createChat(input: {owner: $owner, title: $title}) {
    id
    owner
    title
    participants {
      userId
    }
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      owner: // value for 'owner'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($text: String!, $chatId: String!, $userId: String!) {
  createMessage(
    createMessageInput: {text: $text, chatId: $chatId, userId: $userId, type: 0}
  ) {
    userId
    chatId
    text
    type
    createdAt
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const JoinChatDocument = gql`
    mutation JoinChat($userId: String!, $chatId: String!) {
  joinChat(input: {userId: $userId, chatId: $chatId})
}
    `;
export type JoinChatMutationFn = Apollo.MutationFunction<JoinChatMutation, JoinChatMutationVariables>;

/**
 * __useJoinChatMutation__
 *
 * To run a mutation, you first call `useJoinChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinChatMutation, { data, loading, error }] = useJoinChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useJoinChatMutation(baseOptions?: Apollo.MutationHookOptions<JoinChatMutation, JoinChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinChatMutation, JoinChatMutationVariables>(JoinChatDocument, options);
      }
export type JoinChatMutationHookResult = ReturnType<typeof useJoinChatMutation>;
export type JoinChatMutationResult = Apollo.MutationResult<JoinChatMutation>;
export type JoinChatMutationOptions = Apollo.BaseMutationOptions<JoinChatMutation, JoinChatMutationVariables>;
export const LeaveChatDocument = gql`
    mutation LeaveChat($userId: String!, $chatId: String!) {
  leaveChat(input: {userId: $userId, chatId: $chatId})
}
    `;
export type LeaveChatMutationFn = Apollo.MutationFunction<LeaveChatMutation, LeaveChatMutationVariables>;

/**
 * __useLeaveChatMutation__
 *
 * To run a mutation, you first call `useLeaveChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveChatMutation, { data, loading, error }] = useLeaveChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useLeaveChatMutation(baseOptions?: Apollo.MutationHookOptions<LeaveChatMutation, LeaveChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveChatMutation, LeaveChatMutationVariables>(LeaveChatDocument, options);
      }
export type LeaveChatMutationHookResult = ReturnType<typeof useLeaveChatMutation>;
export type LeaveChatMutationResult = Apollo.MutationResult<LeaveChatMutation>;
export type LeaveChatMutationOptions = Apollo.BaseMutationOptions<LeaveChatMutation, LeaveChatMutationVariables>;
export const GetChatsDocument = gql`
    query GetChats {
  getChats {
    id
    title
    owner
    participants {
      userId
    }
  }
}
    `;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetMessageDocument = gql`
    query GetMessage($chatId: String!) {
  message(chatId: $chatId) {
    chatId
    userId
    text
    type
    createdAt
  }
}
    `;

/**
 * __useGetMessageQuery__
 *
 * To run a query within a React component, call `useGetMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetMessageQuery(baseOptions: Apollo.QueryHookOptions<GetMessageQuery, GetMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessageQuery, GetMessageQueryVariables>(GetMessageDocument, options);
      }
export function useGetMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessageQuery, GetMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessageQuery, GetMessageQueryVariables>(GetMessageDocument, options);
        }
export type GetMessageQueryHookResult = ReturnType<typeof useGetMessageQuery>;
export type GetMessageLazyQueryHookResult = ReturnType<typeof useGetMessageLazyQuery>;
export type GetMessageQueryResult = Apollo.QueryResult<GetMessageQuery, GetMessageQueryVariables>;
export const ChatAddedDocument = gql`
    subscription chatAdded {
  chatAdded {
    id
    title
    owner
    participants {
      userId
    }
  }
}
    `;

/**
 * __useChatAddedSubscription__
 *
 * To run a query within a React component, call `useChatAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatAddedSubscription, ChatAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatAddedSubscription, ChatAddedSubscriptionVariables>(ChatAddedDocument, options);
      }
export type ChatAddedSubscriptionHookResult = ReturnType<typeof useChatAddedSubscription>;
export type ChatAddedSubscriptionResult = Apollo.SubscriptionResult<ChatAddedSubscription>;
export const ChatUpdatedDocument = gql`
    subscription chatUpdated {
  chatUpdated {
    id
    title
    owner
    participants {
      userId
    }
  }
}
    `;

/**
 * __useChatUpdatedSubscription__
 *
 * To run a query within a React component, call `useChatUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatUpdatedSubscription, ChatUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatUpdatedSubscription, ChatUpdatedSubscriptionVariables>(ChatUpdatedDocument, options);
      }
export type ChatUpdatedSubscriptionHookResult = ReturnType<typeof useChatUpdatedSubscription>;
export type ChatUpdatedSubscriptionResult = Apollo.SubscriptionResult<ChatUpdatedSubscription>;
export const MessageAddedDocument = gql`
    subscription messageAdded($chatId: String!, $userId: String!) {
  messageAdded(chatId: $chatId, userId: $userId) {
    userId
    chatId
    text
    type
    createdAt
  }
}
    `;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageAddedSubscription, MessageAddedSubscriptionVariables>(MessageAddedDocument, options);
      }
export type MessageAddedSubscriptionHookResult = ReturnType<typeof useMessageAddedSubscription>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;