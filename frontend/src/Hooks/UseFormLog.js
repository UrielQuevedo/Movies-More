import { useState } from 'react';
import API from '../Service/Api';
import { logIn } from '../Utils/localhostFunctions';
import UseCustomAPI from './UseCustomAPI';

const UseFormLog = (url) => {
  const [fields, changeFields] = useState({});
  const [response, executeAPI] = UseCustomAPI();
  const { loading, _, error } = response;

  const postForm = (data, e) => {
    executeAPI({ API: API, type:'post', path: url, body: data, externalFunction: logIn })
    e.target.reset();
  }

  const handlerChange = (e, name) => {
    changeFields(({...fields, [name]: e.target.value}));
  };

  const errorForm = error ? error.response.data.error : null;

  return [
    loading,
    errorForm,
    handlerChange,
    postForm
  ];
}

export default UseFormLog;