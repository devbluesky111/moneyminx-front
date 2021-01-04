import React from 'react';
import { ToastContainer } from 'react-toastify';

import Main from 'app/main';
import { AppProvider } from 'app/app.context';
import { AuthProvider } from 'auth/auth.context';

// tslint:disable-next-line: ordered-imports
import 'assets/css/app.scss';
import 'react-toastify/dist/ReactToastify.min.css';

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
