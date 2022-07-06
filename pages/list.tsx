import Head from 'next/head'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

const List = () => {

  // countの初期値として、1~10までのランダムな数値を生成
  const initialState = Math.floor(Math.random() * 10) + 1
  // count という名前の state 変数を宣言、初期値 initialState をセット
  const [count, setCount] = useState(initialState)
  // open という名前の state 変数を宣言、初期値 true をセット
  const [open, setOpen] = useState(true)
  // toggleの関数を宣言
  const toggle = () => setOpen(!open)

  const [count2, setCount2] = useState(0)

  const [name, setName] = useState({
    lastName: '',
    firstName: ''
  })

  useEffect(() => {
    document.title = `${count2}回クリックされました`
  },[count2])


  return(
    <>
      <Head>
        <title>List</title>
        <meta name="description" content="listページ" />
        <link rel="icon" href="/next_hisa/favicon2.ico" />
      </Head>
      <button onClick={toggle}>{open ? 'close' : 'open'}</button>
      <div className={open ? 'isOpen' : 'isClose'}>
        <p>現在の数字は{count}です</p>
        <button onClick={() => setCount(count - 1)}>- 1</button>
        <button onClick={() => setCount(0)}>０</button>
        <button onClick={() => setCount(initialState)}>最初の数値に戻す</button>
      </div>



      <p>{`${count2}回クリックされました`}</p>

      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>setCount2((prev) => prev + 1)}>ボタン</Button>
        <Button onClick={()=>setCount2(0)}>リセット</Button>
      </ButtonGroup>

      <p>{`私の名前は${name.lastName} ${name.firstName}です`}</p>
      <form  noValidate autoComplete="off">
        <Input
          placeholder="姓"
          value={name.lastName}
          onChange={(e)=>{setName({...name,lastName: e.target.value})}}/>
        <Input
          placeholder="名"
          value={name.firstName}
          onChange={(e)=>{setName({...name,firstName: e.target.value})}}/>
      </form>

      <Link href="/">
        <a>back to top</a>
      </Link>
    </>
  )

}


export default List