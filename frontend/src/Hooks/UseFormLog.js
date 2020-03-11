import { useState } from 'react';
import API from '../Route/Api';
import { logIn } from '../localhostFunctions';

const UseFormLog = (url) => {
  const [fields, changeFields] = useState({});
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const postForm = (data, e) => {
    setIsLoading(true);
    API.post(url, data)
      .then(user => {
        setIsLoading(false);
        logIn(user);
      })
      .catch(error => {
        setFormError(error.response.data.error);
        setIsLoading(false);
      });
    e.target.reset();
  }

  const handlerChange = (e, name) => {
    changeFields(({...fields, [name]: e.target.value}));
  };

  return [
    isLoading,
    formError,
    handlerChange,
    postForm
  ];
}
 
export default UseFormLog;