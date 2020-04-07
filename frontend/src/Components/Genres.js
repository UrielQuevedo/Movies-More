import React from 'react';
import { useEffect } from 'react';
import { getGenres } from '../Route/Api';
import UseApi from '../Hooks/UseApi';

const Genres = ({ content_ref }) => {
  const [genresResponse, getContentGenres] = UseApi([]);

  useEffect(() => {
    getContentGenres(getGenres(content_ref));
  }, [content_ref]);

  const genreComponent = (genre, style) => {
    return (
      <div className={style} style={{padding:'5px', verticalAlign:'middle'}}>
        { genre === 'new' ? 'new ' + content_ref : genre }
      </div>
    );
  }

  const redirect_to_genre = (genre) => {
    return (
      <a href={`/${content_ref}?genre=${genre}`}>
        {genreComponent(genre, 'genre')}
      </a>
    );
  }

  const createGenres = () => {
    return genresResponse.data.map((genre) => (
      (genre ===  new URLSearchParams(window.location.search).get('genre')) ? genreComponent(genre, 'genre-selected') : redirect_to_genre(genre))
    );
  }

  return (
    <div className="div2 genres-container hide-on-med-and-down" style={{paddingLeft:'0px', width:'15%'}}>
      <div className="genres" style={{background: '#05144F', color: 'white', textAlign:'center', padding: '10px 0 10px 0'}}>
        <h5 style={{textTransform: 'uppercase', color:'#FAEBD7'}}>genders</h5>
        <div className="divider-genre"></div>
        {!genresResponse.loading && createGenres()}
      </div>
    </div>
  );
}
 
export default Genres;