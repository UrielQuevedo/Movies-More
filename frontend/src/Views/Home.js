import React, { useEffect, useState } from "react";
import API from '../Route/Api';
import useCustomAPI from "../Hooks/UseCustomAPI";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UseLenguage from "../Hooks/UseLenguage";
import "../Css/home.css";

const Home = () => {
  const [response, executeAPI] = useCustomAPI(null);
  const {loading: loadingMovie , data: movies, error: errorMovie} = response;
  const [lenguage] = UseLenguage();
  const [showImage, setImage] = useState('sarasa');

   useEffect(() => {
    executeAPI({ API: API, type: 'get', path: `/movies/genre/action/21?lenguage=${lenguage()}` });
    const timer = setTimeout(() => {
      setImage('imagen');
    }, 500);
    return () => clearTimeout(timer);
   },[]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      partialVisibilityGutter: 40,
    },
  };

  const caroulsel = (title) => {
    return (
      <div>
        <div style={styleTitulo}>
          <h5 style={{color: "#21FFE2", marginRight:'10px'}}>{title}</h5>
          <div style={{color: '#1ABC9C', fontSize:'11px', textTransform:'uppercase'}}>
            explore all
          </div>
          <div style={styleButton}>
            <button className="btn" style={buttons}>suscribe</button>
          </div>
        </div>
        <Carousel
        draggable={false}
        customTransition="transform 750ms ease-in-out"
        slidesToSlide={6}
        responsive={responsive}
        infinite={false}
        deviceType="desktop"

        removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {moviesCarouserl()}
          <div className="carde">
            <div className="contenedor-imagen">
              <span style={styleSpan}>
                Explore All
              </span>
            </div>
          </div>
        </Carousel>
      </div>
    );
  }

  const styleSpan = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    color: '#ffff',
  }

  const moviesCarouserl = () => {
    //95% grande
    //
    return movies.map( movie => (
      <div className="carde" style={{width:'97%'}}>
        <div className="contenedor-imagen imagenes">
          <div className="fade">
            <img className='imagen' loading='lazy' src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </div>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500',marginTop:'5px', textAlign:'center' }}>
          {movie.title}
        </div>
      </div>
    ));
  }


  const moviesComponent = () => {
    return movies.map( movie => (
      <div className="carde">
        <div className="contenedor-imagen imagenes">
          <div className="fade">
            <img className='imagen' loading='lazy' src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </div>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
          {movie.title}
        </div>
      </div>
    ));
  }

  const styleTitulo = {
    display: 'flex',
    alignItems: 'baseline',
  }

  const styleButton = {
    flex: '1 0 auto',
    justifyContent: 'flex-end',
    display: 'flex',
  }

  const buttons = {
    background: 'rgb(243, 67, 53)',
    position: 'relative',
    right: '36px',
    borderRadius: '4px',
    bottom: '8px',
  }

  //b92f34 color para de desuscripcion
  const createContent = (title) => {
    return (
      <div>
        <div style={styleTitulo}>
          <h5 style={{color: "#21FFE2", marginRight:'10px'}}>{title}</h5>
          <div style={{color: '#1ABC9C', fontSize:'11px', textTransform:'uppercase'}}>
            explore all
          </div> 
        </div>
        <div className="container-items" style={{padding:'0px', margin:'0px'}}>
          {movies && moviesComponent()}
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col s12 offset-l1 l11" style={{padding:'0px', paddingLeft: '0.75rem'}}>
        {movies && caroulsel('Premiere')}
        {movies && caroulsel('SuperHeroes')}
        {movies && createContent('New Movies')}
        {movies && createContent('New Chapters')}
      </div>
    </div>
  );
};

export default Home;
