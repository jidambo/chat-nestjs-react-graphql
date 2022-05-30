import React from 'react';
import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '../../common/interfaces/entities';

interface ChatHeaderComponentProps {
    user: User;
    onLogoutClick: () => void;
}

const ChatHeaderComponent: React.FC<ChatHeaderComponentProps> = ({
    user,
    onLogoutClick
}) => {
    return (
        <Box
            sx={{
                height: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0px 0px 9px 1px rgba(0,0,0,0.3)',
                px: 3,
                mb: 1
            }}
        >
            <Box>
                Chat app
            </Box>

            <Box sx={{gap: 3, display: 'flex', alignItems: 'center'}}>
                {user?.username}

                <LogoutIcon sx={{cursor: 'pointer'}} onClick={onLogoutClick}/>
            </Box>
        </Box>
    )
}

export default ChatHeaderComponent;
