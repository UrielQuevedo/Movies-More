import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getMovie, getMovies } from '../Route/Api';

const Movie = () => {
  const movieId = useParams().id;
  const [movie, setMovie] = useState({
    genres: [],
  });

  useEffect(() => {
    getMovie(movieId)
      .then((response) => setMovie(response))
  }, [])

  const parseHoures = (minutes) => {
    let mintesParser = minutes;
    let hores = 0;

    while (mintesParser > 60) {
      mintesParser = mintesParser -  60;
      hores = hores + 1;
    }

    return hores === 0 ? mintesParser + "min" : hores + "h " + mintesParser + "min";
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
    return movie.genres.map((genre) => (
      <span style={{color:'#21FFE2', textTransform:'capitalize'}} >
        {genre}<span style={{color:'#ffff'}}>, </span>
      </span>
    ))
  }

  return (
    <div className="container">
      <div style={{position:'relative'}}>
        <div className="container-backdrop">
          <img src={movie.backdrop_url} className="backdrop-image" width='100%' alt=""/>
        </div>
          <h5 style={{color: '#FFFFFF', position:'absolute', bottom:'0', transform:'translate(23px, -36px)'}}>
            {movie.title}
          </h5>
          <div style={{color:'#AFA9A9', position:'absolute', left:'2.2%', bottom:'3%'}}>
            <span style={{marginRight:'20px'}}>2019</span>
            <span>{parseHoures(movie.runtime)}</span>
          </div>
        </div>
      <div className="row" style={{margin:'0'}}>
        <div className="col s4" style={{ textAlign:'center', background:'#010B31', textTransform:'uppercase', color:'#ffff', fontWeight: '600', padding: '12px 0 12px 0', borderTop:'2px solid', fontSize: '18px' }}>
          overview
        </div>
        <div className="col s4" style={{ textAlign:'center', textTransform:'uppercase', color:'#AFA9A9', fontWeight: '600', padding: '12px 0 12px 0', cursor:'pointer', fontSize: '18px' }}>
          view
        </div>
        <div className="col s4" style={{ textAlign:'center', textTransform:'uppercase', color:'#AFA9A9', fontWeight: '600', padding: '12px 0 12px 0', cursor:'pointer', fontSize: '18px' }}>
          trailer
        </div>
      </div>

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
              <div style={{flex:'1'}}>Runtime</div> <div style={{flex:'6'}}>{parseHoures(movie.runtime)}</div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:'1'}}>Genres</div> <div style={{flex:'6'}}>{createGenres()}</div>
            </div>
            {createStars()}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Movie;