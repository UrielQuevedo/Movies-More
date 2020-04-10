import React from 'react';
import { useTranslation } from 'react-i18next';
import UseSuscribe from '../Hooks/UseSuscribe';

const ButtonSuscribe = (genre, type_content) => {
  const {t} = useTranslation();
  const { isSuscribe, suscribeToGenre, unsuscribeToGenre } = UseSuscribe(genre, type_content);

  const button = (onClick, title, color) => {
    return (
      <button className="btn button-suscribe" style={{ background: color }} onClick={onClick}>
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