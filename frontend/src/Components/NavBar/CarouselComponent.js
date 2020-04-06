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
import { useState } from 'react';
import ViewItemContent from '../ViewItemContent';

const CarouselComponent = ({title, genre}) => {
  const [contentResponse, getContent] = UseApi([]);
  const [suscribesResponse, getUserSuscribe] = UseApi([]);
  //TODO hacer que no sean con [] si no {}
  const [_, sendSuscribeGenre] = UseApi();
  //TODO ver si se puede hacer que no sea un hook si no una funcion auxiliar y que retorne o no lo que se necesite
  const [__, sendUnsuscribeGenre] = UseApi();
  const [isSuscribe, setIsSuscribe] = useState();
  const [lenguage] = UseLenguage();
  const {t} = useTranslation();

  useEffect(() => {
    getContent(getMovies(genre, 1, lenguage(), 17));
    //TODO estoy repitiendo el windows.localStorage.getItem(uid)
    getSuscribes('genres', window.localStorage.getItem('uid'))
      .then(response =>  {
        setIsSuscribe(response.includes(genre));
      })
      //TODO estoy repitiendo para saber si esta subscrito o no
    //setIsSuscribe(suscribesResponse.data.includes(genre));
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

  //TODO suscribe y unsuscribe se repite en contents.js

  const suscribeToGenre = () => {
    //TODO se repide el uid localstorage
    const uid = window.localStorage.getItem('uid');
    sendSuscribeGenre(suscribeGenre('genres', genre, uid));
    setIsSuscribe(true);
  }

  const unsuscribeToGenre = () => {
    const uid = window.localStorage.getItem('uid');
    sendUnsuscribeGenre(unsuscribeGenre('genres', genre, uid));
    setIsSuscribe(false);
  }

  const button = (action, title, color) => {
    return (
      <div className="head-content-button">
        <button className="btn button-suscribe" style={{ background: color }} onClick={() => action()}>{t(title)}</button>
      </div>
    );
  }

  const carouselContent = () => {
    return contentResponse.data.map((content) => (
      <ViewItemContent content={content} redirectPath={`/movies/${content.uid}`} cardStyle={{ width:'95%' }}/>
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
        <Link to={`/movies?genre=${genre}`}>
          <div className="carde explore-all">
            <div className="contenedor-imagen">
              <span className="explore-all-on-carousel">
                Explore All
              </span>
            </div>
          </div>
        </Link>
      </Carousel>
    );
  }

  return (
    <div>
      <div className="head-content head-response">
        <h5 style={{color: "#21FFE2", marginRight:'10px', marginBottom:'3px'}}>{t(title)}</h5>
        <Link to={`/movies?genre=${genre}`} className="head-explore-all">
          {t('explore all')}
        </Link>
        {isSuscribe ? button(unsuscribeToGenre, 'unsuscribe', '#77191c') : button(suscribeToGenre, 'suscribe', '#f34335')}
      </div>
      {/* PONER LOADING */}
      {!contentResponse.loading && createCarousel()}
    </div>
  );
}
 
export default CarouselComponent;