import { useState, useEffect, useContext, useRef} from 'react'
import Link from 'next/link'
const Breadcrumb = (txt) =>{
  return(
    <>
      <nav className="breadcrumb">
        <ul>
          <li className="prev"><Link href={`/`}><a><span>トップ</span></a></Link></li>
          <li className="now">{txt}</li>
        </ul>
      </nav>
    </>
  )
};

export default Breadcrumb;