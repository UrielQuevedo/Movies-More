import React from "react";
import M from "materialize-css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileNavbarBottom = () => {

  useEffect(() => {
    const options = {
      edge: 'right',
    }

    const elem = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elem, options);

    const collapsibleElem = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibleElem);
  }, []);

  return (
    <>
      <div className="show-on-med-only hide-on-large-only" style={{ position:'fixed', width:'100%', bottom:'0px'}}>
        <nav style={{ height:'43px'}}>
          <div class="nav-wrapper">
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
              <li data-target="mobile-demo" className="sidenav-trigger">
                <i class="material-icons collapse-icon">menu</i>
                <p className="mobile-navbar-bottom-item" style={{ transform:'translate(3px, -24px)' }}>More</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <ul class="sidenav collapsible show-on-med-only hide-on-large-only" id="mobile-demo">
      <li>
        <Link to="/proflie">Profile</Link>
      </li>
      <li>
        Dark Mode 
        <label style={{marginLeft:'58px'}}>
          <input 
            //defaultChecked={isDarkThemeActive}
            type="checkbox"
            //onClick={() => changeTheme(setTheme)}
          />
          <span class="lever" style={{ margin:'0'}}></span>
        </label>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>Lenguage</div>
        <div class="collapsible-body"><span>Spanish</span></div>
      </li>
      <li>
        <a href="mobile.html">Log Out</a>
      </li>
    </ul>
  </>
  );
};

export default MobileNavbarBottom;
