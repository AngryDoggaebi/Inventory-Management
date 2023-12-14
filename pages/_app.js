import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import store from '@/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
