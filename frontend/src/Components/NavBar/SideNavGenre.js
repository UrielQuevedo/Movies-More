import React from 'react'

const SideNavGenre = ({sideNavElem}) => {
  const genres = ["Terror","Ficcion","Terror","Ficcion","Terror","Ficcion","Terror","Ficcion","Terror","Ficcion","Terror","Ficcion","Ficcion","Terror",,"Ficcion","Terror",,"Ficcion","Terror",]
  
  const createGenresItem = () => {
    return genres.map(e => (
      <li className="genre-title">
        {e}
      </li>
    ));
  }

  return (
    <ul
      className="sidenav show-on-med-only hide-on-large-only collapse-menu-genre"
      id="mobile-genre"
      style={{ color: '#fff'}}
    >
      
        <ul className="genre-list">
          {createGenresItem()}
        </ul>
      <i className="material-icons close-buttom-genre" onClick={() => sideNavElem.close()}>cancel</i>
    </ul>
  );
}
 
export default SideNavGenre;