require('dotenv').config()
const Dotenv = require('dotenv-webpack')
const path = require('path')

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
  },
  publicRuntimeConfig: {
    urlPrefix: urlPrefix,
  },
  images: {
    domains: [
      'avatars.mds.yandex.net',
      'kinopoisk-ru.clstorage.net',
      'www.film.ru',
    ],
  },
}

const config = nextConfig

module.exports = config
