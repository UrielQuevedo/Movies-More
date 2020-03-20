import React from 'react';

const NotificationSideNav = ({sideNavElem}) => {
  return (
    <ul
      className="sidenav show-on-med-only hide-on-large-only collapse-menu"
      id="mobile-notification"
      style={{ color: '#fff'}}
    >
      <li><h1>Notifications</h1></li>
      <button className="btn" onClick={() => sideNavElem.close()}>Close</button>
    </ul>
  );
}
 
export default NotificationSideNav;