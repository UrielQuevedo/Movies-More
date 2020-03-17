import { useState  } from 'react';

const UseCustomAPI = (defaultValue) => {
  const [response, setResponse] = useState({
    loading: false,
    data: defaultValue,
    error: null,
  })

  const executeAPI = ({ API, type, path, body, idToken, externalFunction }) => {
    setResponse({ ...response, loading: true });
    API[type](path, body, idToken)
      .then(data => {
        if (externalFunction) {
          externalFunction(data);
        } else {
          setResponse({ ...response, loading: false, data: data })
        }
      })
      .catch(error => setResponse({ ...response, loading: false, error: error }))
  }

  return [response, executeAPI];
}
 
export default UseCustomAPI;