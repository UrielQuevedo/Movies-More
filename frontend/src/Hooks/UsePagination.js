import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsePagination (query, pageNumber) {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError] = useState(false);
  const [ contents, setContents ] = useState([]);
  const [ hasMore, setHasMore ] = useState(false);

  useEffect(() => {
    setContents([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel
    axios({
      url: 'http://localhost:5000/movies/genre/new',
      method: 'GET',
      params: { language:'en', page: pageNumber, range: 30},
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then((response) => {
      setContents((prevContents) => {
        return [...prevContents, ...response.data]
      });
      setHasMore(response.data.length > 0);
      setLoading(false);
    })
    .catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, contents, hasMore };
}