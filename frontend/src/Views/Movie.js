import React from 'react';
import { useParams } from 'react-router';

const Movie = () => {
  const x = useParams();
  return (
    <h1>
      {console.log(x)}
      PELICULAS PA
    </h1>
  );
}
 
export default Movie;