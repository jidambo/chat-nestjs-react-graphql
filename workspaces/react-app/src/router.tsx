import React, { lazy, Suspense, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import PageLoaderComponent from './components/loaders/page-loader.component';
import { useAppDispatch, useAppSelector } from './store/store';
import authenticationActions from './store/reducers/authentication/authentication.actions';

const LoginScreen = lazy(() => import('./screens/login/login.screen'));
const ChatScreen = lazy(() => import('./screens/chat/chat.screen'));

const Router = () => {
    return (
        <Suspense fallback={<PageLoaderComponent/>}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <ChatScreen/>
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<LoginScreen/>}/>
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector((state) => state.authentication);

    const authUser = useCallback(
        async () => {
            const { payload: profile } = await dispatch(authenticationActions.authUser());
            if (!profile) {
                navigate('/login');
            }
        },
        []
    );

    useEffect(() => {
        if (!isAuthenticated) {
            authUser();
        }
    }, [isAuthenticated]);

    if (!user || !isAuthenticated) {
        return (<PageLoaderComponent/>);
    }

    return children;
}

export default Router;
