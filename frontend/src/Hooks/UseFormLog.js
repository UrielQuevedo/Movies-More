import { useState } from 'react'
import API from '../Route/Api';

const UseFormLog = (url) => {
  const [fields, changeFields] = useState({});

  const postForm = (data, e) => {
    API.post(url, data)
      .then(user => console.log(user))
      .catch( error => console.log(error.response));
    e.target.reset();
  }

  const handlerChange = (e, name) => {
    changeFields({...fields, [name]: e.target.value});
  }

  return [
    fields,
    handlerChange,
    postForm
  ];
}
 
export default UseFormLog;