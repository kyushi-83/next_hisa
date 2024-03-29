import Head from 'next/head'
import Image from "next/image"
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = ({photos}) =>{
  const router = useRouter();

  useEffect(() => {
    document.title = `You clickedtimes`;
  });
  const arr1 = [...new Map(photos.map((v) => [v.small_area.code, v])).values()];
  return(
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/next_hisa/favicon2.ico" />
      </Head>
      
        <div>
          <Link href="/list">
            <a>
            <h2>list</h2>
            </a>
          </Link>
        </div>

        <div>
          <Link href="/comp_a">
            <a>Comp_aへのリンク</a>
          </Link>
        </div>

        <div>
          <Link href="/comp_b">
            <a>Comp_bへのリンク</a>
          </Link>
        </div>

        <div>
          <Link href="/Content">
            <a>Contentへのリンク</a>
          </Link>
        </div>

        <p>{router.query.p}</p>

        <div>
        <ul>
        {arr1.map((post) => (
          <li key={post.small_area.code}>
          <Link href={`/area/${post.small_area.code}`} >
            <a>{post.small_area.name}</a>
          </Link>
          </li>
        ))}
        </ul>
        </div>

        <ul>
        {photos.map((post) => (
          <li key={post.id}>
            {/* リンク先を指定 */}
            <Link href={`/details/${post.id}`}>
              <a>{post.name}</a>
            </Link>
          </li>
        ))}
        </ul>

        <img src="/next_hisa/vercel.svg" />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&count=300&format=json")
  const todos = await res.json()  
  const photos = todos.results.shop


  return {
    props: {
      photos
    },
  }
}

export default Home