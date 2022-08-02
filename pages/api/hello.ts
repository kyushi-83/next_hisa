
export default async function handler(req, res) {
  const response = await fetch('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=9701ee592ce2d429&format=json&large_area=Z011')
  const users = await response.json()
  res.status(200).json({ users })
}

