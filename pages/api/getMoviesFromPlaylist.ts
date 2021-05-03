export default async (req, res) => {
    const { method, body } = req
    try {
      switch (method) {
        case "GET":
          return res.status(404).json({ error: "Api not found." })
          break
        case "POST":
          let response = await fetch(`${process.env.API_DOMAIN}/api/getPlaylistMovies`, { 
            method: 'POST', // или 'PUT'
            body: JSON.stringify(body), // данные могут быть 'строкой' или {объектом}!
            headers: {
              'Content-Type': 'application/json'
            }
          })
          console.log(response)
          response = await response.json()
          res.status(200).json(response)
          break
        default:
          return res.status(405).end()
      }
    } catch (error) {
      console.error(error.message)
      res.status(404).end()
    }
  }
  