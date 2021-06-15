const isProd = process.env.NODE_ENV === 'production'
const urlPrefix = isProd ? process.env.API_DOMAIN : 'http://localhost:3001'
const regPrefix = isProd ? process.env.ONE_LOG_DOMAIN : 'http://localhost:3002'

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

  postResourceWithoutJson = async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      processData: false,
      contentType: false
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

  getPlaylistMovies = (id) => {
    return this.postResource(`${urlPrefix}/api/getPlaylistMovies`, {
      playlistId: id
    })
  }

  getMovieBySringName = (stringName) => {
    return this.postResource(`${urlPrefix}/api/getEntityByStringName`, {
      stringName: stringName
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

  createComment = async (data) => {
    return this.postResource(`${urlPrefix}/api/createComment`, data)
  }

  getFavoriteFilm = async (data) => {
    return this.postResource(`${urlPrefix}/api/getFavoriteFilm`, data)
  }

  getUserFavorites = async (data) => {
    return this.postResource(`${urlPrefix}/api/getUserFavorites`, data)
  }

  getUserHistory = async (data) => {
    return this.postResource(`${urlPrefix}/api/getUserHistory`, data)
  }

  updateFavoriteFilm = async (data) => {
    return this.postResource(`${urlPrefix}/api/updateFavoriteFilm`, data)
  }

  updateHistory = async (data) => {
    return this.postResource(`${urlPrefix}/api/updateHistory`, data)
  }

  updateLikes = async (movieId, data) => {
    return this.putResource(`${urlPrefix}/api/movies/${movieId}`, data)
  }

  partnership = async (data) => {
    return this.postResource(`${urlPrefix}/api/partnership`, data)
  }

  addImage = async (data) => {
    return this.postResourceWithoutJson(`${urlPrefix}/api/addImage/test`, data)
  }

  changePassword = async (data) => {
    return this.postResource(`${urlPrefix}/api/changePassword`, data)
  }

  setWantToSeeVotes = async (data) => {
    return this.postResource(`${urlPrefix}/api/changevotes`, data)
  }

  updateUserInfo = async (data, userId) => {
    return this.postResource(`${regPrefix}/api/profile/${userId}`, data)
  }

  getUser = async (userId) => {
    return this.getResource(`${regPrefix}/api/profile/${userId}`)
  }

  validate = async (data) => {
    return this.postResource(`${regPrefix}/api/validate`, data)
  }

  createDraft = async (data, category) => {
    return this.postResource(`${regPrefix}/api/${category}/draft`, data)
  }

  getAllowed
}
