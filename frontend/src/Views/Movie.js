import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { getMovie, getComments, sendComment } from '../Service/Api';
import UseApi from '../Hooks/UseApi';
import { useForm } from 'react-hook-form';
import { BasicUserInfoContext } from '../Hooks/BasicUserInfoContext';

const Movie = () => {
  const [ response, executeRequest ] = UseApi();
  const [ { data: comments, loading: comments_loading } , getCommentsRequest ] = UseApi();
  const { loading, data: movie } = response;
  const movieUid = useParams().id;
  const [ isOverview, setIsOverview ] = useState();
  const [ isView, setIsView ] = useState();
  const [ isTrailer, setIsTrailer ] = useState();
  const [ { email, ...user } ] = useContext(BasicUserInfoContext);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setIsOverview(true);
    executeRequest(getMovie(movieUid));
    getCommentsRequest(getComments(movieUid));
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
      <div className="stars">
        <div className="vote">vote</div>
        <form action="">
          <input className="star star-5" id="star-5" type="radio" name="star"/>
          <label className="star star-5" for="star-5"></label>
          <input className="star star-4" id="star-4" type="radio" name="star"/>
          <label className="star star-4" for="star-4"></label>
          <input className="star star-3" id="star-3" type="radio" name="star"/>
          <label className="star star-3" for="star-3"></label>
          <input className="star star-2" id="star-2" type="radio" name="star"/>
          <label className="star star-2" for="star-2"></label>
          <input className="star star-1" id="star-1" type="radio" name="star"/>
          <label className="star star-1" for="star-1"></label>
        </form>
      </div>
    );
  }

  const createGenres = () => {
    return movie.genres.map((genre, index) => (
      <span style={{color:'#21FFE2', textTransform:'capitalize'}} >
        {genre}
        { (movie.genres.length - 1) !== index ? <span style={{color:'#ffff'}}>, </span> : <span style={{color:'#ffff'}}>. </span> }
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
      <div className="row"  style={{color:'#ffff', background:'#010B31', padding: '35px 19px 35px 0'}}>
        <div className="col s12 m4">
          <div style={{ display:'flex', justifyContent:'center' }}>
            <img src={movie.poster_url} style={{ width:'65%' }} alt=""/>
          </div>
        </div>
        <div className="col s12 m8" style={{ padding: '0' }}>
          <div>
            <div style={{fontSize:'20px', marginBottom:'10px'}}>
              Storyline
            </div>
          </div>
          <div style={{marginBottom:'12px'}}>
            {movie.overview}
          </div>
          <div>
            <div>
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
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
            <i className="material-icons" style={{marginTop: '14px', marginLeft:'15px'}}>thumb_up</i>
            <i className="material-icons" style={{marginTop: '14px', marginLeft:'15px'}}>access_time</i>
            <i className="material-icons" style={{marginTop: '14px', marginLeft:'15px', marginRight:'15px'}}>visibility</i>
            {createStars()}
          </div>
        </div>
      </div>
    );
  }

  const View = () => {
    return (
      <div>
        No esta terminado la vista para ver.
      </div>
    );
  }

  const Trailer = () => {
    return (
      <div>
        No esta terminado la vista de trailers.
      </div>
    );
  }

  const onSubmit = (data, e) => {
    const comment = { ...user, ...data };
    sendComment(movieUid, comment);
    comments.push(comment);
    e.target.reset();
  }

  const CommentsComponents = () => {
    return comments.map(({ photoURL, nickname, description, uid: uid_user, uid_program }) => (
      <section style={{ display:'flex',  marginTop:'10px', background: '#010b31', padding:'5px'}}>
        <div className="" style={{ padding:'10px'}}>
          <img className="circle" width="150px" src={photoURL} alt=""/>
        </div>
        <div className="" style={{ padding:'15px', display:'flex', width:'100%', flexDirection:'column' }}>
          <div style={{color:'#ffff', height:'100%'}}>{description}</div>
          <div>
            <span style={{ color:'#21ffe2', textTransform:'uppercase', fontWeight:'400', fontSize:'18px' }}>
              - {nickname}
              { uid_user === user.uid && <span style={{textTransform:'capitalize', fontSize:'12px'}}> (Tú)</span> }
            </span>
            <span style={{ color:'#808080', fontSize:'11px', marginLeft:'10px'}}>(15-04-2020)</span>
            { uid_user === user.uid && <i className="material-icons right" style={{ color:'red', cursor:'pointer' }}>delete_forever</i> }
          </div>
        </div>
      </section>
    ));
  }

  const NonComment = () => {
    return (
      <section style={{ background: '#010b31', color:'#ffff', height:'20%', fontSize:'28px', padding:'20px', display:'flex', justifyContent:'center', textAlign:'center', alignItems:'center', marginTop:'20px' }}>
        Aún no hay comentarios.
      </section>
    );
  }

  // TODO no me gusta lo del length
  const Comments = () => {
    return (
      <div>
        <h4 style={{color: '#ffff'}}>
          Comentarios ({comments.length})
        </h4>
        <div style={{ position: 'relative' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea type="text-box" ref={register} name="description" placeholder="Add a comment..." style={{ color:'#ffff', height:'25vh', border:'2px solid #ffff', padding:'20px' }} />
            <div style={{ color:'#21ffe2', position:'absolute', bottom:'18px', right:'14px'}}>
              <button style={{ background:'transparent', border:'0px', color:'#21ffe2', cursor:'pointer'}}>
                <span style={{ textTransform:'uppercase', marginRight:'10px', fontWeight:'600' }}>
                  send
                </span>
                <i className="material-icons" style={{ position:'relative', top:'6px' }}>
                  send
                </i>
              </button>
            </div>
          </form>
        </div>
        { console.log(comments)}
        { comments.length === 0 && <NonComment /> }
        { comments.length != 0 && <CommentsComponents /> }
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
          <h5 style={{color: '#FFFFFF', position:'absolute', bottom:'0', fontSize: '2.4vw', transform:'translate(23px, -36px)', width: '50%'}}>
            {movie.title}
          </h5>
          <div style={{color:'#AFA9A9', position:'absolute', left:'2.2%', bottom:'3%'}}>
            <span style={{marginRight:'20px'}}>2019</span>
            <span>{timeConvert(movie.runtime)}</span>
          </div>
        </div>
        { buttonNavigation() }
        { isOverview &&  overview() }
        { isView && <View /> }
        { isTrailer && <Trailer /> }
        { !comments_loading && <Comments /> }
        </>
      }
    </div>
  );
}

export default Movie;