import React from 'react';
import github from '../Icons/github.png';
import linkedin from '../Icons/linkedin.png';
import M from 'materialize-css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FooterStyled from '../Styled/FooterStyled';

const Footer = () => {
  const {t} = useTranslation();

  useEffect(() => {
    const modal = document.querySelectorAll('.modal');
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    M.Modal.init(modal);
  }, []);

  const ModalX = () => {
    return (
      <div id="requestContent" className="modal modal-footer-content">
        <div className="modal-content" style={{paddingBottom:'10px'}}>
          <h5 style={{color:'#FAEBD7', marginTop:'0'}}>{t('Request your content')}!</h5>
          <div className="row" style={{ margin:'0'}}>
            <div className="input-field col s12" style={{marginBottom:'0'}}>
              <input id="originalTitle" type="text" style={{ color: '#fff', borderBottom:'1px solid #21ffe2', margin:'0' }} className="validate" />
              <label htmlFor="originalTitle" style={{ color:'#21ffe2' }}>{t('Original Title')}</label>
            </div>
            <div className="input-field col s12" style={{color:'#21ffe2'}}>
              <select style={{background:'#000417'}}>
                <option value="Eliga su Opcion" disabled style={{color:'#fff'}}>{t('Choose your option')}</option>
                <option defaultValue="1">{t('Movie')}</option>
                <option defaultValue="2" style={{color:'#20f8'}}>{t('Program')}</option>
                <option defaultValue="3" style={{color:'#20f8'}}>Trailer</option>
              </select>
            </div>
            <textarea type="text-box" className="textBox" placeholder={t('More Details') + '..'} style={{marginTop:'10px'}}/>
            <div className="col s12 row" style={{margin:'0', marginBottom:'10px' }}>
              <div className="col s12 m6" style={{marginBottom:'20px'}}>
                <button className="modal-close btn btn-close" style={{ background: 'black', fontWeight:'600' }}>{t('close')}</button>
              </div>
              <div className="col s12 m6">
                <button className="modal-close btn" style={{ background: '#F34335', fontWeight:'600' }}><i className="material-icons right">send</i>{t('send')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FooterStyled className="page-footer">
      <div className="footer-contain">
        <div className="row valign" style={{marginBottom: '0'}}>
          <div className="col s12 l3">
            <a href="/">
              <h4>Movies&More</h4>
            </a>
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