import React from 'react'
import { useTranslation } from 'react-i18next';
import SideNavGenre from './SideNavGenre';
import { useEffect } from 'react';
import { useState } from 'react';
import M from "materialize-css";

const GenreMobileNavbar = () => {
  const { t } = useTranslation();
  const [sideNav, setsideNav] = useState()

  useEffect(() => {
    const options = {
      edge: "right",
      draggable: false,
    };

    const elem = document.querySelectorAll(".sidenav");
    setsideNav(M.Sidenav.init(elem[2], options));
  }, [])
  
  return (
    <div
      className="show-on-med-only hide-on-large-only"
    >
      <nav className="genres-navbar">
        <div className="nav-wrapper">
          <ul className="row">
            <li 
              className="col s3 offset-s1 title-genres-nav sidenav-trigger"
              data-target="mobile-genre"
            >
              <div className="row">
                <div className="col s8">{t('genres')}</div>
                <i className="material-icons col s4" style={{color:'#21ffe2'}}>arrow_drop_down</i>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <SideNavGenre sideNavElem={sideNav} />
    </div>
  );
}
 
export default GenreMobileNavbar;