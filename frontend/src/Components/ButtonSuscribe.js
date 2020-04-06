import React, { useEffect, useState } from 'react';
import UseApi from '../Hooks/UseApi';
import { getSuscribes } from '../Route/Api';
import { suscribeGenre, unsuscribeGenre } from '../Route/ApiAuth';
import { useTranslation } from 'react-i18next';

const ButtonSuscribe = ({genre}) => {
  const {t} = useTranslation();
  const [isSuscribe, setIsSuscribe] = useState();
  const [_, suscribeRequest] = UseApi();
  const uid = window.localStorage.getItem('uid');

  useEffect(() => {
    getSuscribes('genres', uid)
      .then(response =>  {
        setIsSuscribe(response.includes(genre));
      })
   },[]);

  const suscribeToGenre = () => {
    suscribeRequest(suscribeGenre('genres', genre, uid));
    setIsSuscribe(true);
  }

  const unsuscribeToGenre = () => {
    suscribeRequest(unsuscribeGenre('genres', genre, uid));
    setIsSuscribe(false);
  }
  
  const button = (action, title, color) => {
    return (
      <button className="btn button-suscribe" style={{ background: color }} onClick={() => action()}>
        {t(title)}
      </button>
    );
  }

  return (
    <div className="head-content-button">
      {isSuscribe ? button(unsuscribeToGenre, 'unsuscribe', '#77191c') : button(suscribeToGenre, 'suscribe', '#f34335')}
    </div>
  );
}
 
export default ButtonSuscribe;