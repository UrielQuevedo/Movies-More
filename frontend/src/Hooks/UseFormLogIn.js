import { useState } from 'react'
import API from '../Route/Api';

const UseFormLogIn = () => {
  const [fields, changeFields] = useState({});

  const logIn = (data, e) => {
    console.log(data);
    API.post('/login', data)
      .then(user => console.log(user))
      .catch( error => console.log(error.response));
    e.target.reset();
  }

  const handlerChange = (e, name) => {
    changeFields({...fields, [name]: e.target.value});
  }

  return [
    handlerChange,
    logIn
  ];
}
 
export default UseFormLogIn;