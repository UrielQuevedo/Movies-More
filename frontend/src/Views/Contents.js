import React, { useEffect, useRef, useState } from 'react';
import GenreMobileNavbar from '../Components/NavBar/GenreMobileNavbar';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import Genres from '../Components/Genres';
import UsePagination from '../Hooks/UsePagination';
import ViewGenericItemContent from '../Components/ViewGenericItemContent';
import Preloader from '../Components/Preloader';
import ButtonSuscribe from '../Components/ButtonSuscribe';
import UseSuscribe from '../Hooks/UseSuscribe';

const Contents = ({ content_ref }) => {
  const {t} = useTranslation();
  const [pageNumber, setPageNumber] = useState(1);
  const genre = new URLSearchParams(window.location.search).get('genre');
  const { loading, contents, hasMore } = UsePagination(content_ref, genre, pageNumber);
  const { isSuscribe, suscribeToGenre } = UseSuscribe({genre: genre, type_content: `${content_ref}_genres`});

  useEffect(() => {
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

  const createMovies = () => {
    return contents.map((content, index) => 
      (contents.length === index + 1) ?
        //TODO Corregir redirectPath
        <ViewGenericItemContent type={genre} content={content} redirectPath={`/${content_ref}/${content.uid}`} classStyle="card-content-view" reference={lastMovieRef} />
        :
        <ViewGenericItemContent type={genre} content={content} redirectPath={`/${content_ref}/${content.uid}`} classStyle="card-content-view" />
    );
  }

  const suscriptionComponent = () => {
    return (
      <div>
        Pero puedes suscribirte en este genero, y te notificaremos cuando se publique algo nuevo.
        <div style={{marginTop:'5px', color: '#FF0000', textDecoration:'underline'}}>
          <span
            style={{display:'inline-block', cursor:'pointer', borderBottom:'1px solid red', paddginBottom:'2px'}}
            //TODO NO ANDA BIEN FIJATE
            onClick={() => suscribeToGenre()}
          >
            Suscribirse
          </span>
        </div>
      </div>
    );
  }

  const alertNotMoreContent = () => {
    return (
      <div className="col-12" style={{ marginBottom: '20px', marginTop:'20px', display:'flex', justifyContent:'center', paddingRight:'0.75rem'}}>
        <div className="alert-content">
          No contamos con mas contenido por el momento  {`:'(`}
          { genre !== 'new' && genre !== 'new episodes' &&  (
              isSuscribe ?
              <div> Te notificaremos cuando haya algo nuevo. </div>
              :
              suscriptionComponent()
            )
          }
        </div>
      </div>
    );
  }

  return (
    <>
    <GenreMobileNavbar />
    <div className="padding-content content-container" >
      <div className="contents-items" >
        <div className="head-content">
          <h5 style={{color: "#21FFE2", textTransform:'capitalize', marginRight:'10px'}}>
            { genre === 'new' ? 'new ' + content_ref : genre }
          </h5>
        </div>
        { genre !== 'new' && genre !== 'new episodes' && <ButtonSuscribe genre={genre} type_content={content_ref + "_genres"} />}
        <div className="container-items" style={{ padding:'0px', margin:'0px'}}>
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
    </>
  );
}

export default Contents;