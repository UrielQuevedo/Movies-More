import React, { useEffect } from 'react';
import UseLenguage from '../Hooks/UseLenguage';
import M from 'materialize-css';

const SelectLenguage = () => {
  const [lenguage, changeLenguage] = UseLenguage();

  useEffect(() => {
    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    let options = {
        inDuration: 300,
        outDuration: 300,
        coverTrigger: false,
        closeOnClick: false,
        
    };
    M.Dropdown.init(dropdowns, options);
  },[]);

  const createSelectLenguage = (leng, lengView) => {
    return <li className="dropdown-content-lenguage-item" onClick={() => changeLenguage(leng)}>{lengView}</li>
  }

  const dropdownLenguage = () => {
    return (
      <ul id="lenguage" className="dropdown-content dropdown-content-lenguage">
        { lenguage() === 'es' ?  createSelectLenguage('en','English (en-US)') :  createSelectLenguage('es','Spanish (es-ES)')}
      </ul>
    );
  }

  return (  
    <div className="dropdown-trigger dropdown-lenguage-log" data-target="lenguage">{lenguage()}
      {dropdownLenguage()}
      <i className="material-icons right" style={{ margin:'0', lineHeight:'24px', color:'#21FFE2'}}>
        arrow_drop_down
      </i>
    </div>
  );
}
 
export default SelectLenguage;