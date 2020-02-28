import React from 'react';
import "../Css/logIn.css";

const CustomInput = ({functions, type, name, title, configRegister, errorMessage}) => {
  const errors = functions._errors;
  const handlerChange = functions._handlerChange;
  const register = functions._register;

  return (
    <div className="input-field">
      <input 
        className="input-log validate"
        id={name}
        type={type}
        name={name}
        onChange={e => handlerChange(e, name)}
        ref= 
            {
              register({
                required: {configRegister}
              })
            }
      />
      <label htmlFor={name} className="label-color">{title}</label>
      {errors[name] &&
        <div className="red-text">
          <i className="material-icons" style={{fontSize:'1.2rem', transform: 'translateY(3px)'}}>cancel</i>
          <span className="center-align" style={{fontSize:'14px', marginLeft: '4px'}}>
            {errorMessage}*
          </span>
        </div>
      }
    </div>
  );
}
 
export default CustomInput;