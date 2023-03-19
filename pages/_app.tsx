import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {FireBaseAnalytics} from "../src/libs/firebase/Firebase";
import Head from "next/head";
import { Provider } from 'react-redux';
import {wrapper} from "../store";



function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const startAnalytics = async () => {
    await FireBaseAnalytics()
  }
  startAnalytics();

  return(
      <>
    <Head>
      <title>OA</title>
    </Head>
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
    </>
  )
}

export default MyApp;

