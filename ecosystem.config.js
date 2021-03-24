module.exports = {
  apps : [{
    name: 'cinema-chill',
    script: 'npm start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3003,
    },
  }],

  deploy : {
    production : {
      user : 'dev',
      host : 'chill.cinema.ldtc.space',
      ref  : 'origin/master',
      repo : 'git@gitlab.com:cinema9/chill.git',
      path : '/opt/chill',
      'pre-deploy-local' : '',
      'post-deploy' : 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
      'pre-setup': '',
    }
  }
};
