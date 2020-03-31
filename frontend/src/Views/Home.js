import React, { useEffect, useState } from "react";
import API from '../Route/Api';
import useCustomAPI from "../Hooks/UseCustomAPI";
import UseLenguage from "../Hooks/UseLenguage";
import "../Css/home.css";
import { useTranslation } from 'react-i18next';
import CarouselComponent from "../Components/NavBar/CarouselComponent";
import { Link } from "react-router-dom";

const Home = () => {
  const [responsePremiere_movies, getPremiere_movies] = useCustomAPI(null);
  const {data: premiere_movies} = responsePremiere_movies;
  
  const [responseSuperheroes_movies, getSuperheroes_movies] = useCustomAPI(null);
  const {data: superheroes_movies} = responseSuperheroes_movies;
  
  const [responseNew_movies, getNewMovies] = useCustomAPI(null);
  const {data: new_movies} = responseNew_movies;
  
  const [responseLatest_episodes, getLatestEpisodes] = useCustomAPI(null);
  const {data: latest_episodes} = responseLatest_episodes;

  const [lenguage] = UseLenguage();
  const {t} = useTranslation();

  useEffect(() => {
    getNewMovies({ API: API, type: 'get', path: `/movies/genre/new?page=1&range=21&language=${lenguage()}` });
    getLatestEpisodes({ API: API, type: 'get', path: `/programs/episodes/latest?page=1&range=21&language=${lenguage()}` });
    getPremiere_movies({ API: API, type: 'get', path: `/movies/genre/premiere?page=1&range=17&language=${lenguage()}` });
    getSuperheroes_movies({ API: API, type: 'get', path: `/movies/genre/superheroes?page=1&range=17&language=${lenguage()}` });
  },[]);

  const moviesComponent = () => {
    return new_movies.map((movie) => (
      <div className="carde">
        <div className="contenedor-imagen imagenes">
          <Link to={`/movies/${movie.uid}`} className="fade">
            <img className='imagen' loading='lazy' lazy="loaded" src={movie.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
          </Link>
        </div> 
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
          {movie.title}
        </div>
      </div>
    ));
  }

  const episodesComponent = () => {
    return latest_episodes.map((episode) => (
      <div className="carde">
        <div className="contenedor-imagen imagenes">
          <div className="fade">
            <img src={episode.season_poster_url} alt={`Imagen de la temporada ${episode.season_number} de la serie ${episode.program_title}`} width="200" height="325" className="imagen"/>
          </div>
        </div>
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
          {episode.program_title}
          <p>
            E{episode.episode_number}xS{episode.season_number}
          </p>
        </div>
      </div>
    ))
  }

  //b92f34 color para de desuscripcion
  const createContent = (title, content, createComponents) => {
    return (
      <div>
        <div className="head-content">
          <h5 style={{color: "#21FFE2", marginRight:'10px'}}>{t(title)}</h5>
          <Link to={`/${content}?genre=new&page=1`}  style={{color: '#1ABC9C', fontSize:'11px', textTransform:'uppercase'}}>
            {t('explore all')}
          </Link> 
        </div>
        <div className="container-items" style={{padding:'0px', margin:'0px'}}>
          {createComponents}
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
            {t('You can subscribe to different categories, trailer, series and you will be notified by email and on the page when there is something new, you can see your subscriptions on')} 
            <span style={{color:'#21ffe2', textTransform:'capitalize'}}> {t('my list')}</span>
          </div>
        </div>
        {new_movies && createContent('New Movies', 'movies', moviesComponent())}
        {latest_episodes && createContent('New Episodes', 'programs/episodes', episodesComponent())}
      </div>
    </div>
  );
};

export default Home;
