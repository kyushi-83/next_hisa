import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { metaContext } from '../../components/layout'
import { UserCountRed } from '../../components/layout'

const Detail = ({post}) =>{
  const meta = useContext(metaContext)
  const { state, dispatch } = useContext(UserCountRed);
  return(
    <>
      {post.map((post) => (
      <section className="detail_content" key={post.key}>
      <nav class="breadCrumb">
      <ol itemscope itemtype="http://schema.org/BreadcrumbList" class="flex">
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
      <Link href={`/`}><a itemprop="item"><span itemprop="name">トップ</span></a></Link></li>
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name">{post.name}</span></li>
      </ol>
      </nav>
      
      <Head>
        <title>{post.name} | {meta.title}</title>
        <meta name="description" content={post.name} />
      </Head>
        <div className="inner">
        <h1 className="name">{post.name}</h1>
          <div className="info_main">
            <p className="img"><img src={post.photo.pc.l} /></p>
            <p className="txt"><span className="b">【住所・アクセス】</span>{post.address}{post.access}</p>
            <p className="txt"><span className="b">【営業時間】</span>{post.open}</p>
            <p className="txt"><span className="b">【定休日】</span>{post.close}</p>
            <p className='tag_list'>
            {post.course == 'あり' ? (<span className="tag">コースあり</span>):(<></>)}
            {post.free_drink == 'あり' ? (<span className="tag">飲み放題</span>):(<></>)}
            {post.free_food == 'あり' ? (<span className="tag">食べ放題</span>):(<></>)}
            {post.private_room == 'あり' ? (<span className="tag">個室あり</span>):(<></>)}
            {post.horigotatsu == 'あり' ? (<span className="tag">掘りごたつ</span>):(<></>)}
            {post.tatami == 'あり' ? (<span className="tag">座敷あり</span>):(<></>)}
            {post.card == '利用可' ? (<span className="tag">カード可</span>):(<></>)}
            {post.non_smoking == '一部禁煙' ? (<span className="tag">喫煙可</span>):(<></>)}
            {post.lunch == 'あり' ? (<span className="tag">ランチあり</span>):(<></>)}
            
            </p>
          </div>

        </div>
        <button onClick={() => dispatch('returnTop')}>TOPへ戻る</button>
      </section>
      ))}
    </>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&count=100&format=json")
  const todos = await res.json()  
  const photos = todos.results.shop 

  // 事前ビルドしたいパスを指定
  const paths = photos.map((post) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: post.id.toString(),
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  // 外部APIエンドポイントを呼び出しデータ取得
  const res2 = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&count=100&format=json&id=${params.id}`)
  const todos2 = await res2.json()  
  const post = todos2.results.shop 

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      post
    },
  }
}


export default Detail