import { ReactNode } from "react";
import Header from './header'
import Footer from "./footer";
import React, { useReducer } from 'react';
import { createContext, useState} from 'react';
import Head from 'next/head'

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

  const [state, dispatch] = useReducer(reducer, initialState);

  
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
        <Header /><main className="main">{children}</main><Footer />
      </metaContext.Provider>
      </UserCountRed.Provider>
    </>
  );
};
export default Layout;