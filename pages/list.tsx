import Link from 'next/link'
import Head from 'next/head'

export default () =>(
  <div>
    <Head>
      <title>list</title>
      <meta name="description" content="listページ" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <p>linklist page</p>
    <Link href="/">
      <a>back to top</a>
    </Link>
  </div>
)