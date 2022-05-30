import React, { useCallback } from 'react';
import * as _ from 'lodash';
import { Box, TextField, Button } from '@mui/material';
import ChatCardComponent, {Chat} from './chat-card.component';

interface ChatListComponentProps {
    chats: Chat[],
    onCreateChat: (chatId: string) => void,
    onJoinChat: (chatId: string) => void
}

const ChatListComponent: React.FC<ChatListComponentProps> = ({
    chats,
    onCreateChat,
    onJoinChat
}) => {
    const handleAddChat = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const chatName = data.get('chatName') as string;
            onCreateChat(chatName);
            event.currentTarget.reset();
        },
        [onCreateChat]
    )

    return (
        <Box sx={{ mt: 3, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
            <Box
                component="form"
                onSubmit={handleAddChat}
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'primary.secondary',
                    borderRadius: 2,
                    width: 300
                }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="chatName"
                    label="Create chat"
                    type="text"
                    id="chatName"
                    placeholder="Enter chat name"
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Create new chat
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center'
                }}
            >
                {_.map(chats, (chat: Chat) => (
                    <ChatCardComponent key={chat.id} chat={chat} onCardClick={onJoinChat}/>
                ))}
            </Box>
        </Box>
    )
}

export default ChatListComponent;
