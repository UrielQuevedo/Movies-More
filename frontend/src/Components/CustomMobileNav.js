import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CustomMobileNav = () => {
  const { t } = useTranslation();
  
  return (
    <div
      className="show-on-med-only hide-on-large-only mobile-navbar-top mobile-navbar-top-visible"
    >
      <nav className="mobile-nav-top">
        <div class="nav-wrapper">
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }} 
          >
            <li className="mobile-nav-item">
              {t('movies')}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
 
export default CustomMobileNav;