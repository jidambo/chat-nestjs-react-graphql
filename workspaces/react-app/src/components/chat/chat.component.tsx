import React, { useCallback, useRef, useEffect } from 'react';
import * as _ from 'lodash';
import { Box, TextField, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMessage from '../../hooks/useMessage';
import ChatMessageComponent from './chat-message.component';
import { Chat } from './chat-card.component';
import { useAppSelector } from '../../store/store';

interface ChatComponentProps {
    chat: Chat;
    onLeaveChat: () => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
    chat,
    onLeaveChat
}) => {
    const messageInputRef = useRef<HTMLInputElement>(null);
    const messageListBottomRef = useRef<HTMLElement>(null);
    const { messages, onCreateMessage } = useMessage(chat.id);
    const { user } = useAppSelector((state) => state.authentication);

    const handleSendMessage = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const message = data.get('message') as string;
            onCreateMessage(message);
            event.currentTarget.reset();
            messageInputRef.current?.focus();
        },
        []
    );

    useEffect(() => {
        messageListBottomRef.current?.scrollIntoView()
    }, [messages]);

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                maxHeight: 'calc(100vh - 40px)',
                backgroundColor: '#D9AFD9',
                backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)'

            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    pl: 5,
                    pr: 1,
                    minHeight: '30px'
                }}
            >
                <ArrowBackIcon
                    sx={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '30px',
                        height: '30px'
                    }}
                    onClick={onLeaveChat}
                />

                <Typography sx={{fontSize: '20px'}}>{chat.title}</Typography>
                <Typography
                    sx={{
                        alignSelf: 'flex-top'
                    }}
                >
                    Online: {chat?.participants.length}
                </Typography>
            </Box>


            <Box
                sx={{
                    flex: 1,
                    overflow: 'scroll',
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    alignItems: 'center'
                }}
            >
                {_.map(messages, (message, idx) => (
                    <ChatMessageComponent
                        key={idx}
                        message={message}
                        currentUserId={user?.username || null}
                    />
                ))}

                <Box ref={messageListBottomRef}/>
            </Box>


            <Box
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                    pt: 1,
                    width: '100%'
                }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="message"
                    label="Message"
                    type="textarea"
                    id="message"
                    placeholder="Enter message"
                    inputRef={messageInputRef}
                    size="small"
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 0 }}
                >
                    Send
                </Button>
            </Box>
        </Box>
    )
}

export default ChatComponent;
