import React from 'react'
import { useTranslation } from 'react-i18next';

const GenreMobileNavbar = () => {
  const { t } = useTranslation();
  
  return (
    <div
      className="show-on-med-only hide-on-large-only"
    >
      <nav className="genres-navbar">
        <div class="nav-wrapper">
          <ul className="row">
            <li className="col s3 offset-s1 title-genres-nav">
                <div className="row">
                  <div className="col s8">{t('genres')}</div>
                  <i className="material-icons col s4" style={{color:'#21ffe2'}}>arrow_drop_down</i>
                </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
 
export default GenreMobileNavbar;