import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {FireBaseAnalytics} from "../src/libs/firebase/Firebase";




function MyApp({ Component, pageProps }: AppProps) {
  const startAnalytics = async () => {
    await FireBaseAnalytics()
  }
  startAnalytics();

  return <Component {...pageProps} />
}

export default MyApp;

