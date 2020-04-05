import React, { useState } from 'react';
import { useEffect } from 'react';
import { getGenres } from '../Route/Api';
import UseApi from '../Hooks/UseApi';
import { Link, NavLink } from 'react-router-dom';
import UseSelectedGenre from '../Hooks/UseSelectedGenre';

const Genres = ({ content_ref }) => {
  const [genresResponse, getContentGenres] = UseApi([]);

  useEffect(() => {
    getContentGenres(getGenres(content_ref));
  }, [content_ref]);

  const createGenres = () => {
    return genresResponse.data.map((genre) => (
      <div>
        <a 
        href={`/${content_ref}?genre=${genre}`}
        className="genre" 
        style={{textTransform: 'uppercase', color:'#21FFE2', marginBottom:'5px'}}
      >
        { genre === 'new' ? 'new ' + content_ref : genre }
      </a>
      </div>
    ));
  }

  return (
    <div className="col m2 genres-container">
      <div className="genres" style={{background: '#05144F', color: 'white', textAlign:'center', padding: '10px 0 10px 0'}}>
        <h5 style={{textTransform: 'uppercase'}}>genders</h5>
        {!genresResponse.loading && createGenres()}
      </div>
    </div>
  );
}
 
export default Genres;