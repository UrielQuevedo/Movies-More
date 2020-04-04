import React, { useEffect, useRef, useState } from 'react';
import GenreMobileNavbar from '../Components/NavBar/GenreMobileNavbar';
import {getGenres} from '../Route/Api';
import UseLenguage from '../Hooks/UseLenguage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import UseApi from '../Hooks/UseApi';
import Genres from '../Components/Genres';
import UsePagination from '../Hooks/UsePagination';

const Contents = ({ request, content_genre }) => {
  
  const [lenguage] = UseLenguage();
  const {t} = useTranslation();
  const [selectedGenre, setSelectedGenre] = useState("New Movies");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, contents, hasMore } = UsePagination('asd', pageNumber);

  const observer = useRef();
  const lastMovieRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(pageNumber + 1);
      }
    })
    if(node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const genre = new URLSearchParams(window.location.search).get('genre');
  }, [request])

  const createMovies = () => {
    return contents.map((movie, index) => {
      if (contents.length === index + 1) {
        return (
          <div ref={lastMovieRef} className="carde" style={{ width: '16.6%' }}>
            <div className="contenedor-imagen imagenes">
              <Link to={`/movies/${movie.uid}`} className="fade">
                <img className='imagen' loading='lazy' lazy="loaded" src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
              </Link>
            </div> 
            <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
              {movie.title}
            </div>
          </div>  
        );
      } else {
        return (
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
        );
      }
    });
  }

  {/* <GenreMobileNavbar /> */}
  return (
    <div className="row" style={{height:'100%'}}>
      <div className="col s12 m9 offset-m1">
        <div className="head-content">
          <h5 style={{color: "#21FFE2", textTransform:'capitalize', marginRight:'10px'}}>
            {selectedGenre}
          </h5>
        </div>
        <div className="container-items" style={{padding:'0px', margin:'0px'}}>
          { createMovies() }
        </div>
      </div>
      <Genres content_genre={content_genre} changeGenre={setSelectedGenre}/>
      <div>{loading && 'loading...'}</div>
      <div>{error && 'error...'}</div>
    </div>
   );
}
 
export default Contents;