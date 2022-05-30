import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material';
import theme from './common/theme';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const API_LINK = process.env.REACT_APP_API_URL ?? 'http://localhost:5555/graphql';

const wsLink = new GraphQLWsLink(
    createClient({
        url: API_LINK.replace('http', 'ws')
    }),
);

const httpLink = new HttpLink({
    uri: API_LINK,
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            ChatListUsersQuery: {
                keyFields: [],
            },
        },
    }),
    link: splitLink,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ApolloProvider client={apolloClient}>
          <Provider store={store}>
              <ThemeProvider theme={theme}>
                <Router />
              </ThemeProvider>
          </Provider>
      </ApolloProvider>
  </React.StrictMode>
);
