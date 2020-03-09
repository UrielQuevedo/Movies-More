import React from 'react';
import github from '../Icons/github.png';
import linkedin from '../Icons/linkedin.png';
import M from 'materialize-css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation();

  useEffect(() => {
    const modal = document.querySelectorAll('.modal');
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    M.Modal.init(modal);
  }, []);

  const modalContent = () => {
    return (
      <div id="requestContent" className="modal modal-footer-content">
        <div className="modal-content" style={{paddingBottom:'10px'}}>
          <h5 style={{color:'#FAEBD7', marginTop:'0'}}>Request your content!</h5>
          <div className="row" style={{ margin:'0'}}>
            <div class="input-field col s12" style={{marginBottom:'0'}}>
              <input id="originalTitle" type="text" style={{ color: '#fff', borderBottom:'1px solid #21ffe2', margin:'0' }} className="validate" />
              <label for="originalTitle" style={{ color:'#21ffe2' }}>Original Title</label>
            </div>
            <div class="input-field col s12" style={{color:'#21ffe2'}}>
              <select style={{background:'#000417'}}>
                <option value="" disabled selected style={{color:'#fff'}}>Choose your option</option>
                <option value="1">Movie</option>
                <option value="2" style={{color:'#20f8'}}>Program</option>
                <option value="3" style={{color:'#20f8'}}>Trailer</option>
              </select>
            </div>
            <textarea type="text-box" class="textBox" placeholder='More Details..' style={{marginTop:'10px'}}/>
            <div className="col s12 row" style={{margin:'0', marginBottom:'10px' }}>
              <div className="col s12 m6" style={{marginBottom:'20px'}}>
                <button className="modal-close btn btn-close" style={{ background: 'black', fontWeight:'600' }}><span>close</span></button>
              </div>
              <div className="col s12 m6">
                <button className="modal-close btn" style={{ background: '#F34335', fontWeight:'600' }}><i class="material-icons right">send</i>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer className="page-footer footer">
      {modalContent()}
      <div className="footer-contain">
        <div className="row valign" style={{marginBottom: '0'}}>
          <div className="col s12 l3">
            <a href="/"><h4 style={{color:'#FAEBD7'}} className="titleFooter" >Movies&More</h4></a>
          </div>
          <div className="col s12 l6 contenedor">
            <div className="contenido">
              <b>{t('Developed by Uriel Quevedo, see the code on')}<a href="https://github.com/UrielQuevedo/Movies-More" target="_blank" style={{color:'#21FFE2'}}>Github</a></b>
              <div className="icons-fo icons-footer">
                <a href="https://github.com/UrielQuevedo" target="_blank"><img src={github} alt="github" className="urlIcon"/></a>
                <a href="mailto:quevedouriel3@gmail.com" target="_blank"><i className="material-icons email-icon">email</i></a>
                <a href="https://www.linkedin.com/in/uriel-quevedo-587227173/" target="_blank"><img src={linkedin} alt="linkedin" className="urlIcon"/></a>
              </div>
            </div>
          </div>
          <div className="col s12 l3">
            <p className="footer-text">{t('Can`t you find your content? Send me the title and I will notify you when it is published')}.</p>
            <i className="material-icons add-icon modal-trigger" href="#requestContent">add_circle</i>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;