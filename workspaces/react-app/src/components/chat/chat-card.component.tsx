import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';

export interface Chat {
    id: string;
    owner: string;
    title: string;
    participants: Participant[];
}

interface Participant {
    userId: string;
}

interface ChatCardComponentProps {
    chat: Chat,
    onCardClick: (id: string) => void
}

const ChatCardComponent: React.FC<ChatCardComponentProps> = ({
    chat,
    onCardClick
}) => {
    const handleClick = useCallback(
        () => {
            onCardClick(chat.id);
        },
        [chat]
    );

    return (
        <Box
            sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                mt: 1,
                mr: 1,
                width: 230,
                cursor: 'pointer',
                transition: 'background-color .2s ease-in',

                '&:hover': {
                    bgcolor: 'primary.main'
                }
            }}
            onClick={handleClick}
        >
            <Typography
                sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}
            >
                {chat.title}
            </Typography>
            <Typography>Users: {chat.participants.length}</Typography>
        </Box>
    )
}

export default ChatCardComponent;

