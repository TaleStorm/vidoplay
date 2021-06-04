import { NextApiRequest, NextApiResponse } from "next"
import geoip from "geoip-lite"
import { config } from "./locationUtils/config"
import location from "./locationUtils/location"

export default async (req:NextApiRequest, res:NextApiResponse) => {
    const { method, body } = req
    try {
      switch (method) {
        case "GET":
          return res.status(404).json({ error: "Api not found." })
          break
        case "POST":
          const {head, ip} = body
          const geo = geoip.lookup(ip)
          let allowed = true
          if (geo) {
            allowed = location(geo, head["user-agent"])
          }
          res.json(allowed)
          break
        default:
          return res.status(405).end()
      }
    } catch (error) {
      console.error(error.message)
      res.status(404).end()
    }
  }
  