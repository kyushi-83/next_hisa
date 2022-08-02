import { useState, useEffect, useContext, useRef} from 'react'
import { metaContext } from '../components/layout'
import useScroll from "../components/useScroll"
import Link from 'next/link'

const Header = () => {
  const scrollNum = useScroll(),
        meta = useContext(metaContext),
        [headerName, headerNameCh] = useState(''),
        [offsetNum, offsetFunc] = useState(0)
  useEffect(() => {
      if (scrollNum > offsetNum) {
        headerNameCh('haderCs')
      }else{
        headerNameCh('')
      }
      offsetFunc(scrollNum)
  }, [scrollNum]);

  return (
    <header className={headerName}>
      <div className="header_inner">
      <h1 className="site_logo"><Link href={`/`}><a>{meta.title}</a></Link></h1>
      </div>
    </header>
  );
}

export default Header;