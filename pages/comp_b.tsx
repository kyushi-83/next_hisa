import Head from 'next/head'
import Link from 'next/link'
import {useContext} from 'react'
import { UserCountRed } from '../components/layout'

const Comp_b = () => {

  const { state, dispatch } = useContext(UserCountRed);

  return(
    <>
        <div>
        <Head>
        <link rel="icon" href="/next_hisa/favicon2.ico" />
        </Head>
            <p>Componet B</p>
            <p>{state.count2}</p>
            <button onClick={() => dispatch('SAM')}>+</button>
            <Link href="/">
              <a><p>TOPへ</p></a>
            </Link>
          
        </div>
    </>
  )

}


export default Comp_b