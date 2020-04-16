import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { getMovies, getPrograms } from '../Service/Api';
import UseApi from "../Hooks/UseApi";
import UseLenguage from "../Hooks/UseLenguage";
import "../Css/home.css";
import { useTranslation } from 'react-i18next';
import CarouselComponent from "../Components/NavBar/CarouselComponent";
import ViewGenericItemContent from "../Components/ViewGenericItemContent";

const Home = () => {
  const [language] = UseLenguage();
  const {t} = useTranslation();
  const [{ data: movies, loading: movies_loading }, getNewMovies] = UseApi([]);
  const [{ data: episodes, loading: episodes_loading}, getLatestEpisodesExecute] = UseApi([]);

  useEffect(() => {
    getNewMovies(getMovies('new', '1', language(), '21'));
    getLatestEpisodesExecute(getPrograms('new episodes', 1, language(), '21'));
  },[]);

  const moviesComponent = () => {
    return movies.map(({uid, ...movie}) => (
      <ViewGenericItemContent key={uid} content={movie} redirectPath={`/movies/${uid}`} classStyle="card-content-home-view" />
    ));
  }

  const episodesComponent = () => {
    return episodes.map((episode, index) => (
      //TODO corregir el redictPath
      <ViewGenericItemContent key={index} content={episode} classStyle="card-content-home-view" redirectPath={`/programs/${episode.program_uid}/season/${episode.season_number}/episode/${episode.episode_number}`} type='new episodes' />
    ))
  }

  const Content = ({ title, path, createComponents }) => {
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
  Content.propTypes = {
    'title': PropTypes.string.isRequired,
    'path': PropTypes.string.isRequired,
    'createComponents': PropTypes.arrayOf(PropTypes.element),
  }

  return (
    <div className="row">
      <div className="col s12 padding-content">
        <CarouselComponent title='Premiere' genre='premiere'/>
        <CarouselComponent title='SuperHeroes' genre='superheroes'/>
        <div style={{display:'flex', justifyContent:'center', margin:'10px 0 10px 0', paddingRight: '0.75rem'}}>
          <div className="card-subscription">
            {t('You can subscribe to different categories, trailer, series and you will be notified by email and on the page when there is something new, you can see your subscriptions on')} 
            <div>
              <Link to='/mylist' style={{color:'#21ffe2', textTransform:'capitalize'}}> {t('my list')}</Link>
            </div>
          </div>
        </div>
        { !movies_loading && <Content title='New Movies' path='/movies?genre=new' createComponents={moviesComponent()} /> }
        { !episodes_loading && <Content title='New Episodes' path='/programs?genre=new episodes' createComponents={episodesComponent()} /> }
      </div>
    </div>
  );
};

export default Home;
