
import Link from 'next/link'
import React, {useState, useEffect} from 'react'

const List2 = () => {

  const [open, setOpen] = useState(false)
  // toggleの関数を宣言
  const toggle = () => setOpen(!open)


  return(
    <section className="main_contena">
      <button onClick={toggle}>{open ? 'close' : 'open'}</button>
      <div className={open ? 'isOpen' : 'isClose'}>
        <p>現在の数字はです</p>
      </div>

      <Link href="/">
        <a>back to top</a>
      </Link>
    </section>
  )

}


export default List2