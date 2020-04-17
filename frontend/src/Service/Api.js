import axios from 'axios';

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
export const getMovie = (uid) => request('GET', `/movies/${uid}`, undefined, { language: 'en' });
export const getMovies = (genre, page, language, range) => request('GET', `/movies/genre/${genre}`, undefined, { page: page, language: language, range: range });
export const getPrograms = (genre, page, language, range) => request('GET', `/programs/genre/${genre}`, undefined, { page: page, language: language, range: range});
export const getGenres = (content) => request('GET', `/genres/${content}`);
export const getSuscribes = (type, uid) => request('GET', `/user/${uid}/suscribes?type=${type}`);
export const getComments = (uid) => request('GET', `/movies/${uid}/comments`);
export const sendComment = (uid, comment) => request('POST', `/movies/${uid}/comment`, { comment: comment } );
export const removeComment = (uid_movie, uid_comment) => request('DELETE', `/movies/${uid_movie}/comment`, { uidComment: uid_comment })
export default API;