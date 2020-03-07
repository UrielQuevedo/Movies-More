import { useState } from 'react'
import API from '../Route/Api';

const UseFormLog = (url) => {
  const [fields, changeFields] = useState({});
  const [formError, setFormError] = useState('');

  const postForm = (data, e) => {
    API.post(url, data)
      .then(user => {
        window.localStorage.setItem('accesToken', user.accessToken);
        window.localStorage.setItem('uid', user.uid);
        window.localStorage.setItem('isLog', true);
        window.location.href = '/';
      })
      .catch(error => setFormError(error.response.data.error));
    e.target.reset();
  }

  const handlerChange = (e, name) => {
    changeFields(({...fields, [name]: e.target.value}));
  };

  return [
    formError,
    handlerChange,
    postForm
  ];
}
 
export default UseFormLog;