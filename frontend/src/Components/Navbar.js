import React, { useEffect, useState } from 'react';
import LOGO from '../ICONO.png';
import M from 'materialize-css';
import { UserContext } from '../Hooks/UserContext';
import { NavLink } from 'react-router-dom';
import API from '../Route/Api';
import { useTranslation } from 'react-i18next';
import UseLenguage from '../Hooks/UseLenguage';

const Navbar = () => {
  const [user, setUser] = useState({});
  const {t} = useTranslation();
  const [lenguage, changeLenguage] = UseLenguage();

  useEffect(() => {
    API.get('/user/' + window.localStorage.getItem('uid'))
      .then(r => setUser(r))
      .catch(error => console.log(console.log(error.response)));
    

    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    let options = {
        inDuration: 300,
        outDuration: 300,
        coverTrigger: false,
        closeOnClick: false,
        
    };
    M.Dropdown.init(dropdowns, options);
  },[]);

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.href = '/login';
  }

  const dropdownSetting = () => {
    return (
      <ul id="setting" className="dropdown-content dropdown-content-setting">
        <div className="row" style={{ margin:'0', marginBottom:'5px', borderBottom:'1px solid #5065BD' }}>
          <div className="col s3" style={{ display:'flex', alignItems:'center', height:'81px', padding:'0', justifyContent:'flex-end'}}>
            <img src={user.photoURL} style={{ borderRadius:'20px', border: '3px solid #5065bd'}} height='40px' width='40px'  alt="profile image"/>
          </div>
          <div className="col s8">
            <p className="setting-name">{user.nickname}</p>
            <p style={{ fontSize:'11px', margin:'0'}}>{user.email}</p>
          </div>
        </div>
        <li className="dropdown-content-setting-item row">
          <i class="material-icons col s2 icons-settings">account_box</i>
          <div className="col s10 text-settings">
            {t('Profile')}
          </div>
        </li>
        <li className="dropdown-content-setting-theme-item row">
          <i class="material-icons col s2 icons-settings">brightness_4</i>
          <div className="col s10 switch text-settings">
            {t('Dark Theme')}
            <label style={{marginLeft:'64px'}}>
              <input type="checkbox"/>
              <span class="lever" style={{ margin:'0'}}></span>
            </label>
          </div>
        </li>
        <li className="dropdown-content-setting-item row">
          <i class="material-icons col s2 icons-settings">exit_to_app</i>
          <div className="col s10 text-settings" onClick={() => logOut()}>
            {t('Log Out')}
          </div>
        </li>
      </ul>
    );
  };

  const createSelectLenguage = (leng, lengView) => {
    console.log(lenguage())
    return <li className="dropdown-content-lenguage-item" onClick={() => changeLenguage(leng)}>{lengView}</li>
  }

  const dropdownLenguage = () => {
    return (
      <ul id="lenguage" className="dropdown-content dropdown-content-lenguage">
        { lenguage() === 'es' ?  createSelectLenguage('en','English (en-US)') :  createSelectLenguage('es','Spanish (es-ES)')}
      </ul>
    );
  }

  const searchComponent = () => {
    return (
      <div className="col s3 row" style={{margin:'0', marginTop: '-4px'}}>
        <input autocomplete="off" type="text" className="col s10 input-search"  name="search" placeholder="Movies, Actors, Directors, etc.." style={{color:'#fff', marginBottom:'0', marginTop:'13px', height:'32px'}} />
        <i class="material-icons right col s2" style={{ marginTop:'6px', paddingLeft:'4px', color:'#21FFE2'}}>search</i>
      </div>
    );
  };

  const dropdownContainer = () => {
    return (
      <ul className="col s2 dropdownContainer">
        <li className="dropdown-trigger" data-target="notification" style={{ height:'40px', cursor:'pointer', marginRight:'13px'}}><i class="material-icons" style={{height:'41px'}}>notifications_none</i></li>
        <li className="dropdown-trigger" data-target="setting" style={{ height:'40px', cursor:'pointer', marginRight:'53px'}}><i class="material-icons" style={{height:'41px'}}>settings</i></li>
        <li className="dropdown-trigger" data-target="lenguage" style={{ height:'50px', textTransform:'uppercase'}}>{lenguage()}<i className="material-icons right" style={{ margin:'0', lineHeight:'64px'}}>arrow_drop_down</i></li>
      </ul>
    );
  }

  return (
    <div className="navbar-fixed">
      {dropdownSetting()}
      {dropdownLenguage()}
      <ul id="notification" className="dropdown-content">
        <li>NOTIFICACIONES</li>
      </ul>
      <nav>
        <div className="row">
          <div className="col s2">
            <a href="/"><img src={LOGO} width='140' height='140' alt="Movies&More Logotype"/></a>
          </div>
          {searchComponent()}
          <ul className="col s5" style={{ display:'flex', justifyContent:'flex-end'}}>
            {/* SIMPLIFICAR ESTO */}
            <li><NavLink activeClassName='item-selected' className='nav-item' exact to="/" >{t('home')}</NavLink></li>
            <li><NavLink activeClassName='item-selected' className='nav-item' to="/movies">{t('movies')}</NavLink></li>
            <li><NavLink activeClassName='item-selected' className='nav-item' to="/programs" >{t('programs')}</NavLink></li>
            <li><NavLink activeClassName='item-selected' className='nav-item' to="/trailers">{t('trailers')}</NavLink></li>
            <li><NavLink activeClassName='item-selected' className='nav-item' to="/mylist">{t('mylist')}</NavLink></li>
          </ul>
          {dropdownContainer()}
        </div>
      </nav>
    </div>
  );
}
 
export default Navbar;