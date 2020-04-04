import axios from 'axios';

const server = 'http://localhost:5000';
//TODO Sacar x, que seria el idToken y no se usa, se deja para que no rompa con lo de APIAUTH
const header =  (idToken) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${idToken}`, 
    }
  }
  return config;
}

const request = (type, path, body) => axios
({
  url: `${server}${path}`,
  method: type,
  data: body,
  headers: {
    "Authorization": `Bearer ${window.localStorage.getItem('idToken')}`,
  }
})
.then(req => req.data);

const APIAUTH = {
  get: (path, idToken) => axios.get(`${server}${path}`, header(idToken)).then(response => response.data),
  put: (path, body, idToken) => axios.put(`${server}${path}`, body, header(idToken)).then(response => response.data),
  post: (path, body,  idToken) => axios.post(`${server}${path}`, body, header(idToken)).then(response => response.data),
  delete: (path, body, idToken) => axios.delete(`${server}${path}`, body, header(idToken)).then(response => response.data),
};

export const suscribeGenre = (type, uid_type, uid) => request('POST', `/user/${uid}/suscribe?type=${type}`, { uid_type: uid_type });
export const unsuscribeGenre = (type, uid_type, uid) => request('POST', `/user/${uid}/unsuscribe?type=${type}`, { uid_type: uid_type });
export default APIAUTH;
