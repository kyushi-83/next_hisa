import Link from 'next/link'

const Custom404 = () =>{
  return (
    <section className="detail_content">
    <div className="txt_404">404 Not Found</div>
    <div className="btn_custom"><Link href={`/`}><a>一覧に戻る</a></Link></div>
    </section>
  )
}
export default Custom404
