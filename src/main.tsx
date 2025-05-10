import './index.css';
import App from './App.tsx';
import { BreakpointProvider } from './context/BreakpointContext.tsx';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store/store';
import { StrictMode } from 'react';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BreakpointProvider>
                    <App />
                </BreakpointProvider>
            </QueryClientProvider>
        </Provider>
    </StrictMode>
);
