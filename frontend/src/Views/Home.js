import React, { useEffect } from "react";
import { getMovies, getPrograms } from '../Route/Api';
import UseApi from "../Hooks/UseApi";
import UseLenguage from "../Hooks/UseLenguage";
import "../Css/home.css";
import { useTranslation } from 'react-i18next';
import CarouselComponent from "../Components/NavBar/CarouselComponent";
import { Link } from "react-router-dom";
import ViewGenericItemContent from "../Components/ViewGenericItemContent";

const Home = () => {
  const [language] = UseLenguage();
  const {t} = useTranslation();

  const [newMoviesResponse, getNewMovies] = UseApi([]);
  const [latestEpisodesResponse, getLatestEpisodesExecute] = UseApi([]);

  useEffect(() => {
    getNewMovies(getMovies('new', '1', language(), '21'));
    getLatestEpisodesExecute(getPrograms('new episodes', 1, language(), '21'));
  },[]);

  const moviesComponent = () => {
    return newMoviesResponse.data.map((movie) => (
      <ViewGenericItemContent content={movie} redirectPath={`/movies/${movie.uid}`} />
    ));
  }

  const episodesComponent = () => {
    return latestEpisodesResponse.data.map((episode) => (
      //TODO corregir el redictPath
      <ViewGenericItemContent content={episode} redirectPath='/programs/episode' type='new episodes' />
    ))
  }

  const createContent = (title, path, createComponents) => {
    return (
      <div>
        <div className="head-content">
          <h5 style={{color: "#21FFE2", marginRight:'10px'}}>{t(title)}</h5>
          <Link to={path}  style={{color: '#1ABC9C', fontSize:'11px', textTransform:'uppercase'}}>
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
      <div className="col s12 padding-content">
        <CarouselComponent title='Premiere' genre='premiere'/>
        <CarouselComponent title='SuperHeroes' genre='superheroes'/>
        <div style={{display:'flex', justifyContent:'center', margin:'10px 0 10px 0', paddingRight: '0.75rem'}}>
          <div className="card-subscription">
            {t('You can subscribe to different categories, trailer, series and you will be notified by email and on the page when there is something new, you can see your subscriptions on')} 
            <Link to='/mylist' style={{color:'#21ffe2', textTransform:'capitalize'}}> {t('my list')}</Link>
          </div>
        </div>
        {!newMoviesResponse.loading && createContent('New Movies', '/movies?genre=new', moviesComponent())}
        {!latestEpisodesResponse.loading && createContent('New Episodes', '/programs?genre=new episodes', episodesComponent())}
      </div>
    </div>
  );
};

export default Home;
