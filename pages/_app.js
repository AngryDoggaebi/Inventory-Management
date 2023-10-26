import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import store from '@/redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Provider>
  );
}
