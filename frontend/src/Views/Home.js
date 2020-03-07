import React, { useContext, useEffect, useState } from "react";
import API from '../Route/Api';
import { UserContext } from "../Hooks/UserContext";

const Home = () => {
  const {user, setUser} = useContext(UserContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    API.get('/movies')
      .then(response => setMovies(response))
      .catch(error => console.log(error));
  }, []);

  const moviesComponent = () => {
    return movies.map( e => (
      <img src={e.poster_url} width="200" height="325" alt=""/>
    ));
  }

  return (
    <div style={{marginLeft: "10.5%"}}>
      <div className="col offset-l1 l10" >
        <h5 style={{color: "#21FFE2"}}>New Movies</h5>
        {moviesComponent()}
      </div>
    </div>
  );
};

export default Home;
