import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import useScroll from "../components/useScroll"
const ScrollRevealContainer = dynamic(
  import('../components/ScrollRevealContainer'),
  {ssr: false,}
);
//import { metaContext } from '../components/layout'
import { UserCountRed } from '../components/layout'

export const getStaticProps = async () => {
  try{
      const res = await fetch("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&format=json&large_area=Z011")
      const data = await res.json()
      return {
        props: {
          data,
        },
      }
  }catch(err){
    return
  }
}
const Content = ({data}) =>{
  const [load, loaduse] = useState('load')
  const scrollNum = useScroll(),
        [searchcontenaName, searchcontenaNameFixed] = useState('search_contena'),
        [offsetNum, offsetFunc] = useState(0),
        //meta = useContext(metaContext),
        { state, dispatch } = useContext(UserCountRed),
        {
          results_available = 0,
          results_start = 1,
          results_returned = 1,
          shop: defaultShops = [],
        } = data.results,
        arr1 = [...new Map(data.results.shop.map((v) => [v.small_area.code, v])).values()],
        [shop, updateShops] = useState(defaultShops),
        [page, updatePage] = useState({
          results_available: results_available,
          results_returned: results_returned,
          results_start: results_start,
        }),
        [keyword, setKeyword] = useState(''),
        [small_area, setSmallarea] = useState(''),
        [order, setOrder] = useState(''),
        [count, setCount] = useState('10')

  useEffect(() => {
    //if ((keyword === '' && small_area === '') || (keyword === '' && small_area === '場所を選択')) return
    if (small_area == '場所を選択'){ setSmallarea('') }
    loaduse('load show')
    const params = { keyword: keyword, small_area: small_area, order: order},
          query = new URLSearchParams(params)
    const request = async () => {
      try{
          const res = await fetch(`/next_hisa/api/search?${query}`)
          const users = await res.json()
          const nextData = users.users.results
          updatePage({
            results_available: nextData.results_available,
            results_returned: nextData.results_returned,
            results_start: nextData.results_start,
          })
          updateShops(nextData.shop)
          loaduse('load hide')
      }catch{
          return
      }
    }
    request()
    dispatch('returnTop')
  }, [keyword,small_area,order])

  

  useEffect(() => {
    if (page.results_start === 1) return
    const num = page.results_start + 10,
          params = { start: page.results_start, keyword: keyword, small_area: small_area, order: order, count: count},
          query = new URLSearchParams(params)
    setCount(num)
    loaduse('load ver2 show')
    const request = async () => {
      try{
          const res = await fetch(`/next_hisa/api/search/?${query}`),
                users = await res.json(),
                nextData = users.users.results
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
          loaduse('load hide')
      }catch{
        return
      }
    }
    request()
  }, [page.results_start])

  useEffect(() => {
    if (scrollNum > offsetNum) {
      searchcontenaNameFixed('search_contena search_contena_none')
    }else{
      searchcontenaNameFixed('search_contena')
    }
    offsetFunc(scrollNum)
  }, [scrollNum]);
  
  const handlerOnClickReadMore = () => {
    //if (page.results_returned <= page.results_start) return

    updatePage((prev) => {
      return {
        ...prev,
        results_start: prev.results_start + 10,
      }
    })
  }

  const handlerOnSubmitSearch = (e) => {
    e.preventDefault()
    const { currentTarget = {} } = e,
          fields = Array.from(currentTarget?.elements),
          fieldQuery = fields.find((field) => field.name === 'query'),
          fieldSelect = fields.find((field) => field.name === 'small_area'),
          value = fieldQuery.value || '',
          value2 = fieldSelect.value || ''
    setKeyword(value)
    setSmallarea(value2)
  }

  const selectChange = (d) =>{
    d.preventDefault()
    const value3 = d.target.value
    setOrder(value3)
  }

  return (
    <>
    <section className={searchcontenaName}>
        <p className={load}></p>
        <div className="inner">
        <form onSubmit={handlerOnSubmitSearch}>
          <p className="unit"><input type="search" name="query" placeholder="キーワードを入力して下さい" /></p>
          <p className="unit"><select name="small_area">
            <option key="0">場所を選択</option>
          {arr1.map((post) => (
            <option key={post.small_area.code} value={post.small_area.code}>
              {post.small_area.name}
            </option>
          ))}
          </select></p>
          <p className="unit"><button>検索</button></p>
        </form>
        </div>
    </section>
    <section className="main_contena">
        <section className='search_contena_02'>
            <div className="num">{page.results_available}<span>件</span></div>
            <select name="order" onChange={selectChange}>
                <option value="4">おススメ順</option>
                <option value="1">店名かな順</option>
            </select>
        </section>
        <ul className="item_list">
          {shop.map((item, index) => {
            return (
              <ScrollRevealContainer move="bottom">
              <li
                key={index}
                className="unit"
              >
                <Link href={`/details/${item.id}`}>
                  <a>
                    <div className="img">
                      <img src={item.photo.pc.m} alt={item.name} />
                    </div>
                    <div className="txt">
                      <p className="name">{item.name}</p>
                      <p className="access">アクセス：{item.access}</p>
                    </div>
                  </a>
                </Link>
              </li>
              </ScrollRevealContainer>
            )
          })}
        </ul>
        <div className="more_content">
        {page.results_returned < 10 ? (
                <div></div>
              ) : (
                <div className="btn_more">
                  <button onClick={handlerOnClickReadMore}>
                    もっと見る
                  </button>
                </div>
          )}
        </div>
        {page.results_available === 0 ? (
          <div className="no_item">検索対象のお店はありません</div>
        ) : (
          <div></div>
        )}
      </section>
    </>
  )
}

export default Content