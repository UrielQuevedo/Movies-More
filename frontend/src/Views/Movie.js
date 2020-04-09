import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getMovie } from '../Route/Api';
import UseApi from '../Hooks/UseApi';

const Movie = () => {
  const [ response, executeRequest ] = UseApi();
  const { loading, data: movie } = response;
  const movieUid = useParams().id;
  const [ isOverview, setIsOverview ] = useState();
  const [ isView, setIsView ] = useState();
  const [ isTrailer, setIsTrailer ] = useState();

  useEffect(() => {
    setIsOverview(true);
    executeRequest(getMovie(movieUid));
  }, [])

  //TODO si son 0 minutos, que se muestre solo la hora
  const timeConvert = (_minutes) => {
    const hours = (_minutes / 60);
    const rhours = Math.floor(hours);
    const minutes = Math.round((hours - rhours) * 60);
    return rhours + "h " + minutes + "min";
  }

  const createStars = () => {
    return (
      <div class="stars">
        <div>vote</div>
        <form action="">
          <input class="star star-5" id="star-5" type="radio" name="star"/>
          <label class="star star-5" for="star-5"></label>
          <input class="star star-4" id="star-4" type="radio" name="star"/>
          <label class="star star-4" for="star-4"></label>
          <input class="star star-3" id="star-3" type="radio" name="star"/>
          <label class="star star-3" for="star-3"></label>
          <input class="star star-2" id="star-2" type="radio" name="star"/>
          <label class="star star-2" for="star-2"></label>
          <input class="star star-1" id="star-1" type="radio" name="star"/>
          <label class="star star-1" for="star-1"></label>
        </form>
      </div>
    );
  }

  const createGenres = () => {
    return movie.genres.map((genre, index) => (
      <span style={{color:'#21FFE2', textTransform:'capitalize'}} >
        {genre}
        { (movie.genres.length - 1) !== index && <span style={{color:'#ffff'}}>, </span> }
      </span>
    ))
  }

  const changeView = (setVisualView) => {
    setIsOverview(false);
    setIsTrailer(false);
    setIsView(false);
    setVisualView(true);
  }

  const isSelected = (isVisualViewSelected) => {
    return isVisualViewSelected ? 'navigation-bar-movie-selected' : 'navigation-bar-movie';
  }

  const buttonNavigation = () => {
    return (
      <div className="row" style={{margin:'0'}}>
        <div
          className={"col s4 " + isSelected(isOverview)}
          onClick={ () => changeView(setIsOverview)}
        >
          overview
        </div>
        <div
          className={"col s4 " + isSelected(isView)}
          onClick={ () => changeView(setIsView) }
        >
          view
        </div>
        <div
          className={"col s4 " + isSelected(isTrailer)}
          onClick={ () => changeView(setIsTrailer) }
        >
          trailer
        </div>
      </div>
    );
  }

  const overview = () => {
    return (
      <div className="row"  style={{color:'#ffff', background:'#010B31', padding:'25px'}}>
        <div className="col s12 m3" style={{margin: '0 49px 0 28px'}}>
          <img src={movie.poster_url} alt=""/>
        </div>
        <div>
          <div>
            <div style={{fontSize:'20px', marginBottom:'10px'}}>
              Storyline
            </div>
          </div>
          <div style={{marginBottom:'12px'}}>
            {movie.overview}
          </div>
          <div className="row">
            <div style={{display:'flex'}}>
              <div style={{flex:'1'}}>Released</div> <div style={{flex:'6'}}>23 October 2019</div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:'1'}}>Director</div> <div style={{flex:'6'}}>{movie.director}</div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:'1'}}>Runtime</div> <div style={{flex:'6'}}>{timeConvert(movie.runtime)}</div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:'1'}}>Genres</div> <div style={{flex:'6'}}>{createGenres()}</div>
            </div>
            {createStars()}
          </div>
        </div>
      </div>
    );
  }

  const view = () => {
    return (
      <div>
        No esta terminado la vista para ver.
      </div>
    );
  }

  const trailer = () => {
    return (
      <div>
        No esta terminado la vista de trailers.
      </div>
    );
  }


  return (
    <div className="container">
      { !loading &&
        <>
        <div style={{position:'relative'}}>
          <div className="container-backdrop">
            <img src={movie.backdrop_url} className="backdrop-image" width='100%' alt=""/>
          </div>
          <h5 style={{color: '#FFFFFF', position:'absolute', bottom:'0', transform:'translate(23px, -36px)'}}>
            {movie.title}
          </h5>
          <div style={{color:'#AFA9A9', position:'absolute', left:'2.2%', bottom:'3%'}}>
            <span style={{marginRight:'20px'}}>2019</span>
            <span>{timeConvert(movie.runtime)}</span>
          </div>
        </div>
        { buttonNavigation() }
        { isOverview &&  overview() }
        { isView && view() }
        { isTrailer && trailer() }
        </>
      }
    </div>
  );
}

export default Movie;