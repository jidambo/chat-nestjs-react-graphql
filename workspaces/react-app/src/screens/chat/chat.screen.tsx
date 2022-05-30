import React, { useState, useCallback, useEffect } from 'react';
import * as _ from 'lodash';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import authenticationActions from '../../store/reducers/authentication/authentication.actions';
import ChatHeaderComponent from '../../components/chat/chat-header.component';
import useChat from '../../hooks/useChat';
import { User } from '../../common/interfaces/entities';
import ChatListComponent from '../../components/chat/chat-list.component';
import ChatComponent from '../../components/chat/chat.component';
import { Chat } from '../../components/chat/chat-card.component';

const ChatScreen = () => {
    const [currentChatId, setCurrentChatId] = useState<string>('');
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authentication);

    const handleLogout = useCallback(() => {
        dispatch(authenticationActions.signOut());
    }, []);

    const { chats, onCreateChat, onJoinChat, onLeaveChat } = useChat();

    useEffect(() => {
        return () => {
            if (!currentChatId) {
                return;
            }

            onLeaveChat(currentChatId);
        }
    }, [currentChatId])

    useEffect(() => {
        const chat = _.find(chats, (c) => c.id === currentChatId);
        setCurrentChat(chat as Chat);
    }, [chats, currentChatId])

    const handleSetCurrentChat = useCallback(async (chatId: string) => {
        await onJoinChat(chatId);
        setCurrentChatId(chatId);
    }, [chats]);

    const handleClearCurrentChat = useCallback(() => {
        setCurrentChatId('');
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexFlow: 'column nowrap'
            }}
        >
            <ChatHeaderComponent user={user as User} onLogoutClick={handleLogout}/>

            {currentChat ?
                <ChatComponent
                    chat={currentChat}
                    onLeaveChat={handleClearCurrentChat}
                /> :
                <ChatListComponent
                    chats={chats}
                    onCreateChat={onCreateChat}
                    onJoinChat={handleSetCurrentChat}
                />
            }
        </Box>
    )
}

export default ChatScreen;
