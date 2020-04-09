import { useState } from 'react';

const UseApi = (defaultValue) => {
  const [response, setResponse] = useState({
    loading: true,
    data: defaultValue,
    error: null,
  });

  const executeApi = (request) => {
    setResponse({...response, loading: true});
    request
      .then((response) => setResponse({ ...response, loading: false, data: response }))
      .catch((error) => setResponse({ ...response, loading: false, error: error }))
  }
  
  return [response, executeApi];
}

export default UseApi;