import '../styles/globals.css'
import '../styles/common.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Image from 'next/image'
import Link from 'next/link'


function MyApp({ Component, pageProps}: AppProps) {
  return (
    <Layout><Component {...pageProps} /></Layout>
  )
}

export default MyApp