import React from 'react'

const ErrorMessageComponent = ({message, styleClass}) => {
  return (
    <div className={`red-text ${styleClass}`}>
      <i className="material-icons" style={{fontSize:'1.2rem', transform: 'translateY(3px)'}}>cancel</i>
      <span className="center-align" style={{fontSize:'14px', marginLeft: '4px'}}>
        {message}*
      </span>
    </div>
  );
}

export default ErrorMessageComponent;