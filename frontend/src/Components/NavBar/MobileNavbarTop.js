import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const MobileNavbarTop = () => {
  const { t } = useTranslation();
  const [showNav, setShowNav] = useState({
    visible: true,
    prevScrollPos: window.pageYOffset,
    isRender: true,
  })

  const handleScroll = () => {
    const prevPos = showNav.prevScrollPos;
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevPos > currentScrollPos;

    if (!showNav.isRender) {
      setShowNav({
        ...showNav,
        prevScrollPos: currentScrollPos,
        visible: isVisible,
      });
    } else {
      setShowNav({
        ...showNav,
        isRender: false,
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [showNav]);

  return (
    <div
      className={"show-on-med-only hide-on-large-only mobile-navbar-top " + (showNav.visible ? 'mobile-navbar-top-visible' : 'mobile-navbar-top-hidden')}
    >
      <nav className="mobile-nav-top">
        <div className="nav-wrapper">
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <li>
              <NavLink
                className="mobile-nav-item"
                activeClassName="mobile-nav-item-selected"
                to="/movies"
              >
                {t('movies')}
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="mobile-nav-item-selected"
                className="mobile-nav-item"
                to="/programs"
              >
               {t('programs')}
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="mobile-nav-item-selected"
                className="mobile-nav-item"
                to="/trailers"
              >
                {t('trailers')}
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="mobile-nav-item-selected"
                className="mobile-nav-item"
                style={{ marginRight: "10px" }}
                to="/mylist"
              >
                {t('mylist')}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbarTop;
