import React, { useContext, useEffect } from "react";
import API from '../Route/Api';
import useCustomAPI from "../Hooks/UseCustomAPI";

const Home = () => {
  const [response, executeAPI] = useCustomAPI();
  const {loading: loadingMovie , data: movies, error: errorMovie} = response;

   useEffect(() => {
    executeAPI({ API: API, type: 'get', path: '/movies' });
   },[]);

  const moviesComponent = () => {
    return movies.map( e => (
      <img src={e.poster_url} width="200" height="325" alt=""/>
    ));
  }

  return (
    <div style={{marginLeft: "10.5%"}}>
      <div className="col offset-l1 l10" >
        <h5 style={{color: "#21FFE2"}}>New Movies</h5>
        {movies && moviesComponent()}
      </div>
    </div>
  );
};

export default Home;
