export default async (req, res) => {
  const { method, body } = req
  try {
    switch (method) {
      case "GET":
        return res.status(404).json({ error: "Api not found." })
        break
      case "POST":
        console.log(body)
        let response = await fetch(`https://accounts.chillvision.ru/api/validate`, { 
          method: 'POST', // или 'PUT'
          body: JSON.stringify(body), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.status !== 403){
          response = await response.json()
          res.status(200).json(response)
          return
        }
        res.status(403).send()
        break
      default:
        return res.status(405).end()
    }
  } catch (error) {
    console.error(error.message)
    res.status(404).end()
  }
}
