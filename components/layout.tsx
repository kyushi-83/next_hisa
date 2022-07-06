import { ReactNode } from "react";
import Header from './header'
import Footer from "./footer";
import React, { useReducer } from 'react';
import { createContext, useState} from 'react';

export const UserCount = createContext();

export const UserCountRed = createContext();

interface Props {
  children: ReactNode;
}

const initialState = {
  count2: 100,
};

const Layout = ({ children }: Props) => {

  const [count, setCount] = useState(100);
  const value = {
    count,
    setCount,
  };

  const reducer = (state, action) => {
    switch(action){
      case 'ENDOH':
        return { count2: state.count2 + 1 };
      case 'SAM':
        return { count2: state.count2 + 40 };
      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  
  return (
    <>
     <UserCountRed.Provider value={{ state, dispatch }}>
      <UserCount.Provider value={value}>
        <Header />{children}<Footer />
      </UserCount.Provider>
      </UserCountRed.Provider>
    </>
  );
};
export default Layout;