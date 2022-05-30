import { useState, useEffect } from 'react';
import {
    useGetMessageQuery,
    useCreateMessageMutation,
    useMessageAddedSubscription
} from '../graphql/generated/graphql';
import {useAppSelector} from '../store/store';

const useMessage = (chatId: string) => {
    const { user } = useAppSelector((state) => state.authentication);
    const [messages, setMessages] = useState<any>([]);
    const { data: messagesRes } = useGetMessageQuery({
        variables: {
            chatId
        },
        fetchPolicy: 'no-cache'
    });
    const [createMessage] = useCreateMessageMutation();
    const { data: addedMessage } = useMessageAddedSubscription({
        variables: {
            chatId,
            userId: user?.username || ''
        }
    });

    useEffect(() => {
        if (!messagesRes?.message) {
            return;
        }

        setMessages(messagesRes.message);
    }, [messagesRes]);

    useEffect(() => {
        if (!addedMessage?.messageAdded) {
            return;
        }

        setMessages([...messages, addedMessage.messageAdded]);
    }, [addedMessage])

    const onCreateMessage = (text: string) => {
        createMessage({
            variables: {
                chatId,
                userId: user?.username || '',
                text
            }
        });
    };

    return {
        messages,
        onCreateMessage
    }
}

export default useMessage;
