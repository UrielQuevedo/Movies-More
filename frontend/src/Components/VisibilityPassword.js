import React, { useState } from 'react'

const VisibilityPassword = ({seeTwoPassword, style}) => {
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = (nextType, bool) => {
    if (seeTwoPassword) {
      document.getElementById('confirmPassword').type = nextType;
    }
    document.getElementById('password').type = nextType;
    setVisibility(bool);
  }

  const visibilityComponent = (classStyle, icon) => {
    return (
      <i
        className={`material-icons vibilityPassword ${classStyle} ${style}`} 
        onClick={() => visibility ? changeVisibility('password', false) : changeVisibility('text', true)}
      >
        {icon}
      </i>
    );
  }

  return visibility ? visibilityComponent('red-text', 'visibility_off') : visibilityComponent('white-text', 'visibility')
}
 
export default VisibilityPassword;