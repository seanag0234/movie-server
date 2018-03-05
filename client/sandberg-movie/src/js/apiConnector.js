const baseUrl = 'http://localhost:3000';
const axios = require('axios');
const validStatuses = function (status) {
  return status < 500;
};

axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config;
  }
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return config
});

module.exports = {
  registerUser: function (email, password) {
    let postBody = {
      email: email,
      password: password
    };
    return axios.post(`${baseUrl}/register`, postBody, {validateStatus: validStatuses});
  }
};
