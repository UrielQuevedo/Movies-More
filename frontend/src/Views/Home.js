import React, { useEffect, useState } from "react";
import API from '../Route/Api';
import useCustomAPI from "../Hooks/UseCustomAPI";
import UseLenguage from "../Hooks/UseLenguage";
import "../Css/home.css";
import CarouselComponent from "../Components/NavBar/CarouselComponent";

const Home = () => {
  const [response, executeAPI] = useCustomAPI(null);
  const {loading: loadingMovie , data: movies, error: errorMovie} = response;
  const [lenguage] = UseLenguage();

   useEffect(() => {
    executeAPI({ API: API, type: 'get', path: `/movies/genre/action?page=1&range=21&lenguage=${lenguage()}` });
   },[]);

  const moviesComponent = () => {
    return movies.map( movie => (
      <div className="carde">
        <div className="contenedor-imagen imagenes">
          <div className="fade">
            <img className='imagen' loading='lazy' lazy="loaded" src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </div>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
          {movie.title}
        </div>
      </div>
    ));
  }

  //b92f34 color para de desuscripcion
  const createContent = (title) => {
    return (
      <div>
        <div className="head-content">
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
        <CarouselComponent title='Premiere' genre='premiere'/>
        <CarouselComponent title='SuperHeroes' genre='superheroes'/>
        <div style={{display:'flex', justifyContent:'center', margin:'10px 0 10px 0', paddingRight: '0.75rem'}}>
          <div className="card-subscription">
            You can subscribe to different categories, trailer, 
            series and you will be notified by email and on the page 
            when there is something new, you can see your subscriptions on 
            <span style={{color:'#21ffe2', textTransform:'capitalize'}}> my list</span>
          </div>
        </div>
        {movies && createContent('New Movies')}
        {movies && createContent('New Chapters')}
      </div>
    </div>
  );
};

export default Home;
