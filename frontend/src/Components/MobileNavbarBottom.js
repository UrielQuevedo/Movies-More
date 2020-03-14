import React, { useState } from "react";
import M from "materialize-css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileNavbarBottom = () => {
  const [sideNav, setSideNav] = useState();

  useEffect(() => {
    const options = {
      edge: 'right',
    }

    const elem = document.querySelectorAll(".sidenav");
    const sidenav = M.Sidenav.init(elem, options);

    const collapsibleElem = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibleElem);

    setSideNav(sidenav[0]);
  }, []);

  return (
    <>
      <div className="show-on-med-only hide-on-large-only mobile-navbar-bottom">
        <nav  className="mobile-nav-bottom">
          <div>
            <ul style={{ display:'flex', justifyContent:'space-around' }}>
              <li>
                <Link to="/">
                  <i class="material-icons mobile-navbar-bottom-icons">home</i>
                  <p className="mobile-navbar-bottom-item">Home</p>
                </Link>
              </li>
              <li>
                <i class="material-icons mobile-navbar-bottom-icons">search</i>
                <p className="mobile-navbar-bottom-item">Search</p>
              </li>
              <li>
                <i class="material-icons mobile-navbar-bottom-icons">notifications_none</i>
                <p className="mobile-navbar-bottom-item">Notify</p>
              </li>
              <li data-target="mobile-demo" className="sidenav-trigger" style={{margin:"0px", cursor:'pointer'}}>
                <i class="material-icons collapse-icon">menu</i>
                <p className="mobile-navbar-bottom-item" style={{ transform:'translate(1.2px, -15px)' }}>More</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <ul class="sidenav show-on-med-only hide-on-large-only collapse-menu"  id="mobile-demo">
        <li className="row">
          <div class="user-view col s12 m6 offset-m3 collapse-user">
            <div class="background">
              <img src="https://image.freepik.com/vector-gratis/banner-concepto-pelicula-cine-estilo-dibujos-animados_98402-1682.jpg" />
            </div>
            <a href="#user"><img class="circle" src="https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg" /></a>
            <a href="#name"><span class="white-text name">Uriel Quevedo</span></a>
            <a href="#email"><span class="white-text email">quevedouriel3@gmail.com</span></a>
          </div>
        </li>
        <div className="row">
          <ul className="col s12 m6 offset-m3 collapsible ">
            <li className="row" style={{ margin:'0px'}}>
              <i class="material-icons col s2 collapse-menu-icon">account_box</i>
              <div className="col s10 collapse-menu-font">
                Profile
              </div>
            </li>
            <li className="row" style={{ margin:'0px'}}>
              <i class="material-icons col s2 collapse-menu-icon">brightness_4</i>
              <div className="switch">
                <div className="col s6 collapse-menu-font">
                  Dark Mode
                </div> 
                <label className="switch col s4" style={{textAlign:'center'}}>
                  <input 
                    //defaultChecked={isDarkThemeActive}
                    type="checkbox"
                    //onClick={() => changeTheme(setTheme)}
                  />
                  <span class="lever" style={{ margin:'0'}}></span>
                </label>
              </div>
            </li>
            <li>
              <div class="collapsible-header row" style={{margin:'0px', padding:'0px'}}>
                <i class="material-icons col s2 collapse-menu-icon" style={{margin:'0px'}}>g_translate</i>
                <div className="col s10 collapse-menu-font">
                  Lenguage
                </div>
              </div>
              <div class="collapsible-body collapsible-menu" style={{textAlign:'center'}}><span>Spanish (es-ES)</span></div>
            </li>
            <li className="row" style={{ margin:'0px'}}>
              <i class="material-icons col s2 collapse-menu-icon">exit_to_app</i>
              <div className="col s10 collapse-menu-font">
                Log Out
              </div> 
            </li>
          </ul>
        </div>
        <li className="collapse-menu-close">
          <i className="material-icons collapse-menu-icon-close" onClick={() => sideNav.close()}>highlight_off</i>
        </li>
    </ul>
  </>
  );
};

export default MobileNavbarBottom;
