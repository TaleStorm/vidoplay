require('dotenv').config()
const Dotenv = require('dotenv-webpack')
const path = require('path')
const apiUrl  = process.env.API_DOMAIN

const isProd = process.env.NODE_ENV === 'production'
const urlPrefix = isProd ? process.env.DOMAIN : 'http://localhost:3000'

const nextConfig = {
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  },
  env: {
    URLPREFIX: urlPrefix,
    ROOT: __dirname,
  },
  publicRuntimeConfig: {
    urlPrefix: urlPrefix,
  },
  images: {
    domains: [
      'avatars.mds.yandex.net',
      'kinopoisk-ru.clstorage.net',
      'www.film.ru',
      "dl.airtable.com",
      'chillvision.ru',
      "hsto.org",
      's-ed1.cloud.gcore.lu',
      "habrastorage.org",
      "chillvision.gcdn.co",
      "media.gcorelabs.com"
    ],
  },
  trailingSlash: true,
}

const config = nextConfig

module.exports = config
