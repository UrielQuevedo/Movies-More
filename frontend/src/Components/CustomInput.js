import React from 'react';
import "../Css/logIn.css";
import ErrorMessageComponent from './ErrorMessageComponent';

const CustomInput = ({functions, type, name, title, configRegister}) => {
  const errors = functions._errors;
  const handlerChange = functions._handlerChange;
  const register = functions._register;
  const formErrors = {
    minLength: 'Minimum 6 characters required',
    required: `${title} required`
  }

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
              register(
                configRegister
              )
            }
      />
      <label htmlFor={name} className="label-color">{title}</label>
      {errors[name] && <ErrorMessageComponent message={formErrors[errors[name].type]} styleClass='error' />}
    </div>
  );
}
export default CustomInput;