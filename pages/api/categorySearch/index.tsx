export default async (req, res) => {
    const { method, body } = req
    try {
      switch (method) {
        case "GET":
          return res.status(404).json({ error: "Api not found." })
          break
        case "POST":
            // console.log(body) 192.168.1.163
          let response = await fetch(`${process.env.API_DOMAIN}/api/categorySearch`, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(body), // данные могут быть 'строкой' или {объектом}!192.168.1.163
            headers: {
              'Content-Type': 'application/json'
            }
          })
          response = await response.json()

          console.log(response['data']) 
          
          res.status(200).json({status: 'ok', data: response['data']})
          break
        default:
          return res.status(405).end()
      }
    } catch (error) {
      console.error(error.message)
      res.status(404).end()
    }
  }
  