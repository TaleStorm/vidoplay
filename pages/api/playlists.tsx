import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ 
    content: [
      {
        "title": "Фильм 1",
        "image": "/1505926268182046858.png",
      },
      {
        "title": "Сериал 1",
        "image": "/1505926268182046858.png",
      }
    ]
  })
}

// import apiReq from "../../services/api-requests"

// const ApiReq = new apiReq()

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// }

// export default (req, res) => {
//   const { entity, id } = req.query
//   const body = req.body
//   makeQuery(req.method, entity, id, body).then((resData) => {
//     return res.status(resData.httpStatus).json(resData.result)
//   })
// }