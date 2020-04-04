import React, { useState } from 'react';
import { useEffect } from 'react';
import { getGenres } from '../Route/Api';
import UseApi from '../Hooks/UseApi';
import { Link } from 'react-router-dom';
import UseSelectedGenre from '../Hooks/UseSelectedGenre';

const Genres = ({ content_genre, changeGenre }) => {
  const [genresResponse, getContentGenres] = UseApi([]);

  useEffect(() => {
    getContentGenres(getGenres(content_genre));
  }, [content_genre]);

  const createGenres = () => {
    //TODO No funciona el color
    return genresResponse.data.map((genre) => (
      <div 
        className="genre" 
        style={{textTransform: 'uppercase', color:'#21FFE2', marginBottom:'5px'}} 
        onClick={() => changeGenre(genre)}
      >
        {genre}  
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