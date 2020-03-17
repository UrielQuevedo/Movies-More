import React, { useState, useContext } from "react";
import M from "materialize-css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../Hooks/ThemeContext";
import UseDarkMode from "../Hooks/UseDarkMode";
import { BasicUserInfoContext } from "../Hooks/BasicUserInfoContext";
import UseLenguage from "../Hooks/UseLenguage";

const MobileNavbarBottom = () => {
  const [elems, setElems] = useState();
  const [_, setTheme] = useContext(ThemeContext);
  const [__, isDarkThemeActive, changeTheme] = UseDarkMode();
  const [lenguage, changeLenguage] = UseLenguage();
  const { t } = useTranslation();
  const [user] = useContext(BasicUserInfoContext);

  useEffect(() => {
    const options = {
      edge: "right"
    };

    const sidenav = document.querySelectorAll(".sidenav");
    const collapsibleElem = document.querySelectorAll(".collapsible");
    setElems({sideNav: M.Sidenav.init(sidenav, options)[0], collapsible: M.Collapsible.init(collapsibleElem)[0]});
  }, []);

  const navbarComponent = () => {
    return (
      <div className="show-on-med-only hide-on-large-only mobile-navbar-bottom">
        <nav className="mobile-nav-bottom">
          <div>
            <ul style={{ display: "flex", justifyContent: "space-around" }}>
              <li>
                <NavLink activeClassName='mobile-navbar-item-selected' exact to="/" style={{padding:'0px'}}>
                  <i class="material-icons mobile-navbar-bottom-icons">home</i>
                  <p className="mobile-navbar-bottom-item">{t('Home')}</p>
                </NavLink>
              </li>
              <li>
                <i class="material-icons mobile-navbar-bottom-icons">search</i>
                <p className="mobile-navbar-bottom-item">{t('Search')}</p>
              </li>
              <li>
                <i class="material-icons mobile-navbar-bottom-icons">
                  notifications_none
                </i>
                <p className="mobile-navbar-bottom-item">{t('Notifi')}</p>
              </li>
              <li
                data-target="mobile-demo"
                className="sidenav-trigger"
                style={{ margin: "0px", cursor: "pointer" }}
              >
                <i class="material-icons collapse-icon">menu</i>
                <p
                  className="mobile-navbar-bottom-item"
                  style={{ transform: "translate(0px, -15px)" }}
                >
                  {t('More')}
                </p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  }

  const createViewLenguage = (leng, lengView) => {
    return (
      <span onClick={() => {
        changeLenguage(leng);
        elems.collapsible.close(1);
        }}>
        {lengView}
      </span>
    );
  }

  const sidenavComponent = () => {
    return (
      <ul
        class="sidenav show-on-med-only hide-on-large-only collapse-menu"
        id="mobile-demo"
      >
        <li className="row">
          <div class="user-view col s12 m6 offset-m3 collapse-user background">
            <div class="background">
              <img src="https://image.freepik.com/vector-gratis/banner-concepto-pelicula-cine-estilo-dibujos-animados_98402-1682.jpg" />
            </div>
            <a href="#user">
              <img
                class="circle"
                src={user.photoURL}
              />
            </a>
            <span class="white-text name">{user.nickname}</span>
            <span class="white-text email">{user.email}</span>
          </div>
        </li>
        <div className="row">
          <ul className="col s12 m6 offset-m3 collapsible ">
            <NavLink to='/profile' className="row" style={{ margin: "0px" }} onClick={() => elems.sideNav.close()}>
              <i class="material-icons col s2 collapse-menu-icon">
                account_box
              </i>
              <div className="col s10 collapse-menu-font" style={{transform:'translateY(10px)'}}>{t('Profile')}</div>
            </NavLink>
            <li className="row" style={{ margin: "0px" }}>
              <i class="material-icons col s2 collapse-menu-icon">
                brightness_4
              </i>
              <div className="switch">
                <div className="col s6 collapse-menu-font">{t('Dark Theme')}</div>
                <label
                  className="switch col s4"
                  style={{ textAlign: "center" }}
                >
                  <input
                    defaultChecked={isDarkThemeActive}
                    type="checkbox"
                    onClick={() => changeTheme(setTheme)}
                  />
                  <span class="lever" style={{ margin: "0" }}></span>
                </label>
              </div>
            </li>
            <li>
              <div
                class="collapsible-header row"
                style={{ margin: "0px", padding: "0px" }}
              >
                <i
                  class="material-icons col s2 collapse-menu-icon"
                  style={{ margin: "0px" }}
                >
                  g_translate
                </i>
                <div className="col s10 collapse-menu-font">{t('Lenguage')}</div>
              </div>
              <div
                class="collapsible-body collapsible-menu"
                style={{ textAlign: "center" }}
              >
                { lenguage() === 'es' ?  createViewLenguage('en','Ingles (en-US)') :  createViewLenguage('es','Spanish (es-ES)')}
              </div>
            </li>
            <li className="row" style={{ margin: "0px" }} onClick={() => logOut()}>
              <i class="material-icons col s2 collapse-menu-icon">
                exit_to_app
              </i>
              <div className="col s10 collapse-menu-font">{t('Log Out')}</div>
            </li>
          </ul>
        </div>
        <li className="collapse-menu-close">
          <i
            className="material-icons collapse-menu-icon-close"
            onClick={() => elems.sideNav.close()}
          >
            highlight_off
          </i>
        </li>
      </ul>
    );
  }

  return (
    <>
      {navbarComponent()}
      {sidenavComponent()}
    </>
  );
};

export default MobileNavbarBottom;
