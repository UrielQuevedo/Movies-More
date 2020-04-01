import React, { useContext, useEffect } from 'react';
import GenreMobileNavbar from '../Components/NavBar/GenreMobileNavbar';
import {getContent} from '../Route/Api';
import UseLenguage from '../Hooks/UseLenguage';
import UseCustomAPI from '../Hooks/UseCustomAPI';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePagination from '../Hooks/UsePagination';

const Movies = () => {
  
  const [lenguage] = UseLenguage();
  const {t} = useTranslation();
  const [movies] = usePagination(getContent(`/movies/genre/new?page=1&range=30&language=${lenguage()}`));
  const [genres] = usePagination(getContent(`/genres/movies`));

  const createMovies = () => {
    return movies.map((movie) => (
      <div className="carde" style={{ width: '16.6%' }}>
        <div className="contenedor-imagen imagenes">
          <Link to={`/movies/${movie.uid}`} className="fade">
            <img className='imagen' loading='lazy' lazy="loaded" src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </Link>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
          {movie.title}
        </div>
      </div>
    ));
  }

  const createGenres = () => {
    return genres.map((genre) => (
      <div className="genre" style={{textTransform: 'uppercase', color:'#21FFE2', marginBottom:'5px'}}>
        {genre}
      </div>
    ));
  }

  {/* <GenreMobileNavbar /> */}
  return (
    <div className="row" style={{height:'100%'}}>
      <div className="col s12 m9 offset-m1">
        <div className="head-content">
          <h5 style={{color: "#21FFE2", marginRight:'10px'}}>{t('New Movies')}</h5>
        </div>
        <div className="container-items" style={{padding:'0px', margin:'0px'}}>
          {movies && createMovies()}
        </div>
      </div>
      <div className="col m2 genres-container">
        <div className="genres" style={{background: '#05144F', color: 'white', textAlign:'center', padding: '10px 0 10px 0'}}>
          <h5 style={{textTransform: 'uppercase'}}>genders</h5>
          <div style={{textTransform: 'uppercase', color:'#21FFE2', marginBottom:'5px'}}>
            new movie
          </div>
          {genres && createGenres()} 
        </div>
      </div>
    </div>
   );
}
 
export default Movies;