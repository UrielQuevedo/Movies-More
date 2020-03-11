import { useState  } from 'react';

const UseCustomAPI = () => {
  const [response, setResponse] = useState({
    loading: false,
    data: null,
    error: null,
  })

  const executeAPI = ({ API, type, path, body }) => {
    setResponse({ ...response, loading: true });
    API[type](path, body)
      .then(data => setResponse({ ...response, loading: false, data: data }))
      .catch(error => setResponse({ ...response, loading: false, error: error }))
  }

  return [response, executeAPI];
}
 
export default UseCustomAPI;