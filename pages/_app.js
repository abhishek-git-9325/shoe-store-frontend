import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import Head from 'next/head'
import store from '@/store/store'
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shoe Store</title>
        <meta name="description" content="NextJS Shoe store ecommerce site" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
        />
      </Head>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}
