
module.exports = {
 apps: [{
  name: 'chill',
  script: 'npm start',

  // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  instances: 1,
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  env: {
   SERVER: 'https://chill.dev.ctdl.space',
      DIR: '/opt/chill',
   NODE_ENV: 'development',
  }
 }],
 deploy: {
  development: {
   'user': 'dev',
   'host': 'chill.cinema.ldtc.space',
   'ref': 'origin/master',
   'repo': 'git@gitlab.com:cinema9/chill.git',
   'path': '/opt/chill',
   'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env development',
  },
 },
}