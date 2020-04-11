import React from 'react';
import { useTranslation } from 'react-i18next';

const TaskModal = () => {
  const {t} = useTranslation();

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

export default TaskModal;