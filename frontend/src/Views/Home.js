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
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      partialVisibilityGutter: 40,
    },
  };

  const caroulsel = (title) => {
    return (
      <div>
        <h5 style={{color: "#21FFE2"}}>{title}</h5>
        <Carousel
        slidesToSlide={6}
        responsive={responsive}
        infinite={false}
        deviceType="desktop"

        removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {moviesCarouserl()}
        </Carousel>
      </div>
    );
  }

  const moviesCarouserl = () => {
    //174px
    return movies.map( movie => (
      <div className="" style={{width:'91px'}}>
        <div className="contenedor-imagen imagenes">
          <div className="fade">
            <img className='imagen' loading='lazy' src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </div>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', textAlign:'center' }}>
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
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', textAlign:'center' }}>
          {movie.title}
        </div>
      </div>
    ));
  }

  const styleButton = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '62px',
    transform: 'translateY(27px)',
    alignSelf: 'end',
  }

  //b92f34 color para de desuscripcion
  const createContent = (title) => {
    return (
      <div>
        <div className="row" style={{padding:'0px', margin:'0px'}}>
          <h5 style={{color: "#21FFE2"}} className="col s1">{title}</h5>
          <span className="col s1" style={{color: '#1ABC9C', fontSize:'11px', textTransform:'uppercase', transform:'translateY(53px)'}}>explore all</span>
          <div style={styleButton}>
            <button className="btn" style={{background:'#F34335'}}>suscribe</button>
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
      <div className="col s12 offset-m1 m11">
        {movies && caroulsel('Premiere')}
        {movies && caroulsel('SuperHeroes')}
        {movies && createContent('New Movies')}
        {movies && createContent('New Chapters')}
      </div>
    </div>
  );
};

export default Home;
