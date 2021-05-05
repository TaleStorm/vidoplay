import axios from 'axios';

axios.interceptors.request.use(function (config) {
  let token = window?.localStorage?.getItem('_user')
    config.url = config.url + `?token=${token}`
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });



export default axios