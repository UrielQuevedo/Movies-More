import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BasicUserInfoContext } from '../../Hooks/BasicUserInfoContext';
import { useForm } from 'react-hook-form';
import { newTask } from '../../Route/ApiAuth';
import M from 'materialize-css';

const TaskModal = () => {
  const { t } = useTranslation();
  const [ { photoURL, ...user } ] = useContext(BasicUserInfoContext);
  const { register, handleSubmit } = useForm();
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const modal = document.querySelectorAll('.modal');
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    M.Modal.init(modal);
  }, []);

  const onSubmit = (data, e) => {
    if (!cancel) {
      const task = ({ ...data,  user: { ...user } })
      newTask(task)
        .then(_ => M.toast({html: '<span>Enviado <i class="material-icons check_icon_task">check_circle</i></span>'}))
        .catch(_ => M.toast({html: '<span>Error, intentalo de nuevo. <i class="material-icons cancel_icon_task">cancel</i></span>'}));
    }
    e.target.reset();
  }

  return (
    <div id="requestContent" className="modal modal-footer-content">
      <div className="modal-content" style={{paddingBottom:'10px'}}>
        <h5 style={{color:'#FAEBD7', marginTop:'0'}}>{t('Request your content')}!</h5>
        <form className="row" style={{ margin:'0'}} onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field col s12" style={{marginBottom:'0'}}>
            <input
              id="originalTitle"
              name="title"
              type="text"
              style={{ color: '#fff', borderBottom:'1px solid #21ffe2', margin:'0' }}
              className="validate"
              ref={register({ required: true })}
            />
            <label htmlFor="originalTitle" style={{ color:'#21ffe2' }}>{t('Original Title')}</label>
          </div>
          <div className="input-field col s12" style={{color:'#21ffe2'}}>
            <select name="genres" defaultValue="default" ref={register({ required: true })} style={{background:'#000417'}}>
              <option value="default" disabled style={{color:'#fff'}}>{t('Choose your option')}</option>
              <option value="movie">{t('Movie')}</option>
              <option value="program" style={{color:'#20f8'}}>{t('Program')}</option>
              <option value="trailer" style={{color:'#20f8'}}>Trailer</option>
            </select>
          </div>
          <textarea type="text-box" ref={register} name="details" className="textBox" placeholder={t('More Details') + '..'} style={{marginTop:'10px'}}/>
          <div className="col s12 row" style={{margin:'0', marginBottom:'10px' }}>
            <div className="col s12 m6" style={{marginBottom:'20px'}}>
              <button className="modal-close btn btn-close" onClick={() => setCancel(true)} style={{ background: 'black', fontWeight:'600' }}>{t('close')}</button>
            </div>
            <div className="col s12 m6">
              <button onClick={() => setCancel(false)} className="modal-close btn" style={{ background: '#F34335', fontWeight:'600' }}>
                <i className="material-icons right">
                  send
                </i>
                {t('send')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;