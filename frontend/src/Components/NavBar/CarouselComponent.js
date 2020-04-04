import React, { useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//TODO Sacar home.css
import "../../Css/home.css";
import { getMovies, getSuscribes } from '../../Route/Api';
import UseLenguage from '../../Hooks/UseLenguage';
import { useTranslation } from 'react-i18next';
import UseApi from '../../Hooks/UseApi';
import { Link } from 'react-router-dom';
import { suscribeGenre, unsuscribeGenre } from '../../Route/ApiAuth';

const CarouselComponent = ({title, genre}) => {
  const [contentResponse, getContent] = UseApi([]);
  const [suscribesResponse, getUserSuscribe] = UseApi([]);
  //TODO hacer que no sean con [] si no {}
  const [_, sendSuscribeGenre] = UseApi();
  //TODO ver si se puede hacer que no sea un hook si no una funcion auxiliar y que retorne o no lo que se necesite
  const [__, sendUnsuscribeGenre] = UseApi();
  const [lenguage] = UseLenguage();
  const {t} = useTranslation();

  useEffect(() => {
    getContent(getMovies(genre, 1, lenguage(), 17));
    //TODO estoy repitiendo el windows.localStorage.getItem(uid)
    //getUserSuscribe(getSuscribes('genres', window.localStorage.getItem('uid')));
   },[]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
      partialVisibilityGutter : 41
    },
    tablet: {
      breakpoint: { max: 1024, min: 641 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter : 10
    },
    mobile: {
      breakpoint: { max: 641, min: 0 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter : 6,
    },
  };

  const suscribeToGenre = () => {
    //TODO se repide el uid localstorage
    const uid = window.localStorage.getItem('uid');
    sendSuscribeGenre(suscribeGenre('genres', genre, uid));
  }

  const unsuscribeToGenre = () => {
    const uid = window.localStorage.getItem('uid');
    sendUnsuscribeGenre(unsuscribeGenre('genres', genre, uid));
  }

  const carouselContent = () => {
    return contentResponse.data.map( content => (
      <div className="carde" style={{width:'95%'}}>
        <div className="contenedor-imagen imagenes">
          <div className="fade">
            <img className='imagen' loading='lazy' src={content.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </div>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500',marginTop:'5px', textAlign:'center' }}>
          {content.title}
        </div>
      </div>
    ));
  }

  const createCarousel = () => {
    return (
      <Carousel
        draggable={false}
        sensible={6}
        customTransition="transform 700ms cubic-bezier(0.46, 0.03, 0.52, 0.96)"
        responsive={responsive}
        infinite={false}
        minimalTouchDrag={10000}
        partialVisible={true}
        deviceType="desktop"
        removeArrowOnDeviceType={["mobile"]}
      >
        {carouselContent()}
        <Link to={`/movies?genre=${genre}`} className="carde" style={{width:'95%'}}>
          <div className="contenedor-imagen">
            <span className="explore-all-on-carousel">
              Explore All
            </span>
          </div>
        </Link>
      </Carousel>
    );
  }

  {/* b92f34 color para de desuscripcion */}
  return (
    <div>
      <div className="head-content head-response">
        {console.log(suscribesResponse.data)}
        <h5 style={{color: "#21FFE2", marginRight:'10px', marginBottom:'3px'}}>{t(title)}</h5>
        <Link to={`/movies?genre=${genre}`} className="head-explore-all">
          {t('explore all')}
        </Link>
        <div className="head-content-button">
          <button className="btn button-suscribe" onClick={() => suscribeToGenre()}>{t('suscribe')}</button>
        </div>
      </div>
      {/* PONER LOADING */}
      {!contentResponse.loading && createCarousel()}
    </div>
  );
}
 
export default CarouselComponent;