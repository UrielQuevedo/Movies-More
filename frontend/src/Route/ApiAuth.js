import axios from 'axios';

const server = 'http://localhost:5000';

const header =  (idToken) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${idToken}`, 
    }
  }
  return config;
}

const APIAUTH = {
  get: (path, idToken) => axios.get(`${server}${path}`, header(idToken)).then(response => response.data),
  put: (path, body, idToken) => axios.put(`${server}${path}`, body, header(idToken)).then(response => response.data),
  post: (path, body,  idToken) => axios.post(`${server}${path}`, body, header(idToken)).then(response => response.data),
  delete: (path, body, idToken) => axios.delete(`${server}${path}`, body, header(idToken)).then(response => response.data),
};

export default APIAUTH;