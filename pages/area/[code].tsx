import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export const getStaticPaths = async () => {

  const res = await fetch("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&format=json")
  const todos = await res.json()  
  const photos = todos.results.shop 

  const paths = photos.map((post) => ({
    params: {
      code: post.small_area.code,
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  // 外部APIエンドポイントを呼び出しデータ取得
  const res2 = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&large_area=Z011&format=json&small_area=${params.code}`)
  const data = await res2.json()  
  return {
    props: {
      data
    },
  }
}

const Area = ({data}) =>{

  const {
    results_available = 0,
    results_start = 1,
    results_returned = 1,
    shop: defaultShops = [],
  } = data.results

  const [shop, updateShops] = useState(defaultShops)
  const [page, updatePage] = useState({
    results_available: results_available,
    results_returned: results_returned,
    results_start: results_start,
  })

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (page.results_start === 1) return

    const params = { start: page.results_start, small_area: data.results.shop[0].small_area.code, keyword: keyword}
    const query = new URLSearchParams(params)
    const request = async () => {
      const res = await fetch(`/next_hisa/api/search?${query}`)
      const users = await res.json()
      const nextData = users.users.results
      
      updatePage({
        results_available: nextData.results_available,
        results_returned: nextData.results_returned,
        results_start: nextData.results_start,
      })

      if (nextData.results_start === 1) {
        updateShops(nextData.shop)
        return
      }

      updateShops((prev) => {
        return [...prev, ...nextData.shop]
      })
    }

    request()
  }, [page.results_start])

  const handlerOnClickReadMore = () => {
    if (page.results_returned <= page.results_start) return

    updatePage((prev) => {
      return { ...prev, results_start: prev.results_start + 1,}
    })
  }

  return(
    <div>
      <p>{data.results.shop[0].small_area.name}</p>
      <Head>
      <link rel="icon" href="/next_hisa/favicon2.ico" />
      </Head>
      {shop.map((item, index) => {
            return (
              <li
                key={index}
              >
                <Link href={`/details/${item.id}`}>
                  <a>
                    <div>
                      <div>
                        <div>
                          <img src={item.photo.mobile.s} alt={item.name} />
                        </div>
                      </div>
                      <div>
                        <div> {item.name}</div>
                        <div>
                          <div>
                            <span>
                              {item.genre.name}
                            </span>
                            <span>{item.catch}</span>
                          </div>
                          <p> {item.access}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}

{page.results_returned <= page.results_start ? (
          <div></div>
        ) : (
          <div>
            <button onClick={handlerOnClickReadMore}>
              もっと読む
            </button>
          </div>
        )}

      <Link href="/"><a>TOPへのリンク</a></Link>
    </div>
  )
}

export default Area