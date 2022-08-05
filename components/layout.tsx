import { ReactNode } from "react";
import Header from './header'
import Footer from "./footer";
import React, { useReducer,useState, useEffect, createContext,useContext, useRef} from 'react';
import Head from 'next/head'
import useScroll from "../components/useScroll"

export const metaContext= createContext();
export const UserCountRed = createContext();


interface Props {
  children: ReactNode;
}

const initialState = {
  count2: 100,
};

const meta = {
  title: "グルメ検索",
  description: "グルメの検索アプリです",
  favicon: "/next_hisa/favicon2.ico",
}

const Layout = ({ children }: Props) => {
  const scrollNum = useScroll()
  const reducer = (state, action) => {
    switch(action){
      case 'ENDOH':
        return { count2: state.count2 + 1 };
      case 'SAM':
        return { count2: state.count2 + 40 };
      case 'returnTop':
        return (
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }))
      default:
        return state
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState),
  [btnName, btnNameCh] = useState('')

  useEffect(() => {
    if (scrollNum > 300) {
      btnNameCh('page_top show')
    }else{
      btnNameCh('page_top')
    }
  }, [scrollNum]);
  
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/next_hisa/favicon2.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
     <UserCountRed.Provider value={{ state, dispatch }}>
      <metaContext.Provider value={meta}>
        <Header />
        <main className="main">{children}</main>
        <div className={btnName} onClick={() => dispatch('returnTop')}></div>
        <Footer />
      </metaContext.Provider>
      </UserCountRed.Provider>
    </>
  );
};
export default Layout;