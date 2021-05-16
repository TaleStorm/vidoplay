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
      body: JSON.stringify(body),
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

  getPlaylistMoves = (id) => {
    return this.postResource(`${urlPrefix}/api/getPlaylistMovies`, {
      playlistId: id
    })
  }

  getTableFromAirtable = async (table) => {
    const result = await fetch(`https://api.airtable.com/v0/app5Hw3RVknO5eZ4P/${table}?view=Grid%20view`, {
      headers: {
        'Authorization': 'Bearer keyVIkP5eKsQsa5gA' 
      }
    })
    const data = await result.json()
    return data
  }

  getComments = async (movieId) => {
    return this.getResource(`${urlPrefix}/api/getComments/${movieId}`)
  }
}
