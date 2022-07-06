import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Area = ({post}) =>{
  return(
    <div>
      <p>{post[0].small_area.name}</p>
      <Head>
      <link rel="icon" href="/next_hisa/favicon2.ico" />
      </Head>
      {post.map((post) => (
        <div>
          <p><img src={post.logo_image} /></p>
        <p>{post.name}</p>
        <p>{post.access}</p>
        </div>
      ))}

      <Link href="/"><a>TOPへのリンク</a></Link>
    </div>
  )
}


export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&count=300&format=json")
  const todos = await res.json()  
  const photos = todos.results.shop 

  // 事前ビルドしたいパスを指定
  const paths = photos.map((post) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      code: post.small_area.code,
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  // 外部APIエンドポイントを呼び出しデータ取得
  const res2 = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&count=300&format=json&small_area=${params.code}`)
  const todos2 = await res2.json()  
  const post = todos2.results.shop 

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      post
    },
  }
}



export default Area