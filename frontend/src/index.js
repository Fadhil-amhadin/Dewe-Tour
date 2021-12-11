import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './contexts/authContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <App />
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
