import Head from 'next/head'
import Link from 'next/link'
import {useContext} from 'react'
import { UserCount } from '../components/layout'

const Comp_a = () => {

  const { count, setCount } = useContext(UserCount);

  return(
    <>
        <div>
          <Head>
          <link rel="icon" href="/next_hisa/favicon2.ico" />
          </Head>
          <p>Componet C</p>
          <p>{count}</p>
          <button onClick={() => setCount(count + 1)}>+</button>
          <Link href="/">
            <a><p>TOPへ</p></a>
          </Link>
        </div>
    </>
  )

}


export default Comp_a