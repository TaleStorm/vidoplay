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