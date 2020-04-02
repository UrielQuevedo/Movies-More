import { useEffect, useState } from 'react';

export default function UsePagination (request) {

  const [ contents, setContents ] = useState([]);
  const [ hasMore, setHasMore ] = useState(false);

  useEffect(() => {
    request.then(contents => {
      setContents((prevContents) => [...prevContents, contents]);
      setHasMore(contents.lenght > 0);
    })
    .catch(error => console.log(error))
  }, []);

  return {contents, hasMore};
}