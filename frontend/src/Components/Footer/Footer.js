import React from 'react';
import github from '../../Icons/github.png';
import linkedin from '../../Icons/linkedin.png';
import { useTranslation } from 'react-i18next';
import FooterStyled from './FooterStyled';
import TaskModal from './TaskModal';
import { Link } from 'react-router-dom';

const Footer = () => {
  const {t} = useTranslation();

  return (
    <FooterStyled className="page-footer">
      <TaskModal />
      <div className="footer-contain">
        <div className="row valign" style={{marginBottom: '0'}}>
          <div className="col s12 l3">
            <Link to="/">
              <h4>Movies&More</h4>
            </Link>
          </div>
          <div className="col s12 l6 contenedor">
            <div className="contenido">
              <b>
                {t('Developed by Uriel Quevedo, see the code on ')}
                <a href="https://github.com/UrielQuevedo/Movies-More" target="_blank" style={{color:'#21FFE2'}}>Github</a>
              </b>
              <div className="icons-fo icons-footer">
                <a href="https://github.com/UrielQuevedo" target="_blank"><img src={github} alt="github" className="urlIcon"/></a>
                <a href="mailto:quevedouriel3@gmail.com" target="_blank"><i className="material-icons email-icon">email</i></a>
                <a href="https://www.linkedin.com/in/uriel-quevedo-587227173/" target="_blank"><img src={linkedin} alt="linkedin" className="urlIcon"/></a>
              </div>
            </div>
          </div>
          <div className="col s12 l3 footer-text-container">
            <p className="footer-text">
              <b>
                {t('Can`t you find your content?')}
              </b><br/>
              {t('Send me the title and I will notify you when it is published')}.
            </p>
            <i className="material-icons add-icon modal-trigger" href="#requestContent">add_circle</i>
          </div>
        </div>
      </div>
    </FooterStyled>
  );
}

export default Footer;