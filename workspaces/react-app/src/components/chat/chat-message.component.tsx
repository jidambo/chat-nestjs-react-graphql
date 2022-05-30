import React from 'react';
import { Box, Typography } from '@mui/material';
import { MessageType } from '../../common/enums/message.enums';

interface Message {
    text: string;
    createdAt: Date;
    userId: string;
    type: number;
    chatId: string;
}

interface ChatMessageComponentProps {
    message: Message;
    currentUserId: string | null;
}

const ChatMessageComponent: React.FC<ChatMessageComponentProps> = ({
    message,
    currentUserId
}) => {
    if (message.type === MessageType.Notification) {
        return (
            <Typography
                sx={{
                    bgcolor: '#dddddd',
                    p: 1,
                    borderRadius: 1,
                    mb: '2px'
                }}
            >
                {message.text}
            </Typography>
        )
    }

    const messageDate = new Date(message.createdAt)

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column nowrap',
                alignSelf: message.userId === currentUserId ? 'flex-end' : 'flex-start',
                maxWidth: '60%',
                minWidth: '20%',
                borderRadius: 2,
                bgcolor: message.userId === currentUserId ? '#c9ffc3' : 'white',
                mb: '2px',
                p: 1
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>{message.userId}</Typography>
                <Typography>
                    {messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}
                </Typography>
            </Box>

            <Typography
                sx={{
                    wordBreak: 'break-all'
                }}
            >
                {message.text}
            </Typography>
        </Box>
    )
}

export default ChatMessageComponent;
