import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from 'App';
import 'main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
});

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
