import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../Css/logIn.css";
import logo from "../ICONO.png";

const UseRegister = () => {

  const [fields, changeFields] = useState({});
  const {register, errors, handleSubmit} = useForm();

  const logIn = (data, e) => {
    //sendData
    e.target.reset();
  }

  const customInput = ({type, name, errorMessage}) => {
    return (
      <div className="input-field">
        <input
          className="input-log"
          type={type} 
          name={type}
          onChange={e => changeFields({...fields, [type]: e.target.value})}
          ref= 
            {
              register({
                required: {value: true}
              })
            }
        />
        <label htmlFor={type} className="label-color">{name}</label>
        {errors[type] &&
          <div className="red-text">
            <i className="material-icons" style={{fontSize:'1.2rem', transform: 'translateY(3px)'}}>cancel</i>
            <span className="center-align" style={{ fontSize:'14px', marginLeft: '4px'}}>
              {errorMessage}*
            </span>
          </div>
        }
      </div>
    );
  }

  return (  
    <div className="container">
      <div className="row">
        <div className="col m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
          <div className="card z-depth-2 hoverable card-log" style={{ borderRadius: '15px'}}>
            <div className="card-action center-align" style={{ borderRadius: '15px'}}>
              <a href="/" style={{marginLeft: '25px'}}><img src={logo} alt="page logotype" className="logotipe" /></a>
              <h3 className="title-login color-title">Register</h3>
            </div>
            <div className="card-content card-padding">
              <div className="form-field">
                <form onSubmit={handleSubmit(logIn)}>
                  {customInput({type: "text", name: "Nickname", errorMessage: "Nickname required"})}
                  {customInput({type: "email", name: "Email", errorMessage: "Email required"})}
                  {customInput({type: "password", name: "Password", errorMessage: "Password required"})}
                  <button
                    className="waves-effect btn waves-teal button-google btn-login"
                    style={{ width: "100%" }}
                  >
                    SING UP
                  </button>
                </form>
                <div className="center-align">
                  <p style={{ marginTop: "16px" }}>
                    <strong className="white-text">Do you have an account?</strong>
                    <a href="/" style={{ marginLeft: "10px", color: '#21FFE2' }}>
                      Sing In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default UseRegister;