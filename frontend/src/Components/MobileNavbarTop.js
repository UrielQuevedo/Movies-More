import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavbarTop = () => {
  const { t } = useTranslation();

  return (
    <div
      className="show-on-med-only hide-on-large-only"
      style={{
        position: "fixed",
        top: "-1px",
        width: "100%",
        background: "#020923"
      }}
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
            <li>
              <Link
                className="nav-item"
                to="/movies"
              >
                {t('movies')}
              </Link>
            </li>
            <li>
              <Link
                className="nav-item"
                to="/programs"
              >
               {t('programs')}
              </Link>
            </li>
            <li>
              <Link
                className="nav-item"
                to="/trailers"
              >
                {t('trailers')}
              </Link>
            </li>
            <li>
              <Link
                className="nav-item"
                style={{ marginRight: "10px" }}
                to="/mylist"
              >
                {t('mylist')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbarTop;
