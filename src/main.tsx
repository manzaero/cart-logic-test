import { StrictMode, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/';
import './index.css';
import { App } from './App.tsx';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode> as ReactNode,
);