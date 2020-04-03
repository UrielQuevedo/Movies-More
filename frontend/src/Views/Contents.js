import React, { useContext, useEffect, useRef } from 'react';
import GenreMobileNavbar from '../Components/NavBar/GenreMobileNavbar';
import {getGenres} from '../Route/Api';
import UseLenguage from '../Hooks/UseLenguage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePagination from '../Hooks/UsePagination';
import { useCallback } from 'react';
import UseApi from '../Hooks/UseApi';

const Contents = ({ request, content_genre }) => {
  
  const [lenguage] = UseLenguage();
  const {t} = useTranslation();
  const [moviesResponse, getContents] = UseApi([]);
  const [genresResponse, getContentGenres] = UseApi([]);

  // const observer = useRef();
  // const lastMovieRef = useCallback(node => {
  //   if (observer.current) new IntersectionObserver(entries => {
  //     if(entries[0].isIntersecting) {
  //       console.log('visible');
  //     }
  //   })
  //   if(node) observer.current.observe(node);
  // });

  useEffect(() => {
    const genre = new URLSearchParams(window.location.search).get('genre');
    getContents(request(genre, 1, lenguage(), '30'));
    getContentGenres(getGenres(content_genre));
  }, [request, content_genre])

  const createMovies = () => {
    return moviesResponse.data.map((movie, index) => (
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
    return genresResponse.data.map((genre) => (
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
          {
            !moviesResponse.loading && createMovies()
          }
        </div>
      </div>
      <div className="col m2 genres-container">
        <div className="genres" style={{background: '#05144F', color: 'white', textAlign:'center', padding: '10px 0 10px 0'}}>
          <h5 style={{textTransform: 'uppercase'}}>genders</h5>
          <div style={{textTransform: 'uppercase', color:'#21FFE2', marginBottom:'5px'}}>
            new movie
          </div>
          {!genresResponse.loading && createGenres()} 
        </div>
      </div>
    </div>
   );
}
 
export default Contents;