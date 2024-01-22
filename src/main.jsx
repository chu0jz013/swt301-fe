import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { ConfirmProvider } from 'material-ui-confirm';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfirmProvider
          defaultOptions={{
            confirmationButtonProps: {
              variant: 'contained',
            },
            cancellationButtonProps: {
              variant: 'contained',
              sx: {
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: '#D52600',
                },
              },
            },
            cancellationText: 'No',
            confirmationText: 'Yes',
            dialogProps: {
              sx: {
                textAlign: 'center',
                maxWidth: '400px',
                margin: 'auto',
              },
            },
            dialogActionsProps: {
              sx: {
                justifyContent: 'center',
              },
            },
          }}
        >
          <App />
        </ConfirmProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
