import React, { useState } from "react";
import M from "materialize-css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideNavMenu from './SideNavMenu';
import NotificationSideNav from './NotificationSideNav';

const MobileNavbarBottom = () => {
  const [elems, setElems] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const options = {
      edge: "right",
    };

    const elemList = document.querySelectorAll(".sidenav");
    const sidenav = M.Sidenav.init(elemList, options);
    setElems({ menu: sidenav[0], notification: sidenav[1] });
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
              <li
                data-target="mobile-notification"
                className="sidenav-trigger"
                style={{cursor:'pointer', margin:'0px'}}
              >
                <i class="material-icons mobile-navbar-bottom-icons">
                  notifications_none
                </i>
                <p className="mobile-navbar-bottom-item">{t('Notifi')}</p>
              </li>
              <li
                data-target="mobile-menu"
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

  return (
    <>
      {navbarComponent()}
      <SideNavMenu sideNavElem={elems.menu} />
      <NotificationSideNav sideNavElem={elems.notification}/>
    </>
  );
};

export default MobileNavbarBottom;
