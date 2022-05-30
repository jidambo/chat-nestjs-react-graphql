import { useState, useEffect, useCallback } from 'react';
import * as _ from 'lodash';
import {
    useGetChatsQuery,
    useCreateChatMutation,
    useJoinChatMutation,
    useLeaveChatMutation,
    useChatAddedSubscription,
    useChatUpdatedSubscription
} from '../graphql/generated/graphql';
import { useAppSelector } from '../store/store';

interface Participant {
    userId: string;
}

interface Chat {
    id: string;
    owner: string;
    title: string;
    participants: Participant[];
}

const useChat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const { data: chatsRes } = useGetChatsQuery();
    const { data: addedChat } = useChatAddedSubscription();
    const { data: updatedChat } = useChatUpdatedSubscription();
    const [createChat]  = useCreateChatMutation();
    const [joinChat]  = useJoinChatMutation();
    const [leaveChat]  = useLeaveChatMutation();
    const { user } = useAppSelector((state) => state.authentication);

    useEffect(() => {
        if (!chatsRes?.getChats) {
            return
        }

        setChats(chatsRes.getChats);
    }, [chatsRes]);

    useEffect(() => {
        if (!addedChat?.chatAdded) {
            return
        }

        setChats(_.uniqBy([...chats, addedChat.chatAdded], 'id'));
    }, [addedChat]);

    useEffect(() => {
        if (!updatedChat?.chatUpdated) {
            return
        }

        const nextChats = _.map(chats, (c) => c.id === updatedChat.chatUpdated.id ? updatedChat.chatUpdated : c);

        setChats(nextChats);
    }, [updatedChat]);

    const onCreateChat = useCallback(
        async (title: string) => {
            if (!title) {
                return;
            }

            const { data } = await createChat({
                variables: {
                    title,
                    owner: user?.username || ''
                }
            });

            if (!data?.createChat) {
                return;
            }

            setChats([...chats, data.createChat]);
        },
        [chats]
    );

    const onJoinChat = useCallback(
        async (chatId: string) => {
            if (!chatId) {
                return;
            }

            await joinChat({
                variables: {
                    chatId,
                    userId: user?.username || '',
                }
            })
        },
        []
    );

    const onLeaveChat = useCallback(
        async (chatId: string) => {
            if (!chatId) {
                return;
            }

            await leaveChat({
                variables: {
                    chatId,
                    userId: user?.username || '',
                }
            })
        },
        []
    );

    return {
        chats,
        onCreateChat,
        onJoinChat,
        onLeaveChat
    };
}

export default useChat;
