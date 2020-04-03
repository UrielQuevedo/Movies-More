import axios from 'axios';
import Axios from 'axios';

const server = 'http://localhost:5000';

const request = (type, path, body, params) => axios
  ({
    url: `${server}${path}`,
    method: type,
    data: body,
    params: params,
  })
  .then(req => req.data);

const API = {
  get: path => axios.get(`${server}${path}`).then(response => response.data),
  put: (path, body) => axios.put(`${server}${path}`, body).then(response => response.data),
  post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
  delete: (path, body) => axios.delete(`${server}${path}`, body).then(response => response.data),
};

export const getContent = (path) => request('GET', path);
export const getMovies = (genre, page, language, range) => request('GET', `/movies/genre/${genre}`, undefined, { page: page, language: language, range: range });
export const getPrograms = (genre, page, language, range) => request('GET', `/programs/genre/${genre}`, undefined, { page: page, language: language, range: range});
export const getGenres = (content) => request('GET', `/genres/${content}`);
export default API;