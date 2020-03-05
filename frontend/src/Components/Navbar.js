import React, { useEffect } from 'react';
import LOGO from '../ICONO.png';
import M from 'materialize-css';

const Navbar = () => {

  const isSelected = (path) => {
    if (window.location.pathname === path) {
      return "item-selected";
    } 
    return "nav-item";
  };

  useEffect(() => {
    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    let options = {
        inDuration: 300,
        outDuration: 300,
        coverTrigger: false,
        closeOnClick: false,
        
    };
    M.Dropdown.init(dropdowns, options);
  },[]);

  const dropdownSetting = () => {
    return (
      <ul id="setting" className="dropdown-content dropdown-content-setting">
        <div className="row" style={{ margin:'0', marginBottom:'5px', borderBottom:'1px solid #5065BD' }}>
          <div className="col s3" style={{ display:'flex', alignItems:'center', height:'81px', padding:'0', justifyContent:'flex-end'}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvV7W1JiVpU2sZvf3PHMPCE5_3wligr52gbKXZATFfltvKo_TW" style={{ borderRadius:'20px'}} height='40px' width='40px'  alt=""/>
          </div>
          <div className="col s8">
            <p className="setting-name">Uriel Quevedo</p>
            <p style={{ fontSize:'11px', margin:'0'}}>Quevedouriel3@gmail.com</p>
          </div>
        </div>
        <li className="dropdown-content-setting-item row" style={{ margin:'0', padding:'0'}}><i class="material-icons col s2" style={{ lineHeight:'37px', color:'#21FFE2', height:'36px', transform:'scale(0.8,0.8)'}}>account_box</i><div className="col s10" style={{ textAlign:'start', padding:'0', lineHeight:'37px'}}>Profile</div></li>
        <li className="dropdown-content-setting-theme-item row" style={{ margin:'0', padding:'0'}}><i class="material-icons col s2" style={{ lineHeight:'37px', color:'#21FFE2', height:'36px', transform:'scale(0.8,0.8)'}}>brightness_4</i><div className="col s10 switch" style={{ textAlign:'start', padding:'0', lineHeight:'37px'}}>
            Dark Theme
            <label style={{marginLeft:'64px'}}>
              <input type="checkbox"/>
              <span class="lever" style={{ margin:'0'}}></span>
            </label>
          </div>
        </li>
        <li className="dropdown-content-setting-item row" style={{ margin:'0', padding:'0'}}><i class="material-icons col s2" style={{ lineHeight:'37px', color:'#21FFE2', height:'36px', transform:'scale(0.8,0.8)'}}>exit_to_app</i><div className="col s10" style={{ textAlign:'start', padding:'0', lineHeight:'37px'}}>Log Out</div></li>
      </ul>
    );
  };

  const dropdownLenguage = () => {
    return (
      <ul id="lenguage" className="dropdown-content dropdown-content-lenguage">
        <li className="dropdown-content-lenguage-item">Spanish (es-ES)</li>
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
        <li className="dropdown-trigger" data-target="lenguage" style={{ height:'50px'}}>EN<i className="material-icons right" style={{ margin:'0', lineHeight:'64px'}}>arrow_drop_down</i></li>
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
            <li><a href="/" className={isSelected('/')}>home</a></li>
            <li><a href="/movies" className={isSelected('/movies')}>movies</a></li>
            <li><a href="/programs" className={isSelected('/programs')}>programs</a></li>
            <li><a href="/trailers" className={isSelected('/trailers')}>trailers</a></li>
            <li><a href="/mylist" className={isSelected('/mylist')}>mylist</a></li>
          </ul>
          {dropdownContainer()}
        </div>
      </nav>
    </div>
  );
}
 
export default Navbar;