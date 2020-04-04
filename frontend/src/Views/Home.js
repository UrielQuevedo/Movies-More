import React, { useEffect } from "react";
import { getMovies, getPrograms } from '../Route/Api';
import UseApi from "../Hooks/UseApi";
import UseLenguage from "../Hooks/UseLenguage";
import "../Css/home.css";
import { useTranslation } from 'react-i18next';
import CarouselComponent from "../Components/NavBar/CarouselComponent";
import { Link } from "react-router-dom";
import ViewItemContent from "../Components/ViewItemContent";

const Home = () => {
  const [language] = UseLenguage();
  const {t} = useTranslation();

  const [newMoviesResponse, getNewMovies] = UseApi([]);
  const [latestEpisodesResponse, getLatestEpisodesExecute] = UseApi([]);

  useEffect(() => {
    getNewMovies(getMovies('new', '1', language(), '21'));
    getLatestEpisodesExecute(getPrograms('latest_episodes', 1, language(), '21'));
  },[]);

  const moviesComponent = () => {
    return newMoviesResponse.data.map((movie) => (
      <ViewItemContent content={movie} redirectPath='/movies' />
    ));
  }

  const episodesComponent = () => {
    return latestEpisodesResponse.data.map((episode) => (
      <div className="carde">
        <div className="contenedor-imagen imagenes">
          <Link className="fade">
            <img src={episode.es_season_poster_url} alt="" width="200" height="325" className="imagen"/>
          </Link>
        </div>
        <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
          {episode.es_program_title}
          <p style={{margin:'0', color:'#FAEBD7'}}>
            E0{episode.episode_number}xS0{episode.season_number}
          </p>
        </div>
      </div>
    ))
  }

  //b92f34 color para de desuscripcion
  const createContent = (title, path, genre, createComponents) => {
    return (
      <div>
        <div className="head-content">
          <h5 style={{color: "#21FFE2", marginRight:'10px'}}>{t(title)}</h5>
          <Link to={`/${path}?genre=${genre}`}  style={{color: '#1ABC9C', fontSize:'11px', textTransform:'uppercase'}}>
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
      <div className="col s12 home">
        <CarouselComponent title='Premiere' genre='premiere'/>
        <CarouselComponent title='SuperHeroes' genre='superheroes'/>
        <div style={{display:'flex', justifyContent:'center', margin:'10px 0 10px 0', paddingRight: '0.75rem'}}>
          <div className="card-subscription">
            {t('You can subscribe to different categories, trailer, series and you will be notified by email and on the page when there is something new, you can see your subscriptions on')} 
            <Link to='/mylist' style={{color:'#21ffe2', textTransform:'capitalize'}}> {t('my list')}</Link>
          </div>
        </div>
        {!newMoviesResponse.loading && createContent('New Movies', 'movies', 'new', moviesComponent())}
        {!latestEpisodesResponse.loading && createContent('New Episodes', 'programs', 'latest_episodes', episodesComponent())}
      </div>
    </div>
  );
};

export default Home;
