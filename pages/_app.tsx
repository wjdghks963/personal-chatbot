import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {FireBaseAnalytics} from "../src/libs/firebase/Firebase";
import Head from "next/head";




function MyApp({ Component, pageProps }: AppProps) {
  const startAnalytics = async () => {
    await FireBaseAnalytics()
  }
  startAnalytics();

  return(
      <>
    <Head>
      <title>OA</title>
    </Head>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp;

