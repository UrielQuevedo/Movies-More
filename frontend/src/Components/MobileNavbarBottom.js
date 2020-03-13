import React from "react";
import M from "materialize-css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileNavbarBottom = () => {

  useEffect(() => {
    const elem = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elem);

    const collapsibleElem = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibleElem);
  }, []);

  return (
    <nav className="show-on-med-only hide-on-large-only" style={{ position:'fixed', bottom:'0'}}>
      <div class="nav-wrapper">
        <ul style={{ display:'flex', justifyContent:'space-around', alignItems:'center' }}>
          <li>
            <a href="/"><i class="material-icons">home</i></a>
          </li>
          <li>
            <i class="material-icons">search</i>
          </li>
          <li>
            <i class="material-icons">notifications_none</i>
          </li>
          <li>
          <i data-target="mobile-demo" class="sidenav-trigger material-icons">menu</i>
          </li>
        </ul>

        <ul class="sidenav collapsible" id="mobile-demo">
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
      </div>
    </nav>
  );
};

export default MobileNavbarBottom;
