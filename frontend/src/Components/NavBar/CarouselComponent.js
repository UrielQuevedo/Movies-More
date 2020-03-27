import React, { useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../Css/home.css";
import UseCustomAPI from '../../Hooks/UseCustomAPI';
import API from '../../Route/Api';
import UseLenguage from '../../Hooks/UseLenguage';

const CarouselComponent = ({title, genre}) => {
  const [response, executeAPI] = UseCustomAPI(null);
  const {loading , data: contentToExpose} = response;
  const [lenguage] = UseLenguage();

  useEffect(() => {
    executeAPI({ API: API, type: 'get', path: `/movies/genre/${genre}/17?lenguage=${lenguage()}`});
   },[]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
      partialVisibilityGutter : 38
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

  const carouselContent = () => {
    return contentToExpose.map( content => (
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
        <div className="carde" style={{width:'95%'}}>
          <div className="contenedor-imagen">
            <span className="explore-all-on-carousel">
              Explore All
            </span>
          </div>
        </div>
      </Carousel>
    );
  }

  {/* b92f34 color para de desuscripcion */}
  return (
    <>
      <div className="head-content head-response">
        <h5 style={{color: "#21FFE2", marginRight:'10px', marginBottom:'3px'}}>{title}</h5>
        <div className="head-explore-all">
          explore all
        </div>
        <div className="head-content-button">
          <button className="btn button-suscribe">suscribe</button>
        </div>
      </div>
      {/* PONER LOADING */}
      {contentToExpose && createCarousel()}
    </>
  );
}
 
export default CarouselComponent;