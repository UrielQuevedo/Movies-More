import React, { useEffect, useRef, useState } from 'react';
import GenreMobileNavbar from '../Components/NavBar/GenreMobileNavbar';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import Genres from '../Components/Genres';
import UsePagination from '../Hooks/UsePagination';
import ViewItemContent from '../Components/ViewItemContent';
import ViewGenericItemContent from '../Components/ViewGenericItemContent';
import Preloader from '../Components/Preloader';
import UseApi from '../Hooks/UseApi';
import { getSuscribes } from '../Route/Api';
import { suscribeGenre, unsuscribeGenre } from '../Route/ApiAuth';
import ButtonSuscribe from '../Components/ButtonSuscribe';

const Contents = ({ content_ref }) => {
  const {t} = useTranslation();
  const [pageNumber, setPageNumber] = useState(1);
  const genre = new URLSearchParams(window.location.search).get('genre');
  const { loading, contents, hasMore } = UsePagination(content_ref, genre, pageNumber);
  const [ isSuscribe, setIsSuscribe ] = useState();
  const [_, suscribeRequest] = UseApi();

  useEffect(() => {
    getSuscribes('genres', window.localStorage.getItem('uid'))
      .then(response =>  {
        setIsSuscribe(response.includes(genre));
      });
    setPageNumber(1);
  }, [content_ref])

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

  const suscribeToGenre = () => {
    //TODO se repide el uid localstorage
    const uid = window.localStorage.getItem('uid');
    suscribeRequest(suscribeGenre('genres', genre, uid));
    setIsSuscribe(true);
  }

  const createMovies = () => {
    return contents.map((content, index) => 
      (contents.length === index + 1) ?
        //TODO Corregir redirectPath
        <ViewGenericItemContent type={genre} content={content} redirectPath='/movies' cardStyle={{width: '16.6%'}} reference={lastMovieRef} />
        :
        <ViewGenericItemContent type={genre} content={content} redirectPath='/movies' cardStyle={{width: '16.6%'}} />
    );
  }

  const suscriptionComponent = () => {
    return (
      <div>
        Pero puedes suscribirte en este genero, y te notificaremos cuando se publique algo nuevo.
        <div style={{marginTop:'5px', color: '#FF0000', textDecoration:'underline'}}>
          <span 
            style={{display:'inline-block', cursor:'pointer', borderBottom:'1px solid red', paddginBottom:'2px'}}
            onClick={() => suscribeToGenre(true)}
          >
            Suscribirse
          </span>
        </div>
      </div>
    );
  }

  const alertNotMoreContent = () => {
    return (
      <div className="col-12" style={{ marginBottom: '20px', display:'flex', justifyContent:'center'}}>
        <div style={{ width:'60%', borderBottom:'1px solid #F34335', background:'#020F43', color:'#FAEBD7', padding: '20px', textAlign:'center', fontSize:'20px' }}>
          No contamos con mas contenido por el momento  {`:'(`}
          { genre !== 'new' && genre !== 'new episodes' &&  (
              isSuscribe  ? 
              <div> Te notificaremos cuando haya algo nuevo. </div> 
              : 
              suscriptionComponent()
            )
          }
        </div>  
      </div>
    );
  }

  {/* <GenreMobileNavbar /> */}
  return (
    <div className="row" style={{height:'100%'}}>
      <div className="col s12 m9 offset-m1">
        <div className="head-content">
          <h5 style={{color: "#21FFE2", textTransform:'capitalize', marginRight:'10px'}}>
            { genre === 'new' ? 'new ' + content_ref : genre }
          </h5>
        </div>
        <ButtonSuscribe genre={genre} />
        <div className="container-items" style={{padding:'0px', margin:'0px'}}>
          { createMovies(genre) }
        </div>
        { 
          loading && 
          <div className="col-12" style={{color: 'white'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
              <Preloader color="spinner-red-only" />
            </div>
          </div> 
        }
        { !hasMore && !loading  &&  alertNotMoreContent() }
      </div>
      <Genres content_ref={content_ref} /> 
    </div>
   );
}
 
export default Contents;