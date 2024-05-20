import '../styles/globals.scss';
import { Provider } from 'react-redux';
import store, { persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
