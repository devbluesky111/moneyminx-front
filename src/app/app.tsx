import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { AuthProvider } from 'auth/auth.context';
import 'assets/css/app.scss';

import Main from './main';
import { AppProvider } from './app.context';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
