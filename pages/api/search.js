import fetch from 'node-fetch'

export default async function handler(req, res) {
  let url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&format=json&large_area=Z011"


  if (typeof req.query.keyword !== undefined) {
    url = `${url}&keyword=${req.query.keyword}`
  }

  if (typeof req.query.start !== undefined) {
    url = `${url}&start=${req.query.start}`
  }

  if (typeof req.query.small_area !== undefined) {
    url = `${url}&small_area=${req.query.small_area}`
  }

  if (typeof req.query.order !== undefined) {
    url = `${url}&order=${req.query.order}`
  }

  if (typeof req.query.count !== undefined) {
    url = `${url}&count=${req.query.count}`
  }

  url = encodeURI(url)

  const response = await fetch(url)
  const users = await response.json()
  res.status(200).json({ users })
}

