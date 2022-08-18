
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'

const List2 = () => {

  const router = useRouter()

  const [open, setOpen] = useState(false)
  // toggleの関数を宣言
  const toggle = () => setOpen(!open)

  const inpRoute = (e) => {
    router.push({
      pathname:"/sub",
      query: {p :e} 
    })
  }



  return(
    <section className="main_contena">
      <button onClick={toggle}>{open ? 'close' : 'open'}</button>
      <div className={open ? 'isOpen' : 'isClose'}>
        <p>現在の数字はです</p>
      </div>

      <Link href="/">
        <a>back to top</a>
      </Link>

      <button onClick={() => inpRoute('power')}></button>


    </section>
  )

}


export default List2