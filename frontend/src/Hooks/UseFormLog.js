import { useState } from 'react'
import API from '../Route/Api';

const UseFormLog = (url, props) => {
  const [fields, changeFields] = useState({});
  const [formError, setFormError] = useState('');

  const postForm = (data, e) => {
    API.post(url, data)
      .then(user => console.log(user))
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