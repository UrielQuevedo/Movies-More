import { useState, useEffect } from 'react';
import { suscribeGenre, unsuscribeGenre } from '../Route/ApiAuth';
import { getSuscribes } from '../Route/Api';

const UseSuscribe = ({ genre, type_content }) => {
  const [isSuscribe, setIsSuscribe] = useState();
  //TODO chequear el uso de UseApi en los demas archivos a ver si no es innesesario
  const uid = window.localStorage.getItem('uid');
  
  useEffect(() => {
    getSuscribes(type_content, uid)
      .then(genres => setIsSuscribe(genres.includes(genre)));
   }, []);

  const suscribeToGenre = () => {
    suscribeGenre(type_content, genre, uid);
    setIsSuscribe(true);
  }

  const unsuscribeToGenre = () => {
    unsuscribeGenre(type_content, genre, uid);
    setIsSuscribe(false);
  }

  return {isSuscribe, suscribeToGenre, unsuscribeToGenre};
}
 
export default UseSuscribe;
