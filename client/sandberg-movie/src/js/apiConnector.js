const baseUrl = 'http://localhost:3000';
const axios = require('axios');
const validStatuses = function (status) {
  return status < 500;
};

module.exports = {
  registerUser: function (email, password) {
    let postBody = {
      email: email,
      password: password
    };
    return axios.post(`${baseUrl}/register`, postBody, {validateStatus: validStatuses});
  }
};
