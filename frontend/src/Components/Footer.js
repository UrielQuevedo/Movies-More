import React from 'react';
import github from '../Icons/github.png';
import linkedin from '../Icons/linkedin.png';
import M from 'materialize-css';
import { useEffect } from 'react';

const Footer = () => {

  useEffect(() => {
    M.AutoInit();
  }, []);

  const modalContent = () => {
    return (
      <div id="requestContent" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
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
              <b>Developed by Uriel Quevedo, see the code on <a href="https://github.com/UrielQuevedo/Movies-More" target="_blank" style={{color:'#21FFE2'}}>Github</a></b>
              <div className="icons-fo icons-footer">
                <a href="https://github.com/UrielQuevedo" target="_blank"><img src={github} alt="github" className="urlIcon"/></a>
                <a href="mailto:quevedouriel3@gmail.com" target="_blank"><i className="material-icons email-icon">email</i></a>
                <a href="https://www.linkedin.com/in/uriel-quevedo-587227173/" target="_blank"><img src={linkedin} alt="linkedin" className="urlIcon"/></a>
              </div>
            </div>
          </div>
          <div className="col s12 l3">
            <p className="footer-text">Can't you find your movie? Send me the title and I will notify you when it is published.</p>
            <i className="material-icons add-icon modal-trigger" href="#requestContent">add_circle</i>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;