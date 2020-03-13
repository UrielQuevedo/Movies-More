import React from 'react';
import { Link } from "react-router-dom";

const MobileNavbarTop = () => {
  return ( 
    <div className="navbar-fixed">
      <nav className="show-on-med-only hide-on-large-only">
        <div class="nav-wrapper">
          <ul style={{ display:'flex', justifyContent:'space-around', alignItems:'center' }}>
            <li>
              <Link  activeClassName='item-selected' className='nav-item' to="/movies">movies</Link>
            </li>
            <li>
              <Link  activeClassName='item-selected' className='nav-item' to="/programs">programs</Link>
            </li>
            <li>
              <Link  activeClassName='item-selected' className='nav-item' to="/trailers">trailers</Link>
            </li>
            <li>
              <Link  activeClassName='item-selected' className='nav-item' style={{ marginRight:'10px'}} to="/mylist">mylist</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
 
export default MobileNavbarTop;