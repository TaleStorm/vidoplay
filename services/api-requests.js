require('dotenv').config()
const urlPrefix  = process.env.API_DOMAIN

export default class NewsService {
  getResource = async (url) => {
    const response = await fetch(url)
    const result = await response.json()
    return result
  }

  postResource = async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  }

  putResource = async (url, fieldsVals) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(fieldsVals)
    })

    const result = await response.json()
    return result
  }

  getEntities = (entity) => {
    return this.getResource(`${urlPrefix}/api/${entity}`)
  }

  getSingleEntity = (entity, id) => {
    return this.getResource(`${urlPrefix}/api/${entity}/${id}`)
  }


}
