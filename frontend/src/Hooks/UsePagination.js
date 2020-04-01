import { useEffect, useState } from 'react';

export default function UsePagination (request) {

  const [ contents, setContents ] = useState([]);

  useEffect(() => {
    request.then(contents => {
      setContents(contents);
    })
    .catch(error => console.log(error))
  }, []);

  return [contents];
}