import React, { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Box, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import authenticationActions from '../../store/reducers/authentication/authentication.actions';
import { User } from '../../common/interfaces/entities';

const LoginScreen = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, isAuthenticating } = useAppSelector((state) => state.authentication);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const credentials: User = {
                username: data.get('username') as string
            };

            dispatch(authenticationActions.signIn(credentials))
        },
        []
    );

    return user && isAuthenticated ? <Navigate to="/" replace /> : (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="text"
                        id="username"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isAuthenticating}
                        sx={{ mt: 2 }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginScreen;
