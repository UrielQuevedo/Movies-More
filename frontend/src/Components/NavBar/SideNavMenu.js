import React, { useContext, useEffect } from 'react'; 
import { ThemeContext } from "../../Hooks/ThemeContext";
import UseDarkMode from "../../Hooks/UseDarkMode";
import { BasicUserInfoContext } from "../../Hooks/BasicUserInfoContext";
import UseLenguage from "../../Hooks/UseLenguage";
import { useState } from 'react';
import M from "materialize-css";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const SideNavMenu = ({sideNavElem}) => {
  const [user] = useContext(BasicUserInfoContext);
  const [elem, setElem] = useState();
  const setTheme = useContext(ThemeContext);
  const {isDarkThemeActive, changeTheme} = UseDarkMode();
  const [lenguage, changeLenguage] = UseLenguage();
  const { t } = useTranslation();

  useEffect(() => {
    const collapsibleElem = document.querySelectorAll(".collapsible");
    setElem(M.Collapsible.init(collapsibleElem)[0]);
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  }

  const createViewLenguage = (leng, lengView) => {
    return (
      <span onClick={() => {
        changeLenguage(leng);
        elem.close(1);
        }}>
        {lengView}
      </span>
    );
  }

  console.log(sideNavElem);

  return (
    <ul
      class="sidenav show-on-med-only hide-on-large-only collapse-menu"
      id="mobile-menu"
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
          <NavLink to='/profile' className="row" style={{ margin: "0px" }} onClick={() => sideNavElem.close()}>
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
              <div className="col s10 collapse-menu-font">{t('Lenguage')}<i className="material-icons right" style={{ marginRight:'35px', color:'#21ffe2', transform:'scale(1.5)' }}>arrow_drop_down</i></div>
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
          onClick={() => sideNavElem.close()}
        >
          highlight_off
        </i>
      </li>
    </ul>
  );
}
 
export default SideNavMenu;