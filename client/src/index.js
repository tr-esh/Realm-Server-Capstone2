import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import App from './App';
import { ReadingsContextProvider } from './context/ReadingContext';
import { AuthContextProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { SnackbarProvider } from './context/SnackbarContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RoleProvider>
      <AuthContextProvider>
        <SnackbarProvider>
          <ReadingsContextProvider>
            <Suspense>
              <App />
            </Suspense>
          </ReadingsContextProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </RoleProvider>
  </BrowserRouter>,
);
