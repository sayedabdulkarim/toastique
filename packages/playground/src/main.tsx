import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastProvider } from 'toastique';
import 'toastique/styles.css';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider defaultPosition="top-right" maxToasts={5}>
      <App />
    </ToastProvider>
  </StrictMode>
);
