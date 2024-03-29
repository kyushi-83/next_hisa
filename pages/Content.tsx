import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const defaultEndpoint = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&format=json&large_area=Z011"

export async function getStaticProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}


const Content = ({data}) =>{
  const {
    results_available = 0,
    results_start = 1,
    results_returned = 1,
    shop: defaultShops = [],
  } = data.results

  const arr1 = [...new Map(data.results.shop.map((v) => [v.small_area.code, v])).values()];

  const [shop, updateShops] = useState(defaultShops)
  const [page, updatePage] = useState({
    results_available: results_available,
    results_returned: results_returned,
    results_start: results_start,
  })

  const [keyword, setKeyword] = useState('')
  const [small_area, setSmallarea] = useState('')

  useEffect(() => {
    if ((keyword === '' && small_area === '') || (keyword === '' && small_area === '選択してください')) return

    const params = { keyword: keyword, small_area: small_area}
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

      updateShops(nextData.shop)
    }

    request()
  }, [keyword,small_area])

  useEffect(() => {
    if (page.results_start === 1) return

    const params = { start: page.results_start, keyword: keyword, small_area: small_area }
    const query = new URLSearchParams(params)
   const request = async () => {
      const res = await fetch(`/next_hisa/api/search/?${query}`)
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
      return {
        ...prev,
        results_start: prev.results_start + 1,
      }
    })
  }

  const handlerOnSubmitSearch = (e) => {
    e.preventDefault()

    const { currentTarget = {} } = e
    const fields = Array.from(currentTarget?.elements)
    const fieldQuery = fields.find((field) => field.name === 'query')
    const fieldSelect = fields.find((field) => field.name === 'small_area')

    const value = fieldQuery.value || ''
    const value2 = fieldSelect.value || ''
    setKeyword(value)
    setSmallarea(value2)
  }

  return (
    <>
      <Head>
        <title>東京グルメ店検索</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/next_hisa/favicon2.ico" />
      </Head>
      <div>
        <div>
          <div>
            <h2 >東京グルメ店検索</h2>
          </div>
          <div >
            <form onSubmit={handlerOnSubmitSearch}>
              <input
                type="search"
                name="query"
                placeholder="キーワードを入力して下さい"
              />
              <select name="small_area">
                <option key="0">選択してください</option>
              {arr1.map((post) => (
                <option key={post.small_area.code} value={post.small_area.code}>
                  {post.small_area.name}
                </option>
              ))}
              </select>
              <button>
                Search
              </button>
            </form>
            <div>
              <span>{page.results_available}</span> <span>件</span>
            </div>
          </div>
        </div>
        <ul>
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
        </ul>
        {page.results_returned <= page.results_start ? (
          <div></div>
        ) : (
          <div>
            <button onClick={handlerOnClickReadMore}>
              もっと読む
            </button>
          </div>
        )}
        <div>
          Powered by{' '}
          <a href="http://webservice.recruit.co.jp/">
            ホットペッパー Webサービス
          </a>
        </div>
      </div>
    </>
  )
}

export default Content