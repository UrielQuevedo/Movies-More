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
import ViewItemContent from '../Components/ViewItemContent';

const Contents = ({ request, content_genre }) => {
  
  const [lenguage] = UseLenguage();
  const {t} = useTranslation();
  const [selectedGenre, setSelectedGenre] = useState("New Movies");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, contents, hasMore } = UsePagination('asd', pageNumber);

  // useEffect(() => {
  //   const genre = new URLSearchParams(window.location.search).get('genre');
  // }, [request])

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

  const createMovies = () => {
    return contents.map((movie, index) => 
      (contents.length === index + 1) ?
        <ViewItemContent content={movie} redirectPath='/movies' cardStyle={{width: '16.6%'}} reference={lastMovieRef} />
        :
        <ViewItemContent content={movie} redirectPath='/movies' cardStyle={{width: '16.6%'}} />
    );
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