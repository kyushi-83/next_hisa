import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Detail = ({post}) =>{
  return(
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const photos = await res.json()  

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
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()  

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      post
    },
  }
}


export default Detail